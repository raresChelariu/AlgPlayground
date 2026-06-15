# Conversia din `pentru` in `repeta ... pana cand`

## Regula

La fel ca la `cat timp`, facem manual cei **3 pasi** (initializare, conditie, incrementare), dar cu
**doua diferente**: conditia se **inverseaza** (`pana cand` se opreste cand devine adevarata) si adaugam
un `daca` de protectie, fiindca `repeta` executa corpul **cel putin o data**.

```
// pentru:                       // repeta echivalent:
┌ pentru i ← a, b executa        i ← a                      ← 1. initializam noi
│    <instructiuni>             ┌ daca i ≤ b atunci         ← protectie (interval gol)
└■                             │ ┌ repeta
                               │ │    <instructiuni>
                               │ │    i ← i + 1            ← 3. incrementam noi, la final
                               │ └ pana cand i > b          ← 2. opusul lui i ≤ b
                               └■
```

---

## Exemplu

**Problema:** Suma primelor `n` numere naturale.

```
// Cu pentru:                    // Cu repeta:
citeste n                        citeste n
S ← 0                            S ← 0
┌ pentru i ← 1, n executa        i ← 1
│    S ← S + i                  ┌ daca i ≤ n atunci
└■                             │ ┌ repeta
scrie S                        │ │    S ← S + i
                               │ │    i ← i + 1
                               │ └ pana cand i > n
                               └■
                               scrie S
```

---

## De ce functioneaza

- **Conditia se inverseaza.** La `cat timp` continuam *cat timp* `i ≤ n`; la `repeta` ne oprim *cand* conditia
  devine adevarata, deci scriem opusul: `pana cand i > n`.
- **Incrementarea** ramane ultima in corp, ca si la `cat timp`.
- **`daca`-ul de protectie** rezolva o problema ascunsa: `repeta` executa corpul macar o data, dar `pentru`
  cu interval gol (ex. `n = 0`) nu executa nimic. `daca i ≤ n` ne asigura ca sarim bucla in acel caz.

> [!NOTE] Pas negativ
> Pentru un `pentru` descrescator (`pentru i ← n, 1, -1`), conditia de continuare e `i ≥ 1`, deci opusul ei
> este `pana cand i < 1`, iar protectia devine `daca i ≥ 1 atunci`:
> ```
> i ← n
> ┌ daca i ≥ 1 atunci
> │ ┌ repeta
> │ │    <instructiuni>
> │ │    i ← i - 1
> │ └ pana cand i < 1
> └■
> ```
