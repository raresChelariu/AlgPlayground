# Cautare binara

- Cautarea binara este o metoda eficienta de a gasi un element intr-un **vector sortat**. 
- cautarea secventiala parcurge elementele unul cate unul pentru a cauta un element
- cautarea binara **injumatateste** intervalul de cautare la fiecare pas
- se aseamana cu cautarea unui cuvant in dictionar:
  - sa presupunem ca vrem sa cautam in dictionar cuvantul `masina`
  - voi deschide dictionarul la mijloc - daca de ex. voi gasi la mijloc cuvantul `cal` inseamna ca trebuie sa caut in partea dreapta - deci voi pune mana stanga la mijloc ca tura viitoare sa caut la mijlocul jumatatii drepte
  - sa spunem ca la urmatoare deschidere la mijloc gasesc cuvantul `stilou`
  - inseamna ca trebuie sa ma uit in partea stanga a partii de dictionar ce o tin in mana, deci voi pune mana dreapta la mijloc 

> **Obs:** cautarea binara functioneaza **doar** pe vectori sortati. Daca vectorul nu este sortat, trebuie sa folosim cautarea secventiala sau sa sortam mai intai vectorul.

---

## Ideea algoritmului

Pastram doi indici `st` (stanga) si `dr` (dreapta) care delimiteaza intervalul curent de cautare. La fiecare pas calculam `mij`, **mijlocul** intervalului, si comparam `v[mij]` cu elementul cautat `x`:

- `v[mij] == x` → am gasit elementul pe pozitia `mij`
- `v[mij] < x` → `x` se afla in **dreapta**: `st = mij + 1`
- `v[mij] > x` → `x` se afla in **stanga**: `dr = mij - 1`

Cand `st > dr`, intervalul s-a golit: elementul nu exista in vector.

---

## Exemplu pas cu pas

Fie vectorul sortat cu `n = 10` elemente, indexat de la 1:

| Pozitia  | 1 | 2  | 3  | 4  | 5  | 6  | 7  | 8  | 9  | 10 |
|----------|---|----|----|----|----|----|----|----|----|-----|
| Valoarea | 3 | 12 | 17 | 25 | 29 | 31 | 34 | 37 | 43 | 49 |

**Cautam `x = 37`:**

| Pas | `st` | `dr` | `mij` | `v[mij]` | Actiune              |
|-----|------|------|-------|----------|----------------------|
| 1   | 1    | 10   | 5     | 29       | 29 < 37 → `st = 6`  |
| 2   | 6    | 10   | 8     | 37       | gasit pe pozitia 8   |

**Cautam `x = 40`:**

| Pas | `st` | `dr` | `mij` | `v[mij]` | Actiune              |
|-----|------|------|-------|----------|----------------------|
| 1   | 1    | 10   | 5     | 29       | 29 < 40 → `st = 6`  |
| 2   | 6    | 10   | 8     | 37       | 37 < 40 → `st = 9`  |
| 3   | 9    | 10   | 9     | 43       | 43 > 40 → `dr = 8`  |
| 4   | 9    | 8    | —     | —        | `st > dr` → nu exista |

---

## Implementare

```cpp
#include <iostream>
using namespace std;

int n, x, v[100001];
int i, st, dr, mij;
bool gasit;

int main()
{
    cin >> n;
    for (i = 1; i <= n; i++)
    {
        cin >> v[i];
    }
    cin >> x;

    st = 1;
    dr = n;
    gasit = false;
    while (st <= dr)
    {
        mij = (st + dr) / 2;
        if (v[mij] == x)
        {
            gasit = true;
            break;
        }
        if (v[mij] < x)
            st = mij + 1;
        else
            dr = mij - 1;
    }

    if (gasit)
        cout << "Elementul se afla pe pozitia " << mij;
    else
        cout << "Elementul nu a fost gasit";

    return 0;
}
```

**Intrare:**

```
10
3 12 17 25 29 31 34 37 43 49
37
```

**Afisare:**

```
Elementul se afla pe pozitia 8
```

---

**Intrare:**

```
10
3 12 17 25 29 31 34 37 43 49
40
```

**Afisare:**

```
Elementul nu a fost gasit
```

---

## Functia cautareBinara

```cpp
#include <iostream>
using namespace std;

int n, x, v[100001];
int i, poz;

int cautareBinara(int val)
{
    int st, dr, mij;
    st = 1;
    dr = n;
    while (st <= dr)
    {
        mij = (st + dr) / 2;
        if (v[mij] == val)
            return mij;
        if (v[mij] < val)
            st = mij + 1;
        else
            dr = mij - 1;
    }
    return -1;
}

int main()
{
    cin >> n;
    for (i = 1; i <= n; i++)
    {
        cin >> v[i];
    }
    cin >> x;

    poz = cautareBinara(x);
    if (poz != -1)
        cout << "Elementul se afla pe pozitia " << poz;
    else
        cout << "Elementul nu a fost gasit";

    return 0;
}
```

**Intrare:**

```
10
3 12 17 25 29 31 34 37 43 49
37
```

**Afisare:**

```
Elementul se afla pe pozitia 8
```

---

## Implementare recursiva

```cpp
#include <iostream>
using namespace std;

int n, x, v[100001];
int i, poz;

int cautareBinara(int val, int st, int dr)
{
    if (st > dr)
        return -1;
    int mij = (st + dr) / 2;
    if (v[mij] == val)
        return mij;
    if (val < v[mij])
        return cautareBinara(val, st, mij - 1);
    return cautareBinara(val, mij + 1, dr);
}

int main()
{
    cin >> n;
    for (i = 1; i <= n; i++)
    {
        cin >> v[i];
    }
    cin >> x;

    poz = cautareBinara(x, 1, n);
    if (poz != -1)
        cout << "Elementul se afla pe pozitia " << poz;
    else
        cout << "Elementul nu a fost gasit";

    return 0;
}
```

**Intrare:**

```
10
3 12 17 25 29 31 34 37 43 49
37
```

**Afisare:**

```
Elementul se afla pe pozitia 8
```

