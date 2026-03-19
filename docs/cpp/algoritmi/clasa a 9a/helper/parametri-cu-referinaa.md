# Parametri cu referință

## Ce se întâmplă când se apelează o funcție? (en. PASS BY VALUE)

```cpp
#include <iostream>

using namespace std;
void f(int k)
```

{

```cpp
k += 5;
// k este o zona de memorie diferita fata de x-ul din main
// fiecare parametru este o copie a valorii primita la apel
```

}

```cpp
int main()
```

{

```cpp
int x = 3;
f(x);
cout << x; // se afiseaza 3
return 0;
```

}

Ce se intampla cand dau ca parametru prin referinta ? (en. PASS BY REFERENCE)

```cpp
#include <iostream>

using namespace std;
void f(int &k)
```

{

```cpp
// pe stiva, in spatele cortinei, s-a copiat adresa la ce am primit la apel
// (NU s-a copiat valoarea)
k += 5; // aici modific zona de memorie primita la apel
// pot face asta deoarece in apel retin adresa
```

}

```cpp
int main()
```

{

```cpp
int x = 3;
f(x);
cout << x; // se afiseaza 8
return 0;
```

}

Un cod echivalent folosind pointeri ar fi :

```cpp
void f2(int* p)
```

{

```cpp
*p += 5;
```

}

```cpp
int main()
```

{

```cpp
int x = 3;
f2(&x);
cout << x; // se afiseaza 8
return 0;
```

}

> **Obs:** Vectorii in C++ sunt PASS BY REFERENCE (la apel, se copiază adresa, nu valoarea)

```cpp
#include <iostream>
using namespace std;
int x[] = {8, 9, 4, 5};
void f(int v[])
```

{

```cpp
// cand dau ca parametru un vector
// NU se copiaza vectorul pe stiva
// Se copiaza doar adresa sa (adresa primului element)
v[2] += 10;
// => orice modificare fac asupra vectorului in functie
//    se va regasi si in afara
//    ( pt ca era aceiasi zona de memorie )
```

}

```cpp
int main()
```

{

```cpp
f(x);
int i;
for (i = 0; i < 4; i++)
cout << x[i] << " ";
// Afisare : 8 9 14 5
return 0;
```

}
