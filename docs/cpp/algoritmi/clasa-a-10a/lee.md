# Algoritmul lui Lee

Un soricel a intrat intr-un labirint. Undeva, in alta camera, il asteapta o bucata de branza. Soricelul se poate muta doar in celula de deasupra, de dedesubt, din stanga sau din dreapta — niciodata in diagonala si niciodata printr-un zid.

**Care este numarul minim de pasi pana la branza?**

Algoritmul care raspunde la aceasta intrebare se numeste **algoritmul lui Lee**. Este acelasi algoritm care gaseste drumul unui robot printre obstacole, traseul unui fir pe o placa electronica sau drumul unui personaj pe harta unui joc.

---

## Problema, in termeni de matrice

Labirintul este o matrice cu `n` linii si `m` coloane:

- `a[i][j] = 0` — celula este **libera**, se poate trece prin ea;
- `a[i][j] = 1` — celula este **zid**.

Soricelul se afla pe pozitia `(ls, cs)`, iar branza pe pozitia `(lb, cb)`. Dintr-o celula se poate trece doar in cei **4 vecini** ai ei, daca acestia sunt in interiorul matricei si nu sunt ziduri.

Labirintul cu care vom lucra in toata lectia are `n = 5` linii si `m = 6` coloane:

```
S . . . . .
# # # # . .
. . . . . .
. # # # # .
B . . . . .
```

Soricelul este in `(1, 1)`, iar branza in `(5, 1)`. Cele doua ziduri lasa cate un singur culoar de trecere: linia `2` poate fi traversata doar prin coloanele `5` si `6`, iar linia `4` doar prin coloanele `1` si `6`.

---

## De ce nu merge "mergi mereu spre branza"

Prima idee care vine in minte este sa mergem, la fiecare pas, in directia care ne apropie de branza. Branza este cu 4 linii mai jos, pe aceeasi coloana, deci am incerca sa coboram de patru ori.

Nu se poate: chiar primul pas in jos ne-ar duce in `(2, 1)`... care este zid. Metoda se blocheaza imediat, desi drumul exista.

Raspunsul corect este `12` pasi: soricelul trebuie sa mearga **mai intai in directia opusa**, spre dreapta pana in coloana `5`, sa coboare pe acolo doua linii si abia apoi sa se intoarca spre stanga.

> [!IMPORTANT] Important
> Nicio regula care se uita doar la celula curenta nu poate rezolva problema. Zidul de care te lovesti la pasul 2 poate depinde de o alegere facuta la pasul 1. Singura solutie este sa **exploram sistematic** tot labirintul.

---

## Ideea algoritmului: unda

Imagineaza-ti ca in celula soricelului cade o picatura de apa. Unda pe care o produce se raspandeste in cercuri:

- prima data ajunge in celulele vecine soricelului — cele la **1 pas**;
- apoi in vecinii acelora, inca neatinsi — cele la **2 pasi**;
- apoi in vecinii acelora — cele la **3 pasi**;
- si asa mai departe, ocolind zidurile.

Cand unda atinge branza, stim exact cati pasi are drumul minim, pentru ca unda inainteaza cu cate un pas o data si nu poate ajunge undeva "mai devreme decat trebuie".

Folosim o a doua matrice, `d`, in care retinem aceste numere:

- `d[i][j] = 0` inseamna **celula nemarcata inca** (unda nu a ajuns la ea);
- `d[i][j] > 0` inseamna ca unda a ajuns acolo, iar valoarea spune al catelea inel este.

Pentru labirintul nostru, matricea `d` completa arata asa:

```
 1  2  3  4  5  6
 0  0  0  0  6  7
11 10  9  8  7  8
12  0  0  0  0  9
13 14 13 12 11 10
```

Celulele de zid raman `0`, iar branza din `(5, 1)` primeste `13`. Se vede si cum unda **serpuieste**: coboara prin coloanele `5` si `6`, se intinde spre stanga pe linia `3`, apoi coboara pe coloana `1` si revine spre dreapta pe linia `5`.

