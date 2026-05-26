# Chenarul matricei

**Chenarul** unei matrici este format din elementele aflate pe marginea ei:

- **prima linie** (linia `1`)
- **ultima linie** (linia `n`)
- **prima coloana** (coloana `1`)
- **ultima coloana** (coloana `m`)

Pentru o matrice cu `n = 4` linii si `m = 5` coloane, elementele de pe chenar sunt cele marcate cu `*`:

|             | coloana 1 | coloana 2 | coloana 3 | coloana 4 | coloana 5 |
| ----------- | --------- | --------- | --------- | --------- | --------- |
| **linia 1** | *         | *         | *         | *         | *         |
| **linia 2** | *         |           |           |           | *         |
| **linia 3** | *         |           |           |           | *         |
| **linia 4** | *         | *         | *         | *         | *         |

> [!NOTE] Observatie
> colturile matricei (`a[1][1]`, `a[1][m]`, `a[n][1]`, `a[n][m]`) fac parte si din linia, si din coloana corespunzatoare — trebuie sa le numaram **o singura data**.

---

## Afisarea elementelor de pe chenar

Vrem sa afisam elementele chenarului **in ordine, fiecare o singura data**, mergand "in jurul" matricei pornind din coltul din stanga-sus:

1. **prima linie**, de la stanga la dreapta: `a[1][1], a[1][2], ..., a[1][m]`
2. **ultima coloana**, de sus in jos, sarind peste `a[1][m]` (deja afisat): `a[2][m], a[3][m], ..., a[n][m]`
3. **ultima linie**, de la dreapta la stanga, sarind peste `a[n][m]`: `a[n][m-1], a[n][m-2], ..., a[n][1]`
4. **prima coloana**, de jos in sus, sarind peste `a[n][1]` si peste `a[1][1]`: `a[n-1][1], a[n-2][1], ..., a[2][1]`

Folosim **patru `for`-uri separate**, cate unul pentru fiecare latura. Nu parcurgem toata matricea.

```cpp
#include <iostream>
using namespace std;
int a[101][101], n, m, i, j;

int main()
{
    cin >> n >> m;
    for (i = 1; i <= n; i++)
    {
        for (j = 1; j <= m; j++)
        {
            cin >> a[i][j];
        }
    }
    // 1. prima linie, de la stanga la dreapta
    for (j = 1; j <= m; j++)
    {
        cout << a[1][j] << " ";
    }
    // 2. ultima coloana, de sus in jos (de la linia 2 in jos)
    for (i = 2; i <= n; i++)
    {
        cout << a[i][m] << " ";
    }
    // 3. ultima linie, de la dreapta la stanga (de la coloana m-1 catre coloana 1)
    for (j = m - 1; j >= 1; j--)
    {
        cout << a[n][j] << " ";
    }
    // 4. prima coloana, de jos in sus (de la linia n-1 catre linia 2)
    for (i = n - 1; i >= 2; i--)
    {
        cout << a[i][1] << " ";
    }
    return 0;
}
```

**Intrare:**

```
4 5
1 2 3 4 5
6 7 8 9 10
11 12 13 14 15
16 17 18 19 20
```

**Afisare:**

```
1 2 3 4 5 10 15 20 19 18 17 16 11 6 
```

> [!NOTE] Observatie
> observa cum am pornit din coltul din stanga-sus (`1`) si am mers in sensul acelor de ceasornic, terminand la elementul de deasupra punctului de plecare (`6`):
> - **prima linie**: `1 2 3 4 5`
> - **ultima coloana** (de sus in jos, fara `5` care era pe prima linie): `10 15 20`
> - **ultima linie** (de la dreapta la stanga, fara `20` care era pe ultima coloana): `19 18 17 16`
> - **prima coloana** (de jos in sus, fara `16` care era pe ultima linie si fara `1` care era pe prima linie): `11 6`

> [!WARNING] Atentie
> indicii de start `2` (la al doilea `for`) si `n - 1`, `2` (la ultimele doua) sunt alesi tocmai pentru a **evita coltul** care a fost deja afisat de `for`-ul anterior. Fara aceste ajustari, colturile ar fi afisate de doua ori.

