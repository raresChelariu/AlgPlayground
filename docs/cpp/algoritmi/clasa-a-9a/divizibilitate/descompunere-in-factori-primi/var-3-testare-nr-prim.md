# Var 3 - testare nr prim

```cpp
// var 2 descompunere in factori primi
// 2 este singurul prim par.cpp
// descompunere in factori primi - varianta 3 - testare nr prim.cpp
// daca n ajunge sa fie prim nu are sens sa mai verificam toti divizorii pana la n

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
        // Daca d^2 este mai mare decat n, n este prim
        // pentru ca pana acum am scos toti factorii primii mai mici decat d
        // deci n nu este divizibil cu niciunul dintre ei => n este prim
        if (d * d > n)
        {
            d = n; // Setam d la n pentru a iesi din bucla
        }
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

    return 0;
}
```
