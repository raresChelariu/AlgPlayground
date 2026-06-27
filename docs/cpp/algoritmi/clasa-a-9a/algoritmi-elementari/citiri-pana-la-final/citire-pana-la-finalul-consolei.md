# Citire pana la finalul consolei

```cpp
#include <iostream>
using namespace std;
int n, suma;
int main()
{
    // sa calcula suma tuturor numerelor citite
    // pana la finalul consolei
    while (cin >> n)
    {
        // Aduna numarul citit la suma
        suma += n;
    }
    // Pentru a incheia citirea, se poate folosi Ctrl+Z (Windows)
    cout << "Suma numerelor citite este: " << suma << endl;
    return 0;
}
```

> [!NOTE] Observatie
> Daca doar dam numere in consola, vom observa ca programul nu mai afiseaza, 
> pentru ca va revenin la conditia while-ului sa mai citeasca inca o valoare.
> Pentru a incheia citirile vom apasa CTRL + Z (va aparea pe ecran ^Z)
> si vom apasa ENTER. 
> CTRL + Z este marcajul pentru incheierea citirilor la consola.