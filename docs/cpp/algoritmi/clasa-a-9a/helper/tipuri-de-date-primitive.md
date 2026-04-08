# Tipuri de date (primitive)

Tipurile de date primitive sunt cele predefinite de limbaj.

> **Obs:** 

Un tip de date “unsigned” ocupă la fel de mult ca respectivul său fără unsigned.

```cpp
Se memoreaza la fel de multe numere, doar ca la tipul unsigned minimul din toate range (interval) este mereu 0.
Explicație: unsigned înseamnă în engleza “fără semn”, adică pozitiv (fără minus).
Prin urmare, folosesc tipurile unsigned cand știu sigur că în acea variabila voi memora doar numere naturale.
```

Tipuri pentru numere întregi

Tipuri pt numere “cu virgula”

Operatorul sizeof

Este un operator ce îl putem folosi pentru a calcula dimensiunea unui tip de date, dar și a unei zone de memorie. Este util de folosit cand vreau sa verific daca ma incadrez in limită de memorie data.

```cpp
Ex: cout<<sizeof(int); // se va afișa 4
Ex: int v[101]; cout<<sizeof(v); // se va afișa  404
Ex: long long mat[10][10]; cout<<sizeof(mat); // se va afișa 800

```

> **Obs:** Un pointer, indiferent de tip, ocupă (în general) 8 bytes.
