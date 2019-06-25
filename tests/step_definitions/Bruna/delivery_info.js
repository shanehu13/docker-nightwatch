const assert = require('assert');
const {
    client
} = require('nightwatch-cucumber');
const {
    Given,
    Then,
    When
} = require('cucumber');

When(/^enter the pdp page to check the delivery info$/, () => {
    return client
        //open the a pdp page
        .url(client.globals.productCTAUrl)
        //wait fot the delivery or shipping list show
        .waitForElementVisible('.usp-linklist', 'the delivery or shipping list is shown.')
});

Then(/^the delivery info is correct$/, () => {
    return client
        //check the list length
        .execute(function(){
            var listText = Array.prototype.slice.call(document.getElementsByClassName('usp-linklist')[0].getElementsByTagName('a')).map(function(item){return item.innerText});
            var result = true;
            for(index in listText){
                result = result && ( listText[index].length > 0 );
            }
            return result;
        },[],function(result){
            client.assert.equal(result.value, true, 'the delivery info or shipping info is not empty.')
        })
});