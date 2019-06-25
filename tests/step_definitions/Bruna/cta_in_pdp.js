const assert = require('assert');
const {
    client
} = require('nightwatch-cucumber');
const {
    Given,
    Then,
    When
} = require('cucumber');

var cartIconNum;
var addQuantity;
var productCount;
var productPrice;
var productPDPUrl;

When(/^choose a (.+) quantity and click the add to cart button$/, (quantity) => {
    var quantityType = quantity
    return client
        //open the product detail page 
        .url(client.globals.productCTAUrl)
        //choose a quantity
        .execute(function (quantityType) {
            var select = document.getElementsByClassName('quantity-dropdown')[0];
            var selectValue;
            switch (quantityType) {
                case 'min':
                    selectValue = select[0].value;
                    break;
                case 'max':
                    selectValue = select[select.length - 1].value;
                    break;
                case 'middle':
                    selectValue = select[Math.floor((select.length - 1) / 2)].value;
                    break;
            }
            return {
                optionValue: selectValue,
                price: document.getElementsByClassName('product-price-information')[0].getElementsByClassName('price')[0].innerText.substring(1).replace(/\./g,'').replace(/\,/g,'.')
            }
        }, [quantityType], function (result) {
            console.log(result.value)
            //save the product count
            if(quantityType!='min'){
                client.setValue('select[class="quantity-dropdown"]', result.value.optionValue)
            }
            addQuantity = result.value.optionValue
            productPrice = result.value.price
            console.log(productPrice)
            console.log(result.value.optionValue)
        })
        //wait for a few second
        .pause(client.globals.miniWaitTime)
        //get the cart icon number before click the add to cart button
        .execute(function () {
            var countLen = document.getElementsByClassName('minicart-status')[0].getElementsByClassName('count').length;
            if (countLen > 0) {
                return document.getElementsByClassName('minicart-status')[0].getElementsByClassName('count')[0].innerText;
            }
            return '0';
        }, [], function (result) {
            cartIconNum = result.value
            console.log('before click add to cart button,the icon number is:' + cartIconNum)
        })
        //click the add to cart button
        .execute(function () {
            document.getElementsByClassName('addto-cart')[0].getElementsByTagName('a')[0].click();
        })
});

Then(/^the cart icon number will show correct$/, () => {
    return client
        //wait for the cart icon number show on the page
        .pause(client.globals.middleWaitTime)
        //verify the cart icon number
        .execute(function () {
            return document.getElementsByClassName('minicart-status')[0].getElementsByClassName('count')[0].innerText;
        }, [], function (result) {
            console.log(result.value)
            console.log('after click add to cart button,the icon number is:' + result.value)
            client.assert.equal(parseInt(result.value) == parseInt(cartIconNum) + parseInt(addQuantity), true, 'the cart icon number is correct.')
            cartIconNum = result.value
        })
});

When(/^click the cart icon in pdp page$/, () => {
    return client
        //click the cart icon
        .execute(function () {
            document.getElementsByClassName('minicart-status')[0].getElementsByTagName('a')[0].click();
        })
    //wait for the cart page load completely
    //.waitForElementPresent('.orderStep', 'the cart page show correctly.')
});

Then(/^the product is in the cart page and info is correct$/, () => {
    return client
        //wait for a few second
        .pause(client.globals.miniWaitTime)
        //verify the product quantity, the product price and save the product PDP page url
        .execute(function () {
            return {
                quantity: document.getElementsByClassName('cart-product-information-bottom')[0].getElementsByTagName('input')[0].value,
                totalPrice: document.getElementsByClassName('cart-product-information-bottom')[0].getElementsByClassName('price')[0].innerText.substring(1).replace(/\./g,'').replace(/\,/g,'.'),
                url: document.getElementsByClassName('thumbnail')[0].getElementsByTagName('a')[0].href
            }
        }, [], function (result) {
            client.assert.equal(result.value.quantity, addQuantity, 'the product count is correct.')
            client.assert.equal(parseFloat(result.value.totalPrice), parseInt(addQuantity) * parseFloat(productPrice), 'the product total price is correct.')
            productPDPUrl = result.value.url;
        })
});

Then(/^clear the cart and return to the pdp page$/, () => {
    return client
        //clear the cart by click the delete link
        .execute(function (productPDPUrl) {
            var deleteLinks = document.getElementsByClassName('delete');
            for (index in deleteLinks) {
                console.log(deleteLinks[index]);
                deleteLinks[index].getElementsByTagName('a')[0].click();
            }
        })
        //wait for a few second
        .pause(client.globals.miniWaitTime)
        //verify the cart icon number
        .execute(function () {
            return document.getElementsByClassName('minicart-status')[0].getElementsByClassName('count').length;
        }, [], function (result) {
            client.assert.equal(result.value, 0, 'the cart icon number is 0 now.')
        })
        //verify the image url
        .assert.equal(productPDPUrl, client.globals.productCTAUrl, 'the line item image url is correct.')
});