---

## Chenare imbricate

Chenarul descris mai sus este chenarul **exterior** al matricei. Dar daca "intram" cu o pozitie mai aproape de centru, gasim **un alt chenar**, mai mic, in interiorul lui. Si apoi inca unul, si tot asa, pana ajungem in centru.

Notam:

- **chenarul `1`** = chenarul exterior (prima si ultima linie, prima si ultima coloana)
- **chenarul `2`** = un nivel spre interior (liniile `2` si `n-1`, coloanele `2` si `m-1`)
- **chenarul `3`** = inca un nivel spre interior (liniile `3` si `n-2`, coloanele `3` si `m-2`)
- ...
- **chenarul `k`** = liniile `k` si `n-k+1`, coloanele `k` si `m-k+1`

Iata cum arata chenarele unei matrici cu `n = 5` si `m = 5`. Pe fiecare element am scris numarul chenarului din care face parte:

|             | coloana 1 | coloana 2 | coloana 3 | coloana 4 | coloana 5 |
| ----------- | --------- | --------- | --------- | --------- | --------- |
| **linia 1** | 1         | 1         | 1         | 1         | 1         |
| **linia 2** | 1         | 2         | 2         | 2         | 1         |
| **linia 3** | 1         | 2         | 3         | 2         | 1         |
| **linia 4** | 1         | 2         | 2         | 2         | 1         |
| **linia 5** | 1         | 1         | 1         | 1         | 1         |

### Cate chenare sunt?

Numarul de chenare depinde de cea mai **mica** dimensiune (cea care "se termina prima" cand intram spre centru):

- daca `min(n, m)` este **par**, sunt exact `min(n, m) / 2` chenare
- daca `min(n, m)` este **impar**, sunt `(min(n, m) + 1) / 2` chenare, iar **chenarul din mijloc este degenerat**: are o singura linie, o singura coloana sau un singur element

> [!NOTE] Observatie
> in matricea `5 x 5` de mai sus, `min(n, m) = 5` este impar, deci sunt `(5 + 1) / 2 = 3` chenare. Chenarul `3` este degenerat — un singur element, `a[3][3]`.

> [!TIP] Sfat
> pentru a calcula numarul chenarului din care face parte elementul `a[i][j]` exista o formula scurta:
> ```
> chenar = min(i, j, n - i + 1, m - j + 1)
> ```
> intuitia: e distanta pana la cea mai apropiata margine (sus, stanga, jos sau dreapta).

---

## Etichetarea chenarelor

Vrem sa completam matricea astfel incat **fiecare element sa contina numarul chenarului din care face parte**, apoi sa o afisam.

Logica:

- parcurgem matricea cu doua `for`-uri imbricate pe `i` si `j`
- pentru fiecare element, calculam `min(i, j, n - i + 1, m - j + 1)` si il scriem in `a[i][j]`

```cpp
#include <iostream>
using namespace std;
int a[101][101], n, m, i, j, chenar;

int main()
{
    cin >> n >> m;
    for (i = 1; i <= n; i++)
    {
        for (j = 1; j <= m; j++)
        {
            chenar = i;
            if (j < chenar)
                chenar = j;
            if (n - i + 1 < chenar)
                chenar = n - i + 1;
            if (m - j + 1 < chenar)
                chenar = m - j + 1;
            a[i][j] = chenar;
        }
    }
    for (i = 1; i <= n; i++)
    {
        for (j = 1; j <= m; j++)
        {
            cout << a[i][j] << " ";
        }
        cout << endl;
    }
    return 0;
}
```

**Intrare:**

```
5 5
```

**Afisare:**

```
1 1 1 1 1 
1 2 2 2 1 
1 2 3 2 1 
1 2 2 2 1 
1 1 1 1 1 
```

> [!NOTE] Observatie
> nu am citit valori pentru matrice — am completat noi matricea pornind de la `n` si `m`.

