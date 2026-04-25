# strcpy

```cpp
#include <cstring>
char* strcpy(char* dest, char* sursa);
```

`strcpy` vine de la *str*ing + *c*o*py*. **Efect:** copiaza toate caracterele din `sursa` in `dest`, inclusiv `'\0'` de la final. Returneaza `dest`.

> **Obs:** `strcpy(a, b)` este echivalentul atribuirii `a = b` pentru siruri — copiaza valorile, nu adresa.

---

## Exemplu cu tabel

Inainte de apel:

| index | 0 | 1 | 2 | 3 | 4  |
|-------|---|---|---|---|----|
| dest  | ? | ? | ? | ? | ?  |
| sursa | m | a | r | e | \0 |

Dupa `strcpy(dest, sursa)`:

| index | 0 | 1 | 2 | 3 | 4  |
|-------|---|---|---|---|----|
| dest  | m | a | r | e | \0 |

> **Obs:** `dest` trebuie sa aiba spatiu suficient pentru a incapea tot sirul `sursa`.

---

## Cu offset

`strcpy` poate fi apelat cu adrese de mijloc:

```cpp
strcpy(s + 3, t + 2);
// s[3]=t[2]; s[4]=t[3]; s[5]=t[4]; ... pana la '\0'
```

---

## Cum functioneaza intern

```cpp
char* strcpy(char* dest, char* sursa)
{
    int i;
    for (i = 0; sursa[i] != '\0'; i++)
        dest[i] = sursa[i];
    dest[i] = '\0';
    return dest;
}
```

---

## Exemplu complet

```cpp
#include <iostream>
#include <cstring>
using namespace std;

char a[50], b[50];

int main()
{
    cin >> a;
    strcpy(b, a);
    b[0] = 'X';         // modific b — a ramane neschimbat
    cout << a << '\n';
    cout << b << '\n';
    return 0;
}
```

**Intrare:**
```
Ana
```

**Afisare:**
```
Ana
Xna
```
