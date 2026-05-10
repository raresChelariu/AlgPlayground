# Suma cifrelor

```cpp
#include <iostream>
using namespace std;
int n, suma, ulitimaCifra;
int main()
{
    cin >> n;
    suma = 0;
    while (n > 0)
    {
        // Obține ultima cifră
        ulitimaCifra = n % 10;
        // Aduna ultima cifra la suma
        suma += ulitimaCifra;
        // Elimină ultima cifră
        n /= 10;
    }

    cout << "Suma cifrelor este: " << suma << endl;
    return 0;
}
```
