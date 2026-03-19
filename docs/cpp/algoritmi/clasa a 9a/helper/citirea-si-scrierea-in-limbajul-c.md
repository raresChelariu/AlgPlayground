# Citirea și scrierea în limbajul C

Pt citire/afisare in c trebuie sa includem <cstdio>.

```cpp
Citire - scanf()
Afisare - printf()

scanf(format, deCitit);

```

format - este alcatuit din mai mulți descriptori

Descriptorul îmi indica tipul de variabila pe care o citesc/scriu

Descriptori:

%d - int

%c - char

%s - string

%f  - float

%lf - double

```cpp
Cum citesc un int în variabila x?
scanf("%d", &x); ⇔ cin>>x; (unde x este de tip int)

Cum citesc 2 int-uri și apoi un float ?
scanf("%d%d%f", &a, &b, &c); ⇔ cin>>a>>b>>c; // unde a,b sunt int, iar c este float

```

afișare - pot pune orice expresie

```cpp
⇔ printf("Eu am %d ani si tu ai %f bani!", 20, 5.49);

```

Cum citesc/afisez din fișier ?

```cpp
Ex: fscanf(fin, "%d", &nrMere);
Ex: fprintf(fout, "Hello kids!\n");

```

Cum declar un fișier în limbajul C ?

Cum deschid fișierul ?

```cpp
Pt citire : numeFișier = fopen("fișier.in", "r");
Pt afișare : numeFisier = fopen("fișier.out", "w");

```
