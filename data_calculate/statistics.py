import json

import firebase_admin
from firebase_admin import credentials, firestore


class ContingencyField:
    def __init__(self):
        self.data = {}

    def add(self, key, value):
        self.data.setdefault(key, {}).setdefault(value, 0)
        self.data[key][value] += 1

    def getTop10(self, key):
        return {k: v for k, v in sorted(self.data[key].items(), key=lambda x: x[1], reverse=True)[:10]}

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

    # https://firebase.google.com/docs/firestore/query-data/queries#python_6
    doc_ref = db.collection(u'gameResult').document(
        u'day5').collection(u'result').stream()
    for item in doc_ref:
        try:
            data = item.to_dict()
            result.add('result', data['result'])
            if data['result'] == 'win':
                result.add('numberOfGuesses', str(data['numberOfGuesses']))
            if data['guesses'] and len(data['guesses']) > 0:
                result.add('word1', data['guesses'][0])
        except Exception as e:
            print(e)
            exceptions += 1

    print(result.getTop10('result'))
    print(result.getTop10('numberOfGuesses'))
    print(result.getTop10('word1'))
    print("Number of exceptions: ", exceptions)

    # DAY5
    # {'win': 8545, 'loose': 1642}
    # {'3': 2387, '4': 2356, '5': 1533, '2': 1295, '0': 535, '1': 439}
    # {'KOČKA': 319, 'SLOVO': 188, 'PRASE': 125, 'ROBOT': 118, 'KOTEL': 113, 'STROM': 103, 'POKUS': 91, 'LÁSKA': 91, 'PRDEL': 86, 'MOČÁL': 78}

    # doc_ref.set({'items': [{
    #     u'first': u'Ada',
    #     u'last': u'Lovelace',
    #     u'born': 1815
    # }, {
    #     u'first': u'Petr',
    #     u'last': u'Novy',
    #     u'born': 1815
    # }]})

    #doc_ref = db.collection(u'test').document(u'rwN9R1ecxlSwzPULGXVm')
    #k = doc_ref.get().to_dict()
    # print(k)
