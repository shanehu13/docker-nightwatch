const assert = require('assert');
const {
    client
} = require('nightwatch-cucumber');
const {
    Given,
    Then,
    When
} = require('cucumber');

When(/^click the (.+) with index (\d+)$/, (category_name,category_index) => {
    var name = category_name
    var index = category_index
    return client
        //wait for the menu show
        .waitForElementVisible('.category-submenu','the category is show.')
        //click the category
        .execute(function(name,index){
            Array.prototype.slice.call(document.getElementsByClassName('level0')[1].children).map(function(item){return item.getElementsByTagName('a')[0]})[index].click();
            return Array.prototype.slice.call(document.getElementsByClassName('level0')[1].children).map(function(item){return item.getElementsByTagName('a')[0]})[index].text;
        },[name,index],function(result){
            client.assert.equal(result.value,name,'category name is correct.')
        })
});

Then(/^subcategory name is (.+) with index (\d+) and (\d+)$/, (subcategory_name,category_index,subcategory_index) => {
    var name = subcategory_name
    var index = category_index
    var sindex = subcategory_index
    return client
        //test if the subcategory name is correct.
        .execute(function(name,index,sindex){
            var subcate = Array.prototype.slice.call(document.getElementsByClassName('level0')[1].children).map(function(item){return item.getElementsByTagName('li')})[index][sindex];
            return subcate.getElementsByTagName('a')[0].text;
        },[name,index,sindex],function(result){
            console.log(result.value)
            client.assert.equal(result.value,name,'the subcategory name is correct.')
        })
});

Then(/^the url of (.+) is (.+) with index (\d+) and (\d+)$/, (subcategory_name,subcategory_link_url,category_index,subcategory_index) => {
    var name = subcategory_name
    var index = category_index
    var sindex = subcategory_index
    var url = subcategory_link_url
    return client
        //test if the subcategory link is correct.
        .execute(function(name,index,sindex,url){
            var subcate = Array.prototype.slice.call(document.getElementsByClassName('level0')[1].children).map(function(item){return item.getElementsByTagName('li')})[index][sindex];
            return subcate.getElementsByTagName('a')[0].href;
        },[name,index,sindex,url],function(result){
            console.log(result.value)
            console.log(url)
            client.assert.equal(result.value,url.replace('domain',client.globals.webAddress),'the subcategory url is correct.')
        })
        .pause(client.globals.miniWaitTime)
});