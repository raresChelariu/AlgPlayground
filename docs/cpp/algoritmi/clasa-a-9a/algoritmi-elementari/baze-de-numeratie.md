# Baze de numeratie

## Definitie

O **baza de numeratie** `b` este un mod de a scrie numerele folosind exact `b` simboluri diferite. Prin conventie, simbolurile sunt `0, 1, ..., b-1`.

In viata de zi cu zi folosim **baza 10** — avem 10 simboluri (cifrele de la 0 la 9).

> [!NOTE] Observatie
> Baza minima este 2 (cu simbolurile `0` si `1`). Nu exista baza cu mai putin de 2 simboluri.

> **Ex:** Baza 8 foloseste simbolurile 0, 1, 2, ..., 7.

> [!NOTE] Observatie
> Pentru `b > 10`, pentru cifrele de la 10 in sus se folosesc litere: `A = 10, B = 11, C = 12, ...`. De exemplu, in baza 16 simbolurile sunt `0, 1, ..., 9, A, B, C, D, E, F`. In aceasta lectie ne limitam la `b <= 10` ca sa lucram doar cu cifre.

> [!NOTE] Observatie
> O cifra "mai din stanga" are semnificatie mai mare. In `3489`, cifra miilor (3) conteaza mai mult decat cifra unitatilor (9).

---

## Notatie pozitionala

Un numar scris in baza `b` este de fapt o **suma** in care fiecare cifra este inmultita cu o putere a lui `b`. Puterea depinde de pozitia cifrei, numarand de la dreapta, incepand de la 0.

### Exemplu in baza 10

`3489` in baza 10 inseamna:

| cifra | pozitie (de la dreapta) | 10^pozitie | contributie     |
|-------|-------------------------|------------|-----------------|
| 9     | 0                       | 1          | 9 · 1 = 9       |
| 8     | 1                       | 10         | 8 · 10 = 80     |
| 4     | 2                       | 100        | 4 · 100 = 400   |
| 3     | 3                       | 1000       | 3 · 1000 = 3000 |

Suma: `9 + 80 + 400 + 3000 = 3489`. Nimic surprinzator — asa interpretam numere zi de zi.

### Exemplu in baza 2

`1101` in baza 2 inseamna:

| cifra | pozitie | 2^pozitie | contributie |
|-------|---------|-----------|-------------|
| 1     | 0       | 1         | 1 · 1 = 1   |
| 0     | 1       | 2         | 0 · 2 = 0   |
| 1     | 2       | 4         | 1 · 4 = 4   |
| 1     | 3       | 8         | 1 · 8 = 8   |

Suma: `1 + 0 + 4 + 8 = 13`. Deci `1101` in baza 2 reprezinta numarul `13` din baza 10.

> [!NOTE] Observatie
> Notatia `1101(2)` se citeste "1101 in baza 2". `13(10)` inseamna "13 in baza 10".

---

## Conversie din baza b in baza 10

**Ideea:** parcurgem cifrele lui `x` de la dreapta la stanga (cu `% 10` si `/ 10`, ca in lectia despre cifre), si pentru fiecare cifra adunam `cifra · b^pozitie` la rezultat. Pastram `b^pozitie` intr-o variabila `putereB` pe care o inmultim cu `b` la fiecare iteratie.

### Trasare manuala

- Convertim `x = 1101` din baza 2 in baza 10. 
- La fiecare pas extragem ultima cifra si o "valorificam" cu puterea corespunzatoare a lui 2.

| pas | x ramas | ultima cifra (x % 10) | putereB | rez (acumulat) |
|-----|---------|-----------------------|---------|----------------|
| 0   | 1101    | 1                     | 1       | 0 + 1·1 = 1    |
| 1   | 110     | 0                     | 2       | 1 + 0·2 = 1    |
| 2   | 11      | 1                     | 4       | 1 + 1·4 = 5    |
| 3   | 1       | 1                     | 8       | 5 + 1·8 = 13   |
| —   | 0 (stop)|                       |         |                |

Rezultat: **13**.

### Programul

