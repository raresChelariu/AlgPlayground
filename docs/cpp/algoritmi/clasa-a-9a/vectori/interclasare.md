# Interclasare

Avem doi vectori `A` si `B`, fiecare **deja sortat crescator**. Vrem un al treilea vector `C` care contine toate elementele lor si care este, la randul lui, sortat crescator.

Solutia evidenta ar fi sa copiem `A` si `B` unul dupa altul in `C` si apoi sa sortam `C`. Ar merge, dar am arunca la gunoi informatia cea mai valoroasa pe care o avem: **`A` si `B` sunt deja ordonate**. Interclasarea foloseste exact acest lucru si construieste `C` dintr-o singura trecere.

> [!IMPORTANT] Important
> Interclasarea functioneaza **doar** daca ambii vectori sunt deja sortati, in aceeasi ordine. Daca nu sunt, rezultatul nu are nicio garantie.

---

## Doua teancuri de carti de joc

Ia doua teancuri de carti, fiecare aranjat crescator, cu fata in sus. Vrei sa le unesti intr-un singur teanc, tot ordonat.

Nu ai voie sa rasfiri cartile pe masa si nu ai voie sa le amesteci si sa le sortezi din nou. Tot ce vezi este **cartea de deasupra fiecarui teanc**. Si totusi ajunge:

- te uiti la cele doua carti de deasupra;
- o iei pe cea mai mica si o pui in teancul rezultat;
- sub ea apare o carte noua, si repeti.

De ce e corect? Cartea de deasupra teancului A este cea mai mica dintre cartile ramase in A, iar cea de deasupra lui B este cea mai mica dintre cartile ramase in B. Deci cea mai mica dintre ele doua este cea mai mica dintre **toate** cartile ramase — exact cea care trebuie pusa urmatoarea in rezultat.

In animatia de mai jos, cartile rosii (♥) vin din teancul A, iar cele negre (♠) din teancul B. Cartea ridicata este cea de deasupra teancului, iar cand cele doua carti comparate sunt incadrate cu galben inseamna ca tocmai se decide care dintre ele coboara.

<InterclasareVisual
  mod="carti"
  a="3 7 10"
  b="5 8 9 12"
  titlu="Doua teancuri ordonate devin un singur teanc ordonat"
/>

Observa doua lucruri:

- Culorile din teancul rezultat se amesteca oricum, dar valorile cresc mereu. Nu conteaza cate carti iei la rand din acelasi teanc.
- Cand unul dintre teancuri se goleste, restul celuilalt coboara ca atare, fara nicio comparatie — cartile ramase erau deja in ordine.

---

## Ideea algoritmului

Traducem povestea cu teancurile in vectori. `A` are `n` elemente, `B` are `m` elemente, iar toti vectorii sunt indexati de la `1`.

"Cartea de deasupra teancului" inseamna, pe vector, **primul element pe care nu l-am luat inca**. Ne trebuie deci cate un indice pentru fiecare vector:

- `i` — pozitia curenta in `A`
- `j` — pozitia curenta in `B`
- `k` — cate elemente am pus pana acum in `C`

La fiecare pas comparam `A[i]` cu `B[j]` si il mutam in `C` pe cel mai mic dintre ele, avansand indicele din care am luat.

> [!TIP] Sfat
> Tine minte invariantul: **in `C[1..k]` se afla mereu cele mai mici `k` elemente din reuniunea celor doi vectori, in ordine crescatoare.** Daca la fiecare pas alegi minimul dintre `A[i]` si `B[j]`, invariantul se pastreaza — si de aici rezulta ca la final `C` este sortat.

`while`-ul principal se opreste cand unul dintre vectori se termina, adica atunci cand nu mai este adevarat ca `i <= n && j <= m`. In vectorul celalalt pot ramane elemente, iar ele trebuie copiate mai departe in `C`.

---

## Pas cu pas pe vectori

Fie `A = 2 5 9` (deci `n = 3`) si `B = 1 5 8 11` (deci `m = 4`).

<InterclasareVisual
  mod="numere"
  a="2 5 9"
  b="1 5 8 11"
  titlu="Interclasarea lui A = 2 5 9 cu B = 1 5 8 11"
