# Instructiunea if

Pana acum, programele noastre executau **toate** instructiunile, una dupa alta. Cu `if`, programul poate lua **decizii**: executa un bloc de cod doar daca o conditie este adevarata.

## `if` simplu

```cpp
if (conditie)
{
    // se executa DOAR daca conditia este adevarata (diferita de 0)
}
```

### Exemplu: verificare numar pozitiv

```cpp
#include <iostream>
using namespace std;

int main()
{
    int n;
    cin >> n;

    if (n > 0)
    {
        cout << "Numarul este pozitiv." << endl;
    }

    return 0;
}
```

**Rulare cu `n = 5`:**
```
5
Numarul este pozitiv.
```

**Rulare cu `n = -3`:**
```
-3

```

> **Obs:** Daca conditia e falsa, blocul din `if` se **sare** — nu se afiseaza nimic.

---

## `if-else`

Adaugam un bloc care se executa cand conditia este **falsa**:

```cpp
if (conditie)
{
    // se executa daca conditia e adevarata
}
else
{
    // se executa daca conditia e falsa
}
```

### Exemplu: par sau impar

```cpp
#include <iostream>
using namespace std;

int main()
{
    int n;
    cin >> n;

    if (n % 2 == 0)
    {
        cout << "Par" << endl;
    }
    else
    {
        cout << "Impar" << endl;
    }

    return 0;
}
```

**Rulare cu `n = 8`:**
```
8
Par
```

**Rulare cu `n = 7`:**
```
7
Impar
```

---

## `if - else if - else` (decizii multiple)

Cand avem mai mult de doua cazuri:

```cpp
if (conditie1)
{
    // cazul 1
}
else if (conditie2)
{
    // cazul 2
}
else if (conditie3)
{
    // cazul 3
}
else
{
    // niciunul din cazurile de mai sus
}
```

### Exemplu: clasificare nota

```cpp
#include <iostream>
using namespace std;

int main()
{
    int nota;
    cin >> nota;

    if (nota == 10)
    {
        cout << "Felicitari!" << endl;
    }
    else if (nota >= 5)
    {
        cout << "Promovat." << endl;
    }
    else
    {
        cout << "Nepromovat." << endl;
    }

    return 0;
}
```

**Rulare cu `nota = 10`:**
```
10
Felicitari!
```

**Rulare cu `nota = 7`:**
```
7
Promovat.
```

**Rulare cu `nota = 3`:**
```
3
Nepromovat.
```

> **Obs:** Conditiile se verifica **de sus in jos**. La primul `if`/`else if` care e adevarat, se executa blocul si se sare peste restul. De aceea `nota >= 5` nu trebuie sa verifice si `nota != 10` — daca am ajuns acolo, inseamna ca nota nu e 10.

---

## Conditii compuse

Putem combina mai multe conditii cu `&&` (SI) si `||` (SAU), asa cum am invatat in lectia de expresii.

### Exemplu: verificare interval

Se citeste un numar. Verificam daca este intre 1 si 100 (inclusiv).

```cpp
#include <iostream>
using namespace std;

int main()
{
    int n;
    cin >> n;

    if (n >= 1 && n <= 100)
    {
        cout << "Numarul este in intervalul [1, 100]." << endl;
    }
    else
    {
        cout << "Numarul NU este in intervalul [1, 100]." << endl;
    }

    return 0;
}
```

### Exemplu: an bisect

Un an este bisect daca e **divisibil cu 4 si nu e divisibil cu 100**, sau daca e **divisibil cu 400**.

```cpp
#include <iostream>
using namespace std;

int main()
{
    int an;
    cin >> an;

    if ((an % 4 == 0 && an % 100 != 0) || an % 400 == 0)
    {
        cout << "An bisect" << endl;
    }
    else
    {
        cout << "An nebisect" << endl;
    }

    return 0;
}
```

---

## Maximul din 2 numere

```cpp
#include <iostream>
using namespace std;

int main()
{
    int a, b;
    cin >> a >> b;

    int maxim;
    if (a > b)
    {
        maxim = a;
    }
    else
    {
        maxim = b;
    }

    cout << maxim << endl;

    return 0;
}
```

## Maximul din 3 numere

```cpp
#include <iostream>
using namespace std;

int main()
{
    int a, b, c;
    cin >> a >> b >> c;

    int maxim = a;
    if (b > maxim)
    {
        maxim = b;
    }
    if (c > maxim)
    {
        maxim = c;
    }

    cout << maxim << endl;

    return 0;
}
```

> **Obs:** Pornim cu `maxim = a` si apoi verificam pe rand daca `b` sau `c` sunt mai mari. Aceasta tehnica functioneaza pentru oricati candidati.

---

## Conceptul de contor

Un **contor** este o variabila care numara cate valori indeplinesc o conditie. Porneste de la `0` si creste cu `1` la fiecare valoare care respecta conditia.

### Exemplu: dintr-un numar de 5 cifre, cate sunt impare?

```cpp
#include <iostream>
using namespace std;

int main()
{
    int c1, c2, c3, c4, c5;
    cin >> c1 >> c2 >> c3 >> c4 >> c5;

    int contor = 0;

    if (c1 % 2 != 0)
    {
        contor++;
    }
    if (c2 % 2 != 0)
    {
        contor++;
    }
    if (c3 % 2 != 0)
    {
        contor++;
    }
    if (c4 % 2 != 0)
    {
        contor++;
    }
    if (c5 % 2 != 0)
    {
        contor++;
    }

    cout << contor << endl;

    return 0;
}
```

**Exemplu de rulare:**
```
1 4 7 2 9
3
```

Explicatie: din cifrele `1, 4, 7, 2, 9`, cele impare sunt `1, 7, 9` — deci 3.

> **Obs:** Observi ca se repeta acelasi tipar de 5 ori. Cand vom invata **instructiunile repetitive** (for/while), vom putea scrie acest cod mult mai scurt. Pana atunci, contorul functioneaza si asa.

---

## Capcane frecvente

### 1. `=` vs `==`

```cpp
// GRESIT — atribuie 5 lui n (intotdeauna "adevarat")
if (n = 5)

// CORECT — compara n cu 5
if (n == 5)
```

> **Obs:** `=` este **atribuire** (pune valoarea). `==` este **comparatie** (verifica egalitatea). Confuzia intre ele este cea mai comuna greseala.

### 2. Acolade lipsa

Fara acolade, `if` controleaza **doar** prima instructiune:

```cpp
if (n > 0)
    cout << "Pozitiv" << endl;
    cout << "Sigur pozitiv" << endl;    // ACEASTA SE EXECUTA MEREU!
```

Cu acolade, ambele instructiuni sunt controlate:

```cpp
if (n > 0)
{
    cout << "Pozitiv" << endl;
    cout << "Sigur pozitiv" << endl;    // doar daca n > 0
}
```

> **Obs:** Pune **intotdeauna** acolade, chiar daca ai o singura instructiune in bloc. Eviti erori greu de depistat.
