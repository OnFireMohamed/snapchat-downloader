https://www.npmjs.com/package/snapchat-downloader

# Installing
```sh
npm install snapchat-downloader
```

## Importing
```javascript
const snapchatDownloader = require("snapchat-downloader");
```

## Using
```javascript
let username = "nanoosh771"; // Snapchat account username :)
(
    async () => {
        let result = await snapchatDownloader(username); // The result is an array
        console.log(result);
    }
)();
```

### All
```javascript
const snapchatDownloader = require("snapchat-downloader");

let username = "nanoosh771";
(
    async () => {
        let result = await snapchatDownloader(username);
        console.log(result);
    }
)();
```
