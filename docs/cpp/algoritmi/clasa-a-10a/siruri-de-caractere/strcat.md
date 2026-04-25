# strcat

```cpp
#include <cstring>
char* strcat(char* dest, char* sursa);
```

`strcat` vine de la *str*ing + *cat*enare. **Efect:** lipeste `sursa` la sfarsitul lui `dest`. Returneaza `dest`.

Intern, `strcat` gaseste mai intai sfarsitul lui `dest` (prima pozitie cu `'\0'`), apoi copiaza `sursa` incepand de acolo:

```cpp
strcat(dest, sursa);
// echivalent cu:
strcpy(dest + strlen(dest), sursa);
```

---

## Exemplu cu tabel

`dest` = `"ana"`, `sursa` = `"are"`.

Inainte:

| index | 0 | 1 | 2 | 3  | 4 | 5 | 6 | 7 |
|-------|---|---|---|----|---|---|---|---|
| dest  | a | n | a | \0 | ? | ? | ? | ? |
| sursa | a | r | e | \0 |   |   |   |   |

`strlen(dest) = 3` — copierea incepe la `dest[3]`.

Dupa `strcat(dest, sursa)`:

| index | 0 | 1 | 2 | 3 | 4 | 5 | 6  |
|-------|---|---|---|---|---|---|----|
| dest  | a | n | a | a | r | e | \0 |

---

## Cum functioneaza intern

```cpp
char* strcat(char* dest, char* sursa)
{
    int lg = strlen(dest);
    int i;
    for (i = 0; sursa[i] != '\0'; i++)
        dest[lg + i] = sursa[i];
    dest[lg + i] = '\0';
    return dest;
}
```

---

## Exemplu complet

```cpp
#include <iostream>
#include <cstring>
using namespace std;

char prenume[50], nume[50], complet[100];

int main()
{
    cin >> prenume >> nume;
    strcpy(complet, prenume);
    strcat(complet, " ");
    strcat(complet, nume);
    cout << complet;
    return 0;
}
```

**Intrare:**
```
Ana Ionescu
```

**Afisare:**
```
Ana Ionescu
```

> **Obs:** `dest` trebuie sa aiba spatiu suficient pentru ambele siruri impreuna. `strcat` nu verifica dimensiunea — daca `dest` este prea mic, comportamentul este nedefinit.
