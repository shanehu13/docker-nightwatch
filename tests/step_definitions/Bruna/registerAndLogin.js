const assert = require('assert');
const {
    client
} = require('nightwatch-cucumber');
const {
    Given,
    Then,
    When
} = require('cucumber');

//var timpStamp = new Date().getTime() + '';
var gender = client.globals.userInfo['gender'];
var firstName = client.globals.userInfo['firstName'];
var middleName = client.globals.userInfo['middleName'];
var lastName = client.globals.userInfo['lastName'];
var company = client.globals.userInfo['company'];
var country = client.globals.userInfo['country'];
var zipCode = client.globals.userInfo['zipCode'];
var houseNum = client.globals.userInfo['houseNum'];
var address = client.globals.userInfo['address'];
var city = client.globals.userInfo['city'];
var addition = client.globals.userInfo['addition'];

Given(/^open the homepage and click the Mijn Bruna in the header$/, () => {
    return client
        //open the home page
        .url(client.globals.brunaHomepage)
        //click the Mijn Bruna link
        .execute(function () {
            document.getElementById('usermenu-content').getElementsByTagName('a')[0].click();
        })
});

Then(/^the popup dialogue show$/, () => {
    return client
        //wait for the popup dialogue show
        .waitForElementVisible('.register', 'the popup dialogue show')
});

Then(/^check the register dialogue info$/, () => {
    return client
        //check the register dialogue info
        .execute(function () {
            var listText = Array.prototype.slice.call(document.getElementsByClassName('usp-linklist')[0].children).map(function (item) {
                return item.innerText.replace(/[\r\n]/g, "")
            });
            return {
                title: document.getElementsByClassName('register')[0].children[0].innerText,
                description: document.getElementsByClassName('register')[0].children[1].innerText,
                list: listText
            };
        }, [], function (result) {
            client.assert.equal(client.globals.registerTitle.indexOf(result.value.title) > -1, true, 'the register title is correct.')
            client.assert.equal(client.globals.registerDescription.indexOf(result.value.description) > -1, true, 'the register description is correct.')
            client.assert.equal(client.globals.registerList.indexOf(result.value.list.toString()) > -1, true, 'the register list is correct.')
        })
});

When(/^click create account button$/, () => {
    return client
        //click the register button
        .execute(function () {
            document.getElementsByClassName('register')[0].getElementsByTagName('a')[0].click();
        })
});

Then(/^redirect to the register page$/, () => {
    return client
        //check the url of the register page
        .waitForElementVisible('.register-form', 'the register form is show.')
        .assert.urlContains('account/register')
});

When(/^click the register button$/, () => {
    return client
        //click the register button
        .execute(function () {
            document.getElementsByClassName('register-form')[0].getElementsByClassName('register')[0].click();
        })
});

Then(/^all the validation tips show correctly$/, () => {
    return client
        //open the home page
        .execute(function () {
            return Array.prototype.slice.call(document.getElementsByClassName('validation-invalid')).map(function (item) {
                return item.innerText
            }).toString();
        }, [], function (result) {
            client.assert.equal(client.globals.registerValidationTips.indexOf(result.value) > -1, true, 'the register form validation tips show correctly.')
        })
        //refresh the page
        .refresh()
});

When(/^input the register info correctly and click the register button$/, () => {
    return client
        //select gender
        .execute(function (gender) {
            if (gender === 'M')
                document.getElementsByClassName('radio-group')[0].click();
            else
                document.getElementsByClassName('radio-group')[1].click();
            //return document.getElementsByClassName('radio-group')[ran].innerText;
        }, [gender])
        .pause(client.globals.miniWaitTime)
        //input the first name
        .setValue('#firstName', firstName)
        .pause(client.globals.miniWaitTime)
        //input middle name
        //.setValue('#insertion', middleName)
        //.pause(client.globals.miniWaitTime)
        //input the last name
        .setValue('#lastName', lastName)
        .pause(client.globals.miniWaitTime)
        //input company
        .setValue('#company', company)
        .pause(client.globals.miniWaitTime)
        //choose country
        // .execute(function (country) {
        //     //choose a random country
        //     ran = Math.floor(Math.random() * (document.getElementsByClassName('countryCode')[0].length));
        //     document.getElementsByClassName('countryCode')[0][ran].selected = true;
        //     return document.getElementsByClassName('countryCode')[0][ran].innerText;
        // }, [country], function (result) {
        //     country = result.value
        // })
        .setValue('.countryCode', country)
        .pause(client.globals.miniWaitTime)
        //input zip code
        .setValue('#zipPostalCode', zipCode)
        .pause(client.globals.miniWaitTime)
        //input house number
        .setValue('#houseNumber', houseNum)
        .pause(client.globals.miniWaitTime)
        //input addition
        .setValue('#addition', addition)
        .pause(client.globals.miniWaitTime)
        //input address
        .setValue('#address1', address)
        .pause(client.globals.miniWaitTime)
        //input city
        .setValue('#city', city)
        .pause(client.globals.miniWaitTime)
        //input email
        .setValue('#email', client.globals.loginEmail)
        .pause(client.globals.miniWaitTime)
        //input password
        .setValue('#password', client.globals.loginPassword)
        .pause(client.globals.miniWaitTime)
        //confirm password
        .setValue('#passwordConfirm', client.globals.loginPassword)
        .pause(client.globals.miniWaitTime)
        //click the register button
        .execute(function () {
            document.getElementsByClassName('register-form')[0].getElementsByClassName('register')[0].click();
        }, [], function () {
            client.globals.registerUserData = {
                registerEmail: client.globals.loginEmail,
                registerPassword: client.globals.loginPassword,
                registerGender: gender,
                registerFirstName: firstName,
                registerMiddleName: middleName,
                registerLastName: lastName,
                registerCompany: company,
                registerCountry: country,
                registerZipCode: zipCode,
                registerHouseNumber: houseNum,
                registerAddress: address,
                registerCity: city,
                registerAddition: addition
            }
            console.log(client.globals.registerUserData)
        })
        //wait for a few second
        .pause(client.globals.middleWaitTime)
});

