# Funcții

Sintaxa - Definirea unei funcții:

ANTET_FUNCȚIE

CORP_FUNCȚIE

Sintaxă Antet funcție:

tipDeReturnat numeFuncție(listaParametrilor)

> **Obs:** tipDeReturnat este tipul de date pe care vreau să-l returnez (sau void dacă nu doresc să returnez o valoare).

```cpp
Ex de funcție void :
#include <iostream>
using namespace std;
void salut()
```

{

```cpp
cout << "Salut!";
```

}

```cpp
int main()
```

{

```cpp
salut(); // aici se apelează funcția; se afișează “Salut!”
return 0;
```

}

Sintaxa lista parametrilor:

tipParametru1 numeParametru1, …, tipParametruK numeParametruK

(dacă doresc K parametri)

```cpp
Ex: int a, float x
// o lista de parametri - avem 2 parametri
// primul parametru - se numește a și este de tip int
// al 2 lea parametru - se numește x și este de tip float

```

> **Obs:** Lista parametrilor poate fi goală.

> **Obs:** Parametru = argument (parametru și argument sunt sinonime)

> **Obs:** Funcție = subprogram (funcție și subprogram sunt sinonime)

Sintaxă returnare a unei valori:

```cpp
return expresie;
```

> **Obs:** Return face ca funcția să dea înapoi ca rezultat expresia.

> **Obs:** Return oprește execuția funcției !

> **Obs:** Pot folosi instrucțiunea return într-o funcție void pentru a opri mai devreme execuția.

```cpp
#include <iostream>
using namespace std;
void salut(bool spuneLaRevedere)
```

{

```cpp
cout << "Salut!" << endl;
if (spuneLaRevedere == 0)
return; // daca conditia e adevarata se termina functia
// ajung aici cu executia doar daca conditia de mai sus este FALSA
cout << "Ciao!";
return;
// nu se va executa niciodata !!!
cout << "Abracadabra!";
```

}

```cpp
int main()
```

{

```cpp
salut(1); // aici apelez functia
return 0;
```

}

```cpp
#include <iostream>
#include <cstring>
using namespace std;
int main()
```

{

```cpp
cout << patrat(13);
// EROARE : patrat was not declared in this scope
// compilatorul parcurge fișierul sursă de sus în jos
// prin urmare, în acest exemplu,
// compilatorul afla de funcția pătrat de abia după funcția main
return 0;
```

}

```cpp
int patrat(int a)
```

{

```cpp
return a * a;
```

}

> **Obs:** Pot apela o funcție doar dacă a fost declarată/definită înainte!! Altfel, obțin eroare de compilare ca în exemplul de mai sus.

## Sintaxa - Declararea funcție:

```cpp
ANTET_FUNCTIE ;
(scriu antetul și apoi pun ; )
#include <iostream>
using namespace std;
int patrat(int a); // DECLARARE
int main()
```

{

```cpp
cout << patrat(5);
// Se afișează 25
// Acum se compilează, deoarece înainte de main,
// functia patrat este declarata
return 0;
```

}

```cpp
// DEFINITIE
int patrat(int a)
```

{

```cpp
return a * a;
```

}

> **Obs:** Pentru a nu conta ordinea în care definesc funcțiile, mai intai le declar (pe toate) și apoi le definesc.
