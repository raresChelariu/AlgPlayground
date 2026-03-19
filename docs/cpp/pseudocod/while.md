#

```c
while (conditie)
{
    Instr;
}
```

```mermaid
graph TD

C{Conditie adevarata?} --> |Adevarat| IIf[Instructiune If]
C --> |Fals| IElse[Instructiune Else]

```