```cpp
#include <iostream>
using namespace std;

int x, b, rez, putereB, uc;

int main()
{
    cin >> x >> b;
    rez = 0;
    putereB = 1;
    while (x != 0)
    {
        uc = x % 10;
        rez += uc * putereB;
        putereB *= b;
        x /= 10;
    }
    cout << rez;
    return 0;
}
```

**Intrare:**
```
1101 2
```

**Afisare:**
```
13
```

### Trasare cod

Valorile variabilelor dupa fiecare iteratie a buclei, pentru `x = 1101, b = 2`:

| iteratie | uc | rez | putereB | x    |
|----------|----|-----|---------|------|
| start    | -  | 0   | 1       | 1101 |
| 1        | 1  | 1   | 2       | 110  |
| 2        | 0  | 1   | 4       | 11   |
| 3        | 1  | 5   | 8       | 1    |
| 4        | 1  | 13  | 16      | 0    |

Cand `x` ajunge la `0`, bucla se opreste si afisam `rez = 13`.

> [!IMPORTANT] Important
> Algoritmul presupune ca toate cifrele lui `x` (cum a fost citit ca numar zecimal) sunt cifre valide in baza `b`. Asta functioneaza pentru `b <= 10`.

---

## Conversie din baza 10 in baza b — Metoda 1

### Ideea — analogie cu cifrele unui numar

Din [lectia despre cifre](../notiuni-de-baza/expresii-cu-cifre.md) stim deja:
- `x % 10` ne da **ultima cifra** in baza 10
- `x / 10` **taie ultima cifra** si ne lasa restul numarului

Aceleasi doua operatii functioneaza pentru **orice** baza — doar inlocuim `10` cu `b`:

| Ce vrem                              | In baza 10 | In baza `b` |
|--------------------------------------|------------|-------------|
| Ultima cifra (cea mai putin sem.)    | `x % 10`   | `x % b`     |
| Restul numarului (fara ultima cifra) | `x / 10`   | `x / b`     |

Asa ca daca repetam `% b` si `/ b` pana cand `x` ajunge la `0`, scoatem **toate cifrele lui `x` in baza `b`**, una cate una, **incepand cu cea mai putin semnificativa** (cifra unitatilor in baza `b`).

Cifrele ies in ordinea inversa fata de cum le scriem. Ca sa le asezam corect in `rez`, le lipim "la stanga" inmultindu-le cu o putere a lui 10 in continua crestere (`1, 10, 100, ...`).

### Trasare manuala

Convertim `x = 13` din baza 10 in baza 2:

| pas | x ramas | x % b (cifra) | x / b | putere10 | rez (acumulat)     |
|-----|---------|---------------|-------|----------|--------------------|
| 0   | 13      | 1             | 6     | 1        | 0 + 1·1 = 1        |
| 1   | 6       | 0             | 3     | 10       | 1 + 0·10 = 1       |
| 2   | 3       | 1             | 1     | 100      | 1 + 1·100 = 101    |
| 3   | 1       | 1             | 0     | 1000     | 101 + 1·1000 = 1101|
| —   | 0 (stop)|               |       |          |                    |

Rezultat: **1101** (binar pentru 13).

### Programul

```cpp
#include <iostream>
using namespace std;

int x, b, rez, putere10, cifra;

int main()
{
    cin >> x >> b;
    rez = 0;
    putere10 = 1;
    while (x != 0)
    {
        cifra = x % b;
        rez += cifra * putere10;
        putere10 *= 10;
        x /= b;
    }
    cout << rez;
    return 0;
}
```

**Intrare:**
```
13 2
```

**Afisare:**
```
1101
```

### Trasare cod

Pentru `x = 13, b = 2`:

| iteratie | cifra | rez  | putere10 | x  |
|----------|-------|------|----------|----|
| start    | -     | 0    | 1        | 13 |
| 1        | 1     | 1    | 10       | 6  |
| 2        | 0     | 1    | 100      | 3  |
| 3        | 1     | 101  | 1000     | 1  |
| 4        | 1     | 1101 | 10000    | 0  |

> [!NOTE] Observatie
> Inmultirea `cifra * putere10` "muta" cifra in pozitia corecta din numarul final. Prima cifra extrasa (`1`) ajunge pe pozitia unitatilor, a doua (`0`) pe pozitia zecilor, si asa mai departe.

---