> [!IMPORTANT] De ce este esentiala coada
> Ca sa marchezi corect inelul `3`, trebuie sa fi terminat **tot** inelul `2`. Asadar celulele trebuie prelucrate **exact in ordinea in care unda le-a atins** — primele atinse, primele prelucrate. Aceasta este regula FIFO, deci structura de care avem nevoie este [coada](/cpp/algoritmi/clasa-a-10a/coada).

---

## Vezi unda cum inainteaza

Apasa **Ruleaza** ca sa vezi unda in miscare, sau **Inainte** ca sa avansezi manual. Vizualizatorul merge **celula cu celula**: intai scoate o pozitie din coada (chenar rosu), apoi verifica pe rand cate una dintre cele 4 directii — sageata din coltul celulei arata directia testata chiar acum:

- chenar **verde** — vecinul este in labirint, nu este zid si nu este marcat, deci primeste un numar si intra la sfarsitul cozii;
- chenar **punctat rosu** — vecinul a picat unul dintre teste (este zid sau este deja marcat);
- niciun chenar nou — directia ar duce in afara labirintului.

<LeeVisual
  harta="S....|.###.|....B"
  titlu="Labirint simplu: unda ocoleste zidul pe deasupra si pe dedesubt"
/>

Observa doua lucruri:

- celulele cu acelasi numar formeaza un **inel** in jurul soricelului;
- coada nu contine niciodata numere care difera cu mai mult de `1` — exact asta garanteaza ca inelele se completeaza in ordine.

---

## Datele necesare in program

| Ce retinem | Cum |
|------------|-----|
| labirintul | `int a[103][103]` — `0` liber, `1` zid |
| distantele | `int d[103][103]` — `0` = nemarcata |
| cele 4 directii | `dLin[5]` si `dCol[5]` |
| celulele de prelucrat | o coada de pozitii |

Vectorii de deplasare sunt cei cunoscuti de la [vecinii unei celule din matrice](/cpp/algoritmi/clasa-a-9a/matrici/vecini-in-matrice):

```cpp
int dLin[5] = {0, -1, 1, 0, 0};
int dCol[5] = {0, 0, 0, -1, 1};
```

Coada trebuie sa retina **celule**, adica perechi de doua numere. Grupam cele doua numere intr-un [struct](/cpp/algoritmi/clasa-a-10a/struct):

```cpp
struct Pozitie
{
    int lin, col;
};

Pozitie c[10005];
int primul, ultimul;
```

Sunt exact operatiile de coada din lectia precedenta, doar ca elementele nu mai sunt numere intregi, ci pozitii:

```cpp
// push: adaugam pozitia (il, ic) la sfarsitul cozii
ultimul++;
c[ultimul].lin = il;
c[ultimul].col = ic;

// front + pop: luam pozitia din fata si o scoatem
i = c[primul].lin;
j = c[primul].col;
primul++;
```

> [!NOTE] Observatie
> `10005` este dimensiunea cozii, nu a labirintului. In coada intra **fiecare celula libera exact o data**, deci pentru un labirint de `100 x 100` avem nevoie de cel mult `10000` de pozitii.

---

## Atentie la valoarea de pornire

Marcam celula soricelului cu `1`, **nu** cu `0`:

```cpp
d[ls][cs] = 1;
```

> [!WARNING] Atentie
> In matricea `d`, valoarea `0` este deja folosita cu sensul "celula nemarcata". Daca am pune `d[ls][cs] = 0`, soricelul ar arata ca o celula prin care unda nu a trecut, iar algoritmul l-ar marca din nou mai tarziu.
>
> Consecinta: `d[i][j]` numara **celulele** drumului, nu pasii. Un drum de `13` celule are `12` pasi, deci raspunsul final este `d[lb][cb] - 1`.

---

## Algoritmul, pas cu pas

### 1. Initializarea

Punem soricelul in coada si il marcam:

```cpp
primul = 1;
ultimul = 1;
c[1].lin = ls;
c[1].col = cs;
d[ls][cs] = 1;
```

### 2. Prelucrarea cozii

Cat timp coada nu este vida, scoatem celula din fata si ii cautam vecinii:

```cpp
while (primul <= ultimul)
{
    i = c[primul].lin;
    j = c[primul].col;
    primul++;

    // ... verificam cei 4 vecini ai lui (i, j)
}
```

### 3. Cele trei conditii pentru un vecin

