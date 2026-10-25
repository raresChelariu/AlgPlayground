# Probleme rezolvate cu operatii pe biti

In aceasta lectie aplicam operatorii din lectia [Operatori pe biti](operatori-pe-biti.md) pe cateva probleme clasice. Problemele 1-5 sunt adaptate dupa suportul de curs "Operatii pe biti" al lotului national de juniori (prof. Dana Lica, 2015).

---

## Problema 1: numarul de biti de 1

Se citeste un numar natural nenul `n < 2 000 000 000`. Cate cifre de `1` are reprezentarea lui in baza 2?

### Solutia 1: parcurgem bitii

**Ideea:** `n < 2^31`, deci toti bitii lui `n` se afla pe pozitiile `0`..`30`. Testam fiecare bit cu masca `1 << i` si numaram bitii de `1`.

```cpp
#include <iostream>
using namespace std;

int n, i, nr;

int main()
{
    cin >> n;
    nr = 0;
    for (i = 0; i <= 30; i++)
    {
        if ((n & (1 << i)) != 0)
            nr++;
    }
    cout << nr;
    return 0;
}
```

**Intrare:**
```
50
```

**Afisare:**
```
3
```

`50 = 110010(2)` are trei cifre de `1`.

### Solutia 2: `n & (n - 1)`

**Ideea:** expresia `n & (n - 1)` **sterge ultimul bit de 1** al lui `n`. De ce? Cand scadem 1, ultimul bit de `1` devine `0`, iar toti zerourile din dreapta lui devin `1`. Bitii din stanga raman la fel. Aplicand `&`, partea din dreapta se anuleaza:

```
n           = 110010
n - 1       = 110001
n & (n - 1) = 110000
```

Repetam pana cand `n` ajunge la `0`. La fiecare pas dispare exact un bit de `1`, deci numarul de pasi este chiar raspunsul.

```cpp
#include <iostream>
using namespace std;

int n, nr;

int main()
{
    cin >> n;
    nr = 0;
    while (n != 0)
    {
        n = n & (n - 1);
        nr++;
    }
    cout << nr;
    return 0;
}
```

**Intrare:**
```
50
```

**Afisare:**
```
3
```

### Trasare cod

Pentru `n = 50`:

| pas | n inainte  | n - 1      | n & (n - 1) | nr |
|-----|------------|------------|-------------|----|
| 1   | `110010`   | `110001`   | `110000`    | 1  |
| 2   | `110000`   | `101111`   | `100000`    | 2  |
| 3   | `100000`   | `011111`   | `000000`    | 3  |

Dupa pasul 3, `n == 0`, deci `while`-ul se opreste si afisam `3`.

> [!TIP] Sfat
> Retine tiparul `n & (n - 1)` = "`n` fara ultimul bit de 1". Solutia 2 face atatia pasi cati biti de `1` are `n`, in timp ce solutia 1 face mereu 31 de pasi. Tiparul apare si in problemele urmatoare.

---

## Problema 2: putere a lui 2

Se citeste un numar natural `n`. Afisati `DA` daca `n` este o putere a lui 2 si `NU` in caz contrar.

**Ideea:** puterile lui 2 au **un singur** bit de `1` in baza 2: `1 = 1`, `2 = 10`, `4 = 100`, `8 = 1000`, ... Daca stergem acel bit cu `n & (n - 1)`, ramane `0`. La orice alt numar ramane cel putin un bit de `1`.

```cpp
#include <iostream>
using namespace std;

int n;

int main()
{
    cin >> n;
    if (n > 0 && (n & (n - 1)) == 0)
        cout << "DA";
    else
        cout << "NU";
    return 0;
}
```

**Intrare:**
```
64
```

**Afisare:**
```
DA
```

**Intrare:**
```
48
```

**Afisare:**
```
NU
```

- `64 = 1000000`, `63 = 0111111`, iar `64 & 63 = 0`, deci DA
- `48 = 110000`, `47 = 101111`, iar `48 & 47 = 100000 = 32`, deci NU

> [!WARNING] Atentie
> Parantezele din `(n & (n - 1)) == 0` sunt obligatorii. Fara ele, `n & (n - 1) == 0` se calculeaza ca `n & ((n - 1) == 0)`, pentru ca `==` are prioritate mai mare decat `&`.

> [!IMPORTANT] Important
> Conditia `n > 0` este necesara: pentru `n = 0`, `0 & (0 - 1)` este tot `0`, dar 0 nu este putere a lui 2.

---

## Problema 3: cea mai mare putere a lui 2 care divide n

Se citeste un numar natural nenul `n`. Care este cea mai mare putere a lui 2 care il divide pe `n`?

