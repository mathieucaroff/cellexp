# Printing all bi-simple automata with names

## Without column titles

- C: Constant
- T: Twinkling
- RE(L/R) / FE(L/R): Rising Edge go left, Falling Edge go right

```py
nameList = [
  'C0',
  'TB0',
  'REL/0',
  'TL',
  'FER/0',
  'TR',
  'XOR',
  'TB1',
  'AND',
  'XAND',
  'R',
  'FEL/1',
  'L',
  'RER/1',
  'OR',
  'C1',
]

for k, name in enumerate(nameList):
  digitString = " ".join(f"{k:04b}")
  print(f"{k:2d}  {digitString}  {name}")
```

```txt
 0  0 0 0 0  C0
 1  0 0 0 1  TB0
 2  0 0 1 0  REL/0
 3  0 0 1 1  TL
 4  0 1 0 0  FER/0
 5  0 1 0 1  TR
 6  0 1 1 0  XOR
 7  0 1 1 1  TB1
 8  1 0 0 0  AND
 9  1 0 0 1  XAND
10  1 0 1 0  R
11  1 0 1 1  FEL/1
12  1 1 0 0  L
13  1 1 0 1  RER/1
14  1 1 1 0  OR
15  1 1 1 1  C1
```

# With column titles

```py
print("     11 10 01 00    [name]")
for k, name in enumerate(nameList):
  digitString = "  ".join(f"{k:04b}")
  print(f"{k:2d}    {digitString}    {name}")
```

```txt
     11 10 01 00    [name]
 0    0  0  0  0    C0
 1    0  0  0  1    TB0
 :    :  :  :  :    :
 :    :  :  :  :    :
```
