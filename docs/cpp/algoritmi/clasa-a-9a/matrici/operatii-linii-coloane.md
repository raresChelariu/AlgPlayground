# Operatii cu linii si coloane

Pana acum am **parcurs** matricea fara sa-i schimbam structura. In aceasta lectie lucram cu **linii si coloane intregi** ca unitate: le interschimbam, le rearanjam, le rotim, le adaugam sau le stergem.

Operatiile se impart in doua categorii:

- **fara schimbarea dimensiunii** (`n` si `m` raman aceleasi): interschimbarea, permutarea, rotatia circulara, oglindirea — doar **mutam** continutul liniilor/coloanelor.
- **cu schimbarea dimensiunii**: inserarea (`n` sau `m` **creste**) si stergerea (`n` sau `m` **scade**).

> [!IMPORTANT] Important
> caramida pe care se construieste totul este **interschimbarea a doua linii (sau coloane)** cu ajutorul unei variabile `aux`. Incepem cu ea.

In toate exemplele pornim de la aceeasi matrice `3 x 4`:

```
1 2 3 4
5 6 7 8
9 10 11 12
```

---

## Interschimbarea a doua linii

Vrem sa interschimbam liniile `x` si `y`. O linie are `m` elemente, deci interschimbam element cu element, parcurgand coloanele cu un `for`. Pentru fiecare coloana `j` folosim o variabila `aux`:

```cpp
#include <iostream>
using namespace std;
int a[101][101], n, m, i, j, x, y, aux;

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
    cin >> x >> y;
    for (j = 1; j <= m; j++)
    {
        aux = a[x][j];
        a[x][j] = a[y][j];
        a[y][j] = aux;
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
1 3
```

**Afisare:**

```
9 10 11 12 
5 6 7 8 
1 2 3 4 
```

> [!NOTE] Observatie
> ultima linie de la intrare (`1 3`) inseamna `x = 1` si `y = 3`: am interschimbat prima linie cu a treia. Linia `2` a ramas pe loc.

> [!WARNING] Atentie
> interschimbarea trebuie facuta cu `aux`, element cu element. Daca ai scrie direct `a[x][j] = a[y][j]` fara sa salvezi mai intai vechea valoare, ai **pierde** continutul liniei `x`.

---

## Interschimbarea a doua coloane

Este perfect simetric: o coloana are `n` elemente, deci de data asta parcurgem **liniile** cu `for`-ul, si interschimbam `a[i][x]` cu `a[i][y]`:

```cpp
#include <iostream>
using namespace std;
int a[101][101], n, m, i, j, x, y, aux;

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
    cin >> x >> y;
    for (i = 1; i <= n; i++)
    {
        aux = a[i][x];
        a[i][x] = a[i][y];
        a[i][y] = aux;
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
2 4
```

**Afisare:**

```
1 4 3 2 
5 8 7 6 
9 12 11 10 
```

> [!NOTE] Observatie
> `x = 2`, `y = 4`: coloana `2` si coloana `4` si-au schimbat locul. Coloanele `1` si `3` au ramas neatinse.

---

## Rearanjarea liniilor dupa un vector de permutare

Interschimbarea muta doua linii. Daca vrem sa rearanjam **toate** liniile dintr-o data, folosim un **vector de permutare** `p[1..n]`: in noua matrice, linia `i` trebuie sa contina vechea linie `p[i]`.

Pentru a nu strica matricea in timp ce o rearanjam, construim rezultatul intr-o **matrice auxiliara** `b`:

```cpp
#include <iostream>
using namespace std;
int a[101][101], b[101][101], p[101], n, m, i, j;

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
        cin >> p[i];
    }
    for (i = 1; i <= n; i++)
    {
        for (j = 1; j <= m; j++)
        {
            b[i][j] = a[p[i]][j];
        }
    }
    for (i = 1; i <= n; i++)
    {
        for (j = 1; j <= m; j++)
        {
            cout << b[i][j] << " ";
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
3 1 2
```

**Afisare:**

```
9 10 11 12 
1 2 3 4 
5 6 7 8 
```

