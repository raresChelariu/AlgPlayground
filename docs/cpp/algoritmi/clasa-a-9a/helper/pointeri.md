# Pointeri

(din eng. “to point” ⇔ “a arăta cu degetul”)

> **Obs:** Fiecare variabila are în memorie o adresă.

Obținerea adresei unei variabile se numește referențiere.

Obținerea valorii de la o adresa (pointer) se numește dereferențiere.

Pe scurt :

* - iau valoarea (dereferentiere)

& - iau adresa (referentiere)

## Operatorul de referențiere - &

Sintaxă: &variabila

Efect: se obține adresa acelei variabile

Ex:

Def: Pointerul este o variabilă în care memorez o adresă.

Cum declar un pointer ?

Sintaxă:

```cpp
Cum se citește : Dacă declar de ex, “int* p”, vom spune că p este “int pointer” SAU p este “pointer la int”. În documentații/materiale de specialitate/etc., se spune că p este de tip “int*”

```

> **Obs:** Pt int *a, b, c; se declara a (un int pointer), b (un int), c (un int). Dacă vreau ca și a, și b, și c sa fie int pointer trebuie sa scriu int *a, *b, *c.

Ex:

Ex2:

> **Obs:** 

```cpp
cout<<v<<" "<<&v[0]<<" "<<v+0; // se afișează 3 adrese identice // sunt notații echivalente
```

## Operatorul de dereferențiere - *

Sintaxa: *pointer

Efect: Se obține zona de memorie de la adresa pointerului.

```cpp
Ex:  v[0] = 3; cout<<*v; // Se afișează 3;
Ex 2: int *p = &x; cout<<*p; // Se afișează valoarea din x
```

Operații cu pointeri

Pot face:

pointer + număr

pointer - număr

NU pointer + pointer

NU pointer * numar

NU pointer / numar

NU pointer % numar

e OK numar + pointer (dar neobisnuit)

> **Obs:** v[i] ⇔ *(v+i) ⇔ *(i+v) ⇔ i[v]

> **Obs:** Un pointer care este declarat global este inițializat cu valoarea NULL (adresa 0x0). Niciodată sistemul de operare nu va aloca memorie la acea adresă.

```cpp
Cum initializez un pointer cu NULL ?
```

Ex:

> **Obs:** După cum se poate observa și în exemplu, NULL si nullptr sunt aliasuri pentru 0 (adresa 0).
