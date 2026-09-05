# Lant, ciclu, drum, circuit

> Extras din *Programarea in limbajul C/C++ pentru liceu*, paginile 14-17
> (pozele `009`, `010`, `011`, `012`).

---

## Lant

Se numeste **lant**, intr-un graf orientat sau neorientat, o secventa de varfuri
`[x1, x2, ..., xp]` cu proprietatea ca oricare doua varfuri consecutive din secventa
sunt adiacente.

De exemplu, pentru graful neorientat din figura 4, secventa `[1, 4, 2, 5]` este un lant.
Pentru graful orientat din figura 3, secventa `[1, 4, 2, 3, 4, 5]` este un lant.

Un lant este numit **elementar** daca el nu contine de mai multe ori acelasi varf.
Un lant este **simplu** daca el nu contine de mai multe ori aceeasi muchie.

- Lantul `[1, 4, 2, 5]` al grafului din figura 4 este elementar si simplu.
- Lantul `[1, 4, 2, 3, 4, 5]` al grafului din figura 3 este simplu, dar nu este
  elementar (trece de doua ori prin varful `4`).
- Lantul `[1, 4, 2, 3, 4, 2, 5]` pentru graful neorientat din figura 4 nu este simplu,
  deoarece trece de doua ori prin muchia `[2,4]`.

## Ciclu

Se numeste **ciclu**, intr-un graf orientat sau neorientat, un lant simplu pentru care
extremitatea initiala coincide cu extremitatea finala.

Se numeste **ciclu elementar** un ciclu care nu contine de mai multe ori acelasi varf
(exceptand extremitatile sale).

De exemplu, `[1, 2, 3, 4, 1]` este un ciclu elementar in graful neorientat din figura 4.

## Drum

Se numeste **drum** intr-un graf orientat o secventa de varfuri `(x1, x2, ..., xp)`
astfel incat pentru oricare doua varfuri consecutive in secventa `xi`, `xi+1` exista
arcul `(xi, xi+1)`.

Drumul se numeste **drum elementar** daca nu contine de mai multe ori acelasi varf.
Drumul se numeste **simplu** daca nu contine de mai multe ori acelasi arc.

De exemplu, pentru graful orientat din figura 3, secventa `(6, 5, 4, 3)` este un drum
elementar, in timp ce secventa `(5, 4, 1, 2, 4)` este un drum in graf care nu este
elementar, deoarece contine de doua ori varful `4`.

## Circuit

Se numeste **circuit** intr-un graf orientat un drum simplu pentru care extremitatea
initiala coincide cu cea finala. Circuitul se numeste **elementar** daca nu contine de
mai multe ori acelasi varf (exceptand extremitatile).

De exemplu, pentru graful orientat din figura 3, secventa `(1, 2, 4, 1)` este un circuit
elementar.

---

## Hamiltonian si eulerian

Un lant/drum/ciclu/circuit **elementar** se numeste **hamiltonian** daca el trece prin
**toate varfurile** grafului.

De exemplu, graful din **figura 5** contine circuitul hamiltonian
`(1, 2, 4, 3, 8, 6, 7, 5, 1)`.

Un lant/drum/ciclu/circuit se numeste **eulerian** daca trece prin **fiecare muchie/arc**
al grafului exact o data.

De exemplu, graful din **figura 6** contine un ciclu eulerian
`[1, 2, 3, 7, 6, 8, 7, 4, 5, 2, 4, 1]`, dar nu contine niciun ciclu hamiltonian.

> [!NOTE] Observatie
> Denumirea "hamiltonian" provine de la numele matematicianului irlandez Sir William
> Hamilton (1805-1865), care a conceput jocul denumit *Around the World*; scopul jocului
> era determinarea unui ciclu hamiltonian.

## Lungime

Se numeste **lungime** a unui lant/ciclu/drum/circuit numarul de muchii/arce continute.

De exemplu, in graful orientat din figura 5, lungimea drumului `(6, 7, 5, 1)` este `3`.
In graful neorientat din figura 6, lungimea ciclului `[1, 2, 3, 7, 4, 1]` este `5`,
deoarece contine muchiile `[1,2]`, `[2,3]`, `[3,7]`, `[7,4]`, `[4,1]`.

---

## Exercitii propuse

1. Construiti un graf cu 5 varfuri si numar minim de arce, care contine un circuit
   hamiltonian. Cate astfel de grafuri exista?
2. Sa consideram graful neorientat din figura urmatoare. Identificati in acest graf:
   **a.** un lant elementar de lungime cel putin egala cu 3;
   **b.** un lant simplu, care nu este elementar;
   **c.** un lant care nu este elementar;
   **d.** un ciclu elementar;
   **e.** un ciclu care nu este elementar;
   **f.** un lant elementar de lungime maxima;
   **g.** un ciclu hamiltonian.
3. Sa consideram graful orientat din figura urmatoare. Identificati in acest graf:
   **a.** un lant elementar de lungime cel putin egala cu 4;
   **b.** un drum elementar de lungime cel putin egala cu 4;
   **c.** un drum care nu este elementar;
   **d.** un ciclu elementar;
   **e.** un circuit elementar;
   **f.** un circuit elementar de lungime maxima;
   **g.** un drum hamiltonian, daca acesta exista.
4. Determinati toate ciclurile hamiltoniene ale grafului din figura urmatoare.
5. Dati un exemplu de graf neorientat cu 10 varfuri si numar maxim de muchii, care sa
   contina numai lanturi elementare de lungime cel mult egala cu 2.
6. Dati un exemplu de graf neorientat care sa contina cicluri hamiltoniene, dar sa nu
   contina cicluri euleriene.
7. Dati un exemplu de graf orientat care sa contina un drum eulerian, dar sa nu contina
   niciun drum hamiltonian.
8. Sa se demonstreze ca un graf neorientat care contine lanturi euleriene are exact doua
   varfuri de grad impar.
9. Se considera un graf orientat cu 6 varfuri, etichetate cu numere de la 1 la 6, si 6
   arce, astfel incat exista un arc de la fiecare varf cu eticheta `i` catre un varf cu
   eticheta `i * 2`, daca exista un astfel de nod, sau catre nodul cu eticheta `i - 1`,
   in caz contrar. Care este lungimea maxima a unui drum in graf?
   **a.** infinit **b.** 4 **c.** 3 **d.** 2 *(Simulare Bacalaureat, 2003)*
10. Dati cate un exemplu de graf orientat cu 10 varfuri si de un graf orientat cu 11
    varfuri, in care, pentru orice doua varfuri `x` si `y` din graf, exista drum de
    lungime cel mult egala cu 2 de la `x` la `y`.
11. Scrieti un program care sa citeasca de la tastatura un numar natural nenul `n` si sa
    afiseze in fisierul `graf.out` toate arcele unui graf orientat cu `n` varfuri
    numerotate de la 1 la `n`, graf cu proprietatea ca intre oricare doua varfuri `x` si
    `y` ale sale exista drum de lungime cel mult egala cu 2 de la `x` la `y`. Fiecare arc
    va fi scris pe o linie separata, specificand intai extremitatea initiala si apoi
    extremitatea finala.
