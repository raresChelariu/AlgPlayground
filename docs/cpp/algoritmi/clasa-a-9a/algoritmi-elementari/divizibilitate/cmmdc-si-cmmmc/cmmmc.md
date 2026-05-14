# Cmmmc

```cpp
// cmmmc
#include <iostream>
using namespace std;
// cmmmc poate fi un numar ff mare
// deci voi pune long long
long long x, y, a, b, r, cmmmc;
int main()
{
    // Introduceti doua numere
    cin >> x >> y;
    a = x; // Pastram valoarea initiala a lui x
    b = y; // Pastram valoarea initiala a lui y
    // dpdv matematic, (a, b) - cmmdc dintre a si b
    // dpdv matematic, [a, b] - cmmmc dintre a si b
    // => a * b = (a, b) * [a, b]
    // => [a, b] = (a * b) / (a, b)
    while (b != 0)
    {
        r = a % b; // Calculam restul
        a = b;         // Actualizam a cu b
        b = r;         // Actualizam b cu restul
    }
    // a este acum cmmdc-ul
    cmmmc = (x * y) / a; // Calculam cmmmc-ul
    cout << "CMMMC este: " << cmmmc << endl;
    return 0;
}
```
