# Functia Sort

```cpp
Trebuie sa includ #include <algorithm>.
```

Varianta 1 - Sintaxa :

```cpp
sort( numeVector + pozStart, numeVector + 1 + pozFinal);
```

Ex: Vreau sa sortez crescator vectorul v cu elemente de la 1 la n

```cpp
sort( v + 1, v + n + 1);
```

Ex : Vreau sa sortez linia 5 din matricea A cu coloane de la 1 la m

```cpp
sort( A[5] + 1, A[5] + m + 1);
```

Functia de comparare

primește 2 parametri - acești parametri trebuie sa fie de tipul elementelor din lista

```cpp
returneaza un bool - trebuie sa returneze 1 dacă cele 2 elemente date ca parametri sunt o pereche corect sortata (in ordinea in care sunt date ca parametri)
```

Ex: vreau sa sortez un sir de int-uri descrescator

```cpp
bool compara(int a, int b)
```

{

```cpp
return a > b;
/* SAU
if (a > b)
return 1;
return 0;
```

*/

}
