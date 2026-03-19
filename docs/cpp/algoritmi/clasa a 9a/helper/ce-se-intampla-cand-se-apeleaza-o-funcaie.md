# Ce se întâmplă când se apelează o funcție?

Se memorează locul de unde se apelează funcția

Se copiaza valorile parametrilor pe stivă (într-un apel)

Se execută funcția până la terminarea acesteia.

Se continua cu execuția din locul memorat la pasul 1,

și apelul se șterge de pe stivă

( când apelul se șterge de pe stivă se șterg și datele memorate aferente acestuia:

unde trebuie să se întoarcă

variabilele locale declarate în acea funcție

parametrii acelei funcții )

Stivă (de apeluri)

este o zonă de memorie

în care se memorează apeluri de funcție

la începutul execuției programului, mereu voi avea DOAR apelul funcției main pe stivă

în engleza : call stack

mereu apelul din vârful stivei este apelul unde mă aflu cu execuția

> **Obs:** Cand dau ca parametru un vector, se copiază pe stivă doar adresa sa ! (NU toate elementele sale!)

Ex :

```cpp
void f(int x[])
```

{

```cpp
x[0] = 59;
```

}

```cpp
int v[] = {3, 6, 7, 4}, i;
int main()
```

{

```cpp
f(v);
for (i = 0; i < 4; i++)
cout << v[i] << " ";
return 0;
```

}

```cpp
Astfel, dacă vreau sa dau ca parametru pe vectorul v (care a fost declarat, de exemplu, int v[200];)
```

voi scrie antetul de forma:

> **Obs:** Analog pentru o matrice :
