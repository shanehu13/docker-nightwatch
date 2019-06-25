const {
    client
} = require('nightwatch-cucumber');
const {
    Then,
    Given
} = require('cucumber');
var homepage = client.page.homepage();
var account = client.page.account();

Given(/^click the ebook menu in my account$/, () => {
    homepage.enterMyAccount()
    account.showEbookOrders()
    return client
});

Then(/^verify the download link$/, () => {
    account.verifyTheEbookOrder(client)
    //account.verifyTheEbookLink(client)
    return client
});