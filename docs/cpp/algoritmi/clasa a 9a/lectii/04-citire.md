# Citirea de la tastatura

Pana acum am afisat valori pe ecran cu `cout`. Acum invatam sa **citim** valori de la tastatura cu `cin`, astfel incat programul sa lucreze cu date introduse de utilizator.

## `cin` — citirea unei valori

Il folosim cu operatorul `>>` pentru a citi o valoare de la tastatura intr-o variabila.

```cpp
#include <iostream>
using namespace std;

int main()
{
    int varsta;
    cout << "Cati ani ai? ";
    cin >> varsta;
    cout << "Ai " << varsta << " ani." << endl;
    return 0;
}
```

**Exemplu de rulare:**
```
Cati ani ai? 16
Ai 16 ani.
```

> **Obs:** Cand programul ajunge la `cin >> varsta;`, se **opreste** si asteapta ca utilizatorul sa tasteze o valoare si sa apese Enter.

> **Obs:** Variabila trebuie sa fie deja **declarata** inainte de `cin`. Tipul variabilei determina ce fel de valoare se asteapta (numar intreg, numar cu virgula etc.).

---

## Citirea mai multor valori

### Pe rand (mai multe `cin`-uri)

```cpp
#include <iostream>
using namespace std;

int main()
{
    int a, b;
    cout << "Introduceti doua numere: " << endl;
    cin >> a;
    cin >> b;
    cout << "Primul: " << a << ", Al doilea: " << b << endl;
    return 0;
}
```

### Inlantuit (un singur `cin`)

```cpp
cin >> a >> b;
```

Cele doua forme fac **acelasi lucru**. Valorile pot fi separate prin spatiu sau Enter.

**Exemplu de rulare:**
```
Introduceti doua numere:
5 3
Primul: 5, Al doilea: 3
```

sau:

```
Introduceti doua numere:
5
3
Primul: 5, Al doilea: 3
```

---

## Citirea diferitelor tipuri

`cin` functioneaza cu orice tip de variabila:

```cpp
#include <iostream>
using namespace std;

int main()
{
    int n;
    double x;
    char c;

    cout << "Introdu un intreg, un real si un caracter: ";
    cin >> n >> x >> c;

    cout << "Intreg: " << n << endl;
    cout << "Real: " << x << endl;
    cout << "Caracter: " << c << endl;

    return 0;
}
```

**Exemplu de rulare:**
```
Introdu un intreg, un real si un caracter: 7 3.14 A
Intreg: 7
Real: 3.14
Caracter: A
```

---

## Exemplu complet: suma a doua numere

```cpp
#include <iostream>
using namespace std;

int main()
{
    int a, b;
    cin >> a >> b;
    cout << a + b << endl;
    return 0;
}
```

**Exemplu de rulare:**
```
4 9
13
```

> **Obs:** In multe probleme de pe pbinfo.ro nu se cere afisarea unui mesaj inainte de citire — se citeste direct si se afiseaza direct rezultatul. De aceea exemplul de mai sus nu are `cout` inainte de `cin`.
