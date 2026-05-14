# Expresii pentru intervale

In matematica, intervalele descriu multimi de numere. In C++, putem scrie aceste intervale ca **expresii logice**.

---

## Intervale simple

| Interval | Expresie C++ |
|----------|-------------|
| x ∈ (-∞, 5) | `x < 5` |
| x ∈ (-∞, 7] | `x <= 7` |
| x ∈ (3, +∞) | `x > 3` |
| x ∈ [3, +∞) | `x >= 3` |

> **Obs:** Paranteza rotunda `(` inseamna **fara** capatul respectiv (strict), iar paranteza patrata `[` inseamna **cu** capatul respectiv (inclusiv).

---

## Interval marginit

Un interval marginit are **doua** capete, deci avem nevoie de **doua** conditii legate prin `&&`:

| Interval | Expresie C++ |
|----------|-------------|
| x ∈ (2, 7) | `x > 2 && x < 7` |
| x ∈ [2, 7] | `x >= 2 && x <= 7` |
| x ∈ (2, 7] | `x > 2 && x <= 7` |
| x ∈ [2, 7) | `x >= 2 && x < 7` |

---

## Reuniune de intervale

**Problema:** x ∈ (2, 5] ∪ [7, 13)

Scriem expresia pentru fiecare interval in parte:

```
Intervalul stang:   x ∈ (2, 5]   ⇔  x > 2 && x <= 5
Intervalul drept:   x ∈ [7, 13)  ⇔  x >= 7 && x < 13
```

Cum le combinam? Sa ne uitam pe axa numerelor:

```mermaid
---
config:
    theme: base
    themeVariables:
        lineColor: "#333333"
---
block-beta
    columns 13
    space:1 b1["· · ·"]:1 b2["2"]:1 b3["3"]:1 b4["4"]:1 b5["5"]:1 b6["6"]:1 b7["7"]:1 b8["8"]:1 b9["..."]:1 b10["12"]:1 b11["13"]:1 space:1

    style b3 fill:#4CAF50,color:#fff
    style b4 fill:#4CAF50,color:#fff
    style b5 fill:#4CAF50,color:#fff
    style b7 fill:#F44336,color:#fff
    style b8 fill:#F44336,color:#fff
    style b9 fill:#F44336,color:#fff
    style b10 fill:#F44336,color:#fff
```

> 🟩 verde = intervalul (2, 5] &nbsp;&nbsp;&nbsp; 🟥 rosu = intervalul [7, 13)

Zonele **nu se suprapun** — `x` poate fi pe verde **SAU** pe rosu.

**Concluzie:** reuniunea foloseste `||`

```
x ∈ (2, 5] ∪ [7, 13)  ⇔  x > 2 && x <= 5 || x >= 7 && x < 13
```

> **Obs:** Datorita prioritatii operatorilor, `&&` se evalueaza inaintea `||`, deci parantezele sunt **optionale**. Expresia de mai sus se evalueaza ca `(x > 2 && x <= 5) || (x >= 7 && x < 13)`.

---

## Intersectie de intervale

**Problema:** x ∈ (2, 9] ∩ [5, 11)

Scriem expresia pentru fiecare interval in parte:

```
Intervalul stang:   x ∈ (2, 9]   ⇔  x > 2 && x <= 9
Intervalul drept:   x ∈ [5, 11)  ⇔  x >= 5 && x < 11
```

Cum le combinam? Sa ne uitam pe axa numerelor:

```mermaid
---
config:
    theme: base
    themeVariables:
        lineColor: "#333333"
---
block-beta
    columns 13
    space:1 b1["· · ·"]:1 b2["2"]:1 b3["3"]:1 b4["4"]:1 b5["5"]:1 b6["6"]:1 b7["7"]:1 b8["8"]:1 b9["9"]:1 b10["10"]:1 b11["11"]:1 space:1

    style b3 fill:#4CAF50,color:#fff
    style b4 fill:#4CAF50,color:#fff
    style b5 fill:#FFD600,color:#000
    style b6 fill:#FFD600,color:#000
    style b7 fill:#FFD600,color:#000
    style b8 fill:#FFD600,color:#000
    style b9 fill:#FFD600,color:#000
    style b10 fill:#F44336,color:#fff
    style b11 fill:#F44336,color:#fff
```

> 🟩 verde = doar in (2, 9] &nbsp;&nbsp;&nbsp; 🟨 galben = zona comuna &nbsp;&nbsp;&nbsp; 🟥 rosu = doar in [5, 11)

