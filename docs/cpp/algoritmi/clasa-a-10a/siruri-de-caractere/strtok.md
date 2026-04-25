# strtok

```cpp
#include <cstring>
char* strtok(char* s, char* sep);
```

`strtok` vine de la *str*ing + *tok*en (bucata). **Efect:** extrage pe rand **token-urile** (bucatile de text) dintr-un sir, ignorand separatorii. Un separator este orice caracter care apare in sirul `sep`.

---

## Cum functioneaza

`strtok` modifica sirul original, punand `'\0'` in locul separatorilor, si tine intern o **adresa curenta** (variabila ascunsa statica).

- **Primul apel:** `strtok(s, sep)` — se da sirul.
- **Apelurile urmatoare:** `strtok(NULL, sep)` — `NULL` inseamna "continua de unde ai ramas".
- **Cand nu mai sunt tokeni:** returneaza `NULL`.

---

## Exemplu pas cu pas

Sirul initial: `,.,ana are,..,mere.,`

| apel | parametru | token returnat | adresa returnata |
|------|-----------|---------------|-----------------|
| 1 | `s`    | `"ana"`  | `s + 3`  |
| 2 | `NULL` | `"are"`  | `s + 7`  |
| 3 | `NULL` | `"mere"` | `s + 14` |
| 4 | `NULL` | —        | `NULL`   |

Sirul `s` dupa toate apelurile (separatorii devin `'\0'`):

| index | 0  | 1  | 2  | 3 | 4 | 5 | 6  | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18  | 19 |
|-------|----|----|----|----|---|---|----|---|---|---|----|----|----|----|----|----|----|----|----|-----|
| s     | ,  | .  | ,  | a  | n | a | \0 | a | r | e | \0 | .  | .  | ,  | m  | e  | r  | e  | \0 | ,   |

> **Obs:** `strtok` **modifica sirul original**. Daca ai nevoie de el dupa parcurgere, fa o copie cu `strcpy` inainte.

---

## Idiom de parcurgere

```cpp
char* p;
p = strtok(s, sep);
while (p != NULL)
{
    cout << p << '\n';
    p = strtok(NULL, sep);
}
```

Echivalent cu `for`:

```cpp
char* p;
for (p = strtok(s, sep); p != NULL; p = strtok(NULL, sep))
    cout << p << '\n';
```

---

## Exemplu complet

```cpp
#include <iostream>
#include <cstring>
using namespace std;

char s[] = "ana,are.mere,si.pere";
char sep[] = ",.";
char* p;

int main()
{
    for (p = strtok(s, sep); p != NULL; p = strtok(NULL, sep))
        cout << p << '\n';
    return 0;
}
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

## Implementare proprie

```cpp
char* mytok(char* s, char* sep)
{
    static char* urmatorul = NULL;
    char* token;
    int i, j;
    if (s == NULL)
    {
        s = urmatorul;
        if (urmatorul == NULL)
            return NULL;
    }
    token = NULL;
    for (i = 0; s[i] != '\0'; i++)
        if (strchr(sep, s[i]) == NULL)
        {
            token = s + i;
            break;
        }
    if (token == NULL)
        return NULL;
    for (j = i + 1; s[j] != '\0'; j++)
        if (strchr(sep, s[j]) != NULL)
        {
            urmatorul = s + j + 1;
            s[j] = '\0';
            return token;
        }
    urmatorul = NULL;
    return token;
}
```
