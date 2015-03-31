'use strict';

var exec = require('child_process').exec,
    fs = require('fs'),
    path = require('path');

var CORDOVA_PATH = path.join(
    __dirname,
    'node_modules',
    'cordova',
    'bin',
    'cordova'
);

/**
 * Executes a terminal command
 * @param  {String}   cmd      Command to execute
 * @param  {String}   cwd      Current working directory
 * @param  {Function} callback Callback only if the command is async
 * @return {String|undefined}
 */
var cmd = function (cmd, cwd, callback) {
    var async = typeof callback === 'function';

    var result = exec(
        cmd,
        {cwd: cwd},
        async ? callback : undefined
    );

    return result.code !== 0 && !async ? result.stdout : undefined;
};

/**
 * Builds a command escaping all command parts
 * @return {String} Final command
 */
var buildCommand = function () {
    return [CORDOVA_PATH]
        .concat(Array.prototype.map.call(arguments || [], function (arg) {
            return '\'' + arg.replace("'", "\\'") + '\'';
        })).join(' ');
};

/**
 * Constructs a new Cordova instance. This represents a Cordova application
 * at the given path.
 * @constructor
 * @param {String} path Path of the cordova application
 */
var Cordova = function (path) {
    this.path = path;
};

/**
 * Creates a new cordova project at the path given when the Cordova instance
 * was created. If callback param is provided the result will be async.
 * @method create
 * @param  {String}             packageName  Package name
 * @param  {String}             name         Application name
 * @param  {Function|undefined} callback     Callback if async
 * @return {String|undefined}
 */
Cordova.prototype.create = function (packageName, name, callback) {
    return cmd(buildCommand('create', this.path, packageName, name), this.path, callback);
};

/**
 * Adds a new platform to the application
 * @method addPlatform
 * @param {String}             platform Platform name
 * @param {Function|undefined} callback Callback if async
 * @return {String|undefined}
 */
Cordova.prototype.addPlatform = function (platform, callback) {
    return cmd(buildCommand('platform', 'add', platform), this.path, callback);
};

/**
 * Removes a platform from the app
 * @method removePlatform
 * @param {String}             platform Platform name
 * @param {Function|undefined} callback Callback if async
 * @return {String|undefined}
 */
Cordova.prototype.removePlatform = function (platform, callback) {
    return cmd(buildCommand('platform', 'rm', platform), this.path, callback);
};

/**
 * Adds a new plugin to the application
 * @method addPlugin
 * @param {String}             plugin   Plugin identifier
 * @param {Function|undefined} callback Callback if async
 * @return {String|undefined}
 */
Cordova.prototype.addPlugin = function (plugin, callback) {
    return cmd(buildCommand('plugin', 'add', plugin), this.path, callback);
};

/**
 * Removes a plugin from the app
 * @method removePlugin
 * @param {String}             plugin   Plugin identifier
 * @param {Function|undefined} callback Callback if async
 * @return {String|undefined}
 */
Cordova.prototype.removePlugin = function (plugin, callback) {
    return cmd(buildCommand('plugin', 'rm', plugin), this.path, callback);
};

/**
 * Prepares the app for the given platform so it can be built later
 * @method prepare
 * @param  {String}   platform Platform name
 * @param  {Function} callback Callback if async
 * @return {String|undefined}
 */
Cordova.prototype.prepare = function (platform, callback) {
    return cmd(buildCommand('prepare', platform), this.path, callback);
};

/**
 * Compiles the app for the given platform
 * @method compile
 * @param  {String}   platform Platform name
 * @param  {Function} callback Callback if async
 * @return {String|undefined}
 */
Cordova.prototype.compile = function (platform, callback) {
    return cmd(buildCommand('compile', platform), this.path, callback);
};

/**
 * Builds the app for the given platform (is an equivalent of preparing and compiling)
 * @method build
 * @param  {String}   platform Platform name
 * @param  {Function} callback Callback if async
 * @return {String|undefined}
 */
Cordova.prototype.build = function (platform, callback) {
    return cmd(buildCommand('build', platform), this.path, callback);
};

module.exports = Cordova;
