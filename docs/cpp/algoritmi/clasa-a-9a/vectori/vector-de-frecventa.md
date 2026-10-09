# Vectori de frecventa si vectori caracteristici

Pana acum, intr-un vector `v` am tinut **valorile** citite: `v[1]` era primul numar, `v[2]` al doilea si asa mai departe. Indicele spunea *al catelea* numar este, iar valoarea din vector era numarul insusi.

Acum schimbam rolurile: **indicele va fi valoarea**, iar in vector tinem informatii *despre* acea valoare.

- daca tinem **de cate ori** apare fiecare valoare, vectorul se numeste **vector de frecventa**
- daca tinem doar **daca** apare sau nu fiecare valoare, vectorul se numeste **vector caracteristic**

Cele doua se folosesc la fel si se scriu aproape la fel. Tabelul de mai jos le pune fata in fata — restul lectiei doar detaliaza ce vezi aici.

---

## Cele doua tipuri de vector, fata in fata

|                                    | **Vector de frecventa**                                                                                                                                                                        | **Vector caracteristic**                                                              |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| **La ce intrebare raspunde**       | de cate ori?<br>(de `k` ori, unde `k` este `0`, `1`, `2`, ...)                                                                                                                                   | daca?<br>(da / nu)                                                                      |
| **Tipul**                          | `int`                                                                                                                                                                                            | `bool`                                                                                  |
| **Declararea**                     | `int f[101];`                                                                                                                                                                                    | `bool c[101];`                                                                          |
| **Ce scriu cand il gasesc pe `x`** | `f[x]++;`<br>(s-a mai intamplat inca o data pentru `x`)                                                                                                                                          | `c[x] = 1;`<br>(s-a intamplat pentru `x`)                                               |
| **Cum citesc rezultatul**          | `f[x] == k` — l-am gasit pe `x` de `k` ori<br>`f[x] == 0` — nu l-am gasit deloc pe `x`<br>`f[x] == 1` — l-am gasit pe `x` o data<br>`f[x] >= 2` — l-am gasit pe `x` de cel putin 2 ori | `c[x] == 1` — s-a intamplat pentru `x`<br>`c[x] == 0` — nu l-am gasit deloc pe `x` |

> [!IMPORTANT] Important
> in ambele cazuri, `x` **nu** este o pozitie din sirul citit, ci o **valoare** din sir. De aceea nu scriem `f[i]`, ci `f[x]`.

> [!TIP] Sfat
> vectorul de frecventa poate face tot ce face cel caracteristic (`f[x] != 0` inseamna "`x` apare"). Alegem vectorul caracteristic cand chiar nu avem nevoie de numarul de aparitii: ocupa mai putina memorie si arata mai clar ce ne intereseaza.

---

## Vectorul de frecventa

Un vector de frecventa `f` raspunde la intrebarea **"de cate ori?"**:

```cpp
f[x] = de cate ori apare valoarea x
```

Fiind un numar de aparitii, `f[x]` este de tip `int` si poate fi `0`, `1`, `2`, `3`, ...

Cand mai gasesc o data valoarea `x`, cresc numarul de aparitii cu `1`:

```cpp
f[x]++;
```

**Exemplu:** pentru numerele citite `3 5 3 7 3 5 7 5` vectorul de frecventa arata asa:

| Indicele (`x`) | `f[0]` | `f[1]` | `f[2]` | `f[3]` | `f[4]` | `f[5]` | `f[6]` | `f[7]` |
| -------------- | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ |
| Valoarea       | 0      | 0      | 0      | 3      | 0      | 3      | 0      | 2      |

Citim tabelul asa: `f[3]` este `3`, deci valoarea `3` apare de 3 ori. `f[4]` este `0`, deci valoarea `4` nu apare deloc.

> [!NOTE] Observatie
> s-au citit 8 numere, dar in tabel nu vedem 8 pozitii. Pozitiile sunt **valorile posibile** (`0`, `1`, `2`, ...), iar suma tuturor frecventelor este `8`, adica exact cate numere s-au citit.

---

## Citirea unui vector de frecventa

