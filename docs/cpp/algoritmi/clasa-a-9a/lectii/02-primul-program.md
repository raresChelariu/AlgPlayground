# Primul program C++

## Instalare CodeBlocks

Pentru a scrie si rula programe C++, vom folosi **CodeBlocks** — un editor simplu si gratuit.

### Download si instalare

1. Intra pe site-ul oficial: [codeblocks.org/downloads](https://www.codeblocks.org/downloads/)
2. Apasa pe **"Download the binary release"**
3. **Important:** Alege varianta care contine **mingw** in nume (de exemplu `codeblocks-20.03mingw-setup.exe`). Aceasta varianta include compilatorul MinGW, care este necesar pentru a transforma codul C++ in programe executabile. Daca alegi varianta fara MinGW, nu vei putea rula niciun program!
4. Descarca si instaleaza ca orice alt program (Next → Next → Install)

### Creare proiect nou

In CodeBlocks lucram cu **proiecte**. Un proiect nou se creeaza o singura data si poate fi refolosit pentru mai multe probleme (de exemplu, problemele de pe [pbinfo.ro](https://www.pbinfo.ro/)).

1. Deschide CodeBlocks
2. **File → New → Project...**
3. Alege **Console application** → Next
4. Alege **C++** → Next
5. La **Project title** scrie un nume (de exemplu `Probleme`)
6. Alege un folder unde sa fie salvat proiectul → Next → Finish

Acum ai un fisier `main.cpp` in care poti scrie cod. Cand vrei sa rezolvi o alta problema, nu trebuie sa creezi un proiect nou — **stergi codul vechi din `main.cpp` si scrii codul nou**.

### Rularea unui program

Pentru a rula programul, apasa tasta **F9** (sau din meniu: **Build → Build and run**). CodeBlocks va compila codul si va afisa rezultatul intr-o fereastra de consola.

De exemplu, daca ai urmatorul cod in `main.cpp`:

```cpp
#include <iostream>
using namespace std;

int main()
{
    cout << "Salut!";
    return 0;
}
```

Apesi **F9** si vei vedea in consola:
```
Salut!
```

### Erori de compilare

Ce se intampla daca scriem cod gresit? Sa incercam — sterge `;` de la sfarsitul lui `cout`:

```cpp
#include <iostream>
using namespace std;

int main()
{
    cout << "Salut!"
    return 0;
}
```

Apasa **F9**. Programul **nu va rula** si vei primi o eroare de compilare.

Pentru a vedea erorile, uita-te in panoul **"Build messages"** din partea de jos a ecranului. Daca nu il vezi, apasa tasta **F2** pentru a-l afisa sau ascunde.

In acest caz, eroarea iti va spune ceva de genul `expected ';'` — adica lipseste `;`. Compilatorul iti arata si **linia** unde a gasit problema, asa ca poti naviga rapid la ea si o repara.

> **Sfat:** Citeste mereu mesajele de eroare! La inceput pot parea complicate, dar de cele mai multe ori iti spun exact ce lipseste sau ce ai scris gresit.

---

## Structura minima a unui program C++

Orice program C++ are nevoie de o **structura minima** pentru a putea fi rulat. 

## Structura minima

```cpp
#include <iostream>        
using namespace std;       

int main()                 
{
    cout << "Salut!";      
    return 0;
}
```

**Rezultat**
```
Salut!
```

Observatii: 

> Instructiunile noastre vor fi scrise de obicei intre acoladele ( { } ) de la `int main() { }`

```cpp
int main() 
{ 

}
```

> Mereu codul din `int main()` se va termina cu instructiunea `return 0;`
> Aceasta termina executia programului.
- `return 0;`

> **Obs:** Fiecare instructiune se termina cu `;` (punct si virgula). Daca uiti `;`, compilatorul va da eroare.

---

## Afisarea cu `cout`

`cout` (pronuntat "see-out") vine de la **c**haracter **out**put. Il folosim cu operatorul `<<` pentru a trimite valori catre ecran.

```cpp
#include <iostream>
using namespace std;

int main()
{
    cout << "Am 16 ani";
    return 0;
}
```

**Output:**
```
Am 16 ani
```

### Afisarea mai multor valori

Putem inlantui mai multe valori cu `<<`:

```cpp
#include <iostream>
using namespace std;

int main()
{
    cout << "Am " << 16 << " ani";
    return 0;
}
```

**Output:**
```
Am 16 ani
```

> **Obs:** Textul se pune intre ghilimele duble `"..."`. Numerele se scriu direct, fara ghilimele.

---

## Trecerea pe linie noua

Daca scriem mai multe `cout`-uri, textul se afiseaza **pe aceeasi linie**:

```cpp
#include <iostream>
using namespace std;

int main()
{
    cout << "Prima";
    cout << "A doua";
    return 0;
}
```

**Output:**
```
PrimaA doua
```

Pentru a trece pe o linie noua, folosim `endl`:

### Cu `endl`

```cpp
#include <iostream>
using namespace std;

int main()
{
    cout << "Prima" << endl;
    cout << "A doua" << endl;
    return 0;
}
```

**Output:**
```
Prima
A doua
```

---

## Comentarii

Comentariile sunt notite pe care le lasam in cod. 

Calculatorul le **ignora** complet — sunt doar pentru noi, ca sa intelegem ce face codul.

### Comentariu pe o singura linie: `//`

```cpp
#include <iostream>
using namespace std;

int main()
{
    // afisez un mesaj de salut
    cout << "Salut!" << endl;
    return 0;
}
```

### Comentariu pe mai multe linii: `/* ... */`

```cpp
#include <iostream>
using namespace std;

int main()
{
    /* Acesta este un comentariu
       care se intinde pe
       mai multe linii */
    cout << "Salut!" << endl;
    return 0;
}
```

---

## Exemplu complet

```cpp
#include <iostream>
using namespace std;

int main()
{
    cout << "Numele meu este Ana." << endl;
    cout << "Am " << 15 << " ani." << endl;
    cout << "Invat la liceu." << endl;
    return 0;
}
```

**Output:**
```
Numele meu este Ana.
Am 15 ani.
Invat la liceu.
```
