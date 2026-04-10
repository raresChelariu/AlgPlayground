# Instructiunea while

In lectia despre `if`, ai vazut cum am numarat cifrele impare dintr-un numar de 5 cifre repetand acelasi bloc de cod de 5 ori. La sfarsit, am promis ca vom putea scrie acel cod mult mai scurt. **Instructiunea `while` este cea care ne permite asta.**

`while` executa un bloc de cod **in mod repetat**, cat timp o conditie ramane adevarata.

## Sintaxa

```cpp
while (conditie)
{
    // instructiunile de executat
    // cat timp conditia e adevarata
}
```

1. Se **verifica conditia** (inainte de fiecare executie a blocului).
2. Daca conditia e **adevarata**, se executa blocul `{ ... }` si se revine la pasul 1.
3. Daca conditia e **falsa**, programul **iese** din `while` si continua cu ce urmeaza.

> **Obs:** Daca de la inceput conditia este falsa, blocul din `while` nu se executa **niciodata** — nici macar o data.

### Cum gasesti conditia de la while

Cand rezolvi o problema, de multe ori stii mai usor **cand vrei sa te opresti**, nu cand vrei sa continui. Poti folosi asta in avantajul tau:

**Conditia de la `while` este exact opusul conditiei de oprire.**

| Gandul tau ("ma opresc cand...") | Conditia `while` (negata) |
|----------------------------------|---------------------------|
| `n == 0` | `n != 0` |
| `i > n` | `i <= n` |
| `suma >= 100` | `suma < 100` |
| `cifra == 7` | `cifra != 7` |

> **Obs:** `while (n != 0)` si `while (n > 0)` sunt echivalente daca `n` este un numar natural care scade treptat. Prefer `n > 0` — e mai sigur daca din greseala `n` sare peste 0 si devine negativ, bucla tot se opreste.

---

## Exemplul 1: Numara de la 1 la N

Cel mai simplu exemplu: afisam numerele de la 1 la `n`, unul pe rand.

Gandul: "ma opresc cand `i > n`", deci conditia `while` este `i <= n`.

```cpp
#include <iostream>
using namespace std;

int main()
{
    int n;
    cin >> n;

    int i = 1;          // initializam contorul
    while (i <= n)      // cat timp nu am depasit n
    {
        cout << i << endl;
        i++;            // incrementam — altfel bucla nu se termina niciodata!
    }

    return 0;
}
```

**Rulare cu `n = 5`:**
```
5
1
2
3
4
5
```

**Rulare cu `n = 0`:**
```
0

```

> **Obs:** Cand `n = 0`, conditia `i <= n` este `1 <= 0`, adica falsa de la inceput. Blocul nu se executa niciodata, iar programul nu afiseaza nimic.

Orice `while` corect are **3 parti**:

```
1. Initializare  — int i = 1;       (inainte de while)
2. Conditie      — while (i <= n)   (capul buclei)
3. Actualizare   — i++;             (inauntrul buclei)
```

> **Obs:** Daca uiti actualizarea (pasul 3), valoarea lui `i` nu se schimba niciodata si conditia ramane mereu adevarata — **bucla infinita**.

---

## Exemplul 2: Suma primelor N numere

Adaugam un **acumulator** — o variabila care strange un rezultat pe parcursul buclei.

```cpp
#include <iostream>
using namespace std;

int main()
{
    int n;
    cin >> n;

    int i = 1;
    int suma = 0;           // acumulatorul porneste de la 0

    while (i <= n)
    {
        suma += i;          // adaugam valoarea curenta la suma
        i++;
    }

    cout << suma << endl;

    return 0;
}
```

**Rulare cu `n = 4`:**
```
4
10
```

