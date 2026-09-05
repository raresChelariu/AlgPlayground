# Reprezentarea prin liste de adiacenta

> Extras din *Programarea in limbajul C/C++ pentru liceu*, paginile 29-34
> (pozele `025`, `026`, `027`, `028`, `029`, `030`).

---

## Definitie

Fie `G = (V, E)` un graf neorientat sau orientat cu `n` varfuri.

Pentru a reprezenta graful prin **liste de adiacenta** vom utiliza un vector cu `n`
componente, in care vom retine pentru fiecare varf din graf lista sa de adiacenta.

Lista de adiacenta a varfului `x` va contine toate varfurile `y` cu proprietatea ca exista
muchia `[x, y]` (pentru graf neorientat), respectiv exista arcul `(x, y)` (pentru graf
orientat). **Ordinea in care sunt memorate varfurile intr-o lista de adiacenta nu conteaza.**

**Exemplu.** Pentru graful neorientat `G1` cu muchiile `[1,2]`, `[1,3]`, `[1,4]`, `[3,4]`:

```
1: 2 3 4
2: 1
3: 1 4
4: 1 3
```

---

## Detalii de implementare

### Varianta I — vector

O lista de adiacenta poate fi reprezentata ca un vector in care varfurile sunt memorate pe
pozitii consecutive.

Observam ca numarul de elemente din lista de adiacenta difera de la un varf la altul, fiind
egal cu gradul, respectiv gradul exterior al varfului, grad cuprins intre `0` si `n - 1`.

In primul rand, va fi necesar sa memoram gradul, respectiv gradul exterior al fiecarui varf.
Acest lucru se poate realiza intr-un alt vector (vectorul gradelor), sau il putem memora pe
**pozitia 0** a vectorului in care memoram lista de adiacenta.

Vectorul in care memoram lista de adiacenta a unui varf poate fi alocat **static** sau
**dinamic**.

- **alocare statica** — dimensiunea spatiului de memorie necesar este `O(n^2)`, aceeasi ca
  si in cazul matricei de adiacenta;
- **alocare dinamica** — dimensiunea spatiului de memorie necesar este `O(n + m)`, unde `m`
  este numarul de muchii/arce.

In cazul in care dimensiunea spatiului de memorie alocat static este o problema, va fi
preferata alocarea dinamica a memoriei pentru listele de adiacenta.

### Varianta II — lista inlantuita

Lista de adiacenta a unui varf poate fi implementata cu ajutorul unei structuri de date
dinamice, denumita **lista inlantuita**.

Daca structura grafului nu se modifica (deci nu au loc operatii de inserare/eliminare a unor
muchii/arce din graf), utilizarea unei astfel de implementari nu se justifica, deoarece:

- operatiile de prelucrare a listelor inlantuite sunt mai dificile decat operatiile de
  prelucrare a vectorilor;
- se dubleaza dimensiunea spatiului de memorie necesar, deoarece pentru fiecare nod din lista
  inlantuita trebuie sa retinem si adresa urmatorului element din lista.

---

## Citirea unui graf neorientat si reprezentarea sa prin liste de adiacenta

Din fisierul de intrare `grafn.in` se citesc de pe prima linie numerele naturale `n`
(`n <= 100`) si `m`, reprezentand numarul de varfuri, respectiv numarul de muchii dintr-un
graf neorientat. Se citesc apoi cele `m` linii, pe fiecare linie fiind specificate doua
numere naturale cuprinse intre `1` si `n`, reprezentand extremitatile unei muchii din graf.
Sa se construiasca reprezentarea prin liste de adiacenta a grafului.

**Solutie.** Consideram ca numarul de varfuri `n` si reprezentarea prin liste de adiacenta
`A` sunt variabile globale. De asemenea, vom considera ca gradul fiecarui varf va fi memorat
pe pozitia `0` a vectorului care reprezinta lista sa de adiacenta.

### Implementare statica

```cpp
#define NMax 101

int n, A[NMax][NMax];
```

Vom citi din fisierul de intrare fiecare muchie `[x, y]` si vom plasa pe `y` in lista de
adiacenta a lui `x`, apoi vom plasa pe `x` in lista de adiacenta a lui `y`.

```cpp
void Citire_graf_neorientat()
{
    int m, x, y;
    ifstream fin("grafn.in");
    fin >> n >> m;
    while (m--)
    {
        fin >> x >> y;
        A[x][0]++;
        A[x][A[x][0]] = y;
        A[y][0]++;
        A[y][A[y][0]] = x;
    }
    fin.close();
}
```

### Implementare dinamica

Reprezentarea grafului prin liste de adiacenta alocate dinamic va fi un vector cu componente
de tip pointer.

```cpp
#define NMax 101

int *A[NMax];
```

`A[i]` = adresa de inceput a vectorului ce va memora lista de adiacenta a varfului `i`.
Initial, pentru fiecare varf vom aloca dinamic memorie pentru o singura componenta in vector
(componenta `0` in care retinem gradul varfului).

De fiecare data cand vom citi o muchie `[x, y]`:

- vom mari gradul varfului `x`, vom realoca memoria necesara pentru lista de adiacenta a lui
  `x` si vom memora varful `y` in lista de adiacenta a lui `x`;
- vom mari gradul varfului `y`, vom realoca memoria necesara pentru lista de adiacenta a lui
  `y` si vom memora varful `x` in lista de adiacenta a lui `y`.

Pentru a aloca/realoca dinamic memorie pentru un vector vom utiliza functiile `calloc()` si
`realloc()`, declarate in `stdlib.h`.

```cpp
void *calloc(size_t nr, size_t dim);
```

