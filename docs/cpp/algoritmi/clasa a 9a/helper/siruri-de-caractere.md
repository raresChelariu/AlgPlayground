# Șiruri de caractere

Def: Sunt vectori de tip char. Sunt folosiți pentru a memora cuvinte.

> **Obs:** Memorarea șirului începe întotdeauna de la poziția 0.

> **Obs:** Finalul unui șir (trebuie) este marcat cu caracterul cu codul 0.

> **Obs:** Caracterul cu codul 0 se numește caracterul NULL.

Caracter alb - denumire pentru orice caracter cu codul <= 32

se numesc caractere albe pt. că nu le “poți vedea” (efectiv)

ex de caractere albe : ‘ ’ (SPACE) , ‘\n’ (ENTER), ‘\t’ (TAB),

```cpp
‘\0’ (caracterul NULL)(primul caracter din ASCII), EOF (End of File)

```

> **Obs:** Fie v adresa.

```cpp
pt instructiunea “cout<<v” : se afișează efectiv adresa dacă v NU este char pointer; altfel (este char*), se afișează toate caracterele până dau de caracterul NULL.
```

> **Obs:** Orice șir trebuie sa conțină cel puțin un caracter NULL. Altfel, șirul nu se termina!!!!

Ex:

```cpp
char s[10];
s[0] = 'a';
s[1] = 'x';
s[2] = 'y';
s[3] = 'f';
s[4] = 0;
s[5] = 'q';
s[6] = 'z';
cout << s; // se afișează doar axyf

```

## Afișarea unui șir de caractere

```cpp
( s este un vector de tip char (sau mai general o variabila de tip char*) )

```

Efect : Se afișează toate caracterele incepand cu adresa s pana cand se ajunge la caracterul cu codul 0.

Ex1

Dacă s contine:

Ex2 : Dacă s contine:

## Citirea unui caracter

```cpp
Metoda 1 - Operatorul >>

```

Efect : Se sare peste toate caracterele albe și se memorează în c primul caracter “negru”.

Ex de input:

xyz     abc

Se citește ‘x’ în variabila c.

Metoda 2

Efect : Se citește în c primul caracter (din locul unde am rămas cu citirea). (fie ca e “alb” sau nu).

Ex de input:

z     abc

```cpp
Pt : char c1, c2;
fin.get(c1); fin.get(c2); ”, se va citi ‘z’ în c1 și SPACE în c2.

```

Metoda 3

```cpp
fin.get();
```

Efect : Se citește primul caracter (din locul unde am rămas cu citirea). (fie ca e “alb” sau nu).

> **Obs:** Folosesc metoda 3 cand vreau sa merg mai departe cu citirea cu 1 caracter.

```cpp
// Input : 738
char a, b;
fin.get(a); fin.get(); fin.get(b); // în a voi avea ‘7’ și în b voi avea ‘8’

```

## Citirea șirurilor de caractere

> **Obs:** Orice metodă de citire a unui șir de caractere, se asigură că, după citirea șirului, se inserează la final ‘\0’ (caracterul NULL).

```cpp
Metoda 1 (Metoda >>)
fin>>s; // Efect : (Din locul unde am rămas cu citirea) Se sare peste toate caracterele albe, și se memorează în s toate caracterele până la primul caracter alb exclusiv.

```

Ex de input:              hello  guys

Metoda 2 (Metoda getline cu 2 param)

```cpp
Sintaxa : fin.getline(sir, LUNGIME_SIR);
```

Efect: Se citesc în șir toate caracterele, pana cand se intalneste caracterul ‘\n’ (ENTER) (care nu se memorează în șir, dar se citește).

Ex de input:

wow ce tare

super fain

Metoda 3 - Getline cu 3 parametri

Sintaxa :

```cpp
fin.getline(sir, LUNGIME_SIR, delimitator); // delimitator - variabila de tip char

```

