# Pointeri

(din eng. "to point" — "a arata cu degetul")

Un **pointer** este o variabila in care memoram o adresa de memorie.

> **Obs:** Fiecare variabila are in memorie o adresa. Obtinerea adresei unei variabile se numeste **referentiere**. Obtinerea valorii de la o adresa se numeste **dereferentiere**.

Pe scurt:
- `&` — iau adresa (referentiere)
- `*` — iau valoarea (dereferentiere)

---

## Operatorul de referentiere (&)

**Sintaxa:** `&variabila`

**Efect:** se obtine adresa acelei variabile.

```cpp
int x;
cout << &x; // afiseaza (de exemplu) 0x2712bff93c
```

> **Obs:** Adresele sunt numere scrise in baza 16 (hexazecimal), de aceea incep cu `0x`. De exemplu, `0x10` este numarul 16. Fiecare byte din memorie are o pozitie unica; adresa este numarul acelei pozitii.

---

## Declararea unui pointer

**Sintaxa:**

```cpp
tip* numePointer;
// SAU
tip *numePointer;
// SAU
tip * numePointer;
```

Daca declaram, de exemplu, `int* p`, spunem ca `p` este un **int pointer** (sau **pointer la int**). Tipul lui `p` este `int*`.

> **Obs:** Pt `int *a, b, c;` se declara `a` ca int pointer, `b` si `c` ca int-uri obisnuite. Daca vrem ca toti trei sa fie int pointer scriem `int *a, *b, *c;`.

Un pointer poate memora **doar adrese ale unor variabile de acelasi tip**:

```cpp
int *p;
float x;
p = &x; // EROARE: nu pot atribui unui int* un float*
```

```cpp
long long *k;
int x;
k = &x; // EROARE: nu pot atribui unui long long* un int*
```

---

## Operatorul de dereferentiere (*)

**Sintaxa:** `*pointer`

**Efect:** se obtine zona de memorie de la adresa pointerului (valoarea de acolo).

```cpp
int x = 5;
int *p = &x;
cout << *p; // afiseaza 5

*p = 10;    // modifica valoarea lui x prin pointer
cout << x;  // afiseaza 10
```

> **Obs:** `*p` si `x` refera aceeasi zona de memorie. Orice scriere prin `*p` schimba `x` si invers.

---

## Operatii cu pointeri

Sunt permise doar adunarea si scaderea cu un numar intreg:

**Permise:**
- `pointer + numar`
- `pointer - numar`
- `numar + pointer` (corect, dar neobisnuit)

**Nepermise:**
- `pointer + pointer`
- `pointer * numar`
- `pointer / numar`
- `pointer % numar`

> **Obs:** `pointer + 1` nu adauga 1 la adresa numerica, ci avanseaza cu `sizeof(tip)` bytes — exact cat ocupa un element de acel tip in memorie.

---

## Pointeri si tablouri

Numele unui tablou este un pointer constant catre primul element.

```cpp
int v[5] = {10, 20, 30, 40, 50};

// se afiseaza 3 adrese identice — notatii echivalente
cout << v << " " << &v[0] << " " << v + 0;
```

Relatia dintre indexare si pointeri:

```cpp
v[i] == *(v + i) == *(i + v) == i[v]  // toate sunt echivalente
```

> **Obs:** `i[v]` este corect sintactic, dar nu il folosim — este confuz de citit.

---

## Valoarea NULL

Un pointer declarat global este initializat automat cu valoarea `NULL` (adresa `0x0`). Sistemul de operare nu aloca niciodata memorie la adresa 0, deci un pointer `NULL` nu pointeaza spre nimic valid.

Initializarea explicita cu `NULL`:

```cpp
int *p;
p = 0;       // variante echivalente
p = NULL;
p = nullptr;
```

> **Obs:** `NULL` si `nullptr` sunt aliasuri pentru `0`. La liceu, cel mai des folosim `NULL` sau `0`.

---

## Probleme rezolvate

### Problema 1: Swap prin pointeri

**Enunt:** Se citesc doua numere intregi `a` si `b`. Sa se interschimbe valorile lor folosind pointeri si sa se afiseze rezultatul.

**Solutie:**

```cpp
#include <iostream>
using namespace std;

int a, b;

void swapPointeri(int *x, int *y)
{
    int aux = *x;
    *x = *y;
    *y = aux;
}

int main()
{
    cin >> a >> b;
    swapPointeri(&a, &b);
    cout << a << " " << b << endl;
    return 0;
}
```

**Intrare:**
```
3 7
```

**Afisare:**
```
7 3
```

> **Obs:** Functia primeste **adresele** lui `a` si `b`, nu copii ale valorilor. Prin `*x` si `*y` modificam direct variabilele originale din `main`.

### Problema 2: Suma elementelor unui tablou prin pointeri

**Enunt:** Se citeste `n`, apoi `n` numere intregi. Sa se afiseze suma lor parcurgand tabloul cu un pointer.

