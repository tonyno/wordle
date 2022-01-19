# Česká verze hry Wordle

Aplikace běží na: https://hadejslova.cz/

Zdrojové kódy jsou v tomto repu. Jde o rozšířený kód z https://github.com/hannahcode/Wordle

Případné chyby hlašte do https://github.com/tonyno/wordle/issues

![hadejslova](./public/wordle_1200x630_v2.png)

### Implementation instructions

1. Install NodeJs, for example:

```bash
brew update
brew install node
```

2. Install firebase tools:

```bash
npm install -g firebase-tools
npm update -g
npm update
```

3. Then clone the repo, install packages and run the dev...

```bash
git clone ....
cd wordle-czech
npm install
firebase login
firebase init
npm start
```

4. Make the build and deploy:

```bash
npm run build
firebase deploy
```
