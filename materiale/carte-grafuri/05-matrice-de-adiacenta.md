# 1.2. Reprezentarea grafurilor in memorie — matricea de adiacenta

> Extras din *Programarea in limbajul C/C++ pentru liceu*, paginile 24-29
> (pozele `019`, `020`, `021`/`022`, `023`, `024`, `025`).

---

## Definitie (graf neorientat)

Fie `G = (V, E)` un graf neorientat. Sa notam cu `n` numarul de varfuri din graf.
**Matricea de adiacenta** este o matrice patratica, avand `n` linii si `n` coloane, cu
elemente din multimea `{0, 1}`, astfel:

- `A[i][j] = 1`, daca exista muchia `[i, j]` in graf;
- `A[i][j] = 0`, in caz contrar.

**Exemplu.** Pentru graful neorientat `G1` cu 4 varfuri si muchiile
`[1,2]`, `[1,3]`, `[1,4]`, `[3,4]`, matricea de adiacenta este:

|   | 1 | 2 | 3 | 4 |
| - | - | - | - | - |
| **1** | 0 | 1 | 1 | 1 |
| **2** | 1 | 0 | 0 | 0 |
| **3** | 1 | 0 | 0 | 1 |
| **4** | 1 | 0 | 1 | 0 |

## Definitie (graf orientat)

Fie `G = (V, E)` un graf orientat. Matricea de adiacenta este o matrice patratica cu `n`
linii si `n` coloane, cu elemente din multimea `{0, 1}`, astfel: `A[i][j] = 1` daca exista
arcul `(i, j)` in graf si `0` in caz contrar.

> [!NOTE] Observatii
> 1. Matricea de adiacenta a unui graf **neorientat este simetrica** fata de diagonala
>    principala, in timp ce matricea de adiacenta a unui graf **orientat nu este
>    simetrica** fata de diagonala principala.
> 2. Dimensiunea spatiului de memorie necesar pentru reprezentarea unui graf prin matrice
>    de adiacenta este `O(n^2)`.

---

## Citirea unui graf neorientat si reprezentarea sa prin matrice de adiacenta

Din fisierul de intrare `grafn.in` se citesc de pe prima linie doua numere naturale `n`
(`n <= 100`) si `m`, reprezentand numarul de varfuri, respectiv numarul de muchii dintr-un
graf neorientat. Se citesc apoi cele `m` linii, pe fiecare linie fiind specificate doua
numere naturale cuprinse intre `1` si `n`, reprezentand extremitatile unei muchii din graf.
Sa se construiasca matricea de adiacenta a grafului.

**Solutie.** Consideram ca numarul de varfuri din graf `n` si matricea de adiacenta a
grafului `A` sunt variabile globale (automat initializate cu `0`).

```cpp
#define NMax 101

int n, A[NMax][NMax];
```

Am declarat dimensiunea maxima a matricei cu o unitate mai mare, deoarece vom considera ca
varfurile sunt numerotate de la `1` la `n` si ca linia `i`, respectiv coloana `i` din
matrice corespunde varfului `i`.

Vom citi din fisierul de intrare fiecare muchie `[x, y]` si vom plasa valoarea `1` in
matricea de adiacenta, atat pe pozitia `(x, y)`, cat si pe pozitia `(y, x)`.

```cpp
void Citire_graf_neorientat()
{
    int m, x, y;
    ifstream fin("grafn.in");
    fin >> n >> m;
    while (m--)
    {
        fin >> x >> y;
        A[x][y] = A[y][x] = 1;
    }
    fin.close();
}
```

---

## Citirea unui graf orientat si reprezentarea sa prin matrice de adiacenta

Din fisierul de intrare `grafo.in` se citesc de pe prima linie doua numere naturale `n` si
`m`, reprezentand numarul de varfuri, respectiv numarul de arce dintr-un graf orientat. Se
citesc apoi cele `m` linii, pe fiecare linie fiind specificate doua numere naturale
cuprinse intre `1` si `n`, reprezentand extremitatea initiala si extremitatea finala a unui
arc din graf. Sa se construiasca matricea de adiacenta a grafului.

**Solutie.** Vom citi din fisierul de intrare fiecare arc `(x, y)` si vom plasa valoarea
`1` in matricea de adiacenta doar pe pozitia `(x, y)`.

```cpp
void Citire_graf_orientat()
{
    int m, x, y;
    ifstream fin("grafo.in");
    fin >> n >> m;
    while (m--)
    {
        fin >> x >> y;
        A[x][y] = 1;
    }
    fin.close();
}
```

---

## Exercitii propuse

1. Construiti reprezentarile prin matrice de adiacenta ale grafurilor urmatoare
   (doua grafuri cu 7 varfuri din carte).
2. Matricea urmatoare este matricea de adiacenta a unui graf:

   |   | 1 | 2 | 3 | 4 | 5 | 6 |
   | - | - | - | - | - | - | - |
   | **1** | 0 | 1 | 1 | 0 | 0 | 0 |
   | **2** | 1 | 0 | 1 | 0 | 0 | 0 |
   | **3** | 1 | 1 | 0 | 0 | 0 | 1 |
   | **4** | 0 | 0 | 0 | 0 | 1 | 1 |
   | **5** | 0 | 0 | 0 | 1 | 0 | 1 |
   | **6** | 0 | 0 | 1 | 1 | 1 | 0 |

   Care dintre urmatoarele afirmatii sunt adevarate?
   **a.** Graful este neorientat.
   **b.** Graful contine un ciclu eulerian.
   **c.** Graful este bipartit.
   **d.** Toate varfurile grafului au grad par.
   **e.** Graful este graf turneu.