Nu avem nevoie sa pastram numerele citite. Citim fiecare numar in aceeasi variabila `x` si il inregistram imediat in `f`.

**Problema:** se citesc `n` numere naturale din intervalul `[0, 100]`. Sa se afiseze, in ordine crescatoare, valorile care apar si de cate ori apare fiecare.

```cpp
#include <iostream>
using namespace std;
int f[101], n, i, x;

int main()
{
    cin >> n;
    for (i = 1; i <= n; i++)
    {
        cin >> x;
        f[x]++;
    }
    for (x = 0; x <= 100; x++)
    {
        if (f[x] != 0)
            cout << x << " apare de " << f[x] << " ori" << endl;
    }
    return 0;
}
```

**Intrare:**

```
8
3 5 3 7 3 5 7 5
```

**Afisare:**

```
3 apare de 3 ori
5 apare de 3 ori
7 apare de 2 ori
```

> [!IMPORTANT] Important
> vectorul `f` este declarat **global**, deci toate elementele lui pornesc automat de la `0`. Exact de asta avem nevoie: inainte de citire, nicio valoare nu a aparut niciodata. Un vector declarat local in `main` **nu** este initializat cu `0`.

> [!NOTE] Observatie
> al doilea `for` parcurge **indicii** `0, 1, ..., 100`, adica toate valorile posibile, nu pozitiile `1, ..., n`. Pentru ca il parcurgem in ordine crescatoare, valorile apar automat sortate crescator la afisare.

> [!TIP] Sfat
> aici indexarea porneste de la `0`, nu de la `1` ca la vectorii obisnuiti, pentru ca `0` este o valoare posibila a datelor de intrare si avem nevoie de `f[0]`.

Daca numerele nu sunt precedate de `n`, ci se citesc pana la finalul consolei, singura diferenta este instructiunea repetitiva folosita la citire:

```cpp
while (cin >> x)
{
    f[x]++;
}
```

> [!TIP] Sfat
> dupa citire, `f` ne raspunde la orice intrebare despre aparitii, fara sa mai parcurgem datele de intrare. Revezi randul **"Cum citesc rezultatul"** din tabelul de la inceputul lectiei.

---

## Vectorul caracteristic

Uneori nu ne intereseaza *de cate ori* apare o valoare, ci doar **daca** apare. Atunci folosim un vector caracteristic `c`, care raspunde la intrebarea **"da sau nu?"**:

```cpp
c[x] = 1  // valoarea x apare
c[x] = 0  // valoarea x nu apare
```

Fiind un raspuns de tip da/nu, `c` se declara de tip `bool`. Cand gasim valoarea `x`, nu numaram, doar **marcam**:

```cpp
c[x] = 1;
```

**Problema:** se citesc `n` numere naturale din intervalul `[0, 100]`. Sa se afiseze in ordine crescatoare valorile distincte care apar.

```cpp
#include <iostream>
using namespace std;
bool c[101];
int n, i, x;

int main()
{
    cin >> n;
    for (i = 1; i <= n; i++)
    {
        cin >> x;
        c[x] = 1;
    }
    for (x = 0; x <= 100; x++)
    {
        if (c[x] == 1)
            cout << x << " ";
    }
    return 0;
}
```

**Intrare:**

```
8
3 5 3 7 3 5 7 5
```

**Afisare:**

```
3 5 7
```

> [!NOTE] Observatie
> desi valoarea `3` a fost citita de 3 ori, atribuirea `c[3] = 1` s-a facut de 3 ori cu acelasi efect. De aceea fiecare valoare se afiseaza o singura data.

---

## Dimensiunea vectorului

Aceasta este cea mai importanta idee a lectiei si cea mai des gresita.

> [!IMPORTANT] Important
> dimensiunea vectorului de frecventa **nu** se gandeste in functie de **cate** numere se citesc, ci in functie de **intervalul valorilor** cu care lucram.

**Exemplu:** se citesc cel mult `1 000 000` de numere, toate din intervalul `[1, 200]`.

```cpp
int f[201];
// declaram 201 elemente (indicii 0, 1, ..., 200), ca sa avem loc pentru f[200]
// NU declaram 1000001 elemente - cate numere se citesc nu conteaza
```

