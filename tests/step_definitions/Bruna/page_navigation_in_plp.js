const assert = require('assert');
const {
    client
} = require('nightwatch-cucumber');
const {
    Given,  
    Then,  
    When
} = require('cucumber');
var currentPageNum

Given(/^the page number link is show$/, () => {
    return client
    //open the home page
	.url(client.globals.brunaHomepage)
	//click the Bekijk alles link
	.execute(function(){
		document.getElementsByClassName('link-forward')[0].click();
	})
	//wait for the filter show
	.waitForElementVisible('.filter-sidebar',  'filter bar is show.')
    //wait for the page number
    .waitForElementVisible('.pagination',  'the page navigation number link is show.')
});

When(/^click the page number link$/, () => {
    return client
    //click a random page number
    .execute(function(){
        var totalNum = document.getElementsByClassName('pagination')[0].childElementCount;
        var max = totalNum - 2;
        var min = 1;
        var num = Math.floor(Math.random()*(max-min+1)+min);
        var link = document.getElementsByClassName('pagination')[0].getElementsByTagName('li')[num].getElementsByTagName('a')[0];
        if(parseFloat(link.innerText).toString() == "NaN"){
            num = num -1;
            link = document.getElementsByClassName('pagination')[0].getElementsByTagName('li')[num].getElementsByTagName('a')[0];
        }
        link.click();
        return link.innerText;
    },  [],  function(result){
        console.log(result.value)
        currentPageNum = result.value
    })
});

Then(/^redirect to the correct page$/, () => {
    var pageNum = currentPageNum
    return client
    //verify if the url contains the page number 
    .pause(client.globals.middleWaitTime)
    .execute(function(pageNum){
        if(pageNum == 1){
            return false;
        }else{
            return true;
        }
    },  [pageNum],  function(result){
        if(result.value){
            client.assert.urlContains('page%3d'+currentPageNum)
        }else{
            client.assert.urlEquals(client.globals.firstPageUrl)
        }
    })
});

When(/^click the left arrow$/, () => {
    return client
    //click the left arrow
    .execute(function(){
        document.getElementsByClassName('pagination')[0].getElementsByTagName('li')[0].getElementsByTagName('a')[0].click();
    }) 
});

Then(/^redirect to the previous page$/, () => {
    currentPageNum = currentPageNum - 1 
    console.log('currentPageNum:'+currentPageNum)
    return client
    //verify the page number
    .pause(client.globals.middleWaitTime)
    .execute(function(currentPageNum){
        if(currentPageNum <= 1){
            return false;
        }else{
            return true;
        }
    },  [currentPageNum],  function(result){
        if(result.value){
            client.assert.urlContains('page%3d' + currentPageNum)
        }else{
            currentPageNum = 1;
            client.assert.urlEquals(client.globals.firstPageUrl)
        }
    })
});

When(/^click the right arrow$/, () => {
    return client
    //click the right arrow
    .execute(function(){
        var totalNum = document.getElementsByClassName('pagination')[0].childElementCount;
        var max = totalNum - 1;
        document.getElementsByClassName('pagination')[0].getElementsByTagName('li')[max].getElementsByTagName('a')[0].click();
    })    
});

Then(/^redirect to the next page$/,  () => {
    currentPageNum = currentPageNum + 1
    console.log('currentPageNum:'+currentPageNum)
    return client
    //verify the page number
    .pause(client.globals.middleWaitTime)
    .execute(function(currentPageNum){
        if(currentPageNum == 1){
            return false;
        }else{
            return true;
        }
    },  [currentPageNum],  function(result){
        if(result.value){
            client.assert.urlContains('page%3d' + currentPageNum)
        }else{
            client.assert.urlEquals(client.globals.firstPageUrl)
        }
    })
});