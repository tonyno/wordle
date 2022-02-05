# Česká verze hry Wordle

Aplikace běží na: https://hadejslova.cz/

Zdrojové kódy jsou v tomto repu. Jde o rozšířený kód z https://github.com/hannahcode/Wordle

Případné chyby hlašte do https://github.com/tonyno/wordle/issues

![hadejslova](./public/wordle_1200x630_v2.png)

# Implementation instructions

## 1. Install NodeJs, for example:

```bash
brew update
brew install node
```

## 2. Install firebase tools:

```bash
npm install -g firebase-tools
npm update -g
npm update
```

## 3. Then clone the repo and install node packages

```bash
git clone ....
cd wordle-czech
npm install
```

Plus configure the Firebase settings to load new words:
- copy `settingsFirebase.example.ts` to `settingsFirebase.ts` and update to your data

## 4. Run the dev

```bash
npm start
```

## 5. Prepare for production deployment, configure the Firebase 

This step is optional. Use it only if you deploy the app to Firebase.
```bash
firebase login
firebase init
```


## 6. Make the build and deploy:

```bash
npm run build
firebase deploy
```
