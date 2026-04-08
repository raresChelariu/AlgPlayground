# Prima cifra

```cpp
// prima cifra.cpp
#include <iostream>
using namespace std;
int main()
{
    int n;
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