`x` trebuie sa fie **SI** pe verde/galben **SI** pe rosu/galben — adica in **ambele** intervale in acelasi timp.

**Concluzie:** intersectia foloseste `&&`

```
x ∈ (2, 9] ∩ [5, 11)  ⇔  x > 2 && x <= 9 && x >= 5 && x < 11
```

---

## Negatia unui interval (cu DeMorgan)

**Problema:** x ∉ (2, 9] ∩ [5, 11)

Stim deja ca:

```
x ∈ (2, 9] ∩ [5, 11)  ⇔  x > 2 && x <= 9 && x >= 5 && x < 11
```

Sa ne uitam pe axa numerelor — zona in care `x` **apartine** intersectiei este marcata cu galben:

```mermaid
---
config:
    theme: base
    themeVariables:
        lineColor: "#333333"
---
block-beta
    columns 15
    space:1 b0["· · ·"]:1 b1["1"]:1 b2["2"]:1 b3["3"]:1 b4["4"]:1 b5["5"]:1 b6["6"]:1 b7["7"]:1 b8["8"]:1 b9["9"]:1 b10["10"]:1 b11["11"]:1 b12["· · ·"]:1 space:1

    style b1 fill:#F44336,color:#fff
    style b2 fill:#F44336,color:#fff
    style b3 fill:#F44336,color:#fff
    style b4 fill:#F44336,color:#fff
    style b5 fill:#FFD600,color:#000
    style b6 fill:#FFD600,color:#000
    style b7 fill:#FFD600,color:#000
    style b8 fill:#FFD600,color:#000
    style b9 fill:#FFD600,color:#000
    style b10 fill:#F44336,color:#fff
    style b11 fill:#F44336,color:#fff
    style b12 fill:#F44336,color:#fff
```

> 🟨 galben = x ∈ (2, 9] ∩ [5, 11) — zona in care x **apartine** &nbsp;&nbsp;&nbsp; 🟥 rosu = zona in care x **NU** apartine

Aplicam negatia pas cu pas:

```
  !(x > 2 && x <= 9 && x >= 5 && x < 11)

⇔ !(x > 2 && x <= 9) || !(x >= 5 && x < 11)

⇔ ( !(x > 2) || !(x <= 9) ) || ( !(x >= 5) || !(x < 11) )

⇔ (x <= 2 || x > 9) || (x < 5 || x >= 11)
```

---

## Negatia unei reuniuni (cu DeMorgan)

**Problema:** x ∉ (2, 5] ∪ [7, 13)

Stim deja ca:

```
x ∈ (2, 5] ∪ [7, 13)  ⇔  x > 2 && x <= 5 || x >= 7 && x < 13
```

Sa ne uitam pe axa numerelor — zonele in care `x` **apartine** reuniunii sunt marcate cu galben:

```mermaid
---
config:
    theme: base
    themeVariables:
        lineColor: "#333333"
---
block-beta
    columns 16
    space:1 b0["· · ·"]:1 b1["1"]:1 b2["2"]:1 b3["3"]:1 b4["4"]:1 b5["5"]:1 b6["6"]:1 b7["7"]:1 b8["8"]:1 b9["..."]:1 b10["12"]:1 b11["13"]:1 b12["14"]:1 b13["· · ·"]:1 space:1

    style b1 fill:#F44336,color:#fff
    style b2 fill:#F44336,color:#fff
    style b3 fill:#FFD600,color:#000
    style b4 fill:#FFD600,color:#000
    style b5 fill:#FFD600,color:#000
    style b6 fill:#F44336,color:#fff
    style b7 fill:#FFD600,color:#000
    style b8 fill:#FFD600,color:#000
    style b9 fill:#FFD600,color:#000
    style b10 fill:#FFD600,color:#000
    style b11 fill:#F44336,color:#fff
    style b12 fill:#F44336,color:#fff
    style b13 fill:#F44336,color:#fff
```

> 🟨 galben = x ∈ (2, 5] ∪ [7, 13) — zona in care x **apartine** &nbsp;&nbsp;&nbsp; 🟥 rosu = zona in care x **NU** apartine

Aplicam negatia pas cu pas:

```
  !(x > 2 && x <= 5 || x >= 7 && x < 13)

⇔ !( (x > 2 && x <= 5) || (x >= 7 && x < 13) )

⇔ !(x > 2 && x <= 5) && !(x >= 7 && x < 13)

⇔ ( !(x > 2) || !(x <= 5) ) && ( !(x >= 7) || !(x < 13) )

⇔ (x <= 2 || x > 5) && (x < 7 || x >= 13)
```

---
