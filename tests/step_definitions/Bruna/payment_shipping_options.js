const assert = require('assert');
const {
    client
} = require('nightwatch-cucumber');
const {
    Given,
    Then,
    When
} = require('cucumber');

Then(/^check the payment and shipping options icon$/, () => {
    return client
        //wait for the payment and shipping options show
        .waitForElementVisible('.customer-reassurance',function(){
            console.log('payment and shipping options show')
        })
        //verify the payment and shipping options not clickable
        .execute(function(){
            var temp = '';
            for(var i;i<document.getElementsByClassName('social-media-list')[0].getElementsByTagName('a').length;i++){
                temp = temp + document.getElementsByClassName('customer-reassurance')[0].getElementsByTagName('a')[i].href
            }
            return temp;
        },[],function(result){
            assert.equal(result.value.length,0,'payment and shipping options icon is not clickable.')
        })
});