# 1.5. Parcurgerea grafurilor

> Extras din *Programarea in limbajul C/C++ pentru liceu*, paginile 38-46
> (pozele `032` - `040`).

> [!WARNING] Atentie
> Paginile **36-37** lipsesc din poze: sectiunile **1.3** si **1.4** (matricea drumurilor,
> matricea inchiderii tranzitive, algoritmul Roy-Warshall). Din 1.4 s-au pastrat doar
> exercitiile 2 si 3, reproduse mai jos.

---

## Exercitii ramase de la 1.4 (inchiderea tranzitiva)

2. Sa consideram urmatoarea matrice a inchiderii tranzitive a unui graf orientat. Sa se
   identifice varfurile care nu apartin niciunui circuit.

   ```
   1 1 1 1 1 1
   1 1 1 1 1 1
   0 0 0 0 0 1
   1 1 1 1 1 1
   1 1 1 1 1 1
   0 0 0 0 0 0
   ```

3. Scrieti un program care, utilizand matricea inchiderii tranzitive, sa determine toate
   varfurile accesibile dintr-un varf dat `x`. Spunem ca varful `y` este **accesibil** din
   varful `x` daca exista un drum de la `x` la `y` (pentru graf orientat), respectiv un lant
   de la `x` la `y` (pentru graf neorientat).

---

## Ce inseamna parcurgerea unui graf

Parcurgerea unui graf presupune **examinarea sistematica a varfurilor grafului**, cu scopul
prelucrarii informatiilor asociate varfurilor.

Exista doua metode fundamentale de parcurgere a grafurilor:

- parcurgerea in **adancime** (*Depth First Search* — DFS);
- parcurgerea in **latime** (*Breadth First Search* — BFS).

---

## Parcurgerea in adancime (DFS)

Parcurgerea incepe cu un varf initial, denumit **varf de start**. Se viziteaza mai intai
varful de start. La vizitarea unui varf se efectueaza asupra informatiilor asociate varfului
o serie de operatii specifice problemei.

Se viziteaza apoi **primul vecin nevizitat** al varfului de start. Varful `y` este considerat
vecin al varfului `x` daca exista muchia `[x, y]` (pentru graf neorientat), respectiv arcul
`(x, y)` (pentru graf orientat).

Se viziteaza in continuare primul vecin nevizitat al primului vecin al varfului de start si
asa mai departe, mergand **in adancime** pana cand ajungem intr-un varf care nu mai are vecini
nevizitati. Cand ajungem intr-un astfel de varf, revenim la varful sau **parinte** (varful din
care acest nod a fost vizitat). Daca acest varf mai are vecini nevizitati, alegem primul vecin
nevizitat al sau si continuam parcurgerea in acelasi mod. Daca nici acest varf nu mai are
vecini nevizitati, revenim in varful sau parinte si continuam in acelasi mod, pana cand toate
varfurile accesibile din varful de start sunt vizitate.

### Exemplu

Sa parcurgem in adancime graful din carte (11 varfuri), considerand drept varf de start
varful `3`.

Se viziteaza mai intai varful de start `3`. Apoi se viziteaza primul vecin nevizitat al lui
`3` (ca ordine a vecinilor vom considera ordinea crescatoare a numerelor lor), deci `4`.
Vizitam apoi primul vecin nevizitat al lui `4`, adica pe `1`. Apoi vizitam primul vecin
nevizitat al lui `1`, adica pe `2`. In acest moment suntem intr-un nod care nu mai are vecini
nevizitati, revenim in nodul sau parinte, adica in `1`. Varful `1` mai are vecini nevizitati,
il vizitam pe primul dintre acestia, varful `6`. Varful `6` nu are vecini nevizitati, deci vom
reveni in varful `1`, parintele sau. Varful `1` mai are un vecin nevizitat, varful `7`.
Vizitam varful `7`, apoi primul vecin nevizitat al lui `7`, varful `10`, apoi primul vecin
nevizitat al lui `10`, varful `5`. Varful `5` nu mai are vecini nevizitati, deci revenim in
`10`. Nici varful `10` nu mai are vecini nevizitati, deci revenim in `7`. Nici varful `7` nu
mai are vecini nevizitati, revenim in `1`, apoi revenim in `4`, apoi in `3`. Varful `3` mai
are un vecin nevizitat — varful `9`. Vizitam varful `9`, apoi, deoarece varful `9` nu are
vecini nevizitati, revenim in varful `3`. Cum varful `3` nu mai are vecini nevizitati si nici
parinte (fiind varful de start), parcurgerea s-a incheiat.

