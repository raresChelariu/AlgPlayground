# Keyword-ul static

În limbajul C se folosește ca prefix înainte declarării unei variabile în cadrul unei funcții.

(

Static = în limba romana înseamnă “ce nu se misca”

În informatica, static înseamnă ca mereu îl voi găsi în același loc (ca adresa în memorie).

)

Dacă o variabila locala este statică atunci:

este accesibilă doar din cadrul funcției (la fel ca o locală obișnuită)

se aloca in memorie DOAR 1 DATA la începutul programului (la fel ca o variabila globala)

```cpp
#include <iostream>
using namespace std;
int f1(int x)
```

{

```cpp
static int q = 0;
q += x;
cout << q << " ";
```

}

```cpp
int f2(int x)
```

{

```cpp
int q = 0;
q += x;
cout << q << " ";
```

}

```cpp
int main()
```

{

```cpp
f2(1);    f2(2);    f2(3); // se afiseaza 1 2 3
cout << endl;
f1(1);    f1(2);    f1(3); // se afiseaza 1 3 6
return 0;
```

}

## Debug

Înseamnă execuția programului pas cu pas

```cpp
este util pentru a depista erori de execuție; acestea apar la execuția programului, după ce am reușit să compilez cu succes
```

erori de execuție = când programul nu se “comportă” conform așteptărilor mele

Pași:

Pun cursorul pe linia de unde vreau sa incep execuția pas cu pas (debug-ul)

Apas F4 (Run to cursor) - programul va porni și se va executa tot codul până la linia unde am pus cursorul EXCLUSIV (adică mai puțin acea linie)

Obs #1: Pe ecran va apărea o sageata galbena ce îmi indica linia ce urmează sa fie executată

Obs #2: Dacă acea săgeată nu a apărut pe ecran inseamna că execuția nu a ajuns unde am pus cursorul. De ce ? Cauze posibile:

Există o operație blocantă - ex: citirea

(nu poate merge mai departe execuția până nu citește de la tastatură)

O structura repetitivă ce nu se mai termină

Apas F7 (Next line) pentru a executa linia curentă

[Pentru clasa a X-a] Shift + F7 - Step into

Dacă pe linia curentă am un apel de funcție atunci va intra cu execuția pas cu pas la începutul acelei funcții

În caz contrar (nu am apel de funcție), are același efect ca F7

Shift + F8 - Stop Debugger

pentru a opri debugger-ui

pot opri debugger-ul și daca inchid programul

Watches

Pentru a vedea valoarea unei variabile sau a unei expresii în locul unde am ajuns cu execuția voi deschide Watches

```cpp
Deschid din Debug -> Debugging Windows -> Watches
```

Stiva de apeluri

en. call stack

```cpp
Deschid din Debug -> Debugging Windows -> Call stack
```

Mereu primul apel din stiva (“cel mai de sus”) este apelul în care sunt cu execuția

```cpp
Odată ce o funcție ia sfârșit (am executat instrucțiunea return SAU am executat tot codul din funcție (la o functie void)) se va șterge cel mai de sus apel din stiva și voi reveni/continua cu execuția din funcția memorată în stiva un rand mai jos.
```

În poză, după ce se termina execuția lui “cifImpare” voi reveni/continua cu execuția în funcția main
