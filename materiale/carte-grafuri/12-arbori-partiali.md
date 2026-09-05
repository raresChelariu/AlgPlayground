# 1.9. Arbori partiali

> Extras din *Programarea in limbajul C/C++ pentru liceu*, paginile 58-61
> (pozele `049`, `050`, `051`, `052`).

---

## Definitie

Un **graf partial conex si aciclic** al unui graf neorientat se numeste **arbore partial**.

---

## Teorema 1

Conditia necesara si suficienta ca un graf sa contina cel putin un arbore partial este ca
graful sa fie **conex**.

**Demonstratie.**

*Necesitatea.* Presupunem ca graful admite un arbore partial. Arborele partial este conex si,
adaugand muchiile care sunt in graf dar nu sunt in arborele partial, el ramane conex. Deci
graful este conex.

*Suficienta.* Presupunem ca graful este conex. Daca graful este conex minimal, el este arborele
partial cautat. Altfel, exista o muchie `[x, y]` astfel incat graful partial `G1` obtinut prin
eliminarea muchiei `[x, y]` este conex. Daca `G1` este conex minimal, arborele partial cautat
este `G1`; altfel continuam procedeul de eliminare a muchiilor pana cand obtinem un graf conex
minimal, care va fi arborele partial cautat.

---

## Teorema 2 (numarul ciclomatic)

Fie `G` un graf conex cu `n` varfuri si `m` muchii. Numarul de muchii ce trebuie eliminate
pentru a obtine un arbore partial este `m - n + 1` (acesta se numeste **numarul ciclomatic** al
grafului).

**Demonstratie.** Presupunem ca prin eliminarea unui numar oarecare de muchii din `G` am obtinut
un graf `G'` fara cicluri (o padure). Fiecare dintre componentele conexe ale lui `G'` este un
arbore. Sa notam cu `p` numarul componentelor conexe, cu `ni` numarul de varfuri din componenta
conexa `i` si cu `mi` numarul de muchii din componenta conexa `i`. Evident ca `mi = ni - 1`,
pentru orice `i` din `{1, 2, ..., p}`.

Numarul de muchii din `G'` este `(n1 - 1) + (n2 - 1) + ... + (np - 1) = n - p`. Deci au fost
eliminate `m - n + p` muchii. Cand `G'` este arbore, deci conex (`p = 1`), numarul muchiilor
eliminate este `m - n + 1`.

---

## Arbori partiali obtinuti prin parcurgerea grafurilor

Prin parcurgerea unui graf neorientat conex, fiecare varf din graf va fi vizitat o singura data.
Exceptand varful de start, pentru vizitarea fiecarui varf se utilizeaza o singura muchie a
grafului. In total, pentru parcurgere au fost utilizate `n - 1` muchii (denumite **tree edges**)
care nu formeaza cicluri, deci care constituie un **arbore partial** al grafului dat.

> [!NOTE] Observatii
> 1. In cazul in care graful parcurs nu este conex, parcurgerea se repeta pentru fiecare
>    componenta conexa, obtinandu-se o padure, formata din arborii partiali corespunzatori
>    fiecarei componente conexe.
> 2. Prin parcurgerea unui graf orientat se obtine o **arborescenta** (graf orientat fara
>    circuite, in care fiecare varf este accesibil din varful de start).

---

## Clasificarea muchiilor

Prin parcurgere, muchiile grafului pot fi clasificate in 4 categorii:

1. **Tree edges** — muchiile arborelui partial; mai exact, `[x, y]` este tree edge daca si numai
   daca varful `y` a fost vizitat explorand muchia `[x, y]`.
2. **Back edges** — muchii care nu apartin arborelui partial si care conecteaza un varf de un
   **stramos** al sau in arborele partial (adica muchii de forma `[x, y]` care conecteaza pe `x`
   de un varf `y` aflat in lantul de la varful de start la `x`, mai aproape de varful de start
   decat `x`).
3. **Forward edges** — muchii care nu apartin arborelui partial si care conecteaza un varf de un
   **descendent** al sau in arborele partial (adica o muchie de forma `[x, y]` care conecteaza pe
   `x` de un varf `y`, astfel incat `x` se afla in lantul de la varful de start la `y`, mai
   aproape de varful de start decat `y`).
4. **Cross edges** — toate celelalte muchii.

### Exemplu

Cartea considera un graf neorientat conex cu 13 varfuri si il parcurge in adancime incepand din
varful `2`. In figura, muchiile din arborele partial DFS (tree edges) sunt desenate cu linie
continua ingrosata, iar muchiile de intoarcere (back edges) cu linie intrerupta.

> [!IMPORTANT] Important
> 1. Un graf (orientat sau neorientat) este **aciclic** daca nu contine muchii de intoarcere
>    (back edges).
> 2. Prin parcurgerea **in adancime** a unui graf neorientat, muchiile pot fi clasificate doar in
>    muchii ale arborelui partial DFS (tree edges) sau muchii de intoarcere (back edges).
>    Demonstratia este propusa ca exercitiu.

Parcurgand acelasi graf **in latime** incepand cu varful `2`, muchiile arborelui partial BFS
(tree edges) sunt desenate cu linie continua ingrosata, iar celelalte muchii (cross edges) cu
linie punctata.

> [!IMPORTANT] Important
> 1. Pentru orice varf `x` din graf, lantul unic care uneste varful de start de `x` in arborele
>    partial BFS reprezinta un lant cu **numar minim de muchii** de la varful de start la `x` in
>    graf. Lungimea acestui lant o vom numi **distanta** de la varful de start la `x` si o vom
>    nota `d[x]`.
> 2. Prin parcurgerea BFS a unui graf neorientat, muchiile pot fi clasificate doar in doua
>    categorii: tree edges si cross edges. Daca `[x, y]` este tree edge, atunci
>    `d[y] = d[x] + 1`. Daca `[x, y]` este cross edge, atunci `d[x] = d[y]` sau
>    `d[y] = d[x] + 1`.

---

## Exercitii propuse

1. Se considera graful din figura urmatoare (6 varfuri). Determinati toti arborii partiali ai
   acestui graf.
2. Se considera graful din figura urmatoare (7 varfuri). Prin eliminarea muchiilor `[2,3]`,
   `[3,5]`, `[4,5]` si `[4,7]` se obtine un arbore partial al acestui graf?
3. Se considera graful din figura urmatoare. Construiti arborele partial DFS si arborele partial
   BFS, considerand ca varf de start varful `1`.
