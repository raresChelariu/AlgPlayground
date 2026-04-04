# Citirea datelor de la tastatură

Pentru a citi date introduse de utilizator folosim clasa **`Scanner`**, care trebuie importată la începutul fișierului.

## Structura de bază

```java
import java.util.Scanner; // importăm Scanner o singură dată, la început

public class CitireSimplă {
    public static void main(String[] args) {
        Scanner cititor = new Scanner(System.in); // pregătim cititorul

        System.out.print("Introdu un număr: ");
        int numar = cititor.nextInt(); // citim un număr întreg

        System.out.println("Ai introdus: " + numar);
    }
}
```

**Exemplu de rulare:**
```
Introdu un număr: 42
Ai introdus: 42
```

---

## Metode de citire

| Metodă | Citește |
|--------|---------|
| `cititor.nextInt()` | Un număr întreg (`int`) |
| `cititor.nextDouble()` | Un număr real (`double`) |
| `cititor.next()` | Un cuvânt (până la spațiu) |
| `cititor.nextLine()` | O linie întreagă de text |

---

## Citirea mai multor valori

```java
import java.util.Scanner;

public class DatePersonale {
    public static void main(String[] args) {
        Scanner cititor = new Scanner(System.in);

        System.out.print("Numele tău: ");
        String nume = cititor.nextLine();

        System.out.print("Vârsta ta: ");
        int varsta = cititor.nextInt();

        System.out.println("Salut, " + nume + "! Ai " + varsta + " de ani.");
    }
}
```

**Exemplu de rulare:**
```
Numele tău: Ioana
Vârsta ta: 15
Salut, Ioana! Ai 15 de ani.
```

---

## Citirea numerelor reale

```java
import java.util.Scanner;

public class CalculMedie {
    public static void main(String[] args) {
        Scanner cititor = new Scanner(System.in);

        System.out.print("Prima notă: ");
        double nota1 = cititor.nextDouble();

        System.out.print("A doua notă: ");
        double nota2 = cititor.nextDouble();

        double medie = (nota1 + nota2) / 2;
        System.out.println("Media ta este: " + medie);
    }
}
```

**Exemplu de rulare:**
```
Prima notă: 8.5
A doua notă: 9
Media ta este: 8.75
```

> **Obs:** Pe unele sisteme, separatorul zecimal poate fi `,` în loc de `.` — depinde de setările regionale ale calculatorului.

> **Obs:** Dacă citești un `int` cu `nextInt()` și apoi un `String` cu `nextLine()`, linia a doua va fi goală. Soluție: adaugă un `cititor.nextLine()` suplimentar între ele pentru a „consuma" Enter-ul rămas.
