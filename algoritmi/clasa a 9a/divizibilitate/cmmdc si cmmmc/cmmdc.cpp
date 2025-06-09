// cmmdc
#include <iostream>
using namespace std;
int main()
{
    int x, y, a, b;
    cout << "Introduceti doua numere: ";
    cin >> x >> y;
    // daca avem nevoie de x si y in continuare, le pastram
    // altfel, putem lucra direct cu x si y
    a = x; // Pastram primul numar in a
    b = y; // Pastram al doilea numar in b

    // Algoritmul lui Euclid pentru calculul CMMDC
    while (b != 0)
    {
        int r = a % b; // Calculam restul
        a = b;         // Actualizam a cu b
        b = r;         // Actualizam b cu restul
    }

    cout << "CMMDC este: " << a << endl;
    return 0;
}