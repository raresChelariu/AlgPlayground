# Descompunere in factori primi

Orice numar natural `n >= 2` se poate scrie **unic** ca produs de numere prime:

```
n = p1^e1 * p2^e2 * ... * pk^ek
```

unde `p1 < p2 < ... < pk` sunt numere prime, iar `e1, e2, ..., ek` sunt exponenti naturali nenuli.

**Exemplu:**

```
720 = 2^4 * 3^2 * 5^1
```

---

## De ce gasim mereu factori primi?

**Proprietate cheie:** cel mai mic divizor mai mare ca `1` al unui numar `n` este intotdeauna **prim**.

**Demonstratie:** fie `d` cel mai mic divizor al lui `n` cu `d > 1`. Presupunem ca `d` ar fi compus, adica `d = a * b` cu `a, b > 1`. Cum `d` divide pe `n` (deci `n = d * x`), rezulta ca si `a` divide pe `n` (caci `n = a * b * x`). In plus, `a < d`. Asadar `a` este un divizor al lui `n`, mai mare decat `1` si **strict mai mic** decat `d` — contradictie cu faptul ca `d` era cel mai mic. Deci `d` este prim.

> **Consecinta:** daca tot impartim `n` pe rand la cel mai mic divizor `> 1`, divizorii pe care ii gasim sunt **mereu primi**. Asta este exact ideea descompunerii in factori primi.

---

## Algoritm — varianta 1 (banala)

Pornim cu `d = 2`. Cat timp `n` se imparte la `d`, il impartim si numaram de cate ori. Cand nu mai merge, trecem la `d + 1`. Ne oprim cand `n` devine `1`.

```cpp
#include <iostream>
using namespace std;

int n, d, exp;

int main()
{
    cin >> n;

    for (d = 2; n != 1; d++)
    {
        exp = 0;
        while (n % d == 0)
        {
            n /= d;
            exp++;
        }
        if (exp > 0)
        {
            cout << d << " " << exp << endl;
        }
    }
    return 0;
}
```

**Intrare:**
```
720
```
**Afisare:**
```
2 4
3 2
5 1
```

> **Obs:** Cand ajungem la un `d` care nu divide pe `n`, `exp` ramane `0` si nu afisam nimic. Trecem la urmatorul `d`.

> **Obs:** Stim ca `d` parcurs astfel va lua **doar valori prime** care apar in descompunere — pentru ca `d = 4` ar trebui sa imparta pe `n`, dar pana atunci am scos deja toti factorii de `2` din `n`, deci `n % 4 != 0`. Acelasi rationament functioneaza pentru `6, 8, 9, ...`.

---

## Optimizare 1 — `2` este singurul prim par

Toate numerele prime, in afara de `2`, sunt **impare**. Putem trata `2` separat si apoi parcurge doar numerele impare `3, 5, 7, 9, ...` (cu `d += 2`).

```cpp
#include <iostream>
using namespace std;

int n, d, exp;

int main()
{
    cin >> n;

    // tratam 2 separat
    exp = 0;
    while (n % 2 == 0)
    {
        n /= 2;
        exp++;
    }
    if (exp > 0)
    {
        cout << 2 << " " << exp << endl;
    }

    // de la 3 in sus, doar numere impare
    for (d = 3; n != 1; d += 2)
    {
        exp = 0;
        while (n % d == 0)
        {
            n /= d;
            exp++;
        }
        if (exp > 0)
        {
            cout << d << " " << exp << endl;
        }
    }
    return 0;
}
```

**Intrare:**
```
720
```
**Afisare:**
```
2 4
3 2
5 1
```

> **Obs:** Sarim aproximativ jumatate din pasi. Pentru `n` mare, optimizarea conteaza.

---

## Optimizare 2 — daca `d * d > n`, atunci `n` ramas este prim

In timp ce impartim, `n` se micsoreaza. La un moment dat, `n` ramas poate sa fie deja **prim**. Daca nu observam asta, continuam sa cautam degeaba divizori pana la `n`.

