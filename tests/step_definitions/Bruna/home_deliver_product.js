const assert = require('assert');
const {
    client
} = require('nightwatch-cucumber');
const {
    Given,
    Then,
    When
} = require('cucumber');
const pdp = require('./modules/pdp');
const cart = require('./modules/cart');

When(/^add home deliverable product into cart$/, () => {
    pdp.openPDPPage(client,client.globals.homeDeliverProductUrl)
    pdp.getItemTitle(client)
    pdp.chooseQuantity(client, 2)
    pdp.addProductIntoCart(client,1)
    return client
});

Then(/^check the shipping info in the product list$/, () => {
    cart.waitForCartPage(client, 'the cart page is show.')
    cart.verifyTheShippingInfo(client, client.globals.homeDeliverProductShippingInfo, 'The home deliver info is show correct.')
    cart.clearCart(client)
    return client
});