/>

Aceiasi pasi, scrisi ca tabel:

| Pas | `i` | `j` | `A[i]` | `B[j]` | Comparatie      | Se pune in `C` |
|-----|-----|-----|--------|--------|-----------------|----------------|
| 1   | 1   | 1   | 2      | 1      | 2 < 1 fals      | `C[1] = 1`     |
| 2   | 1   | 2   | 2      | 5      | 2 < 5 adevarat  | `C[2] = 2`     |
| 3   | 2   | 2   | 5      | 5      | 5 < 5 fals      | `C[3] = 5`     |
| 4   | 2   | 3   | 5      | 8      | 5 < 8 adevarat  | `C[4] = 5`     |
| 5   | 3   | 3   | 9      | 8      | 9 < 8 fals      | `C[5] = 8`     |
| 6   | 3   | 4   | 9      | 11     | 9 < 11 adevarat | `C[6] = 9`     |
| 7   | 4   | 4   | —      | 11     | `i > n`, iesim  | `C[7] = 11`    |

La pasul 7 `while`-ul principal s-a oprit, pentru ca `i = 4 > n = 3`. Elementul ramas in `B` a fost copiat de `while`-ul de golire.

---

## Implementare

```cpp
#include <iostream>
using namespace std;

int A[105], B[105], C[210];
int n, m, i, j, k;

int main()
{
    cin >> n;
    for (i = 1; i <= n; i++)
        cin >> A[i];

    cin >> m;
    for (i = 1; i <= m; i++)
        cin >> B[i];

    i = 1;
    j = 1;
    k = 0;

    while (i <= n && j <= m)
    {
        if (A[i] < B[j])
        {
            k++;
            C[k] = A[i];
            i++;
        }
        else
        {
            k++;
            C[k] = B[j];
            j++;
        }
    }

    // Din cele doua while-uri de mai jos se executa exact unul
    while (i <= n)
    {
        k++;
        C[k] = A[i];
        i++;
    }

    while (j <= m)
    {
        k++;
        C[k] = B[j];
        j++;
    }

    for (i = 1; i <= k; i++)
        cout << C[i] << " ";

    return 0;
}
```

**Intrare:**
```
3
2 5 9
4
1 5 8 11
```

**Afisare:**
```
1 2 5 5 8 9 11
```

> [!TIP] Sfat
> Vei intalni des algoritmul scris in forma compacta:
> ```cpp
> if (A[i] < B[j])
>     C[++k] = A[i++];
> else
>     C[++k] = B[j++];
> ```
> Este exact acelasi lucru: `C[++k] = A[i++];` inseamna `k++; C[k] = A[i]; i++;`. La `++k` incrementarea se face **inainte** de folosirea lui `k`, deci scriem pe pozitia noua; la `i++` incrementarea se face **dupa** ce a fost citit `A[i]`, deci citim de pe pozitia veche.

---

## De ce sunt necesare cele doua `while`-uri de la final

Sa presupunem ca stergem cele doua `while`-uri de golire si pastram doar `while`-ul principal. Luam `A = 1 2 3` si `B = 4 5`:

- 1 < 4 → `C[1] = 1`
- 2 < 4 → `C[2] = 2`
- 3 < 4 → `C[3] = 3`
- acum `i = 4 > n = 3`, deci `while`-ul principal se opreste

Am obtinut `C = 1 2 3`, dar `4` si `5` au disparut. `while`-ul principal poate avansa mai departe doar cat timp **amandoi** vectorii mai au elemente; in clipa in care unul se goleste, el se opreste, oricat de multe elemente ar mai fi in celalalt.

> [!IMPORTANT] Important
> Din cele doua `while`-uri de golire se executa intotdeauna **exact unul**. `while`-ul principal se opreste pentru ca s-a terminat `A` **sau** pentru ca s-a terminat `B`, niciodata pentru ca s-au terminat amandoi la mijloc. Daca s-au terminat fix in acelasi timp, nu se executa niciunul — si e in regula, nu mai avem ce copia.

Nu conteaza in ce ordine scrii cele doua `while`-uri de golire, tocmai pentru ca doar unul dintre ele are ce sa faca.

