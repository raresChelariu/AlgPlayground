# Plan: Grafuri si Arbori (Clasa a XI-a)

Elevii sunt de doua tipuri:

- cei care invata **doar pentru BAC** — rezolva exercitii (grila, pe hartie);
- cei care invata **pentru BAC si pentru admitere** — rezolva si exercitii mai grele, cu cod.

Grafurile neorientate si orientate se predau **in paralel** (cel putin in prima faza).

---

## Principii

- **Lectiile BAC** contin definitii, proprietati si exercitii de tip grila / pe hartie, toate cu rezolvare.
- **Lectiile pentru admitere** sunt fisiere separate. Fiecare incepe cu:
  ```md
  > [!TIP] Pentru admitere
  > Aceasta lectie contine materie pentru admiterea la facultate. Pentru bacalaureat nu este necesara.
  ```
  In sidebar textul lor primeste sufixul "(admitere)", ca elevul sa le recunoasca inainte sa le deschida.
- **Fiecare lectie BAC care are o continuare pentru admitere** se termina cu un link spre ea.
- **Neorientat si orientat in paralel** in modulele A si B: fiecare notiune vine cu un tabel comparativ si cate un desen Mermaid pentru fiecare tip (`---` pentru muchii, `-->` pentru arce).
- **Terminologie:** grad exterior `d⁺(x)` / grad interior `d⁻(x)` (ca in subiectele de BAC), cu mentiunea ca unele culegeri spun grad extern / grad intern.

## Reprezentarea prin liste de adiacenta

```cpp
int L[101][101];   // L[i][0] = numarul de vecini ai lui i
                   // L[i][1..L[i][0]] = vecinii lui i
```

La neorientat, muchia `[x, y]` se adauga in ambele liste. La orientat, arcul `(x, y)` se adauga doar in lista lui `x`. Cu aceasta conventie, `d(i)`, respectiv `d⁺(i)`, se citeste direct din `L[i][0]`.

## Tabel comparativ de baza

| Neorientat | Orientat |
|---|---|
| muchie `[x, y]` | arc `(x, y)` |
| grad `d(x)` | grad interior `d⁻(x)` / grad exterior `d⁺(x)` |
| suma gradelor = `2m` | `Σd⁺ = Σd⁻ = m` |
| max `n(n-1)/2` muchii | max `n(n-1)` arce |
| `2^(n(n-1)/2)` grafuri | `2^(n(n-1))` grafuri |
| graf complet | graf complet / turneu |
| lant | drum |
| ciclu | circuit |
| conex, componente conexe | tare conex, componente tare conexe |
| matrice de adiacenta simetrica | matrice de adiacenta oarecare |

---

## Sectiunea Grafuri (`clasa-a-11a/grafuri/`)

### Modulul A: Notiuni de baza

| # | Lectie | Nivel | Status |
|---|---|---|---|
| 1 | Introducere: varf, muchie/arc, adiacenta, grade, formule de numarare | BAC | ✅ |
| 2 | Grafuri speciale: partial, subgraf, complet, turneu, regulat, bipartit | BAC | |
| 3 | Lanturi si drumuri, cicluri si circuite | BAC | |
| 4 | Conexitate si tare conexitate | BAC | |
| 5 | Probleme rezolvate: notiuni de baza | BAC | |
| 6 | Notiuni de baza: exercitii avansate (numarari grele, demonstratii, conditii de existenta) | admitere | |

### Modulul B: Graful in program

| # | Lectie | Nivel | Status |
|---|---|---|---|
| 7 | Reprezentare in memorie: matrice de adiacenta, lista de muchii/arce, liste de adiacenta `L[i][0]`, conversii, calculul gradelor | BAC | |
| 8 | Parcurgeri BFS si DFS (BFS pornind de la Lee, DFS pornind de la recursivitate) | BAC | |
| 9 | Aplicatii: verificarea conexitatii, numararea componentelor, drum minim in numar de muchii | BAC | |
| 10 | Aplicatii avansate ale parcurgerilor: detectarea ciclurilor, verificarea bipartitiei | admitere | |

### Modulul C: Doar pentru grafuri orientate

| # | Lectie | Nivel | Status |
|---|---|---|---|
| 11 | Matricea drumurilor (Roy-Warshall), componente tare conexe | BAC | |
| 12 | Probleme rezolvate: grafuri orientate | BAC | |

### Modulul D: Grafuri euleriene si hamiltoniene

| # | Lectie | Nivel | Status |
|---|---|---|---|
| 13 | Grafuri euleriene si hamiltoniene: teorie si numarari | BAC | |
| 14 | Generarea ciclurilor hamiltoniene cu backtracking | admitere | |

### Modulul F: Grafuri ponderate

| # | Lectie | Nivel | Status |
|---|---|---|---|
| 15 | Roy-Floyd | admitere | |
| 16 | Dijkstra | admitere | |
| 17 | Arbore partial de cost minim (Kruskal / Prim) | admitere | |

> Lectia 17 presupune ca elevii au parcurs deja sectiunea Arbori. Ordinea de predare: Grafuri A–D, apoi Arbori, apoi modulul F.

---

## Sectiunea Arbori (`clasa-a-11a/arbori/`)

| # | Lectie | Nivel | Status |
|---|---|---|---|
| 1 | Introducere: definitii echivalente (conex si aciclic, n − 1 muchii) | BAC | |
| 2 | Arbori cu radacina si vectorul de tati: niveluri, frunze, ascendenti, descendenti, inaltime | BAC | |
| 3 | Probleme rezolvate: vectorul de tati | BAC | |
| 4 | Arbori: exercitii avansate (reconstruire, inaltime si niveluri calculate prin DFS) | admitere | |

---

## Sidebar (Clasa a XI-a)

```
Clasa a XI-a
├─ Backtracking
├─ Grafuri
│  ├─ Notiuni de baza            (1–6)
│  ├─ Graful in program          (7–10)
│  ├─ Grafuri orientate          (11–12)
│  ├─ Euleriene si hamiltoniene  (13–14)
│  └─ Grafuri ponderate          (15–17)
└─ Arbori                        (1–4)
```

Lectiile de admitere apar in sidebar cu sufixul "(admitere)", de exemplu `Dijkstra (admitere)`.
