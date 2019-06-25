const properties = require('../basic/property');
const base = require('../basic/base');
const pdp = require('./pdp')
const globals = require('../../../global');
const LINE_ITEM_TITLE_CLASSNAME = 'lineItem-title';
const LINE_ITEM_SHIPPING_INFO_CLASSNAME = 'binding-shipping-wrapper';
const LINE_ITEM_DELETE_CLASSNAME = 'delete';
const LINE_ITEM_BRAND_AUTHOR_CLASSNAME = 'lineitem-fields';
const LINE_ITEM_PRICE_CLASSNAME = 'price-wrapper';
const LINE_ITEM_BINDING_SELECTOR = '.binding-shipping-wrapper span:nth-child(1)';
const LINE_ITEM_QUANTITY_SELECTOR_CLASSNAME = 'quantity-selector';
const LINE_ITEM_QUANTITY_SELECTOR = '.quantity-selector > input';
const LINE_ITEM_CLASSNAME = 'product';
const LINE_ITEM_BINDING_CLASSNAME = 'binding-shipping-wrapper';
const LINE_ITEM_THUMBNAIL = 'thumbnail';
const CART_ORDER_STEP_INDICATOR_CLASSNAME = 'orderStep';
const ORDER_TOTALS_CLASSNAME = 'totals';
const ORDER_TOTALS_SHIPPING_CLASSNAME = 'shipping';
const ORDER_TOTALS_SUBTOTAL_CLASSNAME = 'sub-total';
const ORDER_TOTALS_TOTAL = '.order-summary .grand-total > span:nth-child(2)';
const LOCALSTORAGE_SUBTOTAL = 'orderSubTotal';
const LOCALSTORAGE_SHIPPINGCOST = 'shippingCost';
const LOCALSTORAGE_DELIVERYMOMENT = pdp.PRODUCT_DELIVERYMOMENT;
const LOCALSTORAGE_LINEITEMINDEX = 'productIndex';
const LOCALSTORAGE_LINEITEM_TITLE = pdp.PRODUCT_TITLE;
const LOCALSTORAGE_LINEITEM_BINDLINGNAME = pdp.PRODUCT_BINDINGNAME;
const LOCALSTORAGE_LINEITEM_BRANDAUTHORNAME = pdp.PRODUCT_BRANDAUTHOR;
const LOCALSTORAGE_LINEITEM_QUANTITY = pdp.PRODUCT_QUANTITY;
const LOCALSTORAGE_LINEITEM_PRICE = pdp.PRODUCT_PRICE;
const SHIPPING_METHOD_CLASSNAME = 'shipping-method';
const SHIPPING_STORE_INFO_SELECTOR = '.locationlocator-address';
const PESONAL_INFO_COUNTRY = 'countryCode';
const NEWSLETTER_SUBSCRIPTION_CLASSNAME = 'subscribeToNewsletter';
const LOGIN_POPUP_CLOSE_BUTTON_CLASSNAME = 'close-popup';
const NEXT_STEP_BUTTON_CLASSNAME = 'multi-step-next';
const PREVIOUS_STEP_BUTTON_CLASSNAME = 'multi-step-previous';
const CHECKOUT_ERROR_MESSAGE_SELECTOR = '.ncoltxtc';
const CHECKOUT_ERROR_ORDERNUM_SELECTOR = '.ncoltable1 .ncoltxtr';
const CHECKOUT_ERROR_BACK_BUTTON_SELECTOR = '#btn_BackToMerchantHome';
const CHOOSE_STORE_BUTTON_SELECTOR = '.select';
const SEARCH_STORE_TEXT_SELECTOR = '#locationlocator-locationquery';
const SEARCH_STORE_BUTTON_SELECTOR = '.search-icon';
const SEARCH_STORE_RESET_SELECTOR = '.reset';
const STORE_PHONE_SELECTOR = 'div[itemprop="address"] > a';
const SEARCH_STORE_RESULT_SELECTOR = '.locationlocator-address-wrapper';
const SEARCH_STORE_RESULT_PHONE_SELECTOR = '.locationlocator-telephone-details';
const FINISH_CHOOSE_STORE_BUTTON_SELECTOR = '.location-button';
const PAY_IN_STORE_OPTION_SELECTOR = '.payment-method > label';
const STORE_CLOSED_DAY_INFO = 'closed';
const STORE_FILTER_DAY_SELECTOR = 'label[for="locationlocator-sunday-opens"] > span';
const BACK_TO_OVERVIEW_LINK_SELECTOR = '.locationlocator-back-to-overview > span';
const RESET_STORE_SEARCH_RESULT_BUTTON_SELECTOR = '.reset';
const STORE_SEARCH_RESULT_SELECTOR = '.locationlocator-location-summary';
var storeFilterDay = '';
var cartInfo = new Map();
var orderInfo = new Map();
var storeInfo;
var storePhone;

