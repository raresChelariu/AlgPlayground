# Suma cifrelor

```cpp
#include <iostream>
using namespace std;
int main()
{
    int n, suma = 0;
    cin >> n;

    while (n > 0)
    {
        // Obține ultima cifră
        int ulitimaCifra = n % 10;
        // Aduna ultima cifra la suma
        suma += ulitimaCifra;
        // Elimină ultima cifră
        n /= 10;
    }

    cout << "Suma cifrelor este: " << suma << endl;
    return 0;
}
```
