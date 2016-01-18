# Requirements

* node ^4.0.0
* babel-cli

# Getting started

```
npm install -g babel-cli && npm install
cp .env.example .env # and update .env with your local variables
npm start # starts servers for your api/'s and React application
npm start -- -x 3000 api=5 # starts 5 api servers behind a load balancer on port 3000 :)
```