func1 = function (client, messgae) {
    //wait for the cart page show
    base.waitElement(client, properties.BY_CLASS, CART_ORDER_STEP_INDICATOR_CLASSNAME, messgae)
    base.wait(client, client.globals.middleWaitTime)
};

func2 = function (client, expect, message) {
    client.execute(function (LOCALSTORAGE_LINEITEM_TITLE, LINE_ITEM_TITLE_CLASSNAME, LINE_ITEM_SHIPPING_INFO_CLASSNAME) {
        var titles = Array.prototype.slice.call(document.getElementsByClassName(LINE_ITEM_TITLE_CLASSNAME)).map(function (item) {
            return item.innerText;
        });
        let index = -1;
        for (var item of titles) {
            index++;
            if (item === localStorage.getItem(LOCALSTORAGE_LINEITEM_TITLE)) {
                break;
            }
        }
        return document.getElementsByClassName(LINE_ITEM_SHIPPING_INFO_CLASSNAME)[index].innerText;
    }, [LOCALSTORAGE_LINEITEM_TITLE, LINE_ITEM_TITLE_CLASSNAME, LINE_ITEM_SHIPPING_INFO_CLASSNAME], function (result) {
        console.log(result.value)
        console.log(client.globals.homeDeliverProductShippingInfo)
        base.assertContain(client, expect, result.value, message)
    })
}

func3 = function (client) {
    base.wait(client, client.globals.miniWaitTime)
    //clear the cart items
    client.execute(function () {
        var size = document.querySelectorAll('a[title="Delete"]').length;
        if (size > 0) {
            for (i = 0; i < size; i++) {
                document.querySelectorAll('a[title="Delete"]')[i].click();
            }
        }
        localStorage.clear();
    })
    //wait for the delete line items finish
    base.wait(client, client.globals.middleWaitTime)
    base.getTextAndVerify(client, properties.BY_CLASS, 'empty', client.globals.cartEmptyTips, 'the cart is empty and tips is show.')
}

func11 = function (client) {
    client.execute(function (LOCALSTORAGE_LINEITEM_TITLE, LOCALSTORAGE_LINEITEMINDEX, LINE_ITEM_TITLE_CLASSNAME) {
        var titles = Array.prototype.slice.call(document.getElementsByClassName(LINE_ITEM_TITLE_CLASSNAME)).map(function (item) {
            return item.innerText;
        });
        var index = -1;
        for (var item of titles) {
            index++;
            if (item === localStorage.getItem(LOCALSTORAGE_LINEITEM_TITLE)) {
                break;
            }
        }
        localStorage.setItem(LOCALSTORAGE_LINEITEMINDEX, index);
        return index;
    }, [LOCALSTORAGE_LINEITEM_TITLE, LOCALSTORAGE_LINEITEMINDEX, LINE_ITEM_TITLE_CLASSNAME], function (result) {
        console.log('line item index is ' + result.value)
    })
}

func10 = function (client, expect, message) {
    client.execute(function (LOCALSTORAGE_LINEITEMINDEX, LINE_ITEM_DELETE_CLASSNAME) {
        return document.getElementsByClassName(LINE_ITEM_DELETE_CLASSNAME)[localStorage.getItem(LOCALSTORAGE_LINEITEMINDEX)].innerText;
    }, [LOCALSTORAGE_LINEITEMINDEX, LINE_ITEM_DELETE_CLASSNAME], function (result) {
        console.log(result.value)
        console.log(client.globals.lineItemDeleteLinkText)
        base.assertEqual(client, expect, result.value, message)
    })
}

func9 = function (client, message) {
    client.execute(function (LOCALSTORAGE_LINEITEM_PRICE, LOCALSTORAGE_LINEITEMINDEX, LOCALSTORAGE_LINEITEM_QUANTITY, LINE_ITEM_PRICE_CLASSNAME) {
        var total = document.getElementsByClassName(LINE_ITEM_PRICE_CLASSNAME)[localStorage.getItem(LOCALSTORAGE_LINEITEMINDEX)].innerText.replace(/[\r\n]/g, "").substring(1);
        return {
            acutalPrice: Math.round((parseFloat(total) / parseInt(localStorage.getItem(LOCALSTORAGE_LINEITEM_QUANTITY))) * 100) / 100,
            expectPrice: parseFloat(localStorage.getItem(LOCALSTORAGE_LINEITEM_PRICE))
        }
    }, [LOCALSTORAGE_LINEITEM_PRICE, LOCALSTORAGE_LINEITEMINDEX, LOCALSTORAGE_LINEITEM_QUANTITY, LINE_ITEM_PRICE_CLASSNAME], function (result) {
        console.log(result.value)
        base.assertEqual(client, result.value.expectPrice, result.value.acutalPrice, message)
    })
}

