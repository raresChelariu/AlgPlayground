# Primalitate

Vrem sa decidem daca un numar natural `n` este **prim**. Pornim de la varianta cea mai simpla si o optimizam pas cu pas.

## Definitie

Un numar natural `n` este **prim** daca are **exact 2 divizori**: pe `1` si pe el insusi.

Un numar care nu este prim se numeste **compus** (sau **neprim**).

> [!NOTE] Observatie
> Denumirea de numar "compus" vine din ideea ca un numar care nu este prim este *compus* din mai multi factori primi (in descompunerea lui in factori primi).

### Cazurile speciale `0` si `1`

| `n` | Divizori | Concluzie |
|-----|----------|-----------|
| `0` | o infinitate (orice numar diferit de 0 il divide) | neprim |
| `1` | unul singur (`1`) | neprim |
| `2` | `1` si `2` | **prim** |

> [!IMPORTANT] Important
> `0` si `1` **nu** sunt prime. Orice algoritm de primalitate trebuie sa trateze separat cazul `n <= 1`, altfel raspunde gresit.

---

## De la definitie la algoritm

Reformulam definitia in ceva ce putem verifica cu o instructiune repetitiva:

- `n` este prim daca in intervalul `[1, n]` are **doar 2** divizori (cei improprii: `1` si `n`).
- Echivalent: `n` este prim daca in intervalul `[2, n-1]` are **0** divizori.
- Echivalent: `n` este prim daca **nu exista** niciun divizor in intervalul `[2, n-1]`.

Deci `n` este compus daca gasim **macar un** divizor in intervalul `[2, n-1]`.

> [!TIP] Sfat
> Aceasta este structura tipica a unei probleme de tip "verific o proprietate": pornim cu presupunerea ca proprietatea e adevarata (`estePrim = 1`) si o infirmam la prima dovada contrara.

---

## Varianta 1 — caut divizor in `[2, n-1]`

### Pentru clasa a IX-a

```cpp
#include <iostream>
using namespace std;

int n, i;
bool estePrim;

int main()
{
    cin >> n;

    if (n <= 1)
        cout << "neprim";
    else
    {
        estePrim = 1;
        for (i = 2; i <= n - 1; i++)
        {
            if (n % i == 0)
            {
                estePrim = 0;
                break;
            }
        }
        if (estePrim == 1)
            cout << "prim";
        else
            cout << "neprim";
    }
    return 0;
}
```

**Intrare:**
```
13
```
**Afisare:**
```
prim
```

**Intrare:**
```
12
```
**Afisare:**
```
neprim
```

### Pentru clasa a X-a

```cpp
bool prim(int n)
{
    int i;
    if (n <= 1)
        return 0;
    for (i = 2; i <= n - 1; i++)
    {
        if (n % i == 0)
            return 0;
    }
    return 1;
}
```

> [!NOTE] Observatie
> In functie nu mai avem nevoie de `estePrim` si nici de `break`: `return 0` iese imediat din functie in momentul in care am gasit un divizor. Daca `for`-ul se termina fara sa gaseasca vreunul, ajungem la `return 1`.

### Oprirea din `for` fara `break`

In loc de `break` putem pune conditia de oprire chiar in `for`:

```cpp
estePrim = 1;
for (i = 2; i <= n - 1 && estePrim == 1; i++)
{
    if (n % i == 0)
    {
        estePrim = 0;
    }
}
```

Cele doua variante fac acelasi lucru. Cea cu `break` e mai scurta, cea cu conditie in `for` are un singur punct de iesire.

> [!WARNING] Atentie
> Daca uitam sa oprim parcurgerea (fara `break` si fara `estePrim == 1` in conditie), programul **da acelasi raspuns**, dar parcurge inutil tot intervalul pana la `n - 1`.

> [!WARNING] Atentie
> Pentru `n = 1 000 000 000`, algoritmul face aproximativ 1 miliard de pasi cand `n` este prim — prea mult. Cautam o varianta mai rapida.

---

## Varianta 2 — merg pana la jumatate

> [!NOTE] Observatie
> `n` este compus daca gaseste un divizor in intervalul `[2, n/2]`. Nu exista divizor propriu al lui `n` mai mare decat `n/2`.

**Demonstratie:** presupunem ca exista un divizor propriu `d > n/2`. Atunci exista `x` natural cu `x * d = n`, deci `x = n / d`. Din `d > n/2` rezulta `x < 2`, adica `x = 1`. Dar `x = 1` inseamna `d = n`, ceea ce contrazice faptul ca `d` e divizor **propriu**. Contradictie.

### Pentru clasa a IX-a

