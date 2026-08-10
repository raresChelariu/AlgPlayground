# Algoritmi de fill

Intr-un editor de imagini exista unealta "galeata de vopsea": dai click intr-o zona, iar toate celulele vecine de aceeasi culoare se umplu deodata cu culoarea noua. Restul imaginii, de alta culoare, ramane neschimbat.

Aceeasi idee apare des la probleme cu matrice de `0` si `1`: o fotografie de satelit codificata ca matrice, in care `0` inseamna apa si `1` inseamna uscat. **Cate insule contine fotografia?**

---

## Problema, in termeni de matrice

Matricea are `n` linii si `m` coloane:

- `a[i][j] = 0` — celula este **apa**;
- `a[i][j] = 1` — celula este **uscat**.

O **insula** este un grup de celule cu `1`, legate intre ele prin vecini directi — sus, jos, stanga sau dreapta — niciodata pe diagonala. Doua celule cu `1` fac parte din aceeasi insula daca poti trece de la una la cealalta mergand, pas cu pas, doar prin celule cu `1` alaturate.

```
1 1 0 0 0
1 0 0 1 0
0 0 1 0 0
0 0 0 0 1
```

Aceasta matrice contine **4 insule**: blocul din coltul stanga-sus (`3` celule), celula singura `(2, 4)`, celula singura `(3, 3)` si celula singura `(4, 5)`. Celulele `(3, 3)` si `(2, 4)` sunt vecine in diagonala, dar apartin unor insule **diferite** — legatura pe diagonala nu conteaza.

> [!NOTE] Observatie
> Ca sa vezi daca doua celule fac parte din aceeasi insula, cauta un drum intre ele care trece doar prin celule cu `1`, pas cu pas, prin vecini directi. Daca un asemenea drum exista, cele doua celule sunt in aceeasi insula; daca nu, sunt in insule diferite.

---

## De ce nu e de-ajuns sa numaram celulele cu 1

O prima idee, gresita, ar fi sa numaram direct celulele cu `1`. Nu functioneaza: o insula mare are multe celule cu `1`, dar tot **o singura** insula.

De exemplu, o matrice cu `7` celule de uscat poate avea doar **2 insule**, daca `5` dintre ele formeaza un bloc conectat, iar celelalte `2` formeaza un al doilea bloc, separat de primul.

> [!IMPORTANT] Important
> Ca sa numaram insulele corect, trebuie mai intai sa **grupam** celulele de uscat in insulele din care fac parte, nu sa le numaram individual.

---

## Ideea algoritmului: umplere cu coada

Ideea este aceeasi ca la [algoritmul lui Lee](/cpp/algoritmi/clasa-a-10a/lee): pornim dintr-o celula si ne raspandim, pas cu pas, catre vecinii ei buni, folosind o **coada**.

Diferenta: la Lee conta **la ce distanta** ajunge unda, pentru ca voiam drumul minim catre o tinta anume. Aici nu ne intereseaza nicio distanta — vrem doar sa stim **ce celule apartin aceleiasi insule**. Folosim o matrice `viz`, paralela cu `d` de la Lee, dar cu un singur bit de informatie:

- `viz[i][j] = 0` — celula **nu a fost inca vizitata**;
- `viz[i][j] = 1` — celula **a fost deja vizitata** (face parte dintr-o insula deja gasita).

Parcurgem toata matricea, celula cu celula. De fiecare data cand gasim o celula cu `a[i][j] = 1` si `viz[i][j] = 0`, am dat peste o insula **noua**: o "umplem" complet, adica marcam prin coada toate celulele ei, ca sa nu o mai numaram a doua oara cand parcurgerea ajunge la celelalte celule ale ei.

> [!NOTE] Observatie
> La Lee, ordinea in care coada prelucra celulele era esentiala — garanta distanta minima. Aici ordinea nu mai conteaza deloc: coada e folosita doar pentru ca stim deja sa lucram cu ea, nu pentru vreo proprietate speciala a ei.

> [!IMPORTANT] Important
> O insula trebuie umpluta **complet** inainte sa continuam cautarea prin restul matricei. Daca ne-am opri la jumatate, am regasi mai tarziu celelalte celule ale aceleiasi insule si am numara-o de mai multe ori.

---

## Datele necesare in program

