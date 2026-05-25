# Variabile si tipuri de date

O **variabila** este ca o cutie etichetata in care stocam o valoare. 
Fiecare cutie are un **nume** (eticheta) si un **tip** (ce fel de valoare poate tine).

## Tipuri de baza

| Tip | Ce stocheaza | Exemplu | Interval aproximativ |
|-----|-------------|---------|---------------------|
| `int` | Numere intregi | `7`, `-3`, `1000` | -2 miliarde ... +2 miliarde |
| `long long` | Numere intregi mari | `9000000000` | -9 * 10^18 ... +9 * 10^18 |
| `double` | Numere cu virgula | `3.14`, `-0.5` | foarte mare, cu ~15 cifre precizie |
| `char` | Un singur caracter | `'A'`, `'z'`, `'3'` | un caracter ASCII |
| `bool` | Adevarat / Fals | `1`, `0` | doar 1 (`adevarat`) sau 0 (`fals`)|

> [!IMPORTANT] Important
> In C++ folosim **punct** pentru zecimale, nu virgula: `3.14`, nu `3,14`.

> [!IMPORTANT] Important
> `char` se pune intre apostrof simplu `'A'`, pe cand textul se pune intre ghilimele duble `"Ana"`.

---

## Declarare si initializare

**Declarare** = creez cutia (spun ce tip si ce nume are).

**Initializare** = pun o valoare in cutie.

```cpp
#include <iostream>
using namespace std;
int varsta; // declarare (cutia exista, dar nu stim ce e in ea)
double inaltime = 1.75; // declarare + initializare in acelasi timp

int main()
{
    varsta = 16;           // initializare (acum are valoarea 16)
    char initiala = 'M';
    bool esteElev = true;

    cout << varsta << endl;       // 16
    cout << inaltime << endl;     // 1.75
    cout << initiala << endl;     // M
    cout << esteElev << endl;     // 1 (true se afiseaza ca 1)

    return 0;
}
```

**Output:**
```
16
1.75
M
1
```

> [!WARNING] Atentie
> O variabila declarata, dar neinitializata, contine o valoare **imprevizibila** (gunoi din memorie). Intotdeauna initializeaza variabilele inainte de a le folosi.

### Declararea mai multor variabile de acelasi tip

```cpp
int a, b, c;           // trei variabile de tip int
int x = 5, y = 10;     // doua variabile initializate
```

---

## Reguli de denumire


- Numele **nu** poate incepe cu o cifra (`9b` e gresit, `clasa9B` e corect)
- Numele **nu** poate fi un cuvant rezervat (`int`, `return`, `if` etc.)
- Conteaza daca scrii cu litere mici sau mari: `Varsta` si `varsta` sunt variabile diferite

**Exemple corecte:** `nrElevi`, `sumaCifrelor`, `x1`, `maxim`

**Exemple gresite:** `2abc`, `nr elevi` (contine spatiu), `int` (cuvant rezervat)

---

## Folosirea variabilelor in `cout`

```cpp
#include <iostream>
using namespace std;
int a, b;
int main()
{
    a = 5, b = 3;
    cout << "a = " << a << endl;
    cout << "b = " << b << endl;
    cout << "Suma: " << a + b << endl;

    return 0;
}
```

**Output:**
```
a = 5
b = 3
Suma: 8
```

---

## Type overflow (depasirea limitei)

Fiecare tip are o limita (o valoare maxima si una minima). 
Daca depasesti limita, se va memora o valoarea eronata/incorecta, dar tot intre limitele tipului

Tipul int memoreaza valori intre aproximativ plus/minus 2,1 miliarde.

```cpp
#include <iostream>
using namespace std;
int x;
int main()
{
    x = 2000000000;    // 2 miliarde — aproape de limita lui int
    cout << x << endl;     // 2000000000

    x = x + 1000000000;   // depasim limita!
    cout << x << endl;     // -1294967296  (valoare gresita, neasteptata!)

    return 0;
}
```

**Output:**
```
2000000000
-1294967296
```

> [!TIP] Sfat
> Daca lucrezi cu numere mari (peste 2 miliarde), foloseste `long long` in loc de `int`.

```cpp
long long x = 3000000000;
cout << x << endl;            // 3000000000 (corect!)
```

---

## Swap de 2 variabile

**Swap** = interschimbarea valorilor a doua variabile. Este una dintre cele mai simple si utile operatii.

### Problema

Avem `a = 5` si `b = 3`. Vrem ca la final `a = 3` si `b = 5`.

### Greseala comuna

```cpp
a = b;    // acum a = 3, dar am pierdut valoarea 5!
b = a;    // b = 3 (gresit — voiam b = 5)
```

Daca scriem `a = b` direct, **pierdem** valoarea veche a lui `a`.

### Solutia: variabila auxiliara

Folosim o a treia variabila (`aux`) ca depozit temporar:

```cpp
#include <iostream>
using namespace std;
int a, b, aux;
int main()
{
    a = 5, b = 3;

    cout << "Inainte: a = " << a << ", b = " << b << endl;

    aux = a;   // pastram valoarea lui a in aux
    a = b;         // acum a primeste valoarea lui b
    b = aux;       // b primeste valoarea veche a lui a (din aux)

    cout << "Dupa:    a = " << a << ", b = " << b << endl;

    return 0;
}
```

**Output:**
```
Inainte: a = 5, b = 3
Dupa:    a = 3, b = 5
```

> [!TIP] Sfat
> Retine tiparul: `aux = a; a = b; b = aux;` — il vei folosi des.

Pentru a face interschimbarea a 2 variabile, putem folosi si functia `swap(a, b)`.
Trebuie sa includem `#include <algorithm>` pentru a folosi functia `swap`.

```cpp
#include <algorithm> 
#include <iostream>
using namespace std;
int a, b;

int main()
{
    a = 5;
    b = 3;
    swap(a, b);

    cout << a << " " << b; // se va afisa "3 5"

    return 0;
}
```

