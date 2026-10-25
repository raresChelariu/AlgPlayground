# Operatori pe biti

**Operatorii pe biti** lucreaza direct pe reprezentarea interna a numerelor (vezi lectia [Reprezentarea interna a numerelor](reprezentare-interna.md)). Se aplica doar tipurilor intregi (`int`, `long long`, `char`, ...), nu si lui `double`.

| Operator | Nume                         | Exemplu   | Rezultat |
|----------|------------------------------|-----------|----------|
| `~`      | negatie (NOT)                | `~5`      | `-6`     |
| `&`      | conjunctie (SI pe biti)      | `5 & 3`   | `1`      |
| `\|`     | disjunctie (SAU pe biti)     | `15 \| 3` | `15`     |
| `^`      | sau exclusiv (XOR)           | `15 ^ 3`  | `12`     |
| `<<`     | deplasare la stanga (shift left)  | `4 << 2`  | `16` |
| `>>`     | deplasare la dreapta (shift right) | `14 >> 2` | `3` |

> [!NOTE] Observatie
> Un `int` are 32 de biti, dar in exemplele de mai jos scriem doar ultimii 8, ca sa se citeasca usor. Pentru numerele mici din exemple, bitii din fata sunt toti `0` (sau toti `1`, la numerele negative), iar rezultatul este acelasi.

> [!WARNING] Atentie
> Nu confunda `&` cu `&&` si `|` cu `||`. `&&` si `||` sunt operatorii **logici** din lectia de expresii: lucreaza cu numerele intregi ca valori de adevar si dau `0` sau `1`. `&` si `|` lucreaza **bit cu bit** si pot da orice numar. De exemplu `4 && 3` este `1` (ambele sunt diferite de 0), dar `4 & 3` este `0` (`100 & 011 = 000`).

---

## Operatorul `~` (negatie)

Este un operator **unar** (are un singur operand). Inverseaza fiecare bit: `0` devine `1` si `1` devine `0`.

| bit | `~bit` |
|-----|--------|
| 0   | 1      |
| 1   | 0      |

### Exemplu: `~5 == -6`

```
 5  = 00000101
~5  = 11111010
```

Cine este `11111010`? Bitul de semn este `1`, deci numarul este negativ. Cu metoda din lectia trecuta: `-128 + 64 + 32 + 16 + 8 + 2 = -128 + 122 = -6`.

> [!TIP] Sfat
> Pentru orice numar intreg `x`, avem `~x == -x - 1`. Motivul: `-x` se obtine ca `~x + 1` (complement fata de 1, apoi +1), deci `~x = -x - 1`.

---

## Operatorul `&` (SI pe biti)

Este un operator **binar** (are doi operanzi). Compara bitii de pe aceeasi pozitie: rezultatul are `1` doar acolo unde **ambii** biti sunt `1`.

| a | b | `a & b` |
|---|---|---------|
| 0 | 0 | 0       |
| 0 | 1 | 0       |
| 1 | 0 | 0       |
| 1 | 1 | 1       |

### Exemplu: `5 & 3 == 1`

```
  00000101   (5)
& 00000011   (3)
  --------
  00000001   (1)
```

> [!TIP] Sfat
> `&` cu un bit `0` **sterge** bitul, iar `&` cu un bit `1` il **pastreaza**. Asa vom extrage bitii care ne intereseaza dintr-un numar.

---

## Operatorul `|` (SAU pe biti)

Rezultatul are `1` acolo unde **cel putin unul** dintre biti este `1`.

| a | b | `a \| b` |
|---|---|----------|
| 0 | 0 | 0        |
| 0 | 1 | 1        |
| 1 | 0 | 1        |
| 1 | 1 | 1        |

### Exemplu: `15 | 3 == 15`

```
  00001111   (15)
| 00000011   (3)
  --------
  00001111   (15)
```

> [!TIP] Sfat
> `|` cu un bit `1` **pune** bitul pe `1`, iar `|` cu un bit `0` il **pastreaza**.

---

## Operatorul `^` (sau exclusiv, XOR)

Rezultatul are `1` acolo unde bitii sunt **diferiti**.

