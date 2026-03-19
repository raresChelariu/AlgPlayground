**Tipuri de date (primitive)**

Tipurile de date primitive sunt cele predefinite de limbaj.

**_Obs:_**

- Un tip de date "unsigned" ocupă la fel de mult ca respectivul său fără unsigned.
- Se memoreaza la fel de multe numere, doar ca la tipul unsigned minimul din toate range (interval) este mereu 0.
- Explicație: unsigned înseamnă în engleza "fără semn", adică pozitiv (fără minus).
- Prin urmare, folosesc tipurile unsigned cand știu sigur că în acea variabila voi memora doar numere naturale.

**_Tipuri pentru numere întregi_**

| **Nume**                                   | **Dimensiune (bytes)** | **Range (intervalul)**<br><br>**(de unde pana unde)**     |
| ------------------------------------------ | ---------------------- | --------------------------------------------------------- |
| bool                                       | 1                      | {0,1}                                                     |
| ---                                        | ---                    | ---                                                       |
| char                                       | 1                      | pt caractere                                              |
| ---                                        | ---                    | ---                                                       |
| short / short int                          | 2                      | +-32 000 (aprox)                                          |
| ---                                        | ---                    | ---                                                       |
| unsigned short /<br><br>unsigned short int | 2                      | 0 -> 65 000 (aprox)                                       |
| ---                                        | ---                    | ---                                                       |
| int                                        | 4                      | +- 2 100 000 000 (aprox)<br><br>(2,1 miliarde)            |
| ---                                        | ---                    | ---                                                       |
| unsigned int                               | 4                      | 0 -> 4,2 mld.                                             |
| ---                                        | ---                    | ---                                                       |
| long long                                  | 8                      | pt întregi fff mari<br><br>(de până la 20 de cifre aprox) |
| ---                                        | ---                    | ---                                                       |
| unsigned long long                         | 8                      | pt naturale fff mari                                      |
| ---                                        | ---                    | ---                                                       |

**_Tipuri pt numere "cu virgula"_**

| Nume   | Dimensiune (bytes) | Range (intervalul)<br><br>(de unde pana unde)                             |
| ------ | ------------------ | ------------------------------------------------------------------------- |
| float  | 4                  | Pt. nr. cu virgula                                                        |
| ---    | ---                | ---                                                                       |
| double | 8                  | Pt. nr. cu virgula cu multe cifre (fie la stânga sau la dreapta virgulei) |
| ---    | ---                | ---                                                                       |

**_Operatorul sizeof_**

Este un operator ce îl putem folosi pentru a calcula dimensiunea unui tip de date, dar și a unei zone de memorie. Este util de folosit cand vreau sa verific daca ma incadrez in limită de memorie data.

Ex: cout<<**sizeof**(**int**); // se va afișa 4

Ex: **int** v\[101\]; cout<<**sizeof**(v); // se va afișa 404

Ex: **long** **long** mat\[10\]\[10\]; cout<<**sizeof**(mat); // se va afișa 800

Obs: Un pointer, indiferent de tip, ocupă (în general) 8 bytes.

**Stergeri si inserari in vector**

Inserari in vector

Suntem la cinema - randul de scaune începe din stanga, de la perete, spre dreapta.

| 1   | 2   | 3   | 4   | 5   | 6   | 7   |
| --- | --- | --- | --- | --- | --- | --- |
| F   | G   | A   | B   | I   | R   |     |
| --- | --- | --- | --- | --- | --- | --- |

Vrea Catalina să se așeze între Florin și George => trebuie ca George, …, Radu să se mute cu o poziție la dreapta.

| 1   | 2   | 3   | 4   | 5   | 6   | 7   |
| --- | --- | --- | --- | --- | --- | --- |
| F   | C   | G   | A   | B   | I   | R   |
| --- | --- | --- | --- | --- | --- | --- |

Mutarile:

I)

v\[7\] = v\[6\];

v\[6\] = v\[5\];

…

v\[3\] = v\[2\];

II) v\[2\] = Catalina; **n++;**

**Dacă fac inserari în cadrul unei bucle trebuie sa fiu atent la indici**

Sa se insereze după fiecare element divizibil cu 7 opusul sau.

for (i = 1; i <= n; i++)

if (v\[i\]%7 == 0)

{

// inserarea va fi la i+1

// => voi muta elem i+1, i+2, …, n ; v\[n+1\] = v\[n\];

for (j = n; j >= i+1; j--)

v\[j+1\] = v\[j\];

v\[i+1\] = -v\[i\];

n++; i++;

}

**Stergerea in vector**

Suntem la cinema - randul de scaune începe din stanga, de la perete, spre dreapta.

| 1   | 2   | 3   | 4   | 5   | 6   |
| --- | --- | --- | --- | --- | --- |
| F   | G   | A   | E   | I   | R   |
| --- | --- | --- | --- | --- | --- |

Vrea Anastasia să plece, și cei rămași vor sa stea unul langa altul => trebuie ca Bianca, Ioana, Radu sa se mute cu o poziție la stanga.

| 1   | 2   | 3   | 4   | 5   |
| --- | --- | --- | --- | --- |
| F   | G   | E   | I   | R   |
| --- | --- | --- | --- | --- |

Mutarile:

I)

v\[3\] = v\[4\];

v\[4\] = v\[5\];

v\[5\] = v\[6\];

II) n--;

**_Dacă fac o ștergere într-o bucla, probabil trebuie sa fac "i--". (analog inserare)_**

**_Ex:_** Să se ștearga fiecare element divizibil cu 7.

int i, n = 100, v\[10001\], j;

for (i = 1; i <= n; i++)

{

if (v\[i\] % 7 == 0)

{

for (j = i + 1; j <= n; j++)

{

v\[j-1\] = v\[j\];

}

n--;

i--;

}

}

**Expresii**

Expresiile sunt de 2 tipuri:

- aritmetice
  - pt ca contin operatori aritmetici
  - rezultatul este un număr
- logici relationali:
  - pt ca conțin operatori logici relationali
  - rezultatul este 1 (True)/ 0 (False)

Operatori aritmetici : +, -, \*, /, %

Operatori logici relationali:

- Operatorii relationali:
  - &lt;, <=, &gt;, >=, ==, !=
- Operatorii logici:
  - ! (NOT), && (AND), || (OR)

Obs: Cand evaluez expresia a || b, daca unul dintre termeni este 1 (Adevărat), atunci expresia va fi 1.

Obs: Cand evaluez expresia a && b, daca unul dintre termeni este 0(Fals), atunci expresia va fi 0.

Împărțirea cu numere "cu virgulă"

Obs: Cand evaluez a/b, dacă **cel puțin unul** dintre termeni este **_"cu virgula"_** (de tip float sau double), atunci se va calcula **impartirea exacta**. _În caz contrar, se calculeaza catul împărțirii._

Obs: Cand evaluez a%b, dacă **cel puțin unul** dintre termeni este **_"cu virgula"_** (de tip float sau double), atunci obținem **_EROARE DE COMPILARE_**. În caz contrar, se calculează restul împărțirii.

| Expresie | Valoare |
| -------- | ------- |
| 7 / 3    | 2       |
| ---      | ---     |
| 10 / 4.0 | 2.5     |
| ---      | ---     |
| 55.0 / 5 | 11.0    |
| ---      | ---     |
| 23.0 / 5 | 4.6     |
| ---      | ---     |
| 23 % 5   | 3       |
| ---      | ---     |
| 33.3 % 9 | EROARE  |
| ---      | ---     |
| 43 % 7.2 | EROARE  |
| ---      | ---     |

Prioritatea operatorilor

(eng: operator precedence)

Principii:

- Mai intai efectuam "partea matematică" și apoi "partea logica (relațională)"
- Mai intai relational și apoi logic
- Inmultirea si impartirea înaintea adunării si scaderii
- ! (NOT) are cea mai mare prioritate dintre toți operatorii cunoscuți până acum
- && (AND) are prioritate mai mare decat || (OR)

- !
- \*, /, %
- +, -
- &lt;, &gt;, &lt;=, &gt;=, ==, !=
- &&
- ||

Cum evaluăm o expresie ?

- Mai întâi fac ce e între ( )
- Fac ce are prioritatea cea mai mare
- Cand am operatori de aceeași prioritate se evaluează expresia de la stanga la dreapta. ( 3 + 7 - 8 ⇔ (3 + 7) - 8 )

Legile lui DeMorgan

- ! (a && b) ⇔ !a || !b
- ! (a || b) ⇔ !a && !b

Observații: !(a &lt; b) ⇔ a &gt;= b

!(a>b) ⇔ a <= b

!(a>=b) ⇔ a < b

!(a&lt;=b) ⇔ a &gt; b

!(a == b) ⇔ a != b

!(a != b) ⇔ a ==b

Expresii cu intervale matematice

⇔ x < 5

⇔ x <= 7

⇔ x > 3

⇔ x > 2 && x < 7

⇔ x > 2 && x <= 5 **||** x >= 7 && x < 13

Obs: Datorită prioritatii operatorilor, pt expr de mai sus **_parantezele sunt opționale_**!

⇔ x > 2 && x <= 9 **&&** x >=5 && x < 11

⇔ !(x > 2 && x <= 9 **&&** x >=5 && x < 11) ⇔

⇔ !(x > 2 && x &lt;= 9) || !(x &gt;=5 && x < 11)

⇔ ( !(x > 2) || !(x &lt;= 9) ) || ( !(x &gt;= 5) || !(x < 11) )

⇔ ( x &lt;=2 || x &gt; 9) || ( x &lt; 5 || x &gt;= 11)

Maxime și minime

**_Caz: Citesc n numere. Vreau să determin numărul maxim._**

Obs: Voi folosi o variabila pentru memorarea maximului.

**Metoda 1**:

- Inițial maximul este primul element.
- Pentru fiecare element din șir, începând cu al doilea, voi compara maximul cu elementul curent. Dacă maximul e mai mic ca elementul curent, atunci actualizez maximul.

**int** maxim, n, i, x;  
cin >> n;  
cin >> x;

maxim = x; // 1)  
**for** (**int** i = 2; i <= n; i++) // 2) ; pornesc de la al 2lea pt ca primul l-am citit deja  
{  
cin>>x;  
**if** (maxim < x)  
maxim = x; // actualizez maximul  
}

**Metoda 2**:

Obs: Știu ca numerele mele sunt din intervalul \[valMin, valMax\].

- Inițializez maximul cu valMin-1. (Dacă trebuie sa aflu minimul initializez cu valMax+1)
- Compar maximul cu fiecare din cele n elemente și dacă este mai mic ca numărul curent, actualizez maximul cu valoarea curentă.

**int** maxim, n, i, x;  
cin >> n;

maxim = valMin-1; // 1) o val atat de mica a.i. la prima comparatie

// maximul sa fie chiar primul nr (singurul)  
**for** (**int** i = 1; i <= n; i++)  
{  
cin>>x;  
**if** (maxim < x)  
maxim = x; // actualizez maximul  
}  
cout<<maxim;

Obs : Dacă vreau sa aplic metoda 2 pentru aflarea minimului atunci voi inițializa minimul cu valMax+1. Logica primului pas al metodei 2 este ca primul număr citit este atât maxim, cât și minim la momentul citirii sale (ex din viata reala: Înălțimea minima dintr-o clasa cu 1 elev este înălțimea respectivului elev).

Switch - Case

Sintaxa:

**switch ( expresieSwitch ) {  
case expresieCase1 :  
// ...  
break;  
case expresieCase2 :  
// ...  
break;  
case expresieCase3:  
// ...  
break;  
default:  
// ...  
break;  
}**

**Efect:**

Se caută prima expresie expresieCk unde expresieCk este == cu expresieSwitch. Se execută de la acea etichetă toate instrucțiunile (ignorând etichetele) până când se întâlnește instrucțiunea **break** sau se ajunge la finalul blocului **switch** .

**Obs :**

Dacă nu s-a găsit o etichetă expresieCk a.i. expresieCk == expresieSwitch, atunci se executa instrucțiunile de la eticheta default.

**Obs :**

Eticheta **default** e opțională.

**Exemplu:**

/\*

Daca n are ultima cifra 0 - sa se afiseze "are 0 ultima cifra!"

Daca n are ultima cifra 5 - sa se afiseze "5 e ultima cifra!"

Altfel, sa se afiseze "ultima cifra nu e nici 0, nici 5!"

\*/

int n;

cin >> n;

switch (n % 10)

{

case 0:

cout << "are 0 ultima cifra!";

break;

case 5:

cout << "5 e ultima cifra!";

break;

default:

cout << "ultima cifra nu e nici 0, nici 5!";

break;

}

**Exemplu:**

**/cin.get**

**Scrie un program care, citind numărul unei zile a săptămânii, afișează numele acesteia.**

**1 - luni, 2 - marți, ..., 7 - duminică.**

**\*/**

**int n;**

**cin >> n;**

**switch (n)**

**{**

**case 1:**

**cout << "luni";**

**break;**

**case 2:**

**cout << "marti";**

**break;**

**case 3:**

**cout << "miercuri";**

**break;**

**case 4:**

**cout << "joi";**

**break;**

**case 5:**

**cout << "vineri";**

**break;**

**case 6:**

**cout << "sambata";**

**break;**

**case 7:**

**cout << "duminica";**

**break;**

**}**

**Exemplu:**

# include &lt;iostream&gt;

# include &lt;cstring&gt;

**using** **namespace** std;  
**char** s\[256\];  
**void** **f**(**int** nrLunaDinAn) {  
// dupa apelare f(nr) in s se va memora a nr luna a anului  
**switch** (nrLunaDinAn) {  
**case** 1:  
strcpy(s, "IAN");  
**break**;  
**case** 2:  
strcpy(s, "FEB");  
**case** 3:  
strcpy(s, "MAR");  
**break**;  
**case** 4:  
strcpy(s, "APR");  
**break**;  
**case** 5:  
strcpy(s, "MAY");  
**break**;  
**case** 6:  
strcpy(s, "JUN");  
**break**;  
**case** 7:  
strcpy(s, "JUL");  
**break**;  
**case** 8:  
strcpy(s, "AUG");  
**break**;  
**case** 9:  
strcpy(s, "SEP");  
**break**;  
**case** 10:  
strcpy(s, "OCT");  
**break**;  
**case** 11:  
strcpy(s, "NOV");  
**break**;  
**case** 12:  
strcpy(s, "DEC");  
**break**;  
**default**:  
strcpy(s, "nu exista!!");  
}  
cout<<s;  
}  
**void** **f2**(**int** nr) {  
// in s vom memora anotimpul  
**switch** (nr) {  
**case** 12:  
**case** 1:  
**case** 2:  
strcpy(s, "WINTER");  
**break**;  
**case** 3:  
**case** 4:  
**case** 5:  
strcpy(s, "SPRING");  
**break**;  
**case** 6:  
**case** 7:  
**case** 8:  
strcpy(s, "SUMMER");  
**break**;  
**case** 9:  
**case** 10:  
**case** 11:  
strcpy(s, "FALL");  
**break**;  
**default**:  
strcpy(s, "not implemented!");  
}  
cout<<s<<'\\n';  
}  
**int** **main**() {  
// nu exista case 13, deci pt i==13 se executa instructiunile  
// de la eticheta default  
**for** (**int** i = 1; i <= 13; i++)  
f1(i);  
**for** (**int** i = 1; i <= 13; i++)  
f2(i);  
**return** 0;  
}

Exemplu 2 : // se afișează 0048

// se

# include &lt;iostream&gt;

**using** **namespace** std;  
**int** x, n = 24;  
**int** **main** () {  
**for** ( x = 0 ; x < n ; x += 4 ) {  
**switch** ( x ) {  
**case** 0 :  
cout << x;  
**case** 8 :  
cout << x;  
**default**:  
**break**;  
**case** 4 :  
cout << x;  
}  
}  
**return** 0 ;  
}

Stiva și Coada

- Sunt concepte abstracte
- Sunt structuri abstracte ce memorează mai multe elemente

Din viata reala:

- Ex de stiva : stiva de apeluri de funcții, teancul de farfurii (când pun o farfurie la spălat, o pun în vârf, iar când iau o farfurie din teanc pentru a o spăla o iau din varf), setul vertical de scaune (care se pot pune unul peste altul (ca teanc))
- Ex de coada : coada la tejghea (cand stau la coada la magazin), o masina de xerox într-o companie (primește mai multe cereri de printare și le executa în ordinea în care le primește)

Stiva - ultimul venit, primul servit (LIFO - Last In First Out)

Coada - primul venit, primul servit

- ultimul venit, ultimul servit
- FIFO (First In First Out)

"Servirea" - (scot un element) Pop

"Venirea" - (inserarea unui element) Push

Push - la Stiva - pune element în vârf (deasupra teancului)

Push - la Coada - pune element la finalul cozii

Pop - la Stiva - scot elementul din varf

Pop - la Coada - scot elementul de la începutul cozii

Front - vad elementul de la începutul cozii

Top - văd elementul din vârful stivei

(front și top nu schimbă cu nimic conținutul cozii, respectiv stivei)

(cand mă pun la coada nu mă bag în fața)

Obs: Operația de Front există doar la coadă

Obs: Operația de Top există doar la stivă

"Pe cine servesc ?" - vreau sa vad elementul "pe care îl servesc"

- Coada - primul - Front
- Stiva - ultimul - Top

**Reprezentarea in memorie - Stiva**

Problemele cu Stiva pot fi rezolvate dacă reprezint stiva ca un vector, unde elementele din vector sunt și elementele stivei.

Dacă numerotez pozițiile in vector de la 0, atunci pot considera ca baza stivei este la acea poziție.

Mai ramane sa stiu poziția vârfului - voi declara o variabila pentru poziția varfului.

**_Stiva cu vector numerotat de la 0_**

Cand pozVf = 0 => stiva are 1 elem

\=> stiva este goala ⇔ pozVf = -1;

**Operatia de top**

**int** **top**()  
{  
**return** s\[pozVf\];  
}

Operatia de pop

**int** **pop**()  
{  
**bool** esteGoala = pozVf == -1;  
**if** (esteGoala)  
{  
**return** -1;  
}  
<br/>**int** elemVf = s\[pozVf\];  
pozVf--;  
**return** elemVf;  
}

Operația de push

| **void** **push**(**int** x) <br>{ <br>pozVf++; <br>s\[pozVf\] = x; <br>} |
| ------------------------------------------------------------------------- |
|                                                                           |
| ---                                                                       |

Ex 125

Inițial stiva e goala.

5

4

3

2

1

La _stiva_ voi avea permanent în vedere **vârful**.

La _coada_ voi avea permanent în vedere **începutul** și **sfârșitul**.

| (   | )   | (   | (   | (   | )   | (   | )   | )   | (   | )   | )   |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1   | 2   | 3   | 4   | 5   | 6   | 7   | 8   | 9   | 10  | 11  | 12  |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

**Problema 848**

Idee : Șir ok ⇔ nr ( = nr )

Exista un șir care nu e ok dar "nr ( = nr )" ?

)(() contraexemplu ok

))(( contraexemplu ok

((**)**))(

Stiva : ((

Obs: Nu pot sa fac POP cand stiva e GOALA!

Idee #2 : Contor = nr( - nr)

Șirul este rău când :

- Contorul ajunge sa fie -1
- La final, contorul > 0

4 ENTER

(())

)(()

()((()())())

()(

~~fin>>n;~~

~~for (i = 1; i <= n; i++)~~

~~fin.getline(s, 256);~~

fin>>n;  
fin.get(); // citește caracterul curent (fie ca e alb sau nu)  
**for** (i = 1; i <= n; i++)  
fin.getline(s, 256);

Prob #852

()\[\](\[\])(\[va aici poate sa urmeze doar ( sau \] sau \[

DAR NU )

(\[ urmeaza ) am un sir prost

Cand caracterul curent este:

- ( - o pun in stiva
- \[ - o pun in stiva
- ) - daca ( "am in varf (" )
  - atunci
  - elimin varful
  - altfel // am in varf \[
  - SIR PROST
- \] - daca am in varf \[

atunci

elimin varf

altfel am in varf (

sir prost

((\] ~~pot trece in~~ (

(() pot trece in (

()

\[)

# include &lt;fstream&gt;

# include &lt;cstring&gt;

**using** **namespace** std;  
ifstream **fin**("paranteze3.in");  
ofstream **fout**("paranteze3.out");  
**bool** **sirOk**(**char**\* s);  
**int** n, i, s\[256\];  
**int** **main**()  
{  
fin>>n;  
fin.get(); // CITESC ENTERUL  
**for** (i = 1; i <= n; i++)  
{  
fin.getline(s, 256);  
fout<<sirOk(s)<<'\\n';  
}  
**return** 0;  
}

**bool** **sirOk**(**char**\* s)  
{  
**int** lg = strlen(s);  
**int** i;  
**char** stiva\[256\], vf = 0;  
<br/>**for** (i = 0; i < lg; i++)  
{  
**if** ('(' == s\[i\] || '\[' == s\[i\]) /  
{  
// FAC PUSH PT S\[I\]  
vf++;  
stiva\[vf\] = s\[i\];  
}  
**else** **if** (s\[i\] == ')')  
{  
**if** (vf == 0) // ) sau ())  
**return** 0;  
**if** (stiva\[vf\]=='(') // am scapat de ()  
vf--;  
**else** // am in varf \[ ; nu pot sa am \[)  
**return** 0;  
}  
**else** // \]  
{  
**if** (vf == 0) **return** 0;  
**if** (stiva\[vf\] == '\[')  
vf--;  
**else** // ) // NU POT (\]  
**return** 0;  
}  
}  
**return** vf == 0;  
}

Funcții

**Sintaxa - Definirea unei funcții:**

ANTET_FUNCȚIE

CORP_FUNCȚIE

**Sintaxă Antet funcție:**

tipDeReturnat numeFuncție(listaParametrilor)

**Obs:** tipDeReturnat este tipul de date pe care vreau să-l returnez (sau **_void_** dacă nu doresc să returnez o valoare).

**Ex de funcție void :**

# include &lt;iostream&gt;

using namespace std;

void salut()

{

cout << "Salut!";

}

int main()

{

salut(); // aici se apelează funcția; se afișează "Salut!"

return 0;

}

**Sintaxa lista parametrilor:**

tipParametru1 numeParametru1, …, tipParametruK numeParametruK

_(dacă doresc K parametri)_

Ex: int a, float x

// o lista de parametri - avem 2 parametri

// primul parametru - se numește **_a_** și este de tip **_int_**

**_//_** al 2 lea parametru - se numește **_x_** și este de tip **_float_**

_Obs: Lista parametrilor poate fi goală._

_Obs: Parametru = argument (parametru și argument sunt sinonime)_

_Obs: Funcție = subprogram (funcție și subprogram sunt sinonime)_

**Sintaxă returnare a unei valori:**

_return expresie;_

_Obs: Return face ca funcția să dea înapoi ca rezultat expresia._

_Obs: Return oprește execuția funcției !_

**_Obs:_** _Pot folosi instrucțiunea_ **_return_** _într-o funcție_ **_void_** _pentru a opri mai devreme execuția._

**#include &lt;iostream&gt;**

**using namespace std;**

**void salut(bool spuneLaRevedere)**

**{**

**cout << "Salut!" << endl;**

**if (spuneLaRevedere == 0)**

**return; // daca conditia e adevarata se termina functia**

**// ajung aici cu executia doar daca conditia de mai sus este FALSA**

