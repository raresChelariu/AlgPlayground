# Citire perechi pana  la 0 0

```cpp
// citire perechi pana la 0 0
#include <iostream>
using namespace std;
int main()
{
    int a, b;
    cout << "Introduceti perechi de numere (terminati cu 0 0):" << endl;

    // Citim perechi de numere pana la aparitia lui 0 0
    // De ex: vom afisa fiecare pereche citita
    while (cin >> a >> b && (a != 0 || b != 0))
    {
        cout << "Pereche citita: " << a << " " << b << endl;
    }
    return 0;
}
```
