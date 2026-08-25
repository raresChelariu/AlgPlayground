#include <iostream>
using namespace std;

int n, i, v[101];

int suma(int st, int dr)
{
    if (st == dr)
        return v[st];

    int mij, sumaStanga, sumaDreapta;

    mij = (st + dr) / 2;
    sumaStanga = suma(st, mij);
    sumaDreapta = suma(mij + 1, dr);

    return sumaStanga + sumaDreapta;
}
int main()
{
    cin >> n;
    for (i = 1; i <= n; i++)
    {
        cin >> v[i];
    }

    cout << suma(1, n);
    return 0;
}
