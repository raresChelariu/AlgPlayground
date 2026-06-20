# Functii

- O **functie** (sau "subprogram") este un grup de instructiuni ce are un nume
- Functiile ne permit:
  - sa impartim un program lung in bucati mai mici
  - sa scriem o secventa de instructiuni ce are un anume scop (ex: sa calculam oglinditul) si sa o reutilizam

> [!NOTE] Observatie
> "Functie" si "subprogram" sunt sinonime. La fel, "parametru" si "argument".

---

## Definitia unei functii - Sintaxa

Definitia unei functii are doua parti: **antetul** (semnatura) si **corpul** (codul efectiv).

```cpp
tipReturnat numeFunctie(listaParametrilor)
{
    // corpul functiei
}
```

- `tipReturnat` 
  - tipul valorii pe care o intoarce functia (`int`, `float`, `double`, `bool`, ...)
  - Daca functia nu intoarce nimic, scriem `void`.
- `numeFunctie` — numele prin care apelam functia.
- `listaParametrilor` 

Un exemplu este chiar functia `int main`:

```cpp
#include <iostream>
using namespace std;

int main()
{
    return 0;
}
```

Ce observam in exemplul de mai sus:
- functia se numeste `main`
- tipul de returnat este `int`
- adica este tipul valorii folosite la instructiunea `return`
- dupa cuvantul `main` urmeaza parantezele rotunde goale
  - deci vom spune ca lista parametrilor este goala
  - adica functia nu are parametri

### Lista parametrilor 

Sintaxa:

```cpp
tipParam1 numeParam1, tipParam2 numeParam2, ... , tipParamK numeParamK
```

**Exemplu de lista de parametri:**

```cpp
int a, float x
// 2 parametri:
//   primul - se numeste a, este de tip int
//   al 2 lea - se numeste x, este de tip float
```

> [!NOTE] Observatie
> Lista parametrilor poate fi si goala.


> [!WARNING] Atentie!
> Trebuie scris tipul de date al parametrului pentru FIECARE parametru

Exemplu gresit de lista de parametri:

```cpp
int a, b, c
```

Exemplu corect:
```cpp
int a, int b, int c
```

## Exemplu — Functie ce calculeaza triplul unui numar

```cpp
#include <iostream>
using namespace std;

// aici am definit functia "triplu"

int triplu(int x) 
{
    return 3 * x;
}
int main()
{
    // dar nu am folosit-o
    return 0;
}
```

**Afisare:**
```
```

```cpp
#include <iostream>
using namespace std;

// aici am definit functia "triplu"
int triplu(int x) 
{
    return 3 * x;
}
int main()
{
    // si aici m-am folosit de ea
    // adica am apelat functia "triplu" cu valoarea 7 pentru parametrul "x"
    cout << triplu(7);
    return 0;
}
```

**Afisare:**
```
21
```

## Apelul unei functii

- en: **function call**
- o definitie de functie este ca o reteta, de ex: de cozonac
  - una e sa scriem reteta pe foaie si e altceva sa facem cozonacul
- ca sa folosim o functie trebuie sa o apelam

### Sintaxa apel:

```cpp
numeFunctie(valPtParam1, valPtParam2, ... , valPtParamK);
```

### Sintaxa apel pentru functie fara parametri:

```cpp
numeFunctie();
```

---

## Exemplu — functie `void`

```cpp
#include <iostream>
using namespace std;

// pot face functia de tip void 
// pentru ca nu folosesc instructiune "return"
void salut() 
{
    cout << "Salut!";
}
int main()
{
    salut();    // aici se apeleaza functia
    return 0;
}
```

**Afisare:**
```
Salut!
```

> [!TIP] Sfat
> Pentru a apela o functie, scriem `numeFunctie(valoriParametri);`. Daca functia nu are parametri, parantezele raman goale: `salut();`.

---

## Exemplu — functie definita, dar neapelata (nu a fost folosita)

```cpp
#include <iostream>
using namespace std;

void salut() 
{
    cout << "Salut!";
}
int main()
{
    return 0;
}
```

**Afisare:**
```
```

