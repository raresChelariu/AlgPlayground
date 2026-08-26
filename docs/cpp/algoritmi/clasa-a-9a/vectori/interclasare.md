# Interclasare

Avem doi vectori **deja ordonati** si vrem sa obtinem un al treilea vector, care sa contina toate valorile lor si sa fie tot ordonat. Am putea sa le punem pe toate la gramada si sa sortam la final, dar nu e nevoie: faptul ca cei doi vectori sunt deja ordonati ne lasa sa construim rezultatul dintr-o singura parcurgere.

Operatia se numeste **interclasare** si este acelasi tipar folosit mai tarziu la reuniunea, intersectia si diferenta a doua multimi.

---

## Ce inseamna vector ordonat

Un vector `v[1..n]` este **ordonat crescator** daca fiecare element este mai mic decat urmatorul:

```
v[i] < v[i + 1], pentru orice i de la 1 la n - 1
```

Este **ordonat descrescator** daca fiecare element este mai mare decat urmatorul:

```
v[i] > v[i + 1], pentru orice i de la 1 la n - 1
```

Verificarea se face cu o singura parcurgere, comparand fiecare element cu vecinul din dreapta:

```cpp
ordonat = 1;
for (i = 1; i < n; i++)
    if (v[i] >= v[i + 1])
        ordonat = 0;
```

> [!NOTE] Observatie
> Semnul `<` este strict, deci intr-un vector ordonat crescator **nu exista doua elemente egale**. Daca vrem sa permitem si valori egale (`v[i] <= v[i + 1]`), vectorul se numeste **nedescrescator**. Algoritmul de interclasare de mai jos merge la fel de bine si in acest caz — conteaza doar ca valorile sa nu scada niciodata.

---

## Problema

Se citesc doi vectori, `a[1..n]` si `b[1..m]`, ambii ordonati crescator. Sa se construiasca vectorul `c`, care contine toate cele `n + m` valori si este si el ordonat crescator.

**Exemplu:**

```
a: 1 4 7 9
b: 2 3 7 8 11

c: 1 2 3 4 7 7 8 9 11
```

> [!IMPORTANT] Important
> Algoritmul functioneaza **numai** daca amandoi vectorii sunt ordonati, si inca in **acelasi sens**. Pe vectori nesortati rezultatul nu are nicio garantie.

---

## Ideea algoritmului

Imaginati-va doua teancuri de carti de joc asezate cu fata in sus, fiecare ordonat crescator, cu cea mai mica valoare deasupra. Vrem sa facem un singur teanc ordonat.

Nu trebuie sa ne uitam prin tot teancul: e de ajuns sa comparam **cele doua carti de deasupra** si sa o luam pe cea mai mica. Cartea de sub ea devine noua carte de deasupra si repetam.

In program, "cartea de deasupra" inseamna un indice:

| Ce retinem | Cum |
|------------|-----|
| pozitia curenta in `a` | `i`, pornit de la `1` |
| pozitia curenta in `b` | `j`, pornit de la `1` |
| cate valori am scris deja in `c` | `k`, pornit de la `0` |

La fiecare pas comparam `a[i]` cu `b[j]`, scriem in `c` valoarea mai mica si **avansam doar indicele de unde am luat-o**. Celalalt ramane pe loc, pentru ca valoarea lui inca nu a fost folosita.

---

## Vezi cum avanseaza indicii

Apasa **Inainte** ca sa avansezi pas cu pas. Sagetile `i` si `j` arata unde suntem in fiecare vector, banda din mijloc arata comparatia facuta chiar acum, iar in codul din dreapta se aprinde linia care se executa. Celulele deja folosite se sting, iar cele din `c` isi pastreaza culoarea vectorului din care au venit.

<InterclasareVisual
  a="1 4 7 9"
  b="2 3 7 8 11"
  titlu="Fiecare pas consuma exact o valoare, dintr-un singur vector"
/>

Urmareste doua lucruri:

- la fiecare pas **avanseaza un singur indice**, niciodata amandoi;
- `c` se umple mereu de la stanga la dreapta, iar valoarea proaspat scrisa este cea mai mica dintre toate cele ramase in cei doi vectori.

---

## Exemplu pas cu pas

Acelasi exemplu, scris pe hartie. `a = 1 4 7 9` (deci `n = 4`) si `b = 2 3 7 8 11` (deci `m = 5`):

