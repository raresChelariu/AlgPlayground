---
title: Debugger
aside: false
---

# Debugger

- Un **debugger** este un program care ruleaza codul nostru **linie cu linie**, in loc sa il execute dintr-o data.
- La fiecare oprire ne arata:
  - pe ce linie ne aflam (sageata galbena `▶`),
  - ce valoare are fiecare variabila in acel moment,
  - ce apeluri de functii sunt pornite (**stiva de apeluri**),
  - ce s-a alocat cu `new` (**heap**-ul).

Pagina asta ruleaza un program care foloseste si functii, si liste inlantuite, ca sa putem urmari toate cele trei zone de memorie in acelasi timp.

> [!NOTE] Observatie
> Executia de mai jos a fost inregistrata dinainte, pas cu pas, cu un debugger real. Nu se compileaza nimic in browser - de aceea poti sari inainte si **inapoi** oricat vrei, lucru pe care un debugger obisnuit nu il permite.

---

## Programul

```cpp
#include <iostream>
using namespace std;

struct Nod {
    int info;
    Nod *leg;
};

int FLsiDublu(Nod *prim)
{
    // numaram nodurile
    int n = 0;
    Nod *p = prim;
    while (p != NULL)
    {
        n++;
        p = p->leg;
    }

    if (n % 2 != 0)
        return -1;

    int jum = n / 2;
    int* a = new int[jum + 1];
    int i;

    // memoram informatiile din prima jumatate
    p = prim;
    for (i = 1; i <= jum; i++)
    {
        a[i] = p->info;
        p = p->leg;
    }

    // p se afla acum pe primul nod al jumatii a doua
    // comparam cele doua jumatati
    int rez = a[jum];
    for (i = 1; i <= jum; i++)
    {
        if (a[i] != p->info)
        {
            rez = -1;
            break;
        }
        p = p->leg;
    }

    delete[] a;
    return rez;
}

int n, i, x;
Nod *prim, *ultim;

int main()
{
    prim = NULL;
    ultim = NULL;

    cin >> n;
    for (i = 1; i <= n; i++)
    {
        cin >> x;
        Nod* nodNou = new Nod;
        nodNou->info = x;
        nodNou->leg = NULL;
        if (prim == NULL)
        {
            prim = nodNou;
            ultim = nodNou;
        }
        else
        {
            ultim->leg = nodNou;
            ultim = nodNou;
        }
    }

    cout << FLsiDublu(prim) << endl;
    return 0;
}
```

**Intrare:**
```
6
1 2 3 1 2 3
```

**Afisare:**
```
3
```

**Ce face `FLsiDublu`:** verifica daca lista este formata din aceeasi secventa repetata de doua ori. Daca da, intoarce ultima valoare din prima jumatate; daca nu, intoarce `-1`. Pentru lista `1 2 3 1 2 3` cele doua jumatati sunt amandoua `1 2 3`, deci raspunsul este `3`.

---

## Executia pas cu pas

<DebuggerVisual trace="lista-dublata" titlu="1 2 3 1 2 3 — cele doua jumatati sunt identice" />

---

## Cum se citeste

### Sageata galbena

Sageata `▶` arata linia **care se executa acum**, nu linia care s-a terminat deja.

Cand se apeleaza o functie, sageata sare la **prima linie din corpul functiei**, adica prima linie de sub acolada `{`.

### Pasul albastru de pe acolada `}`

Imediat dupa ce s-a executat `return`, sageata se muta pe **acolada de inchidere** a functiei si isi schimba culoarea. Acela este semnul ca functia s-a terminat:

```cpp
    delete[] a;
    return rez;      // <- se executa return
}                    // <- sageata ajunge aici: functia s-a terminat
```

La pasul urmator sageata se intoarce in `main`, **exact in locul de unde s-a facut apelul**. Este acelasi comportament pe care il vezi in Code::Blocks sau in Visual Studio Code.

### Stiva de apeluri

- Apelul din **varf** (marcat cu eticheta `varf`) este cel in care ne aflam cu executia.
- La pornire exista doar cadrul lui `main`.
- Cand se apeleaza `FLsiDublu`, apare un cadru nou **deasupra** lui `main`.
- Cand `FLsiDublu` se termina, cadrul dispare **impreuna cu toate variabilele lui locale** (`n`, `p`, `jum`, `a`, `i`, `rez`).

