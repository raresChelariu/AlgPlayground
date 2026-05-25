# Vector

## Definitie

- se mai numeste si `tablou unidimensional`
- este un grup de elemente de acelasi tip
  - exemplu: un vector de 20 de elemente de tip `int`
- este o zona de memorie continua
  - adica o zona de memorie `fara goluri`
  - toate elementele sunt `unul dupa altul` in memorie

> [!IMPORTANT] Important
> pentru a folosi un vector, mai intai trebuie sa-l declaram.

---

## Declarare

Sintaxa:

```cpp
tip numeVector[NRELEM];
```

Exemplu:

```cpp
int a[20];
// s-a declarat un vector:
// ce se numeste a
// si are 20 de elemente de tip int
```

> [!IMPORTANT] Important
> odata ce am declarat un vector, nu ii putem modifica dimensiunea (numarul de elemente). El va avea acelasi numar de elemente in memorie pana la finalul programului.

Exemplu:

```cpp
long long v[30];
// s-a declarat un vector v de 30 elemente de tip long long
```

---

## Pozitiile elementelor in vector

- Prima pozitie dintr-un vector este pozitia `0`.
- un sinonim pentru pozitie este `indice`
- daca un vector a fost declarat cu `NRELEM` elemente
  - va avea pozitii de la `0` la `NRELEM - 1`

Exemplu:

```cpp
int v[5];
// am declarat un vector de tip int cu 5 elemente
// elementele vor avea indicii 0, 1, 2, 3, 4
```

Exemplu:

```cpp
int a[30];
// am declarat un vector de tip int cu 30 de elemente
// elementele vor avea indicii 0, 1, 2, ... , 28, 29
```

---

## Accesul la un element in vector

Pot folosi fiecare element din vector de parca ar fi o variabila.
Astfel, pentru fiecare element din vector:

- pot sa-l afisez
- pot sa ii dau o valoare printr-o atribuire
- pot sa citesc in acel element o valoare de la tastatura

**Sintaxa**:

```cpp
numeVector[indice]
```

Exemplu:

```cpp
cout << v[0];
// vom spune ca afisam valoarea lui "v de 0"
// adica valoarea elementului de la pozitia 0
```

Exemplu:

```cpp
v[2] = v[3] + v[0];
// in vorbire, vom spune ca "v de 2" primeste suma dintre "v de 3" si "v de 0"
```

---

## Exemplu de problema

Sa se determine minimul a 7 numere.

```cpp
#include <iostream>
using namespace std;
int v[7], i, minim;

int main()
{
    cin >> v[0] >> v[1] >> v[2] >> v[3] >> v[4] >> v[5] >> v[6];
    minim = v[0];
    for (i = 1; i <= 6; i++)
    {
        if (v[i] < minim)
        {
            minim = v[i];
        }
    }
    cout << minim;
    return 0;
}
```

**Intrare:**

```
8 3 12 5 1 9 4
```

**Afisare:**

```
1
```

### Cum se populeaza vectorul

La executia liniei `cin >> v[0] >> v[1] >> ... >> v[6]`, citim valorile in ordine de la tastatura si le asezam pe rand in pozitiile `0`, `1`, ..., `6` ale vectorului. Tabelul de mai jos arata starea vectorului dupa fiecare citire:

| Citire | Pozitie | Valoare citita | `v[0]` | `v[1]` | `v[2]` | `v[3]` | `v[4]` | `v[5]` | `v[6]` |
| ------ | ------- | -------------- | ------ | ------ | ------ | ------ | ------ | ------ | ------ |
| 1      | `v[0]`  | 8              | 8      | 0      | 0      | 0      | 0      | 0      | 0      |
| 2      | `v[1]`  | 3              | 8      | 3      | 0      | 0      | 0      | 0      | 0      |
| 3      | `v[2]`  | 12             | 8      | 3      | 12     | 0      | 0      | 0      | 0      |
| 4      | `v[3]`  | 5              | 8      | 3      | 12     | 5      | 0      | 0      | 0      |
| 5      | `v[4]`  | 1              | 8      | 3      | 12     | 5      | 1      | 0      | 0      |
| 6      | `v[5]`  | 9              | 8      | 3      | 12     | 5      | 1      | 9      | 0      |
| 7      | `v[6]`  | 4              | 8      | 3      | 12     | 5      | 1      | 9      | 4      |

> [!NOTE] Observatie
> un vector declarat global are toate elementele initializate cu `0`. De aceea, inainte de citire, toate pozitiile din `v` au valoarea `0`, iar pe masura ce citim, valorile `0` sunt inlocuite cu cele introduse de la tastatura.

### Cum lucreaza bucla de minim

Pornim cu `minim = v[0] = 8` si comparam pe rand cu fiecare element urmator:

| Pasul (`i`) | `v[i]` | `v[i] < minim`? | `minim` dupa pas |
| ----------- | ------ | --------------- | ---------------- |
| 1           | 3      | 3 < 8 -> da     | 3                |
| 2           | 12     | 12 < 3 -> nu    | 3                |
| 3           | 5      | 5 < 3 -> nu     | 3                |
| 4           | 1      | 1 < 3 -> da     | 1                |
| 5           | 9      | 9 < 1 -> nu     | 1                |
| 6           | 4      | 4 < 1 -> nu     | 1                |

La final, `minim = 1`, deci aceasta este valoarea afisata.
