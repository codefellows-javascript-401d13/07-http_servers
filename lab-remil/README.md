# Swaggy Cow
You can have the Swaggy Cow say whatever you want all by using HTTP requests. You can even change the the Swaggy Cow to other Swaggy Animals.  

### Running the Swaggy Cow HTTP Server
  - Run the file **server.js** located in the directory named **/lab-remil/**
```sh
node server
```

### Swaggy Cow Options
- Clients can use both **GET** and **POST** requests to the path: **/cowsay**
- With both methods,
  - `text` property specifies the **message**
  - `cow` property specifies the **animal**
- **GET** Requests: specify the properties as query strings
```
/cowsay?text=AYO!cow=dragon
```
- **POST** Requests: specify the POST body as an JSON object with the **text** and **cow** properties
  - some possible animal values: *dragon*, *kitty*, *goat*
```javascript
{
    "text":"AYO!",
    "cow": "dragon"
}
```
