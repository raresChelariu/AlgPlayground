# Ciurul lui Eratostene

## Metoda 1 - Vector cu nr prime

> **Obs:** Un nr este prim dacă nu are ca divizor niciun număr (prim) mai mic ca el.

Cerința - descoperă primele n nr prime

## Metoda 2 - Vector care-mi spune dacă un nr este prim (sau nu)

> **Obs:** Dacă x este prim toți multiplii lui x mai mari ca el sunt NEPRIMI.

CERINȚA : Să se verifice primalitatea pentru toate nr mai mici ca N

Sortarea

BubbleSort

Idee:

Presupun că șirul este sortat.

Parcurg șirul și caut perechile consecutive care nu respectă criteriul.

Când găsesc o pereche “rea”:

Interschimb perechea (“swap”)

Fac presupunerea falsă!!! Constat că șirul NU este sortat! (am găsit contraexemplu).

La finalul parcurgerii, dacă presupunerea e falsă ( am găsit (cel puțin) un contraexemplu (2b) ) mă întorc la pasul 1.

Algoritm: (presupun că sortez crescător elementele lui v cu poz de la 1 la n)
