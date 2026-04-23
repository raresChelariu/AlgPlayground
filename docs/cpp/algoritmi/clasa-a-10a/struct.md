# Struct

Un **struct** (sau "o structura") este un mod de a grupa mai multe date sub o singura denumire, intr-un **tip nou** de date. Ne permite sa modelam obiecte din realitate (un elev, un punct, o carte) care au mai multe proprietati simultan.

---

## Motivatie: de ce avem nevoie de struct?

Avem de memorat, pentru n elevi ai unei clase, **inaltimea** si **anul nasterii**.

**Solutia 1 — fara struct (vectori paraleli):**

```cpp
double inaltime[100];
int anNastere[100];
```

Daca trebuie sa memorez `k` proprietati pentru cei `n` elevi, am nevoie de `k` vectori diferiti. Daca vreau sa sterg un elev, trebuie sa sterg din fiecare din cei `k` vectori. Daca vreau sa sortez elevii dupa un criteriu, trebuie sa mut in paralel elementele din toti cei `k` vectori — greu si plin de bug-uri.

**Solutia 2 — cu struct:**

Creez un **tip de date nou** care ingloba toate proprietatile unui elev. Apoi e suficient sa declar un singur vector (de elevi), iar fiecare element are cele `k` proprietati.

```cpp
struct Elev {
    double inaltime;
    int anNastere;
};

Elev v[100];  // un singur vector
```

> **Obs:** Proprietatile unui struct se numesc **campuri**. Sensul e de **camp** ca la completarea unui formular.

---

## Definirea unui struct

**Sintaxa:**

```cpp
struct numeStruct
{
    tip1 numeCamp1, numeCamp2;
    tip2 numeCamp3, numeCamp4;
    // ...
};
```

> **Obs:** Atentie la `;` de dupa `}`. Daca lipseste, vom avea eroare de compilare !!!

**Exemplu:**

```cpp
struct Elev {
    float inaltime, medieScolara;
    int anNastere;
};
```

> **Obs:** Tipurile de date predefinite ale limbajului (`int`, `float`, `double`, `long long`, `bool`, `char` etc.) se numesc **tipuri primitive**. Un `struct` este un tip **definit de noi**.

---

## Declararea unei variabile de tip struct

**Sintaxa:** `numeStruct numeVariabila;`

```cpp
struct Elev {
    float inaltime, medieScolara;
    int anNastere;
};

Elev Ionel;   // Ionel este o variabila de tip Elev
Elev Maria;
```

---

## Accesarea campurilor

Pentru a accesa un camp al unei variabile de tip struct folosim **operatorul punct** `.`

**Sintaxa:** `numeVariabila.numeCamp`

```cpp
Ionel.anNastere = 2008;           // scriem in camp
Ionel.medieScolara = 9.50f;

cout << Ionel.anNastere;          // citim din camp
cin >> Ionel.inaltime;            // citim de la tastatura in camp
```

---

## Struct imbricat (un struct ca si camp)

Un camp al unui struct poate fi el insusi de tip struct.

```cpp
struct Buletin {
    bool sex;
    int an, zi, luna;
};

struct Elev {
    int clasa;        // valoare intre 1 si 12
    Buletin b;        // camp de tip Buletin
    float note[3];    // vector de 3 note
};

Elev Ionel;
Ionel.clasa = 11;
Ionel.b.an = 2008;     // acces in lant: Ionel -> b -> an
cout << Ionel.note[0]; // prima nota a lui Ionel
```

> **Obs:** Pot avea un camp de tip `Buletin` in struct-ul `Elev` **doar daca** struct-ul `Buletin` a fost definit inaintea (mai sus de) struct-ului `Elev`.

**Contra-exemplu (nu compileaza):**

```cpp
struct Triunghi {
    Punct v[3];   // EROARE: 'Punct' nu e inca definit
};
struct Punct {
    int x, y;
};
```

Rezolvare: definim `Punct` **inainte** de `Triunghi`.