```cpp
#include <iostream>
using namespace std;

int n, i, jumatate;
bool estePrim;

int main()
{
    cin >> n;

    if (n <= 1)
        cout << "neprim";
    else
    {
        estePrim = 1;
        jumatate = n / 2;
        for (i = 2; i <= jumatate; i++)
        {
            if (n % i == 0)
            {
                estePrim = 0;
                break;
            }
        }
        if (estePrim == 1)
            cout << "prim";
        else
            cout << "neprim";
    }
    return 0;
}
```

**Intrare:**
```
97
```
**Afisare:**
```
prim
```

### Pentru clasa a X-a

```cpp
bool prim(int n)
{
    int i, jumatate;
    if (n <= 1)
        return 0;
    jumatate = n / 2;
    for (i = 2; i <= jumatate; i++)
    {
        if (n % i == 0)
            return 0;
    }
    return 1;
}
```

> [!TIP] Sfat
> Calculam `jumatate = n / 2` **o singura data**, inainte de `for`. Daca am fi scris `i <= n / 2` direct in conditia lui `for`, impartirea s-ar fi facut la **fiecare** iteratie — inutil.

> [!WARNING] Atentie
> Pentru `n = 1 000 000 000`, algoritmul face aproximativ 500 de milioane de pasi — inca prea mult.

---

## Varianta 3 — merg pana la radical

> [!NOTE] Observatie
> `n` este compus daca are un divizor in intervalul `[2, sqrt(n)]`.

**Demonstratie:** daca `n` este compus, atunci `n = a * b` cu `a, b > 1`. Presupunem `a <= b`. Daca am avea `a > sqrt(n)`, atunci si `b >= a > sqrt(n)`, deci `a * b > sqrt(n) * sqrt(n) = n` — fals, pentru ca `a * b = n`. Deci `a <= sqrt(n)`.

Altfel spus: divizorii vin **in perechi** `(a, b)` cu `a * b = n`, iar unul dintre ei este mereu `<= sqrt(n)`. Daca in `[2, sqrt(n)]` nu gasesc niciun divizor, nu voi gasi nici in `[sqrt(n), n-1]`, pentru ca acolo regasesc doar perechile celor din prima jumatate.

### Trasare pentru `n = 36`

| `a` | `b = n / a` |
|-----|-------------|
| 1   | 36          |
| 2   | 18          |
| 3   | 12          |
| 4   | 9           |
| 6   | 6           |
| 9   | 4           |
| 12  | 3           |
| 18  | 2           |
| 36  | 1           |

Dupa `a = 6` (adica `sqrt(36)`), perechile incep sa se repete in oglinda.

> [!NOTE] Observatie
> In cod scriem conditia ca `i * i <= n`, nu ca `i <= sqrt(n)`. Asa evitam calculul cu radicali si erorile de rotunjire specifice tipului `double`.

### Pentru clasa a IX-a

```cpp
#include <iostream>
using namespace std;

int n, i;
bool estePrim;

int main()
{
    cin >> n;

    if (n <= 1)
        cout << "neprim";
    else
    {
        estePrim = 1;
        for (i = 2; i * i <= n; i++)
        {
            if (n % i == 0)
            {
                estePrim = 0;
                break;
            }
        }
        if (estePrim == 1)
            cout << "prim";
        else
            cout << "neprim";
    }
    return 0;
}
```

**Intrare:**
```
1000000007
```
**Afisare:**
```
prim
```

### Pentru clasa a X-a

```cpp
bool prim(int n)
{
    int i;
    if (n <= 1)
        return 0;
    for (i = 2; i * i <= n; i++)
    {
        if (n % i == 0)
            return 0;
    }
    return 1;
}
```

> [!TIP] Sfat
> Aceasta este varianta pe care o folosesti implicit la pbinfo si la BAC. Pentru `n = 1 000 000 000` face aproximativ 31 000 de pasi — instant.

---

## Varianta 4 — sar peste numerele pare

> [!NOTE] Observatie
> `2` este singurul numar prim par. Orice alt numar par este compus, pentru ca se divide cu `2`.

Daca tratam separat cazul `n` par, atunci in `for` ne raman de verificat doar divizorii **impari**, deci facem jumatate din pasi.

### Pentru clasa a IX-a

```cpp
#include <iostream>
using namespace std;

int n, i;
bool estePrim;

int main()
{
    cin >> n;

    if (n <= 1)
        cout << "neprim";
    else if (n == 2)
        cout << "prim";
    else if (n % 2 == 0)
        cout << "neprim";
    else
    {
        estePrim = 1;
        for (i = 3; i * i <= n; i += 2)
        {
            if (n % i == 0)
            {
                estePrim = 0;
                break;
            }
        }
        if (estePrim == 1)
            cout << "prim";
        else
            cout << "neprim";
    }
    return 0;
}
```

