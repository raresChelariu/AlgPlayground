# Stergeri si inserari in vector

## Inserarea unui element

### Cum functioneaza

Imaginati-va un rand de cinema cu 6 persoane asezate, numerotate de la stanga la dreapta:

| Pozitia  | 1 | 2 | 3 | 4 | 5 | 6 |
|----------|---|---|---|---|---|---|
| Persoana | F | G | A | B | I | R |

Catalina vrea sa se aseze pe pozitia 2 (intre Florin si George). Toate persoanele de pe pozitiile 2, 3, ..., 6 trebuie sa se mute cu o pozitie la dreapta pentru a face loc:

| Pozitia  | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|----------|---|---|---|---|---|---|---|
| Persoana | F | C | G | A | B | I | R |

**Ordinea mutarilor conteaza:**
- incepem de la ultimul si mergem spre stanga (G). 
- Daca am incepe de la stanga, primul mutat "s-ar aseza" pe cel din stanga sa 
- din moment ce folosim atriburi, daca am face `v[4] = v[3];` atunci pe pozitia 4 as memora G(eorge), dar as pierde valoarea `A` (cea de pe scaunul 4).

### Algoritmul de inserare

Pentru a insera valoarea `val` pe pozitia `p`:

```cpp
for (j = n; j >= p; j--)
    v[j + 1] = v[j];
v[p] = val;
n++;
```

---

### Exemplu: inserare dupa elementele divizibile cu 7

Sa se insereze dupa fiecare element divizibil cu 7 opusul sau.

```cpp
#include <iostream>
using namespace std;
int v[10001], n, i, j;

int main()
{
    cin >> n;
    for (i = 1; i <= n; i++)
        cin >> v[i];
    for (i = 1; i <= n; i++)
    {
        if (v[i] % 7 == 0)
        {
            for (j = n; j >= i + 1; j--)
                v[j + 1] = v[j];
            v[i + 1] = -v[i];
            n++;
            i++;
        }
    }
    for (i = 1; i <= n; i++)
        cout << v[i] << " ";
    return 0;
}
```

**Intrare:**

```
5
7 3 14 5 21
```

**Afisare:**

```
7 -7 3 14 -14 5 21 -21
```

> **Obs:** dupa inserare, `i++` face ca bucla sa sara peste elementul proaspat inserat. Fara `i++`, bucla ar re-verifica pozitia `i + 1`, care contine `-v[i]` — si daca `v[i]` era multiplu de 7, atunci si `-v[i]` este multiplu de 7, deci s-ar insera din nou la infinit.

#### Ce s-ar intampla fara `i++`?

Sa urmarim exemplul cu sirul `1 7`:

| Iteratie | i | Vector | Ce se intampla |
|----------|---|--------|----------------|
| 1 | 1 | `7` | v[1]=7, div. cu 7 → inserez -7 pe poz. 2, vector devine `7 -7`, n=2 |
| 2 | 2 | `7 -7` | v[2]=-7, -7 % 7 == 0 → inserez 7 pe poz. 3, vector devine `7 -7 7`, n=3 |
| 3 | 3 | `7 -7 7` | v[3]=7, div. cu 7 → inserez -7 pe poz. 4 ... |
| ... | ... | ... | **bucla nu se mai termina niciodata!** |

**Concluzie:** `-v[i]` este si el multiplu de 7. Fara `i++`, bucla ajunge la elementul tocmai inserat si tot insereaza, la nesfarsit.

---

## Stergerea unui element

### Cum functioneaza

Acelasi rand de cinema, cu 6 persoane:

| Pozitia  | 1 | 2 | 3 | 4 | 5 | 6 |
|----------|---|---|---|---|---|---|
| Persoana | F | G | A | B | I | R |

Anastasia (pozitia 3) vrea sa plece. Persoanele din dreapta ei (B, I, R) se muta cu o pozitie la stanga pentru a umple golul:

| Pozitia  | 1 | 2 | 3 | 4 | 5 |
|----------|---|---|---|---|---|
| Persoana | F | G | B | I | R |

**Ordinea mutarilor conteaza:** incepem de langa gol (B) si mergem spre dreapta. Daca am incepe de la dreapta, am suprascrie persoana din stanga inainte de a o fi mutat.

### Algoritmul de stergere

Pentru a sterge elementul de pe pozitia `p`:

```cpp
for (j = p; j < n; j++)
    v[j] = v[j + 1];
n--;
```

---

### Exemplu: stergerea elementelor divizibile cu 7

Sa se stearga fiecare element divizibil cu 7.

```cpp
#include <iostream>
using namespace std;
int v[10001], n, i, j;

int main()
{
    cin >> n;
    for (i = 1; i <= n; i++)
        cin >> v[i];
    for (i = 1; i <= n; i++)
    {
        if (v[i] % 7 == 0)
        {
            for (j = i; j < n; j++)
                v[j] = v[j + 1];
            n--;
            i--;
        }
    }
    for (i = 1; i <= n; i++)
        cout << v[i] << " ";
    return 0;
}
```

**Intrare:**

```
8
7 3 14 5 21 2 49 6
```

**Afisare:**

```
3 5 2 6
```

> **Obs:** dupa stergere, `i--` face ca bucla sa re-verifice pozitia `i` in iteratia urmatoare (bucla `for` va incrementa `i` la final, revenind la aceeasi pozitie). Este necesar deoarece, dupa stergere, elementul de pe pozitia `i` este cel care era initial pe pozitia `i + 1` — el inca nu a fost verificat.

#### Ce s-ar intampla fara `i--`?

Sa urmarim exemplul cu sirul `3 7 14 3` (doi multipli de 7 consecutivi):

| Iteratie | i | Vector | Ce se intampla |
|----------|---|--------|----------------|
| 1 | 1 | `7 14 3` | v[1]=7, div. cu 7 → sterg, vector devine `14 3`, n=2 |
| 2 | 2 | `14 3` | v[2]=3, 3 % 7 != 0 → nimic |
| sfarsit | — | `14 3` | **14 nu a fost niciodata verificat!** |

**Concluzie:** dupa stergere, elementul de pe pozitia `i+1` se muta pe pozitia `i`. Daca nu scriem `i--`, bucla trece mai departe si rateaza verificarea acestui element.
