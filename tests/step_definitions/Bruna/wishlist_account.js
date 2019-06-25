const {
    client
} = require('nightwatch-cucumber');
const {
    Given,
    Then
} = require('cucumber');
const cart = require('./modules/cart');
var homepage = client.page.homepage();
var plp = client.page.plp();
var account = client.page.account();


Given(/^add a product into wishlist and go to my account$/, () => {
    homepage.enterCartPage()
    cart.clearCart(client)
    //homepage.searchItems('ebook')
    plp.navigate()
    client.waitForElementVisible('.filter-sidebar-inner')
    plp.checkProductListItemTitle()
    plp.checkProductListItemPrice()
    plp.addToWishlist()
    plp.moveToProductListItem()
    plp.checkProductListItemAddToCartButton()
    plp.saveAddItemsInfo()
    client.pause(10000)
    return client
});

Then(/^the wishlist info is correct in the my account and clear the wishlist$/, () => {
    homepage.enterMyAccount()
    client.pause(client.globals.miniWaitTime)
    account.showWishlist()
    account.checkWishlistInfo(client)
    account.clearWishlistInfo(client)
    return client
});

Then(/^add product again and add product into the cart from wishlist$/, () => {
    //homepage.searchItems('ebook')
    plp.navigate()
    client.waitForElementVisible('.filter-sidebar-inner')
    plp.checkProductListItemTitle()
    plp.checkProductListItemPrice()
    plp.addToWishlist()
    plp.moveToProductListItem()
    plp.checkProductListItemAddToCartButton()
    plp.saveAddItemsInfo()
    homepage.checkTheWishlistIconNumber()
    client.pause(client.globals.miniWaitTime)
    homepage.enterMyAccount()
    client.pause(client.globals.miniWaitTime)
    account.showWishlist()
    account.clickMoveToCartButton(client)
    homepage.checkCartIconNumber()
    homepage.enterCartPage()
    cart.clearCart(client)
    return client
});