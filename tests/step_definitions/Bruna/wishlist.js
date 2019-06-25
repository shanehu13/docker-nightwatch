const assert = require('assert');
const {
    client
} = require('nightwatch-cucumber');
const {
    Given,
    Then,
    When
} = require('cucumber');

var wishlistIconNum;
var cartIconNum;
var productCount;

Given(/^check the wishlist link in the header$/, () => {
    return client
        //open the a pdp page
        .url(client.globals.wishlistProductPDPUrl)
        //wait fot the wishlist link show in the header
        .waitForElementVisible('.wishlist', 'the wishlist icon is shown.')
});

Then(/^add a product into wishlist$/, () => {
    return client
        //choose the minimun quantity and click the add to wishlist button
        .execute(function () {
            document.getElementsByClassName('quantity-dropdown')[0][0].selected = true;
            return document.getElementsByClassName('quantity-dropdown')[0][0].innerText;
        }, [], function (result) {
            productCount = result.value
        })
        //get the wishlist icon number before click the add to cart button
        .execute(function () {
            var countLen = document.getElementsByClassName('miniwishlist-status')[0].getElementsByClassName('count').length;
            if (countLen > 0) {
                return document.getElementsByClassName('miniwishlist-status')[0].getElementsByClassName('count')[0].innerText;
            }
            return '0';
        }, [], function (result) {
            wishlistIconNum = result.value
            console.log(wishlistIconNum)
        })
        //click the add to wishlist button
        .execute(function () {
            document.getElementsByClassName('product-information')[0].getElementsByClassName('btn-wishlist')[0].click();
        })
        //wait for a moment for the icon number show
        .pause(client.globals.longWaitTime)
        //verify the wishlist icon number is correct or not
        .execute(function () {
            return document.getElementsByClassName('miniwishlist-status')[0].getElementsByClassName('count')[0].innerText;
        }, [], function (result) {
            console.log('result:' + result.value)
            console.log('wishlistIconNum:' + wishlistIconNum)
            client.assert.equal(parseInt(result.value) == parseInt(wishlistIconNum) + 1, true, 'the wishlist icon number is correct.')
            wishlistIconNum = result.value
        })
});

Then(/^click the wishlist icon to enter the wishlist page$/, () => {
    //click the wishlist icon
    return client
        .execute(function () {
            document.getElementsByClassName('miniwishlist-status')[0].getElementsByTagName('a')[0].click();
        })
});

Then(/^redirect to the wishlist page$/, () => {
    return client
        //wait for the wishlist page show
        .waitForElementVisible('.products', 'the wishlist products show.')
});

Then(/^move product into cart$/, () => {
    return client
        //get the cart icon number before click the move to cart button
        .execute(function () {
            var countLen = document.getElementsByClassName('minicart-status')[0].getElementsByClassName('count').length;
            if (countLen > 0) {
                return document.getElementsByClassName('minicart-status')[0].getElementsByClassName('count')[0].innerText;
            }
            return '0';
        }, [], function (result) {
            cartIconNum = result.value
            console.log(cartIconNum)
        })
        //click the move to cart link
        .execute(function () {
            document.getElementsByClassName('move-to-cart')[0].getElementsByTagName('a')[0].click();
        })
        //wait for a few second
        .pause(client.globals.longWaitTime)
        //check the wishlist icon number and cart icon number
        .execute(function () {
            var wishlistIconNumber
            var cartIconNumber
            if (document.getElementsByClassName('miniwishlist-status')[0].getElementsByClassName('count').length > 0) {
                wishlistIconNumber = document.getElementsByClassName('miniwishlist-status')[0].getElementsByClassName('count')[0].innerText;
            } else {
                wishlistIconNumber = 0;
            }
            if (document.getElementsByClassName('minicart-status')[0].getElementsByClassName('count').length > 0) {
                cartIconNumber = document.getElementsByClassName('minicart-status')[0].getElementsByClassName('count')[0].innerText;
            } else {
                cartIconNumber = 0;
            }
            return {
                wishlistItemCount: wishlistIconNumber,
                cartItemCount: cartIconNumber
            };
        }, [], function (result) {
            console.log('afterWishlistItem:' + result.value.wishlistItemCount)
            console.log('afterCartItem:' + result.value.cartItemCount)
            console.log('beforeWishlistIconNum' + wishlistIconNum)
            console.log('beforeCartIconNum' + cartIconNum)
            client.assert.equal(parseInt(result.value.wishlistItemCount) == parseInt(wishlistIconNum) - 1, true, 'the wishlist icon number is correct.')
            client.assert.equal(parseInt(result.value.cartItemCount) == parseInt(cartIconNum) + 1, true, 'the wishlist icon number is correct.')
            wishlistIconNum = result.value.wishlistItemCount
            cartIconNum = result.value.cartItemCount
        })
});

When(/^click the cart icon to enter cart page$/, () => {
    return client
        //click the cart icon in the header
        .execute(function () {
            document.getElementsByClassName('minicart-status')[0].getElementsByTagName('a')[0].click();
        })
    //wait for the cart page show
    //.waitForElementVisible('.orderStep', 'the cart page is show')
});

Then(/^the product quantity should be right$/, () => {
    return client
        //check the product quantity
        .execute(function () {
            return document.getElementsByClassName('cart-product-information-bottom')[0].getElementsByTagName('input')[0].value;
        }, [], function (result) {
            console.log('real count:' + result.value)
            console.log('expect count:' + productCount)
            client.assert.equal(result.value, productCount, 'the product count is correct.')
        })
});