**Ideea:** in baza 2, inmultirea cu 2 adauga un `0` la final. Deci `n` se divide cu `2^k` exact atunci cand ultimele `k` cifre binare sunt `0`. Raspunsul este `2^p`, unde `p` este **pozitia ultimului bit de 1**.

Exemplu: `n = 324 = 101000100(2)`. Ultimul bit de `1` este pe pozitia `2`, deci raspunsul este `2^2 = 4`. Verificare: `324 = 4 · 81`, iar 81 este impar.

### Varianta 1: cautam ultimul bit de 1

Pornim de la pozitia `0` si avansam cat timp bitul curent este `0`:

```cpp
i = 0;
while ((n & (1 << i)) == 0)
{
    i++;
}
// raspunsul este 1 << i
```

### Varianta 2: `n ^ (n & (n - 1))`

`n & (n - 1)` este `n` fara ultimul bit de 1. Daca facem XOR intre `n` si acest numar, toti bitii comuni se anuleaza si ramane **doar** ultimul bit de 1:

```
n                   = 101000100
n & (n - 1)         = 101000000
n ^ (n & (n - 1))   = 000000100   (4)
```

### Varianta 3: `n & (-n)`

Aici folosim codul complementar din lectia [Reprezentarea interna a numerelor](reprezentare-interna.md). Stim ca `-n = ~n + 1`. Pe 16 biti:

```
n        = 0000000101000100
~n       = 1111111010111011
-n = ~n+1= 1111111010111100
n & (-n) = 0000000000000100   (4)
```

`~n` inverseaza toti bitii. Adunarea cu 1 transforma bitii de `1` de la final inapoi in `0` si se opreste exact pe pozitia ultimului bit de 1 al lui `n`, care redevine `1`. In stanga acestei pozitii, `n` si `-n` au biti opusi, deci `&` le anuleaza.

### Programul

Programul calculeaza raspunsul cu toate cele trei variante:

```cpp
#include <iostream>
using namespace std;

int n, i;

int main()
{
    cin >> n;
    i = 0;
    while ((n & (1 << i)) == 0)
    {
        i++;
    }
    cout << (1 << i) << endl;
    cout << (n ^ (n & (n - 1))) << endl;
    cout << (n & (-n)) << endl;
    return 0;
}
```

**Intrare:**
```
324
```

**Afisare:**
```
4
4
4
```

> [!TIP] Sfat
> `n & (-n)` este cea mai scurta forma si merita retinuta: "ultimul bit de 1 al lui `n`". Este folosita in structuri de date mai avansate, cum ar fi arborii indexati binar.

---

## Problema 4: pozitia celui mai semnificativ bit de 1

Se citeste un numar natural nenul `n`. Pe ce pozitie se afla primul bit de 1 (cel mai din stanga) al lui `n`?

Exemplu: `n = 324 = 101000100(2)` are 9 cifre binare, deci primul bit de 1 este pe pozitia `8`.

### Solutia 1: deplasam la dreapta

**Ideea:** la fiecare `n = n >> 1` dispare ultima cifra binara. Numaram cate deplasari fac pana cand `n` ajunge la `0`. Daca `n` are `c` cifre binare, avem `c` deplasari, iar pozitia cautata este `c - 1`. De aceea pornim cu `poz = -1`.

```cpp
#include <iostream>
using namespace std;

int n, poz;

int main()
{
    cin >> n;
    poz = -1;
    while (n != 0)
    {
        n = n >> 1;
        poz++;
    }
    cout << poz;
    return 0;
}
```

**Intrare:**
```
324
```

**Afisare:**
```
8
```

> [!NOTE] Observatie
> Este aceeasi idee ca la numarul de cifre al unui numar in baza 10, doar ca `/ 10` este inlocuit cu `>> 1`, adica `/ 2`.

### Solutia 2: umplem cu 1 la dreapta

**Ideea:** daca transformam toti bitii din dreapta primului bit de 1 tot in `1`, numarul de biti de `1` devine egal cu numarul de cifre binare. Pentru asta aplicam `n = n | (n >> k)` cu `k = 1, 2, 4, 8, 16`:

```
n                 = 100000000
n = n | (n >> 1)  = 110000000   (2 biti de 1)
n = n | (n >> 2)  = 111100000   (4 biti de 1)
n = n | (n >> 4)  = 111111110   (8 biti de 1)
n = n | (n >> 8)  = 111111111   (9 biti de 1, toti)
```

