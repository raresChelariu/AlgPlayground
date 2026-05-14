# Debug

**Debug** inseamna executia programului **pas cu pas**, linie cu linie.

Este util pentru a depista **erori de executie** — erori care apar dupa ce programul a fost compilat cu succes, dar nu se comporta conform asteptarilor.

---

## Pasi

### 1. Pornire — F4 (Run to cursor)

Pune cursorul pe linia de unde vrei sa incepi debug-ul, apoi apasa **F4**.

Programul porneste si se executa tot codul pana la acea linie (exclusiv).

> **Obs:** Pe ecran apare o **sageata galbena** care indica linia ce urmeaza sa fie executata.

> **Obs:** Daca sageata nu apare, inseamna ca executia nu a ajuns la acea linie. Cauze posibile:
> - Exista o operatie blocanta (ex: `cin` asteapta date de la tastatura si nu poate continua)
> - O structura repetitiva care nu se termina (bucla infinita)

### 2. Executie linie cu linie — F7 (Next line)

Apasa **F7** pentru a executa linia curenta si a avansa la urmatoarea.

### 3. Oprire — Shift+F8 (Stop Debugger)

Apasa **Shift+F8** pentru a opri debugger-ul.

> **Obs:** Poti opri debugger-ul si inchizand fereastra programului.

---

## Watches — urmarirea valorilor

**Watches** iti permite sa vezi valoarea unei variabile sau a unei expresii in orice moment al executiei pas cu pas.

Deschizi fereastra din: `Debug -> Debugging Windows -> Watches`

---

## Exemplu — debug pas cu pas

Programul de mai jos citeste doua numere si afiseaza suma lor. Urmareste ce se intampla cu variabilele la fiecare pas.

```cpp
#include <iostream>
using namespace std;

int a, b, suma;

int main()
{
    cin >> a >> b;
    suma = a + b;
    cout << suma << endl;
    return 0;
}
```

**Cum faci debug pe acest program:**

1. Pune cursorul pe linia `cin >> a >> b;` si apasa **F4** — sageata galbena apare pe acea linie.
2. Deschide **Watches** si adauga variabilele `a`, `b`, `suma` — vei vedea ca au valori nedefinite (gunoi din memorie).
3. Apasa **F7** — linia cu `cin` incepe sa se execute; programul asteapta sa introduci doua numere.

> **Obs:** In acest moment **sageata galbena dispare**. Asta nu inseamna ca ceva a mers gresit — programul este blocat la `cin`, asteptand sa tastezi valorile si sa apesi Enter. Sageata reapare imediat ce ai introdus datele.

4. Tasteaza `3 7` si apasa **Enter** — sageata galbena reapare pe linia urmatoare (`suma = a + b;`). In Watches:

| Variabila | Valoare |
|-----------|---------|
| a         | 3       |
| b         | 7       |
| suma      | 0       |

5. Apasa **F7** — linia `suma = a + b;` se executa. In Watches:

| Variabila | Valoare |
|-----------|---------|
| a         | 3       |
| b         | 7       |
| suma      | 10      |

6. Apasa **F7** — se afiseaza `10` pe ecran; executia ajunge la `return 0;`.
7. Apasa **Shift+F8** pentru a opri debugger-ul.

---

## [Clasa a X-a] Step Into — Shift+F7

Daca pe linia curenta exista un **apel de functie**, **Shift+F7** intra cu executia pas cu pas in interiorul acelei functii.

Daca linia nu contine un apel de functie, are acelasi efect ca **F7**.

---

## [Clasa a X-a] Stiva de apeluri (Call Stack)

Deschizi fereastra din: `Debug -> Debugging Windows -> Call stack`

Stiva arata toate functiile active in acest moment. **Primul apel din stiva** (cel mai de sus) este cel in care se afla executia curent.

Cand o functie se termina (prin `return` sau prin atingerea sfarsitului codului), apelul ei dispare din stiva si executia continua in functia de dedesubt.

---

## [Clasa a X-a] Exemplu — debug cu functii si stiva de apeluri

Programul de mai jos calculeaza dublul unui numar folosind doua functii: `main()` apeleaza `calculeaza()`, care la randul ei apeleaza `dublu()`.

```cpp
#include <iostream>
using namespace std;

int dublu(int x)
{
    return x * 2;
}

int calculeaza(int n)
{
    int rezultat;
    rezultat = dublu(n);
    return rezultat;
}

int main()
{
    int n, rez;
    cin >> n;
    rez = calculeaza(n);
    cout << rez << endl;
    return 0;
}
```

**Cum faci debug pe acest program (cu Shift+F7 si Call Stack):**

Pune cursorul pe linia `cin >> n;` si apasa **F4**. Deschide **Watches** (adauga `n`, `rez`) si **Call Stack**.

---

**Pasul 1** — sageata pe `cin >> n;`

Stiva de apeluri:

| # | Functie |
|---|---------|
| 1 (curent) | main |

Tasteaza `5` si apasa Enter.

---

**Pasul 2** — apasa **F7** — sageata avanseaza pe `rez = calculeaza(n);`

Watches:

| Variabila | Valoare |
|-----------|---------|
| n         | 5       |
| rez       | (nedefinit) |

---

**Pasul 3** — apasa **Shift+F7** — executia intra in `calculeaza()`; sageata sare pe prima linie din acea functie (`rezultat = dublu(n);`)

Stiva de apeluri:

| # | Functie     |
|---|-------------|
| 1 (curent) | calculeaza  |
| 2 | main        |

> **Obs:** `calculeaza` a fost adaugata **deasupra** lui `main` in stiva. Executia se afla acum in `calculeaza`.

---

**Pasul 4** — apasa **Shift+F7** — executia intra in `dublu()`; sageata sare pe `return x * 2;`

Stiva de apeluri:

| # | Functie     |
|---|-------------|
| 1 (curent) | dublu       |
| 2 | calculeaza  |
| 3 | main        |

---

**Pasul 5** — apasa **F7** — linia `return x * 2;` se executa; `dublu()` se termina si **dispare din stiva**

Stiva de apeluri:

| # | Functie     |
|---|-------------|
| 1 (curent) | calculeaza  |
| 2 | main        |

Executia revine in `calculeaza()`, pe linia `return rezultat;`.

---

**Pasul 6** — apasa **F7** — `calculeaza()` se termina si **dispare din stiva**

Stiva de apeluri:

| # | Functie |
|---|---------|
| 1 (curent) | main |

Executia revine in `main()`, pe linia `cout << rez << endl;`. In Watches:

| Variabila | Valoare |
|-----------|---------|
| n         | 5       |
| rez       | 10      |

---

**Pasul 7** — apasa **F7** de doua ori — se afiseaza `10`, executia ajunge la `return 0;`. Apasa **Shift+F8** pentru a opri debugger-ul.
