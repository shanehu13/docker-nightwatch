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
const base = require('./basic/base');
const properties = require('./basic/property');

When(/^open the ebook pdp page$/, () => {
    pdp.openPDPPage(client,client.globals.ebookProductUrl)
    return client
});

Then(/^the quanitity should be fixed$/, () => {
    pdp.checkEbookQuantity(client,false)
    return client
});

When(/^add ebook into cart$/, () => {
    pdp.addProductIntoCart(client,3)
    return client
});

Then(/^check the quantity in the item list in cart page$/, () => {
    pdp.checkEbookQuantity(client,true)
    cart.clearCart(client)
    return client
});