# Determinarea divizorilor unui numar

Vrem sa afisam **toti divizorii** unui numar natural `n`. Pornim de la varianta cea mai simpla si o optimizam pas cu pas.

## Definitie

Un numar `d` este **divizor** al lui `n` daca `n % d == 0`, adica `n` se imparte exact la `d` (rest 0).

> **Obs:** Toti divizorii lui `n` se afla in intervalul `[1, n]`. Numerele `1` si `n` se numesc **divizori improprii**. Restul (din intervalul `[2, n-1]`) se numesc **divizori proprii**.

---

## Varianta 1 — metoda banala

Pentru fiecare `i` din `[1, n]` verificam daca este divizor.

```cpp
#include <iostream>
using namespace std;

int n, i;

int main()
{
    cin >> n;

    cout << "Divizorii lui " << n << " sunt: ";
    for (i = 1; i <= n; i++)
    {
        if (n % i == 0)
        {
            cout << i << " ";
        }
    }
    return 0;
}
```

**Intrare:**
```
12
```
**Afisare:**
```
Divizorii lui 12 sunt: 1 2 3 4 6 12
```

> **Obs:** Pentru `n = 1 000 000 000`, algoritmul face 1 miliard de pasi — prea mult. Cautam o varianta mai rapida.

---

## Varianta 2 — merg pana la jumatate

**Observatie:** nu exista divizor propriu al lui `n` mai mare decat `n/2`.

**Demonstratie:** presupunem ca exista un divizor propriu `d > n/2`. Atunci exista `x` natural cu `x * d = n`, deci `x = n / d`. Din `d > n/2` rezulta `x < 2`, adica `x = 1`. Dar `x = 1` inseamna `d = n`, ceea ce contrazice faptul ca `d` e divizor **propriu**. Contradictie.

Deci toti divizorii lui `n` sunt: `1`, `n` si cei din intervalul `[2, n/2]`.

```cpp
#include <iostream>
using namespace std;

int n, i, jumatate;

int main()
{
    cin >> n;

    cout << "Divizorii lui " << n << " sunt: ";
    cout << 1 << " ";

    jumatate = n / 2;
    for (i = 2; i <= jumatate; i++)
    {
        if (n % i == 0)
        {
            cout << i << " ";
        }
    }
    cout << n;
    return 0;
}
```

**Intrare:**
```
12
```
**Afisare:**
```
Divizorii lui 12 sunt: 1 2 3 4 6 12
```

> **Obs:** Calculam `jumatate = n / 2` **o singura data**, inainte de bucla. Daca am fi scris `i <= n / 2` direct in conditia lui `for`, calculul s-ar fi facut la **fiecare** iteratie — inutil.

> **Obs:** Pentru `n = 1 000 000 000`, algoritmul face 500 milioane de pasi — inca prea mult.

---

## Varianta 3 — merg pana la radical

**Ideea cheie:** divizorii vin **in perechi**. Daca `d` este divizor al lui `n`, atunci si `n / d` este divizor al lui `n`.

### Trasare pentru `n = 36`

| `d` | `n / d` |
|-----|---------|
| 1   | 36      |
| 2   | 18      |
| 3   | 12      |
| 4   | 9       |
| 6   | 6       |
| 9   | 4       |
| 12  | 3       |
| 18  | 2       |
| 36  | 1       |

Observam ca **dupa** ce ajungem la `d = 6`, perechile incep sa se **repete** (in oglinda). Deci e suficient sa parcurgem pana cand `d <= n / d`.

> **Obs:** `d <= n / d` este echivalent cu `d * d <= n`, adica `d <= sqrt(n)`. Folosim `d * d` ca sa evitam calculul cu radicali si erorile de tip `double`.

> **Obs:** Daca `n` este **patrat perfect** (ex. `36 = 6 * 6`), exista un `d` pentru care `d == n / d`. La aceasta pereche obtinem un **singur** divizor nou, nu doi.

### Programul

```cpp
#include <iostream>
using namespace std;

int n, d;

int main()
{
    cin >> n;

    cout << "Divizorii lui " << n << " sunt: ";
    for (d = 1; d * d < n; d++)
    {
        if (n % d == 0)
        {
            cout << d << " " << n / d << " ";
        }
    }
    if (d * d == n)
    {
        cout << d;
    }
    return 0;
}
```

**Intrare:**
```
36
```
**Afisare:**
```
Divizorii lui 36 sunt: 1 36 2 18 3 12 4 9 6
```

> **Obs:** Divizorii nu sunt afisati in ordine crescatoare, ci pe perechi `(d, n/d)`. Daca problema cere ordine crescatoare, foloseste alta varianta sau pastreaza divizorii intr-un vector si sorteaza-i la final.

> **Obs:** Cazul patrat perfect e tratat de `if (d * d == n)` dupa bucla — afisam o singura data `d`, nu si `n / d` (care ar fi acelasi numar).

---

## Comparatie complexitati

Pentru `n = 1 000 000 000`:

| Varianta              | Pasi (aproximativ) |
|-----------------------|--------------------|
| Banala `[1, n]`       | 1 000 000 000      |
| Pana la jumatate      | 500 000 000        |
| Pana la radical       | ~31 000            |

> **Obs:** Diferenta dintre varianta cu radical si celelalte doua este uriasa — de la **secunde/minute** la **instant**. Cand `n` este mare, mereu folosim varianta cu `d * d <= n`.
