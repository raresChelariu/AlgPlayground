# Notiuni introductive

> Extras din *Programarea in limbajul C/C++ pentru liceu*, capitolul 1 — Teoria
> grafurilor, paginile 8-13 (pozele `002`, `001`, `003`/`004`, `005`, `006`/`007`, `008`).

---

## Observatii asupra definitiei grafului

1. Intre oricare doua varfuri ale unui graf poate exista **cel mult o muchie/arc**.
   Daca intre doua varfuri exista mai multe muchii/arce, atunci structura se numeste
   **multigraf**.
2. In practica, informatiile asociate unui varf pot fi oricat de complexe, dar,
   pentru a simplifica, vom considera ca varfurile grafului sunt etichetate cu
   numere naturale de la `1` la `n` (unde `n` este numarul de varfuri din graf).
   Aceasta numerotare nu este o restrangere a generalitatii.
3. In unele lucrari de specialitate, un varf al grafului este denumit **nod**.

---

## Exemple de modelare

**1. Relatia de prietenie.** Sa consideram o clasa formata din `n` elevi. Unii dintre
elevii clasei sunt prieteni, relatia de prietenie fiind evident simetrica (daca Gigel
este prieten cu Ionel, atunci si Ionel este prieten cu Gigel). Putem modela relatiile
de prietenie din clasa cu ajutorul unui **graf neorientat** in care multimea varfurilor
are `n` elemente (elevii clasei), iar multimea muchiilor este formata din toate
perechile de elevi cu proprietatea ca elevii care formeaza perechea sunt prieteni.

**2. Imprumutul de carti.** Sa consideram aceeasi clasa de elevi. Doamna profesoara de
romana incurajeaza schimburile de carti intre elevi si i-a sfatuit sa completeze
intr-un caiet special imprumuturile (ce carte a fost imprumutata, de catre cine si cui).
Situatia poate fi modelata cu ajutorul unui **graf orientat** in care multimea varfurilor
corespunde elevilor clasei, iar multimea arcelor corespunde imprumuturilor efectuate
(exista arc de la varful `x` la varful `y` daca elevul corespunzator varfului `x` a
imprumutat o carte de la elevul corespunzator varfului `y`). Graful este orientat
deoarece relatia definita nu este simetrica.

Graful astfel definit modeleaza doar relatia de imprumut (a imprumutat sau nu elevul `x`
carti de la elevul `y`), dar nu si imprumuturile efective. Daca dorim sa modelam fiecare
imprumut efectuat, vom construi un **multigraf orientat** in care vom avea cate un arc de
la `x` la `y` pentru fiecare carte imprumutata de elevul `x` de la elevul `y`.

### Exercitii propuse

1. Sa analizam pe harta reteaua stradala a orasului in care locuim. Observam ca unele
   strazi au sens unic, in timp ce alte strazi au doua sensuri de circulatie. De
   asemenea, orice strada are doua capete. Capetele de strazi pot fi intersectii sau
   fundaturi. Modelati harta cu ajutorul unui graf, explicand daca graful este orientat
   sau neorientat, care este multimea varfurilor grafului si care este multimea
   muchiilor/arcelor grafului.
2. Sa analizam harta lumii. Cum se pot modela relatiile de vecinatate dintre tari cu
   ajutorul unui graf?
3. Dati exemple de doua situatii din viata cotidiana care pot fi modelate cu ajutorul
   unui graf orientat si de doua situatii care pot fi modelate cu ajutorul unui graf
   neorientat. Explicati modul in care construiti multimea varfurilor, precum si
   multimea arcelor/muchiilor grafului.

---

## Reprezentarea vizuala a grafurilor

Pentru o mai buna intelegere a notiunii de graf se utilizeaza o reprezentare vizuala
descrisa astfel:

- fiecarui varf din graf ii corespunde un punct in plan, in dreptul caruia este
  specificat numarul varfului;
- daca graful este **orientat**, vom reprezenta fiecare arc ca o **sageata** dinspre
  extremitatea initiala catre extremitatea finala a arcului;
- daca graful este **neorientat**, vom reprezenta fiecare muchie ca o **linie**
  (dreapta sau curba) care uneste cele doua extremitati ale muchiei.

Uneori, pentru o mai mare lizibilitate, un varf se reprezinta ca un cerc sau un patrat
in interiorul caruia se specifica numarul varfului, ori un disc langa care se specifica
numarul varfului.

### Exemple

**1.** Graful orientat `G = (V, E)`, unde `V = {1, 2, 3, 4, 5}`, iar
`E = {(1,2), (1,4), (2,4), (3,2), (2,3)}` — **figura 1**.

