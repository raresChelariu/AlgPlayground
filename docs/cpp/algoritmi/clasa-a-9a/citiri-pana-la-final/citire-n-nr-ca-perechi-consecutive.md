# Citire n nr ca perechi consecutive

## Sa se numere cate perechi consecutive se termina in aceiasi ultima cifra

```
Ex de date de intrare: 
5
12 22 34 44 54

Afisare: Numarul de perechi consecutive cu ultima cifra egala este: 3

Se iau in considerare perechile (12, 22), (22, 34), (34, 44), (44, 54)
Dar cu aceiasi ultima cifra sunt doar (12, 22), (34, 44), (44, 54)
```

```cpp
// 
#include <iostream>
using namespace std;
int n, contor, a, b, i;
int main()
{
    // la fiecare ne vom juca cu perechea (a, b)   
    cin >> n;
    cin >> a; // Citim primul element
    for (i = 2; i <= n; i++)
    {
        cin >> b; // Citim urmatorul element

        // Verificam daca ultimele cifre sunt egale
        if (a % 10 == b % 10)
        {
            contor++;
        }

        a = b;
        // stanga pentru urmatoarea iteratie devine dreapta
    }

    cout << "Numarul de perechi consecutive cu ultima cifra egala este: " << contor << endl;
    return 0;
}
```
