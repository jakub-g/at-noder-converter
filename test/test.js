var fs = require('fs');
var path = require('path');

var expect = require('chai').expect;

var processJS = require('../process-js-string');

/**
 * Validates that file read from `inputFileName` is transformed to `outputFileName` given `options`.
 * @param {String} inputFileName
 * @param {String} outputFileName
 * @param {Object} options
 */
function validateFile(inputFileName, outputFileName, options) {
    var inputFileFullPath = path.join(__dirname, 'test-data', inputFileName);
    var outputFileFullPath = path.join(__dirname, 'test-data', outputFileName);

    options = options || {};
    var mergedOptions = {
        forceAbsolutePaths  : !!(options.forceAbsolutePaths),
        simplifySingleUsage : !!(options.simplifySingleUsage),
        replaceOwnClasspath : !!(options.replaceOwnClasspath),
        format              : !!(options.format)
    };

    var expected = fs.readFileSync(outputFileFullPath, "utf8").replace(/\r/g, "");
    var actual = fs.readFileSync(inputFileFullPath, "utf8").replace(/\r/g, "");
    actual = processJS(actual, inputFileName, mergedOptions);

    expect(expected).to.equal(actual);
}

describe('AT-Noder-Converter tests', function () {
    it('works with default opts', function () {
        validateFile('in1.txt', 'out1.txt');
    });
});