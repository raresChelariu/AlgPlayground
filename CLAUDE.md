# CLAUDE.md

Manual de algoritmi C++ in limba romana, randat prin VitePress. Lectiile sunt scrise pentru elevi de liceu care rezolva probleme pe [pbinfo.ro](https://www.pbinfo.ro) si la BAC.

## Organizare pe clase

Fiecare lectie apartine **uneia** din urmatoarele categorii:

- **Clasa a IX-a** — folder `docs/cpp/algoritmi/clasa-a-9a/`
- **Clasa a X-a** — folder `docs/cpp/algoritmi/clasa-a-10a/`
- **Clasa a XII-a** — folder `docs/cpp/algoritmi/clasa-a-12a/`

Categoriile trebuie sa fie **vizibile in sidebar-ul VitePress** ([docs/.vitepress/config.mts](docs/.vitepress/config.mts)) ca sectiuni separate de nivel superior (nu o lista plata "Lectii" care amesteca toate clasele).

**Regula pentru Claude:** cand user-ul cere o lectie noua si **nu** specifica clasa (IX, X sau XII), intreaba-l explicit **inainte** sa creezi fisierul — nu ghici pe baza continutului.

## Conventii de cod in exemple

- **Indexare de la 1**: buclele parcurg `v[1..n]` cu `for (i = 1; i <= n; i++)`. Este stilul pbinfo/olimpiada si corespunde formularii enunturilor ("se citesc n numere..."). Exceptie: indexare de la 0 doar daca enuntul o cere explicit (ex. vector de frecventa `f[0..9]` pentru cifre).
- **Variabile globale deasupra lui `main()`** in exemplele complete (n, i, j, vectorii, contoarele, acumulatorii). Evita stack overflow la vectori mari si corespunde stilului uzual la concursuri/BAC.
- **Siruri de caractere**: `char nume[N]` citite cu `cin >> x`. Nu folosim `std::string`, nu folosim `cin.getline` / `cin.get`. In exemple numele sunt dintr-un singur cuvant (`Ion`, `Maria`), ca sa nu amestecam citirea.

## Conventii de formatare pentru lectii `.md`

- Code fences: ` ```cpp ` (nu `c`, nu fara tag de limbaj).
- **Fara diacritice** in text (`a`, `i`, `s`, `t` in loc de `ă`, `î`, `ș`, `ț`).
- Heading principal `#`, sectiuni `##`, subsectiuni `###`.
- Separatoare `---` intre sectiunile mari.
- Observatii in blockquote: `> **Obs:** ...`.
- Exemple complete = program runnable cu `#include`, `main()`, `return 0;`, urmate de blocuri **Intrare:** si **Afisare:** cu date concrete.
- Nu propunem exercitii fara rezolvare — orice problema enuntata primeste solutie completa in aceeasi sectiune.

**Referinte de stil:**
- [docs/cpp/algoritmi/clasa-a-9a/lectii/if.md](docs/cpp/algoritmi/clasa-a-9a/lectii/if.md)
- [docs/cpp/algoritmi/clasa-a-9a/lectii/variabile.md](docs/cpp/algoritmi/clasa-a-9a/lectii/variabile.md)
- [docs/cpp/algoritmi/clasa-a-9a/lectii/expresii.md](docs/cpp/algoritmi/clasa-a-9a/lectii/expresii.md)
- [docs/cpp/algoritmi/clasa-a-10a/struct.md](docs/cpp/algoritmi/clasa-a-10a/struct.md)

## Commit-uri

- Prefixe conventionale: `docs(lectie): ...`, `chore(sidebar): ...`, `feat: ...`, `fix: ...`.
- Fara trailer `Co-Authored-By`.
- Un commit per pas logic (ex. rescriere lectie = 1 commit, adaugare in sidebar = alt commit).
