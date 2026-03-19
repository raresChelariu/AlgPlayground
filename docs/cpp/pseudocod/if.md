#

```c
if (conditie)
{
    InstrIf;
}
else
{
    InstrElse;
}
```

```mermaid
graph TD
C{Conditie adevarata?} -->|Adevarat| IIf[Instructiune If]
C -->|Fals| IElse[Instructiune Else]
```