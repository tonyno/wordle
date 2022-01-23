# Česká verze hry Wordle

Aplikace běží na: https://hadejslova.cz/

Zdrojové kódy jsou v tomto repu. Jde o rozšířený kód z https://github.com/hannahcode/Wordle

Případné chyby hlašte do https://github.com/tonyno/wordle/issues

![hadejslova](./public/wordle_1200x630_v2.png)

### Implementation instructions

#### 1. Install NodeJs, for example:

```bash
brew update
brew install node
```

#### 2. Install firebase tools:

```bash
npm install -g firebase-tools
npm update -g
npm update
```

#### 3. Then clone the repo and install node packages

```bash
git clone ....
cd wordle-czech
npm install
```

#### 4. Configure the Firebase

```bash
firebase login
firebase init
```

- copy `settingsFirebase.example.ts` to `settingsFirebase.ts` and update to your data
- copy `wordlist.example.ts` to `wordlist.ts`

#### 5. Run the dev

```bash
npm start
```

#### 6. Make the build and deploy:

```bash
npm run build
firebase deploy
```