> [!TIP] Sfat
> aceeasi formula functioneaza si pentru matrici dreptunghiulare. Pentru `n = 3` si `m = 6` obtii:
> ```
> 1 1 1 1 1 1
> 1 2 2 2 2 1
> 1 1 1 1 1 1
> ```
> Aici exista un singur chenar complet (`1`) si un chenar degenerat (`2`) — o singura linie din mijloc.

---

## Parcurgerea in spirala

Vrem sa afisam elementele matricei in ordinea: mai intai chenarul exterior (in sensul acelor de ceasornic), apoi chenarul urmator, ... pana la chenarul cel mai interior. Aceasta este parcurgerea **in spirala**.

Logica:

- un `for` exterior pe `k`, parcurge chenarele de la `1` la numarul total de chenare
- pentru fiecare chenar `k`, repetam cele **4 `for`-uri** de la afisarea unui chenar, dar parametrizate dupa `k`:
  - colturile chenarului `k` sunt `(k, k)`, `(k, m-k+1)`, `(n-k+1, m-k+1)`, `(n-k+1, k)`

Trebuie sa avem grija la **chenarele degenerate** (cand `n-k+1 == k` sau `m-k+1 == k`):

- daca `n - k + 1 == k`, chenarul are o singura linie — `for`-ul pentru linia de jos ar repeta linia de sus. Il sarim.
- daca `m - k + 1 == k`, chenarul are o singura coloana — `for`-ul pentru coloana din stanga ar repeta coloana din dreapta. Il sarim.

```cpp
#include <iostream>
using namespace std;
int a[101][101], n, m, i, j, k, nrChenare;

int main()
{
    cin >> n >> m;
    for (i = 1; i <= n; i++)
    {
        for (j = 1; j <= m; j++)
        {
            cin >> a[i][j];
        }
    }
    if (n < m)
        nrChenare = (n + 1) / 2;
    else
        nrChenare = (m + 1) / 2;
    for (k = 1; k <= nrChenare; k++)
    {
        // 1. linia de sus a chenarului k: a[k][k..m-k+1]
        for (j = k; j <= m - k + 1; j++)
        {
            cout << a[k][j] << " ";
        }
        // 2. coloana din dreapta: a[k+1..n-k+1][m-k+1]
        for (i = k + 1; i <= n - k + 1; i++)
        {
            cout << a[i][m - k + 1] << " ";
        }
        // 3. linia de jos (doar daca difera de linia de sus): a[n-k+1][m-k..k]
        if (n - k + 1 > k)
        {
            for (j = m - k; j >= k; j--)
            {
                cout << a[n - k + 1][j] << " ";
            }
        }
        // 4. coloana din stanga (doar daca difera de coloana din dreapta): a[n-k..k+1][k]
        if (m - k + 1 > k)
        {
            for (i = n - k; i >= k + 1; i--)
            {
                cout << a[i][k] << " ";
            }
        }
    }
    return 0;
}
```

**Intrare:**

```
4 5
1 2 3 4 5
6 7 8 9 10
11 12 13 14 15
16 17 18 19 20
```

**Afisare:**

```
1 2 3 4 5 10 15 20 19 18 17 16 11 6 7 8 9 14 13 12 
```

> [!NOTE] Observatie
> spirala incepe cu chenarul `1` (`1 2 3 4 5 10 15 20 19 18 17 16 11 6`), apoi continua cu chenarul `2` (`7 8 9 14 13 12`). Pentru o matrice `4 x 5`, `min(n, m) = 4` este par, deci sunt exact `4 / 2 = 2` chenare.

> [!IMPORTANT] Important
> colturile chenarului `k` sunt: `(k, k)` — stanga-sus, `(k, m-k+1)` — dreapta-sus, `(n-k+1, m-k+1)` — dreapta-jos, `(n-k+1, k)` — stanga-jos. Toate cele 4 `for`-uri lucreaza intre acesti indici.

> [!WARNING] Atentie
> cele doua `if`-uri (`n - k + 1 > k` si `m - k + 1 > k`) sunt **esentiale** pentru cazul chenarelor degenerate. Daca le omiti, pentru o matrice cu dimensiune impara (ex. `5 x 5`), chenarul din mijloc va fi afisat de mai multe ori sau in ordine gresita.
