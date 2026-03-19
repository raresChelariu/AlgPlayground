"""
Extract content from Rares Helper.docx and save as Markdown files.
"""

import os
import re
import docx

DOCX_PATH = r"C:\Users\CUG\Desktop\Rares Helper.docx"
OUTPUT_DIR = r"C:\Users\CUG\source\repos\AlgPlayground\docs\helper"

# ---------------------------------------------------------------------------
# Romanian character transliteration for filenames
# ---------------------------------------------------------------------------
ROMANIAN_MAP = str.maketrans(
    "ăâîșțĂÂÎȘȚáéíóúàèìòùäëïöüÁÉÍÓÚÀÈÌÒÙÄËÏÖÜ",
    "aaisaAAISTaeiouaeiouaeiouAEIOUAEIOUAEIOU",
)
# Also handle ș/ț with cedilla variants
ROMANIAN_MAP.update({
    ord('ş'): 's', ord('ţ'): 't',
    ord('Ş'): 'S', ord('Ţ'): 'T',
})


def sanitize_filename(title: str) -> str:
    """Convert a section title to a safe filename slug."""
    title = title.strip().strip('*').strip()
    title = title.translate(ROMANIAN_MAP)
    title = title.lower()
    title = re.sub(r'[^a-z0-9\s-]', '', title)
    title = re.sub(r'\s+', '-', title)
    title = re.sub(r'-+', '-', title).strip('-')
    return title or 'section'


# ---------------------------------------------------------------------------
# Code detection heuristics
# ---------------------------------------------------------------------------
CODE_PATTERNS = re.compile(
    r'(\{|\}|;|<<|>>|//|#include|#define|int\s|float\s|char\s|'
    r'double\s|bool\s|void\s|return\s|for\s*\(|while\s*\(|if\s*\(|'
    r'else\s*\{|else\s*if|printf\s*\(|scanf\s*\(|cout\s*<<|cin\s*>>|'
    r'struct\s|->|::|nullptr|NULL\b|sizeof\s*\(|new\s|delete\s|'
    r'long\s|short\s|unsigned\s|#ifndef|#endif|#pragma|swap\s*\(|'
    r'sort\s*\(|memset\s*\(|strlen\s*\(|strcmp\s*\(|strcpy\s*\(|'
    r'strcat\s*\(|strtok\s*\(|pow\s*\(|abs\s*\(|min\s*\(|max\s*\()'
)

# Lines that are clearly just prose even if they contain some code-like words
PROSE_PATTERNS = re.compile(
    r'^(Obs|Nota|Note|De exemplu|Exemplu|Atenție|Atenție|Important|'
    r'Avantaj|Dezavantaj|[A-ZĂÂÎȘȚ][a-zăâîșț].*\.$)',
    re.IGNORECASE
)


def is_code_line(text: str) -> bool:
    """Return True if a line looks like C/C++ code."""
    stripped = text.strip()
    if not stripped:
        return False
    # Very short lines with only alphanumerics are likely prose
    if len(stripped) < 3:
        return False
    # If it matches code patterns and is not clearly prose
    if CODE_PATTERNS.search(stripped):
        return True
    # Lines starting with indentation and having typical code chars
    if stripped.startswith(('int ', 'float ', 'double ', 'char ', 'bool ',
                             'void ', 'return', '#', '//', '/*', '*/')):
        return True
    return False


def looks_like_code_block(lines: list[str]) -> bool:
    """Given a list of lines, decide if the whole paragraph is a code block."""
    if not lines:
        return False
    code_count = sum(1 for l in lines if is_code_line(l))
    return code_count >= max(1, len(lines) * 0.4)


# ---------------------------------------------------------------------------
# Paragraph text helpers
# ---------------------------------------------------------------------------

def para_text(p) -> str:
    """Get full text of a paragraph, preserving runs."""
    return p.text


def para_is_obs(text: str) -> bool:
    return bool(re.match(r'^Obs\s*:', text, re.IGNORECASE))


# ---------------------------------------------------------------------------
# Major section grouping
# ---------------------------------------------------------------------------

