# Reprezentarea interna a numerelor

Calculatorul nu retine numerele asa cum le scriem noi, in baza 10. In memorie, orice numar este o **secventa de cifre de 0 si 1**, adica numarul scris in **baza 2**. In aceasta lectie vedem cum arata aceste secvente: intai pentru numere naturale, apoi pentru numere intregi (care pot fi si negative).

> [!NOTE] Observatie
> Conversia unui numar din baza 10 in baza 2 (si invers) a fost explicata in lectia [Baze de numeratie](../algoritmi-elementari/baze-de-numeratie.md). Aici o folosim fara sa o mai repetam.

---

## Bit si byte

- **Bitul** este cea mai mica unitate de masura a memoriei. Un bit poate avea doar doua valori: `0` sau `1`.
- **Byte-ul** (in romana **octet**) este un grup de **8 biti**. Byte-ul este cea mai mica unitate de memorie care are o **adresa**, adica un numar care ii identifica pozitia in memorie.

Ne putem imagina memoria ca pe o strada lunga cu case numerotate. Fiecare casa este un byte, iar numarul casei este adresa lui. In fiecare casa locuiesc 8 biti, dar bitii nu au un numar al lor: ca sa ajungi la un bit, mergi intai la byte-ul in care se afla.

> [!IMPORTANT] Important
> Un bit izolat nu poate fi adresat. De aceea orice variabila ocupa un numar **intreg** de bytes: chiar si o variabila `bool`, care are nevoie de un singur bit, ocupa un byte intreg.

### Numerotarea bitilor

In interiorul unui byte, pozitiile bitilor se numeroteaza **de la dreapta la stanga**, incepand de la `0`:

```
pozitie:  7  6  5  4  3  2  1  0
bit:      0  0  1  1  0  0  1  0
```

- bitul de pe pozitia `0` (cel din dreapta) este **bitul cel mai putin semnificativ**: are ponderea `2^0 = 1`
- bitul de pe pozitia `7` (cel din stanga) este **bitul cel mai semnificativ**: are ponderea `2^7 = 128`

> [!NOTE] Observatie
> Numerotarea de la `0` nu este intamplatoare: bitul de pe pozitia `p` are ponderea `2^p`, exact ca in notatia pozitionala din lectia de baze de numeratie.

---

## Tipuri de date si dimensiunea lor

Fiecare tip de date ocupa un numar fix de bytes. Din numarul de biti rezulta direct **domeniul** tipului, adica cea mai mica si cea mai mare valoare care poate fi memorata.

| Tip                  | Bytes | Biti | Domeniu                                                   | Formula              |
|----------------------|-------|------|-----------------------------------------------------------|----------------------|
| `bool`               | 1     | 8    | `0` sau `1`                                               | -                    |
| `char`               | 1     | 8    | -128 ... 127                                              | -2^7 ... 2^7 - 1     |
| `unsigned char`      | 1     | 8    | 0 ... 255                                                 | 0 ... 2^8 - 1        |
| `short`              | 2     | 16   | -32768 ... 32767                                          | -2^15 ... 2^15 - 1   |
| `unsigned short`     | 2     | 16   | 0 ... 65535                                               | 0 ... 2^16 - 1       |
| `int`                | 4     | 32   | -2147483648 ... 2147483647                                | -2^31 ... 2^31 - 1   |
| `unsigned int`       | 4     | 32   | 0 ... 4294967295                                          | 0 ... 2^32 - 1       |
| `long long`          | 8     | 64   | -9223372036854775808 ... 9223372036854775807              | -2^63 ... 2^63 - 1   |
| `unsigned long long` | 8     | 64   | 0 ... 18446744073709551615                                | 0 ... 2^64 - 1       |
| `float`              | 4     | 32   | aproximativ ±3.4 · 10^38, cu ~7 cifre exacte              | -                    |
| `double`             | 8     | 64   | aproximativ ±1.7 · 10^308, cu ~15 cifre exacte            | -                    |

Cuvantul `unsigned` ("fara semn") inseamna ca tipul memoreaza **doar numere naturale**. Fara `unsigned`, tipul memoreaza **numere intregi**, deci si negative.

