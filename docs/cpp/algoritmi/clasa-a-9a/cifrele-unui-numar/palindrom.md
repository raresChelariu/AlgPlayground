# Palindrom

```cpp
#include <iostream>
using namespace std;
int n, oglindit, copieN, ultimaCifra;
int main()
{    
    cin >> n;
    // Facem o copie a numarului original pentru comparatie
    copieN = n;   
    oglindit = 0; // Initializam oglinditul cu 0
    // Cat timp n are cel putin o cifra
    while (n > 0)
    {
        // Obtinem ultima cifra
        ultimaCifra = n % 10;
        // Adaugam ultima cifra la oglindit
        oglindit = oglindit * 10 + ultimaCifra;
        // Eliminam ultima cifra din n
        n /= 10;
    }

    // Verificam daca numarul este palindrom
    if (copieN == oglindit)
    {
        cout << "Numarul este palindrom." << endl;
    }
    else
    {
        cout << "Numarul nu este palindrom." << endl;
    }

    return 0;
}
```
