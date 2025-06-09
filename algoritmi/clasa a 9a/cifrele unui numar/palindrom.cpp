// palindrom
#include <iostream>
using namespace std;
int main()
{
    int n, oglindit, copieN, ultimaCifra;
    cout << "Introduceti un numar: ";
    cin >> n;

    copieN = n;   // Pastram numarul original pentru comparatie
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
    bool estePalindrom = (copieN == oglindit);
    if (estePalindrom)
    {
        cout << "Numarul este palindrom." << endl;
    }
    else
    {
        cout << "Numarul nu este palindrom." << endl;
    }

    return 0;
}