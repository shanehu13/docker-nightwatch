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
const cart = require('./modules/cart');

Given(/^choose pick up in store in the cart$/, () => {
    homepage.clickMyAccountToLogin()
    login.waitForPopupDialogue()
    login.accountLogin(client.globals.loginEmail,client.globals.loginPassword)
    //homepage.searchItems('Rugzak')
    plp.navigate();
    plp.moveToProductListItem()
    plp.addToCart()
    homepage.enterCartPage()
    cart.waitForCartPage(client, 'enter cart page success')
    //step1
    cart.chooseTheShippingMethod(client,client.globals.shippingMethodStoreFetch)
    return client
});

Then(/^verify the store info in the next steps$/, () => {
    cart.chooseStore(client,'Amsterdam')
    cart.verifyTheStoreInfo(client)
    cart.clickNextStepButton(client)
    // cart.clickNextStepButton(client)
    // login.waitForPopupDialogue()
    // login.accountLogin(client.globals.loginEmail, client.globals.loginPassword)

    //step 2
    cart.verifyTheStoreInfo(client)
    cart.clickNextStepButton(client)
    cart.clickNextStepButton(client)
    //step 3
    cart.verifyTheStoreInfo(client)
    cart.verifyTheStorePhone(client)
    //need choose an option here
    cart.choosePayInStoreOption(client)
    cart.clickNextStepButton(client)
    //step 4
    cart.verifyTheStoreInfo(client)
    cart.verifyTheStorePhone(client)
    cart.clickPreviousStepButton(client)
    //step 3
    cart.clickPreviousStepButton(client)
    //step 2
    cart.clickPreviousStepButton(client)
    //step 1
    cart.clearCart(client)

    return client
});