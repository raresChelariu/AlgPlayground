# Instrucțiunea if-else

`if-else` permite programului să ia **decizii**: execută un bloc de cod doar dacă o condiție este adevărată.

## Forma simplă: `if`

```java
import java.util.Scanner;

public class VerificareVarsta {
    public static void main(String[] args) {
        Scanner cititor = new Scanner(System.in);

        System.out.print("Câți ani ai? ");
        int varsta = cititor.nextInt();

        if (varsta >= 18) {
            System.out.println("Ești major.");
        }
    }
}
```

**Exemplu de rulare (cazul adevărat):**
```
Câți ani ai? 20
Ești major.
```

**Exemplu de rulare (cazul fals — nu se afișează nimic):**
```
Câți ani ai? 15

```

---

## `if-else`

Adaugă un bloc care se execută când condiția este **falsă**:

```java
import java.util.Scanner;

public class ParSauImpar {
    public static void main(String[] args) {
        Scanner cititor = new Scanner(System.in);

        System.out.print("Introdu un număr: ");
        int numar = cititor.nextInt();

        if (numar % 2 == 0) {
            System.out.println(numar + " este par.");
        } else {
            System.out.println(numar + " este impar.");
        }
    }
}
```

**Exemplu de rulare:**
```
Introdu un număr: 7
7 este impar.
```

---

## `if-else if-else`

Pentru mai multe cazuri posibile:

```java
import java.util.Scanner;

public class NotaVerbala {
    public static void main(String[] args) {
        Scanner cititor = new Scanner(System.in);

        System.out.print("Introdu nota (1-10): ");
        int nota = cititor.nextInt();

        if (nota == 10) {
            System.out.println("Excelent!");
        } else if (nota >= 7) {
            System.out.println("Bine.");
        } else if (nota >= 5) {
            System.out.println("Suficient.");
        } else {
            System.out.println("Insuficient.");
        }
    }
}
```

**Exemplu de rulare:**
```
Introdu nota (1-10): 8
Bine.
```

> **Obs:** Condițiile sunt verificate **în ordine**. De îndată ce una este adevărată, restul sunt ignorate.

---

## Operatori de comparație

| Operator | Semnificație |
|----------|-------------|
| `==` | Egal cu |
| `!=` | Diferit de |
| `<` | Mai mic decât |
| `>` | Mai mare decât |
| `<=` | Mai mic sau egal |
| `>=` | Mai mare sau egal |

> **Obs:** Pentru compararea valorilor folosim `==` (dublu egal), nu `=` (care este atribuire).

---

## Operatori logici

Poți combina mai multe condiții:

| Operator | Semnificație | Exemplu |
|----------|-------------|---------|
| `&&` | ȘI (ambele adevărate) | `varsta >= 6 && varsta <= 18` |
| `\|\|` | SAU (cel puțin una adevărată) | `nota == 1 \|\| nota == 2` |
| `!` | NU (negare) | `!esteElev` |

```java
import java.util.Scanner;

public class BilietRedus {
    public static void main(String[] args) {
        Scanner cititor = new Scanner(System.in);

        System.out.print("Vârsta ta: ");
        int varsta = cititor.nextInt();

        if (varsta < 12 || varsta >= 65) {
            System.out.println("Beneficiezi de bilet redus.");
        } else {
            System.out.println("Plătești prețul întreg.");
        }
    }
}
```

**Exemplu de rulare:**
```
Vârsta ta: 8
Beneficiezi de bilet redus.
```