**Intrare:**
```
2
```
**Afisare:**
```
prim
```

**Intrare:**
```
91
```
**Afisare:**
```
neprim
```

### Pentru clasa a X-a

```cpp
bool prim(int n)
{
    int i;
    if (n < 2)
        return 0;
    if (n == 2)
        return 1;
    if (n % 2 == 0)
        return 0;
    // aici n este sigur impar si mai mare decat 2
    for (i = 3; i * i <= n; i += 2)
    {
        if (n % i == 0)
            return 0;
    }
    return 1;
}
```

> [!WARNING] Atentie
> Ordinea celor trei `if`-uri de la inceput conteaza. Daca am pune `if (n % 2 == 0) return 0;` **inaintea** lui `if (n == 2) return 1;`, functia ar raspunde gresit ca `2` nu e prim.

> [!WARNING] Atentie
> `for`-ul porneste de la `3`, nu de la `2`. Daca ar porni de la `2` cu pasul `2`, am verifica `2, 4, 6, ...` (numai numere pare) — complet gresit, pentru ca `n` este deja impar si nu se divide cu niciunul dintre ele.

---

## Comparatie complexitati

Numarul de pasi in cazul cel mai defavorabil (cand `n` este prim), pentru `n = 1 000 000 000`:

| Varianta                     | Pasi (aproximativ) |
|------------------------------|--------------------|
| 1. Cautare in `[2, n-1]`     | 1 000 000 000      |
| 2. Pana la jumatate          | 500 000 000        |
| 3. Pana la radical           | ~31 000            |
| 4. Radical, doar impari      | ~15 000            |

> [!TIP] Sfat
> Diferenta dintre varianta cu radical si primele doua este uriasa — de la **secunde/minute** la **instant**. Trecerea de la varianta 3 la varianta 4 doar injumatateste pasii; e utila cand testam primalitatea de foarte multe ori.

---

## Cel mai mic divizor propriu al unui numar este prim

**Intrebare:** ce putem spune despre cel mai mic divizor propriu al unui numar compus `n`?

**Raspuns:** el este mereu **prim**.

**Demonstratie:** fie `d` cel mai mic divizor propriu al lui `n` (deci `d >= 2` si `n % d == 0`). Presupunem prin absurd ca `d` este compus. Atunci `d = a * b` cu `a, b > 1`, deci `a` este divizor al lui `d` si `a < d`.

Dar `a` divide pe `d`, iar `d` divide pe `n`, deci `a` divide pe `n`. Cum `2 <= a < d < n`, inseamna ca `a` este un divizor propriu al lui `n` **mai mic** decat `d`. Contradictie cu faptul ca `d` era cel mai mic divizor propriu.

Deci presupunerea e falsa: `d` este prim.

> [!IMPORTANT] Important
> Aceasta proprietate este baza algoritmului de **descompunere in factori primi**: daca luam mereu cel mai mic divizor propriu ramas, obtinem automat factori primi, fara sa mai testam primalitatea lor.

---

## Aplicatie — numerele prime din intervalul `[2, n]`

Se citeste `n`. Sa se afiseze toate numerele prime mai mici sau egale cu `n`.

### Pentru clasa a IX-a

```cpp
#include <iostream>
using namespace std;

int n, x, d;
bool estePrim;

int main()
{
    cin >> n;

    for (x = 2; x <= n; x++)
    {
        estePrim = 1;
        for (d = 2; d * d <= x; d++)
        {
            if (x % d == 0)
            {
                estePrim = 0;
                break;
            }
        }
        if (estePrim == 1)
            cout << x << " ";
    }
    return 0;
}
```

**Intrare:**
```
30
```
**Afisare:**
```
2 3 5 7 11 13 17 19 23 29
```

### Pentru clasa a X-a

```cpp
int main()
{
    cin >> n;

    for (x = 2; x <= n; x++)
    {
        if (prim(x))
            cout << x << " ";
    }
    return 0;
}
```

> [!TIP] Sfat
> Compara cele doua variante: cu functia `prim` scrisa o singura data, `main` devine mult mai scurt si mai usor de citit. Acesta este castigul principal al functiilor — nu viteza, ci claritatea si refolosirea codului.

> [!NOTE] Observatie
> `if (prim(x))` este acelasi lucru cu `if (prim(x) == 1)`. Functia intoarce deja `true` / `false`, deci nu mai e nevoie de comparatie.