Then(/^will redirect to register successful page$/, () => {
    return client
        .pause(client.globals.longWaitTime)
        //verify if redirect to the register successful page
        .url(function (result) {
            this.assert.equal(result.value.toLowerCase().indexOf('register-success') > -1, true, 'the login success url is correct.')
        })
    //.assert.urlContains('register-success')
});

Then(/^click the Mijn Bruna and check the dialogue info$/, () => {
    return client
        //click the Mijn Bruna link
        .execute(function () {
            document.getElementById('usermenu-content').getElementsByTagName('a')[0].click();
        })
        //wait for the popup dialogue show
        .waitForElementVisible('.register', 'the popup dialogue show')
        //check the login info
        .execute(function () {
            return {
                title: document.getElementsByClassName('login-form-login')[0].children[0].innerText,
                description: document.getElementsByClassName('login-form-login')[0].children[1].innerText
            };
        }, [], function (result) {
            client.assert.equal(result.value.title, client.globals.loginTitle, 'the login title is correct.')
            client.assert.equal(client.globals.loginDescription.indexOf(result.value.description) > -1, true, 'the login description is correct.')
        })
});

When(/^input the empty login info and click the login button$/, () => {
    return client
        .pause(client.globals.miniWaitTime)
        //only click the login button
        .execute(function () {
            document.getElementsByClassName('regForm')[0].getElementsByTagName('button')[0].click();
        })
        .pause(client.globals.miniWaitTime)
});

Then(/^the validation tips show$/, () => {
    return client
        //verify the validation tips
        .execute(function () {
            return Array.prototype.slice.call(document.getElementsByClassName('validation-invalid')).map(function (item) {
                return item.innerText
            }).toString();
        }, [], function (result) {
            client.assert.equal(client.globals.loginValidationTips.indexOf(result.value) > -1, true, 'the login form validation tips show correctly.')
        })
});

When(/^input the wrong login info and click the login button$/, () => {
    return client
        .pause(client.globals.miniWaitTime)
        //input the wrong login info
        .setValue('#emailLogin', client.globals.loginFailEmail)
        .pause(client.globals.miniWaitTime)
        .setValue('#password', client.globals.loginFailPassword)
        .pause(client.globals.miniWaitTime)
        //click the login button
        .execute(function () {
            document.getElementsByClassName('regForm')[0].getElementsByTagName('button')[0].click();
        })
});

Then(/^the login failed tips show$/, () => {
    return client
        //wait for the login fail tips show
        .waitForElementVisible('.notifications', 'the login fail tips show.')
        //verify the tips
        .execute(function () {
            return document.getElementsByClassName('notifications')[0].getElementsByClassName('error')[0].innerText.replace(/[\r\n]/g, "");
        }, [], function (result) {
            client.assert.equal(client.globals.loginFailTips.indexOf(result.value) > -1, true, 'the login fail tips show correctly.')
        })
});

When(/^input the correct login info and click the login button$/, () => {
    return client
        .pause(client.globals.miniWaitTime)
        //input the correct login info
        .clearValue('#emailLogin', function () {
            console.log('clear the email text field successful.')
        })
        .setValue('#emailLogin', client.globals.loginEmail)
        .pause(client.globals.miniWaitTime)
        .clearValue('#password', function () {
            console.log('clear the password text field successful.')
        })
        .setValue('#password', client.globals.loginPassword)
        .pause(client.globals.miniWaitTime)
        //click the login button
        .execute(function () {
            document.getElementsByClassName('regForm')[0].getElementsByTagName('button')[0].click();
        })
});

Then(/^login successful$/, () => {
    return client
        .pause(client.globals.longWaitTime)
        .waitForElementVisible('.logout')
        //wait for the account page show
        .url(function (result) {
            console.log(result.value)
            client.assert.equal(client.globals.loginUrl.indexOf(result.value.toLowerCase()) > -1, true, 'the login success url is correct.')
            //logou out
            client.execute(function () {
                    document.getElementsByClassName('logout')[0].click();
            })
            //verify if logout successful
            client.pause(client.globals.middleWaitTime)
            client.assert.urlEquals(client.globals.brunaHomepage)
        })
        
});