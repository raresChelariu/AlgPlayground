# Tipuri speciale de grafuri

> Extras din *Programarea in limbajul C/C++ pentru liceu*, paginile 21-24
> (pozele `016`, `017`, `018`, `019`).

---

## Graf complet

Un graf orientat sau neorientat se numeste **complet** daca oricare doua varfuri din graf
sunt adiacente.

> [!NOTE] Observatie
> Graful neorientat complet cu `n` varfuri se noteaza `Kn` si contine `n * (n - 1) / 2`
> muchii.

**Exemple.** Grafurile neorientate complete cu `n = 3, 4, 5` varfuri: `K3`, `K4`, `K5`.

Pentru un numar de varfuri fixat, graful **neorientat** complet este **unic**, dar grafuri
**orientate** complete exista mai multe. De exemplu, exista doua grafuri orientate
complete cu 4 varfuri, notate in carte `G1` si `G2`.

---

## Graf antisimetric

Un graf orientat se numeste **antisimetric** daca pentru orice `x` si `y`, varfuri din
graf, daca exista arcul `(x, y)`, atunci nu exista arcul `(y, x)`.

> [!NOTE] Observatie
> Orice **relatie de ordine** intre elementele unei multimi poate fi modelata cu ajutorul
> unui graf orientat antisimetric: varfurile grafului corespund elementelor multimii;
> daca elementul `x` este in relatia de ordine respectiva cu elementul `y`, atunci in graf
> va exista arcul `(x, y)`. Graful astfel definit este antisimetric, deoarece orice
> relatie de ordine este antisimetrica.

**Exemple.** Graful `G1` din exemplul precedent este antisimetric, dar graful `G2` nu este
antisimetric (deoarece exista si arcul `(1,2)` si arcul `(2,1)`). Exista si grafuri
antisimetrice care nu sunt complete.

---

## Graf turneu

Un graf orientat **complet si antisimetric** se numeste **graf turneu**.

**Exemplu.** Graful `G1` este complet si antisimetric, deci este graf turneu.

---

## Graf bipartit

Un graf neorientat `G = (V, E)` se numeste **bipartit** daca multimea varfurilor sale
poate fi partitionata in doua submultimi nevide (`V = A U B`, `A intersectat cu B = multimea vida`),
astfel incat orice muchie are o extremitate in multimea `A` si cealalta extremitate in
multimea `B`.

## Graf bipartit complet

Un graf bipartit se numeste **complet** daca fiecare varf din multimea `A` este adiacent
cu fiecare varf din multimea `B`.

> [!NOTE] Observatie
> Daca numarul de varfuri din multimea `A` este `p`, iar numarul de varfuri din multimea
> `B` este `q`, graful bipartit complet se noteaza `Kp,q` si contine `p * q` muchii.

---

## Graf regulat

Un graf neorientat se numeste **regulat** daca toate varfurile sale au **acelasi grad**.

---

## Exercitii propuse

1. Sa se descrie grafurile `K5` si `K4,5`.
2. Determinati numarul de grafuri orientate complete cu `n` varfuri.
3. Determinati numarul de grafuri turneu cu `n` varfuri.
4. Determinati toate grafurile regulate cu 6 si respectiv 7 varfuri, facand abstractie de
   numerotarea varfurilor.
5. Care dintre secventele urmatoare reprezinta sirul gradelor unui graf neorientat
   complet cu 5 varfuri:
   **a.** 5, 5, 5, 5, 5 **b.** 5, 4, 3, 2, 1 **c.** 4, 4, 4, 4, 4 **d.** 3, 4, 3, 4, 3
6. Se considera graful din figura urmatoare. Care este numarul minim de muchii ce trebuie
   adaugate astfel incat graful sa devina regulat?
7. Determinati numarul de cicluri hamiltoniene din graful `Kn`.
8. Determinati numarul de cicluri hamiltoniene din graful bipartit complet `Kn,n`.
9. Este graful din figura urmatoare un graf bipartit?
10. Sa se construiasca un graf bipartit cu 7 varfuri, care sa aiba numar maxim de muchii
    si sa nu contina cicluri.
11. Este graful din figura urmatoare un graf turneu? Daca nu, efectuand un numar minim de
    modificari (adaugari sau stergeri de arce), transformati graful in graf turneu.
12. Cate subgrafuri complete cu 3 varfuri contine un graf complet cu 8 varfuri?
13. Demonstrati ca un graf bipartit cu numar impar de noduri nu este hamiltonian.
14. Demonstrati ca un graf care contine cicluri de lungime impara nu este bipartit.
15. Demonstrati ca orice graf turneu contine un drum hamiltonian *(Redei, 1934)*.
