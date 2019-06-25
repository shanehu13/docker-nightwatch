const assert = require('assert');
const {
    client
} = require('nightwatch-cucumber');
const {
    Given,
    Then,
    When
} = require('cucumber');

Then(/^check the copyrights link text$/, () => {
    return client
        //wait for the copyrights text show
        .waitForElementVisible('.medium-shrink')
        //verify the copyrights text
        .getText('.medium-shrink',function(result){
            this.assert.equal(result.value,client.globals.copyrightsText)
        })
});