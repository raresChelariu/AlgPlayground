# Parametri prin referinta

- In lectia [Functii](./functii.md) am vazut ca **parametrii sunt copii**: functia primeste valoarea argumentului, nu variabila insasi.
- Uneori insa vrem ca functia sa **modifice** variabila primita la apel (ex: sa interschimbe doua variabile, sa "intoarca" doua rezultate deodata).
- Pentru asta folosim **parametri prin referinta**.

> [!NOTE] Observatie
> In limba engleza:
> - transmiterea prin valoare = **pass by value**
> - transmiterea prin referinta = **pass by reference**

---

## Transmiterea prin valoare (pass by value)

Ce se intampla cand se apeleaza o functie cu un parametru obisnuit?

```cpp
#include <iostream>
using namespace std;

int x;

void f(int k)
{
    k += 5;
    // k este o zona de memorie diferita fata de x
    // fiecare parametru este o copie a valorii primite la apel
}
int main()
{
    x = 3;
    f(x);
    cout << x; // se afiseaza 3
    return 0;
}
```

**Afisare:**
```
3
```

- La apelul `f(x)` se copiaza **valoarea** lui `x` (adica `3`) in parametrul `k`.
- `k += 5` modifica doar copia: `k` devine `8`.
- Cand se termina apelul, `k` se sterge de pe stiva, iar `x` a ramas `3`.

---

## Transmiterea prin referinta (pass by reference)

Daca punem `&` in fata numelui parametrului, acesta devine **parametru prin referinta**.

**Sintaxa:**

```cpp
tipParametru &numeParametru
```

```cpp
#include <iostream>
using namespace std;

int x;

void f(int &k)
{
    // pe stiva, "in spatele cortinei", s-a copiat ADRESA variabilei primite la apel
    // (NU s-a copiat valoarea)
    k += 5; // aici modific zona de memorie primita la apel
    // pot face asta deoarece in apel se retine adresa
}
int main()
{
    x = 3;
    f(x);
    cout << x; // se afiseaza 8
    return 0;
}
```

**Afisare:**
```
8
```

- La apelul `f(x)`, `k` **nu** mai este o zona de memorie noua, ci un alt nume pentru `x`.
- Orice modificare facuta asupra lui `k` in functie se face de fapt asupra lui `x`.

> [!IMPORTANT] Important
> Diferenta dintre cele doua programe este **un singur caracter**: `&` din antetul functiei. Apelul `f(x)` se scrie la fel in ambele cazuri.

| | Prin valoare | Prin referinta |
|---|---|---|
| Antet | `void f(int k)` | `void f(int &k)` |
| Ce se copiaza pe stiva la apel | valoarea argumentului | adresa argumentului |
| Modificarea lui `k` se vede in `main`? | **NU** | **DA** |
| Ce putem da la apel | orice expresie: `f(x)`, `f(3)`, `f(x + 1)` | doar o variabila: `f(x)` |

---

## La apel trebuie sa dam o variabila

Un parametru prin referinta trebuie sa "arate" spre o zona de memorie. O constanta sau o expresie nu are o zona de memorie in care functia sa poata scrie.

```cpp
#include <iostream>
using namespace std;

void f(int &k)
{
    k += 5;
}
int main()
{
    f(3);   // EROARE - 3 nu este o variabila
    return 0;
}
```

> [!WARNING] Eroare la compilare
> ```
> error: cannot bind non-const lvalue reference of type 'int&' to an rvalue of type 'int'
> ```

La fel, `f(x + 1)` da aceeasi eroare: `x + 1` este o valoare calculata, nu o variabila.

---

## Codul echivalent cu pointeri

In spatele cortinei, o referinta functioneaza ca un **pointer**: la apel se trimite adresa variabilei, iar functia scrie la acea adresa. Acelasi program, scris explicit cu pointeri:

```cpp
#include <iostream>
using namespace std;

int x;

void f2(int *p)
{
    *p += 5;    // modific valoarea de la adresa p
}
int main()
{
    x = 3;
    f2(&x);     // trimit adresa lui x
    cout << x;  // se afiseaza 8
    return 0;
}
```

**Afisare:**
```
8
```

- `&x` — adresa lui `x`
- `int *p` — parametrul `p` retine o adresa
- `*p` — variabila aflata la adresa `p` (adica `x`)

> [!NOTE] Observatie
> Pointerii sunt explicati pe larg in lectia [Pointeri](./pointeri.md). Aici e suficient sa retii ideea: varianta cu `&` in antet face acelasi lucru, dar compilatorul se ocupa singur de adrese, asa ca nu mai scriem nici `&x` la apel, nici `*p` in functie.

---

## Exemplu — Interschimbarea a doua variabile

Se citesc doua numere `a` si `b`. Sa se interschimbe valorile lor folosind o functie, apoi sa se afiseze.

### Varianta gresita — prin valoare

```cpp
#include <iostream>
using namespace std;

int a, b;

void interschimba(int x, int y)
{
    int aux;
    aux = x;
    x = y;
    y = aux;
    // s-au interschimbat doar copiile x si y
}
int main()
{
    cin >> a >> b;
    interschimba(a, b);
    cout << a << " " << b;
    return 0;
}
```

**Intrare:**
```
3 7
```

**Afisare:**
```
3 7
```

### Varianta corecta — prin referinta

```cpp
#include <iostream>
using namespace std;

int a, b;

void interschimba(int &x, int &y)
{
    int aux;
    aux = x;
    x = y;
    y = aux;
    // x este a, y este b, deci s-au interschimbat chiar a si b
}
int main()
{
    cin >> a >> b;
    interschimba(a, b);
    cout << a << " " << b;
    return 0;
}
```

**Intrare:**
```
3 7
```

**Afisare:**
```
7 3
```

> [!WARNING] Atentie
> Trebuie pus `&` la **fiecare** parametru prin referinta. In antetul `void interschimba(int &x, int y)` doar `x` este prin referinta; `y` ramane o copie.

---

## Exemplu — O functie care "intoarce" doua rezultate

Cu `return` o functie poate da inapoi **o singura** valoare. Daca avem nevoie de mai multe rezultate, le putem trimite prin parametri prin referinta.

Se citeste un numar natural `n`. Sa se afiseze cea mai mica si cea mai mare cifra a lui `n`.

```cpp
#include <iostream>
using namespace std;

int n, cMin, cMax;

void minMaxCifre(int x, int &mini, int &maxi)
{
    int c;
    mini = 9;
    maxi = 0;
    do
    {
        c = x % 10;
        if (c < mini)
            mini = c;
        if (c > maxi)
            maxi = c;
        x = x / 10;
    } while (x != 0);
}
int main()
{
    cin >> n;
    minMaxCifre(n, cMin, cMax);
    cout << cMin << " " << cMax;
    return 0;
}
```

**Intrare:**
```
4825
```

**Afisare:**
```
2 8
```

- `x` este transmis **prin valoare**: functia il imparte la 10 pana ajunge la 0, dar `n` ramane neschimbat.
- `mini` si `maxi` sunt transmise **prin referinta**: `mini` este `cMin`, iar `maxi` este `cMax`, deci valorile calculate in functie ajung direct in `cMin` si `cMax`.

> [!NOTE] Observatie
> Am folosit `do ... while` ca sa functioneze si pentru `n = 0` (are o singura cifra, `0`).

> [!TIP] Sfat
> Regula de alegere:
> - parametrul este doar o **intrare** pentru functie (functia doar il citeste) → prin valoare
> - parametrul este un **rezultat** pe care functia trebuie sa il dea inapoi → prin referinta
