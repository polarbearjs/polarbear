# Polarbear Scaffold

A scaffold for a ES2015, React, Redux, Webpack app.

# Work in progress! nothing for the client will work properly yet

# Requirements

* node ^4.0.0
* babel-cli

```
npm run make-www-executable
cp .env.example .env
npm run build // builds the app
env $(cat .env) npm start // starts a server
env $(cat .env) npm start-dev // starts a dev server by default at 3000 for SSR and 8080 for livereload
```