**cout << "Ciao!";**

**return;**

**// nu se va executa niciodata !!!**

**cout << "Abracadabra!";**

**}**

**int main()**

**{**

**salut(1); // aici apelez functia**

**return 0;**

**}**

**#include &lt;iostream&gt;**

**#include &lt;cstring&gt;**

**using namespace std;**

**int main()**

**{**

**cout << patrat(13);**

**// EROARE : patrat was not declared in this scope**

**// compilatorul parcurge fișierul sursă de sus în jos**

**// prin urmare, în acest exemplu,**

**// compilatorul afla de funcția pătrat de abia după funcția main**

**return 0;**

**}**

**int patrat(int a)**

**{**

**return a \* a;**

**}**

**Obs: Pot apela o funcție doar dacă a fost declarată/definită înainte!! Altfel, obțin eroare de compilare ca în exemplul de mai sus.**

# Sintaxa - Declararea funcție

**ANTET_FUNCTIE ;**

**(scriu antetul și apoi pun ; )**

**#include &lt;iostream&gt;**

**using namespace std;**

**int patrat(int a); // DECLARARE**

**int main()**

**{**

**cout << patrat(5);**

**// Se afișează 25**

**// Acum se compilează, deoarece înainte de main,**

**// functia patrat este declarata**

**return 0;**

**}**

**// DEFINITIE**

**int patrat(int a)**

**{**

**return a \* a;**

**}**

Obs: Pentru a nu conta ordinea în care definesc funcțiile, mai intai le declar (pe toate) și apoi le definesc.

| (Variabile) **Locale**                                                                               | (Variabile) **Globale**                                                                  |
| ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| este o variabilă declarată într-o funcție                                                            | este o variabilă declarată<br><br>în afara oricărei funcții                              |
| ---                                                                                                  | ---                                                                                      |
| **"trăiește"** din momentul în care a fost declarată până la finalul execuției funcției              | **_"trăiește"_** _(există în memorie)_ de la pornirea programului până la terminarea lui |
| ---                                                                                                  | ---                                                                                      |
| poate fi accesată doar în cadrul funcției în care a fost declarată                                   | poate fi accesată de oriunde                                                             |
| ---                                                                                                  | ---                                                                                      |
| la declare, are ca valoare inițială o valoare RANDOM (de aceea, localele trebuie mereu inițializate) | la declare, are valoarea inițială 0                                                      |
| ---                                                                                                  | ---                                                                                      |

Ce se întâmplă când se apelează o funcție?

- Se memorează locul de unde se apelează funcția
- Se copiaza valorile parametrilor pe stivă (într-un apel)
- Se execută funcția până la terminarea acesteia.
- Se continua cu execuția din locul memorat la pasul 1,

și apelul se șterge de pe stivă

( când apelul se șterge de pe stivă se șterg și datele memorate aferente acestuia:

- unde trebuie să se întoarcă
- variabilele locale declarate în acea funcție
- parametrii acelei funcții )

**Stivă (de apeluri)**

- este o zonă de memorie
- în care se memorează apeluri de funcție
- la începutul execuției programului, mereu voi avea DOAR apelul funcției **_main_** pe stivă
- în engleza : _call stack_
- mereu apelul din vârful stivei este apelul unde mă aflu cu execuția

**_Obs: Cand dau ca parametru un vector, se copiază pe stivă doar adresa sa !_** (NU toate elementele sale!)

Ex :

void f(int x\[\])

{

x\[0\] = 59;

}

int v\[\] = {3, 6, 7, 4}, i;

int main()

{

f(v);

for (i = 0; i < 4; i++)

cout << v\[i\] << " ";

return 0;

}

Astfel, dacă vreau sa dau ca parametru pe vectorul v (care a fost declarat, de exemplu, **int** v\[200\];)

voi scrie antetul de forma:

**void** **f**( **int** param\[200\] )  
// SAU  
**void** **f**( **int** param\[\] )  
// SAU  
**void** **f**( **int** \* param )

Obs: Analog pentru o matrice :

**void** **f**( **int** param\[200\]\[500\])  
SAU  
**void** **f**( **int** param\[\]\[500\])

Secvențe

Obs: O secventa poate fi și de lungime 1.

Def : **Secvența maximă** (de lungime maximă) - dintre toate secvențele, este secvența de lungime maxima care indeplineste proprietatea P (unde P o proprietate din enunț - "secvența de numere pare").

Ex : 2 3 7 _8 6 4 6_ 5 8 8 9 4 4 4 4 ( pentru P - "secvența de numere pare" avem secvențele subliniate ca fiind secvențe maxime)

Def : **Secvența maximală** \- dacă aș mai încerca să mai adaug un element (fie la dreapta (la final), fie la stânga (la început) ), secvența obținută nu ar mai respecta proprietatea.