```cpp
struct Punct {
    int x, y;
};
struct Triunghi {
    Punct v[3];
};
```

---

## Initializare cu acolade

Pot initializa toate campurile unui struct in momentul declararii, dand valorile intre `{ }`, in ordinea declararii campurilor.

```cpp
struct Elev {
    int anNastere;
    float medie;
};

Elev e = {2008, 9.50f};   // anNastere = 2008, medie = 9.50

struct Punct {
    int x, y;
};

Punct p = {3, 4};         // x = 3, y = 4
```

> **Obs:** Ordinea valorilor din `{ }` trebuie sa corespunda **exact** ordinii campurilor din definitia struct-ului.

---

## Declarare variabile intre `}` si `;`

Pot declara variabile de tip struct chiar in momentul definirii tipului, intre `}` si `;`.

```cpp
struct Elev {
    float medie;
    int clasa;
} clasa9[20], Ionel, Maria, Andra;
```

Aceasta instructiune este echivalenta cu:

```cpp
struct Elev {
    float medie;
    int clasa;
};
Elev clasa9[20], Ionel, Maria, Andra;
```

### Structuri anonime

Pot sa definesc un struct **fara nume** (anonim). Singurul mod de a declara variabile de acel tip este in momentul definirii, intre `}` si `;`.

```cpp
struct {
    int x, y;
} puncte[1000];   // vector de 1000 de puncte, fara nume de tip
```

---

## Citirea si afisarea unui struct

In C++ **nu pot citi un intreg struct cu o singura instructiune** `cin >> e;`. Trebuie sa citesc **camp cu camp**, respectiv sa afisez **camp cu camp**.

```cpp
#include <iostream>
using namespace std;

struct Elev {
    char nume[40];
    int clasa;
    float medie;
};

int main()
{
    Elev e;

    // citire
    cin >> e.nume >> e.clasa >> e.medie;

    // afisare
    cout << "Nume: " << e.nume << endl;
    cout << "Clasa: " << e.clasa << endl;
    cout << "Medie: " << e.medie << endl;

    return 0;
}
```

**Intrare:**
```
Ion 10 9.50
```

**Afisare:**
```
Nume: Ion
Clasa: 10
Medie: 9.5
```

> **Obs:** Pentru `char nume[40]`, `cin >> e.nume` citeste **un singur cuvant** (pana la primul spatiu). In aceasta lectie vom folosi mereu nume dintr-un singur cuvant (ex. `Ion`, `Maria`), ca sa nu amestecam citirea.

---

## Atribuirea intre structuri

Atribuirea `a = b;` intre doua variabile de acelasi tip struct se face **automat camp cu camp**.

```cpp
struct Elev {
    int anNastere, lunaNastere, ziNastere;
    float medieGenerala;
};

Elev Ionel, Maria;
// ...
Ionel = Maria;
```

este echivalenta cu:

```cpp
Ionel.anNastere    = Maria.anNastere;
Ionel.lunaNastere  = Maria.lunaNastere;
Ionel.ziNastere    = Maria.ziNastere;
Ionel.medieGenerala = Maria.medieGenerala;
```

> **Obs:** Atribuirea functioneaza **doar** intre variabile de **acelasi tip** struct. `Elev a; Buletin b; a = b;` este eroare.

---

## Swap intre 2 structuri

Pot face swap intre doua variabile de tip struct **doar daca sunt de acelasi tip**.

### Varianta 1: manual, cu variabila auxiliara

```cpp
Elev aux = Ionel;
Ionel = Maria;
Maria = aux;
```

Efectul: se face swap camp cu camp (la fel ca la atribuire).

### Varianta 2: cu `swap` din `<algorithm>`

```cpp
#include <algorithm>
// ...
swap(Ionel, Maria);   // functioneaza la fel ca pentru variabile primitive
```

> **Obs:** Functia `swap` din biblioteca standard functioneaza si pentru structuri (de acelasi tip), nu doar pentru `int` sau `double`.

---

## Vector de struct

