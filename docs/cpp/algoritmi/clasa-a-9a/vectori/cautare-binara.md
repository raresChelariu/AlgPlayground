# Cautare binara

- Cautarea binara este o metoda eficienta de a gasi un element intr-un **vector sortat**. 
- cautarea secventiala parcurge elementele unul cate unul pentru a cauta un element
- cautarea binara **injumatateste** intervalul de cautare la fiecare pas
- se aseamana cu cautarea unui cuvant in dictionar:
  - sa presupunem ca vrem sa cautam in dictionar cuvantul `masina`
  - voi deschide dictionarul la mijloc - daca de ex. voi gasi la mijloc cuvantul `cal` inseamna ca trebuie sa caut in partea dreapta - deci voi pune mana stanga la mijloc ca tura viitoare sa caut la mijlocul jumatatii drepte
  - sa spunem ca la urmatoare deschidere la mijloc gasesc cuvantul `stilou`
  - inseamna ca trebuie sa ma uit in partea stanga a partii de dictionar ce o tin in mana, deci voi pune mana dreapta la mijloc 

> [!IMPORTANT] Important
> cautarea binara functioneaza **doar** pe vectori sortati. Daca vectorul nu este sortat, trebuie sa folosim cautarea secventiala sau sa sortam mai intai vectorul.

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
    gasit = 0;
    while (st <= dr)
    {
        mij = (st + dr) / 2;
        if (v[mij] == x)
        {
            gasit = 1;
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

---

## Pozitia de inserare

Cand cautarea binara se incheie fara sa gaseasca elementul, `st` indica **pozitia unde elementul ar trebui inserat** pentru ca sirul sa ramana sortat.

In exemplul de mai sus (cautam `x = 40` in vectorul sortat), la final `st = 9`. Intr-adevar, 40 s-ar insera pe pozitia 9, intre 37 si 43.

Putem folosi aceasta informatie in functia de cautare: daca elementul nu este gasit, returnam `-st`. Un rezultat negativ inseamna "nu exista", iar valoarea in modul este pozitia de inserare.

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
    return -st;
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
    if (poz > 0)
        cout << "Gasit pe pozitia " << poz;
    else
        cout << "Nu exista; s-ar insera pe pozitia " << -poz;

    return 0;
}
```

**Intrare:**

```
10
3 12 17 25 29 31 34 37 43 49
40
```

**Afisare:**

```
Nu exista; s-ar insera pe pozitia 9
```

---

**Intrare:**

```
10
3 12 17 25 29 31 34 37 43 49
37
```

**Afisare:**

```
Gasit pe pozitia 8
```

---

## PrimulDeLaX - primul element >= x

PrimulDeLaX raspunde la intrebarea: **care este prima pozitie `i` pentru care `v[i] >= x`?**

**`v[mij] == x`** (ex: `x = 5`, `v[mij] = 5`) → 5 >= 5, este candidat:
- retinem `rez = mij`
- cautam stanga — poate exista un 5 si mai la stanga

<BinSearchPlot :values="[2,5,5,5,8,10]" :x="5" :mij="3" :candidate="true" keep="left" />

**`v[mij] > x`** (ex: `x = 5`, `v[mij] = 8`) → 8 >= 5, este **candidat**:
- retinem `rez = mij`
- cautam stanga — poate exista ceva mai mic care tot e >= 5

<BinSearchPlot :values="[2,5,5,5,8,10]" :x="5" :mij="5" :candidate="true" keep="left" />

**`v[mij] < x`** (ex: `x = 5`, `v[mij] = 2`) → 2 < 5, **NU este candidat**:
- cautam dreapta

<BinSearchPlot :values="[2,5,5,5,8,10]" :x="5" :mij="1" :candidate="false" keep="right" />

> [!NOTE] Observatie
> in cod, cazurile `==` si `>` sunt grupate de conditia `v[mij] >= x` — ambele duc la aceeasi actiune.

```cpp
int primulDelaX(int x)
{
    int st, dr, mij, rez;
    st = 1;
    dr = n;
    rez = n + 1;
    while (st <= dr)
    {
        mij = (st + dr) / 2;
        if (v[mij] >= x)
        {
            rez = mij;
            dr = mij - 1;
        }
        else
            st = mij + 1;
    }
    return rez;
}
```

> [!NOTE] Observatie
> `rez` este initializat cu `n + 1` pentru a semnala ca nu exista niciun element `>= x` (toti sunt mai mici decat `x`).

**Exemplu:** fie vectorul cu duplicate `v = [2, 5, 5, 5, 8, 10]`, `n = 6`.

PrimulDeLaX pentru `x = 5` (`rez` porneste la `n + 1 = 7`):

| Pas | `st` | `dr` | `mij` | `v[mij]` | `rez` | Actiune |
|-----|------|------|-------|----------|-------|------------------------------|
| 1   | 1    | 6    | 3     | 5        | 3     | 5 >= 5 → `rez = 3`, `dr = 2` |
| 2   | 1    | 2    | 1     | 2        | 3     | 2 < 5 → `st = 2`             |
| 3   | 2    | 2    | 2     | 5        | 2     | 5 >= 5 → `rez = 2`, `dr = 1` |
| 4   | 2    | 1    | —     | —        | 2     | `st > dr` → stop             |

Rezultat: `primulDelaX(5) = 2`. Prima aparitie a lui 5 este pe pozitia 2.

---

## PrimulDupaX — primul element > x

PrimulDupaX raspunde la intrebarea: **care este prima pozitie `i` pentru care `v[i] > x`?**

**`v[mij] == x`** (ex: `x = 5`, `v[mij] = 5`) → 5 nu e > 5, **NU este candidat**:
- cautam dreapta

<BinSearchPlot :values="[2,5,5,5,8,10]" :x="5" :mij="3" :candidate="false" keep="right" />

**`v[mij] > x`** (ex: `x = 5`, `v[mij] = 8`) → 8 > 5, **este candidat**:
- retinem `rez = mij`
- cautam stanga - poate exista ceva mai mic care tot e > 5

<BinSearchPlot :values="[2,5,5,5,8,10]" :x="5" :mij="5" :candidate="true" keep="left" />

**`v[mij] < x`** (ex: `x = 5`, `v[mij] = 2`) → 2 nu e > 5, **nu este candidat**:
- cautam dreapta

<BinSearchPlot :values="[2,5,5,5,8,10]" :x="5" :mij="1" :candidate="false" keep="right" />

> [!NOTE] Observatie
> in cod, cazurile `==` si `<` sunt grupate de `else` — ambele duc la `st = mij + 1`.

Codul este identic cu `primulDeLaX`, cu singura diferenta ca conditia din `if` este `>` in loc de `>=`:

```cpp
int primulDupaX(int val)
{
    int st, dr, mij, rez;
    st = 1;
    dr = n;
    rez = n + 1;
    while (st <= dr)
    {
        mij = (st + dr) / 2;
        if (v[mij] > val)
        {
            rez = mij;
            dr = mij - 1;
        }
        else
            st = mij + 1;
    }
    return rez;
}
```

**Exemplu:** acelasi vector `v = [2, 5, 5, 5, 8, 10]`, `n = 6`.

PrimulDupaX pentru `x = 5` (`rez` porneste la `n + 1 = 7`):

| Pas | `st` | `dr` | `mij` | `v[mij]` | `rez` | Actiune |
|-----|------|------|-------|----------|-------|---------|
| 1   | 1    | 6    | 3     | 5        | 7     | 5 <= 5 → `st = 4` |
| 2   | 4    | 6    | 5     | 8        | 5     | 8 > 5 → `rez = 5`, `dr = 4` |
| 3   | 4    | 4    | 4     | 5        | 5     | 5 <= 5 → `st = 5` |
| 4   | 5    | 4    | —     | —        | 5     | `st > dr` → stop |

Rezultat: `primulDupaX(5) = 5`. Prima pozitie cu element strict mai mare decat 5 este pozitia 5 (v[5] = 8).

---

## CelMaiMarePanaIn — ultimul element <= x

Raspunde la intrebarea: **care este ultima pozitie `i` pentru care `v[i] <= x`?**

**`v[mij] == x`** (ex: `x = 5`, `v[mij] = 5`) → 5 <= 5, **este candidat**:
- retinem `rez = mij`
- cautam dreapta - poate exista un 5 si mai la dreapta

<BinSearchPlot :values="[2,5,5,5,8,10]" :x="5" :mij="3" :candidate="true" keep="right" />

**`v[mij] < x`** (ex: `x = 5`, `v[mij] = 2`) → 2 <= 5, **este candidat**:
- retinem `rez = mij`
- cautam dreapta - poate exista ceva mai mare care tot e <= 5

<BinSearchPlot :values="[2,5,5,5,8,10]" :x="5" :mij="1" :candidate="true" keep="right" />

**`v[mij] > x`** (ex: `x = 5`, `v[mij] = 8`) → 8 > 5, **NU este candidat**:
- cautam stanga

<BinSearchPlot :values="[2,5,5,5,8,10]" :x="5" :mij="5" :candidate="false" keep="left" />

> [!NOTE] Observatie
> Aceasta pozitie este echivalenta cu `primulDupaX(x) - 1`. Daca rezultatul este `0`, inseamna ca toate elementele sunt strict mai mari decat `x`.

```cpp
int celMaiMarePanaIn(int val)
{
    int st, dr, mij, rez;
    st = 1;
    dr = n;
    rez = 0;
    while (st <= dr)
    {
        mij = (st + dr) / 2;
        if (v[mij] <= val)
        {
            rez = mij;
            st = mij + 1;
        }
        else
            dr = mij - 1;
    }
    return rez;
}
```

> [!NOTE] Observatie
> `rez` este initializat cu `0` pentru a semnala ca nu exista niciun element `<= val`.

**Exemplu:** acelasi vector `v = [2, 5, 5, 5, 8, 10]`, `n = 6`.

Cel mai mare element `<= 5` (`rez` porneste la `0`):

| Pas | `st` | `dr` | `mij` | `v[mij]` | `rez` | Actiune |
|-----|------|------|-------|----------|-------|---------|
| 1   | 1    | 6    | 3     | 5        | 3     | 5 <= 5 → `rez = 3`, `st = 4` |
| 2   | 4    | 6    | 5     | 8        | 3     | 8 > 5 → `dr = 4` |
| 3   | 4    | 4    | 4     | 5        | 4     | 5 <= 5 → `rez = 4`, `st = 5` |
| 4   | 5    | 4    | —     | —        | 4     | `st > dr` → stop |

Rezultat: `celMaiMarePanaIn(5) = 4`. Ultima pozitie cu element `<= 5` este pozitia 4 (v[4] = 5).

Cel mai mare element `<= 7`:

| Pas | `st` | `dr` | `mij` | `v[mij]` | `rez` | Actiune |
|-----|------|------|-------|----------|-------|---------|
| 1   | 1    | 6    | 3     | 5        | 3     | 5 <= 7 → `rez = 3`, `st = 4` |
| 2   | 4    | 6    | 5     | 8        | 3     | 8 > 7 → `dr = 4` |
| 3   | 4    | 4    | 4     | 5        | 4     | 5 <= 7 → `rez = 4`, `st = 5` |
| 4   | 5    | 4    | —     | —        | 4     | `st > dr` → stop |

Rezultat: `celMaiMarePanaIn(7) = 4`. Cel mai mare element din vector care nu depaseste 7 este `v[4] = 5`.

---

## Prima si ultima aparitie

Putem cauta direct prima sau ultima aparitie a lui `x` cu doua functii separate, fiecare cu propria logica la egalitate.

### primAparitie

**`v[mij] == x`** → candidat:
- retinem `rez = mij`
- cautam stanga (`dr = mij - 1`) — poate exista o aparitie anterioara

<BinSearchPlot :values="[2,5,5,5,8,10]" :x="5" :mij="3" :candidate="true" keep="left" />

**`v[mij] < x`** → `x` e mai mare:
- cautam dreapta (`st = mij + 1`)

<BinSearchPlot :values="[2,5,5,5,8,10]" :x="5" :mij="1" :candidate="false" keep="right" />

**`v[mij] > x`** → `x` e mai mic:
- cautam stanga (`dr = mij - 1`)

<BinSearchPlot :values="[2,5,5,5,8,10]" :x="5" :mij="5" :candidate="false" keep="left" />

### ultimaAparitie

**`v[mij] == x`** → candidat:
- retinem `rez = mij`
- cautam dreapta (`st = mij + 1`) - poate exista o aparitie ulterioara

<BinSearchPlot :values="[2,5,5,5,8,10]" :x="5" :mij="3" :candidate="true" keep="right" />

**`v[mij] < x`** → `x` e mai mare:
- cautam dreapta (`st = mij + 1`)

<BinSearchPlot :values="[2,5,5,5,8,10]" :x="5" :mij="1" :candidate="false" keep="right" />

**`v[mij] > x`** → `x` e mai mic:
- cautam stanga (`dr = mij - 1`)

<BinSearchPlot :values="[2,5,5,5,8,10]" :x="5" :mij="5" :candidate="false" keep="left" />

Ambele returneaza `-1` daca elementul nu exista in vector.

| Intrebare | Formula |
|-----------|---------|
| Prima aparitie a lui `x` | `primAparitie(x)` |
| Ultima aparitie a lui `x` | `ultimaAparitie(x)` |
| Numarul de aparitii ale lui `x` | `ultimaAparitie(x) - primAparitie(x) + 1` |

```cpp
#include <iostream>
using namespace std;

int n, x, v[100001];
int i, pa, ua;

int primAparitie(int val)
{
    int st, dr, mij, rez;
    st = 1;
    dr = n;
    rez = -1;
    while (st <= dr)
    {
        mij = (st + dr) / 2;
        if (v[mij] == val)
        {
            rez = mij;
            dr = mij - 1;
        }
        else if (v[mij] < val)
            st = mij + 1;
        else
            dr = mij - 1;
    }
    return rez;
}

int ultimaAparitie(int val)
{
    int st, dr, mij, rez;
    st = 1;
    dr = n;
    rez = -1;
    while (st <= dr)
    {
        mij = (st + dr) / 2;
        if (v[mij] == val)
        {
            rez = mij;
            st = mij + 1;
        }
        else if (v[mij] < val)
            st = mij + 1;
        else
            dr = mij - 1;
    }
    return rez;
}

int main()
{
    cin >> n;
    for (i = 1; i <= n; i++)
    {
        cin >> v[i];
    }
    cin >> x;

    pa = primAparitie(x);
    ua = ultimaAparitie(x);

    if (pa != -1)
    {
        cout << "Prima aparitie: pozitia " << pa << "\n";
        cout << "Ultima aparitie: pozitia " << ua << "\n";
        cout << "Numar de aparitii: " << ua - pa + 1;
    }
    else
        cout << "Elementul nu exista in vector";

    return 0;
}
```

**Intrare:**

```
6
2 5 5 5 8 10
5
```

**Afisare:**

```
Prima aparitie: pozitia 2
Ultima aparitie: pozitia 4
Numar de aparitii: 3
```