| Pas | i | j | a[i] | b[j] | Decizie | c dupa pas |
|-----|---|---|------|------|---------|------------|
| 1 | 1 | 1 | 1 | 2 | `1 < 2` → iau din `a` | `1` |
| 2 | 2 | 1 | 4 | 2 | `4 > 2` → iau din `b` | `1 2` |
| 3 | 2 | 2 | 4 | 3 | `4 > 3` → iau din `b` | `1 2 3` |
| 4 | 2 | 3 | 4 | 7 | `4 < 7` → iau din `a` | `1 2 3 4` |
| 5 | 3 | 3 | 7 | 7 | `7 == 7` → iau din `b` | `1 2 3 4 7` |
| 6 | 3 | 4 | 7 | 8 | `7 < 8` → iau din `a` | `1 2 3 4 7 7` |
| 7 | 4 | 4 | 9 | 8 | `9 > 8` → iau din `b` | `1 2 3 4 7 7 8` |
| 8 | 4 | 5 | 9 | 11 | `9 < 11` → iau din `a` | `1 2 3 4 7 7 8 9` |
| — | 5 | 5 | — | 11 | `i > n`, `while`-ul principal se opreste | `1 2 3 4 7 7 8 9` |
| coada | 5 | 5 | — | 11 | copiez ce a ramas in `b` | `1 2 3 4 7 7 8 9 11` |

> [!NOTE] Observatie
> La pasul 5 valorile sunt egale. Conditia `a[i] < b[j]` este **falsa**, deci se executa `else` si se ia valoarea din `b`. La pasul urmator se ia si cea din `a`, imediat dupa ea. Amandoua ajung in `c` — la interclasare nu se pierde nimic.

---

## Implementarea

```cpp
#include <iostream>
using namespace std;

int a[1001], b[1001], c[2001];
int n, m, i, j, k;

int main()
{
    cin >> n;
    for (i = 1; i <= n; i++)
        cin >> a[i];
    cin >> m;
    for (j = 1; j <= m; j++)
        cin >> b[j];

    i = 1;
    j = 1;
    k = 0;
    while (i <= n && j <= m)
    {
        if (a[i] < b[j])
        {
            k++;
            c[k] = a[i];
            i++;
        }
        else
        {
            k++;
            c[k] = b[j];
            j++;
        }
    }
    while (i <= n)
    {
        k++;
        c[k] = a[i];
        i++;
    }
    while (j <= m)
    {
        k++;
        c[k] = b[j];
        j++;
    }

    for (i = 1; i <= k; i++)
        cout << c[i] << " ";
    return 0;
}
```

**Intrare:**

```
4
1 4 7 9
5
2 3 7 8 11
```

**Afisare:**

```
1 2 3 4 7 7 8 9 11
```

Programul are trei `while`-uri: primul cat timp mai avem elemente in **amandoi** vectorii, iar ultimele doua pentru **cozi** — ce a ramas neconsumat dupa ce unul dintre vectori s-a terminat.

---

## De ce se executa exact una dintre cele doua cozi

Aici e locul unde se greseste cel mai des. Sa vedem intai ce se intampla pe un exemplu unde se termina **celalalt** vector: `a = 2 5 8 10 12` si `b = 1 3 6`.

<InterclasareVisual
  a="2 5 8 10 12"
  b="1 3 6"
  titlu="Acum se epuizeaza b, deci porneste cealalta coada — while (i <= n)"
/>

Duce vizualizatorul pana la pasul in care `while`-ul principal se opreste: `while (j <= m)` se stinge, iar `while (i <= n)` se aprinde. In primul exemplu se intampla exact invers. Se schimba **care** coada porneste, nu **daca** porneste vreuna.

### Argumentul

Fiecare pas al `while`-ului principal scrie o valoare si avanseaza **exact un** indice — fie `i`, fie `j`, niciodata amandoi. Deci cei doi indici nu pot depasi capatul in acelasi moment: `while`-ul se opreste **imediat** ce unul dintre ei a trecut de capat, iar celalalt este inca inauntru, cu cel putin un element neconsumat.

Concluzia: dupa `while`-ul principal, **exact unul** dintre cei doi vectori mai are elemente. Cealalta coada are conditia falsa inca de la prima verificare si nu face niciun pas, deci nu strica nimic ca o scriem oricum.

| Exemplu | Cine se termina | `i` si `j` la iesire | Ce coada porneste |
|---------|-----------------|----------------------|-------------------|
| `a = 1 4 7 9`, `b = 2 3 7 8 11` | `a` | `i = 5 > n = 4`, `j = 5 <= m = 5` | `while (j <= m)` copiaza `11` |
| `a = 2 5 8 10 12`, `b = 1 3 6` | `b` | `j = 4 > m = 3`, `i = 3 <= n = 5` | `while (i <= n)` copiaza `8 10 12` |
| `a = 1 2`, `b = 3 4` | `a` | `i = 3 > n = 2`, `j = 1 <= m = 2` | `while (j <= m)` copiaza `3 4` |