Efect : La metoda 2 delimitatorul era implicit (era ‘\n’). Aici dau delimitatorul ca și parametru.

La fel ca la metoda 2, delimitatorul se citește, dar nu se pune în șir.

Ex de input:

wow ce tare

super fain

## Funcții pentru șiruri de caractere

```cpp
Pt a folosi aceste funcții -> #include <cstring>
(SAU #include <string.h>)

```

> **Obs:** strlen ⇔ str (String) + len (length)

Efect : funcția returnează numărul de caractere incepand cu adresa p+0 care sunt != ‘\0’.

```cpp
( Efect: numărul de caractere pana cand intalnesc caracterul NULL)
```

Ex:

Ex2 : Dacă s contine:

> **Obs:** De fiecare data cand apelez funcția strlen(s) se parcurge memoria de la adresa s pana la caracterul ‘\0’.

(Presupunem ca s nu se modifica în for dpdv a lungimii)

Prin urmare:

> **Obs:** strcpy ⇔ str (String) + cpy (Copy)

> **Obs:** Se aseamănă cu atribuirea

```cpp
( strcpy(a, b) este “ca un fel de” a = b; practic se copiază valorile (caracterele) din b în a).

```

Scop : Pentru a copia cuvantul sursa în cuvantul destinatie

Returnează : destinatie

Efect: De la adresa sursa se copiază toate caracterele în destinatie pana cand în sursa se ajunge la caracterul ‘\0’.

> **Obs:** Funcția strcpy se asigura ca după apel, destinatie va fi un șir ce se termina (are ‘\0’ la final).

Posibila implementare (care are același efect):

Ex:

```cpp
s[3] = t[2]; s[4] = t[3]; s[5] = t[4]; s[6] = t[5];
```

Efect :

> **Obs:** strcat ⇔ str(String) + cat(Concatenare). Concatenare ⇔ a lipi la dreapta/ a uni

> **Obs:** La fel ca și strcpy, strcat copiază din sursa și caracterul ‘\0’

Return : Se returnează “destinatie”

Efect :

```cpp
Considerăm lg = strlen(destinatie); ( destinatie+lg este prima adresă unde gasesc caracterul ‘\0’, incepand cu adresa destinatie).’

```

Ex:

Denumire: str(string) + chr(character)

> **Obs:** Răspunde la întrebarea “Where in string I find this character?”

Scop : pt a căuta prima apariție a unui caracter din șir.

Efect: Se incepe cu adresa sir si se cauta de la adresa curenta, unde se afla caracterul. Dacă da (s-a găsit caracterul), se returnează adresa (curentă).

Q: Cum fac să găsesc a doua apariție a lui e în șir?

```cpp
A: char* p = strchr(strchr(sir, 'e')+1, 'e');

```

> **Obs:** Dacă în s s-a verificat fiecare adresa până la ‘\0’ și nu s-a găsit caracterul se returnează adresa NULL (adresa 0x0).

Q: Cum verific dacă caracterul ‘x’ apare în șir?

```cpp
A: if (strchr(sir, 'x') != NULL) ⇔ if (strchr(sir, 'x'))

```

Q: Cum verific dacă litera ‘q’ NU apare în șir?

```cpp
A: if (strchr(sir, 'q') == NULL) ⇔ if (!strchr(sir, 'x'))

```

> **Obs:** strchr ( is there in this STRing this CHaRacter?)

```cpp
char *strchr(char *sir, char caracter)
```

{

```cpp
int i;
for (i = 0; sir[i] != 0; i++)
```

{

```cpp
if (sir[i] == caracter)
```

{

```cpp
return sir + i;
```

}

}

```cpp
return NULL;
```

}

> **Obs:** strstr (Where in this STRing is this subSTRing ? )

Efect : Începând cu  adresa str1 se caută prima apariție a lui str2. Se va returna prima adresă unde se gaseste str2.

Ex :

> **Obs:** Dacă vreau sa fiu mai riguros, nu trebuie sa caut cu o poziție mai la dreapta ci cu strlen(sir2).

