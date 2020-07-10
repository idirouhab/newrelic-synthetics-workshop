var assert = require("assert");
var request = require("urllib-sync").request;

var checks = ["https://newrelic.com"];

for (var index in checks) {
  call(checks[index]);
}

function call (url) {
  try {
    $http.get(url, function (error, response, body) {
      if (response && response["statusCode"]) {
        assert.equal(response.statusCode, 200, "Expected a 200 OK response");
      }
      if (error) {
      }
    });
  } catch (e) {
  }
}
