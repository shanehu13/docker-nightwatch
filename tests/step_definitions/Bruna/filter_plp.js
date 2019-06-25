const assert = require('assert');
const {
    client
} = require('nightwatch-cucumber');
const {
    Given,
    Then,
    When,
    After
} = require('cucumber');
var plp = client.page.plp();
var homepage = client.page.homepage();

Given(/^enter the plp page to choose filter$/, () => {
    homepage.navigate()
    homepage.enterProductListPage()
    plp.getDefaultResultNum()
    return client
});

Then(/^check the brand filter title$/, () => {
    plp.checkTheBrandTitle()
    return client
});

Then(/^check the category filter title$/, () => {
    plp.checkTheCategoryTitle()
    return client
});

Then(/^check the price filter title$/, () => {
    plp.checkThePriceTitle()
    return client
});

When(/^choose a brand filter$/, () => {
    plp.chooseABrand()
    return client
});

Then(/^the brand filter result is correct$/, () => {
    plp.checkChosenBrandFilterResult(client)
    return client
});

Then(/^click the filter reset$/, () => {
    plp.clickResetButton()
    return client
});

When(/^set a price filter$/, () => {
    plp.getItemPriceSection()
    plp.setTheMinPrice(client)
    return client
});

Then(/^the price filter result is correct$/, () => {
    plp.checkSetPriceFilterResult(client)
    plp.checkAllPrice(client)
    return client
});
