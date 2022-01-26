# http://www.pspad.com/cz/download.htm
# http://szj.cz/seznam-ceskych-podstatnych-jmen/ -> https://pastebin.com/7uPetKWh

import random
import re

types = {}
guess_types = ['DEFAULT', 'ON', 'SN', 'BN', 'C',
               'YN', 'YR', 'YKR', 'PVZQ', 'other', 'LR']
word_types = ['H', 'ZQ', 'Z', 'YKRN', 'U', 'S', 'ATN', 'PI', 'MQ', 'JTN', 'Q',
              'PIV', 'YRN', 'AN', 'JN', 'K', 'IN', 'HR', 'MQR', 'YKRON', 'BTN', 'ACN']
guesses = []
words = []


def add_files(file_name, encoding='utf-8'):
    global guesses
    f = open(file_name, 'r', encoding=encoding)
    for line in f:
        word = line.strip()
        if len(word) == 5:
            if word not in guesses:
                guesses.append(word)
    f.close()


f = open('data_prepare/input/cs_CZ.dic', 'r', encoding='utf-8')
for line in f:
    word, word_type = line.strip(), 'DEFAULT'
    if '/' in word:
        (word, word_type) = word.split('/')
    if word_type in ['?']:
        word_type = 'other'
    if len(word) == 5 and re.fullmatch('[a-zěščřžýáíéů]+', word.lower()):
        types.setdefault(word_type, []).append(word)
        if word_type in word_types:
            words.append(word)
        if word_type in word_types or word_type in guess_types:
            guesses.append(word)
f.close()

add_files('data_prepare/input/Česká podstatná jména.txt')
add_files('data_prepare/input/Czech.3-2-5.dic', 'windows-1250')


for word_type in types:
    print(word_type, len(types[word_type]))
    if (len(types[word_type]) > 20):
        fw = open('data_prepare/output/.exploration_{}'.format(word_type),
                  'w', encoding='utf-8')
        fw.write('\n'.join(types[word_type]))
        fw.close()

words = list(set(word.upper() for word in words))
random.shuffle(words)
random.shuffle(words)
random.shuffle(words)
random.shuffle(words)


fw = open('data_prepare/output/wordlist.ts', 'w', encoding='utf-8')
fw.write('export const WORDS = [')
fw.write(''.join('"{}",\n'.format(w.lower()) for w in words))
fw.write('];')
fw.close()

fw = open('data_prepare/output/validGuesses.ts', 'w', encoding='utf-8')
fw.write('export const VALIDGUESSES = [')
fw.write(''.join('"{}",\n'.format(w.lower()) for w in guesses))
fw.write('];')
fw.close()

fw = open('data_prepare/input/final_words_new1.txt', 'w', encoding='utf-8')
fw.write('\n'.join(w.upper() for w in words))
fw.close
