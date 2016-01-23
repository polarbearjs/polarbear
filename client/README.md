# Polarbear Scaffold

A scaffold for a ES2015, React, Redux, Webpack app.

# Work in progress! nothing for the client will work properly yet

# Requirements

* node ^4.0.0
* babel-cli

```
npm run make-www-executable
npm install -g babel-cli && npm install
cp .env.example .env
env $(cat .env) npm start // starts a server
```

### What about hot module replacement?

No.

2 Reasons

* We want dev prod parity and using a separate server just so we can have hot reloading is stupid. No we won't bake hot reloading into our prod server because it won't serve any function once the server is running on prod
* We don't want our code littered with `module.hot.accept`, `module.hot.check`, and `module.hot.apply`
