# Vecinii unei celule din matrice

Pentru o celula `a[i][j]` dintr-o matrice, prin **vecini** intelegem celulele aflate imediat in jurul ei. In functie de problema, lucram cu doua conventii:

- **4 vecini**: sus, jos, stanga, dreapta
- **8 vecini**: cei 4 de mai sus + cele 4 diagonale

Celulele de pe **chenarul** matricei au mai putini vecini valizi — pentru ele, unii vecini ar fi "in afara" matricei.

---

## Vectori de deplasare — ideea

Daca am scrie de mana cele 4 (sau 8) accesari ale vecinilor, am avea un cod lung si plin de greseli. Solutia: retinem **deplasarile** intr-o pereche de vectori — `dl[]` pentru deplasarea pe **linie** (delta linie) si `dc[]` pentru deplasarea pe **coloana** (delta coloana) — si parcurgem vecinii cu un singur `for`.

> [!IMPORTANT] Conventia de semn
> liniile cresc **in jos**, coloanele cresc **la dreapta**. Asadar:
> - `dl = -1` inseamna **o linie mai sus**, `dl = +1` o linie mai jos
> - `dc = -1` inseamna **o coloana la stanga**, `dc = +1` o coloana la dreapta

---

## Cei 4 vecini

In jurul celulei `a[i][j]` (notata `(0, 0)` ca offset), cei 4 vecini au urmatoarele deplasari:

|                 | coloana `-1` | coloana `0` | coloana `+1` |
| --------------- | ------------ | ----------- | ------------ |
| **linia `-1`**  |              | `-1, 0`     |              |
| **linia `0`**   | `0, -1`      | **`0, 0`**  | `0, +1`      |
| **linia `+1`**  |              | `+1, 0`     |              |

Vectorii de deplasare:

```cpp
int dl[4] = {-1, 1, 0, 0};
int dc[4] = {0, 0, -1, 1};
```

Pentru a accesa cei 4 vecini ai lui `a[i][j]`:

```cpp
for (k = 0; k < 4; k++)
{
    il = i + dl[k];
    ic = j + dc[k];
    // a[il][ic] este vecinul curent
}
```

> [!NOTE] Observatie
> indexarea vectorilor `dl` si `dc` este de la `0`, nu de la `1`. Este o exceptie de la conventia uzuala: vectorii au exact 4 (sau 8) elemente fixe si folosim un index `k` care nu reprezinta o pozitie din enuntul problemei, ci un simplu numar al directiei.

---

## Cei 8 vecini (cu diagonale)

Daca includem si cele 4 diagonale, toate cele 8 casute din jurul centrului sunt vecini:

|                 | coloana `-1` | coloana `0` | coloana `+1` |
| --------------- | ------------ | ----------- | ------------ |
| **linia `-1`**  | `-1, -1`     | `-1, 0`     | `-1, +1`     |
| **linia `0`**   | `0, -1`      | **`0, 0`**  | `0, +1`      |
| **linia `+1`**  | `+1, -1`     | `+1, 0`     | `+1, +1`     |

Vectorii:

```cpp
int dl[8] = {-1, -1, -1,  0, 0,  1, 1, 1};
int dc[8] = {-1,  0,  1, -1, 1, -1, 0, 1};
```

Iar parcurgerea devine:

```cpp
for (k = 0; k < 8; k++)
{
    il = i + dl[k];
    ic = j + dc[k];
    // a[il][ic] este vecinul curent
}
```

> [!TIP] Sfat
> ordinea elementelor in `dl` si `dc` **nu conteaza** atata timp cat indicele `k` se refera la **aceeasi directie** in ambii vectori. Adica `(dl[k], dc[k])` formeaza o pereche valida de offsets pentru directia `k`.

---

## Verificarea marginilor

Pentru o matrice cu `n` linii si `m` coloane (indexata de la `1`), un vecin `(il, ic)` este **in interiorul matricei** daca:

```cpp
if (il >= 1 && il <= n && ic >= 1 && ic <= m)
```

### Exemplu: cati vecini mai mari are fiecare celula

Pentru fiecare celula `a[i][j]`, afisam cati dintre cei **4 vecini valizi** sunt **strict mai mari** decat ea.

