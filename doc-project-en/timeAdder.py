from datetime import datetime
import sys

def eprint(*a, **kw):
   print(*a, file=sys.stderr, **kw)

book = []

with open("time.md") as f:
   it = iter(f)
   for line in it:
      if line == f"## {sys.argv[1]}\n":
         break
   for line in it:
      if line.startswith("## "):
         break
      if line.startswith("2020") and "> 2020" in line:
         book.append(line)

print(f"{len(book)=}")

total = 0

for line in book:
   sep = " -> "
   if sep not in line:
      sep = " => "
   if sep not in line:
      eprint(f"WARNING, with line [{line}]")
      continue
   a, bc = line.split(sep)
   b, cc = bc.split(" :")
   da = datetime.fromisoformat(a.split("+")[0])
   db = datetime.fromisoformat(b.split("+")[0])
   delta = db - da
   print(f"{dir(delta)=}")
   total += delta.total_seconds()

print(f"{total=}")
print(f"{total//60=}")
