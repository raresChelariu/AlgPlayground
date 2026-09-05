# 1.7. Tare-conexitate

> Extras din *Programarea in limbajul C/C++ pentru liceu*, paginile 51 si 54
> (pozele `045`, `046`).

> [!WARNING] Atentie
> Paginile **52-53** lipsesc din poze — acolo se afla algoritmul propriu-zis de descompunere
> in componente tare-conexe. Din sectiunea 1.7 avem doar definitiile (pagina 51) si
> exercitiile 5-8 (pagina 54).

---

## Definitii

Un graf **orientat** se numeste **tare-conex** daca oricare ar fi `x` si `y` varfuri din graf
exista drum de la `x` la `y` **si** drum de la `y` la `x`.

Se numeste **componenta tare-conexa** un subgraf tare-conex **maximal** cu aceasta proprietate
(adica, daca am mai adauga un varf si toate arcele incidente cu acesta, subgraful obtinut nu ar
mai fi tare-conex).

**Exemple.** Cartea da un graf orientat tare-conex si un graf orientat care nu este tare-conex
(de exemplu, de la varful `1` la `8` exista drum, dar de la `8` la `1` nu exista).

---

## Exercitii propuse (5-8)

5. Se considera un graf orientat tare-conex. Cate circuite trec prin toate varfurile grafului?
   **a.** exact unul **b.** cel putin unul **c.** niciunul **d.** cel mult unul
   *(Bacalaureat, iulie ...)*
6. Se considera un graf orientat cu 9 varfuri astfel incat, pentru orice `i`, exista un arc de
   la varful `i` la varful `2 * i` si la varful `2 * i + 1` (pentru `2 * i <= 9`, respectiv
   `2 * i + 1 <= 9`), precum si arcul `(9, 1)`. Cate componente tare-conexe are acest graf?
7. Scrieti un program care sa realizeze descompunerea in componente tare-conexe a unui graf
   orientat pe baza matricei inchiderii tranzitive a grafului.
8. Scrieti un program care sa construiasca **graful condensat** al unui graf orientat. In graful
   condensat exista un varf pentru fiecare componenta tare-conexa a grafului dat. Exista arc de
   la varful `x` la varful `y` in graful condensat daca exista cel putin un drum de la un varf
   situat in componenta tare-conexa corespunzatoare varfului `x` la un varf situat in componenta
   tare-conexa corespunzatoare varfului `y`.

> [!NOTE] Observatie
> Enuntul exercitiului 5 este partial taiat in poza `046`; formularea de mai sus este
> reconstituita din context.
