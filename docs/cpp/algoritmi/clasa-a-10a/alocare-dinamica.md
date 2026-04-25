# Alocare dinamica

Pana acum, toate variabilele si vectorii au fost alocati **pe stiva** (stack) — o zona de memorie cu dimensiune limitata, rezervata la pornirea programului. **Alocarea dinamica** inseamna sa cerem memorie in timpul executiei, intr-o zona separata numita **heap**, controlata de noi.

---

## Stiva vs Heap

**Stiva (Stack):**
- Zona de memorie de dimensiune mica (~1–8 MB)
- Variabilele locale si parametrii functiilor se aloca automat aici
- Dimensiunea vectorilor trebuie sa fie o constanta cunoscuta la compilare

**Heap:**
- Zona de memorie mult mai mare (zeci sau sute de MB)
- Memoria se cere explicit cu operatorul `new`
- Dimensiunea poate fi calculata la executie (dupa ce citim `n`)

Pe pbinfo, la fiecare problema sunt afisate doua limite: **Memorie totala** si **Memorie Stiva**. Un vector alocat cu `new` consuma din **Memorie totala**, nu din **Memorie Stiva** — util cand limita de stiva este mica dar limita totala este generoasa.

---

## Operatorul `new`

**Sintaxa — o singura variabila:**

```cpp
tip* p = new tip;
tip* p = new tip(valoare_initiala);
```

**Sintaxa — tablou:**

```cpp
tip* p = new tip[n];
```

`new` aloca memoria necesara pe heap si returneaza un **pointer** catre zona alocata.

**Exemple:**

```cpp
int* p = new int;        // aloca un int pe heap
*p = 42;
cout << *p;              // 42

int n = 100;
int* v = new int[n];     // aloca un tablou de n int-uri pe heap
v[1] = 10;               // acces ca la orice tablou
v[2] = 20;
```

> **Obs:** Dupa `int* v = new int[n]`, `v` se comporta exact ca un tablou obisnuit — putem folosi `v[i]`, `v + i`, `*(v + i)` etc. Diferenta fata de `int v[100]` este ca `n` poate fi citit de la tastatura, nu trebuie sa fie constanta.

---

## Operatorul `delete`

Memoria alocata cu `new` **nu se elibereaza automat**. Trebuie eliberata cu `delete`:

```cpp
delete p;      // pentru o singura variabila
delete[] v;    // pentru tablou alocat cu new tip[n]
```

> **Obs:** La problemele de concurs (pbinfo, BAC), memoria se elibereaza oricum la incheierea programului de catre sistemul de operare. De aceea, in solutiile de concurs, `delete` este deseori omis.

---

## Operatorul `->` (arrow)

Cand avem un **pointer la struct**, putem accesa campurile in doua moduri echivalente:

```cpp
(*p).camp   // dereferentiere, apoi acces la camp
p->camp     // notatie prescurtata — preferata
```

Parantezele din `(*p).camp` sunt **obligatorii**. Operatorul `.` are prioritate mai mare decat `*`, deci fara paranteze expresia se interpreteaza altfel:

```cpp
*p.camp     // EROARE: se interpreteaza ca *(p.camp)
            // adica: acceseaza campul 'camp' al pointerului p (p nu e struct!)
            //        apoi dereferentiaza rezultatul — eroare de compilare
```

**Exemplu:**

```cpp
struct Punct {
    int x, y;
};

Punct* p = new Punct;
p->x = 3;
p->y = 4;
cout << p->x << " " << p->y;   // 3 4
```

> **Obs:** `p->camp` este exact echivalent cu `(*p).camp`. Vom folosi intens operatorul `->` in lectia despre liste inlantuite, unde fiecare nod al listei este alocat dinamic cu `new`.

---

## Probleme rezolvate

### Problema 1: Tablou alocat dinamic

**Enunt:** Se citeste `n`, apoi `n` numere intregi. Sa se calculeze si sa se afiseze suma lor, folosind un tablou alocat dinamic pe heap.

**Solutie:**

```cpp
#include <iostream>
using namespace std;

int n, i;
long long suma;

int main()
{
    cin >> n;
    int* v = new int[n + 1];   // indexare de la 1: alocam n + 1 elemente

    for (i = 1; i <= n; i++)
    {
        cin >> v[i];
    }

    suma = 0;
    for (i = 1; i <= n; i++)
    {
        suma += v[i];
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

> **Obs:** `new int[n + 1]` aloca `n + 1` elemente ca sa putem indexa de la 1 (pozitia `0` ramane neutilizata). Spre deosebire de `int v[100]`, `n` este citit de la tastatura si poate fi orice valoare.

### Problema 2: Struct alocat dinamic cu operatorul `->`

**Enunt:** Se citeste un elev (nume, clasa, medie). Sa se aloce dinamic o variabila de tip `Elev`, sa se completeze campurile si sa se afiseze.

**Solutie:**

```cpp
#include <iostream>
using namespace std;

struct Elev {
    char nume[40];
    int clasa;
    float medie;
};

int main()
{
    Elev* e = new Elev;
    cin >> e->nume >> e->clasa >> e->medie;
    cout << e->nume << " " << e->clasa << " " << e->medie << endl;
    return 0;
}
```

**Intrare:**
```
Ion 10 9.50
```

**Afisare:**
```
Ion 10 9.5
```

> **Obs:** `e->nume` este echivalent cu `(*e).nume`. Folosim `->` de fiecare data cand `e` este un pointer la struct si vrem sa accesam un camp al sau.
