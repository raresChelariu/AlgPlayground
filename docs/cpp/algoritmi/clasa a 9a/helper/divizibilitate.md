# Divizibilitate

## Divizorii unui nr

Primul scop - Vreau să găsesc divizorii lui n (să îi afișez pe toți)

```cpp
// Obs1 : Divizorii lui n sunt în [1, n]

// Daca n este 1 000 000 000 => 1 000 000 000 pași

//  Obs 2 : Nu exista divizor propriu >n/2


```

Demonstrație:

Pp că există un divizor propriu al lui n mai mare decat n/2. ⇔ Există d nr natural, d > n/2 si n%d==0

=> Exista x  nr natural a.i. x * d = n => x = n/d => x < 2

si x divizor => x = 1

=> Pp este falsă ( nu exista divizor propriu (!=1) și <2 al lui n)

=> Toți divizorii lui n sunt 1, n și cei din intervalul [2, n/2]

> **Obs:** În algoritmul de mai jos, calculez n/2 DOAR o dată!

(nu la fiecare pas, cum ar fi fost valabil dacă aș fi scris condiția

i <= n/2)

dacă d divizor pt n și x=n/d  =>  x este divizor

```cpp
// Obs 3 : Pornind crescător cu d =1, perechile (d, n/d) încep sa se repete când d > n/d

```

n = 36

```cpp
Pt cele roșii d < n/d; pt cele verzi d > n/d

```

> **Obs:** Dacă n este pătrat perfect, vei ajunge la momentul când d == n/d, deci la aceasta pereche nu obțin 2 divizori noi, ci doar UNUL.

> **Obs:** Pot spune ca d < n/d ⇔ cu d * d  < n

> **Obs:** n = 1 000 000 => 1000 pasi

n = 1 000 000 000 => aprox. 31000 pași

i^2 < n ⇔ i < radical(n)

CMMDC

Metoda cea mai eficientă

Ex pt a = 24, b = 36:

a 24  36 24 12

b 36 24 12 0

r  24 12 0

La mate (divizibilitate):

(a, b) - cmmdc pentru a și b

[a, b] - cmmmc pentru a și b

> **Obs:** Dacă (a, b)=1 atunci voi spune ca a și b sunt “prime între ele” (coprime).

> **Obs:** O fractie este ireductibila daca numitorul si numaratorul sunt coprime.

```cpp
Proprietate : (a, b) * [a, b] = a*b;

```

=> [a,b] = a * b / (a,b)

Proprietate : (a,b,c,d) = (((a,b),c),d)

[a,b,c,d,e] = [[[[a,b],c,],d],e]

Cum calculez pt n numere cmmmc?

> **Obs:** La fel vei calcula și pt cmmdc pt n numere (doar schimb funcția pe care o apelez)

## Descompunere în factori primi

> **Obs:** Cel mai mic divizor (>1) al unui număr este PRIM.

Dem: Fie d cel mai mic divizor al lui n, unde d>1.

Presupun că d este compus => d = a*b. (a>1, b>1)

```cpp
d = a*b;   (II)
n = d*x; (d este divizor) (I)

```

I + II => a este divizor pt n (III)

II => a < d (IV)

III + IV => a este un divizor (>1) al lui n, mai mic decat d (care este cel mai mic divizor (>1) al lui n => CONTRADICȚIE => Presupunerea este FALSĂ

Ne oprim cand ajungem la 1, după împărțiri: din poza

=> 720 = 2^4 * 3^2 * 5^1

## Algoritm descompunere în factori primi

## Cum calculez nr de div

> **Obs:** 

n = p1^e1 * p2^e2 * p3^e3 * …. * pk^ek. (descomp. în fact primi)

nr de divizori ai lui n = (e1+1)*(e2+1)*...*(ek+1)

Algoritim:

## Primalitatea unui număr

Un nr natural n este prim dacă are doar 2 divizori.

Un nr ce nu este prim îl vom numi compus (neprim).

> **Obs:** Denumirea de nr “compus” vine din ideea că un nr ce nu este prim este compus din mai mulți factori primi (în descompunerea lui în factori primi).

> **Obs:** 0 - e compus - are o infinitate de divizori

> **Obs:** 1 - e compus - 1 divizor.

Obs1: Un nr n este prim dacă în intervalul [1,n] el are doar 2 divizori (pe cei improprii).

( => Un nr n este prim dacă în intervalul [2,n-1] el are 0 divizori. )

=> Un nr n este prim dacă nu exista divizor în intervalul [2, n-1].

> **Obs:** dacă n este (aprox) 1 000 000 000, se fac (aprox) 1 000 000 000

> **Obs:** Un nr este compus dacă găsesc divizor în intervalul [2, n/2]. (În caz contrar, e prim).

```cpp
if (n <= 1)
cout << "este neprim";

```

else

{

```cpp
bool estePrim = 1;
int jumatate = n / 2;
for (i = 2; i <= jumatate && estePrim == 1; i++)

```

{

```cpp
if (n % i == 0)

```

{

```cpp
estePrim = 0;

```

}

}

```cpp
if (estePrim)
cout << "este prim";

```

else

```cpp
cout << "este compus/neprim";

```

}

```cpp
if (n <= 1)
cout << "este neprim";

```

else

{

```cpp
bool estePrim = 1;
int jumatate = n / 2;
for (i = 2; i <= jumatate; i++)

```

{

```cpp
if (n % i == 0)

```

{

```cpp
estePrim = 0; break;

```

}

}

```cpp
if (estePrim)
cout << "este prim";

```

else

```cpp
cout << "este compus/neprim";

```

}

> **Obs:** Pt n = 1 000 000 000 (aprox.) se fac aprox. 500 000 000.

> **Obs:** Un nr este compus dacă are divizor în intervalul [2, radical(n)].

> **Obs:** a * b = n, a <= b. Dacă eu verific în intervalul [2, radical(n)] și nu găsesc niciun niciun divizor, atunci nu voi găsi nici în intervalul [radical(n), n]. De ce? Pt ca in [radical(n), n] regasesc perechile tuturor celor din [2, radical(n)] .

> **Obs:** Pt n (aprox.) = 1 000 000 000 se fac 31 000 pasi.

> **Obs:** 2 este singurul număr prim par.

=> Daca nr e par și nu e 2 atunci e compus..

```cpp
if (n <= 1)
cout << "este neprim";
else if (n == 2)
cout << "este prim";
else if (n % 2 == 0)
cout << "este compus";

```

else

{

```cpp
bool estePrim = 1;
for (i = 3; i * i <= n && estePrim == 1; i += 2)

```

{

```cpp
if (n % i == 0)

```

{

```cpp
estePrim = 0;

```

}

}

```cpp
if (estePrim)
cout << "este prim";

```

else

```cpp
cout << "este compus/neprim";

```

}

Q : Ce putem spune despre cel mai mic divizor propriu al unui nr ?

> **Obs:** Cel mai mic divizor propriu al unui nr este PRIM.

De ce:

Pp ca d ( d >= 2, n%d == 0) este COMPUS.

```cpp
=> d = a * b ( a, b > 1, a <= b) => a este divizor pt d ; a < d

```

Dar stiu si ca d < n, d este divizor pt n => a este divizor pt n, a < d < n =>

a este cel mai mic divizor propriu al lui n (FALS - prob îmi spune d este cel mai mic divizor propriu)