## Conversie din baza 10 in baza b — Metoda 2

### Ideea

Metoda 1 produce cifrele "de la coada" (de la cea mai putin semnificativa). Metoda 2 face invers: gasim mai intai **cea mai mare putere a lui `b`** care nu depaseste `x`, apoi extragem cifrele **de la cea mai semnificativa** la cea mai putin semnificativa.

Pentru `x = 13, b = 2`, cea mai mare putere a lui 2 care e `<= 13` este `2^3 = 8`. Deci numarul va avea 4 cifre in baza 2 (pozitiile 3, 2, 1, 0).

### Trasare manuala

**Pasul 1** — gasim `putereB`:

`2^0 = 1, 2^1 = 2, 2^2 = 4, 2^3 = 8, 2^4 = 16` — 16 depaseste pe 13, deci dam un pas inapoi: `putereB = 8`.

**Pasul 2** — extragem cifrele de la stanga la dreapta. La fiecare iteratie:
- `cif = x / putereB` ne da cifra de pe pozitia curenta
- `x %= putereB` arunca cifra deja procesata
- `rez = rez * 10 + cif` lipeste cifra la **coada** lui `rez`
- `putereB /= b` trecem la pozitia urmatoare

| iteratie | putereB | x  | cif = x / putereB | x dupa `x %= putereB` | rez            |
|----------|---------|----|-------------------|------------------------|----------------|
| 1        | 8       | 13 | 1                 | 5                      | 0·10 + 1 = 1   |
| 2        | 4       | 5  | 1                 | 1                      | 1·10 + 1 = 11  |
| 3        | 2       | 1  | 0                 | 1                      | 11·10 + 0 = 110|
| 4        | 1       | 1  | 1                 | 0                      | 110·10 + 1 = 1101 |
| —        | 0 (stop)|    |                   |                        |                |

Rezultat: **1101**.

### Programul

```cpp
#include <iostream>
using namespace std;

int x, b, rez, putereB, cif;

int main()
{
    cin >> x >> b;
    // gasim prima putere a lui b mai mare sau egala cu x
    putereB = 1;
    while (putereB < x)
    {
        putereB *= b;
    }
    // daca am depasit, dam un pas inapoi
    if (putereB > x)
    {
        putereB /= b;
    }
    rez = 0;
    while (putereB != 0)
    {
        cif = x / putereB;
        rez = rez * 10 + cif;
        x %= putereB;
        putereB /= b;
    }
    cout << rez;
    return 0;
}
```

**Intrare:**
```
13 2
```

**Afisare:**
```
1101
```

### Trasare cod

Inainte de bucla principala:

| pas | putereB |
|-----|---------|
| init| 1       |
| 1   | 2       |
| 2   | 4       |
| 3   | 8       |
| 4   | 16      |
| (16 > 13, deci) | 8 |

In bucla principala (vezi tabelul de la trasarea manuala — sunt exact aceleasi valori).

> [!NOTE] Observatie
> Diferenta intre cele doua metode:
> - **Metoda 1** produce cifrele de la dreapta la stanga si le combina cu `putere10` care creste (`1, 10, 100, ...`).
> - **Metoda 2** produce cifrele de la stanga la dreapta si le combina cu `rez * 10 + cif` (acelasi truc pe care il folosim pentru "oglindirea" unui numar).

---

## Conversie din baza b in baza c

**Ideea:** trecem prin baza 10 ca punte:
1. Convertim `x` din baza `b` in baza 10 (Sectiunea "Conversie din baza b in baza 10").
2. Convertim rezultatul din baza 10 in baza `c` (Metoda 1 sau Metoda 2).

### Trasare manuala

Convertim `1101(2)` in baza 5.

**Pasul 1** — `1101(2) -> baza 10`: din trasarea anterioara stim ca rezultatul este `13`.

**Pasul 2** — `13(10) -> baza 5`:

| pas | x | x % 5 (cifra) | x / 5 | putere10 | rez            |
|-----|---|---------------|-------|----------|----------------|
| 0   | 13| 3             | 2     | 1        | 0 + 3·1 = 3    |
| 1   | 2 | 2             | 0     | 10       | 3 + 2·10 = 23  |
| —   | 0 (stop)|         |       |          |                |

