# Vectori de frecventa/caracteristici

Vector

> **Obs:** Dimensiunea vectorului NU trebuie să o gândesc în funcție de cate numere mi se dau, ci în funcție de intervalul numerelor cu care lucrez.

Ex: Dacă mi se dau la intrare maxim 1 milion de numere, toate din intervalul [1, 200] voi declara vectorul de frecvență de 201 elemente (NU de 1 milion) !

Citire vector caracteristic

```cpp
bool v[100];
int x;
int main()
```

{

```cpp
while (cin >> x)
```

{

```cpp
v[x] = 1;
```

}

```cpp
// ...
return 0;
```

}

Citire vector de frecventa

```cpp
int v[100], x;
int main()
```

{

```cpp
while (cin >> x)
```

{

```cpp
v[x]++;
```

}

```cpp
// ...
return 0;
```

}