func8 = function (client, message) {

    client.execute(function (LOCALSTORAGE_LINEITEMINDEX, LOCALSTORAGE_LINEITEM_QUANTITY, LINE_ITEM_QUANTITY_SELECTOR_CLASSNAME) {
        var temp = document.getElementsByClassName(LINE_ITEM_QUANTITY_SELECTOR_CLASSNAME)[localStorage.getItem(LOCALSTORAGE_LINEITEMINDEX)];
        var quantity;
        if (temp.children.length > 1) {
            quantity = temp.children[1].value;
        } else {
            quantity = temp.children[0].innerText;
        }
        return {
            expectQuantity: localStorage.getItem(LOCALSTORAGE_LINEITEM_QUANTITY),
            actualQuantity: quantity
        }
    }, [LOCALSTORAGE_LINEITEMINDEX, LOCALSTORAGE_LINEITEM_QUANTITY, LINE_ITEM_QUANTITY_SELECTOR_CLASSNAME], function (result) {
        console.log(result.value)
        base.assertEqual(client, result.value.expectQuantity, result.value.actualQuantity, message)
    })
    //verify the plus and minus function of the quantity selector
    client.execute(function (LOCALSTORAGE_LINEITEMINDEX, LOCALSTORAGE_LINEITEM_QUANTITY, LINE_ITEM_QUANTITY_SELECTOR_CLASSNAME) {
        function sleep(d) {
            for (var t = Date.now(); Date.now() - t <= d;);
        };
        var temp = document.getElementsByClassName(LINE_ITEM_QUANTITY_SELECTOR_CLASSNAME)[localStorage.getItem(LOCALSTORAGE_LINEITEMINDEX)];
        var originQuantity = parseInt(localStorage.getItem(LOCALSTORAGE_LINEITEM_QUANTITY));
        var result = true;
        if (temp.children.length > 1) {
            var tempQuantity = 0;
            var minus = temp.children[0];
            var plus = temp.children[2];
            plus.click();
            sleep(5000);
            //setTimeout('tempQuantity = temp.children[1].value', 5000)
            tempQuantity = temp.children[1].value;
            result = result && ((parseInt(originQuantity) + 1) == parseInt(tempQuantity));
            minus.click();
            //setTimeout('tempQuantity = temp.children[1].value', 5000)
            sleep(5000);
            tempQuantity = temp.children[1].value;
            result = result && (parseInt(originQuantity) == parseInt(tempQuantity));
        }
        return result;
    }, [LOCALSTORAGE_LINEITEMINDEX, LOCALSTORAGE_LINEITEM_QUANTITY, LINE_ITEM_QUANTITY_SELECTOR_CLASSNAME], function (result) {
        console.log(result.value)
        base.assertEqual(client, true, result.value, message)
    })
}

func7 = function (client, message) {
    client.execute(function (LOCALSTORAGE_LINEITEMINDEX, LOCALSTORAGE_LINEITEM_BRANDAUTHORNAME, LINE_ITEM_BRAND_AUTHOR_CLASSNAME, LINE_ITEM_CLASSNAME) {
        return {
            actualBrandAuthor: document.getElementsByClassName(LINE_ITEM_CLASSNAME)[localStorage.getItem(LOCALSTORAGE_LINEITEMINDEX)].getElementsByClassName(LINE_ITEM_BRAND_AUTHOR_CLASSNAME)[1].innerText,
            expectBrandAuthor: localStorage.getItem(LOCALSTORAGE_LINEITEM_BRANDAUTHORNAME)
        }
    }, [LOCALSTORAGE_LINEITEMINDEX, LOCALSTORAGE_LINEITEM_BRANDAUTHORNAME, LINE_ITEM_BRAND_AUTHOR_CLASSNAME, LINE_ITEM_CLASSNAME], function (result) {
        console.log('The item brand or author name is ' + result.value)
        base.assertEqual(client, result.value.expectBrandAuthor, result.value.actualBrandAuthor, message)
    })
}

func6 = function (client, message) {
    client.execute(function (LOCALSTORAGE_LINEITEM_BINDLINGNAME, LOCALSTORAGE_LINEITEMINDEX, LINE_ITEM_BINDING_CLASSNAME) {
        return {
            actualBinding: document.getElementsByClassName(LINE_ITEM_BINDING_CLASSNAME)[localStorage.getItem(LOCALSTORAGE_LINEITEMINDEX)].children[0].innerText.replace(/[^a-zA-Z]/ig, ""),
            expectBinding: localStorage.getItem(LOCALSTORAGE_LINEITEM_BINDLINGNAME)
        }
    }, [LOCALSTORAGE_LINEITEM_BINDLINGNAME, LOCALSTORAGE_LINEITEMINDEX, LINE_ITEM_BINDING_CLASSNAME], function (result) {
        console.log('The item binding name is ' + result.value.actualBinding + ' ' + result.value.expectBinding)
        base.assertEqual(client, result.value.expectBinding.toLowerCase(), result.value.actualBinding.toLowerCase(), message)
    })
}