**Efect:** se aloca in mod dinamic un vector cu `nr` componente, fiecare componenta avand
dimensiunea `dim` octeti. In cazul alocarii cu succes a memoriei, functia returneaza adresa
de inceput a zonei de memorie alocate. In cazul unui esec (memorie insuficienta, `nr` sau
`dim` nule), functia returneaza valoarea `0` (`NULL`).

> [!NOTE] Observatie
> Tipul parametrilor functiei este `size_t`. Acesta este un tip specific dimensiunilor
> zonelor de memorie.

```cpp
void *realloc(void *adresa_inceput, size_t dim);
```

**Efect:** functia `realloc()` redimensioneaza zona de memorie a carei adresa este specificata
in parametrul `adresa_inceput` (aceasta zona de memorie a fost alocata dinamic in prealabil,
prin apelarea functiei `malloc()`, `calloc()` sau `realloc()`). Daca nu este posibila
stabilirea dimensiunii zonei de memorie la `dim` octeti, functia va cauta o zona de memorie
disponibila avand dimensiunea `dim` octeti, va aloca aceasta zona de memorie, va copia
continutul fostei zone de memorie in noua locatie si va elibera fosta zona de memorie. In
cazul alocarii cu succes a memoriei, functia returneaza adresa de inceput a zonei de memorie
alocate (care poate sa difere de `adresa_inceput` specificata la apel). In cazul unui esec,
functia returneaza valoarea `0` (`NULL`).

### Program complet

Programul urmator citeste muchiile unui graf neorientat, creeaza reprezentarea grafului prin
liste de adiacenta alocate dinamic, apoi afiseaza lista de adiacenta a fiecarui varf din graf.

```cpp
#include <stdio.h>
#include <stdlib.h>

#define NMax 101

int n;
int *A[NMax];

void Citire();
void Afisare();

int main()
{
    Citire();
    Afisare();
    return 0;
}

void Citire()
{
    FILE *fin = fopen("grafn.in", "r");
    int x, y, m, i;
    fscanf(fin, "%d %d", &n, &m);
    // aloc memorie pentru gradul fiecarui varf
    for (i = 1; i <= n; i++)
    {
        A[i] = (int *) calloc(1, sizeof(int));
        A[i][0] = 0;
    }
    for (i = 0; i < m; i++)
    {
        fscanf(fin, "%d %d", &x, &y);
        A[x][0]++; /* incrementam gradul varfului x */
        /* realocam memorie pentru lista de adiacenta a lui x */
        A[x] = (int *) realloc(A[x], (A[x][0] + 1) * sizeof(int));
        /* memoram pe y in lista de adiacenta a lui x */
        A[x][A[x][0]] = y;

        A[y][0]++; /* incrementam gradul varfului y */
        /* realocam memorie pentru lista de adiacenta a lui y */
        A[y] = (int *) realloc(A[y], (A[y][0] + 1) * sizeof(int));
        /* memoram pe x in lista de adiacenta a lui y */
        A[y][A[y][0]] = x;
    }
    fclose(fin);
}

void Afisare()
{
    int i, j;
    for (i = 1; i <= n; i++)
    {
        printf("Lista de adiacenta a varfului %d: ", i);
        for (j = 1; j <= A[i][0]; j++)
            printf("%d ", A[i][j]);
        printf("\n");
    }
}
```

---

## Citirea unui graf orientat si reprezentarea sa prin liste de adiacenta

Citirea si reprezentarea unui graf orientat prin liste de adiacenta se realizeaza in mod
similar cu reprezentarea grafurilor neorientate prin liste de adiacenta. **Diferenta** consta
in faptul ca la citirea arcului `(x, y)` va fi plasat numai varful `y` in lista de adiacenta
a lui `x`, nu si varful `x` in lista de adiacenta a lui `y`.

---

## Exercitii propuse

1. Construiti reprezentarile prin liste de adiacenta ale grafurilor urmatoare.
2. Sa consideram urmatoarea reprezentare prin liste de adiacenta a unui graf:

   ```
   1: 2 3 6
   2: 3
   3: 4
   4: 2 5
   5: 6
   6: 5
   ```

   Care dintre urmatoarele afirmatii sunt adevarate?
   **a.** Reprezentarea este incorecta.
   **b.** Graful este orientat.
   **c.** Graful este bipartit.
   **d.** Graful contine circuite.
   **e.** Graful este antisimetric.
   **f.** Graful contine varfuri izolate.

3. Se considera graful din figura urmatoare. Sa se determine care dintre liste reprezinta
   lista de adiacenta a varfului `3`.
   **a.** 1 4 5 **b.** 3 1 4 5 **c.** 4 5 **d.** 2 4 5
4. Se considera graful neorientat din figura urmatoare. Sa se determine numarul varfului
   care are lista de adiacenta `2 3 5`.
   **a.** 5 **b.** 3 **c.** 4 **d.** 1 *(Bacalaureat, iulie 2003)*
5. Din fisierul de intrare `graf.in` se citesc de pe prima linie doua numere naturale `n` si
   `m`, reprezentand numarul de varfuri, respectiv numarul de arce dintr-un graf orientat. Se
   citesc apoi cele `m` linii, pe fiecare linie fiind specificate doua numere naturale
   cuprinse intre `1` si `n`, reprezentand extremitatile unui arc.
   **a.** Sa se reprezinte graful prin liste de adiacenta alocate dinamic.
   **b.** Sa se determine varfurile care au gradul interior egal cu gradul exterior.
   **c.** Sa se verifice daca graful este graf turneu.
   **d.** Sa se construiasca graful transpus al grafului dat si sa se afiseze pe ecran lista
   de adiacenta a fiecarui varf din graful transpus.
