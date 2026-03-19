# Interclasare

Dacă am 2 vectori sortati, cum obțin un al 3lea vector cu toate elementele celor 2, tot sortat?

A și B sunt vectorii sortati (crescator) (primiți la intrare)

C - este vectorul “final”

Idee :

Pun în C la fiecare pas minimul dintre:

cel mai mic element din A pe care nu l-am luat pana acum

și cel mai mic element din B pe care nu l-am luat pana acum.

=> trebuie sa stiu la fiecare pas care este elem curent din A, respectiv cel curent din B