| Pas | `i` la intrarea in bucla | `suma` dupa `suma += i` | `i` dupa `i++` |
|-----|--------------------------|-------------------------|----------------|
| 1   | 1                        | 1                       | 2              |
| 2   | 2                        | 3                       | 3              |
| 3   | 3                        | 6                       | 4              |
| 4   | 4                        | 10                      | 5              |
| —   | 5 (5 <= 4 e fals)        | —                       | —              |

> **Obs:** Acumulatorul (`suma`) porneste **intotdeauna de la 0** pentru sume. Daca am porni de la o valoare aleatorie, rezultatul ar fi gresit.

---

## Exemplul 3: Numara de la N la 1

Putem numara si invers — de la `n` la `1`. Tot ce se schimba este conditia si actualizarea.

Gandul: "ma opresc cand `i < 1`", deci conditia `while` este `i >= 1`.

```cpp
#include <iostream>
using namespace std;

int main()
{
    int n;
    cin >> n;

    int i = n;          // pornim de la n
    while (i >= 1)      // cat timp nu am scazut sub 1
    {
        cout << i << endl;
        i--;            // decrementam
    }

    return 0;
}
```

**Rulare cu `n = 5`:**
```
5
5
4
3
2
1
```

> **Obs:** Compara cu Exemplul 1: conditia s-a schimbat din `i <= n` in `i >= 1`, si actualizarea din `i++` in `i--`. Conditia si actualizarea trebuie sa fie mereu **compatibile** — daca incrementezi, conditia trebuie sa opreasca la un plafon; daca decrementezi, conditia trebuie sa opreasca la un prag minim.

---

## Revenire la contorul din `if`

In lectia despre `if`, am scris acelasi `if (cifra % 2 != 0) { contor++; }` de **5 ori**, o data pentru fiecare cifra. Cu `while`, putem citi cifrele pe rand si le procesam pe toate in acelasi bloc:

```cpp
#include <iostream>
using namespace std;

int main()
{
    int n;
    cin >> n;               // cate cifre citim

    int contor = 0;
    int i = 1;

    while (i <= n)
    {
        int cifra;
        cin >> cifra;

        if (cifra % 2 != 0)
        {
            contor++;
        }

        i++;
    }

    cout << contor << endl;

    return 0;
}
```

**Rulare cu `n = 5` si cifrele `1 4 7 2 9`:**
```
5
1 4 7 2 9
3
```

> **Obs:** Programul functioneaza pentru **orice** `n`, nu doar pentru 5. Daca maine problema cere 100 de cifre, codul ramane identic — schimbi doar valoarea introdusa. In varianta cu `if`, ai fi trebuit sa scrii 100 de blocuri identice.

---

## Prelucrarea cifrelor unui numar

In lectia **Expresii cu cifre** am invatat ca `n % 10` da ultima cifra a lui `n` si ca `n / 10` elimina ultima cifra. Cu `while`, putem repeta aceasta operatie pana cand nu mai avem cifre — adica pana cand `n` devine `0`.

Gandul: "ma opresc cand `n == 0`", deci conditia `while` este `n != 0`, sau mai sigur: `n > 0`.

**Tiparul general pentru prelucrarea cifrelor unui numar:**

```cpp
while (n > 0)
{
    int cifra = n % 10;   // obtinem ultima cifra
    // ... prelucram cifra ...
    n /= 10;              // eliminam ultima cifra
}
```

> **Obs:** Conditia `n > 0` functioneaza pentru `n >= 1`. Daca `n = 0`, bucla nu se executa — tratam acest caz separat daca problema o cere.

### Exemplul 4: Numarul de cifre ale unui numar

```cpp
#include <iostream>
using namespace std;

int main()
{
    int n;
    cin >> n;

    int nrCifre = 0;

    while (n > 0)
    {
        nrCifre++;    // numaram o cifra in plus
        n /= 10;      // eliminam ultima cifra
    }

    cout << nrCifre << endl;

    return 0;
}
```

**Rulare cu `n = 4827`:**
```
4827
4
```

**Rulare cu `n = 7`:**
```
7
1
```

