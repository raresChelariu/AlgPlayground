# Primele cifre

## Prima cifra
```cpp
#include <iostream>
using namespace std;
int n;

int main()
{
    cin >> n;
    // Cat timp n are cel putin 2 cifre
    while (n >= 10)
    {
        n /= 10;
    }

    cout << "Prima cifra este: " << n << endl;
    return 0;
}
```

## Prima cifra

```cpp
#include <iostream>
using namespace std;
int n;

int main()
{
    cin >> n;
    // Cat timp n are cel putin 2 cifre
    while (n >= 10)
    {
        n /= 10;
    }

    cout << "Prima cifra este: " << n << endl;
    return 0;
}
```