---

## Cat de rapid este

La fiecare pas al algoritmului, **exact un element** este mutat in `C` si indicele lui avanseaza. Cum in total avem `n + m` elemente, se fac `n + m` pasi. Nu exista nicio instructiune repetitiva imbricata: fiecare element este privit o singura data.

Comparatia cu varianta "lipesc si sortez":

| Metoda                       | Numar de operatii         |
|------------------------------|---------------------------|
| Interclasare                 | `n + m`                   |
| Copiere + sortare simpla     | aprox. `(n + m)²`         |

Pentru `n = m = 1000`, prima varianta face 2000 de pasi, a doua aproximativ 4 000 000. Diferenta vine doar din faptul ca interclasarea foloseste informatia ca vectorii erau deja sortati.

---

## Interclasare fara duplicate (reuniunea a doua multimi)

Daca `A` si `B` reprezinta **multimi** (fiecare vector are elemente distincte, strict crescatoare), atunci o valoare care apare in amandoi trebuie sa apara o singura data in rezultat.

Fata de algoritmul de baza apare un al treilea caz: cand `A[i]` este **egal** cu `B[j]`, punem valoarea o singura data si avansam **ambii** indici.

<InterclasareVisual
  mod="numere"
  varianta="reuniune"
  a="1 3 5 7"
  b="3 4 5 9"
  titlu="Reuniune: valorile comune intra o singura data in C"
/>

```cpp
#include <iostream>
using namespace std;

int A[105], B[105], C[210];
int n, m, i, j, k;

int main()
{
    cin >> n;
    for (i = 1; i <= n; i++)
        cin >> A[i];

    cin >> m;
    for (i = 1; i <= m; i++)
        cin >> B[i];

    i = 1;
    j = 1;
    k = 0;

    while (i <= n && j <= m)
    {
        if (A[i] < B[j])
        {
            k++;
            C[k] = A[i];
            i++;
        }
        else if (A[i] > B[j])
        {
            k++;
            C[k] = B[j];
            j++;
        }
        else
        {
            k++;
            C[k] = A[i];
            i++;
            j++;
        }
    }

    while (i <= n)
    {
        k++;
        C[k] = A[i];
        i++;
    }

    while (j <= m)
    {
        k++;
        C[k] = B[j];
        j++;
    }

    for (i = 1; i <= k; i++)
        cout << C[i] << " ";

    return 0;
}
```

**Intrare:**
```
4
1 3 5 7
4
3 4 5 9
```

**Afisare:**
```
1 3 4 5 7 9
```

> [!WARNING] Atentie
> In cazul de egalitate trebuie avansati **amandoi** indicii. Daca avansezi doar `i`, valoarea comuna va fi gasita din nou la pasul urmator si va ajunge de doua ori in `C`.

---

## Intersectia a doua multimi ordonate

Acum vrem doar valorile care apar in **amandoi** vectorii. Structura ramane aceeasi, cu doi indici care avanseaza, dar se schimba ce facem in fiecare caz:

- `A[i] < B[j]` → `A[i]` este mai mic decat toate elementele ramase in `B`, deci nu are cum sa mai apara acolo: il sarim, `i++`
- `A[i] > B[j]` → simetric, `j++`
- `A[i] == B[j]` → valoare comuna: o punem in `C` si avansam ambii indici

<InterclasareVisual
  mod="numere"
  varianta="intersectie"
  a="1 3 5 7"
  b="3 4 5 9"
  titlu="Intersectie: in C intra doar valorile gasite in amandoi vectorii"
/>

```cpp
#include <iostream>
using namespace std;

int A[105], B[105], C[105];
int n, m, i, j, k;

int main()
{
    cin >> n;
    for (i = 1; i <= n; i++)
        cin >> A[i];

    cin >> m;
    for (i = 1; i <= m; i++)
        cin >> B[i];

    i = 1;
    j = 1;
    k = 0;

    while (i <= n && j <= m)
    {
        if (A[i] < B[j])
            i++;
        else if (A[i] > B[j])
            j++;
        else
        {
            k++;
            C[k] = A[i];
            i++;
            j++;
        }
    }

    if (k == 0)
        cout << "multimea vida";
    else
        for (i = 1; i <= k; i++)
            cout << C[i] << " ";

    return 0;
}
```

