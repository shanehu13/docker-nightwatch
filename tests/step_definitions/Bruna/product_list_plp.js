const {
    client
} = require('nightwatch-cucumber');
const {
    Given,
    Then,
    When
} = require('cucumber');
var homepage = client.page.homepage();
var plp = client.page.plp();
const cart = require('./modules/cart')
var account = client.page.account();

When(/^enter the plp page$/, () => {
    homepage.navigate()
    homepage.enterCartPage()
    cart.clearCart(client)
    homepage.enterWishlistPage()
    account.clearWishlistInfo(client)
    homepage.navigate()
    homepage.enterProductListPage()
    return client
});

Then(/^check the product list item title$/, () => {
    plp.checkProductListItemTitle()
    return client
});

Then(/^check the product list item image$/, () => {
    plp.checkProductListItemImage()
    return client
});

Then(/^check the product list item price$/, () => {
    plp.checkProductListItemPrice()
    return client
});

When(/^check the product list item add to wishlist button$/, () => {
    plp.checkProductListItemAddToWishlistButton()
    return client
});

Then(/^click the add to wishlist button to add product$/, () => {
    plp.addToWishlist();
    return client
});

Then(/^add to wishlist success$/, () => {
    homepage.checkTheWishlistIconNumber();
    return client
});

When(/^check the product list item add to cart button$/, () => {
    plp.moveToProductListItem();
    //plp.checkProductListItemAddToCartButton();
    return client
});

Then(/^click the add to cart button to add product$/, () => {
    plp.addToCart();
    return client
});

Then(/^add to cart success$/, () => {
    homepage.checkCartIconNumber();
    homepage.navigate()
    homepage.enterCartPage()
    cart.clearCart(client)
    homepage.enterWishlistPage()
    account.clearWishlistInfo(client)
    return client
});