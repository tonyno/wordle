# http://www.pspad.com/cz/download.htm
# http://szj.cz/seznam-ceskych-podstatnych-jmen/ -> https://pastebin.com/7uPetKWh


f = open('data_prepare/Czech.3-2-5.dic', 'r', encoding='windows-1250')
data = 'export const WORDS = ['
for line in f:
    line = line.strip()
    if len(line) == 5:
        data += '"{}",\n'.format(line)
f.close()
data += '];'

fw = open('data_prepare/wordlist.ts', 'w', encoding='utf-8')
fw.write(data)
fw.close()