Un vecin `(il, ic)` primeste numar si intra in coada doar daca trece **toate** cele trei teste:

1. este **in interiorul** matricei: `il >= 1 && il <= n && ic >= 1 && ic <= m`;
2. nu este **zid**: `a[il][ic] == 0`;
3. nu a fost **deja marcat**: `d[il][ic] == 0`.

```cpp
for (k = 1; k <= 4; k++)
{
    il = i + dLin[k];
    ic = j + dCol[k];
    if (il >= 1 && il <= n && ic >= 1 && ic <= m)
    {
        if (a[il][ic] == 0 && d[il][ic] == 0)
        {
            d[il][ic] = d[i][j] + 1;
            ultimul++;
            c[ultimul].lin = il;
            c[ultimul].col = ic;
        }
    }
}
```

> [!WARNING] Atentie
> Marcam vecinul **in momentul in care il punem** in coada, nu cand il scoatem. Altfel, o celula cu doi vecini deja marcati ar intra de doua ori in coada, apoi de si mai multe ori — coada s-ar umple si programul ar da rezultate gresite.

---

## Program complet: lungimea drumului minim

```cpp
#include <iostream>
using namespace std;

struct Pozitie
{
    int lin, col;
};

int a[103][103];       // 0 = celula libera, 1 = zid
int d[103][103];       // distanta de la soricel; 0 = celula nemarcata
Pozitie c[10005];      // coada de pozitii
int primul, ultimul;
int n, m, i, j, k, il, ic;
int ls, cs, lb, cb;    // pozitia soricelului si pozitia branzei
int dLin[5] = {0, -1, 1, 0, 0};
int dCol[5] = {0, 0, 0, -1, 1};

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
    cin >> ls >> cs;
    cin >> lb >> cb;

    primul = 1;
    ultimul = 1;
    c[1].lin = ls;
    c[1].col = cs;
    d[ls][cs] = 1;

    while (primul <= ultimul)
    {
        i = c[primul].lin;
        j = c[primul].col;
        primul++;

        for (k = 1; k <= 4; k++)
        {
            il = i + dLin[k];
            ic = j + dCol[k];
            if (il >= 1 && il <= n && ic >= 1 && ic <= m)
            {
                if (a[il][ic] == 0 && d[il][ic] == 0)
                {
                    d[il][ic] = d[i][j] + 1;
                    ultimul++;
                    c[ultimul].lin = il;
                    c[ultimul].col = ic;
                }
            }
        }
    }

    for (i = 1; i <= n; i++)
    {
        for (j = 1; j <= m; j++)
        {
            cout << d[i][j] << " ";
        }
        cout << endl;
    }

    if (d[lb][cb] == 0)
        cout << -1 << endl;
    else
        cout << d[lb][cb] - 1 << endl;
    return 0;
}
```

**Intrare:**

```
5 6
0 0 0 0 0 0
1 1 1 1 0 0
0 0 0 0 0 0
0 1 1 1 1 0
0 0 0 0 0 0
1 1
5 1
```

**Afisare:**

```
1 2 3 4 5 6 
0 0 0 0 6 7 
11 10 9 8 7 8 
12 0 0 0 0 9 
13 14 13 12 11 10 
12
```

> [!NOTE] Observatie
> Branza din `(5, 1)` are `d = 13`, deci drumul minim are `13 - 1 = 12` pasi — desi in linie dreapta ar fi fost la doar `4` pasi. Cele doua ziduri obliga soricelul sa se abata de doua ori, prin cele doua culoare inguste.

> [!TIP] Sfat
> Cea mai mare valoare din matrice nu este neaparat cea a destinatiei. Aici maximul este `14`, in `(5, 2)` — celula cea mai "greu de atins" din tot labirintul, desi este chiar langa branza.

---

## Acelasi labirint, pas cu pas

Ruleaza vizualizatorul de mai jos pana la capat: dupa ce coada se goleste si toate distantele sunt completate, algoritmul reconstituie drumul, iar soricelul il parcurge pana la branza.

<LeeVisual
  harta="S.....|####..|......|.####.|B....."
  titlu="Labirintul din program: 4 pasi in linie dreapta, 12 pasi in realitate"
/>

---

