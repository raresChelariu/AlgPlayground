# Secvente

O **secventa** este un grup de elemente consecutive dintr-un sir care indeplinesc o proprietate P.

> [!NOTE] Observatie
> O secventa poate fi si de lungime 1 (un singur element).

---

## Terminologie

Fie sirul `2 3 7 8 6 4 6 5 8 8 9 4 4 4 4`.
Sa consideram ca ne intereseaza secventele de numere pare.
Deci P = numar par.

Secventele valide sunt : 
- 2 
- 8 6 si 8 6 4 6
- 8 8
- 4 4
- 4 4 4 4

**Secventa maximala** — o secventa care nu se poate extinde. Daca am adauga un element la stanga sau la dreapta, proprietatea nu ar mai fi indeplinita.

Secventele maximale sunt (de la stanga la dreapta):
- 2
- 8 6 4 6
- 8 8
- 4 4 4 4

**Secventa maxima** (de lungime maxima) — cea mai lunga secventa valida din sir.

Secventele maxime (de lungime maxima) sunt:

- 8 6 4 6
- 4 4 4 4

> [!NOTE] Observatie
> Orice secventa maxima este si maximala, dar NU si invers. In exemplul de mai sus, `8 8` este maximala (nu se poate extinde — e inconjurata de `5` si `9`, ambii impari), dar NU este maxima: `4 4 4 4` are lungimea 4, mai mare decat 2.

---

## Algoritmul

Folosim doua variabile:
- `lg` — lungimea secventei curente (numaram exemplele consecutive)
- `lgMax` — cea mai mare lungime gasita pana acum

Pentru fiecare element citit:
- daca indeplineste P (**exemplu**): `lg++`
- daca nu indeplineste P (**contraexemplu**): 
  - actualizam `lgMax` daca `lg` e mai mare,
  - apoi `lg = 0`

La fiecare contraexemplu :
- se termina o secventa maximala 
- si o memoram daca e cea mai lunga de pana acum.

---

## Exemplu 1 — cea mai lunga secventa de numere pare

```cpp
#include <iostream>
using namespace std;

int n, i, x, lg, lgMax;

int main()
{
    cin >> n;
    for (i = 1; i <= n; i++)
    {
        cin >> x;
        if (x % 2 == 0)
        {
            lg++;
        }
        else
        {
            if (lg > lgMax)
                lgMax = lg;
            lg = 0;
        }
    }
    if (lg > lgMax)
        lgMax = lg;
    cout << lgMax;
    return 0;
}
```

**Intrare:**
```
8
1 4 6 3 8 2 2 4
```

**Afisare:**
```
4
```

Traseul algoritmului:

| i | x | lg | lgMax | Observatie |
|---|---|----|-------|------------|
| 1 | 1 | 0  | 0     | contraexemplu, `lg = 0` |
| 2 | 4 | 1  | 0     | exemplu |
| 3 | 6 | 2  | 0     | exemplu |
| 4 | 3 | 0  | 2     | contraexemplu, `lgMax = 2`, `lg = 0` |
| 5 | 8 | 1  | 2     | exemplu |
| 6 | 2 | 2  | 2     | exemplu |
| 7 | 2 | 3  | 2     | exemplu |
| 8 | 4 | 4  | 2     | exemplu |

Dupa `for`: `lg = 4 > lgMax = 2`, deci `lgMax = 4`.

> [!IMPORTANT] Important
> Secventa `8 2 2 4` se afla la finalul sirului si nu are dupa ea niciun contraexemplu care sa o "inchida". Fara verificarea `if (lg > lgMax) lgMax = lg;` de dupa `for`, programul ar afisa `2` in loc de `4`.

---

## Exemplu 2 — cea mai lunga secventa strict crescatoare

- Proprietatea P este acum "elementul curent este mai mare decat cel dinainte". 
- Avem nevoie de o variabila in plus — `prec` — care retine elementul precedent.
  - Citim primul element inainte de `for` 
  - si il folosim ca punct de pornire: `lg = 1`, `lgMax = 1`, `prec = x`.
- Atunci cand intampinam un contraexemplu (elementul curent nu e mai mare decat precedentul):
  - **contraexemplul insusi incepe o noua secventa**
  - de aceea resetam `lg = 1` in loc de `lg = 0`.

```cpp
#include <iostream>
using namespace std;

int n, i, x, prec, lg, lgMax;

int main()
{
    cin >> n;
    cin >> x;
    prec = x;
    lg = 1;
    lgMax = 1;
    for (i = 2; i <= n; i++)
    {
        cin >> x;
        if (x > prec)
            lg++;
        else
        {
            if (lg > lgMax)
                lgMax = lg;
            lg = 1;
        }
        prec = x;
    }
    if (lg > lgMax)
        lgMax = lg;
    cout << lgMax;
    return 0;
}
```

**Intrare:**
```
8
2 3 4 7 3 5 9 11
```

**Afisare:**
```
4
```

Traseul algoritmului:

| i | x  | prev | lg | lgMax | Observatie |
|---|----|------|----|-------|------------|
| — | 2  | 2    | 1  | 1     | initializare |
| 2 | 3  | 2    | 2  | 1     | `3 > 2`, exemplu |
| 3 | 4  | 3    | 3  | 1     | `4 > 3`, exemplu |
| 4 | 7  | 4    | 4  | 1     | `7 > 4`, exemplu |
| 5 | 3  | 7    | 1  | 4     | `3 <= 7`, contraexemplu; `lgMax = 4`, `lg = 1` |
| 6 | 5  | 3    | 2  | 4     | `5 > 3`, exemplu |
| 7 | 9  | 5    | 3  | 4     | `9 > 5`, exemplu |
| 8 | 11 | 9    | 4  | 4     | `11 > 9`, exemplu |

Dupa `for`: `lg = 4 = lgMax = 4`, nu se schimba.

> [!NOTE] Observatie
> Cand am intampinat `3` dupa `7`, secventa `2 3 4 7` s-a incheiat. Dar `3` este inceputul urmatorei secvente crescatoare (`3 5 9 11`). Daca am folosi `lg = 0` la contraexemplu, am "uita" de `3` si am numara doar `5 9 11` — lungime 3 in loc de 4.