> [!NOTE] Observatie
> vectorul de permutare este `p = (3, 1, 2)`. Deci: noua linie `1` ia vechea linie `p[1] = 3`, noua linie `2` ia vechea linie `p[2] = 1`, noua linie `3` ia vechea linie `p[3] = 2`.

> [!TIP] Sfat
> matricea auxiliara `b` este necesara pentru ca o linie veche poate fi "mutata" in mai multe locuri sau peste alta linie de care mai avem nevoie. Daca am scrie direct in `a`, am suprascrie linii inainte sa apucam sa le copiem.

---

## Rotatia circulara a liniilor

La o **rotatie circulara in jos cu o pozitie**, fiecare linie coboara un rand, iar **ultima linie trece prima** (se "imbraca" pe deasupra). Ordinea `L1, L2, L3` devine `L3, L1, L2`.

Pasii:

1. salvam **ultima linie** intr-un vector auxiliar `t`
2. coboram liniile `1..n-1` cu o pozitie (de jos in sus, ca sa nu suprascriem)
3. punem linia salvata pe **pozitia `1`**

```cpp
#include <iostream>
using namespace std;
int a[101][101], t[101], n, m, i, j;

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
        t[j] = a[n][j];
    }
    for (i = n; i >= 2; i--)
    {
        for (j = 1; j <= m; j++)
        {
            a[i][j] = a[i - 1][j];
        }
    }
    for (j = 1; j <= m; j++)
    {
        a[1][j] = t[j];
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
9 10 11 12 
1 2 3 4 
5 6 7 8 
```

> [!WARNING] Atentie
> `for`-ul de mutare merge **de jos in sus** (`i` de la `n` la `2`), pentru ca asezam `a[i] = a[i-1]`. Daca l-am parcurge de sus in jos, am suprascrie linia `i-1` inainte sa o folosim.

> [!TIP] Rotatia in sus
> pentru o rotatie **in sus** salvezi **prima** linie in `t`, urci liniile (`i` de la `1` la `n-1`, `a[i] = a[i+1]`) si pui linia salvata pe pozitia `n`.

---

## Rotatia circulara a coloanelor

Acelasi rationament, dar pe coloane. La o **rotatie la stanga cu o pozitie**, fiecare coloana se muta cu un loc la stanga, iar **prima coloana trece ultima**:

```cpp
#include <iostream>
using namespace std;
int a[101][101], t[101], n, m, i, j;

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
        t[i] = a[i][1];
    }
    for (j = 1; j <= m - 1; j++)
    {
        for (i = 1; i <= n; i++)
        {
            a[i][j] = a[i][j + 1];
        }
    }
    for (i = 1; i <= n; i++)
    {
        a[i][m] = t[i];
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
2 3 4 1 
6 7 8 5 
10 11 12 9 
```

> [!NOTE] Observatie
> vechea coloana `1` (`1, 5, 9`) a ajuns ultima, iar celelalte s-au deplasat cu un loc la stanga. Aici `for`-ul de mutare merge **de la stanga la dreapta** (`j` de la `1` la `m-1`), pentru ca asezam `a[i][j] = a[i][j+1]`.

---

## Rotatia cu `k` pozitii

Daca trebuie sa rotim cu `k` pozitii (nu doar una), pur si simplu **repetam de `k` ori** rotatia cu o pozitie.

Inainte de asta facem o observatie importanta: a roti cu `n` pozitii readuce matricea exact la forma initiala. Deci rotirea cu `k` da acelasi rezultat ca rotirea cu `k % n`. Reducem `k` la `k % n` ca sa nu facem munca degeaba (daca `k` ar fi, de exemplu, `1000`):

```cpp
#include <iostream>
using namespace std;
int a[101][101], t[101], n, m, i, j, k, pas;

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
    cin >> k;
    k = k % n;
    for (pas = 1; pas <= k; pas++)
    {
        for (j = 1; j <= m; j++)
        {
            t[j] = a[n][j];
        }
        for (i = n; i >= 2; i--)
        {
            for (j = 1; j <= m; j++)
            {
                a[i][j] = a[i - 1][j];
            }
        }
        for (j = 1; j <= m; j++)
        {
            a[1][j] = t[j];
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
2
```

