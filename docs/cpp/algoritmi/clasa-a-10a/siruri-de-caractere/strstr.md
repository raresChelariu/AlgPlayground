# strstr

```cpp
#include <cstring>
char* strstr(char* s, char* sub);
```

`strstr` vine de la *str*ing + sub*str*ing. **Efect:** cauta **prima aparitie** a subsirului `sub` in sirul `s`. Returneaza adresa de inceput a primei aparitii, sau `NULL` daca `sub` nu se gaseste.

---

## Exemplu cu tabel

Daca `s` = `"eu am leagane"`:

| index |  0 |  1 |  2 |  3 |  4 |  5 |  6 |  7 |  8 |  9 | 10 | 11 | 12 | 13  |
|-------|----|----|----|----|----|----|----|----|----|----|----|----|----|----|
| s     |  e |  u |    |  a |  m |    |  l |  e |  a |  g |  a |  n |  e | \0  |

| apel | rezultat | sir de la acea adresa |
|------|----------|-----------------------|
| `strstr(s, "le")` | `s + 6` | `"leagane"` |
| `strstr(s, "am")` | `s + 3` | `"am leagane"` |
| `strstr(s, "xyz")` | `NULL` | — |

---

## A doua aparitie

```cpp
char* p1 = strstr(s, "le");
char* p2 = strstr(p1 + strlen("le"), "le");
// sau prescurtat: p1 + 2  (lungimea lui "le" este 2)
```

> **Obs:** Avanseaza cu `+ strlen(sub)` de la adresa gasita pentru a nu gasi aceeasi aparitie.

---

## Cum functioneaza intern

```cpp
char* strstr(char* s, char* sub)
{
    int i, j;
    bool gasit;
    for (i = 0; s[i] != '\0'; i++)
    {
        gasit = true;
        for (j = 0; sub[j] != '\0'; j++)
            if (s[i + j] != sub[j]) { gasit = false; break; }
        if (gasit)
            return s + i;
    }
    return NULL;
}
```

---

## Exemplu complet

```cpp
#include <iostream>
#include <cstring>
using namespace std;

char s[200], sub[50];
char* p;

int main()
{
    cin >> s >> sub;
    p = strstr(s, sub);
    if (p != NULL)
        cout << "Gasit la pozitia: " << p - s;
    else
        cout << "Nu exista";
    return 0;
}
```

**Intrare:**
```
abecedar
ece
```

**Afisare:**
```
Gasit la pozitia: 2
```