| Pas | `n` la intrare  | `nrCifre` dupa `nrCifre++` | `n` dupa `n /= 10` |
|-----|-----------------|----------------------------|--------------------|
| 1   | 4827            | 1                          | 482                |
| 2   | 482             | 2                          | 48                 |
| 3   | 48              | 3                          | 4                  |
| 4   | 4               | 4                          | 0                  |
| —   | 0 (0 > 0 fals)  | —                          | —                  |

> **Obs:** Compara cu ce ai invatat in lectia **Expresii cu cifre**: stiam ca un numar are 4 cifre daca `n >= 1000 && n <= 9999`. Acum putem afla numarul de cifre **fara sa stim dinainte** intervalul — bucla numara singura.

### Exemplul 5: Suma cifrelor unui numar

```cpp
#include <iostream>
using namespace std;

int main()
{
    int n;
    cin >> n;

    int suma = 0;

    while (n > 0)
    {
        int cifra = n % 10;   // ultima cifra
        suma += cifra;         // o adaugam la suma
        n /= 10;               // eliminam ultima cifra
    }

    cout << suma << endl;

    return 0;
}
```

**Rulare cu `n = 4827`:**
```
4827
21
```

Explicatie: `4 + 8 + 2 + 7 = 21`.

**Rulare cu `n = 100`:**
```
100
1
```

> **Obs:** Ordinea in care prelucram cifrele (de la dreapta la stanga) nu conteaza pentru suma — adunarea e comutativa. Vom vedea probleme unde ordinea conteaza (de exemplu, oglinditul unui numar).

---

## Capcane frecvente

### 1. Bucla infinita — uiti actualizarea

```cpp
// GRESIT — i nu se modifica niciodata
int i = 1;
while (i <= n)
{
    cout << i << endl;
    // lipseste i++;
}
```

```cpp
// CORECT
int i = 1;
while (i <= n)
{
    cout << i << endl;
    i++;
}
```

> **Obs:** Daca programul tau "ingheta" si nu mai raspunde, primul lucru de verificat este daca actualizarea exista si este **inauntrul** buclei.

### 2. Conditie in directia gresita

```cpp
// GRESIT — vrem sa numaram de la 1 la n, dar conditia e inversa
int i = 1;
while (i >= n)   // 1 >= 5 e fals de la inceput!
{
    cout << i << endl;
    i++;
}
```

```cpp
// CORECT
int i = 1;
while (i <= n)
{
    cout << i << endl;
    i++;
}
```

> **Obs:** Intreaba-te: "Cand vrea bucla sa **continue**?" si scrie exact acea conditie. Sau: "Cand vrea bucla sa se **opreasca**?" si neaga acea conditie.

### 3. Actualizarea in afara buclei

```cpp
// GRESIT — i++ e dupa acolada inchisa, deci se executa o singura data, dupa bucla
int i = 1;
while (i <= n)
{
    cout << i << endl;
}
i++;    // prea tarziu!
```

```cpp
// CORECT — i++ e inauntrul acoladelor
int i = 1;
while (i <= n)
{
    cout << i << endl;
    i++;
}
```

> **Obs:** Acoladele delimiteaza exact ce se repeta. Tot ce e in afara lor se executa o singura data, dupa ce bucla s-a terminat.

### 4. Acumulatorul nu e initializat la 0

```cpp
// GRESIT — suma contine o valoare necunoscuta din memorie
int suma;
int i = 1;
while (i <= n)
{
    suma += i;
    i++;
}
```

```cpp
// CORECT
int suma = 0;   // intotdeauna initializam acumulatorul!
int i = 1;
while (i <= n)
{
    suma += i;
    i++;
}
```

> **Obs:** Aceasta greseala e perfida — uneori programul pare sa functioneze corect (daca compilatorul pune intamplator 0 in memorie), alteori da rezultate complet gresite.
