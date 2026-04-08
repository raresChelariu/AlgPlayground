# Operatii aritmetice

In lectia despre expresii am invatat operatorii pe hartie. Acum ii folosim in cod, cu variabile, si invatam cateva capcane importante.

## Operatori de baza

| Operator | Operatie | Exemplu | Rezultat |
|----------|----------|---------|----------|
| `+` | Adunare | `5 + 3` | `8` |
| `-` | Scadere | `10 - 4` | `6` |
| `*` | Inmultire | `3 * 7` | `21` |
| `/` | Impartire | `7 / 2` | `3` |
| `%` | Rest | `7 % 2` | `1` |

```cpp
#include <iostream>
using namespace std;

int main()
{
    int a = 17, b = 5;

    cout << a + b << endl;   // 22
    cout << a - b << endl;   // 12
    cout << a * b << endl;   // 85
    cout << a / b << endl;   // 3
    cout << a % b << endl;   // 2

    return 0;
}
```

**Output:**
```
22
12
85
3
2
```

---

## Impartirea intreaga vs impartirea reala

Aceasta este cea mai importanta capcana pentru incepatori.

### Regula

Daca **ambii** operanzi sunt `int`, rezultatul `/` este **int** (se taie zecimalele):

```cpp
cout << 7 / 2;    // 3  (nu 3.5!)
cout << 1 / 3;    // 0  (nu 0.333!)
```

Daca **cel putin un** operand este `double`, rezultatul este `double`:

```cpp
cout << 7.0 / 2;    // 3.5
cout << 7 / 2.0;    // 3.5
cout << 7.0 / 2.0;  // 3.5
```

### Cast explicit

Daca ai doua variabile `int` si vrei rezultat real, folosesti un **cast** (conversie de tip):

```cpp
#include <iostream>
using namespace std;

int main()
{
    int a = 7, b = 2;

    cout << a / b << endl;            // 3     (impartire intreaga)
    cout << (double)a / b << endl;    // 3.5   (cast pe a -> devine double)

    return 0;
}
```

**Output:**
```
3
3.5
```

> **Obs:** `(double)a` nu modifica variabila `a` — ea ramane `int`. Cast-ul creeaza o valoare temporara de tip `double` doar pentru acea operatie.

> **Obs:** Este suficient sa faci cast pe **un singur** operand. Daca unul e `double`, impartirea devine reala.

---

## Afisarea cu numar fix de zecimale

Implicit, `cout` afiseaza numere reale cum vrea el (uneori 1.5, alteori 1.50000). Pentru a controla cate zecimale se afiseaza, folosim `fixed` si `setprecision` din biblioteca `<iomanip>`.

```cpp
#include <iostream>
#include <iomanip>       // necesara pentru setprecision
using namespace std;

int main()
{
    double x = 7.0 / 3;

    cout << x << endl;                          // 2.33333 (implicit)
    cout << fixed << setprecision(2) << x << endl;  // 2.33
    cout << fixed << setprecision(4) << x << endl;  // 2.3333
    cout << fixed << setprecision(0) << x << endl;  // 2

    return 0;
}
```

**Output:**
```
2.33333
2.33
2.3333
2
```

> **Obs:** `fixed` spune ca vrem format cu punct zecimal (nu notatie stiintifica). `setprecision(n)` seteaza numarul de zecimale la `n`.

> **Obs:** Dupa ce scrii `fixed << setprecision(2)`, **toate** afisarile urmatoare cu `cout` vor folosi 2 zecimale, pana cand schimbi din nou.

### Exemplu practic: media a doua numere

```cpp
#include <iostream>
#include <iomanip>
using namespace std;

int main()
{
    int a, b;
    cin >> a >> b;
    cout << fixed << setprecision(2) << (double)(a + b) / 2 << endl;
    return 0;
}
```

**Exemplu de rulare:**
```
5 8
6.50
```

---

## Incrementare si decrementare

| Operator | Efect | Echivalent cu |
|----------|-------|---------------|
| `a++` | Creste `a` cu 1 | `a = a + 1` |
| `a--` | Scade `a` cu 1 | `a = a - 1` |

```cpp
#include <iostream>
using namespace std;

int main()
{
    int a = 5;

    a++;
    cout << a << endl;   // 6

    a++;
    cout << a << endl;   // 7

    a--;
    cout << a << endl;   // 6

    return 0;
}
```

**Output:**
```
6
7
6
```

---

## Operatori compusi

In loc sa scriem `a = a + 5`, putem scrie mai scurt `a += 5`. Functioneaza cu toti operatorii:

| Forma scurta | Echivalent cu |
|-------------|---------------|
| `a += 5` | `a = a + 5` |
| `a -= 3` | `a = a - 3` |
| `a *= 2` | `a = a * 2` |
| `a /= 4` | `a = a / 4` |
| `a %= 10` | `a = a % 10` |

```cpp
#include <iostream>
using namespace std;

int main()
{
    int a = 20;

    a += 5;
    cout << a << endl;   // 25

    a -= 10;
    cout << a << endl;   // 15

    a *= 2;
    cout << a << endl;   // 30

    a /= 3;
    cout << a << endl;   // 10

    a %= 7;
    cout << a << endl;   // 3

    return 0;
}
```

**Output:**
```
25
15
30
10
3
```

---

## Exemplu complet: aria si perimetrul unui dreptunghi

```cpp
#include <iostream>
#include <iomanip>
using namespace std;

int main()
{
    double lungime, latime;
    cin >> lungime >> latime;

    double arie = lungime * latime;
    double perimetru = 2 * (lungime + latime);

    cout << "Arie: " << fixed << setprecision(2) << arie << endl;
    cout << "Perimetru: " << fixed << setprecision(2) << perimetru << endl;

    return 0;
}
```

**Exemplu de rulare:**
```
5.5 3.2
Arie: 17.60
Perimetru: 17.40
```
