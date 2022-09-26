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

    games = 0

    # https://firebase.google.com/docs/firestore/query-data/queries#python_6
    doc_ref = db.collection(u'gameStats').document(
        u'wordle').get()
    if doc_ref.exists:
        for key, value in doc_ref.to_dict().items():
            games += value['games']

    print(games)
