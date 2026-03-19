# Cautare binara

Caz : Am o lista neordonata (alfabetic) de elevi. Trebuie sa îl găsesc pe Popescu Daniel.

Soluție: Parcurg lista element cu element pana ajung la elementul dorit. ⇔ Căutare secvențială.

> **Obs:** Căutarea secvențială are complexitate O(n).

> **Obs:** Cautarea binara poate fi aplicată doar șirurilor de elemente SORTATE.

> **Obs:** Cautarea binara se aseamănă cu modul în care o persoana caută un cuvant in dictionar.

Cum căutăm în dicționar cuvântul mașina?

Deschid la jumătate.

Sa pp ca la jumătate am cuvantul cal. => trebuie sa caut în dreapta, prin urmare mana mea stanga se muta la mijloc (la jumătate, unde tocmai am deschis)

Dacă nu am găsit cuv, repetă procesul.

> **Obs:** Dacă trebuie sa caut în dreapta => st = mij + 1;

> **Obs:** Dacă trebuie sa caut in stanga => dr = mij - 1;

Vreau sa caut pe x = 37

st = 1 6

dr = 10

mij = 5 8

Vreau sa caut pe x = 40

st = 1 6 9

dr = 10 8

mij = 5 8 9

```cpp
int v[] = {0, 3, 12, 17, 25, 29, 31, 34, 37, 43, 49};
int n = 10;
int x = 37;
int st = 1, dr = n, mij;
bool gasit = 0;
while (st <= dr && gasit == 0)
```

{

```cpp
mij = (st + dr) / 2;
if (v[mij] == x)
```

{

```cpp
gasit = 1;
```

}

```cpp
if (v[mij] < x)
st = mij + 1;
```

else

```cpp
dr = mij - 1;
```

}

```cpp
if (gasit == 1)
cout << "Elementul cautat se afla pe pozitia " << mij;
```

else

```cpp
cout << "Elementul cautat nu se afla in vector";

```

> **Obs:** Dacă în timpul procesului de căutare, st ajunge sa fie mai mare ca dr, pot spune că elementul căutat nu exista - dar, dacă l-aș insera, aș face-o pe poziția st (sau pe ultimul mij găsit).

Varianta recursiva
