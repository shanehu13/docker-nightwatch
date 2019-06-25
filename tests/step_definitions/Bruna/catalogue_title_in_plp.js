const assert = require('assert');
const {
    client
} = require('nightwatch-cucumber');
const {
    Given,
    Then,
    When
} = require('cucumber');
var title;

When(/^click the product in the list$/, () => {
    return client
        //filter the product with brand,choose the first brand in the filter
        .execute(function(){
            if(document.getElementsByClassName('filterItem').length > 0){
                document.getElementsByClassName('filterItem')[0].getElementsByTagName('input')[0].click();
            }
        })
        .pause(client.globals.middleWaitTime)
        //click a random product in the list to enter pdp page
        .execute(function(){
            var num = document.getElementsByClassName('listpage')[0].getElementsByClassName('item').length;
            document.getElementsByClassName('listpage')[0].getElementsByClassName('item')[Math.floor(Math.random()*num)].getElementsByClassName('product-title')[0].getElementsByTagName('a')[0].click();
        })

});

Then(/^enter the pdp page and click the product brand or author link$/, () => {
    return client
        //wait for the pdp page load
        .waitForElementVisible('.image-list','enter the pdp page successful.')
        //click the author or brand link
        .execute(function(){
            var titleLink = document.getElementsByClassName('product-brands-authors')[0].getElementsByTagName('a')[0];
            titleLink.click();
            return titleLink.innerText;
        },[],function(result){
            title = result.value
        })
});

Then(/^return the PLP page and the catalogue title show correctly$/, () => {
    return client
        //wait for the PLP filter show
        .waitForElementVisible('.filter-sidebar','the filter bar is show.')
        //verify the catalogue title
        .execute(function(){
            return document.getElementsByClassName('medium-auto')[0].innerText.trim();
        },[],function(result){
            console.log(result.value)
            client.assert.equal(result.value.toLowerCase(),title.toLowerCase(),'the catalogue title is show correctly.')
        })
});