- Nu se afiseaza NIMIC. 
- Tot ce face programul meu e doar in functia `main`
- faptul ca functia `salut()` e definita mai sus, nu inseamna ca e si folosita
- pentru a o folosi ar fi trebui sa vad in `main()` un apel de forma `salut();`

---

## Exemplu — functie apelata, dar nedefinita

- Toate functiile trebuie definite ca sa poate sa fie apelate
- daca nu sunt definite mai sus, obtin `EROARE DE COMPILARE`

```cpp
#include <iostream>
using namespace std;

int main()
{
    salut(); // error: 'salut' was not declared in this scope
    return 0;
}
```

---

## Returnarea unei valori — `return`

Sintaxa: `return expresie;`

`return` are doua efecte:
1. Da inapoi (returneaza) valoarea expresiei catre locul de unde a fost apelata functia.
2. **Opreste executia functiei** — orice cod de dupa `return` nu se mai executa.

### Exemplul 1: apelul fara folosirea valorii returnate

```cpp
#include <iostream>
using namespace std;

int patrat(int x)
{
    return x * x;
}
int main()
{
    patrat(3);   // DOAR se executa functia
                 // valoarea returnata (9) este IGNORATA
                 // NU se afiseaza nimic (nu apare "cout")
    return 0;
}
```

**Afisare:** (nimic)

> [!WARNING] Atentie 
> ```
> Nu confunda returnarea cu afisarea!
> Returnarea inseamna a da inapoi un rezultat celui ce a apelat functia.
> Afisarea se intampla doar cand folosesc instructiunea `cout` !
> ```


### Exemplul 2: folosirea valorii returnate

```cpp
#include <iostream>
using namespace std;

int patrat(int x)
{
    return x * x;
}
int main()
{
    cout << patrat(3);
    return 0;
}
```

**Afisare:**
```
9
```

### Exemplul 3: `return` opreste executia functiei

```cpp
#include <iostream>
using namespace std;

int patrat(int x)
{
    cout << "Hey!" << endl;
    cout << "Pa";
    return x * x;
    // NU SE MAI EXECUTA - executia s-a oprit deja la return
    cout << "Wow";
}
int main()
{
    cout << patrat(3);
    return 0;
}
```

**Afisare:**
```
Hey!
Pa9
```

> [!IMPORTANT] Important
> "Wow" nu apare niciodata pentru ca `return` opreste executia functiei imediat. Compilatorul ne avertizeaza ca exista cod care nu se poate executa (`unreachable code`).

---

## `return;` intr-o functie `void`

Putem folosi `return;` (fara expresie) intr-o functie `void` pentru a opri mai devreme executia.

```cpp
#include <iostream>
using namespace std;

void salut(bool spuneLaRevedere)
{
    cout << "Salut!" << endl;
    if (spuneLaRevedere == 0)
        return;   // daca conditia e adevarata, se termina functia
    // ajungem aici DOAR daca spuneLaRevedere != 0
    cout << "Ciao!";
    return;
    // NU se executa niciodata
    cout << "Abracadabra!";
}
int main()
{
    salut(1);
    return 0;
}
```

**Afisare:**
```
Salut!
Ciao!
```

---

## Variabile locale vs globale

| | Locala | Globala |
|---|---|---|
| Unde se declara | in interiorul unei functii | in afara oricarei functii |
| Cat "traieste" | de la declarare pana la finalul apelului functiei | de la pornirea programului pana la final |
| De unde poate fi accesata | doar din functia in care e declarata | de oriunde |
| Valoare initiala | **random** (trebuie initializata !) | **0** |

### Exemplu — locala vs globala

```cpp
#include <iostream>
using namespace std;

int a;            // a este variabila GLOBALA
int sumcif(int x)
{
    int s;        // s este variabila LOCALA
    return s;
}
int main()
{
    return 0;
}
```

### Exemplu — globala are initial valoarea 0

```cpp
#include <iostream>
using namespace std;

int a;
int main()
{
    cout << a;    // se afiseaza 0
                  // pentru ca a este variabila globala
    return 0;
}
```

