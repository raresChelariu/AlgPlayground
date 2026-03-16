# Conversia din `pentru` în `cat timp`

## De unde pornim?

Instrucțiunea `pentru` face automat **3 lucruri** în spatele scenei, pe care `cat timp` nu le face. Ca să obținem un comportament identic, trebuie să le facem **noi manual**. Să le identificăm pe rând.

---

Luăm ca punct de plecare această instrucțiune `pentru`:

```
┌ pentru i ← 1, n executa
│    <instructiuni>
└■
```

Și urmărim exact ce se întâmplă la fiecare pas al execuției ei:

```
i ← 1                  → înainte de orice, variabila primește valoarea initiala
cat timp i ≤ n         → se verifica daca mai putem executa instructiunile
    <instructiuni>     → se executa corpul buclei
    i ← i + 1          → la final, variabila este incrementata automat
```

Aceștia sunt cei **3 pași ascunși** ai instrucțiunii `pentru`. Acum îi facem expliciți.

---

## Pasul 1 — Inițializarea

`pentru` inițializează singur variabila (`i ← 1`) ca parte din sintaxa sa. `cat timp` nu știe nimic despre nicio variabilă, deci trebuie s-o inițializăm **noi, înainte** de buclă.

```
// pentru face asta automat:
┌ pentru i ← 1, n executa
│    ...
└■

// cat timp nu stie de unde sa inceapa, ii spunem noi:
i ← 1
┌ cat timp ... executa
│    ...
└■
```

---

## Pasul 2 — Condiția de continuare

`pentru i ← 1, n` înseamnă: *„repetă atâta timp cât `i` nu a depășit `n`"*, adică `i ≤ n`. Această condiție există implicit în `pentru`, dar `cat timp` are nevoie de ea **explicit**.

```
// pentru verifica implicit i ≤ n la fiecare pas:
┌ pentru i ← 1, n executa
│    ...
└■

// la cat timp o scriem noi explicit:
i ← 1
┌ cat timp i ≤ n executa
│    ...
└■
```

---

## Pasul 3 — Incrementarea

După fiecare execuție a corpului, `pentru` incrementează automat variabila cu pasul (`i ← i + 1`). `cat timp` nu face nimic cu variabila, deci trebuie s-o incrementăm **noi, la sfârșitul corpului** buclei.

De ce la **sfârșit**? Pentru că `pentru` execută întâi instrucțiunile și abia **după** incrementează — trebuie să păstrăm această ordine.

```
// pentru incrementeaza automat dupa fiecare iteratie:
┌ pentru i ← 1, n executa
│    <instructiuni>
└■                        ← aici i creste singur

// la cat timp o facem noi, la finalul corpului:
i ← 1
┌ cat timp i ≤ n executa
│    <instructiuni>
│    i ← i + 1            ← trebuie sa fie ultimul lucru din corp
└■
```

---

## Rezultatul final

Punând cei 3 pași împreună:

```
// pentru:
┌ pentru i ← 1, n executa
│    <instructiuni>
└■

// cat timp echivalent:
i ← 1                      ← Pasul 1: initializam noi
┌ cat timp i ≤ n executa   ← Pasul 2: conditia scrisa explicit
│    <instructiuni>
│    i ← i + 1             ← Pasul 3: incrementam noi, la final
└■
```

---

## Ce se schimbă când pasul este negativ?

Dacă pasul este `-1`, aceeași logică se aplică, dar în sens invers. Să urmărim ce face `pentru` în acest caz:

```
┌ pentru i ← n, 1, -1 executa
│    <instructiuni>
└■
```

`i` pornește de la `n` și **scade** la fiecare pas. Bucla continuă cât timp `i` nu a coborât **sub** `1`, adică cât timp `i ≥ 1`. Aplicând aceeași regulă în 3 pași:

- **Pasul 1** — inițializăm: `i ← n`
- **Pasul 2** — condiția se inversează: `i ≥ 1` (nu mai e `≤`, ci `≥` — pentru că mergem în jos)
- **Pasul 3** — decrementăm: `i ← i - 1` (nu mai e `+ 1`, ci `- 1`)

```
i ← n
┌ cat timp i ≥ 1 executa
│    <instructiuni>
│    i ← i - 1
└■
```

---

## Regula generală

Acum că știm de ce, regula devine ușor de reținut:

1. **Inițializează** variabila înainte de buclă — `pentru` o făcea automat
2. **Scrie condiția explicit** în `cat timp` — `pentru` o avea implicită
3. **Incrementează / decrementează manual** la sfârșitul corpului — `pentru` o făcea automat

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

// Cu cat timp (aplicand cei 3 pasi):
citeste n
S ← 0
i ← 1                      ← Pasul 1
┌ cat timp i ≤ n executa   ← Pasul 2
│    S ← S + i
│    i ← i + 1             ← Pasul 3
└■
scrie S
```