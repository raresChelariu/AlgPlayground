# strchr

```cpp
#include <cstring>
char* strchr(char* s, char c);
```

`strchr` vine de la *str*ing + *ch*a*r*acter. **Efect:** cauta **prima aparitie** a caracterului `c` in sirul `s`. Returneaza adresa unde a gasit caracterul, sau `NULL` daca nu exista.

---

## Exemplu cu tabel

Daca `s` = `"abecedar"`:

| index | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8  |
|-------|---|---|---|---|---|---|---|---|----|
| s     | a | b | e | c | e | d | a | r | \0 |

| apel | rezultat | sir de la acea adresa |
|------|----------|-----------------------|
| `strchr(s, 'e')` | `s + 2` | `"ecedar"` |
| `strchr(s, 'a')` | `s + 0` | `"abecedar"` |
| `strchr(s, 'z')` | `NULL`  | — |

```cpp
char* p = strchr(s, 'e');  // p = s + 2
int poz  = p - s;          // poz = 2
```

---

## A doua aparitie

```cpp
char* p1 = strchr(s, 'e');         // prima aparitie: s + 2
char* p2 = strchr(p1 + 1, 'e');    // a doua aparitie: s + 4
```

> **Obs:** Avanseaza cu `+ 1` de la adresa gasita pentru a cauta urmatoarea aparitie.

---

## Verificare existenta

```cpp
if (strchr(s, 'x') != NULL)    // 'x' apare in sir
if (strchr(s, 'x') == NULL)    // 'x' nu apare in sir
```

---

## Cum functioneaza intern

```cpp
char* strchr(char* s, char c)
{
    int i;
    for (i = 0; s[i] != '\0'; i++)
        if (s[i] == c)
            return s + i;
    return NULL;
}
```

---

## Exemplu complet

```cpp
#include <iostream>
#include <cstring>
using namespace std;

char s[100];
char* p;

int main()
{
    cin >> s;
    p = strchr(s, 'a');
    if (p != NULL)
        cout << "Prima 'a' la pozitia: " << p - s;
    else
        cout << "Caracterul nu exista";
    return 0;
}
```

**Intrare:**
```
abecedar
```

**Afisare:**
```
Prima 'a' la pozitia: 0
```
