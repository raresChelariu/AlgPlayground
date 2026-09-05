# 1.6. Conexitate

> Extras din *Programarea in limbajul C/C++ pentru liceu*, paginile 46-51
> (pozele `040` - `045`).

---

## Definitii

Un graf se numeste **conex** daca oricare ar fi `x` si `y` varfuri din graf exista lant
intre `x` si `y`.

Se numeste **componenta conexa** un subgraf conex **maximal** cu aceasta proprietate
(adica, daca am mai adauga un varf si toate muchiile/arcele incidente cu acesta, subgraful
obtinut nu ar mai fi conex).

> [!NOTE] Observatii
> 1. Orice graf neconex contine cel putin doua componente conexe.
> 2. Componentele conexe ale unui graf sunt **disjuncte**.
> 3. Componentele conexe ale grafului constituie o **partitie** a multimii varfurilor grafului.

**Demonstratia punctului 2.** Sa presupunem prin reducere la absurd ca exista `C1` si `C2`,
doua componente conexe, astfel incat intersectia lor este nevida. Fie `x` un varf care
apartine intersectiei celor doua componente conexe. Consideram `C1` componenta conexa cea mai
ampla si `y` un varf din `C1 - C2`. Deoarece `x` si `y` apartin componentei `C1`, deducem ca
exista lant de la `y` la `x`. Deoarece `x` apartine si componentei `C2`, deducem ca exista
lant de la `x` la orice alt varf din `C2`. Prin urmare, exista lant de la `y` la orice alt
varf din `C2`. Cu alte cuvinte, `C2` nu este maximal (am putea adauga varful `y`, subgraful
ramanand conex), ceea ce este in contradictie cu presupunerea facuta.

---

## Descompunerea unui graf neorientat in componente conexe

A descompune un graf in componente conexe inseamna a determina toate componentele conexe ale
grafului.

A determina componenta conexa a unui varf `x` presupune a determina toate varfurile accesibile
din varful `x`; deci este suficient sa realizam o **parcurgere a grafului** (in latime sau in
adancime) cu varful de start `x`.

Pentru a descompune graful in componente conexe, vom realiza cate o parcurgere pentru fiecare
componenta conexa (selectand ca varf de start varful nevizitat avand numar minim).

> [!NOTE] Observatii
> 1. Pentru a testa daca un graf este aciclic sau bipartit, am testat fiecare componenta conexa
>    a grafului.
> 2. Pentru a descompune un graf **orientat** in componente conexe, se va face abstractie de
>    orientarea arcelor.
> 3. Pentru un graf reprezentat prin **liste de adiacenta**, descompunerea in componente conexe
>    utilizand parcurgerea grafului are complexitatea `O(n + m)`. Daca graful este reprezentat
>    prin **matrice de adiacenta**, complexitatea este `O(n^2)`.

---

## Descompunerea in componente conexe a unui graf reprezentat prin lista muchiilor

Daca graful este reprezentat prin lista muchiilor, descompunerea grafului in componente conexe
utilizand parcurgerea grafului este **ineficienta**.

Vom considera ca, initial, graful nu contine nicio muchie, deci este format din `n` varfuri
izolate, fiecare varf formand o componenta conexa. Vom parcurge lista muchiilor grafului,
adaugand in graf muchiile una cate una.

La adaugarea unei muchii pot aparea doua cazuri:

1. extremitatile muchiei sunt in **aceeasi** componenta conexa — in acest caz, prin adaugarea
   acestei muchii nu se modifica descompunerea in componente conexe a grafului;
2. extremitatile muchiei sunt in componente conexe **diferite** — in acest caz, prin adaugarea
   acestei muchii, componentele conexe corespunzatoare celor doua extremitati **se unifica**.

Vom retine evidenta componentelor conexe ale grafului cu ajutorul unui vector `C` cu `n`
componente: `C[i]` = reprezentantul componentei conexe din care face parte varful `i` (prin
conventie, vom considera drept reprezentant varful cu numarul cel mai mic).
Initial `C[i] = i`, pentru orice `i = 1, 2, ..., n`.

