const fs = require('fs-extra');
const browserify = require('browserify');
const liveServer = require('live-server');
const watch = require('watch');
const colors = require('colors');

const liveServerParams = {
    port: 8080,
    host: '0.0.0.0',
    root: './',
    open: false,
    wait: 1000,
    logLevel: 2
};

const browserifyParams = {
    entries: './src/main.js', // entry point
    paths: './src',
    noParse: [require.resolve('@digihaus/monogatari')]
};

const compile = () => {
    console.log('Running compile...'.grey);
    browserify(browserifyParams).bundle(function (err, buf) {
        if (err) {
            console.log(err);
        } else {
            fs.writeFileSync('zombies.js', buf);
            console.log('Done creating '.grey + 'zombies.js'.cyan + ' file.'.grey);
        }
    });
};

const args = process.argv.slice(2);

if (args[0] === '-live') {
    liveServer.start(liveServerParams);
    watch.watchTree('src', function (f, curr, prev) {
        if (typeof f == 'object' && prev === null && curr === null) {
            compile();
        } else if (curr.nlink === 0) { // f was deleted
            compile();
        } else if (prev === null) { // f was created
            compile();
        } else { // f was changed
            compile();
        }
    });
} else {
    compile();
}