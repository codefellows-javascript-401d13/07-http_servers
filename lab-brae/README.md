### HTTP Cowsay Exercise
Here is a basic exercise utilizing the Cowsay NPM package.

### How to use it:
1. Copy this into your terminal:
`git clone https://github.com/0blu3/07-http_servers.git`
2. Navigate to the correct folder: `cd 07-http_servers/lab-brae`
3. Run `npm i` in your terminal.
4. Install Httpie:
  * Apple users: `$ brew install httpie`  
  * Linux users: `$ apt-get install httpie`  
  * Windows users:  
```
$ pip install --upgrade pip setuptools

$ pip install --upgrade httpie
```
5. Run `node server.js` in your terminal.
6. Open a new terminal. To test the server, type `http localhost:3000/`. 
    If you see "Hello from server!", the server is working correctly.
7. To make a GET request, type `http localhost:3000/cowsay?text=testing` into the terminal. If you did not make a bad request, you should be greeted by a whale. If you made a bad request, you'll see a flaming sheep. "Testing" can be replaced.
8. To make a POST request, type `http POST localhost:3000/cowsay text=testing` into the terminal. If the request was good, you'll see a hedgehog. If it was bad, you'll see a creepy milk carton man. "Testing" can be replaced.




