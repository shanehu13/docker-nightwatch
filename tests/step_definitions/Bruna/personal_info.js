const {
    client
} = require('nightwatch-cucumber');
const {
    Given,
    Then,
    When
} = require('cucumber');
var homepage = client.page.homepage();
const cart = require('./modules/cart');
var login = client.page.login();
var suffix = new Date().getTime()+'';
const personalInfo = {
    gender: 'Sir',
    firstName: 'firstName' + suffix,
    lastName: 'lastName' + suffix,
    company: 'company' + suffix,
    country: 'Nederland',
    postCode: '1000 AB',
    houseNum: suffix.substring(suffix.length - 3),
    addition: 'balabala',
    address: 'baker road' + suffix.substring(suffix.length - 3),
    city: 'Amsterdam',
    email: client.globals.loginEmail,
    phone: '',
    password: client.globals.loginPassword
}

Given(/^click the to shipping button$/, () => {
    homepage.enterCartPage()
    cart.clearCart(client)
    return client
        /****************************************************************************************************** */
        //open the product detail page 
        .url(client.globals.checkoutProductUrl)
        //choose a quantity here may some product can not choose the minimum quantity,so choose the second one.
        .execute(function (quantityType) {
            //choose a random quantity amoung the top 10 options in the quantity dropdown list
            var ranIndex = Math.floor(Math.random() * 10);
            return document.getElementsByClassName('quantity-dropdown')[0][ranIndex].value;
        }, [], function (result) {
            console.log(result.value)
            quantity = result.value
            console.log(quantity)
            //only use setValue can trigger the script in the page
            client.setValue('select[class="quantity-dropdown"]', quantity)
        })
        //wait for a few second
        .pause(client.globals.miniWaitTime)
        //click the add to cart button
        .execute(function () {
            document.getElementsByClassName('addto-cart')[0].getElementsByTagName('a')[0].click();
        })
        //wait for a few second
        .pause(client.globals.middleWaitTime)
        //click the cart icon
        .execute(function () {
            document.getElementsByClassName('minicart-status')[0].getElementsByTagName('a')[0].click();
        })
        //wait for the cart page show
        .waitForElementVisible('.orderStep', 'the cart page is show')
        .pause(client.globals.middleWaitTime)
        .pause(client.globals.middleWaitTime)
        //choose a shipping option with price
        .execute(function () {
            var prices = Array.prototype.slice.call(document.getElementsByClassName('shipping-method')).map(function (item) {
                return item.getElementsByClassName('price')[0].innerText
            });
            var choosenIndex = 0;
            for (var index in prices) {
                if (prices[index].charAt(0) == '€') {
                    choosenIndex = index;
                    break;
                }
            }
            document.getElementsByClassName('shipping-method')[choosenIndex].getElementsByTagName('label')[0].click();
        })
        /****************************************************************************************************** */
        //click the next button
        .pause(client.globals.middleWaitTime)
        .execute(function () {
            document.getElementsByClassName('multi-step-next')[0].getElementsByTagName('a')[0].click();
        })
});

Then(/^check the newsletter subscription status without login$/, () => {
    login.closePopupDialogue()
    cart.clickNextStepButton(client)
    cart.checkNewsletterSubscriptionStatus(client, true, 'checked when not login.')
    cart.checkTitlesInStep2(client, false)
    return client
});

When(/^return the checkout flow step 1 and click the next button$/, () => {
    cart.clickPreviousStepButton(client)
    return client
});

Then(/^the login dialogue pop up$/, () => {
    cart.clickNextStepButton(client)
    login.waitForPopupDialogue()
    return client
});

When(/^login the account to continue$/, () => {
    login.accountLogin(client.globals.loginEmail, client.globals.loginPassword)
    return client
});

Then(/^navigate to the checkout step 2$/, () => {
    //wait for the step 2 show
    client.waitForElementVisible('.form-element--shippingdiffersfrombilling', 'the check out step 2 show.')
    cart.checkNewsletterSubscriptionStatus(client, false, 'unchecked when login.')
    cart.checkTitlesInStep2(client, true)
    return client
});

When(/^click the back to shopping basket button$/, () => {
    return client
        //click the previous button
        .execute(function () {
            document.getElementsByClassName('multi-step-previous')[0].getElementsByTagName('a')[0].click();
        })
});

Then(/^navigate to the checkout step 1$/, () => {
    return client
        //wait for step 1 show
        .waitForElementVisible('.my-products', 'the check out step 1 show.')
});

