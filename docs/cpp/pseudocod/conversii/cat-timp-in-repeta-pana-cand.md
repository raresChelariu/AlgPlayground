# Conversia din `cat timp` in `repeta ... pana cand`

## Regula

Doua schimbari: **inversezi conditia** (`pana cand NOT <conditie>`) si o **inveleresti intr-un `daca`**,
fiindca `repeta` executa corpul cel putin o data, iar `cat timp` poate sa nu-l execute deloc.

```
// cat timp:                     // repeta echivalent:
┌ cat timp C executa            ┌ daca C atunci             ← protectie (corp minim 0 ori)
│    <instructiuni>             │ ┌ repeta
└■                             │ │    <instructiuni>
                               │ └ pana cand NOT C          ← opusul conditiei de continuare
                               └■
```

---

## Exemplu

**Problema:** Suma cifrelor unui numar natural.

```
// Cu cat timp:                  // Cu repeta:
citeste n                        citeste n
S ← 0                            S ← 0
┌ cat timp n ≠ 0 executa        ┌ daca n ≠ 0 atunci
│    S ← S + n % 10             │ ┌ repeta
│    n ← [n/10]                 │ │    S ← S + n % 10
└■                             │ │    n ← [n/10]
scrie S                        │ └ pana cand n = 0
                               └■
                               scrie S
```

---

## De ce functioneaza

- **Conditia se inverseaza** pentru ca cele doua bucle au sens opus: `cat timp` continua cat e adevarata,
  `repeta` se opreste cand devine adevarata. Cateva exemple:

  ```
  cat timp n ≠ 0    →    pana cand n = 0
  cat timp i ≤ n    →    pana cand i > n
  cat timp x > 0    →    pana cand x ≤ 0
  ```

- **`daca`-ul de protectie** acopera cazul in care conditia e falsa de la inceput: la `cat timp` corpul nu
  s-ar executa deloc, dar `repeta` l-ar executa o data. `daca C` ne asigura ca intram in `repeta` doar daca trebuie.

> [!TIP] Cand poti renunta la `daca`
> Daca esti sigur ca la prima trecere conditia este mereu adevarata (ex. citesti un numar pana e valid —
> macar o citire are loc oricum), atunci `daca`-ul e inutil si scrii direct:
> ```
> ┌ repeta
> │    <instructiuni>
> └ pana cand NOT C
> ```
