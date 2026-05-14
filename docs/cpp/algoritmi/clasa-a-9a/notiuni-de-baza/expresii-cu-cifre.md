# Expresii cu cifre

In C++, putem extrage cifrele unui numar folosind operatorii `%` (restul impartirii) si `/` (catul impartirii).

---

## Obtinerea ultimelor cifre cu `%`

Operatorul `%` ne da **restul** impartirii. Cand impartim la o putere a lui 10, obtinem ultimele cifre:

| Expresie | Ce obtinem | Exemplu (`x = 48257`) |
|----------|-----------|----------------------|
| `x % 10` | Ultima cifra | `48257 % 10 = 7` |
| `x % 100` | Ultimele 2 cifre | `48257 % 100 = 57` |
| `x % 1000` | Ultimele 3 cifre | `48257 % 1000 = 257` |

> **Regula:** `x % 10^k` ne da ultimele `k` cifre ale lui `x`.

---

## Taierea ultimelor cifre cu `/`

Operatorul `/` (impartire intreaga) **taie** ultimele cifre:

| Expresie | Ce obtinem | Exemplu (`x = 48257`) |
|----------|-----------|----------------------|
| `x / 10` | `x` fara ultima cifra | `48257 / 10 = 4825` |
| `x / 100` | `x` fara ultimele 2 cifre | `48257 / 100 = 482` |
| `x / 1000` | `x` fara ultimele 3 cifre | `48257 / 1000 = 48` |

> **Regula:** `x / 10^k` taie ultimele `k` cifre ale lui `x`.

---

## Extragerea cifrelor individuale

Putem combina `/` si `%` pentru a obtine orice cifra:

### Cifra unitatilor

Cifra unitatilor este **ultima** cifra:

```
x % 10
```

**Exemplu:** `48257 % 10 = 7`

### Cifra zecilor

Mai intai taiem ultima cifra cu `/ 10`, apoi luam ultima cifra din ce ramane:

```
x / 10 % 10
```

**Exemplu:** `48257 / 10 % 10 = 4825 % 10 = 5`

### Cifra sutelor

Taiem ultimele 2 cifre cu `/ 100`, apoi luam ultima cifra:

```
x / 100 % 10
```

**Exemplu:** `48257 / 100 % 10 = 482 % 10 = 2`

### Cifra miilor

Taiem ultimele 3 cifre cu `/ 1000`, apoi luam ultima cifra:

```
x / 1000 % 10
```

**Exemplu:** `48257 / 1000 % 10 = 48 % 10 = 8`

### Cifra zecilor de mii

```
x / 10000 % 10
```

**Exemplu:** `48257 / 10000 % 10 = 4 % 10 = 4`

> **Regula generala:** Pentru a obtine cifra de pe pozitia `k` (numarand de la 0, de la dreapta): `x / 10^k % 10`

---

## Cate cifre are un numar?

Presupunem ca `x` este un numar natural (`x >= 0`).

### Numere de o cifra

Un numar de o cifra este un numar de la `0` la `9`:

```
x <= 9
```

sau echivalent:

```
x < 10
```

**Exemplu:** `7` este de o cifra pentru ca `7 <= 9` ✓

### Numere de doua cifre

Un numar de doua cifre este un numar de la `10` la `99`:

```
x >= 10 && x <= 99
```

sau echivalent:

```
x >= 10 && x < 100
```

**Exemplu:** `42` este de doua cifre pentru ca `42 >= 10 && 42 <= 99` ✓

### Numere de trei cifre

Un numar de trei cifre este un numar de la `100` la `999`:

```
x >= 100 && x <= 999
```

sau echivalent:

```
x >= 100 && x < 1000
```

**Exemplu:** `305` este de trei cifre pentru ca `305 >= 100 && 305 <= 999` ✓

### Numere de exact `k` cifre

| Cifre | Interval | Expresie |
|-------|----------|----------|
| 1 | 0 – 9 | `x <= 9` |
| 2 | 10 – 99 | `x >= 10 && x <= 99` |
| 3 | 100 – 999 | `x >= 100 && x <= 999` |
| 4 | 1000 – 9999 | `x >= 1000 && x <= 9999` |

> **Regula:** Un numar are exact `k` cifre daca `x >= 10^(k-1)` si `x <= 10^k - 1`.

### Cel putin `k` cifre

Cateodata ne intereseaza daca un numar are **cel putin** un anumit numar de cifre:

| Conditie | Expresie |
|----------|----------|
| Cel putin 1 cifra | `x >= 0` (orice numar natural) |
| Cel putin 2 cifre | `x >= 10` |
| Cel putin 3 cifre | `x >= 100` |
| Cel putin 4 cifre | `x >= 1000` |

**Exemplu:** `305` are cel putin 2 cifre pentru ca `305 >= 10` ✓

### Cel mult `k` cifre

| Conditie | Expresie |
|----------|----------|
| Cel mult 1 cifra | `x <= 9` |
| Cel mult 2 cifre | `x <= 99` |
| Cel mult 3 cifre | `x <= 999` |
| Cel mult 4 cifre | `x <= 9999` |

**Exemplu:** `42` are cel mult 3 cifre pentru ca `42 <= 999` ✓

---
