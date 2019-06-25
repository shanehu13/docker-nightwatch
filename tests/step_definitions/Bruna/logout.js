const {
    client
} = require('nightwatch-cucumber');
const {
    Given,
    Then
} = require('cucumber');
var homepage = client.page.homepage();
var account = client.page.account();

Given(/^enter my account$/, () => {
    homepage.enterMyAccount()
    return client
});

Then(/^click logout menu to logout$/, () => {
    account.logoutAccount()
    return client
});