# strcmp

```cpp
#include <cstring>
int strcmp(char* a, char* b);
```

`strcmp` vine de la *str*ing + *comp*are. **Efect:** compara lexicografic doua siruri. Returneaza un numar negativ daca `a < b`, `0` daca `a == b`, pozitiv daca `a > b`.

> **Obs:** Nu compara siruri cu `==`, `<` sau `>` direct — acestea compara **adresele**, nu continutul.

---

## Cum functioneaza

Se compara caracterele simultan de la pozitia 0. La **prima pozitie** unde difera, se decide rezultatul. Daca unul dintre siruri se termina (`'\0'`), sirul mai scurt este considerat mai mic.

Exemple:

| `a`           | `b`             | prima diferenta           | rezultat  |
|---------------|-----------------|---------------------------|-----------|
| `"ana"`       | `"mere"`        | poz 0: `'a'` vs `'m'`    | negativ   |
| `"abecedar"`  | `"abracadabra"` | poz 2: `'e'` vs `'r'`    | negativ   |
| `"ana"`       | `"anastasia"`   | poz 3: `'\0'` vs `'s'`   | negativ   |
| `"carte"`     | `"carte"`       | — (identice)              | `0`       |
| `"zebra"`     | `"ana"`         | poz 0: `'z'` vs `'a'`    | pozitiv   |

---

## Tabel de utilizare

| expresie              | semnificatie |
|-----------------------|-------------|
| `strcmp(a, b) < 0`    | `a < b`     |
| `strcmp(a, b) == 0`   | `a == b`    |
| `strcmp(a, b) > 0`    | `a > b`     |

---

## Cum functioneaza intern

```cpp
int strcmp(char* a, char* b)
{
    int i;
    for (i = 0; a[i] != '\0' && b[i] != '\0'; i++)
        if (a[i] != b[i])
            return a[i] - b[i];
    return a[i] - b[i];
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
    cin >> a >> b;
    if (strcmp(a, b) < 0)
        cout << a << " vine inainte de " << b;
    else if (strcmp(a, b) > 0)
        cout << b << " vine inainte de " << a;
    else
        cout << "Cuvintele sunt identice";
    return 0;
}
```

**Intrare:**
```
ana mere
```

**Afisare:**
```
ana vine inainte de mere
```