Cate numere se citesc poate fi oricat de mult: fiecare numar citit doar creste un contor care exista deja. Vectorul trebuie sa aiba o pozitie pentru fiecare valoare **posibila**, de la cea mai mica la cea mai mare.

> [!WARNING] Atentie
> vectorul de frecventa nu se poate folosi pentru orice interval. Daca valorile pot ajunge pana la `1 000 000 000`, un vector cu un miliard de pozitii nu incape in memorie. Vectorii de frecventa se folosesc cand intervalul valorilor este **mic** (uzual pana la cateva milioane).

> [!WARNING] Atentie
> indicele trebuie sa fie mereu in interiorul vectorului. Doua greseli frecvente:
>
> - valori **negative**: `f[-3]++` iese in afara vectorului. Daca enuntul permite numere negative, deplasam indicele (de exemplu, pentru intervalul `[-100, 100]` folosim `f[x + 100]++`).
> - valori **mai mari** decat dimensiunea declarata: cu `int f[101]`, o valoare citita `150` strica memoria si programul se poate opri cu eroare.

---

## Problema: cate valori distincte s-au citit

Numarul de valori distincte este numarul de indici marcati in vectorul caracteristic.

```cpp
#include <iostream>
using namespace std;
bool c[101];
int n, i, x, nrDistincte;

int main()
{
    cin >> n;
    for (i = 1; i <= n; i++)
    {
        cin >> x;
        c[x] = 1;
    }
    nrDistincte = 0;
    for (x = 0; x <= 100; x++)
    {
        if (c[x] == 1)
            nrDistincte++;
    }
    cout << nrDistincte;
    return 0;
}
```

**Intrare:**

```
8
3 5 3 7 3 5 7 5
```

**Afisare:**

```
3
```

---

## Problema: valoarea care apare cel mai des

Cautam maximul in vectorul de frecventa, exact ca la un maxim obisnuit, dar ne intereseaza **indicele** la care se afla acest maxim: acela este valoarea cea mai frecventa.

```cpp
#include <iostream>
using namespace std;
int f[101], n, i, x, maxAparitii, valMax;

int main()
{
    cin >> n;
    for (i = 1; i <= n; i++)
    {
        cin >> x;
        f[x]++;
    }
    maxAparitii = 0;
    valMax = 0;
    for (x = 0; x <= 100; x++)
    {
        if (f[x] > maxAparitii)
        {
            maxAparitii = f[x];
            valMax = x;
        }
    }
    cout << valMax << " apare de " << maxAparitii << " ori";
    return 0;
}
```

**Intrare:**

```
9
3 5 3 7 3 5 7 5 3
```

**Afisare:**

```
3 apare de 4 ori
```

> [!NOTE] Observatie
> pornim cu `maxAparitii = 0` pentru ca orice valoare care apare are frecventa cel putin `1`, deci va fi gasita. Pentru ca folosim `>` (strict), iar `x` creste, in caz de egalitate ramane **cea mai mica** valoare cu numar maxim de aparitii.

---

## Problema: valorile care apar exact o singura data

```cpp
#include <iostream>
using namespace std;
int f[101], n, i, x;

int main()
{
    cin >> n;
    for (i = 1; i <= n; i++)
    {
        cin >> x;
        f[x]++;
    }
    for (x = 0; x <= 100; x++)
    {
        if (f[x] == 1)
            cout << x << " ";
    }
    return 0;
}
```

**Intrare:**

```
8
3 5 3 7 3 5 7 9
```

**Afisare:**

```
9
```

> [!NOTE] Observatie
> valorile `3`, `5` si `7` apar de cate doua ori, deci nu se afiseaza. Doar `9` are `f[9] == 1`.

---

## Problema: afisarea numerelor in ordine crescatoare

Vectorul de frecventa ne da gratis o ordonare: parcurgem valorile de la cea mai mica la cea mai mare si afisam fiecare valoare de atatea ori cat apare. Aceasta tehnica se numeste **sortare prin numarare**.

