import hashlib
import json

import firebase_admin
from firebase_admin import credentials, firestore


class ContingencyField:
    def __init__(self):
        self.data = {}

    def add(self, key, value):
        self.data.setdefault(key, {}).setdefault(value, 0)
        self.data[key][value] += 1

    def get(self, key):
        return self.data[key]

    def getTop3(self, key):
        return {k: v for k, v in sorted(self.data[key].items(), key=lambda x: x[1], reverse=True)[:3]}

    def safeGet(self, key, key2, default_value):
        x = self.get(key)
        if key2 in x:
            return x[key2]
        return default_value

    def __repr__(self):
        return json.dumps(self.data, indent=2)


if __name__ == '__main__':

    # Use a service account
    cred = credentials.Certificate(
        'data_calculate/wordle-cz-firebase-adminsdk-q7ldn-e3709d97e1.json')
    firebase_admin.initialize_app(cred)

    db = firestore.client()

    result = ContingencyField()
    exceptions = 0

    DAY = 11

    loosers = []

    # https://firebase.google.com/docs/firestore/query-data/queries#python_6
    doc_ref = db.collection(u'gameResult').document(
        u'day{}'.format(DAY)).collection(u'result').stream()
    for item in doc_ref:
        try:
            data = item.to_dict()
            result.add('result', data['result'])
            if data['result'] == 'win':
                result.add('numberOfGuesses', str(data['numberOfGuesses']))
            if data['result'] == 'loose':
                loosers.append(data)
            if data['guesses'] and len(data['guesses']) > 0:
                result.add('word1', data['guesses'][0])
        except Exception as e:
            print(e)
            exceptions += 1

    f = open('data_prepare/output/loosers_{}.json'.format(DAY),
             'wb')
    f.write(json.dumps(loosers, indent=4, ensure_ascii=False).encode('utf-8'))
    f.close()

    print(result.get('result'))
    print(result.get('numberOfGuesses'))
    print(result.getTop3('word1'))
    print("Number of exceptions: ", exceptions)

    # doc_ref = db.collection(u'word').document(u'2022-01-19')

    win = result.safeGet('result', 'win', 0)
    loose = result.safeGet('result', 'loose', 0)
    guessesDistribution = [
        result.safeGet('numberOfGuesses', '0', 0),
        result.safeGet('numberOfGuesses', '1', 0),
        result.safeGet('numberOfGuesses', '2', 0),
        result.safeGet('numberOfGuesses', '3', 0),
        result.safeGet('numberOfGuesses', '4', 0),
        result.safeGet('numberOfGuesses', '5', 0),
        loose]  # Save to position 7 the looses as we do in local storage
    firstGuesses = result.getTop3('word1')

    print("WIN: {}, LOOSE: {}\nGUESSES: {}\nFIRST WORDS: {}".format(
        win, loose, guessesDistribution, firstGuesses
    ))

    doc_ref = db.collection(u'stats').document(u'day{}'.format(DAY))
    doc_ref.set({
        'games': win+loose,
        'win': win, 'loose': loose,
        'guessesDistribution': guessesDistribution,
        'firstGuesses': firstGuesses,
        'solutionIndex': DAY,
        # !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        # 'solutionMd5': hashlib.md5('METAŘ'.encode('utf-8')).hexdigest()
    })

    # DAY5
    # {'win': 8545, 'loose': 1642}
    # {'3': 2387, '4': 2356, '5': 1533, '2': 1295, '0': 535, '1': 439}
    # {'KOČKA': 319, 'SLOVO': 188, 'PRASE': 125, 'ROBOT': 118, 'KOTEL': 113, 'STROM': 103, 'POKUS': 91, 'LÁSKA': 91, 'PRDEL': 86, 'MOČÁL': 78}
