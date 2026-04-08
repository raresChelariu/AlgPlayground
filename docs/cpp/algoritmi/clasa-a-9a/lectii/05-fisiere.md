# Citirea si afisarea din fisiere

In lectia anterioara am citit de la tastatura (`cin`) si am afisat pe ecran (`cout`). In multe probleme (pe pbinfo.ro, la concursuri) citirea si afisarea se fac din/in **fisiere**. In aceasta lectie invatam cum.

## De ce fisiere?

- Multe probleme cer sa citesti din `date.in` si sa scrii in `date.out`
- Nu trebuie sa tastezi datele de fiecare data cand testezi
- Poti lucra cu date mari fara sa le introduci manual

---

## `ifstream` si `ofstream`

Pentru fisiere avem nevoie de biblioteca `<fstream>`:

| Obiect | Rol | Analog |
|--------|-----|--------|
| `ifstream` | Citire din fisier (**i**nput **f**ile) | ca `cin`, dar din fisier |
| `ofstream` | Scriere in fisier (**o**utput **f**ile) | ca `cout`, dar in fisier |

---

## Exemplu minimal

Fisierul `date.in` contine:
```
5 3
```

Programul citeste cele doua numere si scrie suma in `date.out`:

```cpp
#include <fstream>
using namespace std;

int main()
{
    ifstream fin("date.in");     // deschid fisierul pentru citire
    ofstream fout("date.out");   // deschid fisierul pentru scriere

    int a, b;
    fin >> a >> b;               // citesc din fisier (la fel ca cin >>)
    fout << a + b << endl;       // scriu in fisier (la fel ca cout <<)

    return 0;
}
```

Fisierul `date.out` va contine:
```
8
```

> **Obs:** `fin` si `fout` sunt **numele pe care le alegem noi** pentru obiectele de fisier. Putem folosi orice nume: `f`, `in`, `citire`, etc. Conventia `fin`/`fout` e doar cea mai raspandita.

---

## Pas cu pas

### 1. Includem `<fstream>`

```cpp
#include <fstream>
```

> **Obs:** Nu mai avem nevoie de `#include <iostream>` daca nu folosim `cin`/`cout`. Dar le putem include pe amandoua daca vrem sa afisam si pe ecran si in fisier.

### 2. Deschidem fisierele

```cpp
ifstream fin("date.in");     // deschide date.in pentru citire
ofstream fout("date.out");   // creeaza (sau suprascrie) date.out pentru scriere
```

### 3. Citim si scriem

Exact ca `cin >>` si `cout <<`, dar inlocuim cu `fin >>` si `fout <<`:

```cpp
fin >> a >> b;           // citesc doua valori din fisier
fout << a + b << endl;   // scriu rezultatul in fisier
```

---

## Citirea mai multor valori din fisier

Fisierul `numere.in`:
```
10 20 30
```

```cpp
#include <fstream>
using namespace std;
ifstream fin("numere.in");
ofstream fout("numere.out");
int a, b, c;

int main()
{
    fin >> a >> b >> c;

    fout << "Suma: " << a + b + c << endl;
    fout << "Primul numar: " << a << endl;

    return 0;
}
```

Fisierul `numere.out`:
```
Suma: 60
Primul numar: 10
```

---

## Combinarea fisierelor cu ecranul

Daca vrei sa citesti din fisier **si** sa afisezi pe ecran, include ambele biblioteci:

```cpp
#include <iostream>
#include <fstream>
using namespace std;
ifstream fin("date.in");
int main()
{
    int a, b;
    fin >> a >> b;
    cout << "Suma este: " << a + b << endl;   // afisare pe ecran

    return 0;
}
```

> **Obs:** Fisierul de intrare (`date.in`) trebuie sa existe deja si sa fie in **acelasi folder** cu programul. Fisierul de iesire (`date.out`) se creeaza automat.

---

## Crearea fisierelor in CodeBlocks

### Fisierul de intrare

Fisierul de intrare (ex: `suma.in`) trebuie creat de voi manual, inainte de a rula programul. Iata cum:

1. In CodeBlocks, apasati **Ctrl + Shift + N** — se va deschide un fisier nou, gol.
2. Scrieti datele de intrare in acest fisier (ex: `5 3`).
3. Salvati fisierul cu **Ctrl + S**. Se va deschide fereastra "Save file".
4. **Foarte important:** in campul **"Save as type"**, alegeti **"All files (\*.\*)"**. Altfel, CodeBlocks va adauga automat o extensie gresita.
5. La numele fisierului, scrieti exact ce cere problema la "Date de intrare" (ex: `suma.in`).
6. Salvati fisierul in **acelasi folder** cu fisierul `.cpp` al programului vostru.

### Fisierul de iesire

Creati la fel si fisierul de iesire. 

Daca ati rulat deja programul, fisierul de iesire a fost deja creat automat - in acest caz veti primi un mesaj de avertizare cu mesajul "`suma.out` already exists. Do you want to replace it ?" - apasati "Yes".

### Panoul cu fisiere (Project Management)

Pentru a vedea fisierele din proiect, apasati **Shift + F2** — se va deschide panoul "Project Management" in stanga. Acolo veti vedea toate fisierele. Apasati din nou **Shift + F2** pentru a-l ascunde.

### Reincarcarea fisierului de iesire

Dupa ce rulati programul, CodeBlocks va va intreba:

> *"This file was modified outside the IDE. Do you want to reload it?"*

Apasati mereu **Yes**. Programul vostru a scris rezultatul in fisierul de iesire, iar CodeBlocks trebuie sa reincarce fisierul ca sa vedeti ce contine acum. 

(Daca apasati "No", veti vedea in continuare continutul vechi.)