> [!TIP] Sfat
> Retine ordinele de marime: `int` merge pana la aproximativ **2 miliarde** (2 · 10^9), iar `long long` pana la aproximativ **9 · 10^18**. Daca un rezultat poate trece de 2 miliarde, foloseste `long long`.

> [!NOTE] Observatie
> Dimensiunile din tabel sunt cele de pe compilatorul g++ folosit pe pbinfo si la BAC. Standardul C++ permite si alte dimensiuni pe alte sisteme. Tot pe g++, tipul `char` simplu se comporta ca `signed char` (are semn).

### Verificare cu `sizeof`

Operatorul `sizeof` intoarce numarul de bytes ocupati de un tip sau de o variabila:

```cpp
#include <iostream>
using namespace std;

int main()
{
    cout << "bool: " << sizeof(bool) << endl;
    cout << "char: " << sizeof(char) << endl;
    cout << "short: " << sizeof(short) << endl;
    cout << "int: " << sizeof(int) << endl;
    cout << "long long: " << sizeof(long long) << endl;
    cout << "float: " << sizeof(float) << endl;
    cout << "double: " << sizeof(double) << endl;
    return 0;
}
```

**Intrare:**
```
(programul nu citeste nimic)
```

**Afisare:**
```
bool: 1
char: 1
short: 2
int: 4
long long: 8
float: 4
double: 8
```

In sectiunile urmatoare vedem **de ce** domeniile din tabel au exact aceste limite.

---

## Numere naturale pe 1 byte

Un numar natural se memoreaza pe 1 byte (tipul `unsigned char`) astfel:
1. se scrie numarul in baza 2
2. se completeaza la stanga cu zerouri nesemnificative, pana se ajunge la 8 cifre

### Exemplu: numarul 5

`5(10) = 101(2)`. Avem 3 cifre, deci adaugam 5 zerouri in fata:

```
pozitie:  7  6  5  4  3  2  1  0
bit:      0  0  0  0  0  1  0  1
```

### Ponderile bitilor

Fiecare pozitie are ponderea `2^pozitie`. Valoarea numarului este suma ponderilor bitilor care sunt `1`:

| pozitie  | 7   | 6  | 5  | 4  | 3 | 2 | 1 | 0 |
|----------|-----|----|----|----|---|---|---|---|
| pondere  | 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |
| **50**   | 0   | 0  | 1  | 1  | 0 | 0 | 1 | 0 |
| **109**  | 0   | 1  | 1  | 0  | 1 | 1 | 0 | 1 |

- `50 = 32 + 16 + 2`, deci `50 = 00110010`
- `109 = 64 + 32 + 8 + 4 + 1`, deci `109 = 01101101`

### Domeniul

- cea mai mica valoare: `00000000` = **0**
- cea mai mare valoare: `11111111` = 128 + 64 + 32 + 16 + 8 + 4 + 2 + 1 = **255**

> [!TIP] Sfat
> `11111111(2) = 2^8 - 1`. In general, un numar format din `k` cifre de `1` in baza 2 este egal cu `2^k - 1`. Gandeste-te la baza 10: `999 = 10^3 - 1`.

### In C++: memorare si afisare

Memoram numerele de mai sus in variabile `unsigned char` si le afisam:

```cpp
#include <iostream>
using namespace std;

unsigned char a, b, c, d;

int main()
{
    a = 5;
    b = 50;
    c = 109;
    d = 255;
    cout << (int)a << endl;
    cout << (int)b << endl;
    cout << (int)c << endl;
    cout << (int)d << endl;
    return 0;
}
```

**Intrare:**
```
(programul nu citeste nimic)
```

**Afisare:**
```
5
50
109
255
```

Fiecare variabila ocupa un singur byte, iar in memorie bitii sunt cei din tabelul de mai sus: `a` contine `00000101`, `b` contine `00110010`, `c` contine `01101101`, iar `d` contine `11111111`.

### De ce `(int)`?

`unsigned char` este un tip **de caractere**. Fara `(int)`, `cout` interpreteaza cei 8 biti ca **cod ASCII** si afiseaza caracterul corespunzator, nu numarul:

