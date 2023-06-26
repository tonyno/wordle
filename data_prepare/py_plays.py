import hashlib
import datetime

print(hashlib.md5("".encode('utf-8')).hexdigest())


print(datetime.datetime.now() + datetime.timedelta(days=1400))