**Cum stim ca `n` ramas este prim?** Daca `d * d > n` si nu am gasit niciun divizor pana atunci, inseamna ca `n` nu mai are divizori in `[2, sqrt(n)]`. Cum am demonstrat la primalitate, in acest caz `n` este prim.

Cand observam asta, putem afisa direct `n` cu exponent `1` si sa iesim din bucla.

```cpp
#include <iostream>
using namespace std;

int n, d, exp;

int main()
{
    cin >> n;

    exp = 0;
    while (n % 2 == 0)
    {
        n /= 2;
        exp++;
    }
    if (exp > 0)
    {
        cout << 2 << " " << exp << endl;
    }

    for (d = 3; n != 1; d += 2)
    {
        // daca d*d > n, atunci n ramas este prim
        if (d * d > n)
        {
            d = n; // fortam un singur pas final cu d = n
        }
        exp = 0;
        while (n % d == 0)
        {
            n /= d;
            exp++;
        }
        if (exp > 0)
        {
            cout << d << " " << exp << endl;
        }
    }
    return 0;
}
```

**Intrare:**
```
1000000007
```
**Afisare:**
```
1000000007 1
```

> **Obs:** `1000000007` este un numar prim. Fara optimizare, am fi cautat divizori pana la `1 000 000 007` — peste un miliard de pasi. Cu optimizarea, ne oprim cand `d` ajunge in jur de `31 623` (radicalul lui `10^9`).

> **Obs:** Trucul `d = n` face ca urmatoarea iteratie sa imparta `n` la el insusi exact o data, sa il aduca la `1`, sa afiseze `n 1` si sa iasa din bucla (caci `n != 1` devine fals).

---

## Numararea divizorilor pe baza descompunerii

**Proprietate:** daca `n = p1^e1 * p2^e2 * ... * pk^ek`, atunci **numarul de divizori** ai lui `n` este:

```
nrDiv = (e1 + 1) * (e2 + 1) * ... * (ek + 1)
```

**De ce?** Orice divizor al lui `n` se scrie tot ca produs de aceleasi numere prime, dar cu exponenti **intre 0 si exponentul din `n`**. Adica:

```
divizor = p1^a1 * p2^a2 * ... * pk^ak
unde 0 <= a1 <= e1, 0 <= a2 <= e2, ..., 0 <= ak <= ek
```

Pentru `a1` avem `e1 + 1` alegeri posibile (de la `0` la `e1`). La fel pentru fiecare exponent. Inmultim alegerile.

### Trasare pentru `n = 720`

`720 = 2^4 * 3^2 * 5^1`

`nrDiv = (4 + 1) * (2 + 1) * (1 + 1) = 5 * 3 * 2 = 30`

Asadar `720` are `30` de divizori.

### Programul

Reluam algoritmul de descompunere (cu optimizarile de mai sus) si **inmultim** `nrDiv` cu `exp + 1` pentru fiecare factor prim gasit. Pornim cu `nrDiv = 1`.

```cpp
#include <iostream>
using namespace std;

int n, d, exp, nrDiv;

int main()
{
    cin >> n;
    nrDiv = 1;

    exp = 0;
    while (n % 2 == 0)
    {
        n /= 2;
        exp++;
    }
    nrDiv *= exp + 1;

    for (d = 3; n != 1; d += 2)
    {
        if (d * d > n)
        {
            d = n;
        }
        exp = 0;
        while (n % d == 0)
        {
            n /= d;
            exp++;
        }
        nrDiv *= exp + 1;
    }

    cout << "Numarul de divizori: " << nrDiv;
    return 0;
}
```

**Intrare:**
```
720
```
**Afisare:**
```
Numarul de divizori: 30
```

> **Obs:** Cand un factor prim nu apare in descompunere, `exp = 0` si `nrDiv *= 0 + 1 = 1` — nu modifica produsul. Putem astfel inmulti **fara if** dupa fiecare iteratie.

> **Obs:** Atentie la cazul `n = 1` — bucla nu intra niciodata, `nrDiv` ramane `1`. Corect: `1` are intr-adevar un singur divizor (pe el insusi).