| a | b | `a ^ b` |
|---|---|---------|
| 0 | 0 | 0       |
| 0 | 1 | 1       |
| 1 | 0 | 1       |
| 1 | 1 | 0       |

### Exemplu: `15 ^ 3 == 12`

```
  00001111   (15)
^ 00000011   (3)
  --------
  00001100   (12)
```

### Proprietati

- `x ^ x == 0` — orice bit XOR el insusi da `0`
- `x ^ 0 == x` — XOR cu `0` nu schimba nimic
- `x ^ y == y ^ x` si `(x ^ y) ^ z == x ^ (y ^ z)` — putem schimba ordinea si gruparea

Din ele rezulta `(x ^ y) ^ y == x`: daca aplici de doua ori XOR cu acelasi `y`, te intorci la `x`. Folosim aceasta proprietate in [Probleme rezolvate](probleme-rezolvate.md), la interschimbarea a doua numere.

> [!TIP] Sfat
> `^` cu un bit `1` **inverseaza** bitul, iar `^` cu un bit `0` il **pastreaza**.

> [!WARNING] Atentie
> In C++, `^` **nu** este ridicare la putere! `2 ^ 3` este `1` (`010 ^ 011 = 001`), nu `8`. Pentru puterile lui 2 folosim `<<`, ca mai jos.

---

## Operatorul `<<` (deplasare la stanga)

`x << k` muta toti bitii lui `x` cu `k` pozitii **la stanga**. Bitii care ies prin stanga se pierd, iar in dreapta intra zerouri.

### Exemplu: `4 << 2 == 16`

```
4       = 00000100
4 << 2  = 00010000   (16)
```

Fiecare deplasare cu o pozitie la stanga **dubleaza** numarul, la fel cum in baza 10 adaugarea unui `0` la final il inmulteste cu 10. Rezulta:
- `x << k == x · 2^k`
- `1 << k == 2^k` (bitul `1` ajunge pe pozitia `k`)

| expresie | biti       | valoare |
|----------|------------|---------|
| `1 << 0` | `00000001` | 1       |
| `1 << 1` | `00000010` | 2       |
| `1 << 2` | `00000100` | 4       |
| `1 << 3` | `00001000` | 8       |
| `1 << 7` | `10000000` | 128     |

> [!WARNING] Atentie
> `1` este un `int`, deci `1 << k` are doar 32 de biti. Pentru `k >= 31` rezultatul este gresit. Daca ai nevoie de `2^k` cu `k` intre 31 si 62, scrie `1LL << k` (`1LL` este `1` de tip `long long`).

---

## Operatorul `>>` (deplasare la dreapta)

`x >> k` muta toti bitii lui `x` cu `k` pozitii **la dreapta**. Ultimii `k` biti (cei din dreapta) se pierd, iar in stanga intra zerouri.

### Exemplu: `14 >> 2 == 3`

```
14       = 00001110
14 >> 2  = 00000011   (3)
```

Fiecare deplasare cu o pozitie la dreapta **injumatateste** numarul (impartire intreaga). Rezulta:
- `x >> 1 == x / 2`
- `x >> k == x / 2^k`

> [!NOTE] Observatie
> La numerele negative, pe g++, in stanga intra bitul de semn (`1`), nu `0`. De exemplu `-8 >> 1 == -4`. In problemele noastre folosim `>>` doar pe numere naturale.

---

## Operatori compusi

Ca la `+=` si `*=`, fiecare operator binar pe biti are o forma compusa:

| scris scurt | inseamna      |
|-------------|---------------|
| `x &= y`    | `x = x & y`   |
| `x \|= y`   | `x = x \| y`  |
| `x ^= y`    | `x = x ^ y`   |
| `x <<= k`   | `x = x << k`  |
| `x >>= k`   | `x = x >> k`  |

---

## Program: toti operatorii

```cpp
#include <iostream>
using namespace std;

int main()
{
    cout << (~5) << endl;
    cout << (5 & 3) << endl;
    cout << (15 | 3) << endl;
    cout << (15 ^ 3) << endl;
    cout << (4 << 2) << endl;
    cout << (14 >> 2) << endl;
    return 0;
}
```