```cpp
#include <iostream>
using namespace std;

unsigned char b, c;

int main()
{
    b = 50;
    c = 109;
    cout << b << endl;
    cout << c << endl;
    cout << (int)b << endl;
    cout << (int)c << endl;
    return 0;
}
```

**Intrare:**
```
(programul nu citeste nimic)
```

**Afisare:**
```
2
m
50
109
```

Caracterul `'2'` are codul ASCII 50, iar caracterul `'m'` are codul ASCII 109. Bitii din memorie sunt aceiasi in ambele cazuri. Difera doar felul in care `cout` ii afiseaza.

> [!IMPORTANT] Important
> `(int)x` transforma valoarea lui `x` in `int` inainte de afisare. Pentru variabilele `char`, `unsigned char` si `signed char`, foloseste **intotdeauna** `(int)` cand vrei sa afisezi numarul.

### Citirea

Aceeasi problema apare la citire: `cin >> x`, cu `x` de tip `unsigned char`, citeste **un caracter**, nu un numar. Pentru intrarea `109`, `x` primeste caracterul `'1'`, adica valoarea 49.

De aceea citim numarul intr-o variabila `int` si abia apoi il copiem in `unsigned char`:

```cpp
#include <iostream>
using namespace std;

int n;
unsigned char x;

int main()
{
    cin >> n;
    x = n;
    cout << (int)x << endl;
    return 0;
}
```

**Intrare:**
```
109
```

**Afisare:**
```
109
```

**Intrare:**
```
300
```

**Afisare:**
```
44
```

Numarul 300 nu incape in 8 biti, asa ca in `x` ajung doar ultimii 8 biti ai lui. Vedem mai jos, la numerele pe 2 bytes, de ce acestia formeaza exact numarul `44`.

---

## Numere naturale pe 2 bytes

Pe 2 bytes (tipul `unsigned short`) avem **16 biti**, cu pozitiile de la `0` la `15`. Mecanismul este acelasi: scriem numarul in baza 2 si completam cu zerouri pana la 16 cifre.

### Exemplu: numarul 300

`300 = 256 + 32 + 8 + 4`, deci `300(10) = 100101100(2)`. Completam pana la 16 biti:

```
pozitie:  15 14 13 12 11 10  9  8    7  6  5  4  3  2  1  0
bit:       0  0  0  0  0  0  0  1    0  0  1  0  1  1  0  0
          |------ byte-ul 2 ------|  |------ byte-ul 1 ------|
```

Numarul 300 nu incape pe un singur byte (300 > 255), asa ca are nevoie de doi.

> [!NOTE] Observatie
> Cei doi bytes se pot calcula si direct: byte-ul din dreapta este `300 % 256 = 44` (`00101100`), iar cel din stanga este `300 / 256 = 1` (`00000001`). Este aceeasi idee ca la cifrele unui numar, doar ca "cifrele" sunt in baza 256.

### Domeniul

- cea mai mica valoare: 16 de `0` = **0**
- cea mai mare valoare: 16 de `1` = `2^16 - 1` = **65535**

> [!IMPORTANT] Important
> Pe `k` biti se pot memora numerele naturale de la `0` la `2^k - 1`, adica `2^k` valori diferite. Asa se explica randurile `unsigned` din tabel: 2^8 - 1 = 255, 2^16 - 1 = 65535, 2^32 - 1 = 4294967295.

### In C++

`unsigned short` nu este un tip de caractere, deci `cout` il afiseaza direct ca numar, fara `(int)`:

```cpp
#include <iostream>
using namespace std;

unsigned short x, y;

int main()
{
    x = 300;
    y = 65535;
    cout << x << endl;
    cout << y << endl;
    cout << sizeof(x) << endl;
    return 0;
}
```

**Intrare:**
```
(programul nu citeste nimic)
```

**Afisare:**
```
300
65535
2
```

`y` contine 16 biti de `1`, adica cea mai mare valoare a tipului, iar `sizeof(x)` confirma ca variabila ocupa 2 bytes.

> [!NOTE] Observatie
> Acum se vede de ce, mai sus, `300` copiat intr-un `unsigned char` a devenit `44`. Din cei doi bytes ai lui 300 (`00000001 00101100`) a ramas doar byte-ul din dreapta, `00101100 = 44 = 300 % 256`.

