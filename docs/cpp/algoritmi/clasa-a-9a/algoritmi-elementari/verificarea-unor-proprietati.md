# Verificarea unor proprietati

Problemele de tip **EXISTA** si **TOATE** verifica daca o proprietate este indeplinita de cel putin un element sau de toate elementele unui sir.

| | **EXISTA** | **TOATE** |
|---|---|---|
| **Propozitie exemplu** | Exista un elev cu media < 5? | Sunt toti elevii majori? (varsta >= 18) |
| **Ma opresc la** | Primul **EXEMPLU** — primul element care indeplineste conditia | Primul **CONTRAEXEMPLU** — primul element care NU indeplineste conditia |
| **Conditia buclei** | `existaCorigent == 0` (caut cat timp NU am gasit corigent) | `totiMajori == 1` (caut cat timp NU am gasit minor) |
| **Presupunerea initiala** | Presupunem ca NU exista: `existaCorigent = 0;` | Presupunem ca TOTI indeplinesc: `totiMajori = 1;` |
| **Sinonime in enunt** | cel putin 1, macar 1, sirul sa contina... | oricum, oricare, fiecare, toti |

---

## Exista un elev cu media sub 5?

Se citesc `n` si `n` medii scolare. Sa se afiseze `DA` daca exista cel putin un elev corigent (medie < 5), sau `NU` altfel.

### Varianta 1 — flag bool

Presupunem initial ca NU exista niciun corigent. Parcurgem sir-ul cat timp nu am gasit unul:

```cpp
#include <iostream>
using namespace std;

int n, i;
float v[1001];
bool existaCorigent;

int main()
{
    cin >> n;
    for (i = 1; i <= n; i++)
    {
        cin >> v[i];
    }

    existaCorigent = 0;
    for (i = 1; i <= n && !existaCorigent; i++)
    {
        if (v[i] < 5)
            existaCorigent = 1;
    }

    if (existaCorigent)
        cout << "DA";
    else
        cout << "NU";

    return 0;
}
```

**Intrare:**
```
5
7.5 4.2 8.0 6.3 3.9
```

**Afisare:**
```
DA
```

### Varianta 2 — break

- Iesim din bucla la primul corigent gasit. 
- Dupa bucla, daca `i <= n`, inseamna ca am iesit prin `break` (am gasit exemplul):

```cpp
#include <iostream>
using namespace std;

int n, i;
float v[1001];

int main()
{
    cin >> n;
    for (i = 1; i <= n; i++)
    {
        cin >> v[i];
    }

    for (i = 1; i <= n; i++)
    {
        if (v[i] < 5)
            break;
    }

    if (i <= n)
        cout << "DA";
    else
        cout << "NU";

    return 0;
}
```

**Intrare:**
```
5
7.5 4.2 8.0 6.3 3.9
```

**Afisare:**
```
DA
```

--- 

> [!NOTE] Observatie
> Acelasi lucru puteam sa-l obtinem si cu o variabila de tip bool, la care ii schimbam valoarea cand gaseam EXEMPLU si tot atunci faceam si break

```cpp
#include <iostream>
using namespace std;

int n, i;
float v[1001];

int main()
{
    cin >> n;
    for (i = 1; i <= n; i++)
    {
        cin >> v[i];
    }
    existaCorigent = 0;
    for (i = 1; i <= n; i++)
    {
        if (v[i] < 5)
        {
            existaCorigent = 1;
            break;
        }
    }

    if (existaCorigent)
        cout << "DA";
    else
        cout << "NU";

    return 0;
}
```

### Varianta 3 — return in main

La primul corigent gasit, afisam `DA` si iesim imediat din program. Daca parcurgem tot sirul fara sa gasim, afisam `NU` la final:

```cpp
#include <iostream>
using namespace std;

int n, i;
float v[1001];

int main()
{
    cin >> n;
    for (i = 1; i <= n; i++)
    {
        cin >> v[i];
    }

    for (i = 1; i <= n; i++)
    {
        if (v[i] < 5)
        {
            cout << "DA";
            return 0;
        }
    }

    cout << "NU";
    return 0;
}
```

**Intrare:**
```
5
7.5 4.2 8.0 6.3 3.9
```

**Afisare:**
```
DA
```

---

## Sunt toti elevii majori?

Se citesc `n` si `n` varste. Sa se afiseze `DA` daca toti elevii sunt majori (varsta >= 18), sau `NU` altfel.

### Varianta 1 — variabila bool

Presupunem initial ca TOTI sunt majori. Parcurgem cat timp nu am gasit un minor:

```cpp
#include <iostream>
using namespace std;

int n, i;
int v[1001];
bool totiMajori;

int main()
{
    cin >> n;
    for (i = 1; i <= n; i++)
    {
        cin >> v[i];
    }

    totiMajori = 1;
    for (i = 1; i <= n && totiMajori; i++)
    {
        if (v[i] < 18)
            totiMajori = 0;
    }

    if (totiMajori)
        cout << "DA";
    else
        cout << "NU";

    return 0;
}
```

**Intrare:**
```
4
16 19 20 17
```

**Afisare:**
```
NU
```

### Varianta 2 — break

- Iesim la primul CONTRAEXEMPLU (primul minor). 
- Daca `i > n` dupa `for`, inseamna ca nu am gasit niciun minor — toti sunt majori:

```cpp
#include <iostream>
using namespace std;

int n, i;
int v[1001];

int main()
{
    cin >> n;
    for (i = 1; i <= n; i++)
    {
        cin >> v[i];
    }

    for (i = 1; i <= n; i++)
    {
        if (v[i] < 18)
            break;
    }

    if (i > n) // nu am iesit prin "break", am parcurs tot sirul fara sa gasim contraexemplu
        cout << "DA";
    else
        cout << "NU";

    return 0;
}
```

**Intrare:**
```
4
16 19 20 17
```

**Afisare:**
```
NU
```

> [!NOTE] Observatie
> La EXISTA verificam `i <= n` dupa break (am gasit exemplul). La TOATE verificam `i > n` dupa break (nu am gasit contraexemplul).

> Acelasi lucru puteam sa-l obtinem si cu o variabila de tip bool, la care ii schimbam valoarea cand gaseam contraexemplu (si tot atunci faceam si break)

```cpp
#include <iostream>
using namespace std;

int n, i, v[1001];
bool totiMajori;

int main()
{
    cin >> n;
    for (i = 1; i <= n; i++)
    {
        cin >> v[i];
    }
    totiMajori = 1;
    for (i = 1; i <= n; i++)
    {
        if (v[i] < 18)
        {
            totiMajori = 0;
            break;
        }
    }

    if (totiMajori == 1)
        cout << "DA";
    else
        cout << "NU";

    return 0;
}
```


### Varianta 3 — return in main

La primul minor gasit, afisam `NU` si iesim imediat din program. Daca parcurgem tot sirul fara sa gasim niciun minor, afisam `DA` la final:

```cpp
#include <iostream>
using namespace std;

int n, i;
int v[1001];

int main()
{
    cin >> n;
    for (i = 1; i <= n; i++)
    {
        cin >> v[i];
    }

    for (i = 1; i <= n; i++)
    {
        if (v[i] < 18)
        {
            cout << "NU";
            return 0;
        }
    }

    cout << "DA";
    return 0;
}
```

**Intrare:**
```
4
16 19 20 17
```

**Afisare:**
```
NU
```
