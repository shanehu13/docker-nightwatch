const assert = require('assert');
const {
    client
} = require('nightwatch-cucumber');
const {
    Given,
    Then,
    When
} = require('cucumber');

Then(/^check the cart link on the homepage and click$/, () => {
    return client
        .url(client.globals.brunaHomepage)
        //wait fot the cart link show
        .waitForElementVisible('.basket','the cart icon is shown.')
        //click the cart link
        .execute(function(){
            document.getElementsByClassName('basket')[0].click();
        })
});

Then(/^redirect to the cart page$/, () => {
    return client
        //wait for the cart process indicator
        .waitForElementVisible('.orderStep')
        //veryfy the cart title and subtitle,already removed
        // .getText('.full-width-title',function(result){
        //     assert.equal(true,result.value.indexOf(client.globals.cartTtile)!=-1,'the cart title is correct.')
        //     assert.equal(true,result.value.indexOf(client.globals.cartSubtitle)!=-1,'the cart subtitle is correct.')
        // })
        //verify the cart url
        .assert.urlEquals(client.globals.cartLink)
        //click the logo to return homepage
        .url(client.globals.brunaHomepage)
});