**Intrare:**
```
(programul nu citeste nimic)
```

**Afisare:**
```
-6
1
15
12
16
3
```

> [!WARNING] Atentie
> Parantezele din jurul expresiilor sunt obligatorii. `cout << 4 << 2` ar afisa `4` si apoi `2`, pentru ca `<<` este si operatorul de afisare.

---

## Masti de biti

O **masca** este un numar ales special, care are `1` exact pe pozitiile bitilor cu care vrem sa lucram. Combinand masca cu `&`, `|` sau `^`, putem citi sau modifica un singur bit, fara sa ii atingem pe ceilalti.

Masca pentru bitul de pe pozitia `B` este `1 << B`: are un singur `1`, pe pozitia `B`.

### Testarea unui bit

Vrem sa aflam daca bitul `B` al lui `x` este `0` sau `1`. Aplicam `&` cu masca: toti ceilalti biti devin `0`, iar bitul `B` ramane cum era.

Exemplu: `x = 47`, testam bitul `3` (masca `00001000`) si bitul `6` (masca `01000000`):

```
  00101111   (47)          00101111   (47)
& 00001000   (1 << 3)    & 01000000   (1 << 6)
  --------                 --------
  00001000   != 0          00000000   == 0
```

Deci bitul `3` este `1`, iar bitul `6` este `0`.

```cpp
if ((x & (1 << B)) != 0)
    cout << "bitul este 1";
```

> [!TIP] Sfat
> O varianta echivalenta este `(x >> B) & 1`: aducem bitul `B` pe pozitia `0` si pastram doar acel bit. Rezultatul este chiar valoarea bitului, `0` sau `1`.

### Setarea unui bit la 1

Aplicam `|` cu masca: bitul `B` devine `1`, ceilalti raman neschimbati.

Exemplu: `x = 50`, setam bitul `2`:

```
  00110010   (50)
| 00000100   (1 << 2)
  --------
  00110110   (54)
```

```cpp
x = x | (1 << B);    // sau x |= 1 << B;
```

### Setarea unui bit la 0

Avem nevoie de o masca cu `1` peste tot, **in afara** de pozitia `B`. Aceasta este `~(1 << B)`. Aplicam `&`: bitul `B` devine `0`, ceilalti raman neschimbati.

Exemplu: `x = 109`, setam bitul `5` la `0`:

```
  01101101   (109)
& 11011111   (~(1 << 5))
  --------
  01001101   (77)
```

```cpp
x = x & ~(1 << B);    // sau x &= ~(1 << B);
```

> [!NOTE] Observatie
> Daca lucram doar pe 8 biti, masca se poate scrie si `255 ^ (1 << B)` sau `255 - (1 << B)`: pornim de la `255 = 11111111` si stingem bitul `B`.

### Schimbarea unui bit

Aplicam `^` cu masca: bitul `B` se inverseaza (`0` devine `1`, `1` devine `0`), ceilalti raman neschimbati.

```cpp
x = x ^ (1 << B);    // sau x ^= 1 << B;
```

### Ultimii B biti

Masca `(1 << B) - 1` are `1` pe ultimii `B` biti si `0` in rest. De exemplu, pentru `B = 3`: `(1 << 3) - 1 = 8 - 1 = 7 = 00000111`.

Ultimii `B` biti ai lui `x` reprezinta exact **restul impartirii lui `x` la `2^B`**. Exemplu: `x = 50`, `B = 3`:

```
  00110010   (50)
& 00000111   (7)
  --------
  00000010   (2)
```

Si intr-adevar `50 % 8 == 2`.

```cpp
r = x & ((1 << B) - 1);    // la fel cu x % (1 << B)
```

### Paritatea

Un caz particular: ultimul bit spune daca numarul este par sau impar. `x & 1` pastreaza doar bitul de pe pozitia `0`:
- `(x & 1) == 1` daca `x` este impar
- `(x & 1) == 0` daca `x` este par

Parantezele sunt obligatorii, vezi sectiunea despre prioritate de mai jos.

