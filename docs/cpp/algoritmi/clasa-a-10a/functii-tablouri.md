# Functii care prelucreaza tablouri

Putem da un **tablou (vector)** ca parametru unei functii, exact ca pe orice alta valoare. De obicei trimitem **si numarul de elemente `n`** alaturi de vector, pentru ca functia sa stie cate pozitii sa prelucreze.

---

## Sintaxa — cu dimensiunea mentionata

Un parametru de tip tablou se scrie: tipul elementelor, numele si `[dimensiune]`. Pe langa el, trimitem si `n` (cate elemente sunt efectiv folosite).

```cpp
void afisare(int v[100], int n)
{
    int i;
    for (i = 1; i <= n; i++)
        cout << v[i] << " ";
}
```

- `int v[100]` — parametrul este un tablou de `int`.
- `int n` — cate elemente din `v` prelucram (folosim pozitiile `v[1..n]`).

---

## Exemplu — tabloul primit ca parametru este ACEEASI memorie

Cand dam un tablou ca parametru, functia **nu** primeste o copie a lui, ci lucreaza direct pe **acelasi vector** din apel (aceeasi zona de memorie). Asta inseamna ca modificarile facute in functie **raman** vizibile dupa apel.

```cpp
#include <iostream>
using namespace std;

void dubleaza(int v[100], int n)
{
    int i;
    for (i = 1; i <= n; i++)
        v[i] = v[i] * 2;
}
int v[100];
int n, i;
int main()
{
    n = 3;
    v[1] = 10;
    v[2] = 20;
    v[3] = 30;

    dubleaza(v, n);   // la apel scriem doar numele vectorului: v

    for (i = 1; i <= n; i++)
        cout << v[i] << " ";
    return 0;
}
```

**Afisare:**
```
20 40 60
```

Desi `dubleaza` a modificat `v[i]` "in interiorul functiei", afisarea din `main` arata valorile **dublate**. Inseamna ca functia a lucrat chiar pe vectorul din `main`, nu pe o copie.

> [!IMPORTANT] Important
> Un tablou dat ca parametru **nu se copiaza**. Functia primeste **aceeasi zona de memorie** ca cea din apel, deci orice modificare a elementelor ramane dupa intoarcerea din functie.

---

## Contrast cu un parametru obisnuit (scalar)

Pentru un parametru simplu (`int`, `float`, ...), functia primeste o **copie** a valorii. Modificarile facute in functie **se pierd** dupa apel.

```cpp
#include <iostream>
using namespace std;

void incearca(int x)
{
    x = x * 2;   // modific doar copia locala
}
int a;
int main()
{
    a = 10;
    incearca(a);
    cout << a;   // a a ramas 10
    return 0;
}
```

**Afisare:**
```
10
```

> [!NOTE] Observatie
> In lectia de [functii](./functii) am vazut ca parametrii sunt **copii** ale argumentelor din apel — exact ce se intampla aici cu `int x`. **Tablourile fac exceptie**: ele nu se copiaza, functia lucreaza pe vectorul original.

---

## Omiterea dimensiunii — `int v[]`

La un parametru de tip tablou, dimensiunea dintre `[ ]` **poate fi omisa**. Compilatorul oricum nu o foloseste — singura informatie despre cate elemente prelucram este `n`, pe care il trimitem noi.

```cpp
#include <iostream>
using namespace std;

void afisare(int v[], int n)   // fara dimensiune intre [ ]
{
    int i;
    for (i = 1; i <= n; i++)
        cout << v[i] << " ";
}
int v[100];
int n, i;
int main()
{
    n = 3;
    v[1] = 5;
    v[2] = 7;
    v[3] = 9;

    afisare(v, n);
    return 0;
}
```

**Afisare:**
```
5 7 9
```

> [!TIP] Sfat
> La parametri scriem de obicei `int v[]` (fara dimensiune) si trimitem **mereu `n`** separat. Asa aceeasi functie merge pentru orice vector, indiferent cat de mare a fost declarat.

---

## Functie care citeste un tablou

Pentru ca tabloul este aceeasi memorie, putem chiar **citi** valorile in interiorul unei functii — ele raman in vector dupa apel.

```cpp
#include <iostream>
using namespace std;

void citeste(int v[], int n)
{
    int i;
    for (i = 1; i <= n; i++)
        cin >> v[i];
}
void afisare(int v[], int n)
{
    int i;
    for (i = 1; i <= n; i++)
        cout << v[i] << " ";
}
int v[100];
int n;
int main()
{
    cin >> n;
    citeste(v, n);   // citirea se face in functie...
    afisare(v, n);   // ...iar valorile sunt vizibile aici
    return 0;
}
```

**Intrare:**
```
4
3 8 1 6
```

**Afisare:**
```
3 8 1 6
```

---

## Probleme rezolvate

### Problema 1: Suma elementelor

**Enunt:** Se citeste `n` si apoi `n` numere intregi. Sa se afiseze suma lor, folosind o functie.

**Solutie:** O functie `suma` care primeste vectorul si `n` si **returneaza** suma (un singur `int`).

```cpp
#include <iostream>
using namespace std;

int suma(int v[], int n)
{
    int i, s;
    s = 0;
    for (i = 1; i <= n; i++)
        s = s + v[i];
    return s;
}
int v[100];
int n, i;
int main()
{
    cin >> n;
    for (i = 1; i <= n; i++)
        cin >> v[i];

    cout << suma(v, n);
    return 0;
}
```

**Intrare:**
```
5
4 2 7 1 3
```

**Afisare:**
```
17
```

### Problema 2: Maximul

**Enunt:** Se citeste `n` si apoi `n` numere intregi. Sa se afiseze valoarea maxima, folosind o functie.

**Solutie:** O functie `maxim` care porneste de la primul element si compara cu restul.

```cpp
#include <iostream>
using namespace std;

int maxim(int v[], int n)
{
    int i, m;
    m = v[1];
    for (i = 2; i <= n; i++)
        if (v[i] > m)
            m = v[i];
    return m;
}
int v[100];
int n, i;
int main()
{
    cin >> n;
    for (i = 1; i <= n; i++)
        cin >> v[i];

    cout << maxim(v, n);
    return 0;
}
```

**Intrare:**
```
5
4 2 7 1 3
```

**Afisare:**
```
7
```

---

## Capcane frecvente

### 1. Uitam parametrul `n`

Functia **nu stie singura** cate elemente are tabloul. Trebuie sa-i trimitem mereu si `n`.

```cpp
void afisare(int v[])   // de unde stie cate elemente sa afiseze?
{
    // ... nu avem pana unde sa mergem cu for-ul
}
```

**Corect:** `void afisare(int v[], int n)`.

### 2. Credem ca tabloul "se copiaza"

Spre deosebire de un `int`, tabloul **nu** se copiaza. Daca o functie modifica `v[i]`, modificarea ramane si dupa intoarcerea din functie. Nu te baza pe faptul ca vectorul original "ramane neatins".

### 3. Indexarea

Folosim consecvent pozitiile `v[1..n]`. La apel trimitem doar numele vectorului (`afisare(v, n)`), **fara** paranteze patrate.
