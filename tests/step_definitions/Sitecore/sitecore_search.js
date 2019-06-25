const assert = require('assert');
const {
    client
} = require('nightwatch-cucumber');
const {
    Given,
    Then,
    When
} = require('cucumber');

Given(/^open the sitecore homepage$/, () => {
    return client
        .maximizeWindow()
        //open the home page
        .url(client.globals.sitecoreHomepage)
});

When(/^login in$/, () => {
    return client
        //wait for the username field show
        .waitForElementVisible('#UserName')
        //input the username
        .setValue('#UserName',client.globals.sitecoreLoginName,function(){
            console.log('Input username successful')
        })
        //input the password
        .setValue('#Password',client.globals.sitecorePassword,function(){
            console.log('Input password successful')
        })
        //click the login button
        .click('input[name="ctl08"]')
});

Then(/^click the content editor$/, () => {
    return client
        //wait for the Content Editor
        .waitForElementVisible('body > div.sc-list > div > section > section > div > div > div.sc-launchpad > div:nth-child(3) > div:nth-child(2) > a:nth-child(1) > span.sc-launchpad-text')
        .click('body > div.sc-list > div > section > section > div > div > div.sc-launchpad > div:nth-child(3) > div:nth-child(2) > a:nth-child(1) > span.sc-launchpad-text',function(){
            console.log('click the Content Editor success')
        })
});

Then(/^input keyword$/, () => {
    return client
        //wait for the search textbox
        .waitForElementVisible('#TreeSearch')
        .setValue('#TreeSearch',[client.globals.searchKeyword,client.Keys.ENTER], function (result) {
            console.log('input key word success')
        })
        .pause(client.globals.miniWaitTime)
});

Then(/^check the component search result$/, () => {
    return client
        .execute(function(data){
            return document.getElementsByClassName('scSearchLink')[0].innerText;
        },[],function(result){
            console.log(result.value)
            client.assert.equal(result.value.toLowerCase().indexOf(client.globals.searchKeyword.toLowerCase())!=-1,true,'Result found!')
        })
});