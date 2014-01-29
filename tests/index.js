var assert = require("assert");
var QUnitParser = require("../index.js");

describe("parseLog", function() {
  it("should correctly parse log containing description, expected, actual, and stack trace", function() {
    var log = "\
Lorem ipsum dolor sit amet\n\
Expected: 1\n\
Actual: 0\n\
  at Object.<anonymous> (/a/path/spec/javascripts/compiled/arr/someSpec.js:6:14)\n\
  at Object.<anonymous> (/a/path/spec/javascripts/support/sinon/sinon-1.7.3.js:3978:35)\n\
  at Object.Test.run (/a/path/node_modules/qunitjs/qunit/qunit.js:203:18)\n\
  at /a/path/node_modules/qunitjs/qunit/qunit.js:361:10\n\
  at process (/a/path/node_modules/qunitjs/qunit/qunit.js:1453:24)\n\
  at /a/path/node_modules/qunitjs/qunit/qunit.js:479:5";

    var expectedTrace =
"at /a/path/node_modules/qunitjs/qunit/qunit.js:479:5\n\
at process (/a/path/node_modules/qunitjs/qunit/qunit.js:1453:24)\n\
at /a/path/node_modules/qunitjs/qunit/qunit.js:361:10\n\
at Object.Test.run (/a/path/node_modules/qunitjs/qunit/qunit.js:203:18)\n\
at Object.<anonymous> (/a/path/spec/javascripts/support/sinon/sinon-1.7.3.js:3978:35)\n\
at Object.<anonymous> (/a/path/spec/javascripts/compiled/arr/someSpec.js:6:14)";

    var result = QUnitParser.parseLog(log);
    assert.equal(result.expected,"1");
    assert.equal(result.actual,"0");
    assert.equal(result.description,"Lorem ipsum dolor sit amet");
    assert.equal(result.stack, expectedTrace);
  });
});

// ["    at /a/path/node_modules/qunitjs/qunit/qunit.js:479:5","    at process (/a/path/node_modules/qunitjs/qunit/qunit.j == {"expected":"1","actual":"0"}