La fiecare pas, numarul de biti de `1` de la inceput se dubleaza. Dupa deplasarile cu 1, 2, 4, 8 si 16 sunt acoperiti toti cei 31 de biti ai unui `int` pozitiv. La final numaram bitii de `1` cu metoda din problema 1 si scadem 1.

```cpp
#include <iostream>
using namespace std;

int n, nr;

int main()
{
    cin >> n;
    n = n | (n >> 1);
    n = n | (n >> 2);
    n = n | (n >> 4);
    n = n | (n >> 8);
    n = n | (n >> 16);
    nr = 0;
    while (n != 0)
    {
        n = n & (n - 1);
        nr++;
    }
    cout << nr - 1;
    return 0;
}
```

**Intrare:**
```
324
```

**Afisare:**
```
8
```

Pentru `324 = 101000100`, dupa cele 5 operatii obtinem `111111111 = 511`, care are 9 biti de `1`, deci afisam `9 - 1 = 8`.

---

## Problema 5: principiul includerii si excluderii

Se dau un numar natural `n <= 2 000 000 000` si `k <= 20` numere prime distincte `v[1], v[2], ..., v[k]`. Cate numere din intervalul `[1, n]` se divid cu **cel putin unul** dintre cele `k` numere prime?

Exemplu: pentru `n = 20` si numerele prime `2, 3, 5, 7`, raspunsul este `15`. Singurele numere din `[1, 20]` care nu se divid cu niciunul sunt `1, 11, 13, 17, 19`.

### Ideea matematica

Cate numere din `[1, n]` se divid cu `d`? Sunt multiplii lui `d`: `d, 2d, 3d, ...`, adica `n / d` numere (impartire intreaga).

Pentru doua numere prime, de exemplu 2 si 3:
- `20 / 2 = 10` numere se divid cu 2
- `20 / 3 = 6` numere se divid cu 3
- dar numerele care se divid cu **ambele** (adica cu `2 · 3 = 6`) au fost numarate de doua ori, deci le scadem o data: `20 / 6 = 3`

Rezultat: `10 + 6 - 3 = 13`.

Pentru mai multe numere, regula generala (**principiul includerii si excluderii**) este:
- luam pe rand fiecare **submultime nevida** de numere prime
- calculam produsul lor `p` si termenul `n / p`
- termenul se **aduna** daca submultimea are un numar **impar** de elemente si se **scade** daca are un numar **par**

> [!IMPORTANT] Important
> Numerele trebuie sa fie prime (si distincte). Doar asa un numar se divide cu mai multe dintre ele exact atunci cand se divide cu **produsul** lor. De exemplu, un numar divizibil cu 4 si cu 6 nu se divide neaparat cu 24 (12 este un contraexemplu).

### Submultimi reprezentate prin biti

Cum parcurgem toate submultimile? Fiecare submultime a lui `{v[1], ..., v[k]}` poate fi descrisa de un numar `s` de `k` biti: bitul `j - 1` al lui `s` este `1` daca `v[j]` face parte din submultime si `0` in caz contrar.

Pentru `k = 4` si `v = 2, 3, 5, 7`:

| s  | biti (`v[4] v[3] v[2] v[1]`) | submultimea |
|----|------------------------------|-------------|
| 1  | `0001`                       | {2}         |
| 3  | `0011`                       | {2, 3}      |
| 6  | `0110`                       | {3, 5}      |
| 15 | `1111`                       | {2, 3, 5, 7}|

Numerele de la `1` la `2^k - 1` descriu **toate** submultimile nevide, fiecare o singura data. Pentru `k = 20` sunt `2^20 - 1`, aproximativ un milion de submultimi.

### Programul

```cpp
#include <iostream>
using namespace std;

int k, i, j, s, nrPrime;
int v[21];
long long n, produs, total;

int main()
{
    cin >> n >> k;
    for (i = 1; i <= k; i++)
    {
        cin >> v[i];
    }
    total = 0;
    for (s = 1; s <= (1 << k) - 1; s++)
    {
        produs = 1;
        nrPrime = 0;
        for (j = 1; j <= k; j++)
        {
            if ((s & (1 << (j - 1))) != 0)
            {
                nrPrime++;
                if (produs <= n)
                    produs = produs * v[j];
            }
        }
        if (nrPrime % 2 == 1)
            total = total + n / produs;
        else
            total = total - n / produs;
    }
    cout << total;
    return 0;
}
```

**Intrare:**
```
20 4
2 3 5 7
```

**Afisare:**
```
15
```