## Reconstituirea drumului

Pana acum stim **cati** pasi are drumul. Ca sa aflam si **care** sunt celulele lui, ne folosim de o proprietate a matricei `d`:

> Daca o celula are `d = t`, atunci cel putin unul dintre vecinii ei liberi are `d = t - 1`, iar acel vecin este pasul dinaintea ei pe un drum minim.

Deci pornim **de la branza** si mergem inapoi, de fiecare data catre un vecin cu numarul mai mic cu `1`, pana ajungem la celula cu `d = 1`, adica la soricel:

```cpp
i = lb;
j = cb;

while (d[i][j] > 1)
{
    for (k = 1; k <= 4; k++)
    {
        il = i + dLin[k];
        ic = j + dCol[k];
        if (il >= 1 && il <= n && ic >= 1 && ic <= m)
        {
            if (d[il][ic] == d[i][j] - 1)
            {
                urmLin = il;
                urmCol = ic;
            }
        }
    }
    i = urmLin;
    j = urmCol;
}
```

Drumul iese insa **invers**, de la branza spre soricel. Trucul de afisare: retinem fiecare celula intr-un vector `drum`, pe pozitia data chiar de `d[i][j]`.

```cpp
drum[d[i][j]].lin = i;
drum[d[i][j]].col = j;
```

Astfel soricelul ajunge pe `drum[1]`, iar branza pe `drum[d[lb][cb]]` — parcurgem vectorul crescator si drumul se afiseaza in ordinea fireasca, fara sa mai inversam nimic.

> [!TIP] Sfat
> Nu folosim `break` in `for`-ul care cauta vecinul potrivit. Retinem candidatul in `urmLin` si `urmCol` si facem atribuirea `i = urmLin` **dupa** ce `for`-ul s-a terminat. Daca am modifica `i` si `j` chiar in interiorul lui, restul directiilor s-ar calcula fata de celula gresita.

### Program complet: afisarea drumului

```cpp
#include <iostream>
using namespace std;

struct Pozitie
{
    int lin, col;
};

int a[103][103];
int d[103][103];
Pozitie c[10005];      // coada de pozitii
Pozitie drum[10005];   // celulele drumului minim
int primul, ultimul;
int n, m, i, j, k, p, il, ic, urmLin, urmCol;
int ls, cs, lb, cb;
int dLin[5] = {0, -1, 1, 0, 0};
int dCol[5] = {0, 0, 0, -1, 1};

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
    cin >> ls >> cs;
    cin >> lb >> cb;

    primul = 1;
    ultimul = 1;
    c[1].lin = ls;
    c[1].col = cs;
    d[ls][cs] = 1;

    while (primul <= ultimul)
    {
        i = c[primul].lin;
        j = c[primul].col;
        primul++;

        for (k = 1; k <= 4; k++)
        {
            il = i + dLin[k];
            ic = j + dCol[k];
            if (il >= 1 && il <= n && ic >= 1 && ic <= m)
            {
                if (a[il][ic] == 0 && d[il][ic] == 0)
                {
                    d[il][ic] = d[i][j] + 1;
                    ultimul++;
                    c[ultimul].lin = il;
                    c[ultimul].col = ic;
                }
            }
        }
    }

    if (d[lb][cb] == 0)
    {
        cout << -1 << endl;
        return 0;
    }

    // pornim de la branza si coboram, din vecin in vecin, catre d = 1
    i = lb;
    j = cb;
    drum[d[i][j]].lin = i;
    drum[d[i][j]].col = j;

    while (d[i][j] > 1)
    {
        for (k = 1; k <= 4; k++)
        {
            il = i + dLin[k];
            ic = j + dCol[k];
            if (il >= 1 && il <= n && ic >= 1 && ic <= m)
            {
                if (d[il][ic] == d[i][j] - 1)
                {
                    urmLin = il;
                    urmCol = ic;
                }
            }
        }
        i = urmLin;
        j = urmCol;
        drum[d[i][j]].lin = i;
        drum[d[i][j]].col = j;
    }

    cout << d[lb][cb] - 1 << endl;
    for (p = 1; p <= d[lb][cb]; p++)
    {
        cout << drum[p].lin << " " << drum[p].col << endl;
    }
    return 0;
}
```

