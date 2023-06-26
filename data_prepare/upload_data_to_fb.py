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
    f = open('data_prepare/input/final_words_cleaned_new2.txt',
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
# def get_previous_words(db, lastDate):
#     doc_ref = db.collection(u'word').where(
#         u'exactTimeStamp', u'<=', lastDate).stream()
#     return [item.to_dict()['solution'] for item in doc_ref]


# def delete_last_words(db, lastDate):
#     print("Deleting data after {}".format(lastDate))
#     doc_ref = db.collection(u'word').where(
#         u'exactTimeStamp', u'>=', lastDate).stream()
#     for doc in doc_ref:
#         # https://firebase.google.com/docs/firestore/manage-data/delete-data#python_5
#         doc.reference.delete()


if __name__ == '__main__':

    # Use a service account
    cred = credentials.Certificate(
        'data_calculate/wordle-cz-firebase-adminsdk-q7ldn-01d406365d.json')
    firebase_admin.initialize_app(cred)

    db = firestore.client()

    words = get_data()
    print("Loaded {} items".format(len(words)))

    random.shuffle(words)
    random.shuffle(words)
    random.shuffle(words)
    random.shuffle(words)

    OFFSET = 530
    actual_date = datetime.datetime(2023, 6, 27, 18, 0)

    id = 0
    for id, word in enumerate(words):
        actual_date = actual_date + datetime.timedelta(days=1)
        print("Uploading id {}, solutionIndex {}, date {}".format(
            id, id+OFFSET, actual_date))

        word = words[id]
        actual_date_str = actual_date.strftime('%Y-%m-%d')
        doc_ref = db.collection(u'word').document(actual_date_str)
        doc_ref.set({
            'exactTimeStamp': actual_date,
            'solution': word,
            'solutionIndex': id + OFFSET,
            'solutionMd5':  hashlib.md5(word.encode('utf-8')).hexdigest(),
            'locked': True
        })

        # if id > 3:
        #     break

    print("Uploaded, final index: ", id)
