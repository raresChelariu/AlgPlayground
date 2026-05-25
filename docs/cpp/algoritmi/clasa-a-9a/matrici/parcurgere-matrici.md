# Matrice 

- se mai numeste si `tablou bidimensional`
- este un mod de a stoca mai multe elemente de acelasi tip
- accesul la un element se face ca intr-un **tabel**:
  - trebuie sa mentionez atat linia cat si coloana elementului 
- matricea trebuie mai intai declarata pentru a fi folosita

## Declararea unei matrici

Sintaxa: 

```cpp
tip numeMatrice[NRLIN][NRCOL];
```

Exemplu:

```cpp
int a[10][25];
```

> **Obs:** Liniile si coloanele sunt numerotate de la 0. 

Efect:

- s-a declarat matricea `a` de tip `int`
  - adica toate elementele matricei vor fi de tip `int`
- are 10 linii - cu indicii *0, 1, 2, ..., 9*
- si 25 de coloane - cu indicii *0, 1, 2, ..., 24*
- astfel:
  - prima linie are indice 0
  - a 2-a linie are indice 1
  - ...
  - ultima linie (a 10-a) are indice 9

## Accesul la un element din matrice

Sintaxa: 
```cpp
numeMatrice[indiceLinie][indiceColoana]
```

Ex:
```cpp
int a[10][25];
// ...
cout << a[0][0]; // am afisat elementul de la linia 0 si coloana 0
```

## Indexarea de la 1 

Pentru a fi mai intuitiv sa lucram cu o matrice, putem sa numerotam de la `1`.
Trebuie sa:

- declaram matricea cu 1 linie in plus si 1 coloana in plus fata de maximul necesar
- sa ignoram indicele `0`
  - adica sa ignoram atat linia `0`
  - cat si coloana `0`

Ex: 

```cpp
// am nevoie de o matrice cu n linii si m coloane
// in enunt imi spune ca:
// n <= 100
// m <= 200
int a[101][201];
// elementul din coltul din stanga-sus va fi a[1][1]
// si cel din coltul din dreapta-jos va fi a[n][m]
```

---

## Citirea unei matrici cu n linii si m coloane

Pentru a citi o matrice avem nevoie de **doua `for`-uri imbricate**:

- `for`-ul **exterior** parcurge **liniile** (`i` de la `1` la `n`)
- `for`-ul **interior** parcurge **coloanele** (`j` de la `1` la `m`)

La fiecare pas citim elementul `a[i][j]` - elementul de pe linia `i` si coloana `j`.

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
    return 0;
}
```

**Intrare:**

```
3 4
1 2 3 4
5 6 7 8
9 10 11 12
```

Dupa executia `for`-urilor, matricea are:

|             | coloana 1 | coloana 2 | coloana 3 | coloana 4 |
| ----------- | --------- | --------- | --------- | --------- |
| **linia 1** | 1         | 2         | 3         | 4         |
| **linia 2** | 5         | 6         | 7         | 8         |
| **linia 3** | 9         | 10        | 11        | 12        |

> **Obs:** ordinea in care citim este: `a[1][1]`, `a[1][2]`, ..., `a[1][m]`, apoi trecem la linia urmatoare `a[2][1]`, `a[2][2]`, ..., `a[2][m]`, si tot asa pana la `a[n][m]`. Aceasta este parcurgerea **linie cu linie**.

---

## Afisarea unei matrici cu n linii si m coloane

Folosim aceeasi structura de `for`-uri, dar in locul citirii afisam fiecare element. Dupa fiecare linie afisam `endl` pentru a trece pe randul urmator.

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
3 4
1 2 3 4
5 6 7 8
9 10 11 12
```

**Afisare:**

```
1 2 3 4 
5 6 7 8 
9 10 11 12 
```

> **Obs:** `cout << endl;` este pus **in afara** `for`-ului interior, dar **in interiorul** `for`-ului exterior. Asa, dupa ce am afisat toate elementele unei linii, trecem pe randul urmator.

---

## Suma elementelor intr-o matrice

Folosim o variabila `s` in care **acumulam** suma. Pornim cu `s = 0` si la fiecare element din matrice adunam `a[i][j]`.

```cpp
#include <iostream>
using namespace std;
int a[101][101], n, m, i, j, s;

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
    s = 0;
    for (i = 1; i <= n; i++)
    {
        for (j = 1; j <= m; j++)
        {
            s = s + a[i][j];
        }
    }
    cout << s;
    return 0;
}
```

**Intrare:**

