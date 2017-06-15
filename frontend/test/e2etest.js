require('chai').should();

var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until
    username = "kkuo42"
    accessKey = "c03f2778-8165-49a9-9274-bb27dc98e284";

var test = require('selenium-webdriver/testing');
var assert = require('assert');

// can't run end2end tests on something that isn't deployed yet
if(process.env.TRAVIS_BRANCH !== 'master') {
    console.log("E2E testing skipped, develop CI");
    return;
}

const mochaTimeOut = 30000;

var driver;
var site;

test.before(function() {
    this.timeout(mochaTimeOut);
    if(process.env.TRAVIS_BRANCH === 'master') {
        console.log("E2E testing on staging branch, master CI");
        driver = new webdriver.Builder().
            withCapabilities({
                'browserName': 'chrome',
                'platform': 'Windows XP',
                'version': '43.0',
                'username': username,
                'accessKey': accessKey
            }).
            usingServer("http://" + username + ":" + accessKey +
                        "@ondemand.saucelabs.com:80/wd/hub").
            build();
        site = 'https://cse112-1-staging.herokuapp.com/';
    }
    else {
        driver = new webdriver.Builder().forBrowser('chrome').build();
        site = 'http://localhost:3000/'; // Was 4941
    }
})

test.describe("Landing Page", function() {
   test.it("Checks landing home", function() {
       this.timeout(mochaTimeOut);
       driver.get(site)
           // Check if title of website is correct
           .then(() => driver.getTitle())
           .then(title => title.should.equal('Emissary'))
           .then(() => driver.getCurrentUrl())
           .then(URL => URL.should.equal(site))

           // Check if buttons exist with correct labels
           .then(() => driver.findElement(By.xpath("//*[contains(text(), 'Features')]")))
           .then(() => driver.findElement(By.xpath("//*[contains(text(), 'Pricing')]")))
           .then(() => driver.findElement(By.xpath("//*[contains(text(), 'Log in')]")))
           .then(() => driver.findElement(By.xpath("//*[contains(text(), 'Sign up')]")))
   });
   test.it("Checks if features menu button displays correct content", function() {
       this.timeout(mochaTimeOut);
       driver.get(site)

           // Check if content is correct
           .then(() => driver.findElement(By.xpath("//*[contains(text(), 'Features')]")).click())
           .then(() => driver.findElement(By.xpath("//*[contains(text(), 'Automated Check-in')]")))
           .then(() => driver.findElement(By.xpath("//*[contains(text(), 'Minimize the work of" +
                                                   " your receptionist or completely replace them')]")))
           // Check if next button works
           .then(() => driver.findElement(By.xpath("//*[contains(text(), 'Next')]")).click())
           .then(() => driver.findElement(By.xpath("//*[contains(text(), 'Customizable')]")))
           .then(() => driver.findElement(By.xpath("//*[contains(text(), 'Change the look, feel, and" +
                                                   " content of your forms through our Form Builder')]")))

           // Check if previous button works
           .then(() => driver.findElement(By.xpath("//*[contains(text(), 'Previous')]")).click())
           .then(() => driver.findElement(By.xpath("//*[contains(text(), 'Automated Check-in')]")))
   });
   test.it("Checks if pricing menu button displays correct content", function() {
       this.timeout(mochaTimeOut);
       driver.get(site)
           
           // Check if Pricing Box is displayed
           .then(() => driver.findElement(By.xpath("//*[contains(text(), 'Pricing')]")).click())

           // Check if Subscription Box is displayed
           .then(() => driver.findElement(By.xpath("//*[contains(text(), 'Subscription')]")))
           .then(() => driver.findElement(By.xpath("//*[contains(text(), 'Unlimited visitors and employees')]")))
           .then(() => driver.findElement(By.xpath("//*[contains(text(), 'Sync employees with Slack')]")))
           .then(() => driver.findElement(By.xpath("//*[contains(text(), 'Form Builder - Customizable check-in forms')]")))
           .then(() => driver.findElement(By.xpath("//*[contains(text(), '$20')]")))
           .then(() => driver.findElement(By.xpath("//*[contains(text(), 'month')]")))

           // Check if the Free Trial Box is displayed
           .then(() => driver.findElement(By.xpath("//*[contains(text(), 'Free Trial')]")))
           .then(() => driver.findElement(By.xpath("//*[contains(text(), 'Try Emissary for two weeks')]")))
           .then(() => driver.findElement(By.xpath("//*[contains(text(), 'Easy sign up process, be ready in no time')]")))
           .then(() => driver.findElement(By.xpath("//*[contains(text(), 'Free')]")))
   });
});

test.describe("Log In Page", function() {
    test.it("Log in page loads", function() {
       this.timeout(mochaTimeOut);
       driver.get(site)
            .then(() => driver.findElement(By.linkText('LOGIN')).click())
            .then(() => driver.getCurrentUrl())
            .then(URL => URL.should.equal(site + 'login'))
    });
});

test.describe("Register Page", function() {
   test.it("Checks Register Page Loads", function() {
      this.timeout(mochaTimeOut);
      driver.get(site)
          .then(() => driver.findElement(By.linkText('SIGN-UP')).click())
          .then(() => driver.getCurrentUrl())
          .then(URL => URL.should.equal(site +'signup'))
   });
   /* TODO: Finish Sign Up Test -- Currently Having Trouble Testing
   test.it("Checking Sign Up Attempt", function() {
      this.timeout(mochaTimeOut);
      driver.get(site)
          .then(() => driver.findElement(By.linkText('SIGN-UP')).click())
          .then(() => driver.findElement(By.name('name')).sendKeys('ORANGETREE'))
          .then(() => driver.findElement(By.name('email')).sendKeys('orange@orange.com'))
          .then(() => driver.findElement(By.name('phone_number')).sendKeys('1234567890'))
          .then(() => driver.findElement(By.linkText('Next')).click())
          .then(() => driver.findElement(By.name('First Name')).sendKeys('DRORANGE'))
          .then(() => driver.findElement(By.name('Last Name')).sendKeys('TREE'))
          .then(() => driver.findElement(By.name('Email')).sendKeys('orange@orange.com'))
          .then(() => driver.findElement(By.name('Phone Number')).sendKeys('1234567890'))
          .then(() => driver.findElement(By.name('Password')).sendKeys('APPLETREE123'))
          .then(() => driver.findElement(By.name('Confirm Password')).sendKeys('APPLETREE123'))
          .then(() => driver.findElement(By.linkText('Next')).click())
          .then(() => driver.getCurrentUrl())
          .then(URL => URL.should.equal(site +'visitors'))
   });
   */
});



test.afterEach(function() {
    driver.manage().deleteAllCookies();
});

test.after(function() {
    driver.quit();
});