func5 = function (client, message) {
    client.execute(function (LOCALSTORAGE_LINEITEM_TITLE, LOCALSTORAGE_LINEITEMINDEX, LINE_ITEM_TITLE_CLASSNAME) {
        return {
            actualTitle: document.getElementsByClassName(LINE_ITEM_TITLE_CLASSNAME)[localStorage.getItem(LOCALSTORAGE_LINEITEMINDEX)].innerText,
            expectTitle: localStorage.getItem(LOCALSTORAGE_LINEITEM_TITLE)
        }
    }, [LOCALSTORAGE_LINEITEM_TITLE, LOCALSTORAGE_LINEITEMINDEX, LINE_ITEM_TITLE_CLASSNAME], function (result) {
        console.log('The item title is ' + result.value.actualTitle)
        base.assertEqual(client, result.value.expectTitle, result.value.actualTitle, message)
    })
}

func4 = function (client, message) {
    client.execute(function (LOCALSTORAGE_LINEITEMINDEX, LINE_ITEM_THUMBNAIL) {
        var thumb = document.getElementsByClassName(LINE_ITEM_THUMBNAIL)[localStorage.getItem(LOCALSTORAGE_LINEITEMINDEX)].getElementsByTagName('img')[0];
        return thumb.width * thumb.height;
    }, [LOCALSTORAGE_LINEITEMINDEX, LINE_ITEM_THUMBNAIL], function (result) {
        console.log('The thumbnail size is ' + result.value)
        base.assertEqual(client, true, result.value > (client.globals.errorImgWidth * client.globals.errorImgHeight), message)
    })
}

func12 = function (client, message, ebookOrNot) {
    var ebookDelivery = client.globals.ebookDeliveryMoment
    client.execute(function (LOCALSTORAGE_LINEITEMINDEX, LOCALSTORAGE_DELIVERYMOMENT, LINE_ITEM_SHIPPING_INFO_CLASSNAME, ebookOrNot, ebookDelivery) {
        var shippingInfo = document.getElementsByClassName(LINE_ITEM_SHIPPING_INFO_CLASSNAME)[localStorage.getItem(LOCALSTORAGE_LINEITEMINDEX)].children[1].innerText;
        //return shippingInfo.length > 0;
        return {
            actureDeliveryInfo: shippingInfo,
            expectDeliveryInfo: ebookOrNot ? ebookDelivery : localStorage.getItem(LOCALSTORAGE_DELIVERYMOMENT)
        };
    }, [LOCALSTORAGE_LINEITEMINDEX, LOCALSTORAGE_DELIVERYMOMENT, LINE_ITEM_SHIPPING_INFO_CLASSNAME, ebookOrNot, ebookDelivery], function (result) {
        console.log(result.value)
        //base.assertEqual(client, true, result.value, message)
        base.assertEqual(client, result.value.expectDeliveryInfo, result.value.actureDeliveryInfo, message)
    })
}

func13 = function (client) {
    client.execute(function (LOCALSTORAGE_SHIPPINGCOST, ORDER_TOTALS_CLASSNAME, ORDER_TOTALS_SHIPPING_CLASSNAME) {
        var shippingCost = document.getElementsByClassName(ORDER_TOTALS_CLASSNAME)[0].getElementsByClassName(ORDER_TOTALS_SHIPPING_CLASSNAME)[0].children[1].innerText;
        if (shippingCost.indexOf('€') != -1) {
            shippingCost = shippingCost.substring(1);
        }
        localStorage.setItem(LOCALSTORAGE_SHIPPINGCOST, shippingCost);
        return shippingCost;
    }, [LOCALSTORAGE_SHIPPINGCOST, ORDER_TOTALS_CLASSNAME, ORDER_TOTALS_SHIPPING_CLASSNAME], function (result) {
        console.log('The order shipping cost is ' + result.value)
    })
}

func14 = function (client) {
    client.execute(function (LOCALSTORAGE_SUBTOTAL, ORDER_TOTALS_CLASSNAME, ORDER_TOTALS_SUBTOTAL_CLASSNAME) {
        var orderSubTotal = document.getElementsByClassName(ORDER_TOTALS_CLASSNAME)[0].getElementsByClassName(ORDER_TOTALS_SUBTOTAL_CLASSNAME)[0].children[1].innerText.substring(1);
        localStorage.setItem(LOCALSTORAGE_SUBTOTAL, orderSubTotal);
        return orderSubTotal;
    }, [LOCALSTORAGE_SUBTOTAL, ORDER_TOTALS_CLASSNAME, ORDER_TOTALS_SUBTOTAL_CLASSNAME], function (result) {
        console.log('The order sub total is ' + result.value)
    })
}

