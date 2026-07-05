# Lipirea cifrelor la stanga

Cand parcurgem un numar cu `n % 10` obtinem cifrele **de la dreapta la stanga** (intai unitatile). Daca vrem sa reconstruim un numar pastrand ordinea cifrelor, lipim fiecare cifra noua **in stanga** rezultatului deja format.

Pentru asta tinem minte cate cifre are rezultatul cu ajutorul unei puteri a lui 10 (`p10`):

```cpp
rezultat = ultimaCifra * p10 + rezultat;
p10 *= 10;
```

`ultimaCifra * p10` aseaza cifra pe pozitia din stanga (peste toate cifrele deja adunate), iar `+ rezultat` pastreaza ce aveam deja. Dupa fiecare lipire crestem `p10` cu inca o pozitie.

> [!NOTE] Observatie
> La [oglindit](./oglindit) foloseam `rezultat = rezultat * 10 + ultimaCifra`, ceea ce lipea cifra **la dreapta** si inversa ordinea. Aici, lipind la stanga, **pastram** ordinea cifrelor din numarul original.

---

## Inlocuirea unei cifre

Vrem sa afisam numarul citit, dar cu toate aparitiile cifrei `2` inlocuite cu `3`.

```cpp
#include <iostream>
using namespace std;
int n, ultimaCifra, rezultat, p10;

int main()
{
    cin >> n;
    rezultat = 0;
    p10 = 1;
    while (n != 0)
    {
        // Obtinem ultima cifra
        ultimaCifra = n % 10;
        // Daca este 2, o transformam in 3
        if (ultimaCifra == 2)
            ultimaCifra = 3;
        // Lipim cifra la stanga rezultatului
        rezultat = ultimaCifra * p10 + rezultat;
        p10 *= 10;
        // Eliminam ultima cifra din n
        n /= 10;
    }

    cout << rezultat;
    return 0;
}
```

**Intrare:**

```
72822
```

**Afisare:**

```
73833
```

---

## Stergerea unei cifre

Vrem sa afisam numarul fara nicio aparitie a cifrei `2`. De data aceasta lipim cifra la stanga **doar** cand nu este cea pe care o eliminam, iar `p10` creste tot atunci — altfel ar ramane "goluri" in numar.

```cpp
#include <iostream>
using namespace std;
int n, ultimaCifra, rezultat, p10;

int main()
{
    cin >> n;
    rezultat = 0;
    p10 = 1;
    while (n != 0)
    {
        // Obtinem ultima cifra
        ultimaCifra = n % 10;
        // Eliminam ultima cifra din n
        n /= 10;
        // Pastram cifra doar daca nu este 2
        if (ultimaCifra != 2)
        {
            rezultat = ultimaCifra * p10 + rezultat;
            p10 *= 10;
        }
    }

    cout << rezultat;
    return 0;
}
```

**Intrare:**

```
72822
```

**Afisare:**

```
78
```

> [!WARNING] Atentie
> `p10 *= 10` trebuie sa fie **in interiorul** lui `if`. Daca l-ai creste la fiecare pas, cifrele pastrate ar lasa spatii libere in dreptul cifrelor sterse.

---

## Inserarea unei cifre noi

Vrem ca dupa fiecare cifra de `5` sa adaugam o cifra de `7` **la stanga ei**. Aici lipim intai cifra curenta, apoi, daca era `5`, mai lipim inca un `7` — folosind acelasi `p10`, care intre timp a crescut.

```cpp
#include <iostream>
using namespace std;
int n, ultimaCifra, rezultat, p10;

int main()
{
    cin >> n;
    rezultat = 0;
    p10 = 1;
    do
    {
        // Obtinem ultima cifra
        ultimaCifra = n % 10;
        // Eliminam ultima cifra din n
        n /= 10;
        // Lipim cifra curenta la stanga
        rezultat = ultimaCifra * p10 + rezultat;
        p10 *= 10;
        // Daca era 5, lipim un 7 in stanga ei
        if (ultimaCifra == 5)
        {
            rezultat = 7 * p10 + rezultat;
            p10 *= 10;
        }
    } while (n != 0);

    cout << rezultat;
    return 0;
}
```

**Intrare:**

```
354455
```

**Afisare:**

```
375447575
```

> [!TIP] Sfat
> Cand vrei sa **adaugi** cifre in numar (nu doar sa le modifici), un `do while` este util: garanteaza ca prelucram cel putin o cifra, chiar daca numarul are o singura cifra.
