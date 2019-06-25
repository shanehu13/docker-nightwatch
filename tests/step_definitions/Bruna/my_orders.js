const assert = require('assert');
const {
    client
} = require('nightwatch-cucumber');
const {
    Given,
    Then
} = require('cucumber');
var homepage = client.page.homepage();
var account = client.page.account();

Given(/^enter my account page$/, () => {
    homepage.enterMyAccount()
    return client
});

Then(/^check the order info$/, () => {
    account.showOrders()
    account.checkSubmittedOrders(client)
    account.checkSubmittedOrderDetails(client)
    return client
});