# Variabile și tipuri de date

O **variabilă** este o cutie cu un nume în care stocăm o valoare. În Java trebuie să specificăm și **tipul** valorii înainte de a o folosi.

## Tipuri de bază

| Tip | Ce stochează | Exemplu |
|-----|-------------|---------|
| `int` | Numere întregi | `7`, `-3`, `1000` |
| `double` | Numere reale | `3.14`, `-0.5` |
| `String` | Text (șir de caractere) | `"Salut"` |
| `boolean` | Adevărat / Fals | `true`, `false` |
| `char` | Un singur caracter | `'A'`, `'z'` |

---

## Declarare și inițializare

```java
public class Variabile {
    public static void main(String[] args) {
        int varsta = 16;
        double inaltime = 1.75;
        String nume = "Maria";
        boolean esteElev = true;
        char initiala = 'M';

        System.out.println(nume);
        System.out.println(varsta);
        System.out.println(inaltime);
        System.out.println(esteElev);
        System.out.println(initiala);
    }
}
```

**Output:**
```
Maria
16
1.75
true
M
```

> **Obs:** `String` se scrie cu majusculă, celelalte tipuri de bază cu minusculă.

---

## Folosirea variabilelor în mesaje

Poți combina text și variabile cu operatorul `+`:

```java
public class Prezentare {
    public static void main(String[] args) {
        String nume = "Alexandru";
        int varsta = 17;
        String oras = "Cluj";

        System.out.println("Mă numesc " + nume + " și am " + varsta + " ani.");
        System.out.println("Locuiesc în " + oras + ".");
    }
}
```

**Output:**
```
Mă numesc Alexandru și am 17 ani.
Locuiesc în Cluj.
```

---

## Modificarea valorii unei variabile

```java
public class Contor {
    public static void main(String[] args) {
        int puncte = 0;
        System.out.println("Puncte inițiale: " + puncte);

        puncte = 10;
        System.out.println("După prima rundă: " + puncte);

        puncte = puncte + 5;
        System.out.println("După a doua rundă: " + puncte);
    }
}
```

**Output:**
```
Puncte inițiale: 0
După prima rundă: 10
După a doua rundă: 15
```

> **Obs:** `puncte = puncte + 5` înseamnă „ia valoarea curentă a lui `puncte`, adaugă 5, și pune rezultatul înapoi în `puncte`".
