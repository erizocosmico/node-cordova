var shell = require('shelljs'),
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
 * @param  {Function} callback Callback only if the command is async
 * @return {String|undefined}
 */
var cmd = function (cmd, callback) {
	var async = typeof callback === 'function';
	var _callback = function (code, output) {
		callback(code !== 0 ? output : undefined)
	};

	var result = shell.exec(
		cmd,
		{silent: true},
		async ? _callback : undefined
	);

	return result.code !== 0 && !async ? result.output : undefined;
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
 * Changes the current directory to the app directory
 * @method go
 */
Cordova.prototype.go = function () {
	shell.cd(this.path);
};

/**
 * Creates a new cordova project at the path given when the Cordova instance
 * was created. If callback param is provided the result will be async.
 * @method create
 * @param  {String}             package  Package name
 * @param  {String}             name     Application name
 * @param  {Function|undefined} callback Callback if async
 * @return {String|undefined}
 */
Cordova.prototype.create = function (package, name, callback) {
	return cmd(buildCommand('create', this.path, package, name), callback);
};

/**
 * Adds a new platform to the application
 * @method addPlatform
 * @param {String}             platform Platform name
 * @param {Function|undefined} callback Callback if async
 * @return {String|undefined}
 */
Cordova.prototype.addPlatform = function (platform, callback) {
	this.go();
	return cmd(buildCommand('platform', 'add', platform), callback);
};

/**
 * Removes a platform from the app
 * @method removePlatform
 * @param {String}             platform Platform name
 * @param {Function|undefined} callback Callback if async
 * @return {String|undefined}
 */
Cordova.prototype.removePlatform = function (platform, callback) {
	this.go();
	return cmd(buildCommand('platform', 'rm', platform), callback);
};

/**
 * Adds a new plugin to the application
 * @method addPlugin
 * @param {String}             plugin   Plugin identifier
 * @param {Function|undefined} callback Callback if async
 * @return {String|undefined}
 */
Cordova.prototype.addPlugin = function (plugin, callback) {
	this.go();
	return cmd(buildCommand('plugin', 'add', plugin), callback);
};

/**
 * Removes a plugin from the app
 * @method removePlugin
 * @param {String}             plugin   Plugin identifier
 * @param {Function|undefined} callback Callback if async
 * @return {String|undefined}
 */
Cordova.prototype.removePlugin = function (plugin, callback) {
	this.go();
	return cmd(buildCommand('plugin', 'rm', plugin), callback);
};

/**
 * Prepares the app for the given platform so it can be built later
 * @method prepare
 * @param  {String}   platform Platform name
 * @param  {Function} callback Callback if async
 * @return {String|undefined}
 */
Cordova.prototype.prepare = function (platform, callback) {
	this.go();
	return cmd(buildCommand('prepare', platform), callback);
};

/**
 * Compiles the app for the given platform
 * @method compile
 * @param  {String}   platform Platform name
 * @param  {Function} callback Callback if async
 * @return {String|undefined}
 */
Cordova.prototype.compile = function (platform, callback) {
	this.go();
	return cmd(buildCommand('compile', platform), callback);
};

/**
 * Builds the app for the given platform (is an equivalent of preparing and compiling)
 * @method build
 * @param  {String}   platform Platform name
 * @param  {Function} callback Callback if async
 * @return {String|undefined}
 */
Cordova.prototype.build = function (platform, callback) {
	this.go();
	return cmd(buildCommand('build', platform), callback);
};

module.exports = Cordova;