Ultimul rand este cazul extrem: toate valorile din `a` sunt mai mici decat toate cele din `b`, deci coada copiaza vectorul `b` in intregime.

> [!WARNING] Atentie
> Daca uiti cele doua `while`-uri de la final, programul **pierde tacut** elemente. Pe intrarea din exemplu, fara cozi, afisarea ar fi:
>
> ```
> 1 2 3 4 7 7 8 9
> ```
>
> Lipseste `11`. Nu apare nicio eroare la compilare si nici la rulare — vectorul rezultat este ordonat, doar ca este incomplet. Verifica mereu ca ai scris `n + m` valori.

---

## De ce nu concatenam si sortam

Am putea copia cei doi vectori unul dupa altul si sa sortam rezultatul. Ar iesi acelasi lucru, dar mult mai lent.

Interclasarea face **`n + m` pasi**, pentru ca fiecare pas consuma o valoare si nu se intoarce niciodata inapoi. O sortare simpla, care compara fiecare element cu fiecare, face de ordinul `(n + m)²` comparatii.

Pentru `n = m = 1000`:

| Metoda | Numar de pasi |
|--------|---------------|
| interclasare | `2 000` |
| concatenare + sortare simpla | aproximativ `4 000 000` |

> [!TIP] Sfat
> Cand enuntul spune ca datele de intrare sunt **deja ordonate**, aproape sigur solutia asteptata parcurge o singura data cu doi indici. Faptul ca vectorii sunt sortati este un cadou din partea enuntului, nu o intamplare.

---

## Interclasare descrescatoare

Daca amandoi vectorii sunt ordonati **descrescator** si vrem rezultatul tot descrescator, se schimba un singur semn: la fiecare pas luam valoarea **mai mare**.

```cpp
while (i <= n && j <= m)
{
    if (a[i] > b[j])
    {
        k++;
        c[k] = a[i];
        i++;
    }
    else
    {
        k++;
        c[k] = b[j];
        j++;
    }
}
```

Cele doua cozi raman neschimbate — ele doar copiaza ce a mai ramas, indiferent de sens.

---

## Reuniune — valorile din `a` sau din `b`, o singura data

Pana acum, cand valorile erau egale, amandoua ajungeau in `c`. La **reuniune** vrem sa apara o singura data.

Diferenta este ca acum avem **trei** ramuri in loc de doua: la egalitate scriem valoarea o data si avansam **si `i`, si `j`**.

<InterclasareVisual
  a="1 4 7 9"
  b="2 3 7 8 11"
  operatie="reuniune"
  titlu="La egalitate se scrie o singura valoare, dar avanseaza amandoi indicii"
/>

```cpp
#include <iostream>
using namespace std;

int a[1001], b[1001], c[2001];
int n, m, i, j, k;

int main()
{
    cin >> n;
    for (i = 1; i <= n; i++)
        cin >> a[i];
    cin >> m;
    for (j = 1; j <= m; j++)
        cin >> b[j];

    i = 1;
    j = 1;
    k = 0;
    while (i <= n && j <= m)
    {
        if (a[i] < b[j])
        {
            k++;
            c[k] = a[i];
            i++;
        }
        else if (a[i] > b[j])
        {
            k++;
            c[k] = b[j];
            j++;
        }
        else
        {
            k++;
            c[k] = a[i];
            i++;
            j++;
        }
    }
    while (i <= n)
    {
        k++;
        c[k] = a[i];
        i++;
    }
    while (j <= m)
    {
        k++;
        c[k] = b[j];
        j++;
    }

    for (i = 1; i <= k; i++)
        cout << c[i] << " ";
    return 0;
}
```

**Intrare:**

```
4
1 4 7 9
5
2 3 7 8 11
```

**Afisare:**

```
1 2 3 4 7 8 9 11
```

Cozile se copiaza in intregime, ca la interclasare: ce a ramas intr-un vector dupa ce celalalt s-a terminat nu mai are cu ce sa se repete.

---

## Intersectie — doar valorile care apar in amandoi

Acum ne intereseaza **numai** cazul de egalitate. Cand valorile difera, o aruncam pe cea mai mica: ea nu mai poate aparea in celalalt vector, pentru ca acolo toate valorile ramase sunt mai mari.

<InterclasareVisual
  a="1 4 7 9"
  b="2 3 7 8 11"
  operatie="intersectie"
  titlu="Valoarea mai mica se arunca; in c ajung doar valorile comune"
/>

