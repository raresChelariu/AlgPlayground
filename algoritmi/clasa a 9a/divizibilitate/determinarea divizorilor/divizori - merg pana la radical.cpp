// diviziori - merg pana cand d*d < n.cpp

#include <iostream>
using namespace std;
int main()
{
    int n, d;
    cout << "Introduceti un numar: ";
    cin >> n;

    cout << "Divizorii lui " << n << " sunt: ";

    // Iteram de la 1 pana la radicalul lui n
    for (d = 1; d * d < n; d++)
    {
        if (n % d == 0) // Daca d este divizor al lui n
        {
            // Afisam atat d divizorul
            // cat si n/d care este si el divizor
            cout << d << " " << n / d << " ";
        }
    }
    // Daca n este un numar patrat perfect, afisam radicalul
    if (d * d == n)
    {
        cout << d; // Afisam radicalul
    }
    cout << endl;
    return 0;
}