import hashlib
import json

import firebase_admin
from firebase_admin import credentials, firestore

if __name__ == '__main__':

    # Use a service account
    cred = credentials.Certificate(
        'data_calculate/wordle-cz-firebase-adminsdk-q7ldn-e3709d97e1.json')
    firebase_admin.initialize_app(cred)

    db = firestore.client()

    items = 0
    games = 0
    win = 0
    loose = 0
    guesses = {}

    # https://firebase.google.com/docs/firestore/query-data/queries#python_6
    doc_ref = db.collection(u'gameStats').document(
        u'wordle').get()
    if doc_ref.exists:
        for key, value in doc_ref.to_dict().items():
            items += 1
            # print(value)
            games += value['games']
            win += value['win']
            loose += value['loose']
            for guess in value['firstGuesses']:
                word = guess['word']
                if word not in guesses:
                    guesses[word] = 0
                guesses[word] += guess['count']
            # if items > 10:
            #    break

    print("Games: {}, win: {}, loose: {}".format(games, win, loose))
    first_guesses = dict(
        sorted(guesses.items(), key=lambda item: item[1], reverse=True))
    print(first_guesses)
