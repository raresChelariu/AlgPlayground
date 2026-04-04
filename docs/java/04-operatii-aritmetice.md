# Operații aritmetice

Java suportă operațiile matematice de bază. Rezultatul depinde de **tipul** variabilelor implicate.

## Operatori

| Operator | Operație | Exemplu | Rezultat |
|----------|---------|---------|---------|
| `+` | Adunare | `3 + 4` | `7` |
| `-` | Scădere | `10 - 3` | `7` |
| `*` | Înmulțire | `3 * 4` | `12` |
| `/` | Împărțire | `10 / 3` | `3` (întreg!) |
| `%` | Rest | `10 % 3` | `1` |

---

## Exemplu de bază

```java
import java.util.Scanner;

public class Calculator {
    public static void main(String[] args) {
        Scanner cititor = new Scanner(System.in);

        System.out.print("Primul număr: ");
        int a = cititor.nextInt();

        System.out.print("Al doilea număr: ");
        int b = cititor.nextInt();

        System.out.println("Suma: " + (a + b));
        System.out.println("Diferența: " + (a - b));
        System.out.println("Produsul: " + (a * b));
        System.out.println("Câtul: " + (a / b));
        System.out.println("Restul: " + (a % b));
    }
}
```

**Exemplu de rulare:**
```
Primul număr: 10
Al doilea număr: 3
Suma: 13
Diferența: 7
Produsul: 30
Câtul: 3
Restul: 1
```

---

## Împărțire întreagă vs. reală

Când ambele numere sunt `int`, Java face **împărțire întreagă** (trunchiază zecimalele):

```java
public class ImpărțireDemo {
    public static void main(String[] args) {
        int a = 7;
        int b = 2;

        int rezultatIntreg = a / b;           // 3 (nu 3.5!)
        double rezultatReal = (double) a / b; // 3.5

        System.out.println("Împărțire întreagă: " + rezultatIntreg);
        System.out.println("Împărțire reală: " + rezultatReal);
    }
}
```

**Output:**
```
Împărțire întreagă: 3
Împărțire reală: 3.5
```

> **Obs:** `(double) a` se numește **conversie de tip** (casting). Transformă `a` în `double` doar pentru acel calcul, fără să modifice variabila originală.

---

## Restul împărțirii (`%`)

Operatorul `%` este util pentru a afla dacă un număr este par sau impar, sau pentru a extrage cifre:

```java
import java.util.Scanner;

public class ParImpar {
    public static void main(String[] args) {
        Scanner cititor = new Scanner(System.in);

        System.out.print("Introdu un număr: ");
        int numar = cititor.nextInt();

        int rest = numar % 2;
        System.out.println("Restul împărțirii la 2 este: " + rest);
    }
}
```

**Exemplu de rulare:**
```
Introdu un număr: 7
Restul împărțirii la 2 este: 1
```

> **Obs:** Dacă restul față de `2` este `0`, numărul este par. Dacă este `1`, este impar.

---

## Ordinea operațiilor

Java respectă ordinea matematică: `*`, `/`, `%` se calculează înainte de `+` și `-`. Folosește **paranteze** pentru a controla ordinea:

```java
public class OrdineOperatii {
    public static void main(String[] args) {
        int rezultat1 = 2 + 3 * 4;    // 14 (înmulțirea primul)
        int rezultat2 = (2 + 3) * 4;  // 20 (paranteza primul)

        System.out.println("Fără paranteze: " + rezultat1);
        System.out.println("Cu paranteze: " + rezultat2);
    }
}
```

**Output:**
```
Fără paranteze: 14
Cu paranteze: 20
```
