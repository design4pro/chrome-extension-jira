# Chrome Extension for JIRA

## Development

### Basic usage

```
yarn

yarn dev
```

### Features

-   Support for ES7 ( with Babel and polyfill)
-   Popup Page with ReactJS and Material UI framework
-   Content Script with ReactJS and Material UI framework
-   Bundling (webpack)

### Directory Structure

-   `src/` is root directory for a chrome extension. it includes manifest.json file and other static stuff.
-   `src/background.js` is main background js file for the chrome extension.
-   `popup-page` is the directory which includes react js setup for popup page.
-   `content-scripts` is the directory directory which includes react js setup for content script.
-   `src/utils` is the directory for utilities that can be written in es6, es7 or es8...

### How to extend ?

-   Write chrome extension's background scripts code in `src/background.js`
-   Write chrome extension's popup page codes in `popup-page` ReactJS directory system.
-   Write chrome extension's content scripts codes in `content-scripts` ReactJS directory system.