**Aceasta este utilizarea cea mai des intalnita** la probleme de tip BAC / pbinfo: un vector de `n` structuri pe care il citim, il parcurgem si extragem informatii.

**Declarare:**

```cpp
Elev v[100];   // vector de maxim 100 de elevi
int n;         // numarul efectiv de elevi
```

**Citirea a `n` structuri:**

```cpp
struct Elev {
    char nume[10];
    int clasa;
    double medie;
};
Elev v[21];

int n, i;
// ...
cin >> n;
for (i = 1; i <= n; i++)
{
    cin >> v[i].nume >> v[i].clasa >> v[i].medie;
}
```

**Afisarea vectorului:**

```cpp
for (i = 1; i <= n; i++)
{
    cout << v[i].nume << " " << v[i].clasa << " " << v[i].medie << endl;
}
```

> **Obs:** `v[i]` este un intreg struct `Elev`, iar `v[i].medie` este campul `medie` al elevului de pe pozitia `i`.

---

## Probleme rezolvate

In toate problemele urmatoare, lucram cu acelasi tip de date:

```cpp
struct Elev {
    char nume[40];
    int clasa;
    float medie;
};
```

### Problema 1: Elevul cu media maxima

**Enunt:** Se citeste `n` (numarul de elevi), apoi pentru fiecare elev se citesc `nume`, `clasa` si `medie`. Sa se afiseze numele elevului cu media cea mai mare.

**Solutie:**

```cpp
#include <iostream>
using namespace std;

struct Elev {
    char nume[40];
    int clasa;
    float medie;
};
int n, i, poz;
Elev v[100];

int main()
{
    cin >> n;
    for (i = 1; i <= n; i++)
    {
        cin >> v[i].nume >> v[i].clasa >> v[i].medie;
    }

    poz = 0;   // pozitia elevului cu media maxima
    for (i = 1; i <= n; i++)
    {
        if (v[i].medie > v[poz].medie)
        {
            poz = i;
        }
    }

    cout << v[poz].nume << endl;

    return 0;
}
```

**Intrare:**
```
4
Ion 10 9.50
Maria 10 9.75
Andrei 10 8.20
Ana 10 9.60
```

**Afisare:**
```
Maria
```

> **Obs:** Retinem **pozitia** (indicele `poz`), nu doar media maxima. Asa putem afisa si numele, si clasa, si orice alt camp al elevului castigator.

### Problema 2: Cati elevi au media >= 9

**Enunt:** Se citeste `n` elevi. Sa se afiseze cati dintre ei au media cel putin 9.

**Solutie:** Folosim un **contor** (tehnica din lectia de `if` — initializam cu 0 si crestem cu 1 pentru fiecare elev care indeplineste conditia).

```cpp
#include <iostream>
using namespace std;

struct Elev {
    char nume[40];
    int clasa;
    float medie;
};
int n, i, contor;
Elev v[100];

int main()
{
    cin >> n;
    for (i = 1; i <= n; i++)
    {
        cin >> v[i].nume >> v[i].clasa >> v[i].medie;
    }

    contor = 0;
    for (i = 1; i <= n; i++)
    {
        if (v[i].medie >= 9)
        {
            contor++;
        }
    }

    cout << contor << endl;

    return 0;
}
```

**Intrare:**
```
4
Ion 10 9.50
Maria 10 9.75
Andrei 10 8.20
Ana 10 9.60
```

**Afisare:**
```
3
```

### Problema 3: Media aritmetica a mediilor

**Enunt:** Se citeste `n` elevi. Sa se afiseze media aritmetica a mediilor lor (cu 2 zecimale).

**Solutie:** Acumulam suma mediilor, apoi impartim la `n`.

```cpp
#include <iostream>
#include <iomanip>
using namespace std;

struct Elev {
    char nume[40];
    int clasa;
    float medie;
};
int n, i;
Elev v[100];
float suma, mediaClasei;

int main()
{
    cin >> n;
    for (i = 1; i <= n; i++)
    {
        cin >> v[i].nume >> v[i].clasa >> v[i].medie;
    }

    suma = 0;
    for (i = 1; i <= n; i++)
    {
        suma += v[i].medie;
    }

    mediaClasei = suma / n;
    cout << fixed << setprecision(2) << mediaClasei << endl;
    return 0;
}
```

