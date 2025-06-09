// citire pana la finalul consolei
#include <iostream>
using namespace std;
int main()
{
    // sa calcula suma tuturor numerelor citite
    // pana la finalul consolei
    int n, suma = 0;
    while (cin >> n)
    {
        // Aduna numarul citit la suma
        suma += n;
    }
    // Pentru a incheia citirea, se poate folosi Ctrl+Z (Windows)
    cout << "Suma numerelor citite este: " << suma << endl;
    return 0;
}