---

## Numere intregi pe 1 byte

Pentru numere care pot fi si negative (tipul `signed char`, sau `char` simplu pe g++) avem nevoie sa memoram si **semnul**. Forma de memorare se numeste **cod complementar**.

### Bitul de semn

Bitul de pe pozitia `7` devine **bitul de semn**:
- `0` pentru numere pozitive (si pentru 0)
- `1` pentru numere negative

Pentru valoarea propriu-zisa raman doar **7 biti** (pozitiile `0`-`6`).

### Numere pozitive

Se reprezinta exact ca la numerele naturale. Bitul de semn iese automat `0`, pentru ca valoarea incape pe 7 biti.

Exemplu: `5 = 00000101`.

### Numere negative

Pentru a obtine reprezentarea unui numar negativ `-x` facem 3 pasi:
1. scriem reprezentarea lui `x` (valoarea absoluta), ca la numerele pozitive
2. calculam **complementul fata de 1**: fiecare bit `0` devine `1` si fiecare bit `1` devine `0`
3. adunam `1` la rezultat (adunarea se face in baza 2)

### Exemplu: numarul -5

| pas                     | biti       |
|-------------------------|------------|
| 1. reprezentarea lui 5  | `00000101` |
| 2. complementul fata de 1 | `11111010` |
| 3. adunam 1             | `11111011` |

Deci `-5` se memoreaza ca `11111011`. Bitul de semn este `1`, ceea ce ne spune ca numarul e negativ.

### Drumul invers: ce numar este `11111011`?

Bitul de semn este `1`, deci numarul este negativ. Aplicam **aceiasi 3 pasi** ca sa aflam valoarea absoluta:
- complementul fata de 1: `00000100`
- adunam 1: `00000101` = 5

Deci `11111011` reprezinta numarul `-5`.

> [!TIP] Sfat
> Exista si o metoda mai rapida: in cod complementar, bitul de semn are ponderea **-128** in loc de +128. Restul bitilor au ponderile obisnuite.
> `11111011 = -128 + 64 + 32 + 16 + 8 + 2 + 1 = -128 + 123 = -5`

### Cateva valori de retinut

| numar  | reprezentare |
|--------|--------------|
| 0      | `00000000`   |
| 1      | `00000001`   |
| 127    | `01111111`   |
| -1     | `11111111`   |
| -5     | `11111011`   |
| -128   | `10000000`   |

### Domeniul

- cel mai mare numar: `01111111` = **127**
- cel mai mic numar: `10000000` = -128 + 0 = **-128**

Deci pe 8 biti, in cod complementar, se pot memora numerele intregi de la **-128** la **127**.

> [!NOTE] Observatie
> De ce avem -128, dar nu si +128? Cele 256 de combinatii de biti se impart in doua: 128 incep cu `0` si 128 incep cu `1`. Cele care incep cu `0` reprezinta numerele de la 0 la 127 (0 "ocupa" o combinatie), iar cele care incep cu `1` reprezinta numerele de la -1 la -128. Pentru +128 nu mai ramane nicio combinatie.

### In C++: memorare si afisare

Memoram valorile din tabelul de mai sus in variabile `signed char`. Ca la `unsigned char`, afisam cu `(int)`:

```cpp
#include <iostream>
using namespace std;

signed char a, b, c, d;

int main()
{
    a = 127;
    b = -1;
    c = -5;
    d = -128;
    cout << (int)a << endl;
    cout << (int)b << endl;
    cout << (int)c << endl;
    cout << (int)d << endl;
    return 0;
}
```

**Intrare:**
```
(programul nu citeste nimic)
```

**Afisare:**
```
127
-1
-5
-128
```

In memorie, cele patru variabile contin `01111111`, `11111111`, `11111011` si `10000000`.

### Aceiasi biti, cititi altfel

Daca punem `-5` intr-o variabila `signed char` si apoi copiem bitii intr-o variabila `unsigned char`, bitii raman aceiasi, doar ca sunt cititi ca numar natural:

```cpp
#include <iostream>
using namespace std;

signed char x;
unsigned char y;

int main()
{
    x = -5;
    y = x;
    cout << (int)y << endl;
    return 0;
}
```