(în alte cuvinte, secvența **_"mai bine de atât nu se poate"_**)

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgIAAAIXCAYAAADuXjbkAAAf0UlEQVR4nO3dO3Ibx9oG4I+nzlIgByqtgF4B5MSRU2d0SCZ/5tDZScQQypw6cmJpBeQKVA4k7mX+AABF3IgBMLfu73mqpsqCQcytLy+6e8iriGgCAEjpP2MfAAAwHkEAABITBAAgMUEAABITBAAgMUEAABITBAAgMUEAABITBAAgMUEAABITBAAgMUEAABITBAAgMUEAABITBAAgMUEAABITBAAgMUEAABITBAAgMUEAABITBAAgMUEAABITBAAgMUEAABITBAAgMUEAABITBAAgMUEAABITBAAgMUEAABITBAAgMUEAABITBAAgMUEAABITBAAgMUEAABITBAAgMUEAABITBAAgMUEAABITBAAgMUEAABITBAAgMUEAABITBAAgMUEAABITBAAgMUEAABITBAAgMUEAABITBAAgMUEAABITBAAgMUEAABITBAAgMUEAABITBAAgMUEAABITBAAgMUEAABITBAAgMUEAABITBAAgMUEAABITBAAgMUEAABITBAAgsf+OfQDANDVN08vnXl1d9fK5wHmuIqKf2g5MUl8dfNcEBhiGIAAVKqWzP4eAAN0SBKACNXf8bQgHcD5BAAqTvdNvSziAdgQBKMAYnX9fHWlN5wI1EARggvruLEvoGPu8BiWcPwxFEICJ6Lrjq7Wzc52gW4IAjKirTi17Z+Y6wvkEARhYF52WDut1rjG0JwjAAC7tmHRKl3H94TBBAHp0SQek8+mHewKbBAHomI6mLOfeL/eKWggC0BEdStncP7ISBOBC53QgOo9pc0/JRBCAM53aWegoyuQ+UztBAE6kY8jJKAG1EgSgBZ0/LykP1EQQgCNOafQ1+LkoG9RAEIADNPK0paxQMkEAtmjUOZeyQ4kEAVjRiNMVZYmSCAKkp9GmL8oWJRAESK1tQ62R5hLKGVMmCJCShpkxKHdMkSBAOm0aYw0xfVIGmRJBgDR8G2NKlEemQhAgBd/AmCqBgLEJAlRNAKAUyipj+c/YBwB90bBSkjZl8Zw/fATHGBGgOgIApVOGGZIgQFWONaAaT0ohDDAUQYAqaDSplbJN36wRoHgaSmpm7QB9MyJA0UwFkInyTh8EAYqlUSQjI2B0TRCgOAIAqAd0xxoBiqLxg6VjZd26AdoSBCiGEACbhAG6YGqAIggB8LrX6oj6wWsEASZNAID21BfOYWqAydKowWlMFXAOQYBJEgLgPMIApxIEmBwhAC4jDHAKawSYFAueoFvqFMcYEWAyNFjQvdfqjpEBIgQBJkIIgP4IA7xGEGB0QgD0TxjgEEGAUQkBMBxhgH0EAUYjBMDwhAG2CQKMQgiA8QgDvCQIMDghAMYnDLAmCDAoIQCmQxggQhBgQEIATI8wgCDAIIQAmC5hIDdBgN4JATB9wkBeggC9EgKgHMJAToIAvRECoDzCQD6CAL0QAqBcwkAuggCdEwKgfMJAHoIAnRICoB7CQA6CAJ0RAqA+wkD9BAE6IQRAvYSBugkC9EoIoG+z24domiYebmfjHMB8EU3TxGI+zu6Hoi7XSxDgYoe+EUy24ZjdxkPTRPNiG60T6dU8Fk0TTe09FIM5VKeNCpRNEOAixYWA+SKabx8i7t7E1dXVansTf/3yrdIwUL+n+x/j6uoqfrx/GvtQUhAG6vPfsQ+AcpVX8Wdx+/tNRHyMPzY6jae4//Eq7sc6LKhE0zTT/RLAQUYEOEuZiwPfxNvriHj8N761ev9qaP3Ftn+UfRa3D/unGuaLJprmIfYNNuz+v+P7W86HL39m+fPrbRHznc/+FDcRETefDkyBtD2/nQN/Pob1/Pz2MRx6ffdzXu5/6zqt///2QW3Pye+box/qGF+/UOdd3wJYPFifxmY7dTtk7OM6ts0Xy+N8uJ29/t7ZbfPQNE2zmD+/Nrt9aJYvvXzvvFksP7CZbbz20NzOoonVDnf3t/VzLfe3fm3zM2fN8uVFM9+3jxefefr57dnWF3HjGFb7ahbNYvHyc/cf23yxfVzff37nfetreeh6r45n47gHPMa9+7/k+ha0ldoO2Ha20Q/AVthWduVfN+bbncTmNl9sdTYRzXOH8eL13Y7qwP62P2vVUaz333Z/685k57j3dUavBIG2+9u7rTvZrc99Dinb+9t7bIc/d2+Hujqmvdf7tSAwxDHuee2i61vYVnZ7YIuIxtQAJ2lKWxy443P8dnUVb+4eIyLi+sO3vUPmP99ExJevsbn87Cm+fomI67fxJiIiZvHDu4h4/Cv+ObhO7XP87+4x4vqX+OnFLmY//RLXz2sV2u7vuy9ft3b47d94jIh3P7QZtz59f/t8/Pvz5k9//bL39bV2x7b1vqf7+PXuMeL6Q/z58BCfbiIe736NtusCBznGHd1c31JYPFg+QYDWaqrY65XmV2/u4jFWgWA9gTv7Id5FbMytr7dPNy8/ZbXmYKfB39rXP3/FY1zHL89JYBY//XId8fHv+HzS/joy9P4u9HT/a9w9RlxfX8fuQs8JKuz69qmmNqNmggAXK2c0YI+n+/jx6k3cPUbEze+bC8E+vn/xiOHL7bfY/33y0D7+ib8eI67frr4Hzn6KZQ7Y+pSu9tfW0PvbsrlYr4nmYC+5ClwREfEuWn5p70T7Y9xj5Os7pKLbAAQB2il/SuA1qyHb539+jS8H37vHux/i9b7pKf756zHi5ueYx/dpgecccOr+LjX0/nYsn7JY/jqHFx3k+4973z1ffIqbeIy793fxGNfx4f+GWHp/2jFuGP36jsMUQbkEAY6qOwREPM/1x5dYTr1/i38f47njPuxz/P0xdub/91lOD9zEz/OtaYE4ZX9dGXp/21bf8D/+cXyuf3Ybv6/XBXy+jz8+RsTNpwEewzvhGHeMfX3HIwyUSRDgVVVV4NWvFt59Nv/P+HAd8Xj3v1Xn/BT3v97FY9zEp4fbjW/7s9uHjefaP/9v9S31z5fvW36b3NjPanrg5uf/i7c70wLt93eaQx1SX/u74Lhmt/GwM+w+i9s/P7xYVBnx+bf3scwCB577H/wY9xn7+k5TVW1JhUZ/dME23a26R4Pmiz1ns/38/XrbfNRw72NnB96377HE778D4Pz9HXwWfetxxEOfuffxwqPnt/8a7hzDkdc3j21734tmvnpt/b5D57rzCGXLR/r6OMZXP/Pc61vBdsjYx2Xbv12t/gN2NNVPCQB90X6Uw9QAe6nEwCWsFyiHIMAOFRXokzZmWgQBWjMaAJxCm1EGQYANpgSALpkimD5BgGdCANAHYWDaBAEASEwQICKMBgD9MiowXYIABwkBQJe0KdMkCCCRA6PSBo1LEEjOlAAwJFME0yMIAEBigkBiRgOAMRgVmBZBICkhABiTMDAdggAAJCYIJGQ0AJgCowLTIAgQEUIAMA5tz/gEgWQkbaAE2qrhCAKJmBIApsgUwbgEAQBITBBIwmgAMGVGBcYjCCQmBABTok0ahyCQgEQNlEwb1i9BICnJG5gibdPwBIHKSdJADbRl/REEEpK4gSnTRg1LEKiYBA3URJvWD0EgGUkbKIG2ajiCQKUkZ6BG2rbuCQKJSNhASbRZwxAEKiQxAzXTxnXrv2MfAMOQrJmiLhp0ZbtuV1dXOv6eCQKVUWGYiqHKYpv9CAv1aZrGfe2IIJCAykKfSgif/uhW2YwK9EsQqIiKwhBqKmfb5yIYlMWoQDcEgcqpJFyqpo7/GMFguowK9EcQqIQKQpeGKE9ddrJ9He/LzxUKpsmowOWuIkIPUoF9DaHKwSm67kynVP5qPrdstHXdEwQqYCEU58r++F728y+R9q57gkAFJGROdWkHWGP5ck3Koc3rliBQOOmYti7p6DKWJ9drurR73RIECicZc8w5HZoytMt1nBZtX3cEgYJJxbxGx9UP13UatH/dEQQKJhGzz6kdlTJzPtd6XNrAbvg9AlCJUzoljWU3Xl7HNtd//R7XnykxIlAow2KsCQDT4n4My6jA5YwIVEThz0WHM03ra22EgFIYESiQ0YDcBICyuF/90h5e7j9jHwDdUOhzaNupXF1dKRMTccq98DdDTqecX86IQGGk35xOCQBMm3vZPe3iZYwIVEBhr1ubjsMIQDna3iujA+0p+5exWBAmqm0AoExtFhVaTMgQjAgUxDeEPISAPIwO9Md1a8cagYJ4XrZ+AkBu7v9ltJHnMSIAE6ETwOgAYxAECqHy1+3Y/bUYMI8291p70J5rdZwgUDAdQx3ahADyaRMGdHKb1JXzWCNQAM/I1kkAoC1lpT3t5emMCBRKoS6bhp1TmCpoT905nSAAAxMCOIcwQF8EgYlTuesiBHCJYwsJtReHuTaHCQIF0lmU6bWGyFMBnEIYeJ26dBpBAAZwLATAqYQBuiIITJjKXAchgL4cCwPakE2ux36CQGF0HOU41hC7l3TBIsL91K/2BAHogUWBDEkY4BKCAHRMCGAMwkA7rsMuQWCi/BWtMgkBjMnjhZvUt3YEAeiIEMBUCAOcQhCAnvkdAYxBmaMtQWCCJPby+EMnTNGh8pepjdl3DTKdfxuCQCF0KNOlUWHKhAGOEQTgAn5PACUTBogQBOBsQgClsHhwV9bz3kcQmBiPDZZBCKA0mcOAOvk6QQBOJARQqsxhgMMEAeiIEEAJlFO2CQITIpFPX3GPCc5u42H1x4/W28PtbOyj6sE8Fk0TzWI+9oEUwZMES9nO9xBBYOIm28EkVFwImC+i+fYh4u7N8y81urp6E3/98q3SMMApsoWBydbTCfjv2AcAJSivcZzF7e83EfEx/rh/evH6U9z/eBX3Yx0WRWiaRseZiBEBuMB0G8s38fY6Ih7/jW+t3r8aWn+x7R9ln8Xtw/6phvmiiaZ5iH2DDbv/7/j+ZrcPzz+z/Pn1toj5zmd/ipuIiJtPB6ZA2p5fLtMtvwytsY2/HTL2cdnKvTfzxfI4H25nr793dts8NE3TLObPr81uH5rlSy/fO28Wyw9sZhuvPTS3s2hitcPd/W39XMv9rV/b/MxZs3x50cz37ePFZ55+fnm3Ust4V+c69jFNYBv9AGyhcE51K7uBXHWOO53p5jZfbHfu0Tx3uC9eX/bzq07/tf1tf9aqI17vv+3+1p31znGvAsfekLInCLTdX/at7LJ+2XmOfUxjb6YGoFqf47erq3hz9xgREdcfvu0dMv/5JiK+fI2njZ99iq9fIuL6bbyJiIhZ/PAuIh7/in8237ixv//dPUZc/xI/vdjF7Kdf4vp5rULb/X335evWDr/9G48R8e6HNgseT98fm5ri1sdwKkEADjjUAJY2r/p0/+PyiYE3d/EYq0CwniCf/RDvIjbm1tfbp5uXn7Jac7DToW7t65+/4jGu45fnJDCLn365jvj4d3w+aX8dGXp/BSutXNMdQWACJO7pqSUEbHi6jx+v3sTdY0Tc/L65qO/j+xePGL7cflt24K338U/89Rhx/Xb1PXv2UyxzwNandLW/tobeX6GyPVK4Vvv5HSMITFTRHQ4TthoSf/7n1/hy8L17vPshXh+Qf4p//nqMuPk55vF9WuA5B5y6v0sNvb8K1B4GtK27BAHYUuVowLPVXH98ieXU+7f49zGeO+7DPsffH2Nn/n+f5fTATfw835oWiFP215Wh9wdlGn3FYvbNKtbpbNWsnF6t1N9+PG7vSvz143VbK+hntw+bq/D3vm+5+n5zP6sV+YtFs9hzDG33d/ARv62nEDb2ufNY4QnnZ9vYqqkLLc9t7GMaeRv9ANJvCuV0tqoav/liz5ns6Sgjmu1HDVc9cKv37Xss8fvvADh/f6cFgd3P3Pt44dHzs623qupCi3Mb+5jG3K5W/8FImj3D0HUMQZdn372IcD/Iq+Y6oe39zhoBeEXWhgEilP8sBAGIw998gF3qS10EAdKrefgTLlX744QIAgCQmiAwIol6fEYD4LgaRwX2nVPJ53MJQWBidEDjcw9gl3pRL0GAtLKmf+iSelQ+QQBe8K0HDlM/6iQIkJJvMdAd9alsggCs+LYDx9VeTzKGGkFgJH69JVCTEjtQbe6SIEA6JTZYNZjdPkTTNPFwe+TvGDN5OtC6CAIQGjYgL399cCSmBsbhFwhBN2qpS9piIwKQrtJDF9SbeggCpJFubcB8EU3zELez7/Pzy20R89VbDr2++znNi235mTv/fzHf+3PPL2//u8tjjHksNo5xaz8MJl09q0RjG37bZ+xjqn1Ld83ni+fzfLidrV6fN8tXF81i0TTNYr56fdbcPixfn7/4jPnGezZ/fud9zUNzO9t638NtM9s6nsW822OM2W2zfPn7cc6Wb9zcl62XrfR6dcjYxzXwNvoBpNsUOtd9kG3dyW505N87ye3X93bUr3zuxvvWnfGq498NBgd+roNjnC+azcAR0TyHhp3XbV1vNXSkpR//pZupAVJoEi8I+vj3541/P339svf1tXc/tHu8b+N9T/fx691jxPWH+PPhIT7dRDze/Rr3T30f4zx+vomIL19jc1dP8fVLRFy/jTftDoEzZalHNRMEgE483f8ad48R19fXEfEx/mibAi4x+yHeRUTcfNpax9DEp5v+dw81EASo3r7RANrbXKzXRHOwh30Tb6/X//0uWg4sdOPj+7i6utqz/Rb7xxTom3pXDkGAlAxntjGL24cmvn2IuHvzonN9/3Hvu+eLT3ETj3H3/i4e4zo+/N8Ay/afvsaX/vfCEepT2QQB4IDVN/yPfxyf65/dxu/rdQGf7+OPjxFx82mAR/i+xb+PEXHz84HHCoFjBAGqZnjyEns62dltPOxMDczi9s8Pcf1iXcDn397HMgsceu6/K09x/+tdPMZNfHq4jZezEbPbh93fbcCg1L8yCAKkYxizrae4//F9fIyb+LReH/Dtbfxxtezk12a3f8aH64iP71/Ox3+O/909RsRN/N73Hxl6uo8fr97Hx+sP8e3FWoZvb/+Iq9+sEBiKelUuf2tgYJkfYxuD6w3DKbm+lXzslzIiQLUMS8L41MPpEwRIJUvChzGoX2USBAAgMUEAABITBKhS5oU/MKZ99cw6gWkTBAAgMUEAABITBAAgMUGA6lgfAOOyTqAsggAAJCYIAEBigsDIDFkDjC/zdIYgMKAshWpMrjFMQ+aOtTSCANUz6gJwmCAAAIkJAgCQmCAAAIkJAgCQmCAAwGA8OTA9ggDV8KuFYVrUvzIIAgCQmCAAAIkJAgCQmCAAAIkJAgCQmCAAAIkJAgD0xiOE0ycIUC0NEEyTXyo0LYIAVdCwAJxHEACAxAQBAEhMEACAxAQBAEhMEACAxAQBAEhMEACAxAQBAEhMEACAxAQBAEhMEACAxAQBAEhMEACAxASBAe37s7j+ah7A+Pa1xVn+lLkgAACJCQIAkJggAACJCQJUIctcHkDXBAGqZSEmTJPgPi2CAAC9EcinTxAAgMQEAQBITBAAgMQEAQBITBAAgMQEgYH5ewMA05fpEUdBgGoIWcA5srcTggAAvcj8F/1KIggAQGKCAAAkJggAQGKCAAAkJggAQGKCwERkf3ylKx4hhGnwxEA5BIERqAwA0yCwCAIAkJogAACJCQJUxzoBGJfh9rIIAgCQmCAAAIkJAhNi+BpgONrcJUFgJObL+mWdAIyj9PUBJR1rVwQBAEhMEACAxAQBUjE9AP1Rv8okCFCtjHN9MDXq4fQJAiOyoA1gHKUvauySIEA6whZ0T70qlyBA1bImfJgC9a8MggAAJCYIkJJhTOiO+lQ2QWBkFgz2z/AkDG/K9c5CwU2CAAAkJgiQlpEXuJx6VD5BgBQyD/vB0NS3sggCEyVlD8N1hvOVWH9KPOa+CQITID0Pw3WG/pVYz0o85i4JAqTnGwKcTr2phyBAKtmTP8A2QWDCJO7huNZwOUG7TILARKhAQClKDc5+kdB+ggDpqPjQPfWqXIIArJT6LQeGpJ7URxCYOJWuH769QHfUp7IJAhOiMo1P8ILDSq4f1gccJgiQlkYALqcelU8QgC0lf+uBvqgX9RIECqAC9ufQtxnXHL47VB9KGQ1Qn18nCExMKRULoGTa2u8EAdIzKgCHlT4awHGCAIRGDU6hvtRFEJigfZXMt9NxuO5kVkP599jgcYIArJgigON0ovURBADYIQDnIQgURMXsn1EBqGeBoHrbjiAwUaVVuJoIA1AvbesuQQCAZ7WMBtCeIFAY30qHYVSAjGoKAepqe4LAhJVY+TLQwFCjDOVam7qfIAAHaDRAPchAEChQhuQ+FaYIyKCmKYEI9fNUgsDElVoRayIMULPaQsAhtZ1PlwQBuIAwQMmUXyIEgWKpwMPybYJMSi7v2sbTCQIFKLlS1sQUATXJMiUQUec5dUkQKJgOaHjCADWotbzWel59EwQKIdFOn0aIErxWTmtsZ2o8p64JAnCi1xoWYYApyxYCaEcQKJyOZxzCAKWpPQSod+cTBApSQ2WtiTBAKWoPAYfUfG5dEgTgAhoaSqb8EiEIVMG3z3F5koApy/CYoLp2GUGgMDVV3poIA0xR5vKnrWxPEKhE5go/de4NY8iyLkD9upwgUKCaKnFNLB5kKrKEgEMynGOXBAHo0LEwIBDQt+whgNMJAoXaV6F1MtNwrLF1n+jDsaBZYwhQl7ohCEAPhAGGdKw81RgCDsl0rl0RBCqjg5kOYYAhZA0B6k93BIGC1VrBa3J1dWURIb3JGgIOyXa+XREEKqRzmR5hgK5lDgHqTLcEgcLVXNlrIwzQlcwh4JCM59yVq4jQAhUuw68QrYlGnHMpO9q7PhgRqIAKUBaLCDmHEHBY5nPvgiBQMR3KdAkDnEIIWFIv+iEIVCJLQ1CTNmFAw4cQ8Lrs598FawQqYu6sXBp7tikTm7Rv/TEiUBEVolxGB1hrc6/V9SXXoRuCQAI6kDK0adTcy7q1ub8ZOz/lvl+mBiq0r9JkbDxKpkPIpW1Hl/Wea9P6ZUQgCYm6LEYH8mgb+rJ2fMp5/4wIVEqCrofRgTq5r+1oy/pnRCARybpMbUcH3N8ytL1XOjtt1lCMCFRMkq6PueRyuXen04YNw4hAMhJ22do2gkYIpuOUe6GT+075HY4RgcpJ1PU6paF0z4fn/lxG2zUcQaByfhtX/XQ40+J+XE67NSxBIAHJOgcd0Lhc/+5os4YlCCQgXedy6tyqcnA+17p72qvhCQJJSNj5nLPYSpk4znXtl7ZqeIJAElJ2XjqubriO/dNOjUMQSEQly+2Sx7EylhHXa3hGA8bx37EPABjGukE9p4N7+TM1N8yXPrte87Xpm98bMB4jAskYFeClLhrfkstO9vOfCu3SuASBhAy/sU/X38imVKZqPrcaaJPGJQgkJH3zmiGGaPsoa6Ued3bao/EJAkmpfLSVee5WfeiXdmgaLBYEXrXdKNccDHRAZGREIDFpnC6UHgyU93Fof6ZDEEhOZaQvUwoIyvO0aHemxdQA0ItjjXqXQUEHAuczIoB0DgxGezM9/xn7AACA8QgCHEziU5rjBcpnNGCaBAEiQhgA+iUETJcgAACJCQI8MyoA9MFowLQJAmwQBoAuCQHTJwjQmjAAnEKbUQZBgB2SOtAnbcy0CALsZYoAuIQpgXIIAhwkDADnEALKIghwFmEA2EfbUB5BgFdJ8EAXtCXTJQhwlCkCoA1TAmUSBGhFGABeIwSUSxDgYsIA5KYNKJsgQGuSPXAKbUYZBAFOYooAeMmUQPkEAU4mDAARQkAtBAE6JQxADup6PQQBzvJa4tdAQN1eq+NGA8ojCHA2FR54SZtQJkGAi1gvALlYF1AfQYDeCANQF3W6ToIAF7NeAOpnXUC9BAE6IQxAvYSAugkCdEYYgPoIAfUTBOiUMAD1EAJyEATonDAA5RMC8hAE6IUwAOUSAnIRBOiNMADlEQLyEQTolTAAdRAC6iUI0DthAMrgtwbmJAgwCGEApk09zEsQYBI0QjAe6wJyu4oILTCDOdbha3RgOOojEUYEGNixhsXIAAxDCGBNEGBwwgCMSwjgJUGAUQgDMA4hgG3WCDA6C5VgGOoa+xgRYHQeLYT+CQEcIggwCcIA9EcI4DWCAJMhDED3hACOsUaAybGYCS6nHtGWEQEmxxMFcBkhgFMIAkySMADnEQI4lSDAZAkDcBohgHNYI0ARLHiC1wkBnEsQoBgaOtilXnApUwMUw1QBbBIC6IIgQFGEAVgSAuiKqQGK1KbD1xBSI2WfrgkCFM23IjJR3umDIEDxfEOidso4fbJGgOK1aQCtHaBUQgB9MyJAVQydUhPlmSEIAlTHNyhKpwwzJEGAamlMKY0yyxisEaBa1g5QEiGAsRgRoHptO3uNLGNQPhmbIEAavnExNcokUyAIkIpvX0yBAMCUCAKkJBAwBuWOKRIESE3DzBCUM6ZMECC9U54c0FBzCmWLEggCsKLRpivKEiURBGCLRpxzKTuUSBCAAzTqtKWsUDJBAI7QyHPIqb+ZUvlgigQBaEGDz0vKAzURBOAE5/xtAp1AHdx7aiUIwJl8K8xBAKB2ggBcSCCoj86fTAQB6IjOo3zuIRkJAtCxczqTCB3KWNwvshMEoEc6mWlyX+A7QQAGcG7Hs6YDuozrD4cJAjCwSzulCB3TMa4xtCcIwIi66LAidFquI5xPEICJ6KozW6u1U3OdoFuCAExQ153dS6V0fK4BDEMQgInrs0N8TZ+d5RjnpPOH/QQBKMxYwaA0On5oRxCAwgkGSzp+OI8gABWqPRzo9KE7ggAkU0pI0NnDMAQBYEffYUEnD9MhCABAYv8Z+wAAgPEIAgCQmCAAAIkJAgCQmCAAAIkJAgCQmCAAAIkJAgCQmCAAAIkJAgCQmCAAAIkJAgCQmCAAAIkJAgCQmCAAAIkJAgCQmCAAAIkJAgCQmCAAAIkJAgCQmCAAAIkJAgCQmCAAAIkJAgCQmCAAAIn9PyqIufFDICsAAAAAAElFTkSuQmCC)

Ex : 2 3 7 _8 6 4 6_ 5 8 8 9

Obs: Orice secventa maxima este si secventa maximala, dar NU si invers (in ex de mai sus, "8 8" nu este maximă!)

Vom numi **"exemplu"** - element ce îndeplinește P

**Idee (pt găsirea secv de lungime maximă)**:

Dacă elem. curent este exemplu

lg++;

Altfel // am contraex - deci secvența mea tocmai s-a terminat

- Verific daca lg este maxim - Dacă da, actualizez maximul
- lg devine 0 (Am contraex - secv curentă s-a terminat)

**Obs:** Uneori chiar contraexemplul poate forma o secventa. De exemplu, pentru P = "**_secvența de numere crescătoare_**":

Ex : 2 3 4 7 3 5 9 11

Doar "**3**" este o secventa cresc => de fiecare data cand gasesc contraex

, după ce "m-am jucat" cu secvența curentă, voi face "lg = 1" (pt ca contraex face parte din următoarea secvența).

Obs: Cu algoritmul de mai sus, obțin o secventă maximală de fiecare dată când dau de contraexemplu.

Obs : De la a la b am b-a+1 nr.

Ex : de la 3 la 7 am 5 nr ( 3, 4, 5, 6, 7)

// 10

// 0 1 0 0 0 5 0 0 0 0

// ultima secvență nu are după ea un "contraexemplu" pt a verifica dacă este maximă

Soluții :

- Pe poziția n+1 voi pune contraexemplu, și voi parcurge 1->n+1.
- După ce am parcurs șirul, verific daca secv curentă este maximă.

Divide et Impera

Q: **_Ce înseamnă_** ?

A: "Dezbina si cucereste".

**_Definitie:_** Strategie de programare în care abordarea este sa luăm (recursiv) problema curentă și să o împărțim în K subprobleme identice.

**_Observație_**: Cel mai des vom imparti in 2 subprobleme identice.

**_Cazul general_** : Împart problema în K subprobleme (Aici voi face cele k apeluri recursive).

**_Cazul particular_** : (Nu are sens/Probabil) Nu mai pot face impartirea, deci tratez cazul banal (nerecursiv) conform cerintei.

Backtracking

Metoda prin care construim soluția la o problema pas cu pas, și eliminăm soluțiile proaste pe parcursul construirii soluției (merg mai departe cu construirea soluției doar dacă soluția mea e încă validă).

