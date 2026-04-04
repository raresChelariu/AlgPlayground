# Primul program Java

Orice program Java are nevoie de o **clasă** și de o metodă specială numită `main` — aceasta este prima instrucțiune executată de calculator.

## Structura minimă

```java
public class PrimulProgram {               // numele clasei (trebuie să coincidă cu numele fișierului)
    public static void main(String[] args) { // punctul de start al programului
        System.out.println("Salut!");        // afișează un text și trece pe linia nouă
    }
}
```

**Output:**
```
Salut!
```

> **Obs:** Numele fișierului trebuie să fie exact `PrimulProgram.java` — Java este case-sensitive.

---

## `println` vs `print`

| Metodă | Comportament |
|--------|-------------|
| `System.out.println(...)` | Afișează și trece pe **linie nouă** |
| `System.out.print(...)` | Afișează **fără** linie nouă |

### Exemplu cu `println`

```java
public class ExempluPrintln {
    public static void main(String[] args) {
        System.out.println("Prima linie");
        System.out.println("A doua linie");
        System.out.println("A treia linie");
    }
}
```

**Output:**
```
Prima linie
A doua linie
A treia linie
```

### Exemplu cu `print`

```java
public class ExempluPrint {
    public static void main(String[] args) {
        System.out.print("Ana ");
        System.out.print("are ");
        System.out.print("mere.");
    }
}
```

**Output:**
```
Ana are mere.
```

> **Obs:** Fără `println`, toate textele apar pe aceeași linie.

---

## Caractere speciale în text

Poți folosi `\n` pentru a forța o linie nouă chiar și în cadrul unui `print`:

```java
public class LiniiNoi {
    public static void main(String[] args) {
        System.out.print("Linia 1\nLinia 2\nLinia 3");
    }
}
```

**Output:**
```
Linia 1
Linia 2
Linia 3
```
