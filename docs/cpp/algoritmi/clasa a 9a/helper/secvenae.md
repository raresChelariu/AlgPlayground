# Secvențe

> **Obs:** O secventa poate fi și de lungime 1.

Def : Secvența maximă (de lungime maximă) - dintre toate secvențele, este secvența de lungime maxima care indeplineste proprietatea P (unde P o proprietate din enunț - “secvența de numere pare”).

Ex : 2 3 7 8 6 4 6 5 8 8 9 4 4 4 4 ( pentru P - “secvența de numere pare” avem secvențele  subliniate ca fiind secvențe maxime)

Def : Secvența maximală - dacă aș mai încerca să mai adaug un element (fie la dreapta (la final), fie la stânga (la început) ), secvența obținută nu ar mai respecta proprietatea.

(în alte cuvinte, secvența “mai bine de atât nu se poate”)

Ex : 2 3 7 8 6 4 6 5 8 8 9

> **Obs:** Orice secventa maxima este si secventa maximala, dar NU si invers (in ex de mai sus, “8 8” nu este maximă!)

Vom numi “exemplu” - element ce îndeplinește P

Idee (pt găsirea secv de lungime maximă):

Dacă elem. curent este exemplu

```cpp
lg++;
Altfel // am contraex - deci secvența mea tocmai s-a terminat
```

Verific daca lg este maxim - Dacă da, actualizez maximul

lg devine 0 (Am contraex - secv curentă s-a terminat)

> **Obs:** Uneori chiar contraexemplul poate forma o secventa. De exemplu, pentru P = “secvența de numere crescătoare”:

Ex : 2 3 4 7 3 5 9 11

Doar “3” este o secventa cresc => de fiecare data cand gasesc contraex

, după ce “m-am jucat” cu secvența curentă, voi face “lg = 1” (pt ca contraex face parte din următoarea secvența).

> **Obs:** Cu algoritmul de mai sus, obțin o secventă maximală de fiecare dată când dau de contraexemplu.

> **Obs:** De la a la b am b-a+1 nr.

Ex : de la 3 la 7 am 5 nr ( 3, 4, 5, 6, 7)

```cpp
// 10
// 0 1 0 0 0 5 0 0 0 0
//  ultima secvență nu are după ea un “contraexemplu” pt a verifica dacă este maximă
```

Soluții :

```cpp
Pe poziția n+1 voi pune contraexemplu, și voi parcurge 1->n+1.
```

După ce am parcurs șirul, verific daca secv curentă este maximă.