func15 = function (client) {
    var threshold = client.globals.freeShippingOrderSubtotal;
    var defaultCost = client.globals.defaultShippingCost;
    client.execute(function (threshold, defaultCost, LOCALSTORAGE_SUBTOTAL, LOCALSTORAGE_SHIPPINGCOST) {
        var freeShippingTextStatus = true;
        var shippingCostStaus = true;
        if (parseFloat(localStorage.getItem(LOCALSTORAGE_SUBTOTAL)) >= parseFloat(threshold)) {
            freeShippingTextStatus = document.getElementsByClassName('main-cart-free-shipping')[0].innerText.length == 0;
            //how to show the free shipping cost?Gratis or 0
            shippingCostStaus = localStorage.getItem(LOCALSTORAGE_SHIPPINGCOST) == 'Gratis';
        } else {
            freeShippingTextStatus = document.getElementsByClassName('main-cart-free-shipping')[0].innerText.length > 0;
            shippingCostStaus = localStorage.getItem(LOCALSTORAGE_SHIPPINGCOST).trim() == defaultCost.trim();
        }
        return {
            result: parseFloat(localStorage.getItem(LOCALSTORAGE_SUBTOTAL)) >= parseFloat(threshold),
            freeShippingText: freeShippingTextStatus,
            shippingCost: shippingCostStaus
        }
    }, [threshold, defaultCost, LOCALSTORAGE_SUBTOTAL, LOCALSTORAGE_SHIPPINGCOST], function (result) {
        console.log(result.value)
        base.assertEqual(client, true, result.value.freeShippingText, 'The free shipping text show correct.')
        base.assertEqual(client, true, result.value.shippingCost, 'The shipping cost show correct.')
    })
}

func16 = function (client, quantity) {
    client.execute(function (quantity, LINE_ITEM_QUANTITY_SELECTOR_CLASSNAME, LOCALSTORAGE_LINEITEMINDEX) {
        for (var i = 1; i < parseInt(quantity); i++) {
            setTimeout('document.getElementsByClassName("' + LINE_ITEM_QUANTITY_SELECTOR_CLASSNAME + '")[localStorage.getItem("' + LOCALSTORAGE_LINEITEMINDEX + '")].getElementsByClassName("increase-qty")[0].click();', 5000);
        }
        return quantity;
    }, [quantity, LINE_ITEM_QUANTITY_SELECTOR_CLASSNAME, LOCALSTORAGE_LINEITEMINDEX], function (result) {
        console.log(result.value)
        console.log('Set item quantity success')
        base.wait(client, client.globals.middleWaitTime)
    })
}

func17 = function (client, shippingOption) {
    client.execute(function (shippingOption, SHIPPING_METHOD_CLASSNAME) {
        var methods = Array.prototype.slice.call(document.getElementsByClassName(SHIPPING_METHOD_CLASSNAME)).map(function (item) {
            return item.getElementsByTagName('label')[0].innerText;
        });
        for (var index in methods) {
            if (methods[index] === shippingOption) {
                document.getElementsByClassName(SHIPPING_METHOD_CLASSNAME)[index].getElementsByTagName('label')[0].click();
                break;
            }
        }
    }, [shippingOption, SHIPPING_METHOD_CLASSNAME], function () {
        console.log('The shipping method choose success.')
        base.wait(client, client.globals.miniWaitTime)
    })

}

func18 = function (client) {
    var costs = client.globals.countryShippingCost;
    client.execute(function (LOCALSTORAGE_SHIPPINGCOST, PESONAL_INFO_COUNTRY, costs) {
        var country = document.getElementsByClassName(PESONAL_INFO_COUNTRY)[0][document.getElementsByClassName(PESONAL_INFO_COUNTRY)[0].selectedIndex].text;
        var countryCode = document.getElementsByClassName(PESONAL_INFO_COUNTRY)[0][document.getElementsByClassName(PESONAL_INFO_COUNTRY)[0].selectedIndex].value;
        localStorage.setItem(LOCALSTORAGE_SHIPPINGCOST, costs[countryCode]);
        return {
            countryName: country,
            shippingCost: costs[countryCode]
        };
    }, [LOCALSTORAGE_SHIPPINGCOST, PESONAL_INFO_COUNTRY, costs], function (result) {
        console.log(result.value)
        console.log('Customer choose ' + result.value.countryName + ' and the shipping cost is ' + result.value.shippingCost + ' when order subtotal is less than €40');
    })
}

func19 = function (client) {
    base.wait(client, client.globals.miniWaitTime)
    client.execute(function (LOCALSTORAGE_SHIPPINGCOST, ORDER_TOTALS_CLASSNAME, ORDER_TOTALS_SHIPPING_CLASSNAME) {
        var shippingCost = document.getElementsByClassName(ORDER_TOTALS_CLASSNAME)[0].getElementsByClassName(ORDER_TOTALS_SHIPPING_CLASSNAME)[0].children[1].innerText;
        if (shippingCost.indexOf('€') != -1) {
            shippingCost = shippingCost.substring(1);
            return shippingCost.trim() === localStorage.getItem(LOCALSTORAGE_SHIPPINGCOST).trim();
        } else {
            return true;
        }
    }, [LOCALSTORAGE_SHIPPINGCOST, ORDER_TOTALS_CLASSNAME, ORDER_TOTALS_SHIPPING_CLASSNAME], function (result) {
        console.log(result.value)
        base.assertEqual(client, true, result.value, 'The shipping cost show correct according to the country chosen.')
    })
}

