# Conversia din `pentru` în `repeta ... pana cand`

## De unde pornim?

Știm deja că `pentru` face automat **3 lucruri** în spate. La conversia în `cat timp` le-am făcut pe toate 3 manual. `repeta ... pana cand` funcționează similar, dar cu **două diferențe importante** față de `cat timp`:

1. Testul are loc **la final**, nu la început
2. Bucla continuă cât timp condiția e **falsă** — se oprește când devine **adevărată**

Aceste două diferențe ne obligă să ajustăm conversia.

---

Luăm același punct de plecare:

```
┌ pentru i ← 1, n executa
│    <instructiuni>
└■
```

Și reamintim cum arăta desfăcut:

```
i ← 1                  → initializare
cat timp i ≤ n         → test la INCEPUT, continua cat timp e ADEVARAT
    <instructiuni>
    i ← i + 1          → incrementare
```

---

## Pasul 1 — Inițializarea (identic cu `cat timp`)

Același raționament: `repeta` nu știe nimic despre variabilă, deci o inițializăm **noi, înainte** de buclă.

```
i ← 1
┌ repeta
│    ...
└ pana cand ...
```

---

## Pasul 2 — Condiția (atenție: se inversează!)

Aceasta este diferența cheie față de conversia în `cat timp`.

La `cat timp` am scris condiția **direct**: *„continuă cât timp `i ≤ n`"*.

La `repeta ... pana cand` sensul este invers: *„oprește-te când condiția devine adevărată"*. Deci trebuie să scriem **opusul** condiției de continuare:

```
cat timp i ≤ n    →    pana cand i > n
```

Cu alte cuvinte: bucla se repeta până când `i` a depășit `n`.

```
i ← 1
┌ repeta
│    ...
└ pana cand i > n
```

---

## Pasul 3 — Incrementarea (identic cu `cat timp`)

La fel ca înainte, incrementăm manual la **sfârșitul** corpului, pentru a păstra ordinea: mai întâi instrucțiunile, abia după incrementare.

```
i ← 1
┌ repeta
│    <instructiuni>
│    i ← i + 1
└ pana cand i > n
```

---

## Rezultatul final

```
// pentru:
┌ pentru i ← 1, n executa
│    <instructiuni>
└■

// repeta echivalent:
i ← 1                      ← Pasul 1: initializam noi
┌ repeta
│    <instructiuni>
│    i ← i + 1             ← Pasul 3: incrementam noi, la final
└ pana cand i > n          ← Pasul 2: opusul conditiei de continuare
```

---

## Atenție: o problemă ascunsă!

Spre deosebire de `cat timp`, instrucțiunea `repeta` execută corpul **cel puțin o dată**, indiferent de condiție. Aceasta înseamnă că cele două variante **nu sunt întotdeauna echivalente**.

Pentru a fi complet echivalente, conversia corectă este:

```
i ← 1
┌ daca i ≤ n atunci
│ ┌ repeta
│ │    <instructiuni>
│ │    i ← i + 1
│ └ pana cand i > n
└■
```

Instrucțiunea `daca` ne asigura ca testam inainte sa executam bucla (la fel ca la `cat timp`) — dacă de la început n este 0 atunci `i > n` si corpul nu se execută deloc, exact ca la `pentru`.

---

## Ce se schimbă când pasul este negativ?

Același raționament, în sens invers. Condiția de continuare a `pentru` cu pas `-1` este `i ≥ expresie_finala`, deci opusul ei (pentru `pana cand`) este `i < expresie_finala`:

```
// pentru:
┌ pentru i ← n, 1, -1 executa
│    <instructiuni>
└■

// repeta echivalent (cu protectie):
i ← n
┌ daca i ≥ 1 atunci
│ ┌ repeta
│ │    <instructiuni>
│ │    i ← i - 1
│ └ pana cand i < 1
└■
```

---

## Regula generală

1. **Inițializează** variabila înainte de buclă — la fel ca la `cat timp`
2. **Inversează condiția** de continuare și pune-o în `pana cand` — spre deosebire de `cat timp`, unde o copiai direct
3. **Incrementează / decrementează manual** la sfârșitul corpului — la fel ca la `cat timp`
4. **Adaugă un `daca`** care să protejeze bucla pentru cazul în care intervalul e gol

---

## Exemplu complet

**Problema:** Suma primelor `n` numere naturale.

```
// Cu pentru:
citeste n
S ← 0
┌ pentru i ← 1, n executa
│    S ← S + i
└■
scrie S

// Cu repeta (aplicand cei 3 pasi + protectie):
citeste n
S ← 0
i ← 1                           ← Pasul 1
┌ daca i ≤ n atunci
│ ┌ repeta
│ │    S ← S + i
│ │    i ← i + 1                ← Pasul 3
│ └ pana cand i > n             ← Pasul 2: opusul lui i ≤ n
└■
scrie S
```