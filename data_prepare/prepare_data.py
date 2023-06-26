# http://www.pspad.com/cz/download.htm
# http://szj.cz/seznam-ceskych-podstatnych-jmen/ -> https://pastebin.com/7uPetKWh

import random
import re
import datetime
import firebase_admin
from firebase_admin import credentials, firestore

types = {}
guess_types = ['DEFAULT', 'ON', 'SN', 'BN', 'C',
               'YN', 'YR', 'YKR', 'PVZQ', 'other', 'LR']
word_types = ['H', 'ZQ', 'Z', 'YKRN', 'U', 'S', 'ATN', 'PI', 'MQ', 'JTN', 'Q',
              'PIV', 'YRN', 'AN', 'JN', 'K', 'IN', 'HR', 'MQR', 'YKRON', 'BTN', 'ACN', 'SN', 'BN', 'C']
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


def get_previous_words(db):
    lastDate = datetime.datetime(2030, 5, 1)
    doc_ref = db.collection(u'word').where(
        u'exactTimeStamp', u'<=', lastDate).stream()
    return set([item.to_dict()['solution'].upper() for item in doc_ref])


if __name__ == '__main__':

    # Use a service account
    cred = credentials.Certificate(
        'data_calculate/wordle-cz-firebase-adminsdk-q7ldn-01d406365d.json')
    firebase_admin.initialize_app(cred)

    db = firestore.client()

    previous_words = get_previous_words(db)
    print(previous_words)

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

    TOTAL_EXPORT = 0

    for word_type in types:
        # print(word_type, len(types[word_type]))
        if (len(types[word_type]) > 20):
            fw = open('data_prepare/output/.exploration_{}'.format(word_type),
                      'w', encoding='utf-8')
            fw.write('\n'.join(types[word_type]))
            TOTAL_EXPORT += len(types[word_type])
            fw.close()

    words = list(set(word.upper()
                 for word in words if word.upper() not in previous_words))
    random.shuffle(words)
    random.shuffle(words)
    random.shuffle(words)
    random.shuffle(words)

    # fw = open('data_prepare/output/wordlist.ts', 'w', encoding='utf-8')
    # fw.write('export const WORDS = [')
    # fw.write(''.join('"{}",\n'.format(w.lower()) for w in words))
    # fw.write('];')
    # fw.close()

    fw = open('data_prepare/output/validGuesses.ts', 'w', encoding='utf-8')
    fw.write('export const VALIDGUESSES = [')
    fw.write(''.join('"{}",\n'.format(w.lower()) for w in guesses))
    fw.write('];')
    fw.close()

    fw = open('data_prepare/input/final_words_new2.txt', 'w', encoding='utf-8')
    fw.write('\n'.join(w.upper() for w in words))
    fw.close

    print("TOTAL_EXPORT ", TOTAL_EXPORT)
