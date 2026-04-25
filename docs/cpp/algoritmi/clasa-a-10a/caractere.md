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
    cout << x;
    return 0;
}
```

**Afisare:**
```
$
```

---

## Codul ASCII al unui caracter

Fiecare caracter are un cod intreg unic. Important de stiut:

- Cifrele `'0'`, `'1'`, ..., `'9'` au coduri **consecutive si crescatoare** (in aceasta ordine).
- Literele mari `'A'`, `'B'`, ..., `'Z'` au coduri **consecutive si crescatoare**.
- Literele mici `'a'`, `'b'`, ..., `'z'` au coduri **consecutive si crescatoare**.

Ca sa aflu codul unui caracter, pun valoarea lui intr-o variabila de tip intreg.

```cpp
#include <iostream>
using namespace std;

char x;
int y;

int main()
{
    x = 'A';
    y = x; // am memorat 'A' intr-un int, deci codul lui 'A'
    cout << y;
    return 0;
}
```

**Afisare:**
```
65
```

---

## Operatii aritmetice cu caractere

Deoarece codurile sunt consecutive, pot face operatii cu caractere — se lucreaza cu codurile ASCII.

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
    cout << x;
    return 0;
}
```

**Afisare:**
```
7
```

> **Obs:** `cout << '7' + '3';` **nu** afiseaza 10, ci suma codurilor ASCII ale celor doua caractere.

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

## Functii standard pentru caractere

Biblioteca `<cctype>` contine functii gata facute pentru verificarea si conversia caracterelor.

| Functie      | Returneaza                                  |
|--------------|---------------------------------------------|
| `isalpha(c)` | `true` daca `c` este litera (mare sau mica) |
| `isupper(c)` | `true` daca `c` este litera mare            |
| `islower(c)` | `true` daca `c` este litera mica            |
| `isdigit(c)` | `true` daca `c` este cifra (`'0'`..`'9'`)   |
| `isalnum(c)` | `true` daca `c` este litera sau cifra       |
| `isspace(c)` | `true` daca `c` este caracter alb           |
| `toupper(c)` | varianta majuscula a lui `c`                |
| `tolower(c)` | varianta minuscula a lui `c`                |

```cpp
#include <iostream>
#include <cctype>
using namespace std;

char c;

int main()
{
    cin >> c;
    if (isupper(c))
        cout << "litera mare";
    else if (islower(c))
        cout << "litera mica";
    else if (isdigit(c))
        cout << "cifra";
    else
        cout << "alt caracter";
    return 0;
}
```

**Intrare:**
```
G
```

**Afisare:**
```
litera mare
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
    cin.get();
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

---

## Capcane frecvente

### Citire caracter dupa un numar

Dupa `cin >> n`, caracterul `'\n'` (ENTER) ramane neconsumat in buffer. Primul `cin.get(c)` il va citi pe el in loc de caracterul dorit.

**Cod gresit:**

```cpp
int n;
char c;
cin >> n;
cin.get(c);    // c primeste '\n', nu caracterul dorit!
```

**Fix:** adaug un `cin.get()` inainte de `cin.get(c)` pentru a consuma `'\n'`-ul ramas.

```cpp
#include <iostream>
using namespace std;

int n;
char c;

int main()
{
    cin >> n;
    cin.get();
    cin.get(c);
    cout << c;
    return 0;
}
```

**Intrare:**
```
42
A
```

**Afisare:**
```
A
```

---

## Problema rezolvata

**Enunt:** Se citesc `n` caractere. Afisati cate litere mari, cate litere mici si cate cifre se gasesc printre ele.

```cpp
#include <iostream>
#include <cctype>
using namespace std;

int n, i, nrMari, nrMici, nrCifre;
char c;

int main()
{
    cin >> n;
    for (i = 1; i <= n; i++)
    {
        cin >> c;
        if (isupper(c))
            nrMari++;
        else if (islower(c))
            nrMici++;
        else if (isdigit(c))
            nrCifre++;
    }
    cout << nrMari << " " << nrMici << " " << nrCifre;
    return 0;
}
```

**Intrare:**
```
7
A b 3 Z q 8 M
```

**Afisare:**
```
3 2 2
```
