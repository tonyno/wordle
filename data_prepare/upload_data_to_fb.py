import datetime
import hashlib
import json
import random
import re
from typing import List

import firebase_admin
from firebase_admin import credentials, firestore


def get_data() -> List[str]:
    words_list = []
    all_words = {}
    f = open('data_prepare/input/final_words_cleaned_iteration1.txt',
             'r', encoding='utf-8')
    for line in f:
        word = line.strip().lower()
        if word not in all_words and len(word) == 5 and re.fullmatch('[a-zěščřžýáíéů]+', word):
            word = word.upper()
            all_words[word] = 1
            words_list.append(word)
    f.close()
    return words_list


# https://stackoverflow.com/questions/67654272/using-document-id-name-to-query-with-where-operators
def get_previous_words(db, lastDate):
    doc_ref = db.collection(u'word2').where(
        u'exactTimeStamp', u'<=', lastDate).stream()
    return [item.to_dict()['solution'] for item in doc_ref]


if __name__ == '__main__':

    # Use a service account
    cred = credentials.Certificate(
        'data_calculate/wordle-cz-firebase-adminsdk-q7ldn-e3709d97e1.json')
    firebase_admin.initialize_app(cred)

    db = firestore.client()

    w = get_data()
    words_original = list(set(w))
    print("Original amount {}, deduplicated to {}".format(
        len(w), len(words_original)))
    # The date where everything started. Do not change this so the solutionIndex has corrent numbers.
    actual_date = datetime.datetime(2022, 1, 13, 18, 0)

    # first item where writing is alowed, give it to two days from today
    min_date = datetime.datetime.now() + datetime.timedelta(days=2)
    already_existing_words = get_previous_words(
        db, min_date+datetime.timedelta(days=1))
    print("Already existing words: ", already_existing_words)

    print("Original words: ", words_original)
    words = list(
        filter(lambda x: x not in already_existing_words, words_original))
    print("Words after removal existing: ", words)
    print("Updating words since ", min_date)

    random.shuffle(words)
    random.shuffle(words)
    random.shuffle(words)
    random.shuffle(words)

    for id, word in enumerate(words):
        actual_date = actual_date + datetime.timedelta(days=1)
        if (actual_date < min_date):
            continue

        print(actual_date, word)
        word = words[id]
        actual_date_str = actual_date.strftime('%Y-%m-%d')
        doc_ref = db.collection(u'word').document(actual_date_str)
        doc_ref.set({
            'exactTimeStamp': actual_date,
            'solution': word,
            'solutionIndex': id,
            'solutionMd5':  hashlib.md5(word.encode('utf-8')).hexdigest(),
            'locked': True
        })