**Intrare:**
```
4
1 3 5 7
4
3 4 5 9
```

**Afisare:**
```
3 5
```

> [!NOTE] Observatie
> Aici nu mai avem `while`-uri de golire. Cand unul dintre vectori s-a terminat, elementele ramase in celalalt nu mai au cu ce sa fie comune, deci nu mai pot intra in rezultat.

---

## Diferenta a doua multimi ordonate

`A \ B` inseamna elementele din `A` care **nu** apar in `B`:

- `A[i] < B[j]` → `A[i]` este mai mic decat tot ce a ramas in `B`, deci sigur nu apare in `B`: il punem in `C` si `i++`
- `A[i] > B[j]` → `B[j]` nu ne intereseaza, cautam elemente din `A`: `j++`
- `A[i] == B[j]` → `A[i]` apare si in `B`, deci nu intra in rezultat: avansam ambii indici

<InterclasareVisual
  mod="numere"
  varianta="diferenta"
  a="1 3 5 7"
  b="3 4 5 9"
  titlu="Diferenta A \ B: raman doar elementele din A care nu apar in B"
/>

```cpp
#include <iostream>
using namespace std;

int A[105], B[105], C[105];
int n, m, i, j, k;

int main()
{
    cin >> n;
    for (i = 1; i <= n; i++)
        cin >> A[i];

    cin >> m;
    for (i = 1; i <= m; i++)
        cin >> B[i];

    i = 1;
    j = 1;
    k = 0;

    while (i <= n && j <= m)
    {
        if (A[i] < B[j])
        {
            k++;
            C[k] = A[i];
            i++;
        }
        else if (A[i] > B[j])
            j++;
        else
        {
            i++;
            j++;
        }
    }

    // Ce a ramas in A nu mai are cum sa fie in B, deci intra tot in rezultat
    while (i <= n)
    {
        k++;
        C[k] = A[i];
        i++;
    }

    if (k == 0)
        cout << "multimea vida";
    else
        for (i = 1; i <= k; i++)
            cout << C[i] << " ";

    return 0;
}
```

**Intrare:**
```
4
1 3 5 7
4
3 4 5 9
```

**Afisare:**
```
1 7
```

> [!WARNING] Atentie
> Diferenta nu este simetrica: `A \ B` si `B \ A` dau rezultate diferite. Pentru exemplul de mai sus, `A \ B = 1 7`, dar `B \ A = 4 9`. Aici ramane un singur `while` de golire, cel pentru `A`, pentru ca doar elementele din `A` pot ajunge in rezultat.

---

## Interclasare descrescatoare

Daca `A` si `B` sunt sortati **descrescator** si vrem `C` tot descrescator, se schimba un singur caracter: semnul comparatiei. Vrem de fiecare data **maximul** dintre `A[i]` si `B[j]`.

```cpp
#include <iostream>
using namespace std;

int A[105], B[105], C[210];
int n, m, i, j, k;

int main()
{
    cin >> n;
    for (i = 1; i <= n; i++)
        cin >> A[i];

    cin >> m;
    for (i = 1; i <= m; i++)
        cin >> B[i];

    i = 1;
    j = 1;
    k = 0;

    while (i <= n && j <= m)
    {
        if (A[i] > B[j])
        {
            k++;
            C[k] = A[i];
            i++;
        }
        else
        {
            k++;
            C[k] = B[j];
            j++;
        }
    }

    while (i <= n)
    {
        k++;
        C[k] = A[i];
        i++;
    }

    while (j <= m)
    {
        k++;
        C[k] = B[j];
        j++;
    }

    for (i = 1; i <= k; i++)
        cout << C[i] << " ";

    return 0;
}
```

**Intrare:**
```
3
9 5 2
4
11 8 5 1
```

**Afisare:**
```
11 9 8 5 5 2 1
```

> [!NOTE] Observatie
> Acelasi tipar cu doi indici functioneaza si cand elementele nu sunt numere: doi vectori de structuri sortati dupa acelasi camp se interclaseaza comparand campul respectiv. Structurile se studiaza in clasa a X-a, dar algoritmul ramane neschimbat — se schimba doar ce anume compari.

