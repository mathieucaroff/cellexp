from datetime import datetime, timedelta
import sys

import yaml # pip install PyYaml

def eprint(*a, **kw):
   print(*a, file=sys.stderr, **kw)

def toDate(text):
   return datetime.fromisoformat(text.split("+")[0])

def toDelta(text):
   a, b = text.split(" -> ")
   da = toDate(a)
   db = toDate(b)
   delta = db - da
   return delta

if len(sys.argv) >= 2:
   timeFileName = sys.argv[1]
else:
   timeFileName = "time.yaml"
   try:
      with open(timeFileName):
         pass
   except Exception:
      timeFileName = "doc-project-en/" + timeFileName

with open(timeFileName) as f:
   data = yaml.safe_load(f)
   del data["title"]

   for goalName, goal in data.items():
      print(f"{goalName=}")
      total = timedelta()
      for item in goal["result"]:
         if "time" in item:
            total += toDelta(item["time"])
         elif "timeList" in item:
            for timeText in item["timeList"]:
               total += toDelta(timeText)
         elif "start" in item:
            pass
         else:
            eprint(f"unrecognized {item=}")

      totalMinute, second = divmod(total.seconds, 60)
      totalHour, minute = divmod(totalMinute, 60)
      print(f"{totalHour}h{minute:02}m{second:02}s")
