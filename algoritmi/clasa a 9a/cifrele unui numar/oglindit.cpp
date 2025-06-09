// oglinditul unui numar
#include <iostream>
using namespace std;
int main()
{
    int n, ultimaCifra, oglindit;
    cout << "Introduceti un numar: ";
    cin >> n;
    oglindit = 0; // Initializam oglinditul cu 0
    // Cat timp cat n are cel putin o cifra
    while (n > 0)
    {
        // Obtinem ultima cifra
        ultimaCifra = n % 10;
        // Adaugam ultima cifra la oglindit
        oglindit = oglindit * 10 + ultimaCifra;
        // Eliminam ultima cifra din n
        n /= 10;
    }

    cout << "Oglinditul numarului este: " << oglindit << endl;
    return 0;
}