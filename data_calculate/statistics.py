import firebase_admin
from firebase_admin import credentials, firestore

# Use a service account
cred = credentials.Certificate(
    'data/cards-flip-firebase-adminsdk-p74nk-1f34dc7881.json')
firebase_admin.initialize_app(cred)

db = firestore.client()

doc_ref = db.collection(u'test').document(u'rwN9R1ecxlSwzPULGXVm')
doc_ref.set({'items': [{
    u'first': u'Ada',
    u'last': u'Lovelace',
    u'born': 1815
}, {
    u'first': u'Petr',
    u'last': u'Novy',
    u'born': 1815
}]})

#doc_ref = db.collection(u'test').document(u'rwN9R1ecxlSwzPULGXVm')
#k = doc_ref.get().to_dict()
# print(k)

