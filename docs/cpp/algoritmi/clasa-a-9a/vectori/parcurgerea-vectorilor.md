# Parcurgerea vectorilor

In lectia anterioara am vazut cum se declara un vector si cum accesam un element prin `v[indice]`. Acum vrem sa lucram cu **toate** elementele unui vector, nu doar cu cele pe pozitii fixate. Pentru asta folosim o bucla `for`.

---

## Indexarea de la 1

Pana acum am vazut ca pozitiile dintr-un vector pornesc de la `0`. Acesta este modul "tehnic" in care C++ numeroteaza elementele.

In practica, la pbinfo si la BAC, enunturile vorbesc despre **primul** numar, **al doilea** numar, **al n-lea** numar. Este mai natural sa potrivim pozitia din vector cu pozitia din enunt:

- elementul de pe pozitia `1` = primul numar citit
- elementul de pe pozitia `2` = al doilea numar citit
- elementul de pe pozitia `n` = al n-lea numar citit

Pentru a folosi indexarea de la `1`, declaram vectorul cu o pozitie in plus si **ignoram pozitia `0`**:

```cpp
int v[101];
// declaram un vector cu 101 pozitii: v[0], v[1], ..., v[100]
// vom folosi doar pozitiile v[1], v[2], ..., v[100]
// pozitia v[0] ramane nefolosita
```

> **Obs:** indexarea de la `1` este conventia pe care o vom folosi de aici inainte in toate lectiile despre vectori. Este recomandata pentru ca face codul mai usor de citit si de potrivit cu enuntul problemei.

---

## Citirea a n elemente

Cand nu stim de la inceput cate numere vom citi, citim mai intai `n` (cate numere sunt), apoi parcurgem pozitiile `1`, `2`, ..., `n` cu o bucla `for` si citim cate o valoare in fiecare pozitie.

```cpp
#include <iostream>
using namespace std;
int v[101], n, i;

int main()
{
    cin >> n;
    for (i = 1; i <= n; i++)
    {
        cin >> v[i];
    }
    return 0;
}
```

**Intrare:**

```
5
8 3 12 5 1
```

Dupa executia buclei, vectorul are:

| Pozitia (`i`) | `v[1]` | `v[2]` | `v[3]` | `v[4]` | `v[5]` |
| ------------- | ------ | ------ | ------ | ------ | ------ |
| Valoarea      | 8      | 3      | 12     | 5      | 1      |

> **Obs:** dimensiunea declarata a vectorului (`v[101]`) trebuie sa fie strict mai mare decat `n`. Daca enuntul spune ca `n` poate ajunge pana la `100`, declaram cu `101` pentru a avea loc si pentru `v[n]`.

---

## Afisarea a n elemente

Pentru a afisa toate elementele, parcurgem pozitiile in aceeasi ordine ca la citire si afisam fiecare valoare.

```cpp
#include <iostream>
using namespace std;
int v[101], n, i;

int main()
{
    cin >> n;
    for (i = 1; i <= n; i++)
    {
        cin >> v[i];
    }
    for (i = 1; i <= n; i++)
    {
        cout << v[i] << " ";
    }
    return 0;
}
```

**Intrare:**

```
5
8 3 12 5 1
```

**Afisare:**

```
8 3 12 5 1
```

---

## Parcurgere de la inceput la final

Cele doua bucle de mai sus (citire si afisare) sunt **parcurgeri** ale vectorului: trecem prin fiecare pozitie, de la `1` la `n`, si facem ceva cu elementul curent. Aceasta este parcurgerea de la **inceput la final**, cea mai frecvent intalnita.

Sablonul general:

```cpp
for (i = 1; i <= n; i++)
{
    // foloseste v[i]
}
```

---

## Parcurgere de la final la inceput

Uneori avem nevoie sa parcurgem vectorul **invers**: de la `v[n]` catre `v[1]`. Pentru asta, schimbam bucla `for` astfel incat `i` sa porneasca de la `n` si sa scada pana la `1`.

```cpp
for (i = n; i >= 1; i--)
{
    // foloseste v[i]
}
```

**Exemplu:** sa se afiseze elementele in ordine inversa fata de cea citita.

```cpp
#include <iostream>
using namespace std;
int v[101], n, i;

int main()
{
    cin >> n;
    for (i = 1; i <= n; i++)
    {
        cin >> v[i];
    }
    for (i = n; i >= 1; i--)
    {
        cout << v[i] << " ";
    }
    return 0;
}
```

