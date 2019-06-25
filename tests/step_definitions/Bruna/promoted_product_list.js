const assert = require('assert');
const {
    client
} = require('nightwatch-cucumber');
const {
    Given,
    Then,
    When
} = require('cucumber');

When(/^promoted product list is shown$/, () => {
    return client
        //wait for promoted product list show
        .waitForElementVisible('.product-list-variant','the promoted product list is shown.')
});

Then(/^check the promoted product list title$/, () => {
    return client
        //verify the list title
        .getText('.relative',function(result){
            client.assert.equal(true,result.value.indexOf(client.globals.promotedProductListTitle)!=-1,'the list title is correct.')
        })
});

Then(/^check the promoted product list subtitle$/, () => {
    return client
        //verify the list subtitle
        .getText('.relative',function(result){
            client.assert.equal(true,result.value.indexOf(client.globals.promotedProductListSubtitle)!=-1,'the list subtitle is correct.')
        })
});

When(/^click the promoted product list link$/, () => {
    return client
        //click the list link
        .execute(function(){
            document.getElementsByClassName('relative')[0].getElementsByTagName('a')[0].click();
        })
});

Then(/^redirect to the promoted product list page$/, () => {
    return client
        //wait for promotional banner show
        .assert.urlEquals(client.globals.promotedProductListLink,'the promoted product link is correct.')
});