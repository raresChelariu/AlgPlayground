# Teoria grafurilor - extras din carte

Transcriere in markdown a capitolului **1. Teoria grafurilor** din *Programarea in
limbajul C/C++ pentru liceu*, pornind de la pozele din folderul Google Drive
**Carte Grafuri** (52 de fotografii, `001.jpg` - `052.jpg`).

Materialul este destinat pregatirii lectiilor de grafuri pentru **clasa a XI-a**.

> [!IMPORTANT] Nu este continut publicat
> Fisierele din acest folder sunt **material sursa**, nu lectii. Nu sunt in `docs/`,
> deci nu intra in build-ul VitePress. Lectiile propriu-zise se scriu separat,
> respectand conventiile din `CLAUDE.md`.

---

## Cuprins

| Fisier | Sectiune din carte | Pagini |
| --- | --- | --- |
| [01-notiuni-introductive.md](01-notiuni-introductive.md) | 1.1 Notiuni introductive, reprezentare vizuala, gradul unui varf | 8-13 |
| [02-lant-ciclu-drum-circuit.md](02-lant-ciclu-drum-circuit.md) | Lant, ciclu, drum, circuit | 14-17 |
| [03-grafuri-asociate.md](03-grafuri-asociate.md) | Graf partial, subgraf, subgraf partial, graf transpus | 17-20 |
| [04-tipuri-speciale-de-grafuri.md](04-tipuri-speciale-de-grafuri.md) | Graf complet, antisimetric, turneu, bipartit, regulat | 21-24 |
| [05-matrice-de-adiacenta.md](05-matrice-de-adiacenta.md) | 1.2 Reprezentarea prin matrice de adiacenta | 24-29 |
| [06-liste-de-adiacenta.md](06-liste-de-adiacenta.md) | Reprezentarea prin liste de adiacenta | 29-34 |
| [07-lista-muchiilor.md](07-lista-muchiilor.md) | Reprezentarea prin lista muchiilor/arcelor | 34-35 |
| [08-parcurgerea-grafurilor.md](08-parcurgerea-grafurilor.md) | 1.5 Parcurgerea grafurilor (DFS, BFS, aplicatii) | 38-46 |
| [09-conexitate.md](09-conexitate.md) | 1.6 Conexitate, componente conexe | 46-51 |
| [10-tare-conexitate.md](10-tare-conexitate.md) | 1.7 Tare-conexitate | 51-54 |
| [11-arbori.md](11-arbori.md) | 1.8 Arbori, cod Pruffer | 54-58 |
| [12-arbori-partiali.md](12-arbori-partiali.md) | 1.9 Arbori partiali, clasificarea muchiilor | 58-61 |

---

## Pagini care lipsesc din poze

Fotografiile nu acopera intreg capitolul. Lipsesc:

- **paginile 36-37** — sectiunile **1.3** si **1.4** (matricea drumurilor si
  matricea inchiderii tranzitive, algoritmul **Roy-Warshall**). Poza `032.jpg`
  prinde doar sfarsitul exercitiilor de la 1.4, de la exercitiul 2.
- **paginile 52-53** — algoritmul de descompunere in componente tare-conexe.
  Poza `046.jpg` prinde doar exercitiile 5-8 de la 1.7.
- **pagina 56** — demonstratia teoremei despre secventa gradelor unui arbore si
  inceputul codului Pruffer.

Daca vrei si aceste sectiuni, mai trebuie fotografiate paginile de mai sus.

---

## Corespondenta poza -> pagina

| Poza | Pagina | Poza | Pagina | Poza | Pagina |
| --- | --- | --- | --- | --- | --- |
| 001 | 9 | 019 | 24 | 037 | 43 |
| 002 | 8 | 020 | 25 | 038 | 44 |
| 003 | 10 | 021 | 26 | 039 | 45 |
| 004 | 10 (dubla) | 022 | 26 (dubla) | 040 | 46 |
| 005 | 11 | 023 | 27 | 041 | 47 |
| 006 | 12 | 024 | 28 | 042 | 48 |
| 007 | 12 (dubla) | 025 | 29 | 043 | 49 |
| 008 | 13 | 026 | 30 | 044 | 50 |
| 009 | 14 | 027 | 31 | 045 | 51 |
| 010 | 15 | 028 | 32 | 046 | 54 |
| 011 | 16 | 029 | 33 | 047 | 55 |
| 012 | 17 | 030 | 34 | 048 | 57 |
| 013 | 18 | 031 | 35 | 049 | 58 |
| 014 | 19 | 032 | 38 | 050 | 59 |
| 015 | 20 | 033 | 39 | 051 | 60 |
| 016 | 21 | 034 | 40 | 052 | 61 |
| 017 | 22 | 035 | 41 | | |
| 018 | 23 | 036 | 42 | | |

Pozele `003`/`004`, `006`/`007` si `021`/`022` sunt duplicate ale aceleiasi pagini.
In Drive exista si doua fisiere numite `032.jpg` cu acelasi continut.

---

## Observatii despre transcriere

- Textul este **fara diacritice**, conform conventiei din `CLAUDE.md`.
- **Figurile din carte nu au fost transcrise** — OCR-ul a extras doar numerele
  varfurilor, fara muchii. Acolo unde textul se refera la o figura, am pastrat
  referinta (ex. "figura 3") si am descris graful in cuvinte cand era deductibil
  din text. Figurile trebuie redesenate manual (mermaid) cand se scriu lectiile.
- **Blocurile de cod au fost reconstruite.** OCR-ul a stricat sintaxa
  (`fin>>>>>y`, `A[x][y] Aly][x]=1`, `for (i=0; i` fara conditie etc.).
  Am refacut codul astfel incat sa compileze si sa faca ce descrie textul,
  pastrand algoritmul si numele de variabile din carte. Formatarea acoladelor
  respecta stilul Allman din `CLAUDE.md`.
- **Matricele din exercitii** sunt cele mai afectate de OCR. Cele care se puteau
  reconstitui sigur sunt transcrise; restul sunt marcate explicit ca ilizibile.