**Ordinea DFS cu varful de start 3:** `3, 4, 1, 2, 6, 7, 10, 5, 9`.

Varfurile `8` si `11` nu au fost vizitate, deoarece nu sunt accesibile din varful `3`.

> [!TIP] Sfat
> Analizand parcurgerea in adancime, deducem ca varfurile sunt explorate **in ordinea inversa
> a "atingerii" lor**, mecanism care poate fi implementat utilizand o **stiva**. Prin urmare,
> pentru concizie si claritate se impune o abordare **recursiva** a parcurgerii DFS.

### Reprezentarea informatiilor

1. Graful va fi reprezentat prin liste de adiacenta, memorate in tabloul `A`; pe pozitia `0` a
   fiecarei liste de adiacenta se afla numarul de varfuri din lista.
2. Pentru a retine care varfuri au fost deja vizitate in timpul parcurgerii vom utiliza un
   vector `viz`, cu `n` componente din multimea `{0, 1}`, cu semnificatia `viz[i] = 1` daca
   varful `i` a fost deja vizitat, respectiv `0` in caz contrar.

Consideram ca variabilele `n` (numarul de varfuri din graf), `A` (listele de adiacenta) si
`viz` sunt globale. De asemenea, consideram ca la vizitarea unui varf va fi afisat pe ecran
numarul acestuia.

```cpp
void DFS(int x)
{
    int i;
    // vizitam varful x
    printf("%d ", x);
    viz[x] = 1;
    // parcurgem lista de adiacenta a varfului x
    for (i = 1; i <= A[x][0]; i++)
        if (!viz[A[x][i]])
            // A[x][i] este un vecin nevizitat al lui x
            DFS(A[x][i]);
}
```

---

## Parcurgerea in latime (BFS)

Parcurgerea in latime incepe, de asemenea, cu un varf initial, denumit varf de start. Se
viziteaza mai intai varful de start. Se viziteaza in ordine **toti vecinii nevizitati** ai
varfului de start. Apoi se viziteaza in ordine toti vecinii nevizitati ai vecinilor varfului
de start si asa mai departe, pana la epuizarea tuturor varfurilor accesibile din varful de
start.

### Exemplu

Sa parcurgem in latime acelasi graf, considerand drept varf de start varful `3`.

Se viziteaza mai intai varful de start `3`. Apoi se viziteaza, in ordine, vecinii nevizitati
ai lui `3`, deci `4`, `5` si `9`. Se viziteaza apoi, in ordine, vecinii nevizitati ai lui `4`
(varfurile `1` si `2`), apoi ai lui `5` (varful `10`) si apoi ai lui `9` (care nu are vecini
nevizitati). Se viziteaza apoi vecinii varfului `1` (varfurile `6` si `7`) si parcurgerea s-a
incheiat.

**Ordinea BFS cu varful de start 3:** `3, 4, 5, 9, 1, 2, 10, 6, 7`.

Si in cazul parcurgerii in latime varfurile `8` si `11` nu au fost vizitate, deoarece nu sunt
accesibile din varful `3`.

> [!TIP] Sfat
> Analizand parcurgerea in latime, deducem ca varfurile sunt explorate **exact in ordinea
> "atingerii" lor**, mecanism care poate fi implementat utilizand o **coada**.

### Descrierea algoritmului

1. Initializam coada cu varful de start si vizitam varful de start.
2. Cat timp exista elemente in coada executam:
   - extragem din coada primul element;
   - parcurgem toti vecinii elementului extras, identificandu-i pe cei nevizitati; acestia vor
     fi vizitati si vor fi plasati in coada.