### Rezumat

| Ce vrem                  | Expresie                  |
|--------------------------|---------------------------|
| testam bitul `B`         | `(x & (1 << B)) != 0`     |
| valoarea bitului `B`     | `(x >> B) & 1`            |
| bitul `B` devine 1       | `x \| (1 << B)`           |
| bitul `B` devine 0       | `x & ~(1 << B)`           |
| inversam bitul `B`       | `x ^ (1 << B)`            |
| ultimii `B` biti         | `x & ((1 << B) - 1)`      |
| `x` este impar           | `(x & 1) == 1`            |

### Program: operatii cu un bit

Se citesc `x` si `b`. Afisam valoarea bitului `b` si valorile obtinute dupa ce bitul este setat la `1`, setat la `0` si inversat.

```cpp
#include <iostream>
using namespace std;

int x, b;

int main()
{
    cin >> x >> b;
    if ((x & (1 << b)) != 0)
        cout << "bitul " << b << " este 1" << endl;
    else
        cout << "bitul " << b << " este 0" << endl;
    cout << "setat la 1: " << (x | (1 << b)) << endl;
    cout << "setat la 0: " << (x & ~(1 << b)) << endl;
    cout << "schimbat: " << (x ^ (1 << b)) << endl;
    return 0;
}
```

**Intrare:**
```
50 2
```

**Afisare:**
```
bitul 2 este 0
setat la 1: 54
setat la 0: 50
schimbat: 54
```

**Intrare:**
```
109 5
```

**Afisare:**
```
bitul 5 este 1
setat la 1: 109
setat la 0: 77
schimbat: 77
```

---

## Prioritatea operatorilor

Operatorii pe biti au o prioritate care surprinde aproape pe toata lumea:
- `<<` si `>>` au prioritate **mai mica** decat `+` si `-`
- `&`, `^`, `|` au prioritate **mai mica** decat `==` si `!=`

### Greseala 1: `x & 1 == 0`

Pentru `x = 4` (par), ne asteptam ca expresia sa fie adevarata. Dar `==` se evalueaza primul:

```cpp
x & 1 == 0      // se calculeaza x & (1 == 0) = 4 & 0 = 0  -> fals!
(x & 1) == 0    // se calculeaza 0 == 0 = 1                 -> adevarat
```

### Greseala 2: `1 << B - 1`

Pentru `B = 3`, vrem masca `7`. Dar `-` se evalueaza primul:

```cpp
1 << B - 1      // se calculeaza 1 << (3 - 1) = 4  -> gresit!
(1 << B) - 1    // se calculeaza 8 - 1 = 7          -> corect
```

> [!WARNING] Atentie
> Pune **intotdeauna** paranteze in jurul operatiilor pe biti. Greselile de prioritate nu dau eroare la compilare: programul ruleaza, dar da rezultate gresite. Pana si suportul de curs al lotului de juniori din 2015, dupa care e construita aceasta lectie, scrie gresit `X & (1 << B - 1)`.

---

## Program: afisarea celor 32 de biti ai unui `int`

Rescriem programul de la finalul lectiei trecute, de data aceasta cu operatori pe biti si pentru toti cei 32 de biti ai unui `int`.

**Ideea:** pentru fiecare pozitie `i`, de la `31` la `0`, valoarea bitului este `(n >> i) & 1`. Nu mai avem nevoie de vector, pentru ca luam bitii direct in ordinea in care ii afisam.

```cpp
#include <iostream>
using namespace std;

int n, i;

int main()
{
    cin >> n;
    for (i = 31; i >= 0; i--)
    {
        cout << ((n >> i) & 1);
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
00000000000000000000000000110010
```

**Intrare:**
```
-5
```

**Afisare:**
```
11111111111111111111111111111011
```

> [!NOTE] Observatie
> La `-5` se vede codul complementar pe 32 de biti: bitul de semn este `1`, iar ultimii 8 biti sunt aceiasi `11111011` ca la reprezentarea pe un byte. Complementarea si adunarea cu 1 umplu cu `1` toti bitii din fata.
