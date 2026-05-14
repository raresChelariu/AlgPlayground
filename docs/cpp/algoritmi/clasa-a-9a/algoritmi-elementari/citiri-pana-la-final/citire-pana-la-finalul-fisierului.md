# Citire pana la finalul fisierului

```cpp
// citire pana la finalul fisierului
#include <fstream>
using namespace std;
ifstream fin("numere.in");
ofstream fout("numere.out");
int n, suma;
int main()
{
    // Citim pana la finalul fisierului
    while (fin >> n)
    {
        // Aduna numarul citit la suma
        suma += n;
    }
    // Citirea fisierului se incheie automat cand ajunge la final
    fout << "Suma numerelor din fisier este: " << suma << endl;
    return 0;
}
```