### Reprezentarea informatiilor

1. Graful va fi reprezentat prin liste de adiacenta, memorate in tabloul `A`; pe pozitia `0` a
   fiecarei liste de adiacenta se afla numarul de varfuri din lista.
2. Pentru a retine care varfuri au fost deja vizitate vom utiliza un vector `viz`, cu `n`
   componente din multimea `{0, 1}`.
3. Vom utiliza o **coada** implementata static intr-un vector `C` cu `n` elemente, in care
   retinem varfurile in ordinea vizitarii lor. Variabilele `prim` si `ultim` retin pozitia de
   inceput, respectiv pozitia de sfarsit in coada.

```cpp
void BFS(int x)
{
    int i, prim, ultim;
    // vizitam varful de start
    printf("%d ", x);
    viz[x] = 1;
    // initializam coada cu varful de start
    C[0] = x;
    prim = ultim = 0;
    while (prim <= ultim) // cat timp coada nu este vida
    {
        // extragem un element din coada
        x = C[prim++];
        // parcurgem lista de adiacenta a varfului x
        for (i = 1; i <= A[x][0]; i++)
            if (!viz[A[x][i]])
            {
                // A[x][i] este un vecin nevizitat al lui x
                printf("%d ", A[x][i]); // il vizitam
                viz[A[x][i]] = 1;
                C[++ultim] = A[x][i]; // il plasam in coada
            }
    }
}
```

> [!IMPORTANT] Important
> 1. Parcurgerea in latime are o proprietate remarcabila: **fiecare varf este vizitat pe cel
>    mai scurt drum/lant incepand din varful de start**.
> 2. Complexitatea timp a algoritmilor de parcurgere in adancime si in latime depinde de
>    modalitatea de reprezentare a grafului. In cazul reprezentarii prin **liste de adiacenta**
>    complexitatea este `O(n + m)`. In cazul reprezentarii prin **matrice de adiacenta**
>    complexitatea este `O(n^2)`.

---

## Aplicatii

### Determinarea celui mai scurt drum/lant intre doua varfuri

Fie `G` un graf (orientat sau neorientat) si `x`, `y` doua varfuri din graf. Sa se determine
cel mai scurt drum (respectiv lant, pentru cazul in care graful este neorientat) de la `x` la
`y`.

**Solutie.** Vom utiliza proprietatea parcurgerii in latime de a vizita fiecare varf pe cel
mai scurt drum/lant care pleaca din varful de start. Prin urmare, pentru a determina cel mai
scurt drum de la `x` la `y`, vom efectua o parcurgere in latime incepand din `x`, pana cand
atingem varful `y`, sau pana cand vizitam toate varfurile accesibile din `x`.

Pentru a reconstitui drumul, vom modifica semnificatia vectorului `viz`. Mai exact,
`viz[i] = j` daca `j` este varful parinte al lui `i`, adica daca varful `i` a fost vizitat prin
parcurgerea arcului `(j, i)` (sau a muchiei `[j, i]`), respectiv `0` daca varful `i` nu a fost
vizitat. Singurul varf vizitat care nu are varf parinte este varful de start. Prin conventie,
stabilim `viz[x] = -1`.

```cpp
void BFS(int x)
{
    int i, prim, ultim;
    viz[x] = -1; // vizitam varful de start
    C[0] = x;
    prim = ultim = 0; // initializam coada
    while (prim <= ultim && !viz[y])
    {
        // cat timp coada nu este vida si nu am vizitat varful y
        x = C[prim++]; // extragem un element din coada
        // parcurgem lista de adiacenta a varfului x
        for (i = 1; i <= A[x][0]; i++)
            if (!viz[A[x][i]])
            {
                // A[x][i] este un vecin nevizitat al lui x
                viz[A[x][i]] = x; // il vizitam
                C[++ultim] = A[x][i]; // il plasam in coada
            }
    }
}
```

Reconstituirea drumului/lantului se face **in sens invers**, pornind de la varful `y`,
determinand apoi parintele sau (memorat in `viz[y]`), apoi parintele parintelui sau (memorat
in `viz[viz[y]]`) si asa mai departe, pana cand intalnim un varf care nu are parinte (acesta
este varful de start `x`).