```cpp
#include <iostream>
using namespace std;

int a[1001], b[1001], c[1001];
int n, m, i, j, k;

int main()
{
    cin >> n;
    for (i = 1; i <= n; i++)
        cin >> a[i];
    cin >> m;
    for (j = 1; j <= m; j++)
        cin >> b[j];

    i = 1;
    j = 1;
    k = 0;
    while (i <= n && j <= m)
    {
        if (a[i] < b[j])
            i++;
        else if (a[i] > b[j])
            j++;
        else
        {
            k++;
            c[k] = a[i];
            i++;
            j++;
        }
    }

    if (k == 0)
        cout << "multimea vida";
    for (i = 1; i <= k; i++)
        cout << c[i] << " ";
    return 0;
}
```

**Intrare:**

```
4
1 4 7 9
5
2 3 7 8 11
```

**Afisare:**

```
7
```

> [!IMPORTANT] Important
> La intersectie **nu exista cozi**. Dupa ce unul dintre vectori s-a terminat, ce a ramas in celalalt nu mai are cu cine sa fie comparat, deci nu poate fi valoare comuna. Cele doua `while`-uri de la final pur si simplu nu se scriu.

---

## Diferenta — valorile din `a` care nu apar in `b`

Pastram valoarea din `a` doar cand este **strict mai mica** decat cea din `b`: atunci suntem siguri ca nu o vom mai gasi in `b`, pentru ca acolo valorile ramase doar cresc. La egalitate o aruncam, iar cand `b[j]` este mai mic, avansam `j` fara sa scriem nimic.

<InterclasareVisual
  a="1 4 7 9"
  b="2 3 7 8 11"
  operatie="diferenta"
  titlu="Valorile din a care se regasesc in b sunt eliminate"
/>

```cpp
#include <iostream>
using namespace std;

int a[1001], b[1001], c[1001];
int n, m, i, j, k;

int main()
{
    cin >> n;
    for (i = 1; i <= n; i++)
        cin >> a[i];
    cin >> m;
    for (j = 1; j <= m; j++)
        cin >> b[j];

    i = 1;
    j = 1;
    k = 0;
    while (i <= n && j <= m)
    {
        if (a[i] < b[j])
        {
            k++;
            c[k] = a[i];
            i++;
        }
        else if (a[i] > b[j])
            j++;
        else
        {
            i++;
            j++;
        }
    }
    while (i <= n)
    {
        k++;
        c[k] = a[i];
        i++;
    }

    if (k == 0)
        cout << "multimea vida";
    for (i = 1; i <= k; i++)
        cout << c[i] << " ";
    return 0;
}
```

**Intrare:**

```
4
1 4 7 9
5
2 3 7 8 11
```

**Afisare:**

```
1 4 9
```

Aici se copiaza **doar coada lui `a`**. Ce ramane in `b` nu ne intereseaza: cautam valori din `a`, nu din `b`.

> [!NOTE] Observatie
> Pe exemplul de mai sus vectorul `a` se termina primul, deci `while (i <= n)` nu face niciun pas. Daca am lua `a = 1 4 7 9 12` si `b = 2 3 7 8`, atunci `b` s-ar termina primul si coada ar copia `9` si `12`, dand rezultatul `1 4 9 12`.

---

## Tabel recapitulativ

Toate cele patru operatii au acelasi schelet: un `while` principal cu doi indici, urmat eventual de cozi. Se schimba doar ce facem in fiecare caz.

Pentru `a = 1 4 7 9` si `b = 2 3 7 8 11`:

| Operatie | `a[i] < b[j]` | `a[i] == b[j]` | `a[i] > b[j]` | Coada lui `a` | Coada lui `b` | Rezultat |
|----------|---------------|----------------|---------------|---------------|---------------|----------|
| interclasare | scriu `a[i]`, `i++` | scriu `b[j]`, `j++` (egalul din `a` vine imediat dupa) | scriu `b[j]`, `j++` | se copiaza | se copiaza | `1 2 3 4 7 7 8 9 11` |
| reuniune | scriu `a[i]`, `i++` | scriu o data, `i++` si `j++` | scriu `b[j]`, `j++` | se copiaza | se copiaza | `1 2 3 4 7 8 9 11` |
| intersectie | `i++` | scriu o data, `i++` si `j++` | `j++` | — | — | `7` |
| diferenta `a \ b` | scriu `a[i]`, `i++` | `i++` si `j++` | `j++` | se copiaza | — | `1 4 9` |

> [!TIP] Sfat
> Cand primesti o problema noua de acest tip, raspunde la doua intrebari: **ce scriu in `c` in fiecare dintre cele trei cazuri** si **care cozi se copiaza**. Restul programului este mereu acelasi.