func20 = function (client, expect, message) {
    //base.waitElement(client, properties.BY_CLASS, NEWSLETTER_SUBSCRIPTION_CLASSNAME, 'the newsletter checkbox show success.')
    client.execute(function (NEWSLETTER_SUBSCRIPTION_CLASSNAME) {
        return document.getElementsByClassName(NEWSLETTER_SUBSCRIPTION_CLASSNAME)[0].checked;
    }, [NEWSLETTER_SUBSCRIPTION_CLASSNAME], function (result) {
        base.assertEqual(client, expect, result.value, message)
    })
}

func21 = function (client) {
    base.waitElement(client, properties.BY_CLASS, NEXT_STEP_BUTTON_CLASSNAME, 'the next step button show success.')
    client.execute(function (LOGIN_POPUP_CLOSE_BUTTON_CLASSNAME, NEXT_STEP_BUTTON_CLASSNAME) {
        if (0 == document.getElementsByClassName(LOGIN_POPUP_CLOSE_BUTTON_CLASSNAME).length) {
            document.getElementsByClassName(NEXT_STEP_BUTTON_CLASSNAME)[0].getElementsByTagName('a')[0].click();
        }
    }, [LOGIN_POPUP_CLOSE_BUTTON_CLASSNAME, NEXT_STEP_BUTTON_CLASSNAME],function(){
        console.log('click next step button success.')
    })
    base.wait(client, client.globals.middleWaitTime)
    return client
}

func22 = function (client) {
    base.waitElement(client, properties.BY_CLASS, PREVIOUS_STEP_BUTTON_CLASSNAME, 'the previous step button show success.')
    client.execute(function (PREVIOUS_STEP_BUTTON_CLASSNAME) {
        document.getElementsByClassName(PREVIOUS_STEP_BUTTON_CLASSNAME)[0].getElementsByTagName('a')[0].click();
    }, [PREVIOUS_STEP_BUTTON_CLASSNAME])
    base.wait(client, client.globals.middleWaitTime)
    return client
}

func23 = function (client) {
    client.pause(globals.middleWaitTime)
    client.execute(function (LINE_ITEM_TITLE_CLASSNAME, LINE_ITEM_QUANTITY_SELECTOR_CLASSNAME, LINE_ITEM_PRICE_CLASSNAME, ORDER_TOTALS_CLASSNAME, ORDER_TOTALS_SHIPPING_CLASSNAME, ORDER_TOTALS_TOTAL, LINE_ITEM_BINDING_SELECTOR) {
        var titles = Array.prototype.slice.call(document.getElementsByClassName(LINE_ITEM_TITLE_CLASSNAME)).map(function (item) {
            return item.innerText;
        });
        var quantities = Array.prototype.slice.call(document.getElementsByClassName(LINE_ITEM_QUANTITY_SELECTOR_CLASSNAME)).map(function (item) {
            return item.innerText;
        });
        var prices = Array.prototype.slice.call(document.getElementsByClassName(LINE_ITEM_PRICE_CLASSNAME)).map(function (item) {
            return item.innerText;
        });
        var bindings = Array.prototype.slice.call(document.querySelectorAll(LINE_ITEM_BINDING_SELECTOR)).map(function (item) {
            return item.innerText;
        });
        var shippingcost = document.getElementsByClassName(ORDER_TOTALS_CLASSNAME)[0].getElementsByClassName(ORDER_TOTALS_SHIPPING_CLASSNAME)[0].children[1].innerText;
        var orderTotal = document.querySelectorAll(ORDER_TOTALS_TOTAL)[0].innerText;
        return {
            'titles': titles,
            'quantities': quantities,
            'prices': prices,
            'bindings': bindings,
            'shippingCost': shippingcost,
            'total': orderTotal
        };
    }, [LINE_ITEM_TITLE_CLASSNAME, LINE_ITEM_QUANTITY_SELECTOR_CLASSNAME, LINE_ITEM_PRICE_CLASSNAME, ORDER_TOTALS_CLASSNAME, ORDER_TOTALS_SHIPPING_CLASSNAME, ORDER_TOTALS_TOTAL, LINE_ITEM_BINDING_SELECTOR], function (result) {
        console.log(result.value)
        console.log(result.value.titles)
        console.log(result.value.quantities)
        console.log(result.value.prices)
        console.log(result.value.bindings)
        console.log(result.value.shippingCost)
        console.log(result.value.total)
        cartInfo.clear()
        console.log('the cartInfo is clear:' + cartInfo)
        cartInfo.set('titles', result.value.titles)
        cartInfo.set('quantities', result.value.quantities)
        cartInfo.set('prices', result.value.prices)
        cartInfo.set('bindings', result.value.bindings)
        cartInfo.set('shippingCost', result.value.shippingCost)
        cartInfo.set('total', result.value.total)
        console.log(cartInfo)
    })
    return client
}

