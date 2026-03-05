# Conversia din `cat timp` în `repeta ... pana cand`

## De unde pornim?

Ambele instrucțiuni sunt structuri repetitive cu număr **necunoscut** de pași, deci nu mai avem de-a face cu inițializări sau incrementări manuale ca la `pentru`. Singurele lucruri care contează acum sunt **când se testează condiția** și **ce înseamnă ea**.

Diferențele dintre cele două:

| | `cat timp` | `repeta ... pana cand` |
|---|---|---|
| Testul are loc | **la început** | **la final** |
| Continuă când condiția e | **adevărată** | **falsă** |
| Corpul se execută minim | **0 ori** | **1 oară** |

---

Luăm ca punct de plecare:

```
┌ cat timp <conditie> executa
│    <instructiuni>
└■
```

---

## Pasul 1 — Sensul condiției (se inversează!)

`cat timp` continuă **cât timp** condiția e adevărată — se oprește când devine falsă.

`repeta ... pana cand` se oprește **când** condiția devine adevărată — continuă cât timp e falsă.

Cele două sunt exact opuse, deci trebuie să inversăm condiția:

```
cat timp <conditie>    →    pana cand NOT <conditie>
```

De exemplu:

```
cat timp n ≠ 0    →    pana cand n = 0
cat timp i ≤ n    →    pana cand i > n
cat timp x > 0    →    pana cand x ≤ 0
```

```
// cat timp:
┌ cat timp <conditie> executa
│    <instructiuni>
└■

// repeta cu conditia inversata:
┌ repeta
│    <instructiuni>
└ pana cand NOT <conditie>
```

---

## Pasul 2 — Testul la final (problema ascunsă!)

Aceasta este diferența structurală dintre cele două instrucțiuni. La `cat timp`, dacă condiția e falsă de la început, corpul **nu se execută deloc**. La `repeta`, corpul se execută **cel puțin o dată** înainte de primul test.

Deci dacă există situații în care condiția poate fi falsă de la început, cele două **nu sunt echivalente** fără o protecție suplimentară.

Soluția este să adăugăm un `daca` care să intre în `repeta` doar dacă condiția e de la început adevărată:

```
┌ daca <conditie> atunci
│ ┌ repeta
│ │    <instructiuni>
│ └ pana cand NOT <conditie>
└■
```

Astfel, dacă `<conditie>` e falsă de la început, blocul `repeta` este sărit complet — exact ca la `cat timp`.

---

## Rezultatul final

```
// cat timp:
┌ cat timp <conditie> executa
│    <instructiuni>
└■

// repeta echivalent:
┌ daca <conditie> atunci          ← Pasul 2: protectie pentru cazul in care conditia e falsa de la inceput
│ ┌ repeta
│ │    <instructiuni>
│ └ pana cand NOT <conditie>      ← Pasul 1: opusul conditiei de continuare
└■
```

---

## Când poți renunța la `daca`?

Dacă ești **sigur** că la momentul intrării în buclă condiția este întotdeauna adevărată, atunci `daca` nu mai este necesar și conversia se simplifică:

```
┌ repeta
│    <instructiuni>
└ pana cand NOT <conditie>
```

De exemplu, la citirea unui număr până când e valid, știm că utilizatorul va introduce cel puțin o valoare — deci bucla se va executa cu siguranță cel puțin o dată.

---

## Exemplu complet

**Problema:** Suma cifrelor unui număr natural.

```
// Cu cat timp:
citeste n
S ← 0
┌ cat timp n ≠ 0 executa
│    S ← S + n % 10
│    n ← [n/10]
└■
scrie S
```

Dacă `n = 0`, bucla nu se execută deloc și `S` rămâne `0` — corect.

```
// Cu repeta (echivalent complet):
citeste n
S ← 0
┌ daca n ≠ 0 atunci              ← protectie: daca n = 0, sarim bucla
│ ┌ repeta
│ │    S ← S + n % 10
│ │    n ← [n/10]
│ └ pana cand n = 0              ← opusul lui n ≠ 0
└■
scrie S
```

---

## Regula generală

1. **Inversează condiția** — `cat timp <conditie>` devine `pana cand NOT <conditie>`
2. **Adaugă un `daca`** de protecție care să înconjoare `repeta` — pentru a evita execuția corpului când condiția e falsă de la început
3. **Renunță la `daca`** doar dacă ești sigur că prima iterație va avea loc întotdeauna