const {
    client
} = require('nightwatch-cucumber');
const {
    Then,
    Given
} = require('cucumber');
var homepage = client.page.homepage();
var plp = client.page.plp();
var login = client.page.login();
var account = client.page.account();
const cart = require('./modules/cart');

Given(/^search an ebook and add to cart$/, () => {
    //account.verifyTheEbookLink(client)
    homepage.searchItems('ebook')
    plp.moveToProductListItem()
    plp.addToCart()
    return client
});

Then(/^check out the ebook success$/, () => {
    homepage.enterCartPage()
    cart.waitForCartPage(client, 'enter cart page success')
    //step1
    cart.chooseTheShippingMethod(client,client.globals.ebookShippingMethod)
    cart.clickNextStepButton(client)
    //login.waitForPopupDialogue()
    //login.accountLogin(client.globals.loginEmail, client.globals.loginPassword)
    //step 2
    cart.clickNextStepButton(client)
    //step 3
    cart.clickNextStepButton(client)
    //step 4
    cart.getCartInfo(client)
    cart.clickNextStepButton(client)
    //check out success or error page
    //cart.setOrderInfoError(client)

    return client
});