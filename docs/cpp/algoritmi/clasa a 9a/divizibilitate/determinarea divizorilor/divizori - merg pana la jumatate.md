# Divizori - merg pana la jumatate

```cpp
// divizori - merg pana la jumatate.cpp
#include <iostream>
using namespace std;
int main()
{
    int n;
    cout << "Introduceti un numar: ";
    cin >> n;

    cout << "Divizorii lui " << n << " sunt: ";
    // Stim ca nu exista divizori proprii
    // mai mari decat jumatatea lui n
    // (pentru ca orice divizor mai mare decat n/2
    // ar trebui sa faca "pereche" cu un divizor propriu mai mic decat n/2)

    // Mergem pana la jumatatea lui n
    int jumatate = n / 2;
    for (int i = 1; i <= jumatate; i++)
    {
        if (n % i == 0) // Daca i este divizor al lui n
        {
            cout << i << " "; // Afisam divizorul
        }
    }
    // Afisam n ca ultim divizor
    cout << n;

    return 0;
}
```