| **_void bkt(int k) <br>{ <br>if (amGasitSolutie()) // usually k == n+1 <br>{ <br>afisezSol(); <br>return; <br>} <br>// sunt la pasul k în construirea soluției <br>for (i = primaValPosibila -> ultimaValPosibila ) <br>{ <br>if ( esteValidSaPunInSolutieLaPasulK(i) ) <br>{ <br>//il pun in solutie <br>sol\[k\] = i; <br>bkt(k+1); <br>} <br>} <br>}_** |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|                                                                                                                                                                                                                                                                                                                                                            |
| ---                                                                                                                                                                                                                                                                                                                                                        |

Obs : Dacă soluția mea este de dimensiune N, înseamnă ca N este ultimul pas unde mai construiesc (completez) soluția, iar pasul N+1 este unde afișez/mă opresc.

Citirea și scrierea în limbajul C

Pt citire/afisare in c trebuie sa includem &lt;cstdio&gt;.

Citire - scanf()

Afisare - printf()

scanf(format, deCitit);

format - este alcatuit din mai mulți descriptori

Descriptorul îmi indica tipul de variabila pe care o citesc/scriu

Descriptori:

- %d - int
- %c - char
- %s - string
- %f - float
- %lf - double

Cum citesc un int în variabila x?

scanf("%d", &x); ⇔ cin>>x; (unde x este de tip int)

Cum citesc 2 int-uri și apoi un float ?

scanf("%d%d%f", &a, &b, &c); ⇔ cin>>a>>b>>c; // unde a,b sunt int, iar c este float

printf(format, deAfisat);

afișare - pot pune orice expresie

cout<<"Hello world!"; ⇔ printf("Hello world!");

cout<<"Eu am "<<x<<" ani si tu ai "<<y<<" bani!";

⇔ printf("Eu am %d ani si tu ai %f bani!", 20, 5.49);

**Cum citesc/afisez din fișier ?**

fscanf() // respectiv fprintf()  
fscanf(fișierul, format, deAfișat);  
fprintf(fisierul, format, deScris);

Ex: fscanf(fin, "%d", &nrMere);

Ex: fprintf(fout, "Hello kids!\\n");

**Cum declar un fișier în limbajul C ?**

FILE \* numeFișier;

**Cum deschid fișierul ?**

Pt citire : numeFișier = fopen("fișier.in", "r");

Pt afișare : numeFisier = fopen("fișier.out", "w");

Recursie

***Funcție recursivă - definiție: Funcție ce conține în definiția ei apeluri ale ei. (***Funcție ce ajunge să se apeleze pe ea însăși.)

Recursie

- Directă - atunci cand funcția în cauză conține apeluri ale ei (chiar în definiția acesteia)
- Indirectă - atunci când funcția ajunge să se apeleze pe ea însăși, dar în definiția funcției nu găsim apeluri ale aceleiași funcții.

**Ex Recursie directă:**

**void** **f**()  
{  
// ...  
f()  
// ...  
}

**Ex Recursie indirectă:**

**void** **x**()  
{  
... y() ...  
}

**void** **y**()  
{  
... x() ...  
}

Materia de liceu (și facultate, în mare parte) se axează, în principiu, **DOAR** pe **recursia directa.**

**_Să ne amintim:_**

**Ce se întâmplă când se apelează o funcție ?**

- PC-ul tine minte de unde se apelează funcția
- Se copiaza valorile parametrilor pe stiva
- Se executa codul funcției
- După terminarea funcției, calculatorul continua cu execuția din locul memorat la pasul 1

**_Obs:_** _Zona de memorie în care se memoreaza apelurile de funcție se numește_ **_stivă_**_. În mod evident, fiind o zonă de memorie, aceasta este finită (NU POT SĂ AM O INFINITATE DE APELURI PE STIVA)._

**_Obs:_** _Putem, în mod eronat, să apelăm o funcție recursivă, ce se apelează pe sine la nesfârșit - acest fenomen se numește_ **recursie infinită**_. Dacă apelăm o astfel de funcție,_ **_stiva se va umple până la refuz_**_, iar când programul va încerca sa mai adauge încă un apel pe stiva, programul va "crapa" - acest fenomen se numește "_**_stack overflow_**_" (stack - stiva; overflow - "a da pe afară", inundație)._

**Ex de recursie infinită:**

**void** **f**()  
{  
cout<<"Hello\\n";  
f();  
} // se afișează Hello la infinit

**Ex 2:**

| **void** **f**() <br>{ <br>f(); <br>cout<<"Hello\\n"; <br>} // se va intra în recursie, dar niciodată nu va afișa ceva funcția |
| ------------------------------------------------------------------------------------------------------------------------------ |
|                                                                                                                                |
| ---                                                                                                                            |

**Cum "gândim" o funcție recursivă ?**

- Cazul de bază/Cazul banal
  - cazul/situația unde răspunsul este "banal"
  - cazul/momentul în care se oprește recursia
- Cazul general
  - pentru ca recursia să meargă mai departe
  - aici voi avea apelul recursiv

**Promisiune:** Mă voi asigura întotdeauna că în momentul în care tratez cazul banal voi opri execuția.

Obs : În scrierea funcției prima data tratez cazul banal - de ce ? ca sa mă asigur ca NU am recursie infinită.

**N factorial**

**(vom trata ca un șir)**

f<sub>n</sub> = f<sub>n-1</sub> \* n

f<sub>1</sub> \= 1

**void** **f**(**int** n)  
{  
**if** (n <= 1) **return** 1;  
**return** n \* f(n-1);  
}

Cautare binara

Caz : Am o lista neordonata (alfabetic) de elevi. Trebuie sa îl găsesc pe Popescu Daniel.

Soluție: Parcurg lista element cu element pana ajung la elementul dorit. ⇔ **_Căutare secvențială_**.

Obs: Căutarea secvențială are complexitate O(n).

Obs : Cautarea binara poate fi aplicată doar șirurilor de elemente **SORTATE**.

Obs : Cautarea binara se aseamănă cu modul în care o persoana caută un cuvant in dictionar.

Cum căutăm în dicționar cuvântul **_mașina_**?

- Deschid la jumătate.
- Sa pp ca la jumătate am cuvantul **_cal_**. => trebuie sa caut în dreapta, prin urmare mana mea stanga se muta la mijloc (la jumătate, unde tocmai am deschis)
- Dacă nu am găsit cuv, repetă procesul.

Obs : Dacă trebuie sa caut în dreapta => st = mij + 1;

Obs : Dacă trebuie sa caut in stanga => dr = mij - 1;

| 1   | 2   | 3   | 4   | 5   | 6   | 7   | 8   | 9   | 10  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 3   | 12  | 17  | 25  | 29  | 31  | 34  | 37  | 43  | 49  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

Vreau sa caut pe x = 37

st = ~~1~~ 6

dr = 10

mij = ~~5~~ 8

Vreau sa caut pe x = 40

st = ~~1~~ ~~6~~ 9

dr = ~~10~~ 8

mij = ~~5~~ ~~8~~ 9

int v\[\] = {0, 3, 12, 17, 25, 29, 31, 34, 37, 43, 49};

int n = 10;

int x = 37;

int st = 1, dr = n, mij;

bool gasit = 0;

while (st <= dr && gasit == 0)

{

mij = (st + dr) / 2;

if (v\[mij\] == x)

{

gasit = 1;

}

if (v\[mij\] < x)

st = mij + 1;

else

dr = mij - 1;

}

if (gasit == 1)

cout << "Elementul cautat se afla pe pozitia " << mij;

else

cout << "Elementul cautat nu se afla in vector";

Obs: Dacă în timpul procesului de căutare, st ajunge sa fie mai mare ca dr, pot spune că elementul căutat nu exista - **_dar, dacă l-aș insera, aș face-o pe poziția st (sau pe ultimul mij găsit)._**

// x - valoarea pe care o caut în v

int cautaBinar(int x)

{

int st, dr, mij;

st = 1; dr = n; // vector indexat de la 1, cu n elemente

while (st <= dr)

{

mij = (st+dr)/2;

if (x == v\[mij\])

return mij;

if (x > v\[mij\])

st = mij+1;

else

dr = mij-1;

}

return -1;

// pot returna -st

// dacă e negativ știu ca în cazul cu -1 că nu l-am găsit

// dar, obțin totodată poziția unde ar trebui

// sa fie inserat

}

Varianta recursiva

**int** **f**(**int** v\[\], **int** x, **int** st, **int** dr)  
{  
**if** (st > dr)  
**return** -1;  
**int** mij = (st+dr)/2;  
**if** (x == v\[mij\])  
**return** mij;  
**if** (x < v\[mij\])  
**return** f(v, x, st, mij-1);  
**return** f(v, x, mij+1, dr);  
}

Baze de numerație

**_Def:_** **_O baza de numerație b_** este un mod de scriere și interpretare a numerelor, astfel încât pentru notarea numerelor **_se folosesc b simboluri_**.

Obs: Prin conventie, înțelegem prin baza b un sistem de numărare cu mulțimea de simboluri 0, 1, … , b-1.

Obs: În viața de zi cu zi, folosim baza 10 (doar simboluri de la 0 la 9).

Obs: Dacă b>10, pt simbolul cu valoarea 10 se folosește 'A', pt simbolul cu valoarea 11 se folosește 'B', etc.

Ex: Baza 16 folosește simbolurile : 0, ... , 9, A, B, C, D, E, F

Obs: Baza de numerație cu cele mai puține simboluri este baza 2. (nu exista baza de numerație cu mai puțin de 2 simboluri).

Obs : Se observă că o cifră cu cât este 'mai în stânga' în scrierea numărului cu atât are 'semnificație' mai mare. (și viceversa)

Ex : În baza 10, cifra miilor are semnificație mai mare ca cifra unităților.

Ex : 75689<sub>(10)</sub> se citește "75689 în baza 10"

Ex : 3489<sub>(10)</sub> = 9 \* 10<sup>0</sup> + 8 \* 10<sup>1</sup> + 4 \* 10<sup>2</sup> \+ 3 \* 10<sup>3</sup>

Ex : C63B<sub>(16)</sub> = 11 \* 16<sup>0</sup> + 3 \* 16<sup>1</sup> + 6 \* 16<sup>2</sup> \+ 12\* 16<sup>3</sup>

**_Conversia un nr din baza b în baza 10_**

**_//(vom face alg pt b <= 10)  
<br/>_**

**_int conversie(int x, int b)_**

**_// primim nr x în baza b  
{  
int rez = 0, putereB = 1;  
while (x != 0)  
{  
rez += x%10 \* putereB;  
putereB \*= b;  
x /= 10;  
}  
return rez;  
}_**

**_Convertirea un nr din baza 10 în baza b_**

**int** **din10inB**(**int** x, **int** b) {  
**int** rez = 0, putere10 = 1;  
**while** (x != 0) {  
cifra = x%b;  
rez += cifra \* putere10;  
x /= b;  
}  
**return** rez;  
}

**Metoda 2**

**int** **din10inB**(**int** x, **int** b) {  
**int** putereB = 1, rez = 0, cif;  
**while** (putereB < x)  
putereB \*= b;  
**if** (putereB > x)  
putereB /= x;  
**while** (putereB != 0)  
{  
cif = x / putereB;  
rez = rez \* 10 + cif;  
x %= putereB;  
putereB /= b;  
}  
return rez;  
}

**_Convertirea din baza b în baza c_**

**Convertesc din baza b în baza 10, iar rezultatul în convertesc în baza c.**

Operații pe biți

**Link util:** [**http://campion.edu.ro/arhiva/www/arhiva_2009/papers/paper21.pdf**](http://campion.edu.ro/arhiva/www/arhiva_2009/papers/paper21.pdf)

Obs : 100…0 ( n zerouri) este b^n (unde b este baza de numeratie).

//9999….9 ( n de 9) este 10^n-1

Obs : 11...1 (n de 1) este 2^n-1

Obs: 10..0 (n de 0) este 2^n

Obs : cea mai mica val pe un byte este 0 (cand toți biții sunt 0)

Obs : cea mai mare val pe un byte este 2^8-1 = 255 (când toți biții sunt 1)

**_Shiftarea la stanga (<<)_**

Sintaxa : a<<b

Efect: Biții lui a se muta la stanga cu b poziții, iar în urma acestei operații, ultimele b poziții sunt umplute cu 0.

Obs : Cei b biti cei mai din stanga se pierd (cand lucrez cu 1 byte) (cand lucrez cu 2 bytes, biții ce s-ar pierde în cazul anterior, se muta la stanga pe byte-ul următor) !!!

Obs: cout<<2<<3; // se afișează 23, NU 16.

(pt a afișa 16 aș fi putut scrie cout<<(2<<3); )

**_Shiftarea la dreapta (>>)_**

Sintaxa : a>>b

Efect: Se muta toți biții lui a la dreapta cu b poziții. Primii b biți de la dreapta (dinainte de shiftare), în urma shiftarii se pierd. Bitii necompletati in urma shiftarii (cei din stanga) se completeaza cu 0.

Obs : a>>b ⇔ a/2^b

**_NOT binar (~) (bitwise not)_**

Sintaxa : ~a

Efect : Pt fiecare bit din reprezentarea lui a: dacă bitul este x, acesta devine 1-x.

Pt reprez pe 1 byte : 2^8 - 1 - a

Pt reprez pe 2 bytes : 2^16 - 1 - a

Pt reprez pe x bytes; 2^(8\*x) - 1 - a

**_AND binar (&) (bitwise and)_**

Sintaxa: a & b

Efect: Rezultatul este : pe fiecare poziție se face AND logic între bitul lui a și bitul lui b de pe acea poziție.

**_OR binar (|) (bitwise or)_**

Sintaxa: a | b

Efect: La fel ca la AND binar, doar ca fac OR logic intre biti, nu AND.

**_XOR (binar) (^) (se pronunța "csor")_**

Sintaxa: a ^ b

Efect: La fel ca la AND binar doar ca aplic XOR logic și nu AND logic.

⇔

Efect : De pe fiecare poziție se aduna biții și se memorează doar ultima cifra (din adunarea în baza 2).

| a   | b   | a^b |
| --- | --- | --- |
| 0   | 0   | 0   |
| --- | --- | --- |
| 0   | 1   | 1   |
| --- | --- | --- |
| 1   | 0   | 1   |
| --- | --- | --- |
| 1   | 1   | 0   |
| --- | --- | --- |

Struct

**Caz:** Am de creat un program unde memorez **înălțimea** și **anul nașterii** pentru elevii unei clase cu n copii.

**Soluția 1:** Creez un vector cu n elemente de **tip double pt înălțime** și un **alt vector de tip int pt anul nașterii**. => Dacă trebuie sa memorez k proprietăți pt cei n elevi ⇔ k vectori diferiți ; de asemenea, dacă șterg/inserez un elev, ștergerea/inserarea trebuie făcută în fiecare din cei k vectori.

**Solutia 2**: Creez un tip de date care înglobează toate proprietățile unui elev. Din moment ce acum am creat un astfel de tip, e suficient sa creez un singur vector (va fi un vector de elevi - fiecare element va fi alcătuit din cele k proprietăți).

Obs: Proprietățile se vor numi câmpuri (eng. fields). ( La fel cum la un formular găsim exprimarea "Completați câmpurile de mai jos...").

O structură (sau "un struct") este un mod de a grupa mai multe date sub o singura denumire.

**Sintaxa definire Struct:**

**struct** **denumireStruct**  
{  
tip1 numeCamp1, numeCamp2;  
tip2 numeCamp3, numeCamp4, .....;  
};

**Exemplu de definire a unei structuri:**

**struct** **Elev** {  
**float** inaltime, medieScolara;  
**int** anNastere;  
};

**Observație** : Tipurile de date predefinite ale limbajului se numesc **tipuri primitive** (int, float, double, long long, short, bool, etc.)

Cum declar o variabila de tip struct ?

Sintaxă : denumireStruct numeVariabila;

Exemplu :

**struct Buletin {  
bool sex;  
int an, zi, luna;  
};  
struct Elev {  
int clasa; // valoare între 1 și 12  
Buletin b;  
float note\[3\];  
};**

**// declar variabila Ionel de tip Elev  
Elev Ionel;**

# Cum accesez valoarea unui câmp ?

Sintaxa : numeVariabila.numeCâmp

// vreau să memorez ca Ionel este în clasa a 11a  
Ionel.clasa = 11;  
// vreau sa memorez ca Ionel este nascut in 2000  
Ionel.b.an = 2000;  
// vreau sa afisez prima nota a lui Ionel (pp ca e indexat de la 0)  
cout << Ionel.note\[0\];  
// vreau sa citesc clasa lui Ionel  
cin >> Ionel.clasa;

**_Obs#1 : Pot avea un câmp de tip Buletin în struct-ul Elev doar dacă struct-ul Buletin a fost declarat înaintea (mai sus de) structului Elev._**

Contraex:

**struct triunghi {  
punct v\[3\]; // EROARE - 'punct' does not name a type  
};  
struct punct {int x,y;};**

Obs#2 : Pot declara variabile de tip struct între "**}**" și "**;**".

Ex:

**struct Elev {**

**float medie;**

**int clasa;**

**char nume\[40\];**

**} clasa9\[20\], ionel, Maria, Andra;**

**// ⇔**

| **struct Elev {**<br><br>**float medie;**<br><br>**int clasa;**<br><br>**char nume\[40\];**<br><br>**}; <br>Elev clasa9\[20\], ionel, Maria, Andra;** |
| ----------------------------------------------------------------------------------------------------------------------------------------------------- |
|                                                                                                                                                       |
| ---                                                                                                                                                   |

Obs#3 : Pot declara și structuri fără nume (singurul mod de a declara variabile de acel tip fiind ca în Obs#2). Aceste structuri fără nume se numesc _structuri anonime_.

Ex :

**struct  
{  
int x,y;  
} puncte\[1000\];**

#

# Atribuirea pentru structuri

Efect : Se face atribuirea pentru fiecare câmp.

**struct** **Elev** {  
**int** anNastere, lunaNastere, ziNastere;  
**float** medieGenerala;  
};  
Elev Ionel, Maria;  
// ......  
Ionel = Maria;

⇔

Ionel.anNastere = Maria.anNastere;  
Ionel.lunaNastere = Maria.lunaNastere;  
Ionel.ziNastere = Maria.ziNastere;  
Ionel.medieGenerala = Maria.medieGenerala;

#

Swap între 2 structuri

Obs: **Pot face swap dintre 2 variabile ce sunt structuri doar dacă sunt de același tip !!!** (ex. pot face **_swap(a, b);_** dacă a și b sunt de tip Elev, dar nu pot face swap-ul cand de ex. a este de tip Elev și b este de tip Buletin).

**Efect : se face câmp cu câmp (în același stil ca la atribuire).**

**Ex**

**// swap(ionel, Maria);**

**Andra = ionel;**

**ionel = Maria;**

**Maria = Andra;**

Pointeri

(din eng. "to point" ⇔ "a arăta cu degetul")

Obs: Fiecare variabila are în memorie **o adresă**.

Obținerea **adresei unei variabile** se numește **referențiere**.

Obținerea **valorii** de la o adresa (pointer) se numește **dereferențiere**.

Pe scurt :

- \* - iau valoarea (dereferentiere)
- & - iau adresa (referentiere)

Operatorul de referențiere - &

**Sintaxă: &variabila**

**Efect: se obține adresa acelei variabile**

**Ex:**

**![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOQAAAC2CAIAAABGc7YmAAAQAElEQVR4AexdC3hU1bVeJ0AmkGh4mMR+CUUJGCghKFLkDQakBYOB22uArwYqWiwW5VYq8XFF1GvVVGmLKFV8QfCjQGlAIlUkFJCXGFCSUEMFBEk+DRFIICGZBDL3P2fP7Jw5c+bMmclMMpPs8c+etddae+211/6ZzMzx7ITZxENUIEQqEEbiISoQIhUQZA2RjRJpEgmyChaETAUEWUNmq0SigqyCA0FcAefUBFmd6yF6QVwBQdYg3hyRmnMFBFmd6yF6QVwBQdYg3hyRmnMFBFmd6yF6QVwBQdYg3pz2mJrRmgVZjaojbEFVAUHWoNoOkYxRBQRZjaojbEFVAR/IeiL75lWSBGzIPhpUaxHJtPEK+EDWgFbkxPKROVLE2oU76gM6jQgeihUIMrIeK121r5Gs9fkFZ0KxmiJnHypgfogPZE1c9OVsmw24e9EA8xOZ87xiazDnKLzaYQV8IGs7rJJYclBUwDRZC/6VEoUPVU64OfuEziLO7JvWdbXyCUx2nrGy5N2FucmxOYomJzY5d+H6UzWkeZxYPm5NBD60JZ8+oliOZO1R/OUITIgaubsZH+e2zYuS+CPlxWJlEqLiF1O4Voqat82u1j4V/om6RpAUQWnvaE2i34IVME1WX3NaN/ezOUsvHq1oVAI0Vhy9uHT67qT7C8qVfks1E1dUf78pM8Yy5IlPv7cVPpZsnzf5sUKbrKeYzE3fV6+YaFdrn5Y9TlVWIit9+CBt1RpFv8UqYJqsQ24vrMb7VAWbrjPKr+eI3MpZNpWPJSlmXdHUOrzNrZ6w/YlIC9nK3i55dHOVKkji/J33yA7FvQYp2kEvjVLeFivTYaBtdvXeMc17hxyXvvLw+/1XTkjLLgTxlFmIyjfPGjj1o59vKlqdHmdXiaegrYBpsvq6AsuQXgePTM5IjrYgQmT8+Of7zu0G6er6jV83cQaKFoAl4Rcrt/+l+8tDRzG+ln/y8NjpH43K2bvSA1MffoHk9C105+s0uQUSbetT+Lq+gJM143/Hpcg85QlGJfxYlq2F1cfl55b9saQ88MH2Z2nxiNTs9X9Im/JOjxe2r72nr1N+Ogml/I4q68hWR3lzdKxC1VIVCDhZW2ohpuexpCzas+/RqqzpT9Y+vnvH75z/JZmOIhxboQLtj6xkLXz9oT8eTxqYdPy1P3/Usp/zWmGD29KU7Y2s1q/XzJzw+Lk5W3YV7toy4+D0gbM2e+Cr9RPqLpEERNAbJ9vS3ofcWoKMrB2lTkoJz8tfFSmSX5vyzb8embnn5+t2LbsjjuLuWLZr3V07fnnr/YZ83buFLihJDFpMv+qtSKJpnQoEGVmTrr8zUS7EmXXf5p26LEtUf6Hs1P4NOzOH4KpBzsjlepchFD+PTfnm+2+d7vw1VVz6W4feT/1getqTe9y+vm5ao0SOoaULydMnMcVTNK4V8I/GHFl3b+8d1XQxSZr6A5vc+TpTTtqq72Q9u4Ll8MmZukqKWPvYbsWyanOUtCfLfpHqdLKU0/upItnQ9JO0YFlsPDhxonzKjRuUa1druyfsGpFxes2hq835qqt8z5Np0z8Y+tZe7ddUul+/NuWzg9Yor6uZKykVaTUZhNTyFTBH1hbMq9vkSce+7PdIaueYSDarFB0fPuyu2MWv3Vx0fvre+coLL7OYbnGx9frRfyiwVuRm3hQhSSOXO956nlw+UpIiev53ToW1IGtQRNeHdmhiHsiX3wNYbqcl6RqL6LZ8BcyRdcyEk/zyla3pqpLzRabMvNk/khfArmCp3epmvjhGscxOr1brbZknnxsoG5x/Ivvd9kp+xln7jLMqS2fu3zzpmQcHJXcLd3Y028PFVpvqsXe+461n7/l7VXpb5aupmpBbcmTFs6+SY4TcFT+tVAFzZG2l5Fp/2vPnqf/TtKB5F3pbfxltJANBVsONXFFN/14iPlcZ1qjljIKsLVfrdjVTIBYryBqIqoqYAamAIGtAyiqCBqICgqyBqKqIGZAKCLIGpKwiaCAqIMgaiKqKmAGpgCBrQMraHoMGfs2CrIGvsZjBTxUQZPVTIUWYwFdAkDXwNRYz+KkCgqx+KqQIE/gKCLIGvsZiBj9VQJDVT4Vsj2Faes2hTtajyzdGSasTFh5pzm0ELV10MZ9vFQhxsp7atqq6hmxl+Rda/MSMCxXk1T8Qb/192882PSrEyXq1oRXOc60poYVj6Mbb6DNz1PDW30NUK22cp5xqKFHXIZQ+nF4s8DCirZhDnKwtvA3WUsqeRvET6JpFVHaSlHt1jFLw1t8olsP2xiT6ZQFtLCFbHX38W0q8h+7RuTXI4d2mnr0k6+WSvJ0PjF+f4DiANSp2/fgHduYVf5X909VRKfkHNL8YreWfv5ufPnxt1wjl3tio95PH/zM7z/l4Vs2ds7McLxMaveT05zaOLv+HElN9q6wyheRoozYub8Z5rq57XEPr51FcMn1zFxWfoCVpZL+f0dWTabz1Z6M8tkdpxb/olXU0/gYiC912Ly39LSW43na7rU2eR+sFWcuLl4zc2H/K6Td31JZV2VhZaypqd7x5esrAg1kFtpqi87tV7xythXvSEj8eOqf0gwP1VVbFvebK0R1ns6bsikvZ9s/SekUVAo2VdmVT73hafSN9WUYr7tUjh3oZ3vqrx3qUL9F5ouhunvwmBug8Wk/zBtZulqzW49lph5/Z10gUNvA3ffcdV45brZt6fF/f+5Ik1xSthTtHDT3xYZmNLBH3vfPT4+dn2myzq88O3/J0dAxRTdF3kwd/Yj8HxX7n7IBMTRS7fnbxS100FnQHzP+vyrrZNtuol+znufYqtqGrQvUv5vvhNr+S9ZTSgx76hj74hvIW0Q0eXk7JW38sxTvcQpmJ9I+PTQzSPRChPKTPozVJ1kMvFOC1k0ga8tLwz1eMGJ4on1dKlujE4SPeKrkz5y4NX0vf+59vC/Bqaol8ft+Ut+79SaJyE3VkzE1pS6YWbboOfKWKH+59tEA5P4KC8lG6i9ISaMJqerWECldQsqcXM2/9fVy0hX6/jPa8SGbe4rS582jNkfXIqmWgHlFi/F8X9bFo69zj7gXXx1socmD3MX0U26Fjf/yX/D6h58P9Fg7Wvi7GpQ9bqpD7Qk7Zh0HK1o0zqOc4uv5NKs2jsQnKmgwbb/0NgxkZrV/T/71Cl4/QQ28YuXFb2zqPNoyvy0A4VrlfYVXP6T+6Vc/NkjqxtG52deH4YQqRzxRcVE6k6jD158mKQjOmx513Ryuqqp37leega37xNzqzk76fS72n0a5Sz+l56+85op6HtZBGDaTdw6gYr6tP0cZyxclKsyJIkoj/VQ9F29S0ofNoTZH1iv2vU3VXfvk31cGNdLHqimIJv97N3x7o0plNa6tvhW9JldQ8NwljKa+Uts6kh/pRyjwqqfEwxFt/D+H0zLlL6MRUynuebvgJvfo4LXhSPtrIupvyiNaeJ/5XPbRD2855tIw12vVp+n269FM0R/aeVV5hlY77ZsCQa7rJ1tqtn+q+KtXvzmd//CLyFhZXdg7On34ZVHiOXr2RJsdTWjaVKm+GDFL11t8glKtp+1aaeDexP9Qx4EF6sICe3kG5K+hyBk1TCu46hJp9Hq1OzFZTmSKrJWnqNOUj1AelKwp1v3KqL924NSHCcSLlyB/PU85P27vwQLaLf/nmT3654ioWbLn9+vQkPDOEhbN3DPWNToSwlh897KRg3o62Q6dOini+4ZLyHIjGQmMX0ckymvUNJcfRvPV0wSAhJOCtP4aYQ5cuVFvrcLXQwr/S1hn0cC49toBY7Rw2/lzets6jNUVWip7xXK8hckEuPzk0d3r2oS/K7N+cEl2uKPn3u/M29fvvijJr475PlJdey09+vywmBiWz1mQNzb3/3X+fuCBTvKbiP3lLNt86/YcKmCyRz/55qOq4s8QJk5V/D9u+W11yGXbZOTsvpcdH09fJzIZGDzeMuVNOi86cy8krY7+prRfKS/YfzM78e9eIVc37S29OE0ZSxgoqL6Yb19KNiZSdT2w2Jx91x1t/9Vg38pQZ9PEGKndYLcMoayBV3EULdD9IUHmbO4/WHFmJBozdua/3xBgia936rOLBCZvkvwco4XLRhtj+n8/5ay22zhLfPeflW9nvo26TJxd9mjACX0ta696e83mf7mslaVVU7P4pz1SWWckS3/WvB+9alKI+FBD/Hm6Q/S9Uzu0vH8wqO2edK0Jc++ZczkpeFdV7u3LQq12Fp1sX3PSbeLDc+vqU7VFyPqsiun/Uf8RXWWtq+L8nuPkJlgRalEtl26n8GYofR8c8hfXW3zjeHU9Txn4aez8V481YDW15mB4qoqT99B4+b2lHtsnzaM2SlShy8OiPv5mw752Eu4aFx0eDH6w+7PjU61/aMuq7E1Pu6dvEv7hR4/eWw/9HqQPC7R/MIjv2GtZD8Ux/wImpSqgBY3aUDH5pagRztkSHD0iNhfOB57soZjdNt8Erjo1Z98i1A2LsS8HAXsO6/npx7/yiqeea+5fedCeN7Eev7KZvcilJ1+yi9NbfJYBDEUcrD9OcczSsO0lRtOAo5R6mXUvp8WT52wB+6CwRLra2yfNo7TvsKIeH58j44feO37x/ZmnlLFyRUjBLOT71Z4vSErspv5CdIsj+E/OLZypXm2bbqn95an+avqcyzJIwcFHudOZcVzmzOH8SnG974m5lotloq09OGKN4OjWRN2S8Mq34bCYcAAw8tT/9zWdGp7I/FOfk6sdON/Y7xHREb/11A7OX6mob2Wx0Mp8mJVDcPVSndPmhs0S42GpTPdrMebTekVW3gELZdiogn0cbvOfRCrK2Hab5YSXBfR6tIKsftliEaJkKCLK2TJ3FLH6ogCCrH4ooQrRMBQRZW6bOYhY/VECQ1Q9FDPUQoZK/IGuo7JTIkwRZBQlCpgKCrCGzVSJRQVbBgZCpgCBryGyVSFSQtV1yIDQXLcgamvvWLrMWZG3tbS+vrcm8WBVRVSVVVcVevPRaLbvbsrXTCsb5g42sJ5aPzJEi1i7cUR+M1fJ7TuWXLw2svzqwU5dz0dG2a6P2d6RX62tmXRZ81a10kJH1WOmqfY1krc8vOKObbttSWqvTGmz/E3HNos6dIrEyqUNil2t2dQr7qKF2q8F9Z/BspwgysjpOKGgPu3H1b/VXT4R1WmjhtwjJq47r0mVZWOMTtcZ30Mqe7e8nyMjajjbAZt3aKM3r1NnlZqAOPwsLO9LYcMC/tWgL0UySteTFlBxJuXmUtTdnn6Casv3vbhuf/L58U2nEmpum7dzD7xK2V6a+9PN9T6dvTOi6Whm1umuCcpqrcqu13cX+dGL5uDXy/bLJp48omiNZe5Qhq3jL76re/dTf5BkdyczarAwg0uilm3eqbvr0Jv8z+6bZE5Znn7Gy5N2FucmxbPk5scm5C9c7HzBLvj2sjTtJGhqhM7hbB6mnrfFIg46JqQr/RF0jSIqgtHeYop20JsmqeemmfAAAEABJREFUrca37xxK6LF9xJzvdhy9It8tbb369abTowd+aD/GEu41x15L29hn6NfPflDtOM3VVlWmnOba/+/97j/4dav+nvOcP5agYN3cz+YsvXi0olHpNVYcvbh0+u6k+wu0/zAVszdNo83t23KJuhNVsRn1Qi57nOT7zK304YO0Vc+hjepMkrXfY4XKzaPFvdh5qBeO1ZbJbJOS7ut78MzM7x3HWGZvUA4Msh7PHvfZ/A/r4RI5MHbd4SnVttm2ptNcbcfe/mrkbw9faKpp4vyd99TBxxF/0EujbOiqUO24q3rMczPkaJu052jZ9fzI1qbgkLzJv+eI3MpZNlV8S1LMuiLlQNrqCdufiLSQreztkkc3VyGuQEtWwCRZ9VKyRDy09WdH3hrx04TwuPRhK+8Lj4zvPn+yfEDkoRcKsgpsGGMZ0mvf55Mybukuf9hlp7keGvxoIixU8fZXT+9o1e+n3Ocv5+f4wRIOHpmcwW7rjowf/3zfufI92FfXb2y93w0Pv0Dy4QoWuvN1muxItB08+0rWmG45RdOWTYpzfDzokf7WzOrSKTN7o2aO01ypy7PvjUtxeMAgIzL5uRWx8nbTlTffK8RLr6xs+R+j/J2yyfhfzRKiEn4sO1gLq4/Lz63xk/I7qqwjWx3lzWmN6VttTh/JOuj3A9Snrzil7zjNlUg+8Yd/QuJCxMSz7A1AK+63Uf5OiwnhTttL3Uey+qcQVxrb8XffHaQBRJfcFACXsKJbdWv8s8F+jhKAiiR1Ha78midL15zv5UN/NB+VmrrFqSl+Xk4IhQsPG0yNB/XetV+4YjsqhQ3qpL8Y6yfUXZIPt5Ii6I2T+j5tVBsAstKg2Q8rb1StlY886uVXPB0ltkXn5a9mDEveSVLmoPorTvttLf3h8LeGA4PFKHX+VRitueJ6qerqh42NiWEdh7lJdO8WYu+iBi2mX8kfEdz4tUF1IMhKtz7e/5F4CdWqyDk68Gf5eV+cr0GHSDk69dB72f9ULiWsTpin/vZK8Ui6/k7lu4Iz677NOyUf00pUf6Hs1P4NOzOH4KqB47Ri+A7vPllh67bVB5Uj1C9XfHEoO3N9j54l69hewie4IaV27ji68coG/MpXJWqtq13SGLasc4RK5yRuWqN0Y2jpQlIqoHTbRWOKrGdWbbZfNEp2c4Up6m9PqQ9OtQx65dDgp0fIwSu2lU4ZvIUNV45OLb4366xyKcH2w8naam2RkxYsi43HHpwon3KjfEyrJK3tnrBrRMbpNYeuOn110G3Ycy9H4RuxCx+c6B+FS00bYgcXZ62Rz4m1hzxyOlnK6f1UEbre5c+uYE39AQOBnKmrpIi1jymrU+LsybJfZGuKDzef0DHyzU702OVL6+vZ2mwX6mruqm+cGxE1uYObgDtojfJvMXMlpaJMbrzaqFrmU0CWFpe8ZO8vvtrSa25qZ9VprmExvcIHpPb49eLeefsmnPt4ZE+XubtNnnTsy36PpHaOARNlKzsANnbxazcXnZ++d77ywivracD8KSU7e03t20HZNLh1Tp3ba0vR0OfZdQvFJ9ibuC5RBzpJa+uqo+X/n/ViUn3jfZaoRc7/a4t6DQfy5fcAlttpSbpabZfb+pMpsvacnS5fNLK5/7RUPeM5nYNTu/RLG/dGfobqNNfMs6dmFuenvfnM6DuHx9vZSNpHZL/bXsnPOFvNpmMHwE565sFBycqfflN5hyeMHZf7H+XSlw1uGflvjEtL7v/El2wg2syTzw2Ev3f5sytY6sXWzXxRWZ1LHHt8TOEzpITOUbnXRtdFR9uio89ee02GxWhLtuTIEz37KrWvN6vyovFjVBmYBYKrAsF9fmqgayXIGugK+zV+cJ+f6tel6gQTZNUpilAFZwUEWYNzX0RWOhUQZNUpSuio2lemgqzta79DerWCrCG9fe0reUHW9rXfIb1aQdaQ3r72lbwga/va75BerSBriG1fe05XkLU9736IrV2QNcQ2rD2nK8jannc/xNYuyBpiG9ae0xVkbc+7H2JrF2QN+g0TCToqIMjqqIR4DvoKyGRdLB6iAqFQAZms+Bf1nHiICgR9BexkBV8FRAWCvAKCrEG+QSK9pgoIsjbVImgkkYh+BQRZ9esitEFYAUHWINwUkZJ+BQRZ9esitEFYAQ9kvWXwkHGpE8zglsG3BuHyREptqQIeyPr4k0+9vPQvLy/9swv+8sqfZDyStfiRRU8Bjz72ZFuqi1hLEFbAA1m7Rl+b3L/PgH59XdDnJ0ky7hh72x3jhk28fVjMdT2CcHmhkpLI00wFPJC1Q5h06vTZv7y/d9naPa+u+3T533e/nrvrm5NltTWXKsq/By7XXMr5uHD1R4XGk9kcD40b1MYaVweNv8euuwjQM/AI6HIZgmsXGgAmgAuQGaDhYJrgb5FwIJL0V1hNHA9kleRHh1NV1acuVX9be/GMtaq0obKh4SrZnP7+XYdwp65m/ZhSDqP8QFZbodNo1Fa/yLpTYFLoGSB7nAg+zBktZPhzATIHlAzMh+tbXXCXD7J1Z2pOzq5hvZqFO2vieCDrlasyC2Ous0jhDVUNFyvqzn1fe1ZZhmQjsuE/oohudV2uY+ewKxbnBhNjSq5Ty1zZwoK3KXnrj+VgmRgFQcCPFfBAVjbTv8tLv6n8rvJKZS1dqpfY0eoyVyWS4BDZrbpLFFOiZxY+7CWGAHwCyIC6C5lrIADQBAOQCYM6GaZBy5RcQJfLTEALQA9AACBwoAuou5ChASAATEALoAtAACC4gunRAtzKZNZCCQGAwIEuB1dyASbIaAEIAAQAAge6ALq8ZQI0HKbIWkc1nTo3dIxo6Ghp6BTB/jqKJClMRaB+1/24T9em09Oh8QqSJLmm5RoBPvAEmIl3ITANWsjMgQlMhh4CNBCaCQRhYHFMhsUQeDJAZmMhMA1apnHXck8IAPwBCMwfAroABKZBCxkaAAK6EFjLBCghAFACEKCBwIEulAAEjRJdKGECIKALQECXAV0GdKHnMgRoAAjQQwAgoAtAQBeAzFsuwAo9YIqsHTuDow2dLPUywmWysjcAGA/06dYbgOAVWCrmh8CfJ81GoQswmbXw4YLGxPTNbBEfaGYQ+3DTT+oZ1TIPgJUCvAtB1w16Blg1/kzPWzhwmQtqJYYD3OSDgOEAH4jg6i7XawRTZAVHO0bITA23WDsxsuJdAItko4YrV2pr61jPt9Zkrho3dBl0J4VJvX5NV3eID8oAhfUqE+TAYH4U/JtTHAxnMJ4RPupZ1M4wMXAlugbOzOSJrJJktdYOvS5xSNe+g6+96ebI/oM6D4CGz4EojVevXm2UP4dxpVrQJAF/ZuUC67Zk6y4ldzlo/N25qfVYHUapNeZljDXvHFSegc7cA1kbG239k3r+JnXCA2Mn/nr0pPtHp88ZmQ5NZGRkbGxM9x7dO4WHg6lhYZJB1bBtWAYDZANPmODAPFmLLpSApgs906CFVQMoAfho9LwLExwYIDM9BKZhLbpMjxYyU6KFDI0uYGVQ+0BmSrSQ2UAI6DJoNDAxjZkWziwIWgN/7gYfeALQQNYFrAy6PlAyK1o2nGsgMI1rCxP8AZi4zLrQQACghwxAQBeArIYHshYVFe78dP9nh4o+OyzjQMEXBwqOHDhUuO/g4f2ff/HZ518cPPRlwRdFQHGR/OfR1KHVMqZn4Ep0uQwBXZ4cZA6YGJiGyaxlGrS8ywS0UAIQ1ICGTwE9ugyQOZiGtVzJBKZEy7q8hYaFhcDBrUzQ1bsqmQZDIKAFuGAsww2AD8AFV5mZ0AKwqgENWwWUkBkgM6DLBNaiy8C6aDVdaBig14TlepgAdZfJrIUJYDJayIjjgayPPrLgjtSxrhg/bvTtY0aOv30MN/1uwXwEbQ6QUHOGmxkboCkCFNbMivzoE6BV+Css4nggqx9r0e5DtdkC4DWPA5QK3DoFWQNX25CM7APbMIQjoGsWZA1oeUVwf1ZAkNWf1RSxAloBQdaAllcE92cFBFn9WU0RK6AVEGQNYHlFaP9WQJDVv/UU0QJYAUHWABZXhPZvBexkjRIPUYGgr4CdrP79FyCiiQoEogKCrIGoqogZkAoIsvq1rCJYICsgyBrI6orYfq2AIKtfyymCBbICgqyBrK6I7dcKCLI2q5w7HY9mRSFyhHF6No7p5OroGA8JdatbsjqWb38OxDrtoVVP7mZRuRiJ7oYzPR/JugYt9+SCgXPzTZjF2yBeDYGzBgbTaTxZ18C/JU06ZNXNT1fpc6LuokHvc0yDgQgLGDhwE9wA3uWCrlKxNrfhkce5PNyFNj8EnoBrHF0l3Az07kwY1WLQklWdE68ez0Zt5UpvBR6Ex4fAg3Ar10CAgwHg4A6IBsCK4WiNwTzhA2cOdBm4lXX90vKYmM5kQPNDuCciIz4HuoDaii4Hd+MCN7W64ERW9QKQK09OLat9uINXAovGWj5Q3fVtCnUEFpbHcTUxB03L3FjLTeouD8itISGol4CEedd1OdwENw6udPXnPi0jOJGVT8nzM9Bwkw+Ca3wE0VVCbwx3FeR6r8LqOusqjbNqdatvy2/1tI0T0Cer8RhuRUU4uFItcCsEtd7vsiufmIa1fp/OXUAsUw13bq2u52VBtn5MBtE08GNwhGoiK6ZBH+ArgawL8558uMeY3NMrgWeiOypAk+rOBaVrMq4auLVJYKWA69J0la5uJjVNZDUYgCkBXQdOCFcHruE+uhFCTqmbsHqxWC/A3Lied6HhYEq0XMMFKBm4hglMiZZ11S2UgQCmYGH5oliXt9wBGvioAY0f4ZmsPBUkoTsx13NPuHGZW6E0Bh9i7Mat3N/8FHysVwKfyHgU0gCMfVreajJ5d4l5HM4dsHZAE8dVo3HwquuBrOpUzMRl/qw146/r498V6k7hm9IgMVcT16irAaUaPA21ksnuTO70GMVNENRddQIwAa4aKDlg5WBKRAOY3IqtW7KydJEZsgQgGMCdgzu9ayhM56o00HB/81MYRDMw8YkMfILTpK4MVqGGtwmzsa6joGdK9VxME4hWn6w+JMHT9WEsH4IV8jiQWx1Bm5jJyrgrpjs9CwurGkyJVl0NdFseOmTlOSFjrxJS+6tl4yB8OriZHMWHmPRHZB/AZ8HYgE6E+IEDMneFV9NhOPdX14QrW0zQISvmRn4ABK+gXolaNgiidvNhRoPIzTQ5JTZuXDOjBe1wkzU36RboZTaR1WNCfP90PV2tXONuDWoH3Zi6A/ko80N04xgo+RTwCdwsCN5aUC+wtXLwYd4msvow2OMQg6KoTUFFCH8lxuME1eqwZTwxyP5CIGK65qZPVte5XTXqWNzKNoa1agcD2Stngzh+NwVtYs1ZKd8pBDG/QD5KM0TTRcyAwoms6rl5fpheLat9YAK4VW3iMrfCk4MruRs3GQs+DzQOy63+iu+vODwxvwg8K0QzX3n1KAx0B7gBGqurRuPgVdeJrBipXgNmYoCeQW1lGkEIPG4AAAESSURBVDgwwdXE9Gi5D2RA3YXsDvBsJjSReTS1nishQI+WAbI7MAdNq3FmVoOaMIeAtpqU0OXT6SYGB12wURgCMFndapSaCGrP5stasiIipgcgqAENoNZARmZo3UHtb+zpLoJGz4OoI2t8/NQ1GwaZALre7vS6zi2jREoMXk3ncYiBA0xezWXsrENWNgDTqMGUmtY3B/UoA1kzF7rcGbIZcH8DQR3HwE1tUg9hstrKZWYybr1yZqHMD+GeXGAR3LXcTSO489foNaNYV+PTzK5bsjYzrhguKuD3Cgiy+r2kImCgKiDIGqjKirh+r4Agq99LKgIGqgKCrPbKiqfgr4Aga/DvkcjQXgFBVnshxFPwV+D/AQAA///s0Q/oAAAABklEQVQDACQssOTrx2RaAAAAAElFTkSuQmCC)**

**_Def: Pointerul este o variabilă în care memorez o adresă._**

**Cum declar un pointer ?**

**Sintaxă:**

**tip\* numePointer;  
SAU  
tip \*numePointer;  
SAU  
tip \* numePointer;**

**Cum se citește :** Dacă declar de ex, "int\* p", vom spune că p este "int pointer" SAU p este "pointer la int". În documentații/materiale de specialitate/etc., se spune că p este de tip "int\*"

_Obs: Pt_ **_int_** _\*a, b, c; se declara a (un int pointer), b (un int), c (un int). Dacă vreau ca și a, și b, și c sa fie int pointer trebuie sa scriu_ **_int_** _\*a, \*b, \*c._

Ex:

| **int**\* p; // s-a declarat un int pointer p în care pot memora adrese<br><br>// (DOAR ALE UNOR VARIABILE DE TIP INT). <br>Ex: <br>**int** \*p; **float** x; <br>p = &x; // EROARE : Nu pot atribui unui int\* un float\*.<br><br>// (Nu pot atribui unui int pointer un float pointer). |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|                                                                                                                                                                                                                                                                                           |
| ---                                                                                                                                                                                                                                                                                       |

Ex2:

**long** **long**\* k;  
**int** x;  
k = &x; // EROARE - nu pot atribui unei variabile de tip long long\* un int\*

Obs:

cout<<v<<" "<<&v\[0\]<<" "<<v+0; // se afișează 3 adrese identice // sunt notații echivalente

Operatorul de dereferențiere - \*

Sintaxa: \*pointer

Efect: Se obține zona de memorie de la adresa pointerului.

Ex: v\[0\] = 3; cout<<\*v; // Se afișează 3;

Ex 2: **int** \*p = &x; cout<<\*p; // Se afișează valoarea din x

Operații cu pointeri

Pot face:

- pointer + număr
- pointer - număr
- NU pointer + pointer
- NU pointer \* numar
- NU pointer / numar
- NU pointer % numar
- e OK numar + pointer (dar neobisnuit)

// v+0 - adresa primului element  
// v+1 - adresa celui de al doilea

Obs : v\[i\] ⇔ \*(v+i) ⇔ \*(i+v) ⇔ i\[v\]

Obs : Un pointer care este declarat global este inițializat cu valoarea NULL (adresa 0x0). Niciodată sistemul de operare nu va aloca memorie la acea adresă.

Cum initializez un pointer cu NULL ?

Ex:

**int** \*p;  
p = 0; // alte notații echivalente: p = NULL; SAU p = nullptr;

Obs: După cum se poate observa și în exemplu, NULL si nullptr sunt aliasuri pentru 0 (adresa 0).

Caractere

Sunt variabile de tip char. (o variabila de tip char ocupă 1 byte).

Tabelul ASCII - lista cu toate caracterele și codul (număr) pentru fiecare din ele.

<https://www.asciitable.com/>

Un caracter se scrie între apostroafe.

char x = '\$';

cout << x; // cand afisez un char se afiseaza caracterul, nu codul

Ex2: (<https://www.asciitable.com/>)

// dacă doresc sa aflu codul unei var de tip char

// voi pune valoarea din char într-o var de tip "număr" (tip int, long long, etc)

// Ex:

char x = '\$';

int y = x;

cout << y;

// se va afișa codul pt caracterul '\$'

Ex3:

char k = 'H';

int x = k - 'A';

// se afișează 7

// pt ca H este a 8 a litera din alfabet

// ( 'A' - 'A' este 0, 'B' - 'A' este 1, etc)

cout << x;

# include &lt;iostream&gt;

<br/>**using** **namespace** std;  
**char** **dinLitMicaInMare**(**char** x);  
**char** **dinLitMareInMica**(**char** x);  
**int** **dinCaracterInCifra**(**char** x);

bool esteLiteraMare(char x);

bool esteLiteraMica(char x);  
**int** **main**()  
{  
cout << dinCaracterInCifra('3')\*5;  
**return** 0;  
}

bool esteLiteraMare(char x)

{

return x >= 'A' && x <= 'Z';

}

bool esteLiteraMica(char x)

{

return x >= 'a' && x <= 'z';

}  
**char** **dinLitMareInMica**(**char** x) { **return** x - 'A' + 'a'; }  
**char** **dinLitMicaInMare**(**char** x) { **return** x - 'a' + 'A'; }  
**int** **dinCaracterInCifra**(**char** x) { **return** x - '0'; }  
**char** **dinCifraInCaracter**(**int** x) { **return** x + '0'; }

Obs : cout << '7' + '3'; // **NU** se va afișa 10, ci suma codurilor ASCII

Șiruri de caractere

Def: Sunt vectori de tip char. Sunt folosiți pentru a memora cuvinte.

Obs: Memorarea șirului începe întotdeauna de la poziția 0.

**_Obs: Finalul unui șir (trebuie) este marcat cu caracterul cu codul 0._**

Obs: **Caracterul cu codul 0** se numește caracterul NULL.

**Caracter alb** - denumire pentru orice caracter cu codul <= 32

- se numesc caractere albe pt. că nu le "poți vedea" (efectiv)
- ex de caractere albe : ' ' (SPACE) , '\\n' (ENTER), '\\t' (TAB),

**'\\0' (caracterul NULL)**(primul caracter din ASCII), EOF (End of File)

Obs: Fie v adresa.

pt instructiunea "**cout<<v**" : se afișează efectiv adresa dacă v **NU este char pointer**; altfel (este char\*), se afișează toate caracterele până dau de caracterul NULL.

Obs: Orice șir trebuie sa conțină cel puțin un caracter NULL. Altfel, șirul nu se termina!!!!

// cout<<x; (unde x sir de char) este echivalent cu:  
**for** (int i = 0; x\[i\] != 0; i++)  
cout<<x\[i\];

// se afișează toate caracterele pana ajung la caracterul NULL

Ex : **char** cuv\[\] = "mar";  
⇔  
**char** cuv\[4\];  
cuv\[0\] = 'm'; cuv\[1\] = 'a'; cuv\[2\] = 'r'; cuv\[3\] = 0;

Ex:

char s\[10\];

s\[0\] = 'a';

s\[1\] = 'x';

s\[2\] = 'y';

s\[3\] = 'f';

s\[4\] = 0;

s\[5\] = 'q';

s\[6\] = 'z';

cout << s; // se afișează doar axyf

# include &lt;iostream&gt;

**using** **namespace** std;  
**char** cuv\[\] = "abecedar";  
**int** **main**()  
{  
cout << cuv << '\\n'; // cout << cuv + 0 << '\\n';  
cout << cuv+2 << '\\n'; // se afișează ecedar  
cuv\[5\] = 0;  
cout << cuv << '\\n'; // "abece"  
**return** 0;  
}

Afișarea unui șir de caractere

_(_ **_s este un vector de tip char_** _(sau mai general o variabila de tip char\*) )_

cout<<s;

Efect : Se afișează toate caracterele incepand cu adresa s pana cand se ajunge la caracterul cu codul 0.

// cout<<s; este echivalent cu:  
**for** (int i = 0; s\[i\] != 0; i++)  
cout<<s\[i\];

// se afișează toate caracterele pana ajung la caracterul NULL

Ex1

Dacă s contine:

| 0   | 1   | 2   | 3   | 4   | 5   | 6   | 7   | 8   | 9   |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| a   | b   | e   | c   | e   | d   | a   | r   | \\0 |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

cout<<s; // se afișează abecedar

Ex2 : Dacă s contine:

| 0   | 1   | 2   | 3   | 4   | 5   | 6   | 7   | 8   | 9   |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| a   | b   | e   | c   | e   | \\0 | a   | r   | \\0 |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

cout<<s; // se afișează "abece";  
cout<<s+2; // se afișează "ece"

Citirea unui caracter

_// ()_

**Metoda 1 - Operatorul >>**

char c;

fin >> c;

Efect : Se sare peste toate caracterele albe și se memorează **în c primul caracter "negru".**

Ex de input:

xyz abc

Se citește 'x' în variabila c.

**Metoda 2**

fin.get(c);

Efect : Se citește **în c primul caracter** (din locul unde am rămas cu citirea). **(fie ca e "alb" sau nu).**

Ex de input:

z abc

Pt : **char** c1, c2;

fin.get(c1); fin.get(c2); ", se va citi 'z' în c1 și SPACE în c2.

Metoda 3

fin.get();

Efect : Se citește primul caracter (din locul unde am rămas cu citirea). (fie ca e "alb" sau nu).

Obs: Folosesc metoda 3 cand vreau sa merg mai departe cu citirea cu 1 caracter.

// Input : 738

**char** a, b;  
fin.get(a); fin.get(); fin.get(b); // în a voi avea **'7'** și în b voi avea **'8'**

Citirea șirurilor de caractere

**_Obs: Orice metodă de citire a unui șir de caractere, se asigură că, după citirea șirului, se inserează la final '\\0' (caracterul NULL)._**

**Metoda 1 (Metoda >>)**

**fin>>s;** // Efect : (Din locul unde am rămas cu citirea) Se sare peste toate caracterele albe, și se memorează în s toate caracterele până la primul caracter alb **exclusiv**.

Ex de input: hello guys

fin>>s; // se citește doar "hello"

**Metoda 2 (Metoda getline cu 2 param)**

Sintaxa : fin.getline(sir, LUNGIME_SIR);

Efect: Se citesc în șir toate caracterele, pana cand se intalneste caracterul **'\\n'** (ENTER) (care nu se memorează în șir, dar se citește).

(**char** s\[256\];)

Ex de input:

wow ce tare

super fain

fin.getline(s, 256); // în s se memorează " wow ce tare"

Metoda 3 - Getline cu 3 parametri

Sintaxa :

fin.getline(sir, LUNGIME_SIR, delimitator); // delimitator - variabila de tip char

Efect : La metoda 2 delimitatorul era implicit (era '\\n'). Aici dau delimitatorul ca și parametru.

La fel ca la metoda 2, delimitatorul se citește, dar nu se pune în șir.

Ex de input:

wow ce tare

super fain

fin.getline(s, 256, 'e'); // în s se memorează " wow c"  
**char** x;  
fin.get(x); // ' '

Funcții pentru șiruri de caractere

**_Pt a folosi aceste funcții -> #include &lt;cstring&gt;_**

**_(SAU #include &lt;string.h&gt;)_**

**int** **strlen**(**char**\* p);

Obs : strlen ⇔ str (String) + len (length)

Efect : funcția returnează numărul de caractere incepand cu adresa p+0 care sunt != '\\0'.

( Efect: numărul de caractere pana cand intalnesc caracterul NULL)

Ex:

Ex2 : Dacă s contine:

| 0   | 1   | 2   | 3   | 4   | 5         | 6   | 7   | 8         | 9   |
| --- | --- | --- | --- | --- | --------- | --- | --- | --------- | --- |
| a   | b   | e   | c   | e   | **_\\0_** | a   | r   | **_\\0_** |     |
| --- | --- | --- | --- | --- | ---       | --- | --- | ---       | --- |

cout<<strlen(s+0); // se afișează 5  
cout<<strlen(s+3); // se afișează 2

**Obs:** De fiecare data cand apelez funcția **_strlen(s)_** se parcurge memoria de la adresa s pana la caracterul **'\\0'**.

**int** **strlen**(**char**\* s)  
{  
**int** lg = 0;  
**while** (s\[lg\] != '\\0')  
lg++;  
**return** lg;  
}

(Presupunem ca s nu se modifica în for dpdv a lungimii)

Prin urmare:

**for** (i = 0; i < strlen(s); i++) // strlen(s)^2 pași (AȘA NU)

// ALTERNATIVA  
**int** lg = strlen(s);  
**for** (i = 0; i < lg; i++) // 1 + strlen(s) pași (AȘA DA)

**char\* strcpy(char\* destinație, char\* sursă);**

Obs : strcpy ⇔ str (String) + cpy (Copy)

**_Obs: Se aseamănă cu atribuirea_**

**_( strcpy(a, b) este "ca un fel de" a = b; practic se copiază valorile (caracterele) din b în a)_**.

Scop : Pentru a copia cuvantul sursa în cuvantul destinatie

Returnează : destinatie

Efect: De la adresa sursa se copiază toate caracterele în destinatie pana cand în sursa se ajunge la caracterul '\\0'.

destinatie\[0\] = sursa\[0\];  
destinatie\[1\] = sursa\[1\];  
.......  
destinatie\[k\] = sursa\[k\]; // unde sursa\[k\] are valoarea '\\0'

Obs: Funcția strcpy se asigura ca după apel, destinatie va fi un șir **_ce se termina (are '\\0' la final)._**

Posibila implementare (care are același efect):

**char**\* **strcpy**(**char**\* dest, **char**\* sursa)  
{  
**int** i;  
**for** (i = 0; sursa\[i\] != 0; i++)  
dest\[i\] = sursa\[i\];  
dest\[i\] = 0;  
**return** dest;  
}

Ex:

|     | 0   | 1   | 2   | 3   | 4   | 5   | 6   | 7   | 8   | 9   | 10  | 11  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| s   | a   | b   | e   | c   | e   | d   | a   | r   | \\0 |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| t   | c   | a   | r   | n   | e   | \\0 |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

strcpy(s+3, t+2);

s\[3\] = t\[2\]; s\[4\] = t\[3\]; s\[5\] = t\[4\]; s\[6\] = t\[5\];

Efect :

|     | 0   | 1   | 2   | 3   | 4   | 5   | 6   | 7   | 8   | 9   | 10  | 11  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| s   | a   | b   | e   | r   | n   | e   | \\0 | r   | \\0 |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| t   | c   | a   | r   | n   | e   | \\0 |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

**char\* strcat(char\* destinatie, char\* sursa);**

Obs: strcat ⇔ str(String) + cat(Con**cat**enare). Concatenare ⇔ a lipi la dreapta/ a uni

Obs: La fel ca și strcpy, **strcat copiază din sursa și caracterul '\\0'**

Return : Se returnează "destinatie"

Efect :

Considerăm lg = strlen(destinatie); ( destinatie+lg este prima adresă unde gasesc caracterul '\\0', incepand cu adresa destinatie).'

strcat(destinatie, sursa); // ⇔ strcpy(destinatie+lg, sursa);

Ex:

|     | 0   | 1   | 2   | 3   | 4   | 5   | 6   | 7   | 8   | 9   | 10  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| s   | g   | e   | o   | \\0 |     |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| t   | c   | a   | r   | n   | e   | \\0 |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

strcat(s, t) => in s se memoreaza "geocarne" (urmat de \\0)

|     | 0   | 1   | 2   | 3     | 4     | 5     | 6     | 7     | 8       | 9   |
| --- | --- | --- | --- | ----- | ----- | ----- | ----- | ----- | ------- | --- |
| s   | g   | e   | o   | **c** | **a** | **r** | **n** | **e** | **\\0** |     |
| --- | --- | --- | --- | ---   | ---   | ---   | ---   | ---   | ---     | --- |
| t   | c   | a   | r   | n     | e     | \\0   |       |       |         |     |
| --- | --- | --- | --- | ---   | ---   | ---   | ---   | ---   | ---     | --- |

**char\* strchr(char\* sir, char caracter);**

**Denumire:** str(string) + chr(character)

**Obs:** Răspunde la întrebarea _"Where in_ **_str_**_ing I find this_ **_ch_**_a_**_r_**_acter?"_

**Scop :** pt a căuta prima apariție a unui caracter din șir.

**Efect:** Se incepe cu adresa **sir** si se cauta de la adresa curenta, unde se afla **caracterul**. Dacă da (s-a găsit caracterul), se returnează adresa (curentă).

|       | 0   | 1   | 2   | 3   | 4   | 5   | 6   | 7   | 8   | 9   | 10  | 11  |
| ----- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **s** | a   | b   | e   | c   | e   | d   | a   | r   | \\0 |     |     |     |
| ---   | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

**char** \* p = strchr(s, 'e'); // in p se memoreaza s+2  
**int** poz = p - s; // în poz se memorează 2  
strchr(strchr(s, 'e'), 'e') ⇔ strchr(s, 'e') (sunt echivalente ca și rezultat)  
// dacă caut 'e' din poziția în care l-am găsit, voi găsi aceasi pozitie

_Q: Cum fac să găsesc a doua apariție a lui e în șir?_

_A:_ **_char_**_\* p = strchr(strchr(sir, 'e')+1, 'e');_

Obs : Dacă în s s-a verificat fiecare adresa până la '\\0' și nu s-a găsit caracterul se returnează adresa NULL (adresa 0x0).

**Q: Cum verific dacă caracterul 'x' apare în șir?**

A: **if** (strchr(sir, 'x') != **NULL**) ⇔ **if** (strchr(sir, 'x'))

**Q: Cum verific dacă litera 'q' NU apare în șir?**

A: **if** (strchr(sir, 'q') == **NULL**) ⇔ **if** (!strchr(sir, 'x'))

Obs: strchr ( is there in this STRing this CHaRacter?)

char \*strchr(char \*sir, char caracter)

{

int i;

for (i = 0; sir\[i\] != 0; i++)

{

if (sir\[i\] == caracter)

{

return sir + i;

}

}

return NULL;

}

**_char\* strstr(char\* str1, char\* str2);_**

Obs: **strstr** (Where in this STRing is this subSTRing ? )

Efect : Începând cu adresa **str1** se caută **_prima apariție a lui str2_**. Se va returna **_prima adresă unde se gaseste str2_**.

Ex :

s = "eu am leagstr2ane si lebede"  
01234567890123456789012  
p = strstr(s, "le"); // în p se memorează s + 6

p2 = strstr(strstr(s, "le")+1, "le"); // se memorează s + 21 ( a 2a aparitie);

Obs : Dacă vreau sa fiu mai riguros, nu trebuie sa caut cu o poziție mai la dreapta ci cu strlen(sir2).

Ex: p2 = strstr(strstr(s, "le") + 2, "le"); // 2 pt ca sir2 este de lungime 2

Obs: La fel ca la strchr, **_dacă str2 nu se regaseste in str1_** ( adică am parcurs pana la'\\0' și nu am găsit o aparitie) **_atunci se returnează NULL_**.

**char**\* **strstr**(**char**\* unde, **char**\* cine)  
{  
**int** i = 0, j;  
**bool** toateLaFel;  
**for** (i = 0; unde\[i\] != 0; i++)  
{  
// incepe "cine" la poz i ?  
toateLaFel = 1;  
**for** (j = 0; cine\[j\] != 0; j++)  
{  
**if** (cine\[j\] != unde\[i + j\])  
{  
toateLaFel = 0;  
**break**;  
}  
}  
**if** (toateLaFel)  
{  
**return** unde + i;  
}  
}  
}

s = "ana are mere rosii si mere verzi"

t = "mere"

strlen(t) -> 4

strstr(s, t) -> s + 8

strcpy(s+8, s+12);

| a   | n   | a   |     | a   | r   | e   |     | m   | e   | r   | e   |     | r   | o   | s   | i   | i   |     | s   | i   |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 0   | 1   | 2   | 3   | 4   | 5   | 6   | 7   | 8   | 9   | 0   | 1   | 2   | 3   | 4   | 5   | 6   | 7   | 8   | 9   | 0   |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

**Strcmp (String compare)**

**int strcmp(char \* a, char \* b);**

a < b - dacă găsesc în dicționar pe a înaintea lui b (a este < lexicografic decat b)

"ana" < "mere" - pt ca 'a' < 'm'

"abecedar" < "abracadabra" - pt ca 'e' < 'r'

(Idee: caut prima poziție i unde a\[i\] != b\[i\] ).

Q: Ce pot observa dacă nu pot găsi o astfel de poziție ?

A: Că sunt "egale" (adică cuvintele sunt identice).

Efect: Se parcurg șirurile simultan pana cand se găsește o poziție x unde a\[x\] != b\[x\]. Dacă a\[x\] &lt; b\[x\] se returnează -1. Dacă a\[x\] &gt; b\[x\] se returnează 1. Dacă șirurile sunt identice se returneaza 0.

// vreau sa verific daca a > b

**if** (strcmp(a,b) > 0) //( a > b)

| a <> b | ce returneaza strcmp(a,b) |
| ------ | ------------------------- |
| a < b  | < 0                       |
| ---    | ---                       |
| a == b | \== 0                     |
| ---    | ---                       |
| a > b  | \> 0                      |
| ---    | ---                       |

Ex:

strcmp("ana", "anastasia") ( voi obtine < 0)

| 0   | 1   | 2   | 3   | 4   | 5   | 6   | 7   | 8   | 9   |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| a   | n   | a   | \\0 |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| a   | n   | a   | s   | t   | a   | s   | i   | a   | \\0 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

**_Ex de implementare strcmp:_**

| **int** **strcmp**(**char**\* a, **char**\* b) <br>{ <br>**int** i, lgMax = strlen(a);<br><br>**int** lgB = strlen(b); <br>**if** (lgMax < lgB) <br>lgMax = lgB; <br>// în lgMax memorez lungimea maximă <br>**for** (i = 0; i < lgMax; i++) <br>**if** (a\[i\] != b\[i\]) <br>{ <br>**if** (a\[i\] < b\[i\]) <br>**return** -1; <br>**else** // a > b <br>**return** 1; <br>} <br>**return** 0; <br>} |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|                                                                                                                                                                                                                                                                                                                                                                                                        |
| ---                                                                                                                                                                                                                                                                                                                                                                                                    |

**char**\* **strtok**(**char**\* s, **char**\* sep);

strtok > tok - token - "bucată"

**Scopul funcției:** Să obținem, folosind funcția, toate bucățile de text ce nu conțin separatori (separatori = orice caracter ce se găsește în cel de-al 2-lea parametru).

Cazuri :

- s != **NULL**

Se parcurge s până când dau de un caracter ce **NU** este separator (**acesta va fi începutul token-ului**). Adresa acelui caracter (la finalul apelului) se returnează.

Se parcurge șirul de la acea poziție până când ajung la un caracter ce este separator (**primul caracter ce nu face parte din token &lt;=&gt; sfârșitul token-ului**). Acolo funcția pune **'\\0'** . Într-o variabilă (globală) "ascunsă" se va memora 1+adresa unde s-a pus '\\0'. (_aceasta va fi prima adresa de unde ar putea să înceapă următorul token_).

- s == **NULL**

Exact ca mai sus, doar ca strtok nu porneste de la adresa data ca primul parametru, ci pornește de la adresa din variabila ascunsă.

Obs: Dacă pt apelul curent, nu pot găsi un caracter ce nu este separator (adică primul caracter din token), se returnează **NULL**. Căutarea caracterului ce nu este separator se face până la apariția primului '\\0'.

| ,   | .   | ,   | a   | n   | a   |     | a   | r   | e   | ,   | .   | .   | ,   | m   | e   | r   | e   | .   | ,   | \\0 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 0   | 1   | 2   | 3   | 4   | 5   | 6   | 7   | 8   | 9   | 0   | 1   | 2   | 3   | 4   | 5   | 6   | 7   | 8   | 9   | 0   |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

// voi reprezenta pe desen caracterul cu codul 0 cu #  
**char** sep\[\] = ",. ";  
p = strtok(s, sep); // în p se memorează s+3

| ,   | .   | ,   | a   | n   | a   | #   | a   | r   | e   | #   | .   | .   | ,   | m   | e   | r   | e   | #   | ,   |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 0   | 1   | 2   | 3   | 4   | 5   | 6   | 7   | 8   | 9   | 0   | 1   | 2   | 3   | 4   | 5   | 6   | 7   | 8   | 9   | 0   |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

p = strtok(**NULL**, sep); // în p se memorează s+7  
p = strtok(**NULL**, sep); // in p se memoreaza s+14  
p = strtok(**NULL**, sep); // în p se memorează NULL (am mers de la adresa din variabila ascunsă până la final și nu am găsit un caracter ce nu era separator).

Q:Cum extrag toate token-urile dintr-un șir ?

A:

**char**\* p; **char** sep\[\]=",.@!";  
p = strtok(s, sep);  
**while** (p != **NULL**) // am gasit token

{  
// mă joc cu p; de ex. afisez  
cout << p << '\\n';  
// trec la următorul token  
p = strtok(**NULL**, sep);  
}

SAU

**for** (p = strtok(s, sep); p != **NULL**; p = strtok(**NULL**, sep) )  
{  
// mă joc cu p  
cout<<p<<'\\n';  
}

**Observație**: NU folosi **strtok** în cazul în care ai mai mult de un separator și ai nevoie după parcurgerea șirului cu strtok de separatorul de pe acea poziție. ( De ce ? - pt ca **strtok** "distruge" șirul, punand "pe separator" caracterul NULL).

**Soluție:** Pot crea o copie a șirului dacă am nevoie sa știu ce separator era în locul unde a pus strtok '\\0'.

Exemplu de implementare strtok

| #include &lt;iostream&gt; <br>#include &lt;cstring&gt; <br><br/>**using** **namespace** std;<br><br> <br>**char**\* **mytok**(**char**\* s, **char**\* sep) {<br><br>**static char**\* start = **NULL**; <br>**char**\* rez; <br>**if** (s == **NULL**) { <br>s = start; <br>**if** (start == **NULL**) { <br>**return** **NULL**; <br>} <br>} <br>**int** i, j; <br>rez = **NULL**; <br>**for** (i = 0; s\[i\] != 0; i++) <br>**if** (strchr(sep, s\[i\]) == **NULL**) //(s\[i\] nu este separator) <br>{ <br>rez = s + i; <br>**break**; <br>} <br>**if** (rez == **NULL**) // am parcurs pana la final, nu am iesit prin break <br>**return** **NULL**; <br>**for** (j = i+1; s\[j\] != 0; j++) { <br>**if** (strchr(sep, s\[j\]) != **NULL**) {<br><br>// s + j este unde se termina tokenul <br>start = s+j+1; <br>**break**; <br>} <br>} <br>**if** (s\[j\] == 0) {<br><br>// cand tokenul curent este chiar sufixul șirului inițial <br>start = **NULL**; <br>} <br>s\[j\] = 0; // aici pun caracterul '\\0' <br><br/>**return** rez; <br>} <br>**int** **main**() { <br>**char** s\[\] = ",..ana,;.are,.;;;mere multe..."; <br>**char** sep\[\] = ",.; "; <br><br/>**for** (**char**\* p = mytok(s, sep); p != **NULL**; p = mytok(**NULL**, sep)) { <br>cout << p << '\\n' ; <br>} <br>**return** 0; <br>} |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ---                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
|                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ---                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |

Colecție de cuvinte

Q: Am mai multe cuvinte de memorat. Cum memorez ?

A: Mi-ar trebui un "vector" de stringuri (**_un string_** este **_un vector de tip char_**). => Îmi trebuie o matrice de caractere.

Am nevoie de (maxim) n cuvinte (aleg sa numerotez de la 0) cu maxim x litere

\=> **char** M\[n\]\[x+1\]; // (x + 1 - pt ca trebuie sa memorez și '\\0')

**_Cum citesc cuvintele în lista ?_**

( Am de citit un număr necunoscut de cuvinte separate prin spațiu )

char s\[DMAX\];

char M\[NRMAX\]\[DMAX\];

int nrCuv = 0;

while (fin >> s)

{

strcpy(M\[nrCuv\], s);

nrCuv++;

}

\*\*Citire\*\*

Citesc cât timp am ce citi de la tastatura

**while** (cin>>x)  
{  
// aici ma joc cu x  
}

Obs: Cand vreau sa spun calculatorului ca **s-a terminat citirea (nu mai este nimic de citit de la consola)**, apas **CTRL + Z** și dau **ENTER**.

Citesc număr cu număr până la finalul fișierului

| **while** (fin>>x) <br>{ <br>// aici ma joc cu x <br>} |
| ------------------------------------------------------ |
|                                                        |
| ---                                                    |

Citește numere de la tastatură până la apariția lui 0 ( 0 nu se ia în considerare)

**while** (cin >> x && x != 0)  
{  
// mă joc cu x  
}

Citește perechi de numere de la tastatura până la apariția lui **0 0**( 0 0 nu se ia în considerare)

// 1 7 8 9 4 5 0 0 => (1 7) (8 9) (4 5)  
**while** (cin >> x >> y && x != 0 && y != 0)  
{  
// mă joc cu perechea x,y  
}

Citesc **perechi consecutive** până la apariția lui **0**

// 1 7 8 9 4 5 0 => (1 7) (7 8) (8 9) (9 4) (4 5)  
cin >> a;  
**while** (cin >> b && b != 0)  
{  
// mă joc cu perechea (a,b)  
.....  
// treci la perechea urmatorea  
a = b;  
}

Citesc **n numere și le tratez pe perechi consecutive**

int n, a, b, i;

cin >> n;

cin >> a; // citesc primul nr - e singurul fără nr anterior

for (i = 2; i <= n; i++)

{

cin >> b; // nr curent e nr din dreapta

// mă joc cu perechea a, b

a = b;

// nr curent va fi "nr anterior" la iteratia următoare

}

Vectori de frecventa/caracteristici

Vector

| **de frecventa**                                                                                                                                                                                                                                                  | **caracteristic**                                                                                                      |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| de cate ori?<br><br>( de k ori - k {0, 1, 2, …. } )                                                                                                                                                                                                               | dacă ?<br><br>( da / nu )                                                                                              |
| ---                                                                                                                                                                                                                                                               | ---                                                                                                                    |
| **_int_**                                                                                                                                                                                                                                                         | **_bool_**                                                                                                             |
| ---                                                                                                                                                                                                                                                               | ---                                                                                                                    |
| v\[x\] == k<br><br>\- dacă pt x s-a intamplat de k ori<br><br>(ex. l-am găsit pe x de k ori)<br><br>Ex:<br><br>v\[x\] == 0 // nu l-am găsit deloc pe x<br><br>v\[x\] == 1<br><br>//l-am găsit pe x 1 data<br><br>v\[x\] >= 2 //l-am găsit pe x de cel puțin 2 ori | v\[x\] == 1 //dacă s-a întâmplat pt x<br><br>v\[x\] == 0 //in caz contrar<br><br>ex. v\[x\] == 0 //nu l-am găsit deloc |
| ---                                                                                                                                                                                                                                                               | ---                                                                                                                    |
| dacă s-a (mai) intamplat (inca o data) pt x (ex. l-am mai gasit 1 data)<br><br>\=><br><br>v\[x\]++;                                                                                                                                                               | când se întâmplă / când il găsesc<br><br>\=> v\[x\] = 1;)                                                              |
| ---                                                                                                                                                                                                                                                               | ---                                                                                                                    |

Obs: Dimensiunea vectorului **NU** trebuie să o gândesc în funcție de cate numere mi se dau, ci în funcție de intervalul numerelor cu care lucrez.

Ex: Dacă mi se dau la intrare **maxim 1 milion de numere**, toate din intervalul **\[1, 200\]** voi declara vectorul de frecvență **de 201 elemente (NU de 1 milion) !**

**Citire vector caracteristic**

**bool v\[100\];**

**int x;**

**int main()**

**{**

**while (cin >> x)**

**{**

**v\[x\] = 1;**

**}**

**// ...**

**return 0;**

**}**

**Citire vector de frecventa**

**int v\[100\], x;**

**int main()**

**{**

**while (cin >> x)**

**{**

**v\[x\]++;**

**}**

**// ...**

**return 0;**

**}**

Interclasare

Dacă am 2 vectori sortati, cum obțin un al 3lea vector cu toate elementele celor 2, tot sortat?

A și B sunt vectorii sortati (crescator) (primiți la intrare)

C - este vectorul "final"

Idee :

Pun în C la fiecare pas minimul dintre:

- cel mai mic element din A pe care nu l-am luat pana acum
- și cel mai mic element din B pe care nu l-am luat pana acum.

\=> trebuie sa stiu la fiecare pas care este elem curent din A, respectiv cel curent din B

// am n elemente în A; m elemente în B

// numerotez de la 1 în toți vectorii  
i = j = 1;  
k = 0; // nr de elemente din C // in C numerotez de la 1  
**while** (i &lt;= n && j <= m) { // !(i <= n && j <= m) ⇔ i &gt; n || j >m  
**if** (A\[i\] < B\[j\])  
C\[++k\] = A\[i++\]; // k += 1; C\[k\] = A\[i\]; i += 1;  
**else**  
C\[++k\] = B\[j++\]; // k += 1; C\[k\] = B\[j\]; j += 1;  
}

// din cele 2 while-uri se va executa doar 1  
**while** (i <= n)  
C\[++k\] = A\[i++\];  
**while** (j <= m)  
C\[++k\] = B\[j++\];  
<br/>**for** (i = 1; i <= k; i++)  
cout << C\[i\] << " ";

Ciurul lui Eratostene

Metoda 1 - Vector cu nr prime

Obs : Un nr este prim dacă nu are ca divizor niciun număr (prim) mai mic ca el.

Cerința - descoperă primele n nr prime

C\[1\] = 2;  
last= 1;  
**for** (i = 3; gasite < N; i += 2)

{

estePrim = 1;  
**for** (j = 1; j <= last && C\[j\]\*C\[j\] <= i; j++)  
**if** (i%C\[j\] == 0)

{ estePrim = 0; **break**;}  
**if** (estePrim == 1)  
C\[++last\] = i;  
}

Metoda 2 - Vector care-mi spune dacă un nr este prim (sau nu)

Obs: Dacă x este prim toți multiplii lui x mai mari ca el sunt NEPRIMI.

CERINȚA : Să se verifice primalitatea pentru toate nr mai mici ca N

// vectorul e declarat global prin urmare toate valorile din vector, inițial, sunt 0  
**bool** C\[10000\]; // C\[x\] este 0 dacă x este prim  
<br/>C\[0\] = C\[1\] = 1; // 0 si 1 neprime

C\[2\] = 0; // 2 este prim si par

**for** (i = 4; i <= N; i+=2)  
C\[i\] = 1;  
**for** (i = 3; I <= N; i+=2)  
**if** (C\[i\] == 0)  
**for** (j = 2\*i; j <= N; j+=i)  
C\[j\] = 1;

Sortarea

BubbleSort

Idee:

- Presupun că șirul este sortat.
- Parcurg șirul și caut perechile consecutive care nu respectă criteriul.
- Când găsesc o pereche "rea":
  - Interschimb perechea ("swap")
  - Fac presupunerea falsă!!! Constat că șirul NU este sortat! (am găsit contraexemplu).
- La finalul parcurgerii, dacă presupunerea e falsă ( am găsit (cel puțin) un contraexemplu (2b) ) mă întorc la pasul 1.

Algoritm: (presupun că sortez crescător elementele lui v cu poz de la 1 la n)

**do** {  
esteSortat = 1;  
**for** (i = 1; i <= n-1; i++)  
**if** (v\[i\] > v\[i+1\])  
{  
swap(v\[i\], v\[i+1\]);  
esteSortat = 0;  
}  
}**while** (!esteSortat); // esteSortat == 0

Divizibilitate

Divizorii unui nr

**Primul scop - Vreau să găsesc divizorii lui n** (să îi afișez pe toți)

**// Obs1 : Divizorii lui n sunt în \[1, n\]**

**for** ( i = 1; i <= n; i++ )  
**if** ( n%i == 0 )  
cout << i << " ";

// Daca n este 1 000 000 000 => 1 000 000 000 pași

**// Obs 2 : Nu exista divizor propriu >n/2**

**_Demonstrație:_**

Pp că există un divizor propriu al lui n mai mare decat n/2. ⇔ Există d nr natural, d > n/2 si n%d==0

\=> Exista x nr natural a.i. x \* d = n => x = n/d => x < 2

si x divizor => x = 1

\=> Pp este **falsă** ( nu exista divizor propriu (!=1) și <2 al lui n)

\=> Toți divizorii lui n sunt 1, n și cei din intervalul \[2, n/2\]

Obs: În algoritmul de mai jos, calculez n/2 DOAR o dată!

(nu la fiecare pas, cum ar fi fost valabil dacă aș fi scris condiția

i <= n/2)

cout<<1<<" "<<n<<" "; // afisez divizorii improprii  
**int** jumatate = n/2;  
**for** (i = 2; i <= jumatate; i++)  
**if** (n%i == 0)  
cout<<i<<" ";  
// Dacă n=1 000 000 000, se fac 500 000 000

dacă d divizor pt n și x=n/d => x este divizor

**// Obs 3 : Pornind crescător cu d =1, perechile (d, n/d) încep sa se repete când d > n/d**

n = 36

| d   | n/d |
| --- | --- |
| 1   | 36  |
| --- | --- |
| 2   | 18  |
| --- | --- |
| 3   | 12  |
| --- | --- |
| 4   | 9   |
| --- | --- |
| 6   | 6   |
| --- | --- |
| 9   | 4   |
| --- | --- |
| 12  | 3   |
| --- | --- |
| 18  | 2   |
| --- | --- |
| 36  | 1   |
| --- | --- |

Pt cele roșii d &lt; n/d; pt cele verzi d &gt; n/d

Obs: Dacă n este pătrat perfect, vei ajunge la momentul când **d == n/d**, deci la aceasta pereche nu obțin 2 divizori noi, ci doar UNUL.

Obs: Pot spune ca d < n/d ⇔ cu d \* d < n

**for** (i = 1; i \* i < n; i++)  
**if** (n%i == 0)  
cout << i << " " << n/i <<" ";  
**if** (i\*i == n)  
cout<<i;

Obs : n = 1 000 000 => 1000 pasi

n = 1 000 000 000 => aprox. 31000 pași

i^2 < n ⇔ i < radical(n)

**CMMDC**

| **// babeste**<br><br>**if ( x < y)**<br><br>**start = x;**<br><br>**else**<br><br>**start = y; <br>for (i = start; i >= 1; i--) <br>if (x%i == 0 && y%i == 0)**<br><br>**return i;** |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|                                                                                                                                                                                       |
| ---                                                                                                                                                                                   |

**_Metoda cea mai eficientă_**

**// algoritmul lui Euclid**

**int** **cmmdc**(**int** a, **int** b) {  
**int** r;  
**while** (b != 0) {  
r = a%b;  
a = b;  
b = r;  
}  
**return** a;  
}

Ex pt a = 24, b = 36:

a ~~24~~ ~~36~~ ~~24~~ 12

b ~~36~~ ~~24~~ ~~12~~ 0

r ~~24~~ ~~12~~ 0

La mate (divizibilitate):

(a, b) - cmmdc pentru a și b

\[a, b\] - cmmmc pentru a și b

Obs : Dacă (a, b)=1 atunci voi spune ca a și b sunt "prime între ele" (coprime).

**Obs: O fractie este ireductibila daca numitorul si numaratorul sunt coprime.**

**Proprietate : (a, b) \* \[a, b\] = a\*b;**

**\=> \[a,b\] = a \* b / (a,b)**

**int** **cmmmc**(**int** a, **int** b) {  
**return** a\*b/cmmdc(a,b);  
}

**Proprietate : (a,b,c,d) = (((a,b),c),d)**

**\[a,b,c,d,e\] = \[\[\[\[a,b\],c,\],d\],e\]**

**Cum calculez pt n numere cmmmc?**

**rez = cmmmc(v\[1\], v\[2\]);  
for (i = 3; i <= n; i++)  
rez = cmmmc(rez, v\[i\]);  
cout << rez;**

**Obs : La fel vei calcula și pt cmmdc pt n numere (doar schimb funcția pe care o apelez)**

<sub>Descompunere în factori primi</sub>

<sub>Obs :</sub> **<sub>Cel mai mic divizor (>1)</sub>** <sub>al unui număr este PRIM.</sub>

<sub>Dem: Fie d cel mai mic divizor al lui n, unde d>1.</sub>

<sub>Presupun că d este compus => d = a\*b. (a>1, b>1)</sub>

<sub>d = a\*b; (II)</sub>

<sub>n = d\*x; (d este divizor) (I)</sub>

<sub>I + II => a este divizor pt n (III)</sub>

<sub>II => a < d (IV)</sub>

<sub>III + IV => a este un divizor (>1) al lui n, mai mic decat d (care este cel mai mic divizor (>1) al lui n => CONTRADICȚIE => Presupunerea este FALSĂ</sub>

<sub>Ne oprim cand ajungem la 1, după împărțiri: din poza</sub>

<sub>\=> 720 = 2^4 \* 3^2 \* 5^1</sub>

<sub>Algoritm descompunere în factori primi</sub>

**<sub>void</sub>** **<sub>descompunere</sub>**<sub>(</sub>**<sub>int</sub>** <sub>n)  
{</sub>**<sub>int</sub>** <sub>exp = 0;</sub>**<sub>while</sub>** <sub>(n % 2 == 0)  
{  
exp++;  
n /= 2;  
}</sub>**<sub>if</sub>** <sub>(exp > 0)  
cout<<2<<" "<<exp<<endl;</sub>**<sub>int</sub>** <sub>d;</sub>**<sub>for</sub>** <sub>(d = 3; n!=1; d += 2)  
{</sub>**<sub>if</sub>** <sub>(d\*d > n)  
d = n;  
exp = 0;</sub>**<sub>while</sub>** <sub>(n %d == 0)  
{exp++; n /= d;}</sub>**<sub>if</sub>** <sub>(exp > 0) cout<<d<<" "<<exp<<endl;  
}  
}</sub>

<sub>Cum calculez nr de div</sub>

<sub>Obs:</sub>

<sub>n = p1^e1 \* p2^e2 \* p3^e3 \* …. \* pk^ek. (descomp. în fact primi)</sub>

**<sub>nr de divizori ai lui n = (e1+1)\*(e2+1)\*...\*(ek+1)</sub>**

**<sub>Algoritim:</sub>**

**<sub>int nrDiv = 1, exp = 0, d = 2;  
while (n%2==0) {  
exp++;  
n /= 2;  
}  
nrDiv \*= exp + 1;  
for (d = 3; n != 1; d+=2) {  
if (d\*d > n)  
d = n;  
exp = 0;  
while (n%d==0) {  
exp++;  
n /= d;  
}  
nrDiv \*= exp +1;  
}</sub>**

# **<sub>Primalitatea unui număr</sub>**

**<sub>Un nr natural n este prim dacă are doar 2 divizori.</sub>**

**<sub>Un nr ce nu este prim îl vom numi compus (neprim).</sub>**

**<sub>Obs: Denumirea de nr "compus" vine din ideea că un nr ce nu este prim este compus din mai mulți factori primi (în descompunerea lui în factori primi).</sub>**

**<sub>Obs : 0 - e compus - are o infinitate de divizori</sub>**

**<sub>Obs : 1 - e compus - 1 divizor.</sub>**

**<sub>Obs1: Un nr n este prim dacă în intervalul \[1,n\] el are doar 2 divizori (pe cei improprii).</sub>**

**<sub>( => Un nr n este prim dacă în intervalul \[2,n-1\] el are 0 divizori. )</sub>**

**<sub>\=> Un nr n este prim dacă nu exista divizor în intervalul \[2, n-1\].</sub>**

**<sub>Obs: dacă n este (aprox) 1 000 000 000, se fac (aprox) 1 000 000 000</sub>**

**<sub>bool prim(int n) {  
int i;</sub>**

**<sub>if (n <= 1)</sub>**

**<sub>return 0;  
for (i=2; i <= n-1; i++)  
if (n%i == 0)</sub>**

**<sub>return 0;  
return 1;  
}</sub>**

**<sub>bool estePrim = 1;  
for (i = 2; i <= n - 1 && estePrim == 1; i++)  
{  
if (n % i == 0)  
{  
estePrim = 0;  
}  
}  
if (estePrim == 1)  
cout << "este prim";  
else  
cout << "este compus/neprim";</sub>**

**<sub>bool estePrim = 1;  
for (i = 2; i <= n-1; i++)  
{  
if (n%i == 0) { estePrim =0; break; }  
}  
if (estePrim == 1)  
cout << "este prim";  
else  
cout << "este compus/neprim";</sub>**

**<sub>Obs : Un nr este compus dacă găsesc divizor în intervalul \[2, n/2\]. (În caz contrar, e prim).</sub>**

| **<sub>bool prim(int n) { <br>int i, half = n/2;</sub>**<br><br>**<sub>if (n <= 1)</sub>**<br><br>**<sub>return 0; <br>for (i=2; i <= half; i++) <br>if (n%i == 0) <br>return 0; <br>return 1; <br>}</sub>** |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|                                                                                                                                                                                                              |
| ---                                                                                                                                                                                                          |

**<sub>if (n <= 1)</sub>**

**<sub>cout << "este neprim";</sub>**

**<sub>else</sub>**

**<sub>{</sub>**

**<sub>bool estePrim = 1;</sub>**

**<sub>int jumatate = n / 2;</sub>**

**<sub>for (i = 2; i <= jumatate && estePrim == 1; i++)</sub>**

**<sub>{</sub>**

**<sub>if (n % i == 0)</sub>**

**<sub>{</sub>**

**<sub>estePrim = 0;</sub>**

**<sub>}</sub>**

**<sub>}</sub>**

**<sub>if (estePrim)</sub>**

**<sub>cout << "este prim";</sub>**

**<sub>else</sub>**

**<sub>cout << "este compus/neprim";</sub>**

**<sub>}</sub>**

**<sub>if (n <= 1)</sub>**

**<sub>cout << "este neprim";</sub>**

**<sub>else</sub>**

**<sub>{</sub>**

**<sub>bool estePrim = 1;</sub>**

**<sub>int jumatate = n / 2;</sub>**

**<sub>for (i = 2; i <= jumatate; i++)</sub>**

**<sub>{</sub>**

**<sub>if (n % i == 0)</sub>**

**<sub>{</sub>**

**<sub>estePrim = 0; break;</sub>**

**<sub>}</sub>**

**<sub>}</sub>**

**<sub>if (estePrim)</sub>**

**<sub>cout << "este prim";</sub>**

**<sub>else</sub>**

**<sub>cout << "este compus/neprim";</sub>**

**<sub>}</sub>**

**<sub>Obs : Pt n = 1 000 000 000 (aprox.) se fac aprox. 500 000 000.</sub>**

**<sub>Obs : Un nr este compus dacă are divizor în intervalul \[2, radical(n)\].</sub>**

**<sub>Obs : a \* b = n, a <= b. Dacă eu verific în intervalul \[2, radical(n)\] și nu găsesc niciun niciun divizor, atunci nu voi găsi nici în intervalul \[radical(n), n\]. De ce? Pt ca in \[radical(n), n\] regasesc perechile tuturor celor din \[2, radical(n)\] .</sub>**

**<sub>bool prim(int n) {  
int i;</sub>**

**<sub>if (n <= 1)</sub>**

**<sub>return 0;  
for (i = 2; i \* i <= n ; i++)  
if (n % i == 0)</sub>**

**<sub>return 0;  
return 1;  
}</sub>**

**<sub>Obs: Pt n (aprox.) = 1 000 000 000 se fac 31 000 pasi.</sub>**

**<sub>Obs : 2 este singurul număr prim par.</sub>**

**<sub>\=> Daca nr e par și nu e 2 atunci e compus..</sub>**

| **<sub>bool prim(int n) { <br>if (n < 2) return 0; <br>if (n == 2) return 1; <br>if (n%2 == 0) return 0; <br>// n > 2 și impar <br>int i; <br>for (i = 3; i \* i <= n; i += 2) <br>if (n % i == 0) <br>return 0; <br>return 1; <br>}</sub>** |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|                                                                                                                                                                                                                                              |
| ---                                                                                                                                                                                                                                          |

**<sub>if (n <= 1)</sub>**

**<sub>cout << "este neprim";</sub>**

**<sub>else if (n == 2)</sub>**

**<sub>cout << "este prim";</sub>**

**<sub>else if (n % 2 == 0)</sub>**

**<sub>cout << "este compus";</sub>**

**<sub>else</sub>**

**<sub>{</sub>**

**<sub>bool estePrim = 1;</sub>**

**<sub>for (i = 3; i \* i <= n && estePrim == 1; i += 2)</sub>**

**<sub>{</sub>**

**<sub>if (n % i == 0)</sub>**

**<sub>{</sub>**

**<sub>estePrim = 0;</sub>**

**<sub>}</sub>**

**<sub>}</sub>**

**<sub>if (estePrim)</sub>**

**<sub>cout << "este prim";</sub>**

**<sub>else</sub>**

**<sub>cout << "este compus/neprim";</sub>**

**<sub>}</sub>**

**<sub>Q : Ce putem spune despre cel mai mic divizor propriu al unui nr ?</sub>**

**<sub>Obs : Cel mai mic divizor propriu al unui nr este PRIM.</sub>**

**<sub>De ce:</sub>**

**<sub>Pp ca d ( d >= 2, n%d == 0) este COMPUS.</sub>**

**<sub>\=> d = a \* b ( a, b > 1, a &lt;= b) =&gt; a este divizor pt d ; a < d</sub>**

**<sub>Dar stiu si ca d &lt; n, d este divizor pt n =&gt; a este divizor pt n, a &lt; d < n =&gt;</sub>**

**<sub>a este cel mai mic divizor propriu al lui n (FALS - prob îmi spune d este cel mai mic divizor propriu)</sub>**

**_<sub>Functia Sort</sub>_**

<sub>Trebuie sa includ #include &lt;algorithm&gt;.</sub>

<sub>Varianta 1 - Sintaxa :</sub>

<sub>sort( numeVector + pozStart, numeVector + 1 + pozFinal);</sub>

<sub>Ex: Vreau sa sortez</sub> **<sub>crescator</sub>** <sub>vectorul v cu elemente de la 1 la n</sub>

<sup>sort( v + 1, v + n + 1);</sup>

<sup>Ex : Vreau sa sortez linia 5 din matricea A cu coloane de la 1 la m</sup>

<sup>sort( A\[5\] + 1, A\[5\] + m + 1);</sup>

<sup>Functia de comparare</sup>

- <sup>primește 2 parametri - acești parametri trebuie sa fie de tipul elementelor din lista</sup>
- <sup>returneaza un bool - trebuie sa returneze</sup> **<sup>1</sup>** <sup>dacă cele 2 elemente date ca parametri sunt o pereche corect sortata (in ordinea in care sunt date ca parametri)</sup>

<sup>Ex: vreau sa sortez un sir de int-uri descrescator</sup>

<sup>bool compara(int a, int b)</sup>

<sup>{</sup>

<sup>return a > b;</sup>

<sup>/\* SAU</sup>

<sup>if (a > b)</sup>

<sup>return 1;</sup>

<sup>return 0;</sup>

<sup>\*/</sup>

<sup>}</sup>

<sup>Parametri cu referință</sup>

# <sup>Ce se întâmplă când se apelează o funcție? (en. PASS BY VALUE)</sup>

<sup>#include &lt;iostream&gt;</sup>

<sup>using namespace std;</sup>

<sup>void f(int k)</sup>

<sup>{</sup>

<sup>k += 5;</sup>

<sup>// k este o zona de memorie diferita fata de x-ul din main</sup>

<sup>// fiecare parametru este o copie a valorii primita la apel</sup>

<sup>}</sup>

<sup>int main()</sup>

<sup>{</sup>

<sup>int x = 3;</sup>

<sup>f(x);</sup>

<sup>cout << x; // se afiseaza 3</sup>

<sup>return 0;</sup>

<sup>}</sup>

<sup>Ce se intampla cand dau ca parametru prin referinta ? (en. PASS BY REFERENCE)</sup>

<sup>#include &lt;iostream&gt;</sup>

<sup>using namespace std;</sup>

<sup>void f(int &k)</sup>

<sup>{</sup>

<sup>// pe stiva, in spatele cortinei, s-a copiat adresa la ce am primit la apel</sup>

<sup>// (NU s-a copiat valoarea)</sup>

<sup>k += 5; // aici modific zona de memorie primita la apel</sup>

<sup>// pot face asta deoarece in apel retin adresa</sup>

<sup>}</sup>

<sup>int main()</sup>

<sup>{</sup>

<sup>int x = 3;</sup>

<sup>f(x);</sup>

<sup>cout << x; // se afiseaza 8</sup>

<sup>return 0;</sup>

<sup>}</sup>

<sup>Un cod echivalent folosind pointeri ar fi :</sup>

<sup>void f2(int\* p)</sup>

<sup>{</sup>

<sup>\*p += 5;</sup>

<sup>}</sup>

<sup>int main()</sup>

<sup>{</sup>

<sup>int x = 3;</sup>

<sup>f2(&x);</sup>

<sup>cout << x; // se afiseaza 8</sup>

<sup>return 0;</sup>

<sup>}</sup>

**_<sup>Obs: Vectorii in C++ sunt PASS BY REFERENCE (la apel, se copiază adresa, nu valoarea)</sup>_**

**<sup>#include &lt;iostream&gt;</sup>**

**<sup>using namespace std;</sup>**

**<sup>int x\[\] = {8, 9, 4, 5};</sup>**

**<sup>void f(int v\[\])</sup>**

**<sup>{</sup>**

**<sup>// cand dau ca parametru un vector</sup>**

**<sup>// NU se copiaza vectorul pe stiva</sup>**

**<sup>// Se copiaza doar adresa sa (adresa primului element)</sup>**

**<sup>v\[2\] += 10;</sup>**

**<sup>// => orice modificare fac asupra vectorului in functie</sup>**

**<sup>// se va regasi si in afara</sup>**

**<sup>// ( pt ca era aceiasi zona de memorie )</sup>**

**<sup>}</sup>**

**<sup>int main()</sup>**

**<sup>{</sup>**

**<sup>f(x);</sup>**

**<sup>int i;</sup>**

**<sup>for (i = 0; i < 4; i++)</sup>**

**<sup>cout << x\[i\] << " ";</sup>**

**<sup>// Afisare : 8 9 14 5</sup>**

**<sup>return 0;</sup>**

**<sup>}</sup>**

Probleme cu TOATE/EXISTA

("Verificarea unor proprietăți")

Am la dispoziție catalogul clasei unde la fiecare elev găsesc anumite proprietăți ale sale.

|                            | EXISTA                                                                                                       | TOATE                                                                                            |
| -------------------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| Propozitie                 | Exista un elev _cu media < 5_ ?                                                                              | Sunt toți elevii majori ? (varsta >= 18)                                                         |
| ---                        | ---                                                                                                          | ---                                                                                              |
| **Mă opresc:**             | La primul corigent (sau, în caz contrar - nu am găsit niciun corigent )                                      | La primul elev care NU e major. (sau în caz contrar - nu am găsit niciun minor)                  |
| ---                        | ---                                                                                                          | ---                                                                                              |
| **Mă opresc la**           | **\=> primul EXEMPLU**<br><br>(primul element care îndeplinește condiția)                                    | **\=> primul CONTRAEXEMPLU**<br><br>( primul element care **NU** îndeplinește condiția)          |
| ---                        | ---                                                                                                          | ---                                                                                              |
| **⇔ Fac cat timp:**        | **existaCorigent == 0**<br><br>**( caut cat timp nu exista corigent ⇔ cat timp nu l-am găsit)**              | **totiMajori == 1**<br><br>**(caut cat timp am găsit doar majori ⇔ cat timp NU am găsit minor)** |
| ---                        | ---                                                                                                          | ---                                                                                              |
| **Presupunerea inițială:** | inițial presupunem ca NU EXISTA element sa indeplineasca conditia<br><br>(de ex. : **existaCorigent = 0;** ) | inițial presupunem ca TOATE/TOȚI indeplinesc conditia<br><br>(de ex. : **totiMajori = 1;** )     |
| ---                        | ---                                                                                                          | ---                                                                                              |
| **Sinonime**               | **cel puțin 1 sa …,**<br><br>**măcar 1 sa …,**<br><br>**șirul sa contina …**                                 | **oricum, oricare, fiecare**                                                                     |
| ---                        | ---                                                                                                          | ---                                                                                              |

Keyword-ul static

În limbajul C se folosește ca prefix înainte declarării unei variabile în cadrul unei funcții.

(

Static = în limba romana înseamnă "ce nu se misca"

În informatica, static înseamnă ca mereu îl voi găsi în același loc (ca adresa în memorie).

)

Dacă o variabila locala este statică atunci:

- este accesibilă doar din cadrul funcției (la fel ca o locală obișnuită)
- se aloca in memorie DOAR 1 DATA la începutul programului (la fel ca o variabila globala)

# include &lt;iostream&gt;

using namespace std;

int f1(int x)

{

static int q = 0;

q += x;

cout << q << " ";

}

int f2(int x)

{

int q = 0;

q += x;

cout << q << " ";

}

int main()

{

f2(1); f2(2); f2(3); // se afiseaza 1 2 3

cout << endl;

f1(1); f1(2); f1(3); // se afiseaza 1 3 6

return 0;

}

# Debug

- Înseamnă execuția programului pas cu pas
- este util pentru a depista erori de execuție; acestea apar la execuția programului, după ce am reușit să compilez cu succes
- erori de execuție = când programul nu se "comportă" conform așteptărilor mele

Pași:

- Pun cursorul pe linia de unde vreau sa incep execuția pas cu pas (debug-ul)
- Apas **F4 (Run to cursor)** - programul va porni și se va executa tot codul până la linia unde am pus cursorul **EXCLUSIV** (adică mai puțin acea linie)
  - Obs #1: Pe ecran va apărea o sageata galbena ce îmi indica linia **ce urmează** sa fie executată
  - Obs #2: Dacă acea săgeată nu a apărut pe ecran inseamna că execuția nu a ajuns unde am pus cursorul. De ce ? Cauze posibile:
    - Există o operație blocantă - ex: **citirea**
      - (nu poate merge mai departe execuția până nu citește de la tastatură)
    - O structura repetitivă ce nu se mai termină
- Apas **F7 (Next line)** pentru a executa linia curentă
- **\[Pentru clasa a X-a\] Shift + F7 - Step into**
  - Dacă pe linia curentă am un apel de funcție atunci va intra cu execuția pas cu pas la începutul acelei funcții
  - În caz contrar (nu am apel de funcție), are același efect ca **F7**
- **Shift + F8 - Stop Debugger**
  - **pentru a opri debugger-ui**
  - **pot opri debugger-ul și daca inchid programul**
- **Watches**
  - Pentru a vedea valoarea unei variabile sau a unei expresii în locul unde am ajuns cu execuția voi deschide **_Watches_**
  - Deschid din _Debug -> Debugging Windows -> Watches_
- Stiva de apeluri
  - en. call stack
  - Deschid din Debug -> Debugging Windows -> Call stack
  - Mereu primul apel din stiva ("cel mai de sus") este apelul în care sunt cu execuția
  - Odată ce o funcție ia sfârșit (am executat instrucțiunea **return** SAU am executat tot codul din funcție (la o functie void)) se va șterge cel mai de sus apel din stiva și voi reveni/continua cu execuția din funcția memorată în stiva un rand mai jos.