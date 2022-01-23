import datetime
import hashlib
import json
import re
from typing import List

import firebase_admin
from firebase_admin import credentials, firestore


def get_data() -> List[str]:
    words_list = []
    all_words = {}
    f = open('data_prepare/input/final_words.txt', 'r', encoding='utf-8')
    for line in f:
        word = line.strip().lower()
        if word not in all_words and len(word) == 5 and re.fullmatch('[a-zěščřžýáíéů]+', word):
            word = word.upper()
            all_words[word] = 1
            words_list.append(word)
    f.close()
    return words_list


if __name__ == '__main__':

    # Use a service account
    cred = credentials.Certificate(
        'data_calculate/wordle-cz-firebase-adminsdk-q7ldn-e3709d97e1.json')
    firebase_admin.initialize_app(cred)

    db = firestore.client()

    words = get_data()
    actual_date = datetime.datetime(2022, 1, 13, 18, 0)

    for id, word in enumerate(words):
        actual_date = actual_date + datetime.timedelta(days=1)
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
