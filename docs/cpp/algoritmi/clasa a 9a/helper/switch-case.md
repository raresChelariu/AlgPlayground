# Switch - Case

Sintaxa:

Efect:

Se caută prima expresie expresieCk unde expresieCk este == cu expresieSwitch. Se execută de la acea etichetă toate instrucțiunile (ignorând etichetele) până când se întâlnește instrucțiunea break sau se ajunge la finalul blocului switch	.

> **Obs:** 

Dacă nu s-a găsit o etichetă expresieCk a.i. expresieCk == expresieSwitch, atunci se executa instrucțiunile de la eticheta default.

> **Obs:** 

Eticheta default e opțională.

Exemplu:

/*

Daca n are ultima cifra 0 - sa se afiseze "are 0 ultima cifra!"

Daca n are ultima cifra 5 - sa se afiseze "5 e ultima cifra!"

Altfel, sa se afiseze "ultima cifra nu e nici 0, nici 5!"

*/

```cpp
int n;
cin >> n;

```

switch (n % 10)

{

case 0:

```cpp
cout << "are 0 ultima cifra!";
break;

```

case 5:

```cpp
cout << "5 e ultima cifra!";
break;
```

default:

```cpp
cout << "ultima cifra nu e nici 0, nici 5!";
break;
```

}

Exemplu:

/cin.get

Scrie un program care, citind numărul unei zile a săptămânii, afișează numele acesteia.

1 – luni, 2 – marți, ..., 7 – duminică.

*/

```cpp
int n;
cin >> n;
```

switch (n)

{

case 1:

```cpp
cout << "luni";
break;
```

case 2:

```cpp
cout << "marti";
break;
```

case 3:

```cpp
cout << "miercuri";
break;
```

case 4:

```cpp
cout << "joi";
break;
```

case 5:

```cpp
cout << "vineri";
break;
```

case 6:

```cpp
cout << "sambata";
break;
```

case 7:

```cpp
cout << "duminica";
break;
```

}

Exemplu:

```cpp
Exemplu 2 : // se afișează 0048
// se

```
