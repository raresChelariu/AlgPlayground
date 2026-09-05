# Reprezentarea prin lista muchiilor/arcelor

> Extras din *Programarea in limbajul C/C++ pentru liceu*, paginile 34-35
> (pozele `030`, `031`).

---

## Definitie

Pentru a reprezenta un graf neorientat prin **lista muchiilor**, respectiv un graf orientat
prin **lista arcelor**, se utilizeaza un vector cu `m` componente, unde `m` este numarul de
muchii/arce din graf. Pentru fiecare muchie/arc vor fi retinute cele doua extremitati.

- In cazul **muchiilor**, ordinea extremitatilor nu conteaza.
- In cazul **arcelor**, va fi retinuta mai intai extremitatea initiala, apoi extremitatea
  finala.

**Exemplu.** Pentru graful neorientat `G1` cu muchiile `[1,2]`, `[1,3]`, `[1,4]`, `[3,4]`,
lista muchiilor este:

| poz. | 1 | 2 | 3 | 4 |
| --- | - | - | - | - |
| **x** | 1 | 1 | 1 | 3 |
| **y** | 2 | 3 | 4 | 4 |

---

## Detalii de implementare

O muchie/un arc poate fi reprezentat(a):

- ca o **structura cu doua campuri** (cate unul pentru fiecare extremitate), reprezentarea
  grafului prin lista muchiilor/arcelor fiind astfel un vector de structuri;
- sau ca un **tablou cu doua componente**, reprezentarea grafului prin lista muchiilor/arcelor
  fiind astfel o matrice cu doua linii si `m` coloane.

---

## Care este cea mai buna reprezentare a unui graf?

Intrebarea care se impune in acest moment este "care este cea mai buna reprezentare a unui
graf?". Raspunsul este... **depinde**! Depinde de problema pe care dorim sa o rezolvam.

| Reprezentare | Timp de prelucrare | "x si y sunt adiacente?" |
| --- | --- | --- |
| Matrice de adiacenta | `O(n^2)` | `O(1)` |
| Liste de adiacenta | `O(n + m)` | `O(n)` |
| Lista muchiilor/arcelor | `O(m)` | `O(m)` |

Reprezentarea grafului prin lista muchiilor/arcelor poate fi deosebit de utila pentru
problemele in care este necesara **parcurgerea muchiilor/arcelor intr-o anumita ordine**.

---

## Exercitii propuse

1. Construiti reprezentarile prin lista muchiilor/arcelor ale grafurilor urmatoare.
2. Se considera urmatoarea reprezentare prin lista muchiilor a unui graf neorientat cu 7
   varfuri. Sa se determine gradele varfurilor grafului.

   | poz. | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
   | --- | - | - | - | - | - | - | - |
   | **x** | 2 | 3 | 3 | 5 | 5 | 7 | 5 |
   | **y** | 1 | 2 | 5 | 2 | 7 | 4 | 4 |

3. Se considera urmatoarea reprezentare prin lista arcelor a unui graf orientat cu 7 varfuri.
   Care dintre urmatoarele afirmatii sunt adevarate?
   **a.** Graful contine circuite.
   **b.** Varful 5 are gradul interior egal cu gradul exterior.
   **c.** Graful este antisimetric.

> [!WARNING] Atentie
> Lista arcelor de la exercitiul 3 nu s-a putut reconstitui corect din poza `031` — OCR-ul a
> amestecat liniile tabelului. Pentru rezolvare trebuie recitita pagina 35 din carte.