**Solutie:**

```cpp
#include <iostream>
using namespace std;

int n, i, v[100];
long long suma;

int main()
{
    cin >> n;
    for (i = 1; i <= n; i++)
    {
        cin >> v[i];
    }

    int *p;
    suma = 0;
    for (p = v + 1; p <= v + n; p++)
    {
        suma += *p;
    }

    cout << suma << endl;
    return 0;
}
```

**Intrare:**
```
5
10 20 30 40 50
```

**Afisare:**
```
150
```

> **Obs:** `p = v + 1` seteaza pointerul pe primul element (indexare de la 1). La fiecare pas `p++` avanseaza pointerul cu `sizeof(int)` bytes, adica exact la urmatorul element din tablou. Conditia `p <= v + n` opreste parcurgerea dupa ultimul element.

### Problema 3: Min si max prin pointeri

**Enunt:** Se citeste `n` si `n` numere intregi. Sa se scrie o functie care calculeaza **simultan** minimul si maximul tabloului, intorcandu-le prin pointeri. In `main` se afiseaza minimul si maximul.

**Solutie:**

```cpp
#include <iostream>
using namespace std;

int n, i, v[100];
int mn, mx;

void minMax(int v[], int n, int *mn, int *mx)
{
    *mn = v[1];
    *mx = v[1];
    for (int j = 2; j <= n; j++)
    {
        if (v[j] < *mn) *mn = v[j];
        if (v[j] > *mx) *mx = v[j];
    }
}

int main()
{
    cin >> n;
    for (i = 1; i <= n; i++)
    {
        cin >> v[i];
    }

    minMax(v, n, &mn, &mx);
    cout << mn << " " << mx << endl;
    return 0;
}
```

**Intrare:**
```
5
4 1 7 3 5
```

**Afisare:**
```
1 7
```

> **Obs:** O functie poate returna cu `return` doar **o singura** valoare. Daca avem nevoie de mai multe rezultate (aici: `mn` si `mx`), le trimitem prin pointeri — functia scrie direct in zona de memorie a apelantului.

### Problema 4: Inversarea unui tablou cu 2 pointeri

**Enunt:** Se citeste `n` si `n` numere intregi. Sa se inverseze tabloul pe loc (fara tablou auxiliar) folosind doi pointeri — unul la inceput, unul la sfarsit — care se apropie pana se intalnesc.

**Solutie:**

```cpp
#include <iostream>
#include <algorithm>
using namespace std;

int n, i, v[100];

int main()
{
    cin >> n;
    for (i = 1; i <= n; i++)
    {
        cin >> v[i];
    }

    int *st = v + 1;     // pointer pe primul element
    int *dr = v + n;     // pointer pe ultimul element
    while (st < dr)
    {
        swap(*st, *dr);
        st++;
        dr--;
    }

    for (i = 1; i <= n; i++)
    {
        cout << v[i] << " ";
    }
    cout << endl;
    return 0;
}
```

**Intrare:**
```
5
10 20 30 40 50
```

**Afisare:**
```
50 40 30 20 10
```

> **Obs:** Comparatia `st < dr` functioneaza cu pointeri la fel ca la numere — compara adresele. Cand `st >= dr`, cei doi s-au intalnit la mijloc si inversarea este gata.

### Problema 5: Cautare liniara care returneaza pointer

**Enunt:** Se citeste `n`, `n` numere intregi si o valoare `x`. Sa se scrie o functie care returneaza **pointer** spre prima aparitie a lui `x` in tablou, sau `nullptr` daca `x` nu apare. In `main` se afiseaza pozitia (indicele de la 1) sau `-1` daca `x` nu exista.

**Solutie:**

```cpp
#include <iostream>
using namespace std;

int n, i, x, v[100];
int *p;

int* cauta(int v[], int n, int x)
{
    int j;
    for (j = 1; j <= n; j++)
    {
        if (v[j] == x)
        {
            return v + j;      // adresa elementului gasit
        }
    }
    return NULL;            // nu s-a gasit
}

int main()
{
    cin >> n;
    for (i = 1; i <= n; i++)
    {
        cin >> v[i];
    }
    cin >> x;

    p = cauta(v, n, x);
    if (p == NULL)
    {
        cout << -1 << endl;
    }
    else
    {
        cout << p - v << endl;   
        // diferenta de pointeri <=> indicele
    }
    return 0;
}
```

**Intrare:**
```
5
10 20 30 40 50
30
```

**Afisare:**
```
3
```

> **Obs:** Daca scadem doi pointeri care pointeaza in acelasi tablou, obtinem **numarul de elemente dintre ei**. Aici `p - v` ne da indicele pozitiei lui `x` (1 pentru primul element, fiindca in tablou indexam de la 1). 

> **Obs**: Calculatorul niciodata nu va folosi byte-ul de la adresa `0` (adresa `NULL`).

> **Obs**: `NULL` este folosit de programatori pentru a indica lipsa, absenta. 