Pentru a afisa drumul in ordinea fireasca, il vom memora intr-un vector auxiliar, denumit
`drum`, apoi vom afisa vectorul de la sfarsit catre inceput.

```cpp
void AfisareDrum()
{
    int poz = 0, i, drum[NMax];
    if (!viz[y])
        printf("Varful %d nu este accesibil din %d\n", y, x);
    else
    {
        drum[0] = y;
        while (viz[drum[poz]] != -1)
            drum[++poz] = viz[drum[poz - 1]];
        for (i = poz; i >= 0; i--)
            printf("%d ", drum[i]);
        printf("\n");
    }
}
```

---

### Bipartit

Fie `G` un graf neorientat. Sa se verifice daca graful `G` este bipartit.

**Solutie.** Vom parcurge toate varfurile grafului, incercand sa le separam in doua multimi,
astfel incat orice muchie din graf sa aiba o extremitate in prima multime si cealalta
extremitate in cea de-a doua multime.

Mai exact, vom alege un varf din graf ca varf de start si il vom plasa in prima multime. Toti
vecinii varfului de start trebuie sa fie plasati in cea de-a doua multime. Vecinii vecinilor
varfului de start vor fi plasati in prima multime si asa mai departe.

Daca in timpul parcurgerii un varf care a fost deja vizitat si astfel a fost plasat in una
dintre multimi este vizitat din nou, iar la noua vizitare varful ar trebui plasat in cealalta
multime, deducem ca **graful nu este bipartit**.

Este posibil ca nu toate varfurile grafului sa fie accesibile din varful de start ales. Prin
urmare, daca mai exista varfuri nevizitate, reluam parcurgerea pana cand toate varfurile sunt
vizitate (sau am detectat faptul ca graful nu este bipartit), alegand de fiecare data ca varf
de start unul dintre varfurile nevizitate.

Pentru a retine modul in care varfurile grafului sunt partitionate in cele doua multimi, vom
modifica semnificatia vectorului `viz` astfel: `viz[i] = 1` daca varful `i` a fost vizitat si
plasat in prima multime, `viz[i] = 2` daca varful `i` a fost vizitat si plasat in cea de-a doua
multime si respectiv `viz[i] = 0` daca `i` nu a fost vizitat.

```cpp
int BFS(int x)
{
    int i, prim, ultim;
    // vizitam varful de start
    viz[x] = 1;
    // initializam coada cu varful de start
    C[0] = x;
    prim = ultim = 0;
    while (prim <= ultim) // cat timp coada nu este vida
    {
        // extragem un element din coada
        x = C[prim++];
        // parcurgem lista de adiacenta a varfului x
        for (i = 1; i <= A[x][0]; i++)
            if (!viz[A[x][i]])
            {
                // A[x][i] este un vecin nevizitat al lui x
                // il plasam in cealalta multime decat x
                viz[A[x][i]] = 3 - viz[x];
                // il plasam in coada
                C[++ultim] = A[x][i];
            }
            else
                /* varful este vizitat, verificam daca este
                   plasat in aceeasi multime cu x */
                if (viz[A[x][i]] == viz[x])
                    return 0;
    }
    return 1;
}
```

In functia `main()` apelam functia de parcurgere pentru fiecare varf nevizitat:

```cpp
int x, ok = 1;
for (x = 1; x <= n && ok; x++)
    if (!viz[x])
        ok = ok && BFS(x);

if (ok) printf("Graful este bipartit\n");
else printf("Graful nu este bipartit\n");
```

---

### Aciclic

Fie `G` un graf neorientat. Sa se verifice daca graful `G` este **aciclic** (nu contine
cicluri).

**Solutie.** O prima solutie ar fi sa construim matricea inchiderii tranzitive a grafului `G`
si apoi sa verificam daca am obtinut valoarea `1` pe diagonala principala (caz in care graful
contine cicluri). O astfel de abordare are complexitatea `O(n^3)`.

