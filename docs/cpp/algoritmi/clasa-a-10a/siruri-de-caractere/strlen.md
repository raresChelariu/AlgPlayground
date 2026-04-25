# strlen

```cpp
#include <cstring>
int strlen(char* s);
```

`strlen` vine de la *str*ing + *len*gth. **Efect:** returneaza numarul de caractere din sirul `s`, fara a numara `'\0'` de la final.

---

## Exemplu cu tabel

Daca `s` contine:

| index | 0 | 1 | 2 | 3 | 4  | 5 | 6 | 7 | 8  |
|-------|---|---|---|---|----|---|---|---|----|
| s     | a | b | e | c | e  | \0 | a | r | \0 |

```cpp
strlen(s)     // 5  — numara a, b, e, c, e (se opreste la primul '\0')
strlen(s + 3) // 2  — numara de la index 3: c, e
```

---

## Cum functioneaza intern

```cpp
int strlen(char* s)
{
    int lg = 0;
    while (s[lg] != '\0')
        lg++;
    return lg;
}
```

---

## Atentie la bucle

`strlen(s)` **parcurge tot sirul** la fiecare apel. Nu folosi `strlen` direct in conditia unui `for` daca sirul nu se scurteaza:

```cpp
// Gresit — strlen(s) este recalculat la fiecare pas: O(n^2)
for (i = 0; i < strlen(s); i++) { ... }

// Corect — calculez lungimea o singura data: O(n)
int lg = strlen(s);
for (i = 0; i < lg; i++) { ... }
```

---

## Exemplu complet

```cpp
#include <iostream>
#include <cstring>
using namespace std;

char s[100];
int lg;

int main()
{
    cin >> s;
    lg = strlen(s);
    cout << "Lungimea: " << lg;
    return 0;
}
```

**Intrare:**
```
abecedar
```

**Afisare:**
```
Lungimea: 8
```
