const assert = require('assert');
const {
    client
} = require('nightwatch-cucumber');
const {
    Given,
    Then,
    When
} = require('cucumber');
var thumbnailReactID;
var thumbnailIndex;

Given(/^the carousel image thumbnails are display$/, () => {
    return client
    //open the homepage
    .url(client.globals.brunaHomepage)
    //click the fisrt product title to enter pdp page
    .execute(function(){
        document.getElementsByClassName('product-title')[0].getElementsByTagName('a')[0].click();
    })
    //wait for the carousel image thumbnails display
    .waitForElementVisible('.thumbnails','the carousel image thumbnails are display.')
});

When(/^click on the thumbnails$/, () => {
    thumbnailIndex = 0//Math.floor(Math.random()*3)
    return client
    //choose a random thumbnail
    .execute(function(thumbnailIndex){
        var thumb = document.getElementsByClassName('thumbnails')[0].getElementsByTagName('img')[thumbnailIndex];
        thumb.click();
        return thumb.getAttribute('data-reactid');
    },[thumbnailIndex],function(result){
        thumbnailReactID = result.value
        console.log(thumbnailReactID)
    })
});

Then(/^the thumbnails will be surounded by red line$/, () => {
    var tempIndex = thumbnailIndex
    return client
    //wait a few second
    .pause(client.globals.miniWaitTime)
    //check the border style of the thumbnail
    .execute(function(tempIndex){
        return window.getComputedStyle(document.getElementsByClassName('thumbnails')[0].getElementsByTagName('li')[tempIndex],null).getPropertyValue('border-color');
    },[tempIndex],function(result){
        console.log(result.value)
        client.assert.equal(result.value,client.globals.thumbnailBorderColor,'the thumbnail style is correct.')
    })
});

Then(/^the carousel image will show on the right$/, () => {
    var tempIndex = thumbnailIndex
    return client
    //check the reactid of the image
    .waitForElementVisible('.main-media','the carousel image is show.')
    .execute(function(tempIndex){
        var image = document.getElementsByClassName('main-media')[0].getElementsByTagName('img')[tempIndex];
        image.click();
        return image.getAttribute('data-reactid');
    },[tempIndex],function(result){
        console.log(result.value)
        client.assert.equal(result.value,thumbnailReactID,'the image style is correct.')
    })
});