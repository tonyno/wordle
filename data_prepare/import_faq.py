import csv
import json

import firebase_admin
from firebase_admin import credentials, firestore


def get_fb_connection():
    # Use a service account
    cred = credentials.Certificate(
        'data_calculate/wordle-cz-firebase-adminsdk-q7ldn-e3709d97e1.json')
    firebase_admin.initialize_app(cred)

    db = firestore.client()
    return db


if __name__ == '__main__':

    db = get_fb_connection()

    JSON_DATA = []

    with open('data_prepare/input/HadejSlova.cz FAQ - List 1.tsv', newline='', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile, delimiter='\t')
        for row in reader:
            obj = {
                'title': row['TITLE'],
                'description': row['DESCRIPTION'],
                'id': str(row['ID']),
                'category': row['CATEGORY']
            }
            JSON_DATA.append(obj)

    print(json.dumps(JSON_DATA, indent=2))

    doc_ref = db.collection(u'content').document(u'faq')
    doc_ref.set({'items': JSON_DATA})
