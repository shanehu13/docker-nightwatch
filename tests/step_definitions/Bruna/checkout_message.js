const assert = require('assert');
const {
    client
} = require('nightwatch-cucumber');
const {
    Given,
    Then,
    When
} = require('cucumber');
const cart = require('./modules/cart');

var orderTotalAmount;
var orderNo;
var orderDate;
var normalOrNot = true;

Given(/^verify the payment page$/, () => {
    client.pause(client.globals.middleWaitTime)
    client.execute(function () {
        return document.getElementById('btn_BackToMerchantHome');
    },[],function(result){
        if(result.value != null){
            normalOrNot =false
            cart.setOrderInfoError(client)
        }
    })
    return client
})

Given(/^choose a payment gateway$/, () => {
    var brands = client.globals.creditCardBrand
    if (normalOrNot) {
        client
            //wait for the payment page show
            .waitForElementVisible('#payment-zone', 'the payment page show correctly')
            .pause(client.globals.middleWaitTime)
            //save the order info
            .execute(function () {
                return {
                    totalCharge: document.getElementsByClassName('ncoltable1')[0].getElementsByTagName('tr')[1].innerText.replace(/[^0-9|\.]/ig, ""),
                    orderNum: document.getElementsByClassName('ncoltable1')[0].getElementsByTagName('tr')[0].getElementsByClassName('ncoltxtr')[0].innerText
                }
            }, [], function (result) {
                console.log(result.value)
                orderTotalAmount = result.value.totalCharge
                orderNo = result.value.orderNum
            })
            //choose a gateway
            .execute(function (brands) {
                //choose the master card to do the test
                var brandIndex = 2;
                return brands[brandIndex];
            }, [brands], function (result) {
                client.click('input[name="' + result.value + '"]')
            })
            //save the order date
            .execute(function () {
                var date = new Date();
                return date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
            }, [], function (result) {
                console.log(result.value)
                orderDate = result.value
                console.log(orderDate)
            })
    }
    return client
});

When(/^input payment info and click the pay button$/, () => {
    if (normalOrNot) {
        client
            //wait for the payment card info page show
            .waitForElementVisible('#Ecom_Payment_Card_Number', 'the payment info page show correctly.')
            //input the card info
            .setValue('#Ecom_Payment_Card_Number', client.globals.mastercardNum)
            .setValue('#Ecom_Payment_Card_ExpDate_Month', client.globals.expireMonth)
            .setValue('#Ecom_Payment_Card_ExpDate_Year', client.globals.expireYear)
            .execute(function () {
                var notMisterCash = document.getElementById('Ecom_Payment_Card_Verification') != null;
                if (notMisterCash) {
                    document.getElementById('Ecom_Payment_Card_Verification').value = '123';
                    document.getElementById('submit3').click();
                } else {
                    document.getElementById('btn_sendCardData').click();
                }
            })
    }
    return client
});

Then(/^show the check out success message$/, () => {
    if (normalOrNot) {
        client
            //wait for the check out message show
            .waitForElementVisible('.checkout-feedback-banner-content', 'the checkout message show')
            .pause(client.globals.middleWaitTime)
            //verify the checkout message info
            .execute(function () {
                return {
                    title: document.getElementsByClassName('checkout-feedback-banner-quote')[0].innerText.replace(/[\r\n]/g, ""),
                    description: document.getElementsByClassName('checkout-feedback-banner-content')[0].getElementsByTagName('p')[0].innerText.replace(/[\r\n]/g, "")
                }
            }, [], function (result) {
                client.assert.equal(result.value.title, client.globals.checkoutMessageTitle, 'the check out message title is correct.')
                client.assert.equal(result.value.description, client.globals.checkoutMessageDescription.replace('<orderNum>', orderNo), 'the check out message contains the right order number.')
            })
    }
    return client
});

Then(/^the order confirmation show correctly$/, () => {
    if (normalOrNot) {
        client
            //wait for the check out message show
            .execute(function () {
                return {
                    date: document.getElementsByClassName('orderdate-wrapper')[0].children[1].innerText,
                    number: document.getElementsByClassName('ordernumber-wrapper')[0].children[1].innerText,
                    total: document.getElementsByClassName('orderprice')[0].children[1].innerText.substring(1)
                }
            }, [], function (result) {
                client.assert.equal(result.value.date, orderDate, 'the order date is correct.')
                client.assert.equal(result.value.number, orderNo, 'the order number is correct.')
                client.assert.equal(result.value.total.replace(/\./g, '').replace(/\,/g, '.').trim(), orderTotalAmount, 'the order total charge is correct.')
                cart.setOrderInfo(client,result.value)
                console.log(cart.orderInfo)
            })
    }
    return client
});