```cpp
#include <iostream>
using namespace std;
int a[103][103], n, m, i, j, k, il, ic, cnt;
int dl[4] = {-1, 1, 0, 0};
int dc[4] = {0, 0, -1, 1};

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
            cnt = 0;
            for (k = 0; k < 4; k++)
            {
                il = i + dl[k];
                ic = j + dc[k];
                if (il >= 1 && il <= n && ic >= 1 && ic <= m)
                {
                    if (a[il][ic] > a[i][j])
                    {
                        cnt++;
                    }
                }
            }
            cout << cnt << " ";
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
2 2 2 1 
2 2 2 1 
1 1 1 0 
```

> [!NOTE] Observatie
> celula `a[1][1] = 1` are doi vecini valizi: `a[1][2] = 2` si `a[2][1] = 5` — ambii strict mai mari, deci raspunsul este `2`. Celula `a[3][4] = 12` are vecinii valizi `a[3][3] = 11` si `a[2][4] = 8` — niciunul mai mare, deci `0`.

---

## Bordarea matricei (sentinele)

Cand verificam o proprietate a fiecarei celule, codul cu `if`-uri pentru margini devine repede greoi. Un truc utilizat des: **bordam** matricea cu valori care **nu pot aparea in date**, asa incat sa nu mai avem nevoie de verificare de margine.

### Problema: toti vecinii sunt distincti

Avem o matrice cu **numere naturale** (`>= 0`). Pentru fiecare celula `a[i][j]` vrem sa verificam ca toti cei 4 vecini sunt **distincti intre ei** si **diferiti de celula curenta**.

Daca am borda exteriorul cu o singura valoare (ex. `-1`), in coltul `(1, 1)` cei doi vecini "din afara" ar fi `a[0][1] = -1` si `a[1][0] = -1` — egali intre ei. Verificarea ar pica desi vecinii reali din matrice ar putea fi distincti.

> [!TIP] Sfat
> bordam **liniile** exterioare cu o valoare si **coloanele** exterioare cu o alta valoare. Asa, intr-un colt, cei doi vecini "din afara" sunt distincti intre ei si distincti de orice numar natural.

Conventia folosita aici:

- liniile `0` si `n + 1` → bordare cu `-1`
- coloanele `0` si `m + 1` → bordare cu `-2`

> [!IMPORTANT] Important
> matricea trebuie declarata cu `n + 2` linii si `m + 2` coloane, ca sa avem loc pentru indicii `0` si `n + 1`, respectiv `0` si `m + 1`. Daca enuntul spune `n, m <= 100`, declaram `a[103][103]`.

> [!NOTE] Observatie
> matricea fiind declarata **global**, este initializata automat cu `0`. Insa `0` este o valoare valida pentru date naturale (poate aparea in matrice), deci trebuie sa **suprascriem** bordura cu `-1` si `-2`.

### Program complet

```cpp
#include <iostream>
using namespace std;
int a[103][103], n, m, i, j, k, il, ic;
int dl[4] = {-1, 1, 0, 0};
int dc[4] = {0, 0, -1, 1};
bool toti_distincti;

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
    // bordare: linia 0 si linia n+1 cu -1
    for (j = 0; j <= m + 1; j++)
    {
        a[0][j] = -1;
        a[n + 1][j] = -1;
    }
    // bordare: coloana 0 si coloana m+1 cu -2
    for (i = 0; i <= n + 1; i++)
    {
        a[i][0] = -2;
        a[i][m + 1] = -2;
    }
    // verificam pentru fiecare celula
    for (i = 1; i <= n; i++)
    {
        for (j = 1; j <= m; j++)
        {
            toti_distincti = 1;
            // verificam: niciun vecin nu este egal cu a[i][j]
            for (k = 0; k < 4; k++)
            {
                il = i + dl[k];
                ic = j + dc[k];
                if (a[il][ic] == a[i][j])
                {
                    toti_distincti = 0;
                }
            }
            // verificam: vecinii sunt distincti doi cate doi
            // (comparam fiecare pereche de vecini)
            if (a[i - 1][j] == a[i + 1][j]) toti_distincti = 0;
            if (a[i - 1][j] == a[i][j - 1]) toti_distincti = 0;
            if (a[i - 1][j] == a[i][j + 1]) toti_distincti = 0;
            if (a[i + 1][j] == a[i][j - 1]) toti_distincti = 0;
            if (a[i + 1][j] == a[i][j + 1]) toti_distincti = 0;
            if (a[i][j - 1] == a[i][j + 1]) toti_distincti = 0;

            cout << toti_distincti << " ";
        }
        cout << endl;
    }
    return 0;
}
```