**Intrare:**
```
(programul nu citeste nimic)
```

**Afisare:**
```
251
```

`11111011` citit ca numar natural este `128 + 64 + 32 + 16 + 8 + 2 + 1 = 251`.

> [!TIP] Sfat
> Observa ca `251 = 256 - 5`. In general, pe 8 biti, numarul negativ `-x` are aceiasi biti ca numarul natural `256 - x`.

---

## Generalizare: `int` si `long long`

Pe 16, 32 sau 64 de biti, mecanismul este acelasi: bitul cel mai din stanga este bitul de semn, iar numerele negative se obtin prin complement fata de 1 si adunare cu 1. Asa se explica domeniile din tabelul de la inceput:
- `int` are 32 de biti, deci domeniul este `-2^31 ... 2^31 - 1`, adica `-2147483648 ... 2147483647`
- `long long` are 64 de biti, deci domeniul este `-2^63 ... 2^63 - 1`

### Depasirea (overflow)

Ce se intampla daca un rezultat nu mai incape in tip? Bitii in plus se pierd si obtinem o valoare gresita:

```cpp
#include <iostream>
using namespace std;

unsigned char a;
signed char b;

int main()
{
    a = 255;
    a = a + 1;
    b = 127;
    b = b + 1;
    cout << (int)a << endl;
    cout << (int)b << endl;
    return 0;
}
```

**Intrare:**
```
(programul nu citeste nimic)
```

**Afisare:**
```
0
-128
```

- `255 + 1 = 256 = 100000000(2)`, care are 9 biti. Bitul al 9-lea nu incape in byte, se pierde, si raman `00000000` = **0**.
- `127 + 1 = 128 = 10000000(2)`. Pe `signed char`, bitul 7 este bitul de semn, deci `10000000` inseamna **-128**.

> [!WARNING] Atentie
> Acelasi lucru se intampla si cu `int`: daca un calcul trece de 2147483647, rezultatul este gresit (de obicei un numar negativ). Compilatorul **nu** te avertizeaza. Cand rezultatul poate fi mare (produse, sume ale multor numere), foloseste `long long`.

---

## Program: afisarea celor 8 biti ai unui numar

Se citeste un numar natural `n < 256`. Afisam reprezentarea lui interna pe 8 biti.

**Ideea:** cu `n % 2` si `n / 2` scoatem bitii lui `n` de la pozitia `0` spre pozitia `7`, ca la conversia in baza 2. Bitul de pe pozitia `i` il salvam in `b[i]`. La final afisam vectorul de la pozitia `7` la pozitia `0`, ca sa apara in ordinea in care scriem numerele.

> [!NOTE] Observatie
> Aici vectorul este indexat de la `0`, pentru ca indicele `i` este chiar pozitia bitului, numerotata de la `0`.

```cpp
#include <iostream>
using namespace std;

int n, i, b[8];

int main()
{
    cin >> n;
    for (i = 0; i <= 7; i++)
    {
        b[i] = n % 2;
        n = n / 2;
    }
    for (i = 7; i >= 0; i--)
    {
        cout << b[i];
    }
    return 0;
}
```

**Intrare:**
```
50
```

**Afisare:**
```
00110010
```

### Trasare cod

Pentru `n = 50`, primul `for`:

| i | n % 2 = b[i] | n dupa n / 2 |
|---|--------------|--------------|
| 0 | 0            | 25           |
| 1 | 1            | 12           |
| 2 | 0            | 6            |
| 3 | 0            | 3            |
| 4 | 1            | 1            |
| 5 | 1            | 0            |
| 6 | 0            | 0            |
| 7 | 0            | 0            |

Al doilea `for` afiseaza `b[7], b[6], ..., b[0]`, adica `0 0 1 1 0 0 1 0`.

> [!TIP] Sfat
> Dupa ce `n` ajunge la `0`, bitii ramasi ies `0`. Asa se obtin automat zerourile nesemnificative din fata.

In lectia urmatoare, [Operatori pe biti](operatori-pe-biti.md), vom scrie acelasi program mai simplu, cu operatori care lucreaza direct pe biti.
