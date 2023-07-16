import hashlib
import json

import firebase_admin
from firebase_admin import credentials, firestore

if __name__ == '__main__':

    # Use a service account
    cred = credentials.Certificate(
        'data_calculate/wordle-cz-firebase-adminsdk-q7ldn-01d406365d.json')
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

    total_duration = 0  # seconds
    total_count = 0
    for day in range(400, 420):  # 450
        print("Day ", day)
        # https://firebase.google.com/docs/firestore/query-data/queries#python_6
        doc_ref = db.collection(u'gameResult').document(
            u'day{}'.format(day)).collection(u'result').stream()
        for item in doc_ref:
            data = item.to_dict()
            if 'duration' in data and 'result' in data and (data['duration'] / 1000) < 20*60:
                total_duration += data['duration'] / 1000
                total_count += 1
            # if total_count > 50:
            #     break

    print("Games: {}, win: {}, loose: {}".format(games, win, loose))
    first_guesses = dict(
        sorted(guesses.items(), key=lambda item: item[1], reverse=True))
    print(first_guesses)

    print("Total count {}, avg: {}".format(
        total_count, round(total_duration / total_count)))

#     Games: 4459968, win: 4054716, loose: 405252
# {'LOUKA': 72307, 'KOULE': 58103, 'LÁSKA': 42309, 'PRASE': 30952, 'KOČKA': 7703, 'KOTEL': 5739, 'PRDEL': 3772, 'VÁLKA': 1428, 'PENIS': 1182, 'VOLBY': 1153, 'VOLBA': 556, 'DÁREK': 495, 'HOKEJ': 446, 'AUDIO': 433, 'STROM': 283, 'KRYSA': 198, 'POŽÁR': 173, 'ŠKOLA': 156, 'TONDA': 128, 'KONEC': 122, 'MĚSTO': 113, 'MOUKA': 102, 'PERLA': 2, 'KNIHA': 2}
# Total count 378982, avg: 9489
