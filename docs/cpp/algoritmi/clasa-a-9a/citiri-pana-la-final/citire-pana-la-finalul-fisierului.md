# Citire pana la finalul fisierului

```cpp
// citire pana la finalul fisierului
#include <iostream>
#include <fstream>
using namespace std;
ifstream fin("numere.in");
int main()
{
    int n, suma = 0;

    // Citim pana la finalul fisierului
    while (fin >> n)
    {
        // Aduna numarul citit la suma
        suma += n;
    }
    // Citirea fisierului se incheie automat cand ajunge la final
    cout << "Suma numerelor din fisier este: " << suma << endl;
    return 0;
}
```