**Afisare:**

```
5 6 7 8 
9 10 11 12 
1 2 3 4 
```

> [!NOTE] Observatie
> am rotit in jos cu `k = 2` pozitii. Dupa prima rotatie: `L3, L1, L2`. Dupa a doua: `L2, L3, L1` — adica exact afisarea de mai sus.

> [!TIP] Sfat
> `pas` este doar un contor care numara cate rotatii am facut; nu apare in interiorul lor. Codul dintre acolade este identic cu cel de la rotatia cu o pozitie.

---

## Oglindirea (rasturnarea) liniilor

A **oglindi** ordinea liniilor inseamna a inversa matricea pe verticala: prima linie cu ultima, a doua cu penultima, si asa mai departe. Folosim aceeasi tehnica de interschimbare cu `aux`, dar pe **perechi** de linii: linia `i` cu linia `n - i + 1`, pentru `i` de la `1` pana la `n / 2`:

```cpp
#include <iostream>
using namespace std;
int a[101][101], n, m, i, j, aux;

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
    for (i = 1; i <= n / 2; i++)
    {
        for (j = 1; j <= m; j++)
        {
            aux = a[i][j];
            a[i][j] = a[n - i + 1][j];
            a[n - i + 1][j] = aux;
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
9 10 11 12 
5 6 7 8 
1 2 3 4 
```

> [!IMPORTANT] Important
> `for`-ul merge doar pana la `n / 2`. Daca ar merge pana la `n`, am interschimba fiecare pereche **de doua ori** si matricea ar reveni la forma initiala. Daca `n` este impar, linia din mijloc ramane pe loc (e corect — ea se oglindeste in ea insasi).

> [!TIP] Oglindirea coloanelor
> pentru a oglindi **pe orizontala** (prima coloana cu ultima), interschimbi coloanele `j` si `m - j + 1` pentru `j` de la `1` la `m / 2`, parcurgand liniile cu `for`-ul interior.

---

## Stergerea unei linii

Aici dimensiunea matricei **scade**. Ca sa stergem linia `x`, **suprascriem** continutul ei cu liniile de sub ea: linia `x` ia continutul liniei `x+1`, linia `x+1` pe al liniei `x+2`, si asa mai departe. La final, matricea are cu o linie mai putin, deci `n--`:

```cpp
#include <iostream>
using namespace std;
int a[101][101], n, m, i, j, x;

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
    cin >> x;
    for (i = x; i <= n - 1; i++)
    {
        for (j = 1; j <= m; j++)
        {
            a[i][j] = a[i + 1][j];
        }
    }
    n--;
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
2
```

**Afisare:**

```
1 2 3 4 
9 10 11 12 
```

> [!IMPORTANT] Important
> dupa stergere facem `n--`. Daca uitam, la afisare am parcurge si vechea ultima linie (acum duplicat), iar matricea ar parea ca nu s-a micsorat.

> [!WARNING] Atentie
> `for`-ul de mutare merge **de sus in jos** (`i` de la `x` la `n-1`), exact invers fata de inserare. Aici trebuie sa folosim valoarea de jos **inainte** sa o suprascriem.

---

## Stergerea unei coloane

Simetric: pentru a sterge coloana `y`, fiecare coloana ia continutul celei din dreapta ei (`a[i][j] = a[i][j+1]`), apoi `m--`:

```cpp
#include <iostream>
using namespace std;
int a[101][101], n, m, i, j, y;

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
    cin >> y;
    for (j = y; j <= m - 1; j++)
    {
        for (i = 1; i <= n; i++)
        {
            a[i][j] = a[i][j + 1];
        }
    }
    m--;
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
3
```

**Afisare:**

```
1 2 4 
5 6 8 
9 10 12 
```

> [!NOTE] Observatie
> am sters coloana `3`. Coloanele `1` si `2` au ramas pe loc, iar vechea coloana `4` s-a mutat in locul celei sterse.

---

## Stergerea tuturor liniilor cu o anumita proprietate

O aplicatie tipica: stergem **toate** liniile a caror suma este **para**. Aici trebuie sa fim atenti la un detaliu: dupa ce stergem o linie, liniile de sub ea urca cu o pozitie, deci pe pozitia `i` apare o **linie noua** care trebuie verificata si ea. De aceea:

