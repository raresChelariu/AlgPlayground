# Conversia din `repeta ... pana cand` in `cat timp`

## Regula

Doua schimbari: **inversezi conditia** (`cat timp NOT <conditie>`) si **copiezi corpul o data inainte** de
bucla, fiindca `repeta` garanteaza o prima executie, iar `cat timp` testeaza de la inceput.

```
// repeta:                       // cat timp echivalent:
┌ repeta                         <instructiuni>             ← prima executie garantata
│    <instructiuni>             ┌ cat timp NOT C executa    ← opusul conditiei de oprire
└ pana cand C                   │    <instructiuni>
                                └■
```

---

## Exemplu

**Problema:** Numarul cifrelor unui numar natural.

```
// Cu repeta:                    // Cu cat timp:
citeste n                        citeste n
cnt ← 0                          cnt ← 0
┌ repeta                         cnt ← cnt + 1
│    cnt ← cnt + 1               n ← [n/10]
│    n ← [n/10]                 ┌ cat timp n ≠ 0 executa
└ pana cand n = 0               │    cnt ← cnt + 1
scrie cnt                       │    n ← [n/10]
                                └■
                                scrie cnt
```

---

## De ce functioneaza

- **Conditia se inverseaza**: `repeta` se opreste cand conditia e adevarata, `cat timp` continua cat e adevarata.
  Deci `pana cand n = 0` devine `cat timp n ≠ 0`.
- **Corpul apare de doua ori** — o data inainte de bucla si o data inauntru. Asta pentru ca `repeta` executa
  corpul macar o data inainte de orice test, iar `cat timp` nu. Prima copie acopera acea executie garantata.

> [!WARNING] Dublarea instructiunilor
> Spre deosebire de celelalte conversii, aici corpul se **dubleaza**. Daca este complex, codul devine greu de
> intretinut — exact motivul pentru care `repeta` (si `do...while`) exista ca instructiune separata.

> [!TIP] Cand poti renunta la copia din afara
> Daca esti sigur ca bucla s-ar executa oricum cel putin o data (ex. orice numar natural are macar o cifra),
> prima copie e redundanta si poti scrie direct doar `cat timp NOT C`. Nu mai e o echivalenta generala, doar
> una valabila in acel context.