3. Se considera graful neorientat dat prin matricea de adiacenta urmatoare. Sa se determine
   lungimea minima a unui lant ce uneste varfurile `1` si `3`.

   |   | 1 | 2 | 3 | 4 |
   | - | - | - | - | - |
   | **1** | 0 | 1 | 0 | 1 |
   | **2** | 1 | 0 | 0 | 1 |
   | **3** | 0 | 0 | 0 | 1 |
   | **4** | 1 | 1 | 1 | 0 |

   **a.** 2 **b.** 4 **c.** 1 **d.** 3 *(Bacalaureat, iulie 2003)*

4. Care dintre urmatoarele este matricea de adiacenta a unui graf orientat cu 4 arce?
   *(Bacalaureat special, 2006)* — variantele de raspuns nu s-au putut reconstitui din
   poza `023`.
5. Stabiliti care dintre urmatoarele matrice de adiacenta corespunde grafului din figura
   urmatoare. *(Bacalaureat, august 2003)* — variantele nu s-au putut reconstitui.
6. Care este gradul interior al varfului cu gradul exterior cel mai mare din graful
   orientat cu matricea de adiacenta urmatoare:

   ```
   0 0 1 0
   0 0 1 1
   1 1 0 1
   1 1 0 0
   ```

   **a.** 1 **b.** 2 **c.** 3 **d.** 0 *(Bacalaureat, august 2003)*

7. Care este matricea de adiacenta a unui graf neorientat cu 4 varfuri, doua muchii si cel
   putin un varf izolat? *(Simulare Bacalaureat, 2004)*
8. Orice graf neorientat cu `n` noduri are o matrice de adiacenta cu urmatoarea
   proprietate:
   **a.** Este simetrica fata de diagonala principala.
   **b.** Este simetrica fata de diagonala secundara.
   **c.** Este formata numai din valorile 0, 1 si -1.
   **d.** Are suma elementelor egala cu `n`.
9. Din fisierul de intrare `grafn.in` se citesc de pe prima linie doua numere naturale `n`
   si `m`, reprezentand numarul de varfuri, respectiv numarul de muchii dintr-un graf
   neorientat. Se citesc apoi cele `m` linii, pe fiecare linie fiind specificate doua
   numere naturale cuprinse intre `1` si `n`, reprezentand extremitatile unei muchii din
   graf. De pe ultima linie a fisierului de intrare se citeste un numar natural `p`, urmat
   de `p` numere naturale cuprinse intre `1` si `n`, reprezentand o secventa de `p` varfuri
   din graf.
   **a.** Sa se construiasca matricea de adiacenta a grafului si sa se afiseze in fisierul
   de iesire `grafn.out`.
   **b.** Sa se determine gradul fiecarui varf din graf si sa se afiseze pe o linie
   separata in fisierul de iesire `grafn.out`.
   **c.** Sa se verifice daca secventa de varfuri citita de pe ultima linie a fisierului de
   intrare este un lant in graf; in caz afirmativ, sa se identifice proprietatile lantului
   (elementar, simplu) si sa se afiseze un mesaj corespunzator in fisierul de iesire.
   **d.** Sa se verifice daca graful din fisierul de intrare este graf complet si sa se
   afiseze un mesaj corespunzator pe ultima linie a fisierului `grafn.out`.
10. Scrieti un program care sa citeasca doua grafuri neorientate date in formatul de la
    problema precedenta si care sa verifice daca primul graf este un graf partial al celui
    de-al doilea graf.
11. Din fisierul de intrare `grafo.in` se citeste un graf orientat in format analog
    (`n`, `m`, apoi `m` arce, apoi o secventa de `p` varfuri).
    **a.** Sa se construiasca matricea de adiacenta a grafului si sa se afiseze in fisierul
    de iesire `grafo.out`.
    **b.** Sa se determine gradul interior si gradul exterior al fiecarui varf si sa se
    afiseze in `grafo.out` (pe linia `n+1` gradele interioare separate prin cate un spatiu,
    iar pe linia `n+2` gradele exterioare).
    **c.** Sa se verifice daca secventa de varfuri citita de pe ultima linie este un drum
    sau un lant in graf; in caz afirmativ, sa se identifice proprietatile drumului/lantului
    (elementar, simplu) si sa se afiseze un mesaj corespunzator in fisierul de iesire.
    **d.** Sa se verifice daca graful este graf complet si sa se afiseze un mesaj
    corespunzator pe urmatoarea linie a fisierului `grafo.out`.
    **e.** Sa se verifice daca graful este graf antisimetric si sa se afiseze un mesaj
    corespunzator pe urmatoarea linie a fisierului `grafo.out`.
12. Un varf al unui graf orientat se numeste **supersursa** daca el are gradul interior
    egal cu `0` si gradul exterior egal cu `n - 1` (unde `n` reprezinta numarul de varfuri
    din graf). Fiind dat un graf orientat in formatul de la problema precedenta, scrieti un
    algoritm eficient care sa identifice supersursele grafului.
