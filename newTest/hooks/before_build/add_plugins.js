#!/usr/bin/env node

//this hook installs all your plugins
 
// add your plugins to this list--either 
// the identifier, the filesystem location 
// or the URL
var pluginlist = [
    "cordova-plugin-file",
    "https://github.com/katzer/cordova-plugin-local-notifications",
    "https://github.com/hypery2k/cordova-email-plugin.git",
    "cordova-plugin-device"
];
 
// no need to configure below
 
var fs = require('fs');
var path = require('path');
var sys = require('sys')
var exec = require('child_process').exec;
 
function puts(error, stdout, stderr) {
    sys.puts(stdout)
}
 
pluginlist.forEach(function(plug) {
    exec("cordova plugin add " + plug, puts);
});