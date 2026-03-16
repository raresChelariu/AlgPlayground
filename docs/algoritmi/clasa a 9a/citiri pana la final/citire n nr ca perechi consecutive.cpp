// se citesc n numere; sa se numere cate perechi consecutive
// se termina in aceiasi ultima cifra
#include <iostream>
using namespace std;
int main()
{
    /*
    Ex: Introduceti numerele: 12 22 34 44 54
    Output: Numarul de perechi consecutive cu ultima cifra egala este: 3
    Se iau in considerare perechile (12, 22), (22, 34), (34, 44), (44, 54)
    Dar cu aceiasi ultima cifra sunt doar (12, 22), (34, 44), (44, 54)
     */
    int n, stanga, contor = 0, dreapta;
    cin >> n;

    cout << "Introduceti elementele: ";
    cin >> stanga; // Citim primul element

    for (int i = 2; i <= n; i++)
    {
        cin >> dreapta; // Citim urmatorul element

        // Verificam daca ultimele cifre sunt egale
        if (stanga % 10 == dreapta % 10)
        {
            contor++;
        }

        stanga = dreapta;
        // stanga pentru urmatoarea iteratie devine dreapta
    }

    cout << "Numarul de perechi consecutive cu ultima cifra egala este: " << contor << endl;
    return 0;
}