**2.** Graful neorientat `G = (V, E)`, unde `V = {1, 2, 3, 4, 5}`, iar
`E = {[1,2], [1,4], [2,4], [3,2]}` — **figura 2**.

### Exercitii propuse

1. Reprezentati vizual graful neorientat cu multimea varfurilor `{1, 2, 3, 4, 5, 6}` si
   multimea muchiilor
   `{[1,2], [1,3], [1,4], [1,5], [1,6], [2,3], [2,4], [2,5], [2,6], [3,4], [3,5], [3,6], [4,5], [4,6], [5,6]}`.
2. Reprezentati vizual graful orientat cu multimea varfurilor `{1, 2, 3, 4, 5, 6}` si
   multimea arcelor `{(1,2), (1,3), (1,4), (1,5), (5,1), (6,1), (3,6)}`.

---

## Gradul unui varf

Fie `G = (V, E)` un graf **neorientat**. Se numeste **grad** al unui varf din graf
numarul de muchii incidente cu varful respectiv. Gradul varfului `x` se noteaza `d(x)`.

De exemplu, pentru graful neorientat ilustrat in figura 2:

```
d(1) = 2, d(2) = 3, d(3) = 1, d(4) = 2, d(5) = 0
```

Se numeste **varf izolat** un varf care are gradul `0`. Se numeste **varf terminal**
un varf cu gradul `1`.

De exemplu, in graful neorientat din figura 2, varful `5` este varf izolat, iar `3` este
varf terminal.

Fie `G = (V, E)` un graf **orientat** si `x` un varf din graf. **Gradul exterior** al
varfului `x` se noteaza `d+(x)` si este egal cu numarul de arce care au ca extremitate
initiala pe `x`. **Gradul interior** al varfului `x` se noteaza `d-(x)` si este egal cu
numarul de arce care au ca extremitate finala pe `x`.

De exemplu, pentru graful orientat ilustrat in figura 1:

```
d+(1) = 2, d+(2) = 2, d+(3) = 1, d+(4) = 0, d+(5) = 0
d-(1) = 0, d-(2) = 2, d-(3) = 1, d-(4) = 2, d-(5) = 0
```

### Teorema 1

1. Suma gradelor varfurilor unui graf neorientat este egala cu **dublul numarului de
   muchii** din graf.
2. Suma gradelor interioare ale varfurilor unui graf orientat este egala cu suma
   gradelor exterioare ale varfurilor grafului si egala cu **numarul de arce** din graf.

**Demonstratie.** Intr-un graf neorientat, fiecare muchie contribuie cu o unitate la
gradul fiecareia dintre extremitatile sale, deci in total la suma tuturor gradelor
varfurilor fiecare muchie contribuie cu doua unitati. Intr-un graf orientat, fiecare arc
contribuie cu o unitate la suma gradelor interioare ale varfurilor si cu o unitate la
suma gradelor exterioare ale varfurilor.

---

## Secventa grafica

Fie `n-1 >= d1 >= d2 >= ... >= dn >= 0` o secventa descrescatoare de `n` numere naturale.
Aceasta secventa se numeste **secventa grafica** daca exista un graf neorientat cu
gradele varfurilor `d1, d2, ..., dn`.

De exemplu, pentru `n = 7`, secventa `4, 2, 2, 2, 2, 1, 1` este o secventa grafica.
Dar secventa `5, 4, 2, 2, 1, 1, 0` **nu** este secventa grafica, deoarece nu exista
niciun graf ale carui varfuri sa aiba gradele specificate in secventa.

### Teorema 2

Secventa de numere naturale nenule `D = (d1 >= d2 >= ... >= dn)` este secventa grafica
daca si numai daca secventa
`D' = (d2 - 1, d3 - 1, ..., d(d1+1) - 1, d(d1+2), ..., dn)`
este secventa grafica si `d1 <= n - 1`.

**Demonstratie.**

*Suficienta.* Presupunand ca `D'` este secventa grafica, deducem ca exista un graf cu
secventa gradelor `D'`. Introducem in acest graf un nou varf pe care il vom uni prin
muchii de varfurile `2, 3, ..., d1 + 1`. Obtinem astfel un graf cu secventa gradelor `D`.

*Necesitatea.* Sa consideram ca `D` este secventa grafica, prin urmare exista cel putin
un graf cu secventa gradelor `D`. Sa consideram ca `G` este un astfel de graf, si anume
cel pentru care suma gradelor varfurilor adiacente cu varful `1` este maxima. Sa
demonstram ca in graful `G` varful `1` este adiacent chiar cu varfurile
`2, 3, ..., d1 + 1`. (Ca urmare, putem sa eliminam din `G` varful `1` si toate muchiile
incidente cu acesta si sa obtinem un alt graf `G'` cu `n - 1` varfuri si secventa
gradelor `D'`.)

