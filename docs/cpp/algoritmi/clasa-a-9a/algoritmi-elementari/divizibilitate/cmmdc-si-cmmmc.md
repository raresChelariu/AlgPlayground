# CMMDC si CMMMC

**CMMDC** (Cel Mai Mare Divizor Comun) si **CMMMC** (Cel Mai Mic Multiplu Comun) sunt doua notiuni din divizibilitate pe care le tot intalnim in probleme.

> **Notatie matematica:** `(a, b)` inseamna CMMDC-ul lui `a` si `b`, iar `[a, b]` inseamna CMMMC-ul lor.

> **Obs:** Daca `(a, b) = 1`, spunem ca `a` si `b` sunt **prime intre ele** (coprime). O fractie `a / b` este **ireductibila** daca `a` si `b` sunt coprime.

---

## CMMDC — varianta babeasca

**Ideea:** plecam de la cel mai mic dintre cele doua numere (orice divizor comun e cel mult atat) si coboram pana cand gasim primul numar care divide ambele numere.

```cpp
#include <iostream>
using namespace std;

int x, y, start, i, cmmdc;

int main()
{
    cin >> x >> y;

    if (x < y)
    {
        start = x;
    }
    else
    {
        start = y;
    }

    for (i = start; i >= 1; i--)
    {
        if (x % i == 0 && y % i == 0)
        {
            cmmdc = i;
            break;
        }
    }

    cout << "CMMDC = " << cmmdc;
    return 0;
}
```

**Intrare:**
```
24 36
```
**Afisare:**
```
CMMDC = 12
```

> **Obs:** Pentru `x = y = 1 000 000 000`, algoritmul poate face 1 miliard de pasi. Mult prea lent.

---

## CMMDC — algoritmul lui Euclid

**Ideea:** la fiecare pas inlocuim perechea `(a, b)` cu `(b, a % b)`. Procesul se opreste cand `b` devine `0`; in acel moment `a` este CMMDC-ul.

### Trasare pentru `a = 24`, `b = 36`

| Pas | `a` | `b` | `r = a % b` |
|-----|-----|-----|-------------|
| 0   | 24  | 36  | 24          |
| 1   | 36  | 24  | 12          |
| 2   | 24  | 12  | 0           |
| 3   | 12  | 0   | —           |

CMMDC = 12.

### Programul

```cpp
#include <iostream>
using namespace std;

int a, b, r;

int main()
{
    cin >> a >> b;

    while (b != 0)
    {
        r = a % b;
        a = b;
        b = r;
    }

    cout << "CMMDC = " << a;
    return 0;
}
```

**Intrare:**
```
24 36
```
**Afisare:**
```
CMMDC = 12
```

> **Obs:** Algoritmul lui Euclid este extrem de rapid — pentru numere de pana la `10^18` face cateva zeci de pasi.

> **Obs:** Daca avem nevoie de valorile initiale ale lui `a` si `b` dupa apel, le salvam in alte variabile inainte de bucla (pentru ca bucla le modifica).

---

## CMMMC pornind de la CMMDC

**Proprietate:** pentru orice `a` si `b` naturale nenule:

```
(a, b) * [a, b] = a * b
```

De aici rezulta:

```
[a, b] = (a * b) / (a, b)
```

### Programul

```cpp
#include <iostream>
using namespace std;

// CMMMC poate fi un numar foarte mare,
// asa ca folosim long long
long long x, y, a, b, r, cmmmc;

int main()
{
    cin >> x >> y;
    a = x;
    b = y;

    while (b != 0)
    {
        r = a % b;
        a = b;
        b = r;
    }
    // a este acum CMMDC-ul

    cmmmc = (x * y) / a;
    cout << "CMMMC = " << cmmmc;
    return 0;
}
```

**Intrare:**
```
4 6
```
**Afisare:**
```
CMMMC = 12
```

> **Obs:** Folosim `long long` pentru ca produsul `x * y` poate depasi limita lui `int` chiar daca `x` si `y` separat sunt mici. Ex. `x = y = 100 000` => `x * y = 10^10`, deja peste `2 * 10^9`.

> **Obs:** Pastram `x` si `y` originali in `x` si `y` si lucram cu copii `a` si `b` in bucla, pentru ca apoi avem nevoie de produsul `x * y` la calculul CMMMC.

---

## CMMDC si CMMMC pentru `n` numere

**Proprietate:** CMMDC-ul si CMMMC-ul se calculeaza **prin compunere**:

```
(a, b, c, d) = (((a, b), c), d)
[a, b, c, d] = [[[a, b], c], d]
```

Asadar, pentru `n` numere citim primele doua, calculam rezultatul partial, apoi il combinam pe rand cu fiecare numar nou.

### Exemplu — CMMDC pentru `n` numere

```cpp
#include <iostream>
using namespace std;

int n, i, x, a, b, r, rez;

int main()
{
    cin >> n;
    cin >> rez;  // primul numar
    for (i = 2; i <= n; i++)
    {
        cin >> x;
        // calculam CMMDC(rez, x)
        a = rez;
        b = x;
        while (b != 0)
        {
            r = a % b;
            a = b;
            b = r;
        }
        rez = a;
    }
    cout << "CMMDC = " << rez;
    return 0;
}
```

**Intrare:**
```
4
12 18 24 30
```
**Afisare:**
```
CMMDC = 6
```

> **Obs:** Pentru CMMMC pentru `n` numere procedam la fel — doar ca dupa fiecare CMMDC partial calculam `rez = (rez * x) / cmmdc(rez, x)`.

> **Obs:** Daca un singur element este `0`, CMMDC-ul devine celalalt element (pentru ca `(0, k) = k`). Pe de alta parte, CMMMC-ul devine `0`, deci atentie la inputuri care contin zerouri.
