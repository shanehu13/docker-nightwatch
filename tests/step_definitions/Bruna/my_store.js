const {
    client
} = require('nightwatch-cucumber');
const {
    Then,
    When,
    Given
} = require('cucumber');
var homepage = client.page.homepage();
var plp = client.page.plp();
var login = client.page.login();
const cart = require('./modules/cart');

Given(/^click the my store link in the header$/, () => {
    homepage.clickMyStoreLink()
    return client
});

When(/^input the search key word and click the search button$/, () => {
    cart.searchStore(client,'Amsterdam')
    return client
});

Then(/^the store search result will show$/, () => {
    cart.chooseStoreSearchResult(client)
    cart.clickBackButton(client)
    return client
});

When(/^click the cancel button and check store search result$/, () => {
    cart.resetStoreSearchResult(client)
    return client
});

When(/^choose the filter day check box and choose a store search result$/, () => {
    cart.chooseOpenDay(client)
    cart.searchStore(client,'Amsterdam')
    cart.chooseStoreSearchResult(client)
    return client
});

Then(/^the store detail will show correct$/, () => {
    cart.verifyTheOpeningHours(client)
    return client
});