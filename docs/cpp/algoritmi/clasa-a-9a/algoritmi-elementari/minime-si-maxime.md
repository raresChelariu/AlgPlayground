# Minime si maxime

Ideea de baza: retinem maximul (sau minimul) intr-o variabila si o actualizam la fiecare nou numar citit.

---

## Aflarea maximului si minimului

### Metoda 1 — initializare cu primul element

Citim primul numar si il consideram maximul. Apoi parcurgem restul numerelor si actualizam maximul daca gasim un numar mai mare.

```cpp
#include <iostream>
using namespace std;

int n, i, x, maxim;

int main()
{
    cin >> n;
    cin >> x;
    maxim = x;
    for (i = 2; i <= n; i++)
    {
        cin >> x;
        if (x > maxim)
        {
            maxim = x;
        }
    }
    cout << maxim;
    return 0;
}
```

**Rulare cu:**
```
5
3 7 1 9 4
```
**Afisare:**
```
9
```

> **Obs:** Pornim bucla de la `i = 2` deoarece primul element l-am citit deja inainte de bucla.

---

### Metoda 2 — initializare cu o valoare din afara intervalului

Folosim aceasta metoda cand stim intervalul valorilor. De exemplu, daca problema spune **"numere naturale mai mici ca 10000"**, valorile sunt in intervalul `[0, 9999]`.

Initializam variabila cu o valoare din **afara** acestui interval:
- pentru **maxim**: initializam cu `-1` (mai mic decat orice valoare posibila)
- pentru **minim**: initializam cu `10000` (mai mare decat orice valoare posibila)

Astfel, dupa prima comparatie din bucla, primul numar citit devine automat maximul sau minimul.

**Exemplu pentru maxim** (initializare cu `-1`):

```cpp
#include <iostream>
using namespace std;

int n, i, x, maxim;

int main()
{
    cin >> n;
    maxim = -1; // mai mic decat orice numar natural < 10000
    for (i = 1; i <= n; i++)
    {
        cin >> x;
        if (x > maxim)
        {
            maxim = x;
        }
    }
    cout << maxim;
    return 0;
}
```

**Rulare cu:**
```
5
3 7 1 9 4
```
**Afisare:**
```
9
```

**Exemplu pentru minim** (initializare cu `10000`):

```cpp
#include <iostream>
using namespace std;

int n, i, x, minim;

int main()
{
    cin >> n;
    minim = 10000; // mai mare decat orice numar natural < 10000
    for (i = 1; i <= n; i++)
    {
        cin >> x;
        if (x < minim)
        {
            minim = x;
        }
    }
    cout << minim;
    return 0;
}
```

**Rulare cu:**
```
5
3 7 1 9 4
```
**Afisare:**
```
1
```

> **Obs:** La prima iteratie, `x` este `3`. Deoarece `3 < 10000`, conditia este adevarata si `minim` devine `3`. La fel si pentru maxim: la prima iteratie, `3 > -1`, deci `maxim` devine `3`. Primul element devine automat minim/maxim.

---

## Exemple

### Minimul si numarul de aparitii

- Folosim doua variabile — `minim` si `aparitii`
- Cand gasim un numar mai mic decat minimul curent
  - actualizam minimul 
  - si resetam contorul la 1
  - pentru ca e `prima data` cand gasim un numar atat de mic
- Cand gasim un numar egal cu minimul
  - crestem contorul cu 1
  - pentru ca am mai gasit `inca 1 data` cea mai mica valoare

```cpp
#include <iostream>
using namespace std;

int n, i, x, minim, aparitii;

int main()
{
    cin >> n;
    cin >> x;
    minim = x;
    aparitii = 1;
    for (i = 2; i <= n; i++)
    {
        cin >> x;
        if (x < minim)
        {
            minim = x;
            aparitii = 1;
        }
        else if (x == minim)
        {
            aparitii++;
        }
    }
    cout << "Minimul este " << minim << " si apare de " << aparitii << " ori";
    return 0;
}
```

**Rulare cu:**
```
6
4 2 7 2 5 2
```
**Afisare:**
```
Minimul este 2 si apare de 3 ori
```