> [!IMPORTANT] Important
> Observa ca `main` are propriile variabile, iar `FLsiDublu` le are pe ale ei. Amandoua au cate un `n` si cate un `i`, dar sunt variabile **diferite**. Cea din varful stivei o "ascunde" pe cea globala.

### Heap-ul

Fiecare `new Nod` din `main` adauga o cutie noua in zona **Heap**. Cutiile sunt legate intre ele prin campul `leg`, iar ultimul nod are `leg` egal cu `NULL`.

Ruleaza pana la pasul 45 si urmareste cum se construieste lantul: la fiecare trecere prin `for`-ul din `main`, `ultim->leg` primeste adresa nodului nou si apoi `ultim` se muta pe el.

> [!TIP] Sfat
> Trece cu mouse-ul peste o pastila de adresa (de exemplu peste `prim`, care are valoarea `0x100`). Blocul catre care arata pointerul se aprinde in Heap. Asa vezi imediat **unde arata** fiecare pointer.

### Adresele

Adresele reale dintr-un debugger arata cam asa: `0x5C7BC80`. Aici au fost inlocuite cu `0x100`, `0x110`, `0x120`, ... in ordinea in care nodurile au fost alocate. Valorile sunt inventate, dar **relatiile dintre ele sunt reale**: daca doi pointeri au aceeasi valoare, chiar arata catre acelasi nod.

---

## Doua lucruri de urmarit cu atentie

### 1. Semnul `?` inseamna "neinitializat"

Dupa `int* a = new int[jum + 1];`, tabloul `a` apare in Heap cu **toate** celulele marcate `?`. Nu sunt zerouri - sunt valori aleatoare, ramase de la ce a fost inainte in acea zona de memorie.

Acelasi lucru se intampla cu `rez`: pana la linia `int rez = a[jum];`, in cadrul lui `FLsiDublu` scrie `rez ?`.

> [!WARNING] Atentie
> Variabilele **locale** nu se initializeaza singure. Doar cele **globale** pornesc de la `0`. Compara in vizualizator: globalele `n`, `i`, `x` au valoarea `0` de la primul pas, iar localele lui `FLsiDublu` au `?` pana cand primesc o valoare.

### 2. Celula `a[0]` ramane `?` pana la final

Tabloul se aloca cu `jum + 1` elemente, dar se foloseste de la `a[1]` la `a[jum]`. In vizualizator se vede foarte clar: celula de pe pozitia `0` ramane `?` tot timpul.

Nu este o greseala - este pretul indexarii de la `1`. Alocam un element in plus tocmai ca sa putem scrie `a[1]`, `a[2]`, ... exact ca in enunt.

---

## O capcana ascunsa in cod

Ce se intampla daca lista este **goala** (`n = 0`)?

- `n % 2 != 0` este fals, pentru ca `0 % 2` este `0`. Deci nu se intoarce `-1`.
- `jum` devine `0`.
- Se aloca `new int[1]`, dar `for`-ul de umplere nu se executa niciodata.
- Se ajunge la `int rez = a[jum];`, adica `rez = a[0]` — o valoare **neinitializata**.
- Functia intoarce o valoare aleatoare.

> [!WARNING] Atentie
> Pentru o lista goala functia intoarce gunoi, nu un raspuns corect. Se repara adaugand un caz separat la inceput:
>
> ```cpp
> if (n == 0)
>     return -1;
> ```

---

## Cum s-a generat vizualizarea

Trace-ul de executie a fost inregistrat o singura data, cu un debugger real, si salvat ca fisier static in `docs/public/traces/`:

```
node scripts/genereaza-trace.mjs scripts/exemple/lista-dublata.cpp "6 1 2 3 1 2 3" lista-dublata
```

Pentru un exemplu nou se scrie fisierul `.cpp`, se ruleaza comanda de mai sus si se adauga in pagina:

```
<DebuggerVisual trace="numele-fisierului" titlu="..." />
```