Then(/^went to the step 2 to input the personal info$/, () => {
    client
        //click the next button
        .execute(function () {
            document.getElementsByClassName('multi-step-next')[0].getElementsByTagName('a')[0].click();
        })
        //wait for the step 2 show
        .waitForElementVisible('.form-element--shippingdiffersfrombilling', 'the check out step 2 show.')
        //click the add address link
        .execute(function () {
            document.getElementsByClassName('address-list')[0].getElementsByTagName('a')[0].click();
        })
        .pause(client.globals.miniWaitTime)
        //input the personal info



        //select gender
        .execute(function (personalInfo) {
            if (personalInfo.gender == document.getElementsByClassName('radio-group')[0].innerText) {
                document.getElementsByClassName('radio-group')[0].click();
            } else {
                document.getElementsByClassName('radio-group')[1].click();
            }
        }, [personalInfo])
        .pause(client.globals.miniWaitTime)
        //input the first name
        .setValue('#firstName', personalInfo.firstName)
        .pause(client.globals.miniWaitTime)
        //input middle name
        //.setValue('#insertion', personalInfo.middleName)
        //.pause(client.globals.miniWaitTime)
        //input the last name
        .setValue('#lastName', personalInfo.lastName)
        .pause(client.globals.miniWaitTime)
        //input company
        .setValue('#company', personalInfo.company)
        .pause(client.globals.miniWaitTime)
        //choose country
        .execute(function (personalInfo) {
            var options = document.getElementsByClassName('countryCode')[0];
            for (var index in options) {
                if (personalInfo.country == options[index].innerText) {
                    options[index].selected = true;
                }
            }
        }, [personalInfo])
        .pause(client.globals.miniWaitTime)
    //the shipping cost should be changed correctly after choosing the country
    cart.verifyShippingCostByCountry(client)
    cart.verifyTheShippingCostStep2(client)
    client
        //input zip code
        .setValue('#zipPostalCode', personalInfo.postCode)
        .pause(client.globals.miniWaitTime)
        //input house number
        .setValue('#houseNumber', personalInfo.houseNum)
        .pause(client.globals.miniWaitTime)
        //input addition
        .setValue('#addition', personalInfo.addition)
        .pause(client.globals.miniWaitTime)
        //input address
        .clearValue('#address1')
        .setValue('#address1', personalInfo.address)
        .pause(client.globals.miniWaitTime)
        //input city
        .clearValue('#city')
        .setValue('#city', personalInfo.city)
        .pause(client.globals.miniWaitTime)
        //input email
        .clearValue('#email')
        .setValue('#email', personalInfo.email)
        .pause(client.globals.miniWaitTime)
        //input phone number
        .setValue('#eveningPhoneNumber', personalInfo.phone)
        .pause(client.globals.miniWaitTime)
        //click the add address link
        .execute(function () {
            document.getElementsByClassName('add-address')[0].click();
        })
        .pause(client.globals.miniWaitTime)
    return client
});

Then(/^click the next button to check the personal info$/, () => {
    return client
        //click the next button
        .execute(function () {
            document.getElementsByClassName('multi-step-next')[0].getElementsByTagName('a')[0].click();
        })
        .pause(client.globals.middleWaitTime)
        .waitForElementVisible('.shipping-methods-summary', 'the check out step 3 is already show.')
        //verify the personl info
        .execute(function () {
            return {
                firstName: document.getElementsByClassName('firstName')[0].innerText.trim(),
                lastName: document.getElementsByClassName('lastName')[0].innerText.trim(),
                address: document.getElementsByClassName('address1')[0].innerText.trim(),
                houseNum: document.getElementsByClassName('houseNumber')[0].innerText.trim(),
                addition: document.getElementsByClassName('addition')[0].innerText.trim(),
                zipCode: document.getElementsByClassName('zipPostalCode')[0].innerText.trim(),
                city: document.getElementsByClassName('city')[0].innerText.trim(),
                country: document.getElementsByClassName('country')[0].innerText.trim(),
            }
        }, [], function (result) {
            client.assert.equal(result.value.firstName, personalInfo.firstName, 'Personal info the first name is correct.')
            client.assert.equal(result.value.lastName, personalInfo.lastName, 'Personal info the last name is correct.')
            client.assert.equal(result.value.address, personalInfo.address, 'Personal info the address is correct.')
            client.assert.equal(result.value.houseNum, personalInfo.houseNum, 'Personal info the house number is correct.')
            client.assert.equal(result.value.addition, personalInfo.addition, 'Personal info the addition is correct.')
            client.assert.equal(result.value.zipCode, personalInfo.postCode, 'Personal info the zip code is correct.')
            client.assert.equal(result.value.city, personalInfo.city, 'Personal info the city is correct.')
            client.assert.equal(result.value.country, personalInfo.country, 'Personal info the country is correct.')
        })
});