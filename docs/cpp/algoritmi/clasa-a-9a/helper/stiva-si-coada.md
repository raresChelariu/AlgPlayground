# Stiva și Coada

Sunt concepte abstracte

Sunt structuri abstracte ce memorează mai multe elemente

Din viata reala:

Ex de stiva : stiva de apeluri de funcții, teancul de farfurii (când pun o farfurie la spălat, o pun în vârf, iar când iau o farfurie din teanc pentru a o spăla o iau din varf), setul vertical de scaune (care se pot pune unul peste altul (ca teanc))

Ex de coada : coada la tejghea (cand stau la coada la magazin), o masina de xerox într-o companie (primește mai multe cereri de printare și le executa în ordinea în care le primește)

Stiva - ultimul venit, primul servit (LIFO - Last In First Out)

Coada - primul venit, primul servit

ultimul venit, ultimul servit

FIFO (First In First Out)

“Servirea” - (scot un element) Pop

“Venirea” - (inserarea unui element) Push

Push - la Stiva - pune element în vârf (deasupra teancului)

Push - la Coada - pune element la finalul cozii

Pop - la Stiva - scot elementul din varf

Pop - la Coada - scot elementul de la începutul cozii

Front - vad elementul de la începutul cozii

Top - văd elementul din vârful stivei

(front și top nu schimbă cu nimic conținutul cozii, respectiv stivei)

(cand mă pun la coada nu mă bag în fața)

> **Obs:** Operația de Front există doar la coadă

> **Obs:** Operația de Top există doar la stivă

“Pe cine servesc ?”  - vreau sa vad elementul “pe care îl servesc”

Coada - primul - Front

Stiva - ultimul - Top

Reprezentarea in memorie - Stiva

```cpp
Problemele cu Stiva pot fi rezolvate dacă reprezint stiva ca un vector, unde elementele din vector sunt și elementele stivei.
```

Dacă numerotez pozițiile in vector de la 0, atunci pot considera ca baza stivei este la acea poziție.

Mai ramane sa stiu poziția vârfului - voi declara o variabila pentru poziția varfului.

Stiva cu vector numerotat de la 0

Cand pozVf = 0 => stiva are 1 elem

```cpp
=> stiva este goala ⇔ pozVf = -1;

```

Operatia de top

Operatia de pop

Operația de push

Ex 125

Inițial stiva e goala.

5

4

3

2

1

La stiva voi avea permanent în vedere vârful.

La coada voi avea permanent în vedere începutul și sfârșitul.

Problema 848

Idee : Șir ok ⇔ nr ( = nr )

Exista un șir care nu e ok  dar “nr ( = nr )” ?

)(() contraexemplu ok

))(( contraexemplu ok

(()))(

Stiva : ((

> **Obs:** Nu pot sa fac POP cand stiva e GOALA!

Idee #2 : Contor = nr( - nr)

Șirul este rău când :

Contorul ajunge sa fie -1

La final, contorul > 0

4 ENTER

(())

)(()

()((()())())

()(

```cpp
fin>>n;
for (i = 1; i <= n; i++)
fin.getline(s, 256);

```

Prob #852

`()[]([])([` va aici poate sa urmeze doar `(` sau `]` sau `[`

DAR NU `)`

`([` urmeaza `)` am un sir prost

Cand caracterul curent este:

(  - o pun in stiva

[  -  o pun in stiva

) - daca (    “am in varf (“    )

atunci

elimin varful

```cpp
altfel // am in varf [
```

SIR PROST

] - daca am in varf [

atunci

elimin varf

altfel am in varf (

sir prost

((] pot trece in (

(() pot trece in  (

()

[)
