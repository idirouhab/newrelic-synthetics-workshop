const assert = require("assert");
var DefaultTimeout = 30000;
const By = $driver.By;
console.log($secure.CERT_PART_3);
$browser.getCapabilities().then(function () { })
  // Test Case: Untitled
  .then(function () {
    return Promise.resolve(true)

      .then(function Open () {
        return $browser.get("https://newrelic.com/").then(val => {
          return val;
        });
      })
      .then(function SetWindow () {
        return $browser.manage().window().setSize(1920, 1057).then(val => {
          return val;
        });
      })
      .then(function Click () {
        return $browser.waitForAndFindElement(By.linkText("Start a free trial"), DefaultTimeout).then(el => {
          el.click();
          return Promise.resolve(true);
        });
      })
      .then(function Click () {
        return $browser.waitForAndFindElement(By.id("first_name"), DefaultTimeout).then(el => {
          el.click();
          return Promise.resolve(true);
        });
      })
      .then(function SendKeys () {
        return $browser.waitForAndFindElement(By.id("first_name"), DefaultTimeout).then(el => {
          el.sendKeys("Idir");
          return Promise.resolve(true);
        });
      })
      .then(function SendKeys () {
        return $browser.waitForAndFindElement(By.id("last_name"), DefaultTimeout).then(el => {
          el.sendKeys("Ouhab");
          return Promise.resolve(true);
        });
      })
      .then(function SendKeys () {
        return $browser.waitForAndFindElement(By.id("email"), DefaultTimeout).then(el => {
          el.sendKeys("iouhab@newrelic.com");
          return Promise.resolve(true);
        });
      })
      .then(function SendKeys () {
        return $browser.waitForAndFindElement(By.id("name"), DefaultTimeout).then(el => {
          el.sendKeys("New Relic");
          return Promise.resolve(true);
        });
      })
      .then(function Click () {
        return $browser.waitForAndFindElement(By.id("region_id"), DefaultTimeout).then(el => {
          el.click();
          return Promise.resolve(true);
        });
      })
      .then(function Select () {
        return $browser.waitForAndFindElement(By.id("region_id"), DefaultTimeout).then(function (el1) {
          el1.click();
          return $browser.waitForAndFindElement(By.xpath("//option[. = 'European Union']"), DefaultTimeout).then(function (el2) {
            el2.click();
            return Promise.resolve(true);
          });
        });
      })
      .then(function Click () {
        return $browser.waitForAndFindElement(By.id("subscribe_to_email_communication"), DefaultTimeout).then(el => {
          el.click();

          return Promise.resolve(true);
        });
      })
  });

