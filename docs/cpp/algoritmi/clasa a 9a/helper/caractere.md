# Caractere

```cpp
Sunt variabile de tip char. (o variabila de tip char ocupă 1 byte).
```

Tabelul ASCII - lista cu toate caracterele și codul (număr) pentru fiecare din ele.

```cpp
https://www.asciitable.com/
```

Un caracter se scrie între apostroafe.

```cpp
char x = '$';
cout << x;    // cand afisez un char se afiseaza caracterul, nu codul

Ex2: (https://www.asciitable.com/)
// dacă doresc sa aflu codul unei var de tip char
// voi pune valoarea din char într-o var de tip "număr" (tip int, long long, etc)
// Ex:
char x = '$';
int y = x;
cout << y;
// se va afișa codul pt caracterul '$'

```

Ex3:

```cpp
char k = 'H';
int x = k - 'A';
// se afișează 7
// pt ca H este a 8 a litera din alfabet
// ( 'A' - 'A' este 0, 'B' - 'A' este 1, etc)
cout << x;

```

> **Obs:** cout << '7' + '3'; // NU se va afișa 10, ci suma codurilor ASCII