func24 = function (client, info) {
    client.perform((done) => {
        console.log(info)
        orderInfo.clear()
        var temp = info.date.split('-')
        var newDate = temp[1] + '/' + temp[0] + '/' + temp[2]
        orderInfo.set('orderDate', newDate)
        orderInfo.set('orderNum', info.number)
        orderInfo.set('orderTotal', info.total)
        console.log(orderInfo)
        done()
    })
}

func25 = function (client, loginOrNot) {
    let titles;
    let result = false;
    client
        .elements('css selector', '.checkout-section div >h2', (result) => {
            titles = result.value;
        })
        .perform((done) => {
            titles.forEach((element) => {
                client.elementIdText(element.ELEMENT, (text) => {
                    if (text.value === globals.checkoutTitleStep2) {
                        result = true
                    }
                });
            })
            client.perform((done) => {
                console.log('The result of have my account title is: ' + result)
                client.assert.equal(result, loginOrNot ? false : true, 'the make account title is show correct.')
                done();
            })
            done();
        })
}

func27 = function (client, testData) {
    client.clearValue(LINE_ITEM_QUANTITY_SELECTOR)
    client.setValue(LINE_ITEM_QUANTITY_SELECTOR, [testData, client.Keys.ENTER])
    client.pause(client.globals.miniWaitTime)
    client.getValue(LINE_ITEM_QUANTITY_SELECTOR, function (result) {
        console.log(result.value)
        client.assert.equal(result.value, '1', 'the validation passed.')
    })
}

func26 = function (client) {
    func27(client, 'abc')
    func27(client, '-1')
    func27(client, '!@#')
}

func28 = function (client) {
    client.pause(globals.middleWaitTime)
    client.waitForElementVisible(CHECKOUT_ERROR_BACK_BUTTON_SELECTOR)
    client.getText(CHECKOUT_ERROR_MESSAGE_SELECTOR, function (result) {
        if (result.value === globals.checkoutErrorMessage) {
            var temp = new Date()
            var newDate = (temp.getMonth() + 1) + '/' + temp.getDate() + '/' + temp.getFullYear()
            orderInfo.set('orderDate', newDate)
            client.getText(CHECKOUT_ERROR_ORDERNUM_SELECTOR, function (num) {
                orderInfo.set('orderNum', num.value)
            })
            orderInfo.set('orderTotal', cartInfo.get('total'))
            console.log(orderInfo)
        }
    })
    //the acce env button will return to the dev env,that's strange.
    //client.click(CHECKOUT_ERROR_BACK_BUTTON_SELECTOR)
    client.url(globals.brunaHomepage)
}

func29 = function (client, keyword) {
    client.waitForElementVisible(CHOOSE_STORE_BUTTON_SELECTOR)
    client.click(CHOOSE_STORE_BUTTON_SELECTOR, function () {
        console.log('click the choose store button success.')
    })
    func35(client, keyword)
    func38(client)
    client.pause(globals.miniWaitTime)
    client.getText(SEARCH_STORE_RESULT_SELECTOR, function (result) {
        console.log(result)
        console.log('1.' + result.value.trim().replace(/[\r\n\s]/g, ""))
        console.log('2.' + storeInfo.trim().replace(/[\r\n\s]/g, ""))
        client.assert.equal(result.value.trim().replace(/[\r\n\s]/g, "").indexOf(storeInfo.trim().replace(/[\r\n\s]/g, "")), 0, 'the store info is correct.')
    })
    client.getText(SEARCH_STORE_RESULT_PHONE_SELECTOR, function (result) {
        console.log('phone:' + result.value.replace(/[\r\n\s]/g, ""))
        storePhone = result.value
    })
    client.waitForElementVisible(FINISH_CHOOSE_STORE_BUTTON_SELECTOR)
    client.click(FINISH_CHOOSE_STORE_BUTTON_SELECTOR, function () {
        console.log('click the finish choose store button success.')
    })
}

func30 = function (client) {
    client.waitForElementVisible(SEARCH_STORE_RESULT_SELECTOR)
    client.getText(SEARCH_STORE_RESULT_SELECTOR, function (result) {
        client.assert.equal(result.value.indexOf(storeInfo), 0, 'the store info in shipping option is correct.')
    })
}

func31 = function (client) {
    client.waitForElementVisible(STORE_PHONE_SELECTOR)
    client.getText(STORE_PHONE_SELECTOR, function (result) {
        client.assert.equal(result.value, storePhone, 'the store phone is correct.')
    })
}

