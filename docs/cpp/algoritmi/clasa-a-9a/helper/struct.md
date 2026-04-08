# Struct

Caz:  Am de creat un program unde memorez înălțimea și anul nașterii pentru elevii unei clase cu n copii.

```cpp
Soluția 1: Creez un vector cu n elemente de tip double pt înălțime și un alt vector de tip int pt anul nașterii. => Dacă trebuie sa memorez k proprietăți pt cei n elevi ⇔ k vectori diferiți ; de asemenea, dacă șterg/inserez un elev, ștergerea/inserarea trebuie făcută în fiecare din cei k vectori.
```

Solutia 2: Creez un tip de date care înglobează toate proprietățile unui elev. Din moment ce acum am creat un astfel de tip, e suficient sa creez un singur vector (va fi un vector de elevi - fiecare element va fi alcătuit din cele k proprietăți).

> **Obs:** Proprietățile se vor numi câmpuri (eng. fields). ( La fel cum la un formular găsim exprimarea “Completați câmpurile de mai jos...”).

O structură (sau “un struct”) este un mod de a grupa mai multe date sub o singura denumire.

Sintaxa definire Struct:

Exemplu de definire a unei structuri:

```cpp
Observație : Tipurile de date predefinite ale limbajului se numesc tipuri primitive (int, float, double, long long, short, bool, etc.)

Cum declar o variabila de tip struct ?
Sintaxă : denumireStruct numeVariabila;
```

Exemplu :

## Cum accesez valoarea unui câmp ?

Sintaxa : numeVariabila.numeCâmp

Obs#1 : Pot avea un câmp de tip Buletin în struct-ul Elev doar dacă struct-ul Buletin a fost declarat înaintea (mai sus de) structului Elev.

Contraex:

```cpp
Obs#2 : Pot declara variabile de tip struct între “}” și ”;”.
```

Ex:

```cpp
// ⇔

```

Obs#3 : Pot declara și structuri fără nume (singurul mod de a declara variabile de acel tip fiind ca în Obs#2). Aceste structuri fără nume se numesc structuri anonime.

Ex :

## Atribuirea pentru structuri

Efect : Se face atribuirea pentru fiecare câmp.

⇔

## Swap între 2 structuri

> **Obs:** Pot face swap dintre 2 variabile ce sunt structuri doar dacă sunt de același tip !!! (ex. pot face swap(a, b); dacă a și b sunt de tip Elev, dar nu pot face swap-ul cand de ex. a este de tip Elev și b este de tip Buletin).

Efect : se face câmp cu câmp (în același stil ca la atribuire).

Ex

```cpp
// swap(ionel, Maria);
Andra = ionel;
ionel = Maria;
Maria = Andra;

```
