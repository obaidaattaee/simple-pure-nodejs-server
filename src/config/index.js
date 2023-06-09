const fs = require('fs');
const path = require('path');

var config = {};

files = fs.readdirSync(__dirname);
files = files.filter(item => item !== __filename.replace(__dirname, '').replace('/', ''));
files.forEach(function (file) {
    let configGroup = file.replace('.js', '');
    let configValues = require(path.join(__dirname, file));
    config[configGroup] = configValues;
})

module.exports = config;