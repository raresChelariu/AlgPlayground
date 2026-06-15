# Conversia din `pentru` in `cat timp`

## Regula

`pentru` face automat **3 lucruri** pe care la `cat timp` trebuie sa le facem manual:
**initializarea**, **conditia** si **incrementarea**.

```
// pentru:                       // cat timp echivalent:
┌ pentru i ← a, b executa        i ← a                      ← 1. initializam noi
│    <instructiuni>              ┌ cat timp i ≤ b executa    ← 2. conditia scrisa explicit
└■                              │    <instructiuni>
                                │    i ← i + 1              ← 3. incrementam noi, la final
                                └■
```

---

## Exemplu

**Problema:** Suma primelor `n` numere naturale.

```
// Cu pentru:                    // Cu cat timp:
citeste n                        citeste n
S ← 0                            S ← 0
┌ pentru i ← 1, n executa        i ← 1
│    S ← S + i                   ┌ cat timp i ≤ n executa
└■                              │    S ← S + i
scrie S                         │    i ← i + 1
                                └■
                                scrie S
```

---

## De ce functioneaza

`pentru i ← a, b` desfacut pas cu pas inseamna exact:

```
i ← a                  → initializare, o singura data
cat timp i ≤ b         → test la inceput
    <instructiuni>     → corpul buclei
    i ← i + 1          → incrementare, dupa corp
```

- **Initializarea** se face **inainte** de bucla — `cat timp` nu stie de unde sa porneasca.
- **Incrementarea** se pune **ultima in corp**, pentru ca `pentru` mai intai executa instructiunile si abia apoi creste `i`.

> [!NOTE] Pas negativ
> La un `pentru` descrescator (`pentru i ← n, 1, -1`), aplici aceeasi idee in sens invers:
> initializezi `i ← n`, conditia devine `i ≥ 1`, iar in corp scrii `i ← i - 1`.
> ```
> i ← n
> ┌ cat timp i ≥ 1 executa
> │    <instructiuni>
> │    i ← i - 1
> └■
> ```
