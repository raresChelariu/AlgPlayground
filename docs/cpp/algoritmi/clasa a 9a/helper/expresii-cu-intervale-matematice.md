# Expresii cu intervale matematice

⇔ x < 5

⇔ x <= 7

⇔ x > 3

⇔ x > 2 && x < 7

⇔ x > 2 && x <= 5 || x >= 7 && x < 13

> **Obs:** Datorită prioritatii operatorilor, pt expr de mai sus parantezele sunt opționale!

⇔ x > 2 && x <= 9  &&   x >=5 && x < 11

⇔ !(x > 2 && x <= 9  &&   x >=5 && x < 11) ⇔

⇔ !(x > 2 && x <= 9) || !(x >=5 && x < 11)

⇔ ( !(x > 2) || !(x <= 9) ) || ( !(x >= 5) || !(x < 11) )

⇔ ( x <=2 || x > 9) || ( x < 5 || x >= 11)
