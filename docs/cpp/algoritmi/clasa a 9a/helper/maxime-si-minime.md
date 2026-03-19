# Maxime și minime

Caz: Citesc n numere. Vreau să determin numărul maxim.

> **Obs:** Voi folosi o variabila pentru memorarea maximului.

Metoda 1:

Inițial maximul este primul element.

Pentru fiecare element din șir, începând cu al doilea, voi compara maximul cu elementul curent. Dacă maximul e mai mic ca elementul curent, atunci actualizez maximul.

Metoda 2:

> **Obs:** Știu ca numerele mele sunt din intervalul [valMin, valMax].

Inițializez maximul cu valMin-1. (Dacă trebuie sa aflu minimul initializez cu valMax+1)

Compar maximul cu fiecare din cele n elemente și dacă este mai mic ca numărul curent, actualizez maximul cu valoarea curentă.

> **Obs:** Dacă vreau sa aplic metoda 2 pentru aflarea minimului atunci voi inițializa minimul cu valMax+1. Logica primului pas al metodei 2 este ca primul număr citit este atât maxim, cât și minim la momentul citirii sale (ex din viata reala: Înălțimea minima dintr-o clasa cu 1 elev este înălțimea respectivului elev).
