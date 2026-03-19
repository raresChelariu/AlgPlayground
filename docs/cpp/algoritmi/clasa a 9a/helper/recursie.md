# Recursie

Funcție recursivă - definiție:  Funcție ce conține în definiția ei apeluri ale ei.  (Funcție ce ajunge să se apeleze pe ea însăși.)

Recursie

Directă - atunci cand funcția în cauză conține apeluri ale ei (chiar în definiția acesteia)

Indirectă - atunci când funcția ajunge să se apeleze pe ea însăși, dar în definiția funcției nu găsim apeluri ale aceleiași funcții.

Ex Recursie directă:

Ex Recursie indirectă:

Materia de liceu (și facultate, în mare parte) se axează, în principiu, DOAR pe recursia directa.

Să ne amintim:

Ce se întâmplă când se apelează o funcție ?

PC-ul tine minte de unde se apelează funcția

Se copiaza valorile parametrilor pe stiva

Se executa codul funcției

După terminarea funcției, calculatorul continua cu execuția din locul memorat la pasul 1

> **Obs:** Zona de memorie în care se memoreaza apelurile de funcție se numește stivă. În mod evident, fiind o zonă de memorie, aceasta este finită (NU POT SĂ AM O INFINITATE DE APELURI PE STIVA).

> **Obs:** Putem, în mod eronat, să apelăm o funcție recursivă, ce se apelează pe sine la nesfârșit - acest fenomen se numește recursie infinită. Dacă apelăm o astfel de funcție, stiva se va umple până la refuz, iar când programul va încerca sa mai adauge încă un apel pe stiva, programul va “crapa” - acest fenomen se numește “stack overflow” (stack - stiva; overflow - “a da pe afară”, inundație).

Ex de recursie infinită:

Ex 2:

Cum “gândim” o funcție recursivă ?

Cazul de bază/Cazul banal

cazul/situația unde răspunsul este “banal”

cazul/momentul în care se oprește recursia

Cazul general

pentru ca recursia să meargă mai departe

aici voi avea apelul recursiv

Promisiune: Mă voi asigura întotdeauna că în momentul în care tratez cazul banal voi opri execuția.

> **Obs:** În scrierea funcției prima data tratez cazul banal - de ce ? ca sa mă asigur ca NU am recursie infinită.

N factorial

(vom trata ca un șir)

fn = fn-1 * n

f1 = 1