# These are the known major section titles (Title style, non-empty, non-sub)
# Sub-sections are Title style paragraphs that follow a major section and
# logically belong to it. We define major sections by the list given.
MAJOR_SECTIONS = [
    'Tipuri de date (primitive)',
    'Stergeri si inserari in vector',
    'Expresii',
    'Împărțirea cu numere "cu virgulă"',
    'Prioritatea operatorilor',
    'Cum evaluăm o expresie ?',
    'Legile lui DeMorgan',
    'Expresii cu intervale matematice',
    'Maxime și minime',
    'Switch - Case',
    'Stiva și Coada',
    'Funcții',
    'Ce se întâmplă când se apelează o funcție?',
    'Secvențe',
    'Divide et Impera',
    'Backtracking',
    'Citirea și scrierea în limbajul C',
    'Recursie',
    'Cautare binara',
    'Baze de numerație',
    'Operații pe biți',
    'Struct',
    'Pointeri ',
    'Caractere',
    'Șiruri de caractere',
    'Citire',
    'Vectori de frecventa/caracteristici',
    'Interclasare',
    'Ciurul lui Eratostene',
    'Sortarea',  # merged with Ciurul
    'Divizibilitate',
    'Functia Sort',
    'Parametri cu referință',
    'Probleme cu TOATE/EXISTA ',
    'Keyword-ul static ',
]


def normalize_title(t: str) -> str:
    return t.strip().strip('*').strip().lower()


def find_major_section(text: str) -> str | None:
    """Return the canonical major section name if text matches, else None."""
    norm = normalize_title(text)
    for m in MAJOR_SECTIONS:
        if normalize_title(m) == norm:
            return m
        # fuzzy: cleaned version
        if sanitize_filename(m) and sanitize_filename(text) == sanitize_filename(m):
            return m
    # Check special cases
    if '**citire**' in text.lower() or normalize_title(text) == 'citire':
        return 'Citire'
    if 'ciurul lui eratostene' in norm:
        return 'Ciurul lui Eratostene'
    return None


# ---------------------------------------------------------------------------
# Markdown rendering
# ---------------------------------------------------------------------------

def render_paragraph(p, in_code_block: list) -> list[str]:
    """
    Convert a single paragraph to markdown lines.
    in_code_block is a mutable list [bool] so we can track state across calls.
    Returns list of output lines.
    """
    text = para_text(p).rstrip()
    style = p.style.name

    # Empty paragraphs
    if not text.strip():
        if in_code_block[0]:
            # keep blank lines inside code blocks
            return ['']
        return ['']

    # Headings
    if style == 'Title':
        if in_code_block[0]:
            in_code_block[0] = False
            return ['```', '', f'## {text}', '']
        return [f'## {text}', '']

    if style == 'Heading 1':
        if in_code_block[0]:
            in_code_block[0] = False
            return ['```', '', f'## {text}', '']
        return [f'## {text}', '']

    # Obs lines
    if para_is_obs(text):
        if in_code_block[0]:
            in_code_block[0] = False
            lines = ['```', '']
        else:
            lines = []
        obs_body = re.sub(r'^Obs\s*:\s*', '', text, flags=re.IGNORECASE)
        lines.append(f'> **Obs:** {obs_body}')
        lines.append('')
        return lines

    # Code detection
    para_lines = text.split('\n')
    if looks_like_code_block(para_lines):
        if not in_code_block[0]:
            in_code_block[0] = True
            return ['```cpp'] + para_lines
        else:
            return para_lines
    else:
        if in_code_block[0]:
            in_code_block[0] = False
            return ['```', '', text, '']
        return [text, '']


# ---------------------------------------------------------------------------
# Main processing
# ---------------------------------------------------------------------------