```cpp
Ex: p2 = strstr(strstr(s, "le") + 2, "le"); 	// 2 pt ca sir2 este de lungime 2

```

> **Obs:** La fel ca la strchr, dacă str2 nu se regaseste in str1 ( adică am parcurs pana la’\0’ și nu am găsit o aparitie) atunci se returnează NULL.

```cpp
strlen(t) -> 4
strstr(s, t) -> s + 8

```

Strcmp (String compare)

```cpp
int strcmp(char * a, char * b);
```

a < b - dacă găsesc în dicționar pe a înaintea lui b (a este < lexicografic decat b)

“ana” < “mere” - pt ca ‘a’ < ‘m’

“abecedar” < “abracadabra” - pt ca ‘e’ < ‘r’

(Idee: caut prima poziție i unde a[i] != b[i] ).

Q: Ce pot observa dacă nu pot găsi o astfel de poziție ?

A: Că sunt “egale” (adică cuvintele sunt identice).

Efect: Se parcurg șirurile simultan pana cand se găsește o poziție x unde a[x] != b[x]. Dacă a[x] < b[x] se returnează -1. Dacă a[x] > b[x] se returnează 1. Dacă șirurile sunt identice se returneaza 0.

```cpp
// vreau sa verific daca a > b

```

Ex:

Ex de implementare strcmp:

strtok > tok - token - “bucată”

Scopul funcției: Să obținem, folosind funcția, toate bucățile de text ce nu conțin separatori (separatori = orice caracter ce se găsește în cel de-al 2-lea parametru).

Cazuri :

```cpp
s != NULL

```

Se parcurge s până când dau de un caracter ce NU este separator (acesta va fi începutul token-ului). Adresa acelui caracter (la finalul apelului) se returnează.

Se parcurge șirul de la acea poziție până când ajung la un caracter ce este separator (primul caracter ce nu face parte din token <=> sfârșitul token-ului). Acolo funcția pune ‘\0’ . Într-o variabilă (globală) “ascunsă” se va memora 1+adresa unde s-a pus ‘\0’. (aceasta va fi prima adresa de unde ar putea să înceapă următorul token).

```cpp
s == NULL

```

Exact ca mai sus, doar ca strtok nu porneste de la adresa data ca primul parametru, ci pornește de la adresa din variabila ascunsă.

> **Obs:** Dacă pt apelul curent, nu pot găsi un caracter ce nu este separator (adică primul caracter din token), se returnează NULL. Căutarea caracterului ce nu este separator se face până la apariția primului ‘\0’.

Q:Cum extrag toate token-urile dintr-un șir ?

A:

SAU

```cpp
Observație: NU folosi strtok în cazul în care ai mai mult de un separator și ai nevoie după parcurgerea șirului cu strtok de separatorul de pe acea poziție. ( De ce ? - pt ca strtok “distruge” șirul, punand “pe separator” caracterul NULL).
```

Soluție: Pot crea o copie a șirului dacă am nevoie sa știu ce separator era în locul unde a pus strtok ‘\0’.

## Exemplu de implementare strtok

## Colecție de cuvinte

Q: Am mai multe cuvinte de memorat. Cum memorez ?

A: Mi-ar trebui un “vector” de stringuri (un string este un vector de tip char). => Îmi trebuie o matrice de caractere.

Am nevoie de (maxim) n cuvinte (aleg sa numerotez de la 0) cu maxim x litere

```cpp
=> char M[n][x+1]; // (x + 1 - pt ca trebuie sa memorez și '\0')
```

Cum citesc cuvintele în lista ?

( Am de citit un număr necunoscut de cuvinte separate prin spațiu )

```cpp
char s[DMAX];
char M[NRMAX][DMAX];
int nrCuv = 0;
while (fin >> s)
```

{

```cpp
strcpy(M[nrCuv], s);
nrCuv++;
```

}
