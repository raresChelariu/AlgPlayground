# Citire

Citesc cât timp am ce citi de la tastatura

> **Obs:** Cand vreau sa spun calculatorului ca s-a terminat citirea (nu mai este nimic de citit de la consola), apas CTRL + Z și dau ENTER.

Citesc număr cu număr până la finalul fișierului

Citește numere de la tastatură până la apariția lui 0 ( 0 nu se ia în considerare)

Citește perechi de numere de la tastatura până la apariția lui 0 0( 0 0 nu se ia în considerare)

Citesc perechi consecutive până la apariția lui 0

Citesc n numere și le tratez pe perechi consecutive

```cpp
int n, a, b, i;
cin >> n;
cin >> a; // citesc primul nr - e singurul fără nr anterior
for (i = 2; i <= n; i++)
```

{

```cpp
cin >> b; // nr curent e nr din dreapta
// mă joc cu perechea a, b
a = b;
// nr curent va fi "nr anterior" la iteratia următoare
```

}