**Intrare:**

```
5 6
0 0 0 0 0 0
1 1 1 1 0 0
0 0 0 0 0 0
0 1 1 1 1 0
0 0 0 0 0 0
1 1
5 1
```

**Afisare:**

```
12
1 1
1 2
1 3
1 4
1 5
2 5
3 5
3 4
3 3
3 2
3 1
4 1
5 1
```

**Intrare:**

```
3 5
0 0 0 0 0
0 1 1 1 0
0 0 0 0 0
1 1
3 5
```

**Afisare:**

```
6
1 1
2 1
3 1
3 2
3 3
3 4
3 5
```

> [!NOTE] Observatie
> Prima celula afisata este intotdeauna soricelul, iar ultima este branza. Numarul de linii afisate este cu `1` mai mare decat numarul de pasi, pentru ca `12` pasi inseamna `13` celule vizitate.

---

## Cand branza nu poate fi atinsa

Daca zidurile inconjoara complet branza, unda nu ajunge niciodata la ea: coada se goleste, `while`-ul se opreste, iar `d[lb][cb]` a ramas `0`. Exact acesta este testul pe care il facem la final:

```cpp
if (d[lb][cb] == 0)
    cout << -1 << endl;
else
    cout << d[lb][cb] - 1 << endl;
```

<LeeVisual
  harta="S....|..###|..#B#|..###"
  titlu="Branza este inchisa complet: unda se opreste, raspunsul este -1"
/>

**Intrare:**

```
4 5
0 0 0 0 0
0 0 1 1 1
0 0 1 0 1
0 0 1 1 1
1 1
3 4
```

**Afisare:**

```
1 2 3 4 5 
2 3 0 0 0 
3 4 0 0 0 
4 5 0 0 0 
-1
```

> [!WARNING] Atentie
> Nu confunda cele doua situatii in care `d[i][j]` ramane `0`: o celula poate fi zid, sau poate fi libera dar imposibil de atins. In ambele cazuri raspunsul este `-1`, dar din motive diferite.

---

## De ce coada, si nu stiva?

Ambele structuri ar termina programul si ar marca toate celulele accesibile. Diferenta este **ordinea** in care se face marcarea:

| | Coada (FIFO) | Stiva (LIFO) |
|---|---|---|
| ce se prelucreaza intai | celula atinsa cel mai devreme | celula atinsa cel mai recent |
| cum inainteaza | in **inele**, un pas o data | pe un **drum lung**, pana se infunda |
| ce numere obtii | distante **minime** | lungimea unui drum oarecare |

Cu o [stiva](/cpp/algoritmi/clasa-a-10a/stiva) soricelul ar porni intr-o directie si ar merge cat poate de departe inainte sa incerce alta varianta. Ar ajunge si asa la branza, dar numarul obtinut ar fi lungimea drumului pe care s-a nimerit sa mearga, nu a celui mai scurt.

> [!IMPORTANT] Important
> Coada nu este un detaliu de implementare al algoritmului lui Lee — ea **este** algoritmul. Daca inlocuiesti coada cu o stiva, nu obtii un Lee mai lent, ci un cu totul alt algoritm, care rezolva alta problema.

---

## Recap

- **Algoritmul lui Lee** gaseste numarul minim de pasi dintr-o celula in alta, intr-o matrice cu obstacole.
- Se foloseste o matrice `d` de distante, in care `0` inseamna "celula nemarcata". De aceea celula de start primeste `1`, iar raspunsul final este `d[lb][cb] - 1`.
- Celulele de prelucrat se tin intr-o **coada** de `Pozitie`. Ordinea FIFO garanteaza ca unda inainteaza in inele si ca fiecare celula primeste distanta **minima**.
- Un vecin intra in coada doar daca trece trei teste: este **in matrice**, nu este **zid**, nu este **deja marcat**.
- Marcarea se face **la introducerea in coada**, altfel aceeasi celula ar intra de mai multe ori.
- **Drumul** se reconstituie de la final spre inceput, mergand mereu catre un vecin cu `d` mai mic cu `1`.
- Daca `d[lb][cb]` a ramas `0` dupa golirea cozii, destinatia este **inaccesibila**.
