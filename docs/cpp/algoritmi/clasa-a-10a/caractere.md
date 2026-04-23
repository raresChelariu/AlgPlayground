# Caractere

Variabilele de tip `char` retin un singur caracter si ocupa 1 byte in memorie. Fiecare caracter are un cod numeric (intreg) asociat in **tabelul ASCII** — lista completa se gaseste la [asciitable.com](https://www.asciitable.com/).

Un caracter se scrie intre apostroafe.

```cpp
#include <iostream>
using namespace std;

char x;

int main()
{
    x = '$';
    cout << x;    // cand afisez un char se afiseaza caracterul, nu codul
    return 0;
}
```

**Afisare:**
```
$
```

---

## Codul ASCII al unui caracter

Ca sa aflu codul unui caracter, pun valoarea lui intr-o variabila de tip intreg (`int`, `long long`, etc.).

```cpp
#include <iostream>
using namespace std;

char x;
int y;

int main()
{
    x = '$';
    y = x;
    cout << y;    // se afiseaza codul ASCII al caracterului '$'
    return 0;
}
```

**Afisare:**
```
36
```

---

## Operatii aritmetice cu caractere

Pot face operatii cu caractere — se lucreaza cu codurile ASCII.

```cpp
#include <iostream>
using namespace std;

char k;
int x;

int main()
{
    k = 'H';
    x = k - 'A';
    // 'A' - 'A' este 0, 'B' - 'A' este 1, ..., 'H' - 'A' este 7
    // H este a 8-a litera din alfabet
    cout << x;
    return 0;
}
```

**Afisare:**
```
7
```

> **Obs:** `cout << '7' + '3';` **nu** afiseaza 10, ci suma codurilor ASCII (55 + 51 = 106).

### Functii utile pe caractere

```cpp
#include <iostream>
using namespace std;

bool esteLiteraMare(char x);
bool esteLiteraMica(char x);
char dinLitMareInMica(char x);
char dinLitMicaInMare(char x);
int  dinCaracterInCifra(char x);
char dinCifraInCaracter(int x);

int main()
{
    cout << dinCaracterInCifra('3') * 5;
    return 0;
}

bool esteLiteraMare(char x)     { return x >= 'A' && x <= 'Z'; }
bool esteLiteraMica(char x)     { return x >= 'a' && x <= 'z'; }
char dinLitMareInMica(char x)   { return x - 'A' + 'a'; }
char dinLitMicaInMare(char x)   { return x - 'a' + 'A'; }
int  dinCaracterInCifra(char x) { return x - '0'; }
char dinCifraInCaracter(int x)  { return x + '0'; }
```

**Afisare:**
```
15
```

---

## Caractere albe

**Caracterul NULL** este caracterul cu codul 0.

**Caracter alb** = orice caracter cu codul <= 32. Se numesc albe pentru ca nu le "poti vedea" efectiv.

Exemple de caractere albe:

- `' '` (SPACE)
- `'\n'` (ENTER)
- `'\t'` (TAB)
- `'\0'` (caracterul NULL, primul caracter din ASCII)
- `EOF` (End of File)

---

## Citirea unui caracter

### Metoda 1 — operatorul `>>`

```cpp
char c;
cin >> c;
```

**Efect:** se sare peste toate caracterele albe si se memoreaza in `c` primul caracter **negru** (care nu e alb).

**Intrare:**
```
       xyz     abc
```

In variabila `c` se citeste `'x'`.

---

### Metoda 2 — `cin.get(c)`

```cpp
char c;
cin.get(c);
```

**Efect:** se citeste in `c` primul caracter de la pozitia curenta (fie ca e alb sau nu).

```cpp
#include <iostream>
using namespace std;

char c1, c2;

int main()
{
    cin.get(c1);
    cin.get(c2);
    return 0;
}
```

**Intrare:**
```
z     abc
```

> **Obs:** `c1` primeste `'z'` si `c2` primeste SPACE.

---

### Metoda 3 — `cin.get()`

```cpp
cin.get();
```

**Efect:** se citeste primul caracter de la pozitia curenta, dar **nu** se memoreaza nicaieri. Folosesc `cin.get()` cand vreau sa "sar" peste 1 caracter.

```cpp
#include <iostream>
using namespace std;

char a, b;

int main()
{
    cin.get(a);
    cin.get();      // sare peste '3'
    cin.get(b);
    cout << a << b;
    return 0;
}
```

**Intrare:**
```
738
```

**Afisare:**
```
78
```
