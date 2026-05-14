# Divizori - metoda banala

```cpp
#include <iostream>
using namespace std;
int n, i;
int main()
{    
    cin >> n;

    cout << "Divizorii lui " << n << " sunt: ";
    for (i = 1; i <= n; i++)
    {
        if (n % i == 0) // Daca i este divizor al lui n
        {
            cout << i << " "; // Afisam divizorul
        }
    }

    return 0;
}
```