> [!WARNING] Atentie
> Produsul a 20 de numere prime depaseste cu mult si `long long`. De aceea inmultim doar cat timp `produs <= n`. Odata ce `produs > n`, termenul `n / produs` este oricum `0`, deci nu ne mai intereseaza valoarea exacta. Iar cat timp `produs <= n <= 2 · 10^9`, o inmultire cu un prim de cel mult `2 · 10^9` da cel mult `4 · 10^18`, care incape in `long long`.

### Trasare

Pentru `n = 20` si `v = 2, 3, 5, 7`:

| s  | biti   | submultimea   | produs | nr. elemente | termen   |
|----|--------|---------------|--------|--------------|----------|
| 1  | `0001` | {2}           | 2      | 1            | +10      |
| 2  | `0010` | {3}           | 3      | 1            | +6       |
| 3  | `0011` | {2, 3}        | 6      | 2            | -3       |
| 4  | `0100` | {5}           | 5      | 1            | +4       |
| 5  | `0101` | {2, 5}        | 10     | 2            | -2       |
| 6  | `0110` | {3, 5}        | 15     | 2            | -1       |
| 7  | `0111` | {2, 3, 5}     | 30     | 3            | +0       |
| 8  | `1000` | {7}           | 7      | 1            | +2       |
| 9  | `1001` | {2, 7}        | 14     | 2            | -1       |
| 10 | `1010` | {3, 7}        | 21     | 2            | -0       |
| 11 | `1011` | {2, 3, 7}     | 42     | 3            | +0       |
| 12 | `1100` | {5, 7}        | 35     | 2            | -0       |
| 13 | `1101` | {2, 5, 7}     | 70     | 3            | +0       |
| 14 | `1110` | {3, 5, 7}     | 105    | 3            | -0       |
| 15 | `1111` | {2, 3, 5, 7}  | 210    | 4            | -0       |

Total: `10 + 6 - 3 + 4 - 2 - 1 + 2 - 1 = 15`.

> [!TIP] Sfat
> Tiparul "`for (s = 0; s <= (1 << k) - 1; s++)` + testarea bitilor lui `s`" genereaza toate submultimile unei multimi cu `k` elemente. Merita retinut: apare in multe probleme in care `k` este mic (cel mult 20-25).

---

## Problema 6: interschimbarea a doua numere folosind XOR

Se citesc doua numere intregi `a` si `b`. Interschimbati valorile lor **fara** o variabila auxiliara.

**Ideea:** folosim proprietatile lui XOR din lectia [Operatori pe biti](operatori-pe-biti.md):
- `x ^ x == 0`
- `x ^ 0 == x`
- deci `(x ^ y) ^ y == x` si `(x ^ y) ^ x == y`

Dupa `a = a ^ b`, variabila `a` contine "amestecul" celor doua valori. Din amestec putem recupera oricare valoare facand XOR cu cealalta.

```cpp
#include <iostream>
using namespace std;

int a, b;

int main()
{
    cin >> a >> b;
    a = a ^ b;
    b = a ^ b;
    a = a ^ b;
    cout << a << " " << b;
    return 0;
}
```

**Intrare:**
```
5 3
```

**Afisare:**
```
3 5
```

### Trasare cod

| instructiune | a              | b              | explicatie                                  |
|--------------|----------------|----------------|---------------------------------------------|
| start        | `00000101` (5) | `00000011` (3) |                                             |
| `a = a ^ b`  | `00000110` (6) | `00000011` (3) | `a` tine amestecul `5 ^ 3`                  |
| `b = a ^ b`  | `00000110` (6) | `00000101` (5) | `(5 ^ 3) ^ 3 = 5`, deci `b` primeste vechiul `a` |
| `a = a ^ b`  | `00000011` (3) | `00000101` (5) | `(5 ^ 3) ^ 5 = 3`, deci `a` primeste vechiul `b` |

> [!TIP] Sfat
> Cele trei instructiuni se pot scrie si cu operatorul compus: `a ^= b; b ^= a; a ^= b;`

> [!WARNING] Atentie
> Metoda **nu functioneaza** daca `a` si `b` sunt **aceeasi variabila**. De exemplu, la interschimbarea `v[i]` cu `v[j]` cand `i == j`, prima instructiune `v[i] = v[i] ^ v[i]` face elementul `0`, iar valoarea initiala se pierde. Doua variabile diferite care au aceeasi valoare nu sunt o problema: pentru intrarea `7 7` se afiseaza corect `7 7`.

> [!NOTE] Observatie
> In programele obisnuite, interschimbarea cu o variabila auxiliara (`aux = a; a = b; b = aux;`) sau cu `swap(a, b)` este la fel de rapida si mai usor de citit. Interschimbarea cu XOR este un truc care merita stiut, mai ales pentru ca apare in grilele de la BAC.