def process_document():
    doc = docx.Document(DOCX_PATH)
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    paragraphs = doc.paragraphs

    # -----------------------------------------------------------------------
    # Pass 1: identify section boundaries
    # -----------------------------------------------------------------------
    # Each entry: (para_index, title, is_major)
    section_starts = []

    for i, p in enumerate(paragraphs):
        text = p.text.strip().strip('*').strip()
        style = p.style.name

        if not text:
            continue

        if style in ('Title', 'Heading 1'):
            major = find_major_section(p.text)
            if major:
                section_starts.append((i, major, True))
            else:
                section_starts.append((i, p.text.strip(), False))

    # -----------------------------------------------------------------------
    # Pass 2: group into major sections
    # -----------------------------------------------------------------------
    # Walk section_starts; when we see a major section, start collecting
    # everything (including sub-sections) until the next major section.

    major_groups = []  # list of (major_title, start_para_idx, end_para_idx)

    current_major = None
    current_start = None

    for idx, (para_idx, title, is_major) in enumerate(section_starts):
        if is_major:
            if current_major is not None:
                # find end: paragraph before this one
                major_groups.append((current_major, current_start, para_idx))
            current_major = title
            current_start = para_idx
        # sub-sections are just paragraphs within the current major section

    # last section goes to end of document
    if current_major is not None:
        major_groups.append((current_major, current_start, len(paragraphs)))

    print(f"Found {len(major_groups)} major sections.")

    # -----------------------------------------------------------------------
    # Pass 3: render each major section to markdown
    # -----------------------------------------------------------------------
    created_files = []
    slug_counts = {}

    for major_title, start_idx, end_idx in major_groups:
        slug = sanitize_filename(major_title)
        if not slug:
            slug = 'section'

        # Handle duplicate slugs
        if slug in slug_counts:
            slug_counts[slug] += 1
            slug = f"{slug}-{slug_counts[slug]}"
        else:
            slug_counts[slug] = 1

        filename = f"{slug}.md"
        filepath = os.path.join(OUTPUT_DIR, filename)

        lines = []
        # Main title line
        lines.append(f'# {major_title.strip()}')
        lines.append('')

        in_code_block = [False]
        first_para = True

        for p in paragraphs[start_idx:end_idx]:
            text = p.text.strip()
            style = p.style.name

            # Skip the very first paragraph (it's the title we already wrote)
            if first_para:
                first_para = False
                continue

            # Handle empty paragraphs
            if not text:
                if in_code_block[0]:
                    lines.append('')
                else:
                    # avoid multiple consecutive blank lines
                    if lines and lines[-1] != '':
                        lines.append('')
                continue

            # Obs lines (check before code)
            if para_is_obs(text):
                if in_code_block[0]:
                    in_code_block[0] = False
                    lines.append('```')
                    lines.append('')
                obs_body = re.sub(r'^Obs\s*:\s*', '', text, flags=re.IGNORECASE)
                lines.append(f'> **Obs:** {obs_body}')
                lines.append('')
                continue

            # Headings
            if style == 'Title':
                if in_code_block[0]:
                    in_code_block[0] = False
                    lines.append('```')
                    lines.append('')
                lines.append(f'## {text}')
                lines.append('')
                continue

            if style == 'Heading 1':
                if in_code_block[0]:
                    in_code_block[0] = False
                    lines.append('```')
                    lines.append('')
                clean = text.lstrip('\n').strip()
                if clean:
                    lines.append(f'## {clean}')
                    lines.append('')
                continue

            # Regular paragraphs - code detection
            para_lines = text.split('\n')
            if looks_like_code_block(para_lines):
                if not in_code_block[0]:
                    in_code_block[0] = True
                    lines.append('```cpp')
                lines.extend(para_lines)
            else:
                if in_code_block[0]:
                    in_code_block[0] = False
                    lines.append('```')
                    lines.append('')
                lines.append(text)
                lines.append('')

        # Close any open code block
        if in_code_block[0]:
            lines.append('```')
            lines.append('')

        # Write file
        content = '\n'.join(lines)
        # Normalize excessive blank lines
        content = re.sub(r'\n{3,}', '\n\n', content)

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

        created_files.append((filename, end_idx - start_idx))
        print(f"  Created: {filename}  ({end_idx - start_idx} paragraphs)")

    print(f"\nDone. {len(created_files)} files created in {OUTPUT_DIR}")
    return created_files


if __name__ == '__main__':
    process_document()