Rezultat: `1101(2) = 13(10) = 23(5)`.

Verificare: `23(5) = 2·5 + 3·1 = 10 + 3 = 13`. ✓

### Programul

```cpp
#include <iostream>
using namespace std;

int x, b, c, rez, putereB, uc, putere10, cifra, zecimal;

int main()
{
    cin >> x >> b >> c;

    // pas 1: x din baza b in baza 10, salvat in zecimal
    zecimal = 0;
    putereB = 1;
    while (x != 0)
    {
        uc = x % 10;
        zecimal += uc * putereB;
        putereB *= b;
        x /= 10;
    }

    // pas 2: zecimal din baza 10 in baza c
    rez = 0;
    putere10 = 1;
    while (zecimal != 0)
    {
        cifra = zecimal % c;
        rez += cifra * putere10;
        putere10 *= 10;
        zecimal /= c;
    }

    cout << rez;
    return 0;
}
```

**Intrare:**
```
1101 2 5
```

**Afisare:**
```
23
```

> [!TIP] Sfat
> Folosim o variabila separata `zecimal` ca sa pastram rezultatul intermediar. Asa nu ne incurcam: `x` se "consuma" in primul `while`, iar `zecimal` se "consuma" in al doilea.

---

## Conversie intre baza b si baza b^k

Cand una dintre baze este **putere a celeilalte** (ex. `4 = 2^2`, `8 = 2^3`, `16 = 2^4`, `9 = 3^2`), nu mai avem nevoie de baza 10 ca punte. Conversia se face direct, **grupand cifre**.

**Ideea:** o cifra din baza `b^k` se scrie exact cu `k` cifre in baza `b`.

> **Ex:** Cifra `3` din baza 4 se scrie `11` in baza 2 (doua cifre, pentru ca `4 = 2^2`). Cifra `5` din baza 8 se scrie `101` in baza 2 (trei cifre, pentru ca `8 = 2^3`).

Tabelul pentru baza 2 si baza 4 (`k = 2`):

| baza 4 | baza 2 |
|--------|--------|
| 0      | 00     |
| 1      | 01     |
| 2      | 10     |
| 3      | 11     |

### Din baza b in baza b^k

Pasi:
1. Impartim cifrele lui `x` in grupe de cate `k`, **incepand de la dreapta**.
2. Daca la stanga ultima grupa are mai putin de `k` cifre, o completam cu zerouri la stanga.
3. Fiecare grupa se converteste intr-o singura cifra din baza `b^k`.

**Exemplu:** `110101(2)` in baza 4 (`k = 2`, grupe de cate 2 cifre):

| grupe  | 11 | 01 | 01 |
|--------|----|----|----|
| cifra in baza 4 | 3  | 1  | 1  |

Rezultat: `110101(2) = 311(4)`.

Verificare: `110101(2) = 53(10)` si `311(4) = 3·16 + 1·4 + 1 = 53(10)`. ✓

**Exemplu cu completare:** `10111(2)` in baza 4. Avem 5 cifre, deci ultima grupa (din stanga) are o singura cifra si o completam cu un zero:

| grupe  | 01 | 01 | 11 |
|--------|----|----|----|
| cifra in baza 4 | 1  | 1  | 3  |

Rezultat: `10111(2) = 113(4)`.

> [!WARNING] Atentie
> Grupele se formeaza **de la dreapta la stanga**, nu de la stanga la dreapta. Daca grupam `10111` de la stanga, obtinem `10 11 1` si rezultatul gresit.

**Exemplu cu `k = 3`:** `1101011(2)` in baza 8. Grupam cate 3 cifre de la dreapta: `001 101 011` (am completat cu doua zerouri la stanga).

| grupe  | 001 | 101 | 011 |
|--------|-----|-----|-----|
| cifra in baza 8 | 1   | 5   | 3   |

Rezultat: `1101011(2) = 153(8)`.

### Din baza b^k in baza b

Procedam invers: **fiecare cifra** a lui `x` se inlocuieste cu cele `k` cifre ale ei in baza `b` (completate cu zerouri la stanga pana ajung la `k` cifre). La final, zerourile de la inceputul rezultatului se sterg.

