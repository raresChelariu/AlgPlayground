# Stergeri si inserari in vector

## Inserari in vector

Suntem la cinema - randul de scaune începe din stanga, de la perete, spre dreapta.

Vrea Catalina să se așeze între Florin și George => trebuie ca George, …, Radu să se mute cu o poziție la dreapta.

Mutarile:

I)

```cpp
v[7] = v[6];
v[6] = v[5];
```

…

```cpp
v[3] = v[2];
II) v[2] = Catalina; n++;

```

Dacă fac inserari în cadrul unei bucle trebuie sa fiu atent la indici

Sa se insereze după fiecare element divizibil cu 7 opusul sau.

```cpp
for (i = 1; i <= n; i++)
if (v[i]%7 == 0)
```

{

```cpp
// inserarea va fi la i+1
// => voi muta elem i+1, i+2, …, n ; v[n+1] = v[n];
for (j = n; j >= i+1; j--)
v[j+1] = v[j];
v[i+1] = -v[i];
n++; i++;

```

}

Stergerea in vector

Suntem la cinema - randul de scaune începe din stanga, de la perete, spre dreapta.

Vrea Anastasia să plece, și cei rămași vor sa stea unul langa altul => trebuie ca Bianca, Ioana, Radu sa se mute cu o poziție la stanga.

Mutarile:

I)

```cpp
v[3] = v[4];
v[4] = v[5];
v[5] = v[6];
II) n--;

```

Dacă fac o ștergere într-o bucla, probabil trebuie sa fac “i--”. (analog inserare)

Ex: Să se ștearga fiecare element divizibil cu 7.

```cpp
int i, n = 100, v[10001], j;

for (i = 1; i <= n; i++)
```

{

```cpp
if (v[i] % 7 == 0)
```

{

```cpp
for (j = i + 1; j <= n; j++)
```

{

```cpp
v[j-1] = v[j];
```

}

```cpp
n--;
i--;
```

}

}
