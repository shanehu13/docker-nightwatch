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

When(/^open the pdp page$/, () => {
    pdp.openPDPPage(client, client.globals.cartListProductUrl)
    pdp.getItemTitle(client)
    pdp.getItemBinding(client)
    pdp.getItemPrice(client)
    return client
});

Then(/^verify the delivery moment$/, () => {
    pdp.getItemDeliveryMoment(client, 'The delivery moment is correct.')
    return client
});

Then(/^add into cart and enter cart page$/, () => {
    pdp.chooseQuantity(client, 1)
    pdp.addProductIntoCart(client,1)
    return client
});

Then(/^check the product list info$/, () => {
    cart.waitForCartPage(client, 'cart page show ok.')
    cart.itemLocation(client)
    cart.verifyTheItemThumbnail(client, 'The thumbnail load success.')
    cart.verifyTheItemTitle(client, 'The title is correct.')
    //cart.verifyTheItemBindings(client,'The binding name is correct.')
    cart.verifyShippingInfo(client, 'The shipping info is not empty.',false)
    cart.verifyTheItemQuantitySelector(client, 'The quantity is correct.')
    cart.verifyTheItemPrice(client, 'The price is correct.')
    cart.verifyTheDeleteLink(client, client.globals.lineItemDeleteLinkText, 'The delete link text is correct.')
    return client
});

Then(/^verify the delivery moment in the cart page$/, () => {
    cart.verifyShippingInfo(client, 'The shipping info is correct.',false)
    //verify the shipping cost in the summary
    cart.chooseTheShippingMethod(client, client.globals.shippingMethodHomeDelivery)
    cart.setQuantity(client, 1)
    cart.getOrderSubTotal(client)
    cart.getShippingCost(client)
    cart.verifyTheShippingCost(client)
    cart.setQuantity(client, 10)
    cart.getOrderSubTotal(client)
    cart.getShippingCost(client)
    cart.verifyTheShippingCost(client)
    cart.quantityValidation(client)
    return client
});


Then(/^delete all the products$/, () => {
    cart.clearCart(client)
    return client
});