# Divizori - metoda banala

```cpp
#include <iostream>
using namespace std;
int main()
{
    int n;
    cout << "Introduceti un numar: ";
    cin >> n;

    cout << "Divizorii lui " << n << " sunt: ";
    for (int i = 1; i <= n; i++)
    {
        if (n % i == 0) // Daca i este divizor al lui n
        {
            cout << i << " "; // Afisam divizorul
        }
    }

    return 0;
}
```
