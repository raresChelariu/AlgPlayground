# Conversia din `executa ... cat timp` in `cat timp`

## Regula

`cat timp` foloseste **aceeasi conditie** ca `executa ... cat timp` — ambele continua *cat timp* e adevarata.
Diferenta e ca `executa` testeaza la final si garanteaza o prima executie, pe cand `cat timp` testeaza la
inceput. De aceea copiem corpul **o data inainte** de bucla.

```
// executa cat timp:             // cat timp echivalent:
┌ executa                        <instructiuni>             ← prima executie garantata
│    <instructiuni>             ┌ cat timp C executa        ← aceeasi conditie, fara inversare
└ cat timp C                    │    <instructiuni>
                                └■
```

---

## Exemplu

**Problema:** Numarul cifrelor unui numar natural.

```
// Cu executa cat timp:          // Cu cat timp:
citeste n                        citeste n
cnt ← 0                          cnt ← 0
┌ executa                        cnt ← cnt + 1
│    cnt ← cnt + 1               n ← [n/10]
│    n ← [n/10]                 ┌ cat timp n ≠ 0 executa
└ cat timp n ≠ 0               │    cnt ← cnt + 1
scrie cnt                       │    n ← [n/10]
                                └■
                                scrie cnt
```

---

## De ce functioneaza

- **Conditia ramane neschimbata.** Ambele continua *cat timp* conditia e adevarata — spre deosebire de
  conversia [`repeta ... pana cand` → `cat timp`](/cpp/pseudocod/conversii/repeta-in-cat-timp), unde conditia
  se inversa. (`executa ... cat timp` este `do...while`, nu `repeat...until`.)
- **Corpul apare de doua ori** — o data inainte de bucla si o data inauntru. `executa` ruleaza corpul macar o
  data inainte de orice test, iar `cat timp` nu; prima copie acopera acea executie garantata.

> [!WARNING] Dublarea instructiunilor
> La fel ca la conversia din `repeta`, corpul se **dubleaza**. Daca este complex, codul devine greu de
> intretinut — exact motivul pentru care `executa ... cat timp` (si `do...while`) exista ca instructiune separata.

> [!TIP] Cand poti renunta la copia din afara
> Daca esti sigur ca bucla s-ar executa oricum cel putin o data (ex. orice numar natural are macar o cifra),
> prima copie e redundanta si poti scrie direct doar `cat timp C`.