```cpp
#include <iostream>
using namespace std;
int f[101], n, i, j, x;

int main()
{
    cin >> n;
    for (i = 1; i <= n; i++)
    {
        cin >> x;
        f[x]++;
    }
    for (x = 0; x <= 100; x++)
    {
        for (j = 1; j <= f[x]; j++)
        {
            cout << x << " ";
        }
    }
    return 0;
}
```

**Intrare:**

```
8
5 2 9 2 5 2 9 1
```

**Afisare:**

```
1 2 2 2 5 5 9 9
```

> [!NOTE] Observatie
> `for`-ul interior se executa de `f[x]` ori. Pentru o valoare care nu apare, `f[x]` este `0`, deci nu se executa niciodata si nu se afiseaza nimic.

---

## Problema: toate numerele sunt distincte?

Numerele citite sunt toate distincte daca nicio valoare nu apare de doua sau mai multe ori. Putem sa ne dam seama **in timpul citirii**: daca valoarea curenta a mai fost citita, raspunsul este deja `nu`.

```cpp
#include <iostream>
using namespace std;
bool c[101], totiDistincti;
int n, i, x;

int main()
{
    cin >> n;
    totiDistincti = 1;
    for (i = 1; i <= n; i++)
    {
        cin >> x;
        if (c[x] == 1)
            totiDistincti = 0;
        c[x] = 1;
    }
    if (totiDistincti == 1)
        cout << "DA";
    else
        cout << "NU";
    return 0;
}
```

**Intrare:**

```
5
4 8 1 9 2
```

**Afisare:**

```
DA
```

**Intrare:**

```
5
4 8 1 9 4
```

**Afisare:**

```
NU
```

> [!WARNING] Atentie
> verificarea `if (c[x] == 1)` se face **inainte** de marcarea `c[x] = 1`. Daca am marca mai intai, conditia ar fi mereu adevarata si raspunsul ar fi mereu `NU`.

---

## Problema: valorile comune a doua siruri de numere

Folosim **doi** vectori caracteristici, cate unul pentru fiecare sir. O valoare este comuna daca este marcata in amandoi.

```cpp
#include <iostream>
using namespace std;
bool c1[101], c2[101];
int n, m, i, x;

int main()
{
    cin >> n;
    for (i = 1; i <= n; i++)
    {
        cin >> x;
        c1[x] = 1;
    }
    cin >> m;
    for (i = 1; i <= m; i++)
    {
        cin >> x;
        c2[x] = 1;
    }
    for (x = 0; x <= 100; x++)
    {
        if (c1[x] == 1 && c2[x] == 1)
            cout << x << " ";
    }
    return 0;
}
```

**Intrare:**

```
5
7 2 9 2 4
4
9 3 7 3
```

**Afisare:**

```
7 9
```

> [!TIP] Sfat
> fara vectori caracteristici ar trebui sa comparam fiecare numar din primul sir cu fiecare numar din al doilea, deci `n * m` comparatii, si ar trebui sa avem grija sa nu afisam de doua ori aceeasi valoare comuna. Cu vectori caracteristici, fiecare numar este prelucrat o singura data.

---

## Problema: cifra care apare cel mai des intr-un numar

Cifrele sunt tot valori dintr-un interval mic: `[0, 9]`. Deci putem folosi un vector de frecventa cu 10 elemente, `f[0..9]`.

```cpp
#include <iostream>
using namespace std;
int f[10], n, c, maxAparitii, cifraMax;

int main()
{
    cin >> n;
    while (n != 0)
    {
        c = n % 10;
        f[c]++;
        n = n / 10;
    }
    maxAparitii = 0;
    cifraMax = 0;
    for (c = 0; c <= 9; c++)
    {
        if (f[c] > maxAparitii)
        {
            maxAparitii = f[c];
            cifraMax = c;
        }
    }
    cout << "Cifra " << cifraMax << " apare de " << maxAparitii << " ori";
    return 0;
}
```

**Intrare:**

```
7321737
```

**Afisare:**

```
Cifra 7 apare de 3 ori
```

> [!NOTE] Observatie
> acesta este cazul in care vectorul de frecventa se indexeaza obligatoriu de la `0`: cifra `0` este o cifra valida si are nevoie de pozitia `f[0]`.