**Afisare:**
```
0
```

### Exemplu — locala nu e accesibila in afara functiei

```cpp
#include <iostream>
using namespace std;

void f()
{
    int y;
}
int main()
{
    f();
    cout << y;    // EROARE - y este locala lui f()
                  // nu exista in main
    return 0;
}
```

> [!WARNING] Eroare la compilare
> ```
> error: 'y' was not declared in this scope
> ```

---

## Ordinea conteaza — codul se compileaza de sus in jos

Compilatorul parcurge fisierul **de sus in jos**. Nu putem folosi ceva inainte sa fi fost declarat.

### Variabila folosita inainte de a fi declarata

```cpp
#include <iostream>
using namespace std;
int b = a;
int a = 3;
// la linia 3, compilatorul nu stie cine este "a"
int main()
{
    return 0;
}
```

> [!WARNING] Eroare la compilare
> ```
> error: 'a' was not declared in this scope
> ```

### Functie folosita inainte de a fi definita

```cpp
#include <iostream>
using namespace std;

int cub(int x)
{
    return patrat(x) * x;
    // NU MERGE - "patrat" e definita mai jos,
    // compilatorul nu o cunoaste la linia asta
}
int patrat(int x)
{
    return x * x;
}
int main()
{
    cout << cub(3);
    return 0;
}
```

> [!WARNING] Eroare la compilare
> ```
> error: 'patrat' was not declared in this scope
> ```

---

## Declararea unei functii

Putem **declara** o functie (anunta compilatorul ca exista) inainte de a o **defini** (scrie efectiv corpul).

**Sintaxa unei declarari:**

```cpp
tipReturnat numeFunctie(listaParametrilor);
```

(Scriem antetul si apoi `;`.)

### Exemplu — declarare rezolva problema de mai sus

```cpp
#include <iostream>
using namespace std;

int patrat(int x);   // DECLARARE - spunem ca exista o functie "patrat"
int cub(int x)
{
    return patrat(x) * x;   // MERGE - patrat e declarata mai sus
}
int patrat(int x)    // DEFINITIE
{
    return x * x;
}
int main()
{
    cout << cub(3);
    return 0;
}
```

**Afisare:**
```
27
```

### Atentie — declarare fara definitie

Daca declaram o functie dar nu o definim, apare o eroare la compilare:

```cpp
#include <iostream>
using namespace std;

int patrat(int x);   // declarata, dar nedefinita nicaieri
int cub(int x)
{
    return patrat(x) * x;
}
int main()
{
    cout << cub(3);
    return 0;
}
```

> [!WARNING] Eroare la compilare
> ```
> undefined reference to 'patrat(int)'
> ld returned 1 exit status
> ```

---

## Schelet recomandat al unui program cu functii

Daca declaram **toate** functiile la inceput, ordinea in care le definim mai jos nu mai conteaza.

```cpp
#include <iostream>
using namespace std;

// 1. DECLARARI DE FUNCTII
int patrat(int x);
int cub(int x);

// 2. DECLARARI DE VARIABILE GLOBALE
int x;

// 3. FUNCTIA main
int main()
{
    cin >> x;
    cout << cub(x);
    return 0;
}

// 4. DEFINITII DE FUNCTII (in orice ordine)
int cub(int x)
{
    return patrat(x) * x;
}
int patrat(int x)
{
    return x * x;
}
```

> [!TIP] Sfat
> Acest sablon este foarte util cand avem multe functii care se apeleaza intre ele. Declaram toate antetele la inceput, apoi le definim oricum vrem.

---

## Variabile cu acelasi nume — shadowing

### Globala vs locala

Daca am o variabila globala si una locala cu **acelasi nume**, in functie se acceseaza **cea locala** (cea locala "ascunde" globala).

```cpp
#include <iostream>
using namespace std;

int x = 7;          // globala
void f()
{
    int x = 3;      // locala - ascunde globala in interiorul lui f
    cout << x << endl;
}
int main()
{
    f();
    cout << x;      // aici se acceseaza globala (cea locala s-a dealocat)
    return 0;
}
```

**Afisare:**
```
3
7
```