- folosim un `while`, nu un `for` (limita `n` se schimba in timpul parcurgerii)
- cand **stergem** linia `i`, **nu** trecem mai departe (`i` ramane neschimbat)
- cand **pastram** linia `i`, avansam (`i++`)

```cpp
#include <iostream>
using namespace std;
int a[101][101], n, m, i, j, k, s;

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
    i = 1;
    while (i <= n)
    {
        s = 0;
        for (j = 1; j <= m; j++)
        {
            s = s + a[i][j];
        }
        if (s % 2 == 0)
        {
            for (k = i; k <= n - 1; k++)
            {
                for (j = 1; j <= m; j++)
                {
                    a[k][j] = a[k + 1][j];
                }
            }
            n--;
        }
        else
        {
            i++;
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
4 4
1 1 1 1
1 2 3 4
1 1 1 2
2 2 2 3
```

**Afisare:**

```
1 1 1 2 
2 2 2 3 
```

> [!NOTE] Observatie
> sumele liniilor sunt: `4` (para), `10` (para), `5` (impara), `9` (impara). Primele doua linii se sterg, ultimele doua raman.

> [!WARNING] Atentie
> cand stergem linia `i`, **nu** facem `i++` — altfel am sari peste linia care tocmai a urcat in locul ei. Acesta este motivul pentru care `i++` apare **doar** pe ramura `else`.

---

## Inserarea unei linii

Acum dimensiunea **creste**. Ca sa inseram o linie noua pe pozitia `x`, mai intai facem **loc**: coboram cu o pozitie liniile `x..n` (de jos in sus, ca sa nu suprascriem). Apoi `n++` si citim noua linie pe pozitia `x`:

```cpp
#include <iostream>
using namespace std;
int a[101][101], n, m, i, j, x;

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
    cin >> x;
    for (i = n; i >= x; i--)
    {
        for (j = 1; j <= m; j++)
        {
            a[i + 1][j] = a[i][j];
        }
    }
    n++;
    for (j = 1; j <= m; j++)
    {
        cin >> a[x][j];
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
2
100 200 300 400
```

**Afisare:**

```
1 2 3 4 
100 200 300 400 
5 6 7 8 
9 10 11 12 
```

> [!WARNING] Atentie
> `for`-ul care face loc merge **de jos in sus** (`i` de la `n` la `x`), exact invers fata de stergere. Asezam `a[i+1] = a[i]`, deci pozitia de sus trebuie citita inainte sa fie acoperita de cea de deasupra ei.

> [!IMPORTANT] Important
> dupa ce facem loc, crestem dimensiunea cu `n++` si abia apoi citim noua linie pe pozitia `x`. Linia noua are tot `m` elemente.

---

## Inserarea unei coloane

Simetric cu inserarea unei linii: facem loc deplasand coloanele `y..m` cu o pozitie la dreapta (de la dreapta la stanga), `m++`, apoi citim noua coloana — cate o valoare pe fiecare linie:

```cpp
#include <iostream>
using namespace std;
int a[101][101], n, m, i, j, y;

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
    cin >> y;
    for (j = m; j >= y; j--)
    {
        for (i = 1; i <= n; i++)
        {
            a[i][j + 1] = a[i][j];
        }
    }
    m++;
    for (i = 1; i <= n; i++)
    {
        cin >> a[i][y];
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
2
100 200 300
```

**Afisare:**

```
1 100 2 3 4 
5 200 6 7 8 
9 300 10 11 12 
```

> [!NOTE] Observatie
> noua coloana se insereaza pe pozitia `2`. Valorile `100 200 300` se citesc cate una pentru fiecare linie (sunt `n` valori), pentru ca o coloana are `n` elemente.

> [!TIP] Sfat de retinut
> regula generala pentru orice deplasare: cand **muti spre indici mai mari** (inserare), parcurgi de la coada spre cap; cand **muti spre indici mai mici** (stergere), parcurgi de la cap spre coada. Asa nu suprascrii niciodata o valoare inainte sa o folosesti.
