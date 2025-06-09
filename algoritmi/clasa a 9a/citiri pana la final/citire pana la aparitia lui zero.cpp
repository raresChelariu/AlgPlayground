// citire pana la aparitia lui zero.cpp
#include <iostream>
using namespace std;
int main()
{
    int n, suma = 0;
    cout << "Introduceti numere (terminati cu 0):" << endl;

    // Citim numere pana la aparitia lui zero
    while (cin >> n && n != 0)
    {
        // Aduna numarul citit la suma
        suma += n;
    }

    cout << "Suma numerelor citite este: " << suma << endl;
    return 0;
}