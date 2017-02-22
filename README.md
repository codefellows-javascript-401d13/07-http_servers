# Cowsay API

To begin testing and acclimating to the world of stateless Hypertext Transfer Protocol, I've built an app that handles GET and POST requests with basic Query-string modification. Not quite an API, but getting there!

#### Getting Started:
To use this app, I would recommend downloading 'HTTPie.' This allows added CLI tools to run requests to the server that I've built. Once installed, the user may run a command such as:
```
http GET :[PORT]/cowsay?text='[message]'
```
Where [PORT] is the user's current port number.
Where [message] is a string that does accept blank spaces.

The user will receive a success message if a correct query is made with a key of 'text' included.

POST may also be used in the following manner
```
http POST :[PORT]/cowsay text='I love Javascript!'
```
This will humorously display a different cow from 'Cowsay."
#### Features:
-Cute cows saying/doing delinquent things!
-Functioning query string manipulation!
-Instant feedback for successful or failed requests!

#### Built Using:
-"Url" (node module)
-"Querystring" (node module)
-"HTTP" (node module)
-"HTTPie' (https://httpie.org)
-Cowsay (npm)
