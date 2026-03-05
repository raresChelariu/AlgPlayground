# Conversia din `repeta ... pana cand` în `cat timp`

## De unde pornim?

Ca și la conversia inversă, nu avem inițializări sau incrementări de gestionat. Cele două diferențe rămân aceleași:

| | `repeta ... pana cand` | `cat timp` |
|---|---|---|
| Testul are loc | **la final** | **la început** |
| Continuă când condiția e | **falsă** | **adevărată** |
| Corpul se execută minim | **1 oară** | **0 ori** |

---

Luăm ca punct de plecare:

```
┌ repeta
│    <instructiuni>
└ pana cand <conditie>
```

---

## Pasul 1 — Sensul condiției (se inversează!)

Același raționament ca la conversia `cat timp → repeta`, dar în direcție inversă.

`repeta` se oprește când condiția devine **adevărată** — `cat timp` se oprește când devine **falsă**. Deci inversăm:

```
pana cand <conditie>    →    cat timp NOT <conditie>
```

De exemplu:

```
pana cand n = 0      →    cat timp n ≠ 0
pana cand i > n      →    cat timp i ≤ n
pana cand x ≤ 0      →    cat timp x > 0
```

```
// repeta:
┌ repeta
│    <instructiuni>
└ pana cand <conditie>

// cat timp cu conditia inversata:
┌ cat timp NOT <conditie> executa
│    <instructiuni>
└■
```

---

## Pasul 2 — Prima iterație (obligatorie la `repeta`)

La `repeta`, corpul se execută **cel puțin o dată** înainte de primul test. La `cat timp`, dacă condiția e falsă de la început, corpul nu se execută deloc.

Deci pentru a păstra comportamentul original, trebuie să **executăm instrucțiunile o dată înainte** de a intra în `cat timp`:

```
<instructiuni>                        ← prima executie, inainte de test
┌ cat timp NOT <conditie> executa
│    <instructiuni>                   ← executiile urmatoare
└■
```

---

## Rezultatul final

```
// repeta:
┌ repeta
│    <instructiuni>
└ pana cand <conditie>

// cat timp echivalent:
<instructiuni>                         ← Pasul 2: prima iteratie garantata
┌ cat timp NOT <conditie> executa      ← Pasul 1: opusul conditiei de oprire
│    <instructiuni>
└■
```

---

## Observație importantă: instrucțiunile se dublează

Spre deosebire de toate conversiile anterioare, aici **instrucțiunile apar de două ori** — o dată înainte de buclă și o dată în interiorul ei. Aceasta este o consecință directă a faptului că `repeta` garantează o primă execuție, iar `cat timp` nu.

Dacă corpul buclei e complex, această dublare face codul mai greu de întreținut — un motiv real pentru care `do...while` (și `repeta`) există ca instrucțiune separată.

---

## Când poți simplifica?

Dacă ești **sigur** că la momentul intrării în buclă condiția `pana cand` este întotdeauna falsă (adică bucla s-ar executa oricum cel puțin o dată chiar și cu `cat timp`), atunci prima execuție din afara buclei este redundantă și poți scrie direct:

```
┌ cat timp NOT <conditie> executa
│    <instructiuni>
└■
```

Dar aceasta nu mai este o echivalență generală — funcționează doar în acel context specific.

---

## Exemplu complet

**Problema:** Numărul cifrelor unui număr natural.

```
// Cu repeta:
citeste n
cnt ← 0
┌ repeta
│    cnt ← cnt + 1
│    n ← [n/10]
└ pana cand n = 0
scrie cnt
```

Știm că orice număr natural are cel puțin o cifră, deci corpul se va executa mereu cel puțin o dată. Dar pentru o echivalență completă:

```
// Cu cat timp (echivalent complet):
citeste n
cnt ← 0
cnt ← cnt + 1                    ← Pasul 2: prima iteratie garantata
n ← [n/10]
┌ cat timp n ≠ 0 executa         ← Pasul 1: opusul lui n = 0
│    cnt ← cnt + 1
│    n ← [n/10]
└■
scrie cnt
```

---

## Regula generală

1. **Inversează condiția** — `pana cand <conditie>` devine `cat timp NOT <conditie>`
2. **Copiază instrucțiunile o dată înainte** de buclă — pentru a garanta prima execuție
3. **Renunță la dublare** doar dacă ești sigur că prima iterație ar fi oricum garantată