**Intrare:**

```
3 3
1 2 3
4 5 6
7 8 9
```

**Afisare:**

```
1 1 1 
1 1 1 
1 1 1 
```

> [!NOTE] Observatie
> in matricea de mai sus toate elementele sunt distincte, deci pentru orice celula toti vecinii sunt distincti intre ei si diferiti de celula curenta — afisarea este `1` (adevarat) peste tot.

> [!TIP] Avantajul bordarii
> in `for`-ul de verificare am putut scrie `a[il][ic]` **fara** sa testez daca `(il, ic)` este in matrice. Daca cade pe bordura, valoarea `-1` sau `-2` nu va fi niciodata egala cu un numar natural — deci nu strica verificarea.

---

## Aplicatie: mutarile calului pe tabla de sah

Calul se misca in forma de "L": **doua casute** intr-o directie (sus / jos / stanga / dreapta) si **o casuta** perpendicular. In total, **8 mutari posibile** dintr-o casuta data.

Cele 8 deplasari ale calului fata de pozitia sa curenta `(0, 0)`:

|                 | col `-2` | col `-1` | col `0`     | col `+1` | col `+2` |
| --------------- | -------- | -------- | ----------- | -------- | -------- |
| **linia `-2`**  |          | `-2, -1` |             | `-2, +1` |          |
| **linia `-1`**  | `-1, -2` |          |             |          | `-1, +2` |
| **linia `0`**   |          |          | **`0, 0`**  |          |          |
| **linia `+1`**  | `+1, -2` |          |             |          | `+1, +2` |
| **linia `+2`**  |          | `+2, -1` |             | `+2, +1` |          |

Vectorii de deplasare:

```cpp
int dl[8] = {-2, -2, -1, -1,  1, 1,  2,  2};
int dc[8] = {-1,  1, -2,  2, -2, 2, -1,  1};
```

### Program complet

Tabla de sah are `8` linii si `8` coloane (indexate de la `1`). Citim pozitia calului `lc` (linie) si `cc` (coloana) si afisam toate pozitiile in care poate sari.

```cpp
#include <iostream>
using namespace std;
int lc, cc, k, il, ic;
int dl[8] = {-2, -2, -1, -1,  1, 1,  2,  2};
int dc[8] = {-1,  1, -2,  2, -2, 2, -1,  1};

int main()
{
    cin >> lc >> cc;
    for (k = 0; k < 8; k++)
    {
        il = lc + dl[k];
        ic = cc + dc[k];
        if (il >= 1 && il <= 8 && ic >= 1 && ic <= 8)
        {
            cout << il << " " << ic << endl;
        }
    }
    return 0;
}
```

**Intrare:**

```
4 4
```

**Afisare:**

```
2 3
2 5
3 2
3 6
5 2
5 6
6 3
6 5
```

> [!NOTE] Observatie
> din pozitia `(4, 4)`, calul are toate cele `8` mutari valide pentru ca este in centrul tablei — niciuna nu iese in afara.

**Intrare:**

```
1 1
```

**Afisare:**

```
2 3
3 2
```

> [!NOTE] Observatie
> din coltul `(1, 1)`, doar `2` mutari raman in tabla — restul ar duce calul in afara (`lc = -1`, `cc = 0` etc.).

---

## Recap

- **Vectori de deplasare** `dl[]` si `dc[]`: stocheaza ofset-urile pe linie si coloana pentru fiecare directie a unui vecin / a unei mutari.
- **4 vecini** (sus, jos, stanga, dreapta) → vectori de lungime `4`.
- **8 vecini** (cu diagonale) → vectori de lungime `8`.
- **Salturi mai exotice** (cal, alte piese de sah) → vectori cu deplasari specifice (ex. `(+/-1, +/-2)` si `(+/-2, +/-1)` pentru cal).
- Pentru a evita iesirea din matrice avem doua tehnici:
  - **`if` de verificare**: `il >= 1 && il <= n && ic >= 1 && ic <= m`
  - **Bordare**: completam exteriorul matricei cu valori sentinela (`-1`, `-2`, ...) care nu pot aparea in date.