### Locala cu acelasi nume ca un parametru — EROARE

```cpp
#include <iostream>
using namespace std;

void f(int n)
{
    int n;   // EROARE - nu pot avea o variabila locala
             // cu acelasi nume ca un parametru
}
int main()
{
    f(3);
    return 0;
}
```

> [!WARNING] Eroare la compilare
> ```
> error: declaration of 'int n' shadows a parameter
> ```

### Globala vs parametru cu acelasi nume

In functie, se acceseaza **parametrul** (acelasi principiu ca la locala vs globala — cel "din interior" castiga).

```cpp
#include <iostream>
using namespace std;

int n = 7;        // globala
void f(int n)
{
    cout << n;    // se afiseaza valoarea PARAMETRULUI
}
int main()
{
    f(3);
    return 0;
}
```

**Afisare:**
```
3
```

---

## Stiva de apeluri (call stack)

**Stiva de apeluri** este o zona de memorie in care se memoreaza apelurile de functii. In limba engleza: *call stack*.

Cand se apeleaza o functie, pe stiva se memoreaza:
- locul de unde a fost apelata (ca sa stim unde sa ne intoarcem dupa terminarea ei),
- valorile parametrilor (copie a argumentelor din apel),
- variabilele locale ale acelui apel.

**Pasii unui apel:**

1. Se memoreaza locul de unde se apeleaza functia.
2. Se pun pe stiva valorile parametrilor (intr-un apel nou).
3. Se executa functia pana la terminarea ei.
4. Se continua executia din locul memorat la pasul 1.
5. Apelul se sterge de pe stiva (impreuna cu parametrii si variabilele locale).

> [!NOTE] Observatie
> La pornirea programului, pe stiva exista **doar** apelul lui `main`. Apelul din **varful stivei** este intotdeauna apelul in care ne aflam cu executia.

Asta explica de ce variabilele locale "traiesc" doar pana la finalul apelului — la pasul 5, ele se sterg de pe stiva odata cu apelul.

---

## Capcane frecvente

### 1. Folosirea unei locale neinitializate

Variabilele locale au o valoare initiala **random**. Trebuie mereu initializate inainte de folosire.

```cpp
void f()
{
    int s;          // s are o valoare random
    cout << s;      // afiseaza ceva aleator - BUG
}
```

**Corect:**

```cpp
void f()
{
    int s = 0;
    cout << s;
}
```

### 2. Apel corect dar pentru o functie nedeclarata sau nedefinita (inca)

```cpp
#include <iostream>
using namespace std;

int main()
{
    cout << patrat(3);   // EROARE - patrat nu e cunoscuta inca
    return 0;
}
int patrat(int x)
{
    return x * x;
}
```

**Solutie:** declaram functia inainte de `main`, sau folosim sabloanele cu toate declararile sus.

**Corect:**

```cpp
#include <iostream>
using namespace std;

int patrat(int x); // am declarat, deci o pot apela si definitia o pot scrie oriunde mai jos
int main()
{
    cout << patrat(3);
    return 0;
}
int patrat(int x)
{
    return x * x;
}
```

**Afisare:**

> 9


### 3. Declarata, dar nedefinita

Daca scriem `int patrat(int x);` si apoi nu definim niciodata corpul functiei, primim eroare de **compilare** (`undefined reference`).

```cpp
#include <iostream>
using namespace std;
int patrat(int x);

int main()
{
    cout << patrat(7);
    return 0;
}
```

> [!WARNING] Eroare la compilare
> ```
> error: undefined reference to `patrat(int)'
> ```

### 4. Locala cu acelasi nume ca un parametru

```cpp
#include <iostream>
using namespace std;

void f(int n)
{
    int n;   // EROARE - shadows a parameter
}

int main()
{
    return 0;
}

```

> [!WARNING] Eroare la compilare
> ```
> error: error: declaration of 'int n' shadows a parameter
> ```

- Nu putem avea o locala cu acelasi nume ca un parametru 
- Sunt declarate in acelasi "univers"
- Daca chiar vrem o locala separata, ii dam alt nume.
