# Colectie de cuvinte

Daca am nevoie sa memorez mai multe cuvinte, folosesc o **matrice de caractere** — un vector de siruri.

```cpp
char M[NRMAX][DMAX];
// NRMAX = numarul maxim de cuvinte
// DMAX  = lungimea maxima a unui cuvant + 1 (pentru '\0')
```

`M[i]` este al i-lea cuvant — un sir de caractere obisnuit.

---

## Exemplu cu tabel

Daca am `M[5][8]` si memorez `"ana"`, `"are"`, `"mere"`:

| i | M[i][0] | M[i][1] | M[i][2] | M[i][3] | M[i][4] |
|---|---------|---------|---------|---------|---------|
| 0 | a       | n       | a       | \0      | ...     |
| 1 | a       | r       | e       | \0      | ...     |
| 2 | m       | e       | r       | e       | \0      |

---

## Citirea unui numar necunoscut de cuvinte

```cpp
#include <iostream>
#include <cstring>
using namespace std;

const int NRMAX = 100;
const int DMAX  = 50;

char M[NRMAX][DMAX];
char s[DMAX];
int nrCuv;

int main()
{
    nrCuv = 0;
    while (cin >> s)
    {
        strcpy(M[nrCuv], s);
        nrCuv++;
    }
    int i;
    for (i = 0; i < nrCuv; i++)
        cout << M[i] << '\n';
    return 0;
}
```

**Intrare:**
```
ana are mere si pere
```

**Afisare:**
```
ana
are
mere
si
pere
```

---

## Sortare lexicografica

Pentru a sorta cuvintele folosesc `strcmp` la comparare si `strcpy` la interschimbare (nu pot folosi `=` direct intre siruri).

```cpp
#include <iostream>
#include <cstring>
using namespace std;

const int NRMAX = 100;
const int DMAX  = 50;

char M[NRMAX][DMAX];
char aux[DMAX];
int n, i, j;

int main()
{
    cin >> n;
    for (i = 0; i < n; i++)
        cin >> M[i];
    for (i = 0; i < n - 1; i++)
        for (j = i + 1; j < n; j++)
            if (strcmp(M[i], M[j]) > 0)
            {
                strcpy(aux,  M[i]);
                strcpy(M[i], M[j]);
                strcpy(M[j], aux);
            }
    for (i = 0; i < n; i++)
        cout << M[i] << '\n';
    return 0;
}
```

**Intrare:**
```
4
mere
ana
pere
abece
```

**Afisare:**
```
abece
ana
mere
pere
```

> **Obs:** `M[i] = M[j]` **nu** copiaza continutul — copiaza adresa (ceea ce nu are sens pentru tablouri). Foloseste intotdeauna `strcpy` pentru a copia siruri.
