### MOOOOOOOOO!!!!!!

Do you love cows? Do you wish you could have your own personal ASCII cow talking to you? If so, your dreams can now be fulfilled. If not, what's wrong with you???

### Cowsay for Node.js

* Cowsay is a js module that allows you to enjoy cow communion. The cow will talk to you in your terminal - you just need to tell it what to say.
* To get started, make sure you have node.js installed in your shell.
* Clone the repository:

  ```
  $ git clone https://github.com/radenska/07-http_servers.git
  ```
* navigate to the lab-yana directory
* run
  ```
  $ npm i
  ```
  ```
  $ brew install httpie
  ```
* start the server
  ```
  $ node server.js
  ```
* leave that terminal window open (the server must be running for the cows to talk to you)
* open another terminal window or tab and start talking to the cow!
  ```
  $ http :9988/cowsay?text=message
  ```
  or
  ```
  $ http POST :9988/cowsay text=message
  ```

  If you mess up, the cow will tell you so!
