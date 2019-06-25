const assert = require('assert');
const {
    client
} = require('nightwatch-cucumber');
const {
    Given,
    Then,
    When
} = require('cucumber');

When(/^move mouse to the category text$/, () => {
    return client
        //wait for the menu show
        .waitForElementVisible('body > header > div.navigation-bar > div > div > div > nav > ul > li > ul > li.has-submenu > a','the menu is show.')
        //click the menu
        .moveToElement('body > header > div.navigation-bar > div > div > div > nav > ul > li > ul > li.has-submenu > a',1,1,function(){
            console.log('move on the menu success')
        })
        .pause(client.globals.miniWaitTime)
});

Then(/^the subcategory list show$/, () => {
    return client
        //test if the url is the homepage
        .execute(function(){
            return document.getElementsByClassName('level2')[0].getElementsByTagName('a').length;
        },[],function(result){
            client.assert.equal(true,result.value>0,'the subcategory is show.')
        })
});

Then(/^check subcategory name (.+) and url (.+) with index (\d+)$/, (menu_text,menu_url,menu_index) => {
    var text = menu_text
    var index = menu_index
    var url = menu_url
    return client
        //test if the submenu is exist in the list
        .execute(function(text,url,index){
            return Array.prototype.slice.call(document.getElementsByClassName('level2')[0].getElementsByTagName('a')).map(function(item){return item.text+":"+item.href})[index];
        },[text,url,index],function(result){
            console.log(result.value)
            console.log(text+':'+url)
            client.assert.equal(result.value.indexOf(text+':'+url.replace('domain',client.globals.webAddress))!=-1,true,'the submenu text and url are correct.')
        })
});

When(/^move mouse out of subcategory$/, () => {
    return client
        //move mouse to the logo
        .moveToElement('.header-logo',1,1,function(){
            console.log('move out of subcategory successful.')
        })
        //wait for a second
        .pause(client.globals.miniWaitTime)
});

Then(/^subcategory fold again$/, () => {
    return client
        //check the subcategory style
        .execute(function(){
            return window.getComputedStyle(document.getElementsByClassName('level2')[0],null).getPropertyValue('visibility');
        },[],function(result){
            //console.log(result.value)
            assert.equal('hidden',result.value,'the subcategory is folded.')
        })
});