**Exemplu:** `132(4)` in baza 2:

| cifra in baza 4 | 1  | 3  | 2  |
|-----------------|----|----|----|
| grupa in baza 2 | 01 | 11 | 10 |

Rezultat: `011110`, adica `132(4) = 11110(2)` (am sters zeroul din fata).

Verificare: `132(4) = 16 + 12 + 2 = 30(10)` si `11110(2) = 16 + 8 + 4 + 2 = 30(10)`. ✓

> [!TIP] Sfat
> Conversia intre baza 2 si baza 8 sau 16 este foarte folosita in practica, pentru ca un numar binar lung devine mult mai scurt si mai usor de citit. Merita sa memorezi tabelul pentru baza 2 -> baza 4 si baza 2 -> baza 8.

### Programul — din baza b in baza b^k

Citim `x` (scris in baza `b`), `b` si `k`. La fiecare pas din `while`, luam urmatoarele `k` cifre ale lui `x` (de la dreapta) si le transformam intr-o singura cifra a rezultatului. Cand `x` se epuizeaza inainte sa luam toate cele `k` cifre, `x % 10` este `0`, deci completarea cu zerouri se face automat.

```cpp
#include <iostream>
using namespace std;

int x, b, k, rez, putere10, grupa, putereB, j;

int main()
{
    cin >> x >> b >> k;
    rez = 0;
    putere10 = 1;
    while (x != 0)
    {
        grupa = 0;
        putereB = 1;
        for (j = 1; j <= k; j++)
        {
            grupa += (x % 10) * putereB;
            putereB *= b;
            x /= 10;
        }
        rez += grupa * putere10;
        putere10 *= 10;
    }
    cout << rez;
    return 0;
}
```

**Intrare:**
```
110101 2 2
```

**Afisare:**
```
311
```

### Trasare cod

Pentru `x = 110101, b = 2, k = 2`:

| pas | cifrele luate din x (de la dreapta) | grupa | rez | putere10 | x ramas |
|-----|-------------------------------------|-------|-----|----------|---------|
| start | -                                 | -     | 0   | 1        | 110101  |
| 1   | 1, 0 (adica `01`)                   | 1     | 1   | 10       | 1101    |
| 2   | 1, 0 (adica `01`)                   | 1     | 11  | 100      | 11      |
| 3   | 1, 1 (adica `11`)                   | 3     | 311 | 1000     | 0       |

> [!IMPORTANT] Important
> Programul afiseaza corect doar daca `b^k <= 10`, adica fiecare grupa devine o cifra de la 0 la 9 (ex. baza 2 -> baza 4, baza 2 -> baza 8, baza 3 -> baza 9). Pentru baza 16 ar fi nevoie de litere.

### Programul — din baza b^k in baza b

Citim `x` (scris in baza `b^k`), `b` si `k`. Fiecare cifra a lui `x` o scriem cu `k` cifre in baza `b`, folosind aceeasi idee ca la Metoda 1 (`% b` si `/ b`), dar de exact `k` ori. Zerourile din fata nu apar, pentru ca adunam zerouri la `rez`.

```cpp
#include <iostream>
using namespace std;

int x, b, k, rez, putere10, cifra, j;

int main()
{
    cin >> x >> b >> k;
    rez = 0;
    putere10 = 1;
    while (x != 0)
    {
        cifra = x % 10;
        for (j = 1; j <= k; j++)
        {
            rez += (cifra % b) * putere10;
            putere10 *= 10;
            cifra /= b;
        }
        x /= 10;
    }
    cout << rez;
    return 0;
}
```

**Intrare:**
```
132 2 2
```

**Afisare:**
```
11110
```

### Trasare cod

Pentru `x = 132, b = 2, k = 2`:

| pas | cifra | cele `k` cifre in baza 2 (de la dreapta) | rez   | putere10 | x ramas |
|-----|-------|------------------------------------------|-------|----------|---------|
| start | -   | -                                        | 0     | 1        | 132     |
| 1   | 2     | 0, 1                                     | 10    | 100      | 13      |
| 2   | 3     | 1, 1                                     | 1110  | 10000    | 1       |
| 3   | 1     | 1, 0                                     | 11110 | 1000000  | 0       |
