const assert = require('assert');
const {
    client
} = require('nightwatch-cucumber');
const {
    Given,
    Then,
    When
} = require('cucumber');

Then(/^check the social media link url$/, () => {
    return client
        //wait for the social media link show
        .waitForElementVisible('.social-media-list')
        //verify the socail media link url
        .execute(function(){
            return document.getElementsByClassName('social-media-list')[0].getElementsByTagName('a')[0].href+document.getElementsByClassName('social-media-list')[0].getElementsByTagName('a')[1].href
        },[],function(result){
            console.log(result.value)
            console.log(client.globals.twitterUrl)
            console.log(client.globals.facebookUrl)
            assert.equal(result.value.indexOf(client.globals.twitterUrl)!=-1,true,'social meida link twitter url is correct.')
            assert.equal(result.value.indexOf(client.globals.facebookUrl)!=-1,true,'social meida link facebook url is correct.')
        })
});