Sa presupunem ca exista un varf `k` (`2 <= k <= d1 + 1`) astfel incat varful `k` nu este
adiacent cu varful `1`. Rezulta ca exista un varf `j` (`j > d1 + 1`) astfel incat
varfurile `1` si `j` sunt adiacente. Daca gradul `dk = dj`, putem interschimba varfurile
`j` si `k`, fara a altera ordinea din secventa gradelor. Daca `dk != dj`, cum `j > k`,
deducem ca se poate obtine un graf care contrazice maximalitatea aleasa.

> [!NOTE] Observatie
> Demonstratia acestei propozitii conduce si la un **algoritm constructiv** de
> determinare a unui graf cu secventa gradelor data: la fiecare pas vom uni prin muchii
> varful curent `i` cu fiecare dintre cele `di` varfuri care urmeaza si vom decrementa
> gradele acestora; dupa fiecare pas trebuie sa reordonam varfurile dupa grade.
> Algoritmul se termina fie cand am epuizat varfurile (dupa `n - 1` pasi), fie cand
> gasim un varf `i` pe care nu il putem uni cu cele `di` urmatoare (am obtine un grad
> negativ), caz in care vom concluziona ca `D` nu este secventa grafica.

---

## Exercitii rezolvate

**1. Sa se determine numarul maxim de muchii intr-un graf neorientat cu `n` varfuri.**

*Solutie.* Numarul maxim de muchii se obtine atunci cand oricare doua varfuri din graf
sunt adiacente. Prin urmare, numarul maxim de muchii intr-un graf cu `n` varfuri este
egal cu numarul de submultimi de doua elemente ale multimii `{1, 2, ..., n}`, adica
`n * (n - 1) / 2`.

**2. Sa se determine numarul grafurilor neorientate cu `n` varfuri.**

*Solutie.* Sa notam cu `m = n * (n - 1) / 2` numarul maxim de muchii intr-un graf cu `n`
varfuri si sa consideram ca muchiile posibile sunt numerotate de la `1` la `m`. Intr-un
graf cu `n` varfuri, fiecare dintre cele `m` muchii poate sa apartina sau nu grafului.
Putem astfel asocia, in mod biunivoc, fiecarui graf neorientat cu `n` varfuri o functie
`f: {1, 2, ..., m} -> {0, 1}` astfel: `f(i) = 1` daca muchia numerotata cu `i` apartine
grafului, respectiv `f(i) = 0` in caz contrar. Numarul de grafuri neorientate cu `n`
varfuri este egal cu numarul de functii astfel definite, adica `2^m`.

---

## Exercitii propuse

1. Sa se reprezinte vizual un graf neorientat cu 5 varfuri, in care fiecare varf are
   grad maxim.
2. Sa se reprezinte vizual un graf neorientat cu 11 varfuri, cu numar minim de muchii,
   in care sa nu existe varfuri izolate.
3. Sa se determine numarul minim de muchii dintr-un graf neorientat cu `n` varfuri care
   nu contine varfuri izolate.
4. Sa consideram graful orientat din **figura 3**. Determinati gradul interior si gradul
   exterior al fiecarui varf.
5. Sa consideram graful neorientat din **figura 4**. Determinati gradul fiecarui varf si
   identificati varfurile izolate.
6. Demonstrati ca in orice graf neorientat numarul varfurilor de grad impar este par.
7. Demonstrati ca un graf neorientat care are mai mult de `(n-1) * (n-2) / 2` muchii nu
   contine varfuri izolate.
8. Demonstrati ca intr-un graf neorientat care are cel putin doua varfuri exista cel
   putin doua varfuri cu acelasi grad.
9. Sa se determine numarul maxim de arce intr-un graf orientat cu `n` varfuri.
10. Sa se determine numarul de grafuri orientate cu `n` varfuri.
11. Un graf neorientat are 80 de noduri si 80 de muchii. Numarul de noduri izolate este
    cel mult:
    **a.** 90 **b.** 67 **c.** 10 **d.** 66 *(Bacalaureat, iulie 2003)*
12. Se considera un graf neorientat cu 8 varfuri si 15 muchii. Numarul de varfuri izolate
    din graf este:
    **a.** exact 1 **b.** cel mult 1 **c.** exact 0 **d.** cel mult 2 *(Bacalaureat, iulie 2003)*
13. Sa se verifice daca secventa `(7, 4, 2, 1, 1, 1, 1, 1)` este sau nu secventa grafica.
14. Scrieti un program care sa verifice daca o secventa de numere naturale data este sau
    nu secventa grafica, iar in caz afirmativ sa se afiseze muchiile unui graf cu
    secventa gradelor egala cu secventa specificata.
