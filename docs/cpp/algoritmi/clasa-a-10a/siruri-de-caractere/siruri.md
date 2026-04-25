# Siruri de caractere

Un **sir de caractere** este un vector de tip `char` folosit pentru a memora un cuvant sau un text.

---

## Structura in memorie

Memorarea incepe de la pozitia 0. Sfarsitul sirului este marcat cu **caracterul NULL** (`'\0'`, codul ASCII 0).

```cpp
char s[] = "mar";
// echivalent cu:
char s[4];
s[0] = 'm'; s[1] = 'a'; s[2] = 'r'; s[3] = '\0';
```

Reprezentare in memorie:

| index | 0 | 1 | 2 | 3  |
|-------|---|---|---|----|
| s     | m | a | r | \0 |

> **Obs:** Un sir de `n` caractere are nevoie de `n + 1` locatii (una in plus pentru `'\0'`).

---

## Afisarea unui sir

```cpp
cout << s;
```

Se afiseaza toate caracterele incepand cu `s[0]` pana la primul `'\0'`. Echivalent manual:

```cpp
int i;
for (i = 0; s[i] != '\0'; i++)
    cout << s[i];
```

Daca pun `'\0'` undeva la mijloc, restul nu se mai afiseaza:

```cpp
#include <iostream>
using namespace std;

char s[10];

int main()
{
    s[0] = 'a'; s[1] = 'x'; s[2] = 'y';
    s[3] = 'f'; s[4] = '\0'; s[5] = 'q';
    cout << s;  // afiseaza axyf
    return 0;
}
```

**Afisare:**
```
axyf
```

---

## Afisarea de la o pozitie arbitrara

`cout << s + k` afiseaza incepand de la pozitia `k`:

```cpp
#include <iostream>
using namespace std;

char s[] = "abecedar";

int main()
{
    cout << s     << '\n';  // abecedar
    cout << s + 2 << '\n';  // ecedar
    s[5] = '\0';
    cout << s     << '\n';  // abece
    return 0;
}
```

**Afisare:**
```
abecedar
ecedar
abece
```

Vizualizare memorie pentru `s = "abecedar"`:

| index | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8  |
|-------|---|---|---|---|---|---|---|---|----|
| s     | a | b | e | c | e | d | a | r | \0 |

- `cout << s`     → afiseaza de la index 0: `abecedar`
- `cout << s + 2` → afiseaza de la index 2: `ecedar`

---

## Citirea unui sir

### Metoda 1 — operatorul `>>`

```cpp
cin >> s;
```

**Efect:** Se sare peste caractere albe (spatii, newline), se citesc caractere pana la primul spatiu/newline. `'\0'` se adauga automat la final.

**Intrare:** `   hello guys`
**Rezultat:** `s` = `"hello"` (se citeste primul cuvant)

---

### Metoda 2 — `cin.getline`

```cpp
cin.getline(s, N);
```

**Efect:** Se citesc cel mult `N - 1` caractere sau pana la `'\n'`. Newline-ul **nu** se memoreaza, dar se consuma. `'\0'` se adauga automat.

```cpp
#include <iostream>
using namespace std;

char linie[100];

int main()
{
    cin.getline(linie, 100);
    cout << linie;
    return 0;
}
```

**Intrare:**
```
ana are mere
```

**Afisare:**
```
ana are mere
```

---

## Tipul `char*`

Un `char*` retine o **adresa** spre un caracter. `cout << p` (unde `p` este `char*`) afiseaza toate caracterele de la acea adresa pana la `'\0'`.

```cpp
#include <iostream>
using namespace std;

char s[] = "abecedar";
char* p;

int main()
{
    p = s + 3;
    cout << p;  // cedar
    return 0;
}
```

**Afisare:**
```
cedar
```
