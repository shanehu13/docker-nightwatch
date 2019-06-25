const base = require('../basic/base');
const properties = require('../basic/property');
const PRODUCT_TITLE = 'itemTitle';
const PRODUCT_QUANTITY = 'productQuantity';
const PRODUCT_PRICE = 'productPrice';
const PRODUCT_BRANDAUTHOR = 'productBrandAuthor';
const PRODUCT_BINDINGNAME = 'productBindingName';
const PRODUCT_DELIVERYMOMENT = 'productDeliveryMoment';

func1 = function (client, quantity) {
    //wait for a few second
    base.wait(client, client.globals.miniWaitTime)
    //click the add to cart button
    client.execute(function (quantity) {
        function delay() {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, 10000);
            })
        }
        for (var i = 0; i < quantity; i++) {
            delay();
            document.getElementsByClassName('addto-cart')[0].getElementsByTagName('a')[0].click();
        }
    }, [quantity])
    //wait for a few second
    base.wait(client, client.globals.middleWaitTime);
    base.wait(client, client.globals.middleWaitTime);
    //click the cart icon
    client.execute(function () {
        document.getElementsByClassName('minicart-status')[0].getElementsByTagName('a')[0].click();
    })
};

func2 = function (client) {
    client.execute(function (PRODUCT_TITLE) {
        let v = document.getElementsByClassName('product-information')[0].getElementsByClassName('product-title')[0].innerText;
        //clear the localstorage first and save in the localstorage
        localStorage.clear();
        localStorage.setItem(PRODUCT_TITLE, v);
        return localStorage.getItem(PRODUCT_TITLE);
    }, [PRODUCT_TITLE], function (result) {
        console.log('The item title is ' + result.value)
    })
}

func3 = function (client, url) {
    //open the product detail page 
    base.openUrl(client, url)
}

func4 = function (client, quantity) {
    //choose a quantity
    client.execute(function (PRODUCT_QUANTITY, quantity) {
        if (document.getElementsByClassName('quantity-selector-fix-amount').length != 1) {
            localStorage.setItem(PRODUCT_QUANTITY, quantity)
        } else {
            localStorage.setItem(PRODUCT_QUANTITY, 1)
        }
        return localStorage.getItem(PRODUCT_QUANTITY);
    }, [PRODUCT_QUANTITY, quantity], function (result) {
        if (1 != result.value) {
            base.setListValue(client, 'select[class="quantity-dropdown"]', quantity)
        }
        console.log('the item quantity is ' + result.value)
    })
}

func5 = function (client,cartOrNot) {
    //check the ebook quantity
    base.waitElement(client, properties.BY_CLASS, 'quantity-selector-fix-amount', 'the ebook quantity in PDP page is fixed.')
    //and it should be 1
    if(cartOrNot)
        base.getTextAndVerify(client, properties.BY_CSS_SELECTOR, '.quantity-selector-fix-amount', '1', 'the ebook quantity in PDP page is 1.')
    else
        base.getTextAndVerify(client, properties.BY_CSS_SELECTOR, 'div .quantity-selector-fix-amount:nth-child(2)', '1', 'the ebook quantity in PDP page is 1.')
}

func6 = function (client) {
    client.execute(function (PRODUCT_PRICE) {
        var price = document.getElementsByClassName('product-price-information')[0].innerText.replace(/[\r\n]/g, "").substring(1);
        localStorage.setItem(PRODUCT_PRICE, price)
        return price;
    }, [PRODUCT_PRICE], function (result) {
        console.log('the item price is ' + result.value)
    })
}

func7 = function (client) {
    client.execute(function (PRODUCT_BRANDAUTHOR) {
        var brandAuthor = document.getElementsByClassName('product-information')[0].getElementsByClassName('product-brands-authors')[0].getElementsByTagName('a')[0].innerText;
        localStorage.setItem(PRODUCT_BRANDAUTHOR, brandAuthor)
        return brandAuthor;
    }, [PRODUCT_BRANDAUTHOR], function (result) {
        console.log('the item brand author name is ' + result.value)
    })
}

func8 = function (client) {
    client.execute(function (PRODUCT_BINDINGNAME) {
        var bindingName = document.getElementsByClassName('product-information')[0].getElementsByClassName('product-bindings')[0].getElementsByClassName('active')[0].getElementsByClassName('binding-title')[0].innerText;
        localStorage.setItem(PRODUCT_BINDINGNAME, bindingName)
        return bindingName;
    }, [PRODUCT_BINDINGNAME], function (result) {
        console.log('the item binding name is ' + result.value)
    })
}

func9 = function (client, message) {
    client.execute(function (PRODUCT_DELIVERYMOMENT) {
        var deliveryMoment = document.getElementsByClassName('addtocart-usp-text-wrapper')[0].getElementsByTagName('span')[1].innerText;
        localStorage.setItem(PRODUCT_DELIVERYMOMENT, deliveryMoment)
        return deliveryMoment;
    }, [PRODUCT_DELIVERYMOMENT], function (result) {
        console.log('the delivery moment is ' + result.value)
        base.assertContain(client, result.value, client.globals.deliveryMoment, message)
    })
}

func10 = function (client,message){
    client.execute(function (PRODUCT_DELIVERYMOMENT) {
        var deliveryMoment = document.getElementsByClassName('addtocart-usp-text-wrapper')[0].getElementsByTagName('span')[1].innerText;
        localStorage.setItem(PRODUCT_DELIVERYMOMENT, deliveryMoment)
        return deliveryMoment;
    }, [PRODUCT_DELIVERYMOMENT], function (result) {
        console.log('the delivery moment is '+result.value)
        base.assertEqual(client,result.value,client.globals.ebookDeliveryMoment,message)
    })
}

module.exports = {
    addProductIntoCart: func1,
    getItemTitle: func2,
    openPDPPage: func3,
    chooseQuantity: func4,
    checkEbookQuantity: func5,
    getItemPrice: func6,
    getItemBrandAuthor: func7,
    getItemBinding: func8,
    getItemDeliveryMoment: func9,
    getEbookItemDeliveryMoment: func10,
    PRODUCT_TITLE,
    PRODUCT_QUANTITY,
    PRODUCT_PRICE,
    PRODUCT_BRANDAUTHOR,
    PRODUCT_BINDINGNAME,
    PRODUCT_DELIVERYMOMENT
}