# Conversia din `cat timp` in `executa ... cat timp`

## Regula

`executa ... cat timp` foloseste **aceeasi conditie** ca `cat timp` — ambele continua *cat timp* e adevarata.
Singura diferenta e momentul testului: `executa` verifica la final si executa corpul cel putin o data, pe cand
`cat timp` poate sa nu-l execute deloc. De aceea invelim totul intr-un `daca` care protejeaza prima iteratie.

```
// cat timp:                     // executa cat timp echivalent:
┌ cat timp C executa            ┌ daca C atunci             ← protectie (corp minim 0 ori)
│    <instructiuni>             │ ┌ executa
└■                             │ │    <instructiuni>
                               │ └ cat timp C               ← aceeasi conditie, fara inversare
                               └■
```

---

## Exemplu

**Problema:** Suma cifrelor unui numar natural.

```
// Cu cat timp:                  // Cu executa cat timp:
citeste n                        citeste n
S ← 0                            S ← 0
┌ cat timp n ≠ 0 executa        ┌ daca n ≠ 0 atunci
│    S ← S + n % 10             │ ┌ executa
│    n ← [n/10]                 │ │    S ← S + n % 10
└■                             │ │    n ← [n/10]
scrie S                        │ └ cat timp n ≠ 0
                               └■
                               scrie S
```

---

## De ce functioneaza

- **Conditia ramane neschimbata.** Ambele instructiuni continua *cat timp* conditia e adevarata — spre
  deosebire de conversia in [`repeta ... pana cand`](/cpp/pseudocod/conversii/cat-timp-in-repeta-pana-cand),
  unde conditia trebuia inversata. (`executa ... cat timp` este `do...while`, nu `repeat...until`.)
- **`daca`-ul de protectie** acopera cazul in care conditia e falsa de la inceput: `cat timp` nu ar executa
  corpul deloc, dar `executa` l-ar executa o data. `daca C` ne asigura ca intram in bucla doar daca trebuie.

> [!TIP] Cand poti renunta la `daca`
> Daca esti sigur ca la prima trecere conditia e mereu adevarata (ex. citesti pana la o valoare valida —
> macar o citire are loc oricum), `daca`-ul e inutil si scrii direct:
> ```
> ┌ executa
> │    <instructiuni>
> └ cat timp C
> ```
