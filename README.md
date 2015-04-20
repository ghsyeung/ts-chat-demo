# Console Chat Demo in Typescript

## Requires

* npm
* bower
* tsd
* typescript transpiler (developed against 1.4.1)
* Google Chrome browser

## Installation

To install the dependencies

```console
$ npm install; bower install; tsd reinstall
```

Transpile the source

```console
$ gulp
```

Open your Google Chrome browser and navigate to `src/index.html`, open devtools and run

```javascript
# Initialize the chat component and poison window.send
ConsoleChat.ChatInit("<your name>")

# To send a message
send("Hello World!")
```
