# Conversia din `repeta ... pana cand` in `executa ... cat timp`

## Regula

O singura schimbare: **inversezi conditia**. Corpul ramane exact la fel, in aceeasi ordine, si nu apare
niciun `daca` de protectie si nicio copie in fata buclei. Motivul: ambele instructiuni testeaza conditia
**la final**, deci amandoua executa corpul **cel putin o data**. Difera doar sensul conditiei: `repeta` se
opreste **cand** conditia devine adevarata, `executa` continua **cat timp** conditia e adevarata.

```
// repeta pana cand:             // executa cat timp echivalent:
┌ repeta                         ┌ executa
│    <instructiuni>              │    <instructiuni>          ← corpul ramane identic
└ pana cand C                    └ cat timp NOT C             ← opusul conditiei de oprire
```

---

## Exemplu

**Problema:** Suma cifrelor unui numar natural.

```
// Cu repeta pana cand:          // Cu executa cat timp:
citeste n                        citeste n
S ← 0                            S ← 0
┌ repeta                         ┌ executa
│    S ← S + n % 10              │    S ← S + n % 10
│    n ← [n/10]                  │    n ← [n/10]
└ pana cand n = 0                └ cat timp n ≠ 0
scrie S                          scrie S
```

Corpul e copiat litera cu litera; s-a schimbat doar ultima linie, `pana cand n = 0` in `cat timp n ≠ 0`.

---

## Conversia inversa: din `executa ... cat timp` in `repeta ... pana cand`

Regula e aceeasi, citita invers: pastrezi corpul si inversezi conditia.

```
// executa cat timp:             // repeta pana cand echivalent:
┌ executa                        ┌ repeta
│    <instructiuni>              │    <instructiuni>          ← corpul ramane identic
└ cat timp C                     └ pana cand NOT C            ← opusul conditiei de continuare
```

**Problema:** Se citeste un numar pana cand valoarea introdusa este strict pozitiva.

```
// Cu executa cat timp:          // Cu repeta pana cand:
┌ executa                        ┌ repeta
│    citeste x                   │    citeste x
└ cat timp x ≤ 0                 └ pana cand x > 0
scrie x                          scrie x
```

`executa` repeta citirea **cat timp** numarul e gresit (`x ≤ 0`), iar `repeta` opreste citirea **cand**
numarul e bun (`x > 0`). Aceeasi executie, doua formulari opuse.

---

## De ce functioneaza

| | `repeta ... pana cand C` | `executa ... cat timp C` |
|---|---|---|
| Unde se testeaza conditia | la final | la final |
| De cate ori se executa corpul minim | o data | o data |
| Ce inseamna conditia | **opreste** bucla cand e adevarata | **continua** bucla cat e adevarata |

Primele doua linii sunt identice — de aceea nu avem nevoie nici de `daca` de protectie (ca la conversiile
pornite din [`cat timp`](/cpp/pseudocod/conversii/cat-timp-in-executa-cat-timp)), nici de o copie a corpului
inainte de bucla (ca la conversiile *catre* [`cat timp`](/cpp/pseudocod/conversii/repeta-in-cat-timp)).
Singura diferenta reala este linia a treia, adica sensul conditiei.

---

## Cum inversezi conditia

Inlocuiesti fiecare operator de comparatie cu opusul lui:

```
pana cand n = 0        →    cat timp n ≠ 0
pana cand i > n        →    cat timp i ≤ n
pana cand x ≤ 0        →    cat timp x > 0
pana cand gasit = 1    →    cat timp gasit ≠ 1
```

> [!WARNING] Atentie la conditiile compuse
> Cand conditia are `si` / `sau`, negarea schimba **si** operatorul logic, nu doar comparatiile:
> ```
> pana cand a = 0 sau b = 0    →    cat timp a ≠ 0 si b ≠ 0
> pana cand i > n si gasit = 1 →    cat timp i ≤ n sau gasit ≠ 1
> ```
> `NOT (A sau B)` devine `NOT A si NOT B`, iar `NOT (A si B)` devine `NOT A sau NOT B`.

> [!TIP] Cea mai simpla dintre conversii
> Este singura conversie intre doua instructiuni repetitive care nu adauga nimic in program: nu dubleaza
> corpul si nu il inveleste in `daca`. Daca la o problema ti se cere sa treci de la `repeta` la
> `executa cat timp` (sau invers) si ai scris mai mult de o modificare, cel mai probabil ai gresit.

> [!IMPORTANT] Legatura cu C/C++
> `executa ... cat timp` este exact `do...while` din C/C++, cu acelasi sens al conditiei. Deci un
> `repeta ... pana cand C` din pseudocod se scrie in C++ ca `do { ... } while (!C);` — cu conditia negata.
> ```cpp
> // repeta ... pana cand n = 0
> do {
>     S = S + n % 10;
>     n = n / 10;
> } while (n != 0);
> ```
