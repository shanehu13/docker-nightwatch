const assert = require('assert');
const {
    client
} = require('nightwatch-cucumber');
const {
    Given,
    Then,
    When
} = require('cucumber');

Given(/^enter CLP page$/, () => {
    return client
        //open the home page
        .url(client.globals.brunaHomepage)
        //click the the menu Boeken
        .click('body > header > div.navigation-bar > div > div > div > nav > ul > li > ul > li.has-submenu > a',function(){
            console.log('click the menu successful.')
        })
        //wait for the clp banner show.
        .waitForElementVisible('.category-landing-banner','the CLP page is load successful.')
});