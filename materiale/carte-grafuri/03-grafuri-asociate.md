# Grafuri asociate unui graf dat

> Extras din *Programarea in limbajul C/C++ pentru liceu*, paginile 17-20
> (pozele `012`, `013`, `014`, `015`).

---

## Graf partial

Fie `G = (V, E)` un graf orientat sau neorientat. Graful `G' = (V, E')` se numeste
**graf partial** al grafului `G` daca `E'` este inclusa in `E`.

> [!NOTE] Observatie
> Un graf partial al unui graf `G` se obtine **eliminand muchii/arce** din graful `G`.

**Exemplu.** Pornind de la graful `G` cu varfurile `{1, 2, 3, 4, 5}`, un graf partial se
obtine prin eliminarea a doua muchii (`[2,5]` si `[2,3]`).

---

## Subgraf

Fie `G = (V, E)` un graf orientat sau neorientat. Graful `G' = (V', E')` se numeste
**subgraf** al grafului `G` daca `V'` este inclusa in `V`, iar `E'` este multimea
**tuturor** muchiilor/arcelor din `E` cu proprietatea ca au ambele extremitati in `V'`.

> [!NOTE] Observatie
> Un subgraf al unui graf `G` se obtine **eliminand varfuri** din `G`, impreuna cu toate
> muchiile/arcele incidente cu acestea. Se spune ca subgraful `G'` este **indus**
> (sau generat) de multimea de varfuri `V'`.

**Exemplu.** Un subgraf al grafului `G` se obtine prin eliminarea varfurilor `1` si `4`
si a muchiilor incidente cu acestea.

---

## Subgraf partial

Fie `G = (V, E)` un graf orientat sau neorientat. Graful `G' = (V', E')` se numeste
**subgraf partial** al grafului `G` daca `V'` este inclusa in `V`, iar multimea `E'`
este inclusa in multimea tuturor muchiilor/arcelor din `E` cu proprietatea ca au ambele
extremitati in `V'`.

> [!NOTE] Observatie
> Un subgraf partial al unui graf `G` se obtine eliminand varfuri din `G`, toate
> muchiile/arcele incidente cu varfurile eliminate, precum si alte muchii/arce din graf.

**Exemplu.** Un subgraf partial al grafului `G` se obtine prin eliminarea varfurilor `1`
si `4`, a muchiilor incidente cu acestea si a muchiei `[2,5]`.

---

## Graf transpus

Fie `G = (V, E)` un graf **orientat**. Graful `GT = (V, ET)` se numeste **graful
transpus** al grafului `G` daca `ET = {(y, x) | (x, y) apartine lui E}`.

> [!NOTE] Observatie
> Graful transpus are aceeasi multime de varfuri, iar multimea arcelor este formata din
> arcele grafului initial, **cu sensul inversat**.

---

## Exercitii rezolvate

**1. Fie `G` un graf cu `n` varfuri si `m` muchii/arce. Determinati numarul de grafuri
partiale ale lui `G`.**

*Solutie.* Sa numerotam muchiile grafului de la `1` la `m`. Fiecarui graf partial ii
putem asocia in mod biunivoc o functie `f: {1, 2, ..., m} -> {0, 1}` astfel: `f(i) = 1`
daca muchia numerotata `i` apartine grafului partial, respectiv `f(i) = 0` in caz
contrar. Numarul de grafuri partiale este egal cu numarul de functii astfel definite,
adica `2^m` (consideram ca un graf este graf partial al sau).

**2. Fie `G` un graf cu `n` varfuri si `m` muchii/arce. Determinati numarul de subgrafuri
ale lui `G`.**

*Solutie.* Pentru a genera un subgraf trebuie sa selectam multimea varfurilor sale,
multimea muchiilor/arcelor fiind unic determinata de multimea varfurilor selectate.
Multimea `{1, 2, ..., n}` are `2^n` submultimi, dintre care eliminam multimea vida. Prin
urmare, exista `2^n - 1` subgrafuri ale unui graf cu `n` varfuri (consideram ca un graf
este subgraf al sau).

---

## Exercitii propuse

1. Se considera graful neorientat din figura urmatoare. Sa se determine un subgraf cu
   numar maxim de varfuri, cu proprietatea ca oricare doua varfuri din subgraf sunt
   adiacente.
2. Se considera graful orientat din figura urmatoare. Sa se determine un graf partial al
   sau cu numar maxim de arce si cu proprietatea ca exista un varf care are gradul
   interior `0` si gradul exterior `3`.
3. Se considera grafurile din figurile urmatoare. Este graful `G` un graf partial al
   grafului `G'`? Daca nu, eliminati un numar minim de muchii din `G'`, astfel incat `G`
   sa devina graf partial al lui `G'`.
4. Sa se determine graful transpus al grafului orientat de la exercitiul 2.
5. Determinati un graf partial al grafului neorientat de la exercitiul 1, care sa aiba
   numar maxim de muchii si care sa nu contina cicluri.
6. Determinati un subgraf al grafului orientat de la exercitiul 2, care sa aiba numar
   maxim de varfuri si toate varfurile sa fie izolate.
