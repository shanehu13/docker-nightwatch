const {
    client
} = require('nightwatch-cucumber');
const {
    Given,
    Then
} = require('cucumber');
var homepage = client.page.homepage();
var login = client.page.login();

Given(/^click the my account$/, () => {
    homepage.clickMyAccountToLogin()
    return client
});

Then(/^input email and password to login$/, () => {
    login.waitForPopupDialogue()
    login.accountLogin(client.globals.loginEmail, client.globals.loginPassword)
    return client
});