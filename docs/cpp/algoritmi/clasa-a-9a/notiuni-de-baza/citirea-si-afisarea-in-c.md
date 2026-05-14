# Citirea si afisarea in limbajul C

- Pana acum am folosit `cin` si `cout` din C++ pentru citire si afisare. 
- Limbajul **C** are propriile sale functii pentru asta: `scanf` (citire) si `printf` (afisare). 
- Le vei intalni in multe surse de pe internet si in coduri mai vechi, asa ca este util sa le cunosti.
- Citirea si afisarea e mai rapida in limbajul C, decat in C++.

Pentru a le folosi, trebuie sa includem biblioteca `<cstdio>`:

```cpp
#include <cstdio>
```

---

## Descriptori de format

`scanf` si `printf` au nevoie sa stie ce **tip** de valoare citesc sau scriu. Pentru asta folosim **descriptori de format**:

| Descriptor | Tip      |
| :--------- | :------- |
| `%d`       | `int`    |
| `%c`       | `char`   |
| `%s`       | sir de caractere |
| `%f`       | `float`  |
| `%lf`      | `double` |

---

## `scanf` — citirea de la tastatura

Forma generala:

```cpp
scanf(format, &variabila);
```

> **Obs:** Inainte de numele variabilei punem `&` (adresa variabilei). Este o regula a lui `scanf` — fara `&`, programul nu va citi corect.

### Citirea unui numar intreg

```cpp
#include <cstdio>
int x;
int main()
{
    scanf("%d", &x);
    printf("Ai citit numarul %d\n", x);
    return 0;
}
```

**Intrare:**
```
7
```

**Afisare:**
```
Ai citit numarul 7
```

Echivalentul in C++ ar fi `cin >> x;`.

---

### Citirea mai multor valori

Putem citi mai multe valori intr-un singur `scanf`, punand mai multi descriptori in format:

```cpp
#include <cstdio>
int a, b;
float c;
int main()
{
    scanf("%d%d%f", &a, &b, &c);
    printf("a = %d, b = %d, c = %f\n", a, b, c);
    return 0;
}
```

**Intrare:**
```
5 3 2.5
```

**Afisare:**
```
a = 5, b = 3, c = 2.500000
```

Echivalentul in C++ ar fi `cin >> a >> b >> c;`.

---

## `printf` — afisarea pe ecran

Forma generala:

```cpp
printf(format, expresii);
```

In format scriem textul de afisat, iar acolo unde vrem sa apara valoarea unei variabile punem un descriptor (`%d`, `%f` etc.).

### Afisarea unui text simplu

```cpp
#include <cstdio>
int main()
{
    printf("Hello world!\n");
    return 0;
}
```

**Afisare:**
```
Hello world!
```

Echivalentul in C++ ar fi `cout << "Hello world!";`.

> **Obs:** `\n` inseamna **rand nou** (echivalent cu `endl` din C++).

---

### Afisarea unor valori in text

```cpp
#include <cstdio>
int x;
float y;
int main()
{
    x = 20;
    y = 5.49;
    printf("Eu am %d ani si tu ai %f bani!\n", x, y);
    return 0;
}
```

**Afisare:**
```
Eu am 20 ani si tu ai 5.490000 bani!
```

Echivalentul in C++ ar fi `cout << "Eu am " << x << " ani si tu ai " << y << " bani!";`.

---

## Exemplu complet: suma a doua numere

```cpp
#include <cstdio>
int a, b;
int main()
{
    scanf("%d%d", &a, &b);
    printf("%d\n", a + b);
    return 0;
}
```

**Intrare:**
```
4 9
```

**Afisare:**
```
13
```

---

## Citirea si afisarea din fisiere

In C, lucrul cu fisierele se face cu `fscanf` (citire) si `fprintf` (scriere), foarte asemanatoare cu `scanf` si `printf`. In plus, trebuie sa **deschidem** fisierul cu `fopen`.

### Declararea si deschiderea unui fisier

```cpp
FILE *fin;                          // declar pointerul catre fisier
fin = fopen("date.in", "r");        // deschid fisierul pentru citire ("r" = read)
```

Pentru scriere folosim `"w"` (write):

```cpp
FILE *fout;
fout = fopen("date.out", "w");
```

---

### Exemplu complet: suma a doua numere din fisier

Fisierul `date.in` contine:
```
5 3
```

Programul:

```cpp
#include <cstdio>
FILE *fin, *fout;
int a, b;
int main()
{
    fin = fopen("date.in", "r");
    fout = fopen("date.out", "w");

    fscanf(fin, "%d%d", &a, &b);
    fprintf(fout, "%d\n", a + b);

    return 0;
}
```

Fisierul `date.out` va contine:
```
8
```

---

### Diferente pe scurt: C vs C++

| Operatie               | C (`cstdio`)                       | C++ (`iostream` / `fstream`)     |
| :--------------------- | :--------------------------------- | :------------------------------- |
| Biblioteca consola     | `#include <cstdio>`                | `#include <iostream>`            |
| Citire de la tastatura | `scanf("%d", &x);`                 | `cin >> x;`                      |
| Afisare pe ecran       | `printf("%d", x);`                 | `cout << x;`                     |
| Declarare fisier       | `FILE *fin;`                       | `ifstream fin("date.in");`       |
| Deschidere fisier      | `fin = fopen("date.in", "r");`     | (se face la declarare)           |
| Citire din fisier      | `fscanf(fin, "%d", &x);`           | `fin >> x;`                      |
| Scriere in fisier      | `fprintf(fout, "%d", x);`          | `fout << x;`                     |

> **Obs:** In acest manual vom folosi predominant stilul C++ (`cin`, `cout`, `fin`, `fout`). Stilul C este insa util de cunoscut pentru ca apare frecvent in coduri mai vechi sau in surse de pe internet.