| Ce retinem | Cum |
|------------|-----|
| harta | `int a[103][103]` — `0` apa, `1` uscat |
| celulele vizitate | `int viz[103][103]` — `0` = nevizitata |
| cele 4 directii | `dLin[5]` si `dCol[5]`, [ca la Lee](/cpp/algoritmi/clasa-a-10a/lee#datele-necesare-in-program) |
| celulele de prelucrat | o [coada](/cpp/algoritmi/clasa-a-10a/coada) de pozitii |

Refolosim neschimbate `struct Pozitie` si `struct Coada` din lectia despre Lee:

```cpp
struct Pozitie
{
    int lin, col;
};

struct Coada
{
    Pozitie v[10005];
    int primul = 1, ultimul = 0;

    void push(Pozitie p)
    {
        ultimul++;
        v[ultimul] = p;
    }

    Pozitie pop()
    {
        Pozitie rezultat;
        rezultat = v[primul];
        primul++;
        return rezultat;
    }

    Pozitie first()
    {
        return v[primul];
    }

    bool areElemente()
    {
        return primul <= ultimul;
    }
};
```

> [!NOTE] Observatie
> Aceste doua struct-uri sunt identice cu cele din lectia despre Lee. Daca le-ai inteles acolo, aici le refolosim exact la fel — nimic nou de retinut despre ele.

---

## Umplerea unei insule, pas cu pas

### 1. Initializarea

Punem celula de start in coada si o marcam vizitata:

```cpp
p.lin = linStart;
p.col = colStart;
c.push(p);
viz[linStart][colStart] = 1;
```

### 2. Prelucrarea cozii

Cat timp coada mai are elemente, scoatem celula din fata si ii cautam vecinii:

```cpp
while (c.areElemente())
{
    p = c.pop();
    i = p.lin;
    j = p.col;

    // ... verificam cei 4 vecini ai lui (i, j)
}
```

### 3. Cele trei conditii pentru un vecin

Un vecin `(il, ic)` este adaugat in coada doar daca trece toate cele trei teste — aceleasi ca la Lee, doar a doua conditie s-a schimbat (uscat in loc de "nu e zid"):

1. este **in interiorul** matricei: `il >= 1 && il <= n && ic >= 1 && ic <= m`;
2. este **uscat**: `a[il][ic] == 1`;
3. nu a fost **deja vizitat**: `viz[il][ic] == 0`.

```cpp
for (k = 1; k <= 4; k++)
{
    il = i + dLin[k];
    ic = j + dCol[k];
    if (il >= 1 && il <= n && ic >= 1 && ic <= m)
    {
        if (a[il][ic] == 1 && viz[il][ic] == 0)
        {
            viz[il][ic] = 1;
            vecin.lin = il;
            vecin.col = ic;
            c.push(vecin);
        }
    }
}
```

> [!WARNING] Atentie
> Marcam `viz[il][ic] = 1` **in momentul in care punem vecinul in coada**, nu cand il scoatem — exact ca la Lee. Altfel, o celula cu doi vecini deja marcati ar intra de doua ori in coada.

---

## O functie separata pentru fiecare insula

La Lee exista o singura umplere cu coada, pornita o singura data din celula soricelului. Aici avem nevoie de **cate o umplere separata pentru fiecare insula**, deci grupam pasii de mai sus intr-o functie `umple`, apelata o data pentru fiecare insula noua gasita:

```cpp
void umple(int linStart, int colStart)
{
    p.lin = linStart;
    p.col = colStart;
    c.push(p);
    viz[linStart][colStart] = 1;

    while (c.areElemente())
    {
        p = c.pop();
        i = p.lin;
        j = p.col;

        for (k = 1; k <= 4; k++)
        {
            il = i + dLin[k];
            ic = j + dCol[k];
            if (il >= 1 && il <= n && ic >= 1 && ic <= m)
            {
                if (a[il][ic] == 1 && viz[il][ic] == 0)
                {
                    viz[il][ic] = 1;
                    vecin.lin = il;
                    vecin.col = ic;
                    c.push(vecin);
                }
            }
        }
    }
}
```

> [!WARNING] Atentie
> `umple` foloseste variabilele globale `i`, `j`, `k`, `il`, `ic` pentru prelucrarea cozii — la fel ca la Lee. Insa aceasta functie va fi apelata din **interiorul** unei bucle duble care parcurge toata matricea (mai jos). Daca acea bucla ar folosi tot `i` si `j` ca variabile de parcurgere, apelul `umple(i, j)` le-ar suprascrie inainte ca bucla din `main` sa continue, si parcurgerea ar sari peste celule sau ar relua altele.
>
> Solutia: doua perechi de variabile cu roluri diferite — `lin` si `col` pentru parcurgerea intregii matrice, `i` si `j` pentru prelucrarea cozii in interiorul lui `umple`.

> [!TIP] Sfat
> Coada `c` nu trebuie golita sau reinitializata intre doua insule. Dupa ce `umple` termina o insula, coada e deja "vida" in sensul lui `areElemente()` (`primul > ultimul`), asa ca urmatorul apel poate continua sa adauge in coada de unde a ramas. Marimea `v[10005]` este suficienta pentru **toata matricea**, nu pentru o singura insula — fiecare celula de uscat intra in coada o singura data in tot programul, la fel ca la Lee.

---

## Numararea insulelor: parcurgere + apel de umplere

Parcurgem toata matricea. La orice celula de uscat inca nevizitata, am gasit o insula noua: marim numaratorul si o umplem.

```cpp
nrInsule = 0;
for (lin = 1; lin <= n; lin++)
{
    for (col = 1; col <= m; col++)
    {
        if (a[lin][col] == 1 && viz[lin][col] == 0)
        {
            nrInsule++;
            umple(lin, col);
        }
    }
}
```

> [!IMPORTANT] Important
> Aici folosim `lin`/`col`, nu `i`/`j`, exact din motivul explicat mai sus: `umple` modifica `i` si `j` cat timp goleste coada, deci bucla de parcurgere are nevoie de variabile proprii, neatinse de apelul catre `umple`.

---

## Program complet: numararea insulelor

```cpp
#include <iostream>
using namespace std;

struct Pozitie
{
    int lin, col;
};

struct Coada
{
    Pozitie v[10005];
    int primul = 1, ultimul = 0;

    void push(Pozitie p)
    {
        ultimul++;
        v[ultimul] = p;
    }

    Pozitie pop()
    {
        Pozitie rezultat;
        rezultat = v[primul];
        primul++;
        return rezultat;
    }

    Pozitie first()
    {
        return v[primul];
    }

    bool areElemente()
    {
        return primul <= ultimul;
    }
};

int a[103][103];       // 0 = apa, 1 = uscat
int viz[103][103];     // 0 = nevizitata, 1 = vizitata
Coada c;
Pozitie p, vecin;
int n, m, i, j, k, il, ic, lin, col, nrInsule;
int dLin[5] = {0, -1, 1, 0, 0};
int dCol[5] = {0, 0, 0, -1, 1};

void umple(int linStart, int colStart)
{
    p.lin = linStart;
    p.col = colStart;
    c.push(p);
    viz[linStart][colStart] = 1;

    while (c.areElemente())
    {
        p = c.pop();
        i = p.lin;
        j = p.col;

        for (k = 1; k <= 4; k++)
        {
            il = i + dLin[k];
            ic = j + dCol[k];
            if (il >= 1 && il <= n && ic >= 1 && ic <= m)
            {
                if (a[il][ic] == 1 && viz[il][ic] == 0)
                {
                    viz[il][ic] = 1;
                    vecin.lin = il;
                    vecin.col = ic;
                    c.push(vecin);
                }
            }
        }
    }
}

int main()
{
    cin >> n >> m;
    for (i = 1; i <= n; i++)
    {
        for (j = 1; j <= m; j++)
        {
            cin >> a[i][j];
        }
    }

    nrInsule = 0;
    for (lin = 1; lin <= n; lin++)
    {
        for (col = 1; col <= m; col++)
        {
            if (a[lin][col] == 1 && viz[lin][col] == 0)
            {
                nrInsule++;
                umple(lin, col);
            }
        }
    }

    cout << nrInsule << endl;
    return 0;
}
```

**Intrare:**

```
5 6
1 1 0 0 1 0
1 0 0 0 0 0
0 0 1 0 0 1
0 0 0 0 0 1
1 0 0 1 0 0
```

**Afisare:**

```
6
```

> [!NOTE] Observatie
> Cele `6` insule sunt: blocul `(1, 1)`-`(1, 2)`-`(2, 1)` din stanga-sus, celula singura `(1, 5)`, celula singura `(3, 3)`, blocul `(3, 6)`-`(4, 6)` din dreapta, celula singura `(5, 1)` si celula singura `(5, 4)`.

---

## Recap

- **Fill** (umplere) inseamna marcarea tuturor celulelor unei insule, pornind dintr-o celula data, refolosind coada de la [algoritmul lui Lee](/cpp/algoritmi/clasa-a-10a/lee).
- Spre deosebire de Lee, aici nu calculam nicio distanta — matricea `viz` retine doar daca o celula a fost sau nu vizitata.
- Tiparul general: o parcurgere dubla a matricei, iar la fiecare celula de interes inca nevizitata, o umplere completa de acolo, urmata de numarare.
- Cele trei conditii ale unui vecin raman aceleasi ca la Lee: **in matrice**, **valoare buna** (aici, uscat), **nevizitat**. Marcarea se face tot la introducerea in coada, nu la extragere.
- Cand o functie de umplere e apelata dintr-o bucla care parcurge toata matricea, foloseste doua perechi de variabile distincte — una pentru parcurgere, alta pentru prelucrarea din interiorul functiei — ca sa nu se suprascrie reciproc.
