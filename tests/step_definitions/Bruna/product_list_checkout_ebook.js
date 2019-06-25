const {
    client
} = require('nightwatch-cucumber');
const {
    Then
} = require('cucumber');
const cart = require('./modules/cart');
const pdp = require('./modules/pdp');

Then(/^enter cart page tocheck the ebook product list info$/, () => {
    pdp.chooseQuantity(client, 1)
    pdp.addProductIntoCart(client,1)
    cart.waitForCartPage(client, 'cart page show ok.')
    cart.itemLocation(client)
    cart.verifyTheItemThumbnail(client, 'The thumbnail load success.')
    cart.verifyTheItemTitle(client, 'The title is correct.')
    cart.verifyTheItemQuantitySelector(client, 'The quantity is correct.')
    cart.verifyTheItemPrice(client, 'The price is correct.')
    cart.verifyTheDeleteLink(client, client.globals.lineItemDeleteLinkText, 'The delete link text is correct.')
    return client
});

Then(/^verify the ebook binding in the cart page$/, () => {
    cart.verifyTheItemBindings(client, 'The binding name is correct.')
    cart.verifyShippingInfo(client, 'The shipping info is correct.',true)
    return client
});


Then(/^delete all the ebook products$/, () => {
    cart.clearCart(client)
    return client
});