**Intrare:**

```
5
8 3 12 5 1
```

**Afisare:**

```
1 5 12 3 8
```

---

## Suma elementelor

Folosim o variabila `s` in care **acumulam** suma. Pornim cu `s = 0` si la fiecare pas adunam valoarea curenta `v[i]`.

```cpp
#include <iostream>
using namespace std;
int v[101], n, i, s;

int main()
{
    cin >> n;
    for (i = 1; i <= n; i++)
    {
        cin >> v[i];
    }
    s = 0;
    for (i = 1; i <= n; i++)
    {
        s = s + v[i];
    }
    cout << s;
    return 0;
}
```

**Intrare:**

```
5
8 3 12 5 1
```

**Afisare:**

```
29
```

Pas cu pas, valoarea lui `s`:

| Pasul (`i`) | `v[i]` | `s` dupa pas |
| ----------- | ------ | ------------ |
| 1           | 8      | 8            |
| 2           | 3      | 11           |
| 3           | 12     | 23           |
| 4           | 5      | 28           |
| 5           | 1      | 29           |

---

## Numararea elementelor care respecta o conditie

Folosim un contor `nr`, pornit de la `0`, si la fiecare pas verificam daca `v[i]` respecta conditia. Daca da, marim contorul cu `1`.

**Exemplu:** sa se numere cate elemente pare are vectorul.

```cpp
#include <iostream>
using namespace std;
int v[101], n, i, nr;

int main()
{
    cin >> n;
    for (i = 1; i <= n; i++)
    {
        cin >> v[i];
    }
    nr = 0;
    for (i = 1; i <= n; i++)
    {
        if (v[i] % 2 == 0)
        {
            nr++;
        }
    }
    cout << nr;
    return 0;
}
```

**Intrare:**

```
5
8 3 12 5 1
```

**Afisare:**

```
2
```

> **Obs:** elementele pare din vector sunt `8` si `12`, deci `nr = 2`.

---

## Primul element care respecta o conditie

Cand cautam **primul** element care respecta o conditie, parcurgem vectorul de la `1` la `n` si **ne oprim** imediat ce am gasit unul. Oprirea o facem cu `break`.

Retinem si **pozitia** la care l-am gasit intr-o variabila `poz`. O initializam cu `0` (valoare ce nu poate fi o pozitie reala, intrucat pozitiile pornesc de la `1`) pentru a putea distinge cazul "nu am gasit niciun element".

**Exemplu:** sa se afiseze primul element par din vector si pozitia lui.

```cpp
#include <iostream>
using namespace std;
int v[101], n, i, poz;

int main()
{
    cin >> n;
    for (i = 1; i <= n; i++)
    {
        cin >> v[i];
    }
    poz = 0;
    for (i = 1; i <= n; i++)
    {
        if (v[i] % 2 == 0)
        {
            poz = i;
            break;
        }
    }
    if (poz != 0)
    {
        cout << "Primul element par este " << v[poz] << " pe pozitia " << poz;
    }
    else
    {
        cout << "Nu exista elemente pare";
    }
    return 0;
}
```

**Intrare:**

```
5
8 3 12 5 1
```

**Afisare:**

```
Primul element par este 8 pe pozitia 1
```

> **Obs:** fara `break`, bucla ar continua sa parcurga vectorul pana la final si `poz` ar fi suprascris de fiecare data. La final am obtine **ultimul** element par, nu primul.

---

## Ultimul element care respecta o conditie

Pentru **ultimul** element care respecta o conditie, parcurgem vectorul **invers**, de la `n` la `1`, si ne oprim la prima potrivire cu `break`. Primul element gasit la parcurgere inversa este chiar ultimul din vector.

**Exemplu:** sa se afiseze ultimul element par din vector si pozitia lui.

```cpp
#include <iostream>
using namespace std;
int v[101], n, i, poz;

int main()
{
    cin >> n;
    for (i = 1; i <= n; i++)
    {
        cin >> v[i];
    }
    poz = 0;
    for (i = n; i >= 1; i--)
    {
        if (v[i] % 2 == 0)
        {
            poz = i;
            break;
        }
    }
    if (poz != 0)
    {
        cout << "Ultimul element par este " << v[poz] << " pe pozitia " << poz;
    }
    else
    {
        cout << "Nu exista elemente pare";
    }
    return 0;
}
```

**Intrare:**

```
5
8 3 12 5 1
```

**Afisare:**

```
Ultimul element par este 12 pe pozitia 3
```
