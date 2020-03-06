class1 = [0, 8, 32, 40, 64, 96, 128, 136, 160, 168, 192, 224, 234, 235, 238, 239, 248, 249, 250, 251, 252, 253, 254, 255]
class3 = [18, 22, 30, 45, 60, 75, 86, 89, 90, 101, 102, 105, 122, 126, 129, 135, 146, 149, 150, 151, 153, 161, 165, 182, 183, 195]
class4 = [54, 106, 110, 120, 124, 137, 147, 169, 193, 225]

class134 = [*class1, *class3, *class4]
class2 = [k for k in range(256) if k not in class134]

source = [
   ['class1', class1],
   ['class2', class2],
   ['class3', class3],
   ['class4', class4],
   ['famous', (110, 30, 90)],
   ['primitive', (0, 255, 204, 51, 170, 240)],
   ['triangle', (18, 22, 26, 30, 122, 126)],
   ['turing-complete', (110,)],
   ['twinkling', (41, 45, 62, 73, 105, 94, 15, 51)],
   ['xor', (60, 90, 105, 150)],
   ["author-favorite", (73, 26, 105)],
]

"""
0 000
1 001 a
2 010
3 011 b
4 100 a
5 101
6 110 b
7 111
"""

def lr(rule):
   bitList = [*format(rule, "08b")]
   bitList[1], bitList[4] = bitList[4], bitList[1]
   bitList[3], bitList[6] = bitList[6], bitList[3]
   return int("".join(bitList), 2)

def color(rule):
   return int(format(255 - rule, "08b")[::-1], 2)

def derivate(rule):
   return [rule, lr(rule), color(rule), lr(color(rule))]

result = [[] for k in [0] * 256]

for trait, ruleList in source:
   for baseRule in ruleList:
      for rule in derivate(baseRule):
         if trait not in result[rule]:
            result[rule].append(trait)

for rule in range(256):
   if color(rule) == rule:
      result[rule].append('self-conjugate')
   if lr(rule) == rule:
      result[rule].append('self-left-right')
   if color(lr(rule)) == rule:
      result[rule].append('self-left-right-conjugate')

print("{")
for rule, info in enumerate(result):
   print(f"   {rule}: {info},")
print("}")