O solutie mai eficienta este de a reprezenta graful prin liste de adiacenta si de a realiza o
parcurgere in adancime a grafului.

Daca in timpul parcurgerii in adancime intalnim un vecin `y` al varfului curent `x` care a mai
fost deja vizitat, exista doua cazuri posibile:

- `y` este varful **parinte** al varfului curent `x`;
- `y` este un varf care a fost vizitat in prealabil (deci exista un lant de la `y` la `x`) si
  exista muchie de la `x` la `y`; in concluzie, din lantul `[y, ..., x]` si muchia `[x, y]` se
  formeaza un **ciclu**.

Vom modifica functia de parcurgere in adancime pentru a detecta ciclurile astfel:

- functia va returna valoarea `1` daca multimea varfurilor accesibile din varful de start
  genereaza un subgraf aciclic si respectiv `0` in caz contrar;
- functia va avea un parametru suplimentar (pe langa varful curent, vom transmite ca parametru
  si varful parinte al varfului curent, pentru a putea face diferenta intre cele doua cazuri
  posibile).

```cpp
int DFS(int x, int px)
{
    int i;
    viz[x] = 1;
    for (i = 1; i <= A[x][0]; i++)
        if (!viz[A[x][i]])
        {
            if (!DFS(A[x][i], x))
                return 0;
        }
        else
            if (px != A[x][i])
                return 0;
    return 1;
}
```

Deoarece este posibil ca nu toate varfurile grafului sa fie accesibile din varful de start, in
functia `main()` va trebui sa apelam functia de parcurgere de mai multe ori, o data pentru
fiecare varf nevizitat identificat:

```cpp
int x, ok = 1;
for (x = 1; x <= n && ok; x++)
    if (!viz[x])
        ok = ok && DFS(x, -1);

if (ok) printf("Graful este aciclic\n");
else printf("Graful nu este aciclic\n");
```

---

## Exercitii propuse

1. Se da graful din figura urmatoare (13 varfuri). Sa se parcurga acest graf in adancime si in
   latime incepand din varful `5`.
2. Dati exemplu de un graf pentru care parcurgerea in latime coincide cu parcurgerea in
   adancime (ambele parcurgeri avand drept varf de start varful `1`).
3. Sa consideram urmatoarele secvente de varfuri obtinute prin parcurgerea in adancime,
   respectiv in latime a unui graf orientat cu 7 varfuri. Dati exemplu de un graf orientat prin
   a carui parcurgere in adancime si apoi in latime sa obtinem secventele specificate.
   - Parcurgere in adancime: `1, 2, 3, 5, 7, 6, 4`
   - Parcurgere in latime: `1, 2, 3, 4, 5, 6, 7`
4. Sa consideram ca, dupa o parcurgere in latime modificata astfel incat vectorul `viz` sa
   permita reconstituirea celui mai scurt drum de la varful `7` la varful `2`, continutul
   vectorului `viz` este:

   | i | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
   | --- | - | - | - | - | - | - | - | - | - |
   | **viz[i]** | 2 | -1 | 5 | 1 | 2 | 3 | 8 | 3 | 8 |

   Care este lungimea celui mai scurt drum de la `7` la `2`?
5. Se considera un graf neorientat complet reprezentat prin matrice de adiacenta. Care dintre
   urmatoarele afirmatii sunt adevarate:
   **a.** Parcurgerea in latime coincide cu parcurgerea in adancime a grafului, indiferent de
   varful de start.
   **b.** Pentru a parcurge toate varfurile grafului, functia de parcurgere in latime trebuie
   apelata de mai multe ori.
   **c.** Parcurgand graful in adancime, incepand din varful `1`, se obtin varfurile in ordinea
   crescatoare a numerelor lor.
6. Implementati parcurgerea in adancime si parcurgerea in latime a unui graf reprezentat prin
   matrice de adiacenta.
7. Testati daca un graf este bipartit utilizand parcurgerea in adancime.
8. Scrieti o functie care sa determine numarul de varfuri accesibile dintr-un varf specificat
   al unui graf neorientat.
