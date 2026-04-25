# Citirea si afisarea din fisiere

In lectia anterioara am citit de la tastatura (`cin`) si am afisat pe ecran (`cout`). In multe probleme (pe pbinfo.ro, la concursuri) citirea si afisarea se fac din/in **fisiere**. In aceasta lectie invatam cum.

## De ce fisiere?

- Multe probleme cer sa citesti din `date.in` si sa scrii in `date.out`
- Nu trebuie sa tastezi datele de fiecare data cand testezi
- Poti lucra cu date de intrare mari fara sa le introduci manual

---

# Diferente pe scurt

| CONSOLA | Fișiere | Observații |
| :--- | :--- | :--- |
| `#include <iostream>` | `#include <fstream>` | Biblioteci necesare |
| `using namespace std;` | `using namespace std;` <br> `ifstream fin("fisier.in");`<br>`ofstream fout("fisier.out");` | Intre ghilimele pui numele fisierelor, conform enuntului problemei |
| `cin >> x;` | `fin >> x;` | În loc de **cin** vom scrie **fin** |
| `cout << x;` | `fout << x;` | În loc de **cout** vom scrie **fout** |

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

// intre ghilimele vom pune numele fisierelor
ifstream fin("date.in"); // date.in e fisierul de intrare
ofstream fout("date.out"); // date.out e fisierul de iesire

int a, b;
int main()
{    
    fin >> a >> b;               // citesc din fisier (la fel ca cin >>)
    fout << a + b << endl;       // scriu in fisier (la fel ca cout <<)
    return 0;
}
```

Fisierul `date.out` va contine:
```
8
```

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
ofstream fout("date.out");   // creeaza date.out pentru scriere
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
// folosim fin pentru a citi din fisierul de intrare
ifstream fin("date.in"); 

int a, b;

int main()
{
    fin >> a >> b;
    cout << "Suma este: " << a + b << endl;   // afisare pe ecran
    return 0;
}
```

---

## Crearea fisierelor in CodeBlocks

### Fisierul de intrare

Fisierul de intrare (ex: `suma.in`) trebuie creat de tine manual, inainte de a rula programul. Uite cum:

1. In CodeBlocks, apasa **Ctrl + Shift + N**.
Va aparea o fereastra cu mesajul:
> Do you want to add this new file in the active project (has to be saved first) ?
Apasa **Yes**.

2. Va aparea urmatoarea fereastra :

```
+-------------------------------------------------------+
| Save file                                          [X]|
+-------------------------------------------------------+
| [ Documents > preg ]                                  |
                                                        |
| +---------------------------------------------------+ |
| | Name             | Type         | Size            | |
| |------------------+--------------+-----------------| |
| | [Folder] bin     | File Folder  |                 | |
| | [Folder] obj     | File Folder  |                 | |
| | main.cpp         | CPP File     | 1 KB            | |
| | main.exe         | Application  | 128 KB          | |
| | preg.cbp         | Project file | 4 KB            | |
| | preg.depend      | DEPEND file  | 2 KB            | |
| | preg.layout      | LAYOUT file  | 1 KB            | |
| +---------------------------------------------------+ |
|                                                       |
| File name:    [ suma.in                            ]  |
|                                                       |
| Save as type: [ All files (*.*)                    ]  |
|                                                       |
|                                  [ Save ]  [ Cancel ] |
+-------------------------------------------------------+
```

La **File name:** veti introduce numele fisierului de intrare.

**Foarte important:** in campul **"Save as type"**, alegeti **"All files (\*.\*)"**. 

Altfel, CodeBlocks va adauga automat o extensie gresita.

Apoi in urmatoarea fereastra, apasa mereu **OK**:

```
_________________________________________________
| Multiple selection                       [ _][X]|
|-------------------------------------------------|
| Select the targets this file should belong to:  |
|  __________________________                     |
| | [x] Debug                | [Wildcard select]  |
| | [x] Release              |                    | 
| |                          | [Toggle selection] |
| |                          |                    |  
| |                          | [Select All]       |
| |                          |                    |
| |                          | [Deselect All]     |
| |                          |                    |
| |                          |  Selected: 2       |
| |__________________________|                    |
|_________________________________________________|
|                                                 |
|                          [   OK   ] [ Cancel ]  |
|_________________________________________________|
```

3. Scrie datele de intrare in acest fisier (ex: `5 3`).

### Fisierul de iesire

Creeaza la fel si fisierul de iesire.
Doar fii atent ca la **File name** sa introduci numele fisierului de iesire (ex: `suma.out`).

Daca ai rulat deja programul, fisierul de iesire a fost deja creat automat.
Cand vei incerca sa-l creezi, vei primi un mesaj de avertizare :
> `suma.out` already exists. Do you want to replace it ? 
Apasa **Yes**.

### Panoul cu fisiere (Project Management)

Pentru a vedea fisierele din proiect, apasa **Shift + F2** — se va deschide panoul **Project Management** in stanga. 
Acolo vei vedea toate fisierele. 
Apasa din nou **Shift + F2** pentru a-l ascunde.

### Reincarcarea fisierului de iesire

Dupa ce rulezi programul, CodeBlocks va va intreba:

> *"This file was modified outside the IDE. Do you want to reload it?"*

Apasa mereu **Yes**. Programul tau a scris rezultatul in fisierul de iesire, iar CodeBlocks trebuie sa reincarce fisierul ca sa vezi ce contine acum. 

(Daca apesi **No**, vei vedea in continuare continutul vechi.)