```
3 4
1 2 3 4
5 6 7 8
9 10 11 12
```

**Afisare:**

```
78
```

> **Obs:** suma este `1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10 + 11 + 12 = 78`.

---

## Produsul elementelor pe linie

Vrem sa calculam produsul elementelor de pe **fiecare linie in parte**. Pentru fiecare linie `i`, obtinem cate un produs.

Logica:

- `for`-ul **exterior** parcurge liniile (`i` de la `1` la `n`)
- la **inceputul** fiecarei linii **resetam** produsul: `p = 1`
- `for`-ul **interior** parcurge coloanele si inmulteste fiecare element in `p`
- dupa ce s-a terminat linia, **afisam** produsul `p`

```cpp
#include <iostream>
using namespace std;
int a[101][101], n, m, i, j, p;

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
    for (i = 1; i <= n; i++)
    {
        p = 1;
        for (j = 1; j <= m; j++)
        {
            p = p * a[i][j];
        }
        cout << p << endl;
    }
    return 0;
}
```

**Intrare:**

```
3 4
1 2 3 4
5 6 7 8
9 10 11 12
```

**Afisare:**

```
24
1680
11880
```

> **Obs:** pentru linia 1, produsul este `1 * 2 * 3 * 4 = 24`. Pentru linia 2, `5 * 6 * 7 * 8 = 1680`. Pentru linia 3, `9 * 10 * 11 * 12 = 11880`.

> **Obs:** este foarte important ca `p = 1` sa fie **in interiorul** `for`-ului pe `i`, dar **in afara** `for`-ului pe `j`. Altfel produsul ar continua de pe linia anterioara.

---

## Suma elementelor pe coloana

Vrem sa calculam suma elementelor de pe **fiecare coloana in parte**. De data aceasta, coloana este fixata si parcurgem liniile.

Logica:

- `for`-ul **exterior** parcurge coloanele (`j` de la `1` la `m`)
- la **inceputul** fiecarei coloane **resetam** suma: `s = 0`
- `for`-ul **interior** parcurge liniile si aduna fiecare element in `s`
- dupa ce s-a terminat coloana, **afisam** suma `s`

```cpp
#include <iostream>
using namespace std;
int a[101][101], n, m, i, j, s;

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
    for (j = 1; j <= m; j++)
    {
        s = 0;
        for (i = 1; i <= n; i++)
        {
            s = s + a[i][j];
        }
        cout << s << " ";
    }
    return 0;
}
```

**Intrare:**

```
3 4
1 2 3 4
5 6 7 8
9 10 11 12
```

**Afisare:**

```
15 18 21 24 
```

> **Obs:** pentru coloana 1, suma este `1 + 5 + 9 = 15`. Pentru coloana 2, `2 + 6 + 10 = 18`. Pentru coloana 3, `3 + 7 + 11 = 21`. Pentru coloana 4, `4 + 8 + 12 = 24`.

> **Obs:** observa ca `for`-urile sunt **inversate** fata de parcurgerea obisnuita: `for`-ul pe `j` (coloane) este exterior, iar `for`-ul pe `i` (linii) este interior. Asta pentru ca pentru o coloana fixata, vrem sa parcurgem toate liniile.

---

## Afisarea elementelor de pe chenarul matricei

**Chenarul** matricei este format din:

- **prima linie** (linia `1`)
- **ultima linie** (linia `n`)
- **prima coloana** (coloana `1`)
- **ultima coloana** (coloana `m`)

Vrem sa afisam aceste elemente **in ordine, fiecare o singura data**, mergand "in jurul" matricei pornind din coltul din stanga-sus:

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

> **Obs:** observa cum am pornit din coltul din stanga-sus (`1`) si am mers in sensul acelor de ceasornic, terminand la elementul de deasupra punctului de plecare (`6`):
> - **prima linie**: `1 2 3 4 5`
> - **ultima coloana** (de sus in jos, fara `5` care era pe prima linie): `10 15 20`
> - **ultima linie** (de la dreapta la stanga, fara `20` care era pe ultima coloana): `19 18 17 16`
> - **prima coloana** (de jos in sus, fara `16` care era pe ultima linie si fara `1` care era pe prima linie): `11 6`

> **Obs:** indicii de start `2` (la al doilea `for`) si `n - 1`, `2` (la ultimele doua) sunt alesi tocmai pentru a **evita coltul** care a fost deja afisat de `for`-ul anterior. Fara aceste ajustari, colturile ar fi afisate de doua ori.
