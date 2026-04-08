# Operații pe biți

```cpp
Link util: http://campion.edu.ro/arhiva/www/arhiva_2009/papers/paper21.pdf

```

> **Obs:** 100…0  ( n zerouri) este b^n (unde b este baza de numeratie).

```cpp
//9999….9 ( n de 9) este 10^n-1
```

> **Obs:** 11...1 (n de 1) este 2^n-1

> **Obs:** 10..0 (n de 0) este 2^n

> **Obs:** cea mai mica val pe un byte este 0 (cand toți biții sunt 0)

> **Obs:** cea mai mare val pe un byte este 2^8-1 = 255 (când toți biții sunt 1)

```cpp
Shiftarea la stanga (<<)

Sintaxa : a<<b

```

Efect: Biții lui a se muta la stanga cu b poziții, iar în urma acestei operații,  ultimele b poziții sunt umplute cu 0.

> **Obs:** Cei b biti cei mai din stanga se pierd (cand lucrez cu 1 byte) (cand lucrez cu 2 bytes, biții ce s-ar pierde în cazul anterior, se muta la stanga pe byte-ul următor) !!!

> **Obs:** cout<<2<<3; // se afișează 23, NU 16.

```cpp
(pt a afișa 16 aș fi putut scrie cout<<(2<<3); )

Shiftarea la dreapta (>>)

Sintaxa : a>>b

```

Efect: Se muta toți biții lui a la dreapta cu b poziții. Primii b biți de la dreapta (dinainte de shiftare), în urma shiftarii se pierd. Bitii necompletati in urma shiftarii (cei din stanga) se completeaza cu 0.

> **Obs:** a>>b ⇔ a/2^b

NOT binar (~) (bitwise not)

Sintaxa : ~a

Efect : Pt fiecare bit din reprezentarea lui a: dacă bitul este x, acesta devine 1-x.

Pt reprez pe 1 byte : 2^8 - 1 - a

Pt reprez pe 2 bytes : 2^16 - 1 - a

```cpp
Pt reprez pe x bytes; 2^(8*x) - 1 - a

```

AND binar (&) (bitwise and)

Sintaxa: a & b

Efect: Rezultatul este : pe fiecare poziție se face AND logic între bitul lui a și bitul lui b de pe acea poziție.

OR binar (|) (bitwise or)

Sintaxa: a | b

Efect: La fel ca la AND binar, doar ca fac OR logic intre biti, nu AND.

XOR (binar) (^) (se pronunța “csor”)

Sintaxa: a ^ b

Efect: La fel ca la AND binar doar ca aplic XOR logic și nu AND logic.

⇔

Efect : De pe fiecare poziție se aduna biții și se memorează doar ultima cifra (din adunarea în baza 2).