func32 = function (client) {
    client.waitForElementVisible(PAY_IN_STORE_OPTION_SELECTOR)
    client.click(PAY_IN_STORE_OPTION_SELECTOR, function () {
        console.log('choose pay in store option success.')
    })
    client.pause(globals.miniWaitTime)
}

func33 = function (client) {
    let days;
    let result = false;
    client
        .elements('css selector', '.locationlocator-opening-hours >ul >li', (result) => {
            days = result.value;
        })
        .perform((done) => {
            days.forEach((element) => {
                client.elementIdText(element.ELEMENT, (text) => {
                    console.log(text.value)
                    if (text.value.indexOf(storeFilterDay) > -1 && text.value.indexOf(STORE_CLOSED_DAY_INFO) == -1){
                        result = true
                    }
                });
            });
            client.perform((done)=>{
                client.assert.equal(result,true,'the store open day description is correct.')
                done();
            });
            done();
        })
}

func34 = function (client) {
    client.waitForElementVisible(STORE_FILTER_DAY_SELECTOR)
    client.click(STORE_FILTER_DAY_SELECTOR)
    client.getText(STORE_FILTER_DAY_SELECTOR,function(result){
        storeFilterDay = result.value
    })
}

func35 = function(client, keyword){
    client.pause(globals.miniWaitTime)
    client.waitForElementVisible(SEARCH_STORE_TEXT_SELECTOR)
    client.clearValue(SEARCH_STORE_TEXT_SELECTOR)
    client.setValue(SEARCH_STORE_TEXT_SELECTOR, keyword, function () {
        console.log('input the search store keyword success.')
    })
    client.pause(globals.miniWaitTime)
    client.click(SEARCH_STORE_BUTTON_SELECTOR, function () {
        console.log('click the search store button success.')
    })
    client.pause(globals.middleWaitTime)
    client.waitForElementVisible(SEARCH_STORE_RESULT_SELECTOR)
    client.getText(SEARCH_STORE_RESULT_SELECTOR, function (result) {
        storeInfo = result.value
        console.log(storeInfo)
        console.log('storeInfo is : ' + storeInfo)
    })
}

func36 = function(client){
    client.waitForElementVisible(BACK_TO_OVERVIEW_LINK_SELECTOR)
    client.click(BACK_TO_OVERVIEW_LINK_SELECTOR,function(){
        console.log('click the back link success.')
    })
    client.pause(globals.miniWaitTime)
}

func37 = function(client){
    client.waitForElementVisible(RESET_STORE_SEARCH_RESULT_BUTTON_SELECTOR)
    client.click(RESET_STORE_SEARCH_RESULT_BUTTON_SELECTOR,function(){
        console.log('click the reset button success.')
    })
    client.pause(globals.miniWaitTime)
    client.elements('css selector', STORE_SEARCH_RESULT_SELECTOR, function(result) {
        console.log(result.value)
        console.log(result.value.length)
    });
}

func38 = function(client){
    client.pause(globals.miniWaitTime)
    client.click(SEARCH_STORE_RESULT_SELECTOR, function () {
        console.log('choose the first result.')
    })
}

module.exports = {
    waitForCartPage: func1,
    verifyTheShippingInfo: func2,
    clearCart: func3,
    verifyTheItemThumbnail: func4,
    verifyTheItemTitle: func5,
    verifyTheItemBindings: func6,
    verifyTheItemBrandOrAuthor: func7,
    verifyTheItemQuantitySelector: func8,
    verifyTheItemPrice: func9,
    verifyTheDeleteLink: func10,
    verifyShippingInfo: func12,
    itemLocation: func11,
    getShippingCost: func13,
    getOrderSubTotal: func14,
    verifyTheShippingCost: func15,
    setQuantity: func16,
    chooseTheShippingMethod: func17,
    verifyShippingCostByCountry: func18,
    verifyTheShippingCostStep2: func19,
    checkNewsletterSubscriptionStatus: func20,
    clickNextStepButton: func21,
    clickPreviousStepButton: func22,
    getCartInfo: func23,
    setOrderInfo: func24,
    checkTitlesInStep2: func25,
    quantityValidation: func26,
    setOrderInfoError: func28,
    chooseStore: func29,
    verifyTheStoreInfo: func30,
    verifyTheStorePhone: func31,
    choosePayInStoreOption: func32,
    verifyTheOpeningHours: func33,
    chooseOpenDay: func34,
    searchStore: func35,
    clickBackButton: func36,
    resetStoreSearchResult: func37,
    chooseStoreSearchResult: func38,
    cartInfo,
    orderInfo,
    LINE_ITEM_TITLE_CLASSNAME,
    LINE_ITEM_QUANTITY_SELECTOR_CLASSNAME,
    LINE_ITEM_PRICE_CLASSNAME,
}