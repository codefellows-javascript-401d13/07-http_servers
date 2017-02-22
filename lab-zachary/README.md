# Cowsay FTW
 ```
 ____________
<The cow says Mooo >
 ------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
```
This app creates an HTTP server that handles GET and POST requests to relay meaningful messages to the user via the Cowsay module.

# System Requirements

  - Terminal.app on macOS or equivalent
  - node.js and npm package manager installed


### Installation

Clone the repository to your local server
```sh
$ git clone https://github.com/zcrumbo/07-http_servers.git
```

Install the dependencies - Cowsay will be installed with the following command

```sh
$ npm i
```
[HTTPie](https://httpie.org/) will be required to run the HTTP requests from your terminal window. You will need to install this with [Homebrew][1] on macOS - otherwise you can open a browser window with developer tools open to view request and response information.

Start the server

```sh
$ node server.js
```


### Connecting

If you are using HTTPie, in your terminal window, type the following commands, where '3000' would be replaced with your local environment PORT variable, if configured.
```sh
$ http :3000/ #gives a simple 200 response
$ http :3000/cowsay #no url parameters, gives a 400 error with a cowsay message
$ http :3000/cowsay text=='message string' #text url parameter - gives a 200 response with your message string as a cowsay message
$ http :3000/cowsay text=='message string' cow='another cowsay cow' #returns a 200 response with your cowsay message and a custom cow. See cowsay docs for full list of supported cows.
$ http POST :3000/cowsay # no message body posted - will return a 400 response with cowsay error message
$ http POST :3000/cowsay body='your message string'  # will return a 200 response with your message string as a cowsay message
```

[1]:https://brew.sh/