**Intrare:**
```
4
Ion 10 9.50
Maria 10 9.75
Andrei 10 8.20
Ana 10 9.60
```

**Afisare:**
```
9.26
```

> **Obs:** `fixed` si `setprecision(2)` din `<iomanip>` ne dau exact 2 zecimale la afisare.

### Problema 4: Sortare descrescatoare dupa medie

**Enunt:** Se citeste `n` elevi. Sa se afiseze elevii ordonati descrescator dupa medie.

**Solutie:** Folosim **sortare prin selectie**. Pentru fiecare pozitie `i` (de la `0` la `n-1`), cautam in `v[i..n-1]` elevul cu media cea mai mare si il aducem pe pozitia `i` printr-un `swap`. Aici `swap` se aplica **intre doua structuri** de acelasi tip — exact ca in sectiunea `Swap intre 2 structuri`.

```cpp
#include <iostream>
#include <algorithm>
using namespace std;

struct Elev {
    char nume[40];
    int clasa;
    float medie;
};
int n, poz, i, j;
Elev v[100];

int main()
{
    cin >> n;
    for (i = 1; i <= n; i++)
    {
        cin >> v[i].nume >> v[i].clasa >> v[i].medie;
    }

    // sortare prin selectie, descrescator dupa medie
    for (i = 1; i <= n - 1; i++)
    {
        poz = i;
        for (j = i + 1; j <= n; j++)
        {
            if (v[j].medie > v[poz].medie)
            {
                poz = j;
            }
        }
        if (poz != i)
        {
            swap(v[i], v[poz]);   // swap intre 2 structuri de tip Elev
        }
    }

    // afisare
    for (i = 1; i <= n; i++)
    {
        cout << v[i].nume << " " << v[i].medie << endl;
    }

    return 0;
}
```

**Intrare:**
```
4
Ion 10 9.50
Maria 10 9.75
Andrei 10 8.20
Ana 10 9.60
```

**Afisare:**
```
Maria 9.75
Ana 9.6
Ion 9.5
Andrei 8.2
```

> **Obs:** `swap(v[i], v[poz])` mutand intregi structuri muta **toate** campurile (nume, clasa, medie) deodata — exact asta ne dorim. Daca am avea vectori paraleli (`nume[]`, `clasa[]`, `medie[]`), ar trebui sa facem 3 swap-uri separate si usor de gresit.

---

## Capcane frecvente

### 1. Lipsa `;` dupa `}`

```cpp
// GRESIT
struct Elev {
    int clasa;
    float medie;
}                  // lipseste ;

// CORECT
struct Elev {
    int clasa;
    float medie;
};
```

### 2. Citire/afisare pe intreg struct

```cpp
Elev e;
cin >> e;          // EROARE — struct-ul nu stie sa se citeasca singur
cout << e;         // EROARE — la fel
```

**Corect:** citim/afisam camp cu camp.

```cpp
cin >> e.nume >> e.clasa >> e.medie;
cout << e.nume << " " << e.clasa << " " << e.medie;
```

### 3. Mai intai definim tipul, dupa folosim tipul mai jos

Un struct nu poate avea un camp de un tip care **nu este inca definit** la momentul respectiv. Definim intotdeauna tipurile **de la cel mai simplu la cel mai complex**.

```cpp
// CORECT: Punct e definit inainte sa fie folosit in Triunghi
struct Punct {
    int x, y;
};
struct Triunghi {
    Punct v[3];
};
```

### 4. Swap / atribuire intre tipuri diferite

```cpp
Elev a;
Buletin b;
a = b;             // EROARE — tipuri diferite
swap(a, b);        // EROARE — tipuri diferite
```

Atribuirea si swap functioneaza **numai** intre variabile de **acelasi** tip struct.
