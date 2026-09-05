# 1.8. Arbori

> Extras din *Programarea in limbajul C/C++ pentru liceu*, paginile 54, 55, 57 si 58
> (pozele `046`, `047`, `048`, `049`).

> [!WARNING] Atentie
> Pagina **56** lipseste din poze — acolo se afla finalul demonstratiei teoremei despre
> secventa gradelor unui arbore si inceputul descrierii codului Pruffer.

---

## Definitii

Un graf neorientat **conex si aciclic** se numeste **arbore**.

Un graf neorientat **aciclic si neconex** se numeste **padure**.

> [!NOTE] Observatie
> Fiecare componenta conexa a unui graf aciclic neconex (padure) este un arbore.

---

## Teorema de caracterizare a arborilor

Fie `G` un graf neorientat cu `n` varfuri. Urmatoarele afirmatii sunt **echivalente**:

1. `G` este arbore.
2. Oricare doua varfuri din `G` sunt unite printr-un **lant simplu unic**.
3. `G` este **conex minimal** (daca suprimam o muchie, graful obtinut este neconex).
4. `G` este conex si are `n - 1` muchii.
5. `G` este aciclic si are `n - 1` muchii.
6. `G` este **aciclic maximal** (daca adaugam o muchie, graful obtinut contine cicluri).

**Exercitiu propus.** Demonstrati teorema de caracterizare a arborilor, considerand in ordine
implicatiile `1 => 2 => 3 => 4 => 5 => 6 => 1`.

---

## Determinarea unui arbore cu secventa gradelor data

### Teorema

Numerele naturale `0 < d1 <= d2 <= ... <= dn` (`n >= 2`) sunt gradele varfurilor unui arbore
daca si numai daca `d1 + d2 + ... + dn = 2n - 2`.

**Demonstratie.** Conditia este **necesara**, deoarece orice arbore cu `n` varfuri are `n - 1`
muchii, iar suma gradelor varfurilor oricarui graf este dublul numarului de muchii. Deci
`d1 + d2 + ... + dn = 2n - 2`.

Demonstratia suficientei si constructia efectiva se afla pe pagina 56, care lipseste din poze.

---

## Codul Pruffer

Pornind de la un arbore `An` cu `n` varfuri, suprimam varful terminal cu cel mai mic indice si
muchia incidenta cu acesta si retinem `a1`, varful adiacent cu varful terminal suprimat. Am
obtinut astfel un subgraf cu `n - 2` muchii, conex si aciclic, deci un arbore `An-1`. Repetam
procedeul pentru arborele `An-1`, determinand un al doilea varf `a2`, adiacent cu varful
terminal de indice minim ce va fi eliminat din `An-1` impreuna cu muchia incidenta cu el
s.a.m.d., pana cand se obtine un arbore `A2` cu doua varfuri adiacente.

Am obtinut astfel un sistem `{a1, a2, ..., an-2}` de `n - 2` numere
(`1 <= ai <= n`, pentru orice `i` din `{1, 2, ..., n - 2}`) asociat arborelui `An`, numit
**codul Pruffer** al lui `An`.

Se poate demonstra ca exista o **corespondenta biunivoca** intre multimea arborilor `A` cu `n`
varfuri si multimea sistemelor `{a1, a2, ..., an-2}`, cu `ai` din `{1, 2, ..., n}`.

Folosind acest rezultat, deducem ca numarul arborilor ce se pot construi cu `n` varfuri date
este egal cu `n^(n-2)` (numarul functiilor definite pe o multime cu `n - 2` elemente, cu valori
intr-o multime cu `n` elemente). Aceasta formula poarta numele de **formula lui Cayley**.

---

## Exercitii propuse

1. Se considera graful neorientat din figura urmatoare. Care dintre componentele conexe ale
   grafului sunt arbori?
2. Se considera urmatorul graf cu 7 varfuri si 6 muchii, reprezentat prin lista muchiilor. Este
   acest graf un arbore?

   | poz. | 1 | 2 | 3 | 4 | 5 | 6 |
   | --- | - | - | - | - | - | - |
   | **x** | 1 | 1 | 2 | 4 | 5 | 4 |
   | **y** | 3 | 7 | 5 | 5 | 6 | 6 |

   *(tabelul este partial ilizibil in poza `048`)*
3. Sa consideram un graf complet cu 6 varfuri. Cate muchii trebuie sa fie eliminate din graf
   pentru a obtine un arbore?
4. Un graf neorientat are 20 de varfuri, 30 de muchii si 5 componente conexe. Cate muchii trebuie
   sa fie eliminate din graf pentru a obtine o padure?
5. Stabiliti care dintre grafurile urmatoare este un arbore. *(Simulare Bacalaureat, 2003)*
6. Memorarea unui arbore cu ajutorul matricei de adiacenta este o metoda:
   **a.** ineficienta **b.** eficienta **c.** recomandabila **d.** incorecta
   *(Bacalaureat special, 2003)*
7. Se considera graful neorientat dat prin matricea de adiacenta urmatoare. Stabiliti daca se
   poate obtine un arbore prin eliminarea unora dintre muchiile grafului.

   ```
   0 1 0 1 1
   1 0 0 0 1
   0 0 0 1 1
   1 0 1 0 0
   1 1 1 0 0
   ```

   **a.** Da, prin eliminarea exact a unei muchii.
   **b.** Da, prin eliminarea exact a doua muchii.
   **c.** Da, prin eliminarea exact a trei muchii.
   **d.** Nu.
   *(Bacalaureat, iulie 2006)*
8. Se da urmatoarea secventa de numere naturale: `4, 3, 3, 1, 1, 1, 1, 1, 1`. Sa se verifice daca
   aceasta secventa poate fi secventa gradelor unui arbore. In caz afirmativ, determinati un
   arbore cu aceasta secventa a gradelor.
9. Se considera urmatorul cod Pruffer: `3, 4, 4, 6, 6, 7, 9`. Sa se construiasca arborele
   codificat.
10. Demonstrati ca varfurile oricarui arbore pot fi colorate cu doua culori astfel incat oricare
    doua varfuri adiacente sa fie colorate diferit.
11. Fie un graf neorientat reprezentat prin:
    **a.** matrice de adiacenta **b.** liste de adiacenta **c.** lista muchiilor
    Scrieti un program care sa verifice daca graful este arbore.
12. Scrieti un program care sa genereze toti arborii cu `n` varfuri.
