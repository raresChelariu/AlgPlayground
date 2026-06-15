# Elemente de baza

Pseudocodul este un limbaj prin care descriem **pasii unui algoritm**, intr-o forma usor de citit
de catre om. Nu se compileaza si nu se ruleaza — rolul lui este sa exprime clar **ce** face algoritmul,
fara detaliile de sintaxa ale unui limbaj real. La BAC si la pbinfo, multe subiecte cer scrierea sau
intelegerea unui algoritm in pseudocod.

Aceasta lectie aduna **vocabularul de baza**: variabile, constante, atribuire, operatori si citire/scriere.

---

## Variabile si constante

In pseudocod **nu declaram** variabilele si nu le dam tip — le folosim direct. Numele unei variabile
respecta aceleasi reguli ca in C++: litere, cifre si `_`, fara cifra la inceput (`n`, `suma`, `nrCifre`).

**Constantele** pot fi:

- numere intregi sau reale: `7`, `-3`, `2.5`
- caractere, scrise intre apostrofuri: `'A'`, `'5'`, `' '`
- siruri de caractere: `'Ion'`
- constante matematice: `π`

---

## Atribuirea `←`

Atribuirea da unei variabile valoarea unei expresii. Sageata `←` arata mereu dinspre valoare spre variabila:

```
<variabila> ← <expresie>
```

```
S ← 0
S ← S + 10
n ← [n/10]
```

> [!WARNING] Nu confunda `←` cu `=`
> In pseudocod, **atribuirea** este `←` (echivalentul lui `=` din C++).
> Semnul `=` din pseudocod inseamna **egalitate** (echivalentul lui `==` din C++), si apare doar in conditii.

| Pseudocod | C/C++ |
|---|---|
| `x ← 5` (atribuire) | `x = 5;` |
| `x = 5` (egalitate, in conditie) | `x == 5` |

---

## Operatori

### Operatori aritmetici

| Pseudocod | Sens | C/C++ |
|---|---|---|
| `a + b` | adunare | `a + b` |
| `a - b` | scadere | `a - b` |
| `a * b` | inmultire | `a * b` |
| `a / b` | impartire cu rezultat **real** | `a / b` (pe numere reale) |
| `[a/b]` | impartire **intreaga** (catul) | `a / b` (pe numere intregi) |
| `a % b` | restul impartirii | `a % b` |
| `a ^ n` | ridicare la putere | `pow(a, n)` |
| `√x` | radical | `sqrt(x)` |

> [!WARNING] `a/b` vs `[a/b]`
> `a / b` da rezultatul **real** (`7 / 2` este `3.5`). Pentru **catul** impartirii intregi folosim
> parantezele patrate: `[7/2]` este `3`. Parantezele patrate inseamna "partea intreaga".

### Operatori relationali

| Pseudocod | Sens | C/C++ |
|---|---|---|
| `a = b` | egal | `a == b` |
| `a ≠ b` | diferit | `a != b` |
| `a < b` | mai mic | `a < b` |
| `a ≤ b` | mai mic sau egal | `a <= b` |
| `a > b` | mai mare | `a > b` |
| `a ≥ b` | mai mare sau egal | `a >= b` |

### Operatori logici

| Pseudocod | Sens | C/C++ |
|---|---|---|
| `NOT c` | negatie | `!c` |
| `c1 SI c2` | si (ambele) | `c1 && c2` |
| `c1 SAU c2` | sau (macar una) | `c1 \|\| c2` |

---

## Citire si scriere

Pentru a citi date de la intrare folosim `citeste`, iar pentru a afisa rezultate folosim `scrie`:

```
citeste n
citeste a, b
scrie S
scrie 'Rezultatul este ', S
```

| Pseudocod | C/C++ |
|---|---|
| `citeste a, b` | `cin >> a >> b;` |
| `scrie S` | `cout << S;` |

---

## Exemplu complet

**Problema:** Se citesc doua numere naturale `a` si `b`. Sa se afiseze catul si restul impartirii lui `a` la `b`.

```
citeste a, b
c ← [a/b]
r ← a % b
scrie 'Cat ', c, ' rest ', r
```

```cpp
// C/C++ echivalent
int a, b, c, r;
cin >> a >> b;
c = a / b;
r = a % b;
cout << "Cat " << c << " rest " << r;
```

**Intrare:**

```
17 5
```

**Afisare:**

```
Cat 3 rest 2
```