```cpp
#include <stdio.h>
#include <stdlib.h>

#define NMax 101
#define MMax NMax * (NMax - 1) / 2

typedef struct { int x, y; } Muchie;

int n, m;
Muchie G[MMax];
int C[NMax];

void Citire();
void Descompunere_Comp_Conexe();
void Afisare();

int main()
{
    Citire();
    Descompunere_Comp_Conexe();
    Afisare();
    return 0;
}

void Citire()
{
    FILE *fin = fopen("graf.in", "r");
    int i;
    fscanf(fin, "%d %d", &n, &m);
    for (i = 0; i < m; i++)
        fscanf(fin, "%d %d", &G[i].x, &G[i].y);
    fclose(fin);
}

void Descompunere_Comp_Conexe()
{
    int i, j, min, max;
    for (i = 1; i <= n; i++)
        C[i] = i;
    for (j = 0; j < m; j++)
        if (C[G[j].x] != C[G[j].y])
        {
            /* extremitatile muchiei j nu sunt in aceeasi
               componenta conexa */
            if (C[G[j].x] < C[G[j].y])
                min = C[G[j].x], max = C[G[j].y];
            else
                min = C[G[j].y], max = C[G[j].x];
            // unific componentele conexe ale extremitatilor
            for (i = 1; i <= n; i++)
                if (C[i] == max)
                    C[i] = min;
        }
}

void Afisare()
{
    int nrc = 0, i, j;
    for (i = 1; i <= n; i++)
        if (C[i])
        {
            nrc++;
            printf("Componenta conexa %d: %d ", nrc, i);
            for (j = i + 1; j <= n; j++)
                if (C[j] == C[i])
                {
                    printf("%d ", j);
                    C[j] = 0;
                }
            printf("\n");
        }
}
```

> [!NOTE] Observatie
> Complexitatea algoritmului de descompunere in componente conexe a unui graf neorientat
> reprezentat prin lista muchiilor este `O(n * m)`. Cartea ofera in sectiunile urmatoare o
> implementare mai eficienta.

---

## Exercitii propuse

1. Sa se descompuna grafurile urmatoare in componente conexe.
2. Sa consideram graful reprezentat prin matricea de adiacenta din carte (10 varfuri). Cate
   componente conexe are acest graf?
   *(matricea nu s-a putut reconstitui corect din poza `044`)*
3. Sa consideram graful reprezentat prin urmatoarele liste de adiacenta. Cate componente conexe
   are acest graf?

   ```
   1: 2 7
   2: 3
   3: 4
   4: 6
   5:
   6:
   7:
   8: 2 3 8
   ```

   *(listele sunt partial ilizibile in poza `044`)*
4. Sa consideram un graf neorientat cu `n = 17` varfuri reprezentat prin lista muchiilor. Care
   sunt componentele conexe ale acestui graf?
   *(lista muchiilor nu s-a putut reconstitui din poza `044`)*
5. Dupa executarea functiei de descompunere in componente conexe a unui graf neorientat
   reprezentat prin lista muchiilor, vectorul `C` in care este memorata evidenta componentelor
   conexe are urmatorul continut:

   | i | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 |
   | --- | - | - | - | - | - | - | - | - | - | -- | -- | -- | -- | -- |
   | **C[i]** | 1 | 2 | 3 | 4 | 5 | 1 | 2 | 1 | 5 | 5 | 2 | 4 | 2 | 5 |

   Determinati componentele conexe ale grafului.
6. Care este numarul minim de muchii pe care trebuie sa le contina un graf neorientat cu 21 de
   varfuri astfel incat, oricum ar fi dispuse aceste muchii, graful sa fie conex?
   **a.** 210 **b.** 11 **c.** 191 **d.** 171
7. Intr-un graf neorientat cu 10 noduri, fiecare varf are gradul 2. Care este numarul maxim de
   componente conexe din care poate fi format graful?
   **a.** 1 **b.** 3 **c.** 4 **d.** 5 *(Bacalaureat, iulie 2006)*
8. Numarul minim de muchii ce se pot alege pentru a fi eliminate din graful neorientat urmator
   astfel incat acesta sa devina neconex este:
   **a.** 4 **b.** 3 **c.** 2 **d.** 1 *(Bacalaureat, iulie 2003)*
9. Gradul maxim al unui varf ce se poate obtine intr-un graf neorientat conex cu `n` varfuri si
   `n - 1` muchii este:
   **a.** 2 **b.** n/2 **c.** n **d.** n-1 *(Bacalaureat, iulie 2003)*
10. Se considera un graf cu 10 varfuri si 6 componente conexe. Care este numarul maxim de muchii
    din graf?
11. Numarul minim de noduri dintr-un graf neorientat cu 12 muchii, fara noduri izolate, graf
    format din exact 3 componente conexe este:
    **a.** 7 **b.** 8 **c.** 9 **d.** 10 *(Bacalaureat, iulie 2003)*
12. Scrieti un program care sa adauge un numar minim de muchii intr-un graf neorientat neconex,
    astfel incat graful obtinut sa fie conex. Programul va afisa pe ecran muchiile adaugate.
13. Scrieti un program care sa realizeze descompunerea in componente conexe a unui graf
    neorientat pe baza matricei inchiderii tranzitive a grafului.
14. Modificati algoritmul de descompunere in componente conexe a unui graf neorientat
    reprezentat prin lista muchiilor, astfel incat sa verifice daca graful este aciclic.