---

## Capcane frecvente

### 1. `||` in loc de `&&` in conditia `while`-ului principal

```cpp
while (i <= n || j <= m) // GRESIT
{
    if (A[i] < B[j])
        ...
}
```

Cu `||`, `while`-ul continua si dupa ce unul dintre vectori s-a golit. Atunci se citeste `A[i]` cu `i > n`, adica in afara zonei folosite din vector — o valoare fara nicio legatura cu problema.

> [!WARNING] Atentie
> Conditia corecta este `i <= n && j <= m`: avem voie sa comparam doar cat timp **amandoi** vectorii mai au elemente. Negatia ei, `i > n || j > m`, este exact conditia de oprire: "s-a terminat cel putin unul dintre vectori".

### 2. Lipsa `while`-urilor de golire

Este cea mai frecventa greseala si e insidioasa: pe multe seturi de date programul da rezultatul corect, si pica exact pe cazurile in care ultimul element al lui `C` vine dintr-un singur vector.

> [!TIP] Sfat
> Testeaza mereu cu doi vectori care **nu se intrepatrund**, de exemplu `A = 1 2 3` si `B = 7 8 9`, si apoi invers, `A = 7 8 9` si `B = 1 2 3`. Daca lipseste un `while` de golire, unul dintre cele doua teste va afisa un `C` incomplet.

### 3. `k` initializat gresit

```cpp
k = 1; // GRESIT daca in continuare scrii k++ inainte de C[k] = ...
```

`k` numara cate elemente sunt deja in `C`. La inceput `C` este gol, deci `k = 0`, iar prima scriere, dupa `k++`, ajunge pe `C[1]`.

> [!WARNING] Atentie
> Daca pornesti cu `k = 1`, prima valoare ajunge in `C[2]`, iar `C[1]` ramane 0. La afisare vei avea un zero in plus la inceput.

### 4. `<` sau `<=` la compararea elementelor

Ambele variante dau un vector `C` sortat corect. Diferenta apare doar cand `A[i]` este **egal** cu `B[j]`: cu `A[i] < B[j]` intra primul elementul din `B`, iar cu `A[i] <= B[j]` intra primul cel din `A`.

> [!NOTE] Observatie
> Pentru numere simple nu se vede nicio diferenta: doi de `5` arata la fel. Diferenta conteaza cand elementele au si alte informatii atasate (de exemplu nume si nota, iar comparatia se face dupa nota) si problema cere ca, la valori egale, sa fie pastrata o anumita ordine.

### 5. Presupunerea ca `n` este egal cu `m`

Vectorii pot avea lungimi complet diferite, iar unul dintre ei poate fi chiar gol (`n = 0`). Algoritmul functioneaza si atunci: `while`-ul principal nu se executa deloc, iar `while`-ul de golire copiaza tot celalalt vector.

> [!WARNING] Atentie
> Nu scrie niciodata un singur `for (i = 1; i <= n; i++)` care sa umble in acelasi timp si in `A`, si in `B`. Cei doi indici avanseaza independent, tocmai de aceea algoritmul foloseste `while` si nu `for`.

---

## Recap

- Interclasarea uneste doi vectori **deja sortati** intr-unul singur, tot sortat, dintr-o singura trecere.
- Ideea: la fiecare pas iei minimul dintre `A[i]` si `B[j]`, adica dintre primele elemente neluate din fiecare vector — exact ca atunci cand te uiti doar la cartea de deasupra fiecarui teanc.
- Ai nevoie de trei indici: `i` pentru `A`, `j` pentru `B` si `k` pentru cate elemente ai pus deja in `C`.
- `while`-ul principal merge cat timp `i <= n && j <= m`; dupa el sunt obligatorii cele doua `while`-uri de golire, din care se executa exact unul.
- Costul este `n + m` pasi, mult mai bun decat copiere urmata de sortare.
- Acelasi tipar cu doi indici rezolva si reuniunea, intersectia si diferenta a doua multimi ordonate — se schimba doar ce se pune in `C` in fiecare dintre cele trei cazuri.