> **Obs:** Contorul se reseteaza la `1` (nu la `0`) cand gasim un nou minim, deoarece noul minim apare cel putin o data — chiar acum.

---

### Pozitia minimului

- Pe langa valoarea minimului, retinem si pozitia la care apare 
- in exemplu, numerotarea e de la 1

```cpp
#include <iostream>
using namespace std;

int n, i, x, minim, pozMin;

int main()
{
    cin >> n;
    cin >> x;
    minim = x;
    pozMin = 1;
    for (i = 2; i <= n; i++)
    {
        cin >> x;
        if (x < minim)
        {
            minim = x;
            pozMin = i;
        }
    }
    cout << pozMin;
    return 0;
}
```

**Rulare cu:**
```
5
3 7 1 9 4
```
**Afisare:**
```
3
```

Explicatie: minimul este `1` si se afla pe pozitia `3` in sir.

> **Obs:** Daca minimul apare de mai multe ori, `pozMin` retine pozitia **primei** aparitii, deoarece conditia `x < minim` nu se indeplineste pentru valori egale.

---

### Perechea cu produs maxim

Se citesc `n` perechi de numere. Sa se afiseze perechea al carei produs este maxim.

Retinem doar perechea castigatoare `(perA, perB)` si produsul ei. La fiecare noua pereche, daca produsul este mai mare, actualizam perechea retinuta.

```cpp
#include <iostream>
using namespace std;

int n, i, a, b, maxProd, perA, perB;

int main()
{
    cin >> n;
    cin >> a >> b;
    maxProd = a * b;
    perA = a;
    perB = b;
    for (i = 2; i <= n; i++)
    {
        cin >> a >> b;
        if (a * b > maxProd)
        {
            maxProd = a * b;
            perA = a;
            perB = b;
        }
    }
    cout << perA << " " << perB;
    return 0;
}
```

**Rulare cu:**
```
4
2 3
5 1
4 4
2 7
```
**Afisare:**
```
4 4
```

Explicatie: produsele sunt `6, 5, 16, 14`. Cel mai mare este `16`, obtinut din perechea `4 4`.

> **Obs:** Afisam perechea `(perA, perB)`, nu produsul `maxProd`. Produsul il folosim doar intern, ca sa comparam perechile intre ele.

---

### Cele mai mari 2 numere

E ca la o cursa de masini:
- `loc1` = masina de pe primul loc
- `loc2` = masina de pe locul 2

Cand apare o masina noua `x`:
- Daca `x` il intrece pe cel de pe primul loc: cel de pe primul loc coboara pe locul 2, `x` urca pe primul loc.
- Daca `x` nu il intrece pe al doilea: `x` preia locul 2.

```cpp
#include <iostream>
using namespace std;

int n, i, x, loc1, loc2;

int main()
{
    cin >> n;
    loc1 = 0; // valorile sunt >= 1
    loc2 = 0;
    for (i = 1; i <= n; i++)
    {
        cin >> x;
        if (x > loc1)
        {
            loc2 = loc1;
            loc1 = x;
        }
        else if (x > loc2)
        {
            loc2 = x;
        }
    }
    cout << loc1 << " " << loc2;
    return 0;
}
```

**Rulare cu:**
```
6
3 7 1 9 4 6
```
**Afisare:**
```
9 7
```

Traseul algoritmului pas cu pas:

| i | x | loc1 | loc2 | Ce s-a intamplat |
|---|---|------|------|-------------------|
| 1 | 3 | 3    | 0    | 3 > 0, urca pe loc1 |
| 2 | 7 | 7    | 3    | 7 > 3, loc1 devine 7, vechiul loc1 (3) coboara |
| 3 | 1 | 7    | 3    | 1 nu bate pe nimeni |
| 4 | 9 | 9    | 7    | 9 > 7, loc1 devine 9, vechiul loc1 (7) coboara |
| 5 | 4 | 9    | 7    | 4 nu bate pe nimeni |
| 6 | 6 | 9    | 7    | 6 nu bate pe nimeni |

> **Obs:** Daca exista doua numere egale cu maximul (ex: `5 5 3`), ambele locuri vor fi `5` — corect, deoarece la al doilea `5`, conditia `x > loc2` (adica `5 > 3`) este adevarata.
