# node-cordova
Wrapper for the Cordova CLI that you can use programmatically directly from Node.js.

## Why?

You may need to programmatically build a cordova app or automate any task related to cordova.

## Example usage

```javascript
var Cordova = require('node-cordova');

// Create a new instance of Cordova providing the directory where your app will be created
var app = new Cordova('/path/to/my/app');

app.create('com.fancy.apps', 'App Name');
```

## Methods of Cordova class

*Note:* all methods can take a callback parameter. It that parameter is provided the method will run asynchronously, otherwise it will run synchronously. Callback must be a function which accepts a single parameter that will be either an error string (the output of the cordova command) or undefined if everything went ok.

### create
```
 * Creates a new cordova project at the path given when the Cordova instance
 * was created. If callback param is provided the result will be async.
 * @method create
 * @param  {String}             package  Package name
 * @param  {String}             name     Application name
 * @param  {Function|undefined} callback Callback if async
 * @return {String|undefined}
```

### addPlatform
```
 * Adds a new platform to the application
 * @method addPlatform
 * @param {String}             platform Platform name
 * @param {Function|undefined} callback Callback if async
 * @return {String|undefined}
 ```

### removePlatform
```
 * Removes a platform from the app
 * @method removePlatform
 * @param {String}             platform Platform name
 * @param {Function|undefined} callback Callback if async
 * @return {String|undefined}
 ```

### addPlugin
```
 * Adds a new plugin to the application
 * @method addPlugin
 * @param {String}             plugin   Plugin identifier
 * @param {Function|undefined} callback Callback if async
 * @return {String|undefined}
 ```

### removePlugin
```
 * Removes a plugin from the app
 * @method removePlugin
 * @param {String}             plugin   Plugin identifier
 * @param {Function|undefined} callback Callback if async
 * @return {String|undefined}
 ```

### prepare
```
 * Prepares the app for the given platform so it can be built later
 * @method prepare
 * @param  {String}   platform Platform name
 * @param  {Function} callback Callback if async
 * @return {String|undefined}
 ```

### compile
```
 * Compiles the app for the given platform
 * @method compile
 * @param  {String}   platform Platform name
 * @param  {Function} callback Callback if async
 * @return {String|undefined}
 ```

### build
```
 * Builds the app for the given platform (is an equivalent of preparing and compiling)
 * @method build
 * @param  {String}   platform Platform name
 * @param  {Function} callback Callback if async
 * @return {String|undefined}
 ```
