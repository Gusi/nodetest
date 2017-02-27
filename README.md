# nodetest
Small node test code

## Install dependencies
npm install

## Run program
node index.js basket1.txt

node index.js basket2.txt

## NOTE on line endings
The basket files are expected to be with UNIX line endings. If working with WINDOWS line endings, change line 21 to:

**basket = basket.split('\r\n');**
