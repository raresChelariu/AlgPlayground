# Expresii

O **expresie** este o combinatie de valori si operatori care produce un rezultat.

---

## Expresii aritmetice

Operatorii aritmetici sunt: `+`, `-`, `*`, `/`, `%`

| Operator | Semnificatie | Exemplu | Rezultat |
|----------|-------------|---------|----------|
| `+` | Adunare | `3 + 5` | `8` |
| `-` | Scadere | `10 - 4` | `6` |
| `*` | Inmultire | `3 * 7` | `21` |
| `/` | Catul impartirii | `7 / 2` | `3` |
| `%` | Restul impartirii | `7 % 2` | `1` |

> **Obs:** `-` poate fi si **semn** (minus), nu doar scadere. De exemplu, `-10` inseamna "minus 10" (numar negativ).

**Exemplu:** `-10 * 4`

```
-10 * 4 
= -40
```

### Evaluare pas cu pas

Inmultirea, impartirea si restul (`*`, `/`, `%`) se efectueaza **inaintea** adunarii si scaderii (`+`, `-`).

**Exemplu:** `2 + 3 * 4 - 1`

```
  2 + 3 * 4 - 1
= 2 + 12 - 1          (mai intai 3 * 4)
= 14 - 1
= 13
```

**Exemplu:** `10 - 8 / 2 + 3 % 2`

```
  10 - 8 / 2 + 3 % 2
= 10 - 4 + 1          (mai intai / si %)
= 6 + 1
= 7
```

**Exemplu cu paranteze:** `(2 + 3) * 4`

```
  (2 + 3) * 4
= 5 * 4                (parantezele se evalueaza primele)
= 20
```

---

## Expresii relationale

> Operatorii relationali **compara** doua valori. 
> Rezultatul este intotdeauna fie `1` (adevarat), fie `0` (fals).

| Operator | Semnificatie | Exemplu | Rezultat |
|----------|-------------|---------|----------|
| `<` | Mai mic | `3 < 5` | `1` |
| `<=` | Mai mic sau egal | `5 <= 5` | `1` |
| `>` | Mai mare | `3 > 5` | `0` |
| `>=` | Mai mare sau egal | `7 >= 2` | `1` |
| `==` | Egal cu | `4 == 4` | `1` |
| `!=` | Diferit de (nu e egal) | `4 != 4` | `0` |

> **Obs:** Pentru a testa daca doua numere sunt egale folosim `==` (`este egal cu`), si NU un singur egal `=` (spre deosebire de matematica).

### Exemple de evaluare

```
3 + 2 == 5       →  5 == 5  →  1 (adevarat)
10 / 3 > 3       →  3 > 3   →  0 (fals)
7 % 2 != 0       →  1 != 0  →  1 (adevarat)
```

> **Obs:** Mai intai se calculeaza **partea aritmetica**, apoi se face **comparatia**.

---

## Expresii logice

Operatorii logici combina mai multe conditii. Lucreaza cu valori de `0` (fals) si `1` (adevarat).

| Operator | Semnificatie  | Citire |
|----------|---------------|--------|
| `&&`     | SI (AND)      | "si"   |
| `\|\|`   | SAU (OR)      | "sau"  |
| `!`      | NOT (negatie) | "nu"   |

### Tabelele de adevar

**`!` (NOT)** — inverseaza valoarea:

| A | !A |
|---|----|
| 0 | 1  |
| 1 | 0  |


**`&&` (SI)** — rezultatul e `1` **doar** daca ambele parti sunt `1`:

| A | B | A && B | A \|\| B |
|---|---|--------|----------|
| 0 | 0 | 0      | 0        |
| 0 | 1 | 0      | **1**    |
| 1 | 0 | 0      | **1**    |
| 1 | 1 | **1**  | **1**    |



### Exemple de evaluare

**Exemplu 1:** `3 > 1 && 5 == 5`

```
  3 > 1 && 5 == 5
= 1 && 1               (ambele comparatii sunt adevarate)
= 1 (adevarat)
```

**Exemplu 2:** `4 < 2 || 7 != 3`

```
  4 < 2 || 7 != 3
= 0 || 1               (prima e falsa, a doua e adevarata)
= 1 (adevarat)
```

**Exemplu 3:** `!(3 == 3)`

```
  !(3 == 3)
= !(1)
= 0 (fals)
```

---

## Prioritatea operatorilor

Cand intr-o expresie avem mai multi operatori diferiti, ordinea de evaluare este:

| Grupa | Prioritate | Operatori |
|-------|-----------|-----------|
| Operatorii unari | 1 | ! |
| **Aritmetica** (se evalueaza prima) | 2 | `*`, `/`, `%` |
| | 3 | `+`, `-` |
| **Comparatii** | 4 | `<`, `<=`, `>`, `>=` |
| | 5 | `==`, `!=` |
| **Logica** (se evalueaza ultima) | 6 | `!` (negatie) |
| | 7 | `&&` (SI) |
| | 8 | `\|\|` (SAU) |

> **Obs:** Retine cele 3 grupe in ordine: **aritmetica** → **comparatii** → **logica**. In caz de dubiu, pune **paranteze**.

> **Obs:** In cadrul logicii: `!` se aplica primul, apoi `&&`, apoi `||`. Deci `a || b && c` se evalueaza ca `a || (b && c)`.

---


