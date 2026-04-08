# Var 2 - 2 este singurul prim par

```cpp
// var 2 descompunere in factori primi
// 2 este singurul prim par.cpp
#include <iostream>
using namespace std;
int main()
{
    int n, d, exp;
    cout << "Introduceti un numar: ";
    cin >> n;
    // La fel ca "pe foaie"
    // Pornim cu d = 2, cel mai mic numar prim
    exp = 0; // Resetam exponentul pentru 2
    while (n % 2 == 0)
    {
        n /= 2; // Impartim n la 2
        exp++;  // Incrementam exponentul
    }
    // Daca exp este mai mare decat 0, afisam 2 si exp
    if (exp > 0)
    {
        cout << "2 " << exp << endl;
    }
    // Continuam cu d = 3, cel mai mic numar prim impar
    // Incrementam d cu 2 pentru a verifica doar numerele impare
    // (Din moment ce n nu mai este par, nu mai are sens sa verificam numerele pare)
    // Astfel, vom verifica 3, 5, 7, 9, ...
    for (d = 3; n != 1; d += 2)
    {
        // Resetam exponentul pentru fiecare divizor
        exp = 0;
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
}
```
