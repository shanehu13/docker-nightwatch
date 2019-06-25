const {
    client
} = require('nightwatch-cucumber');
const {
    Given,
    Then,
    When
} = require('cucumber');
var account = client.page.account();
var homepage = client.page.homepage();
var login = client.page.login();

Given(/^upadate the password$/, () => {
    homepage.enterMyAccount()
    account.showResetPassword()
    account.updateThePassword(client.globals.loginPassword,client.globals.editPassword)
    return client
});

Then(/^login with the new password$/, () => {
    account.logoutAccount()
    homepage.clickMyAccountToLogin()
    login.waitForPopupDialogue()
    login.accountLogin(client.globals.loginEmail,client.globals.editPassword)
    return client
});

When(/^restore to the old password in my account$/, () => {
    account.showResetPassword()
    account.updateThePassword(client.globals.editPassword,client.globals.loginPassword)
    return client
});

Then(/^login with old password should be success$/, () => {
    account.logoutAccount()
    homepage.clickMyAccountToLogin()
    login.waitForPopupDialogue()
    login.accountLogin(client.globals.loginEmail,client.globals.loginPassword)
    return client
});

Then(/^logout success$/, () => {
    account.logoutAccount()
    return client
});