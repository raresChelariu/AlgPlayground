# Var 1 - banala

```cpp
// descompunere in factori primi - varianta 1 - banala.cpp
#include <iostream>
using namespace std;
int main()
{
    int n, d, exp;
    cout << "Introduceti un numar: ";
    cin >> n;
    // La fel ca "pe foaie"
    // Pornim cu d = 2, cel mai mic numar prim
    // si continuam pana cand n devine 1
    for (d = 2; n != 1; d++)
    {
        exp = 0; // Resetam exponentul pentru fiecare divizor
        // Cat timp n este divizibil cu d
        while (n % d == 0)
        {
            n /= d; // Impartim n la d
            exp++;  // Incrementam exponentul
        }
        // Daca exp este mai mare decat 0, afisam d si exp
        if (exp > 0)
        {
            cout << d << " " << exp << endl;
        }
    }
    return 0;
}
```
