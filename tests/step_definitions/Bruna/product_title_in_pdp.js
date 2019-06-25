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
var brandOrAuthor;

When(/^enter the PDP page$/, () => {
    return client
    //open the homepage
    .url(client.globals.brunaHomepage)
    //click the random product title to enter pdp page
    .execute(function(){
        var len = document.getElementsByClassName('product').length;
        var index = Math.floor(Math.random()*len);
        var result
        document.getElementsByClassName('product')[index].getElementsByClassName('product-title')[0].getElementsByTagName('a')[0].click();
        result = document.getElementsByClassName('product')[index].getElementsByClassName('product-title')[0].innerText;
        if(document.getElementsByClassName('product')[index].getElementsByClassName('product-authors').length==0){
            result = result + '***' + document.getElementsByClassName('product')[index].getElementsByClassName('product-brand')[0].innerText;
        }else{
            result = result + '***' + document.getElementsByClassName('product')[index].getElementsByClassName('product-authors')[0].innerText.replace('\n','');
        }
        return result
    },[],function(result){
        console.log(result.value)
        title = result.value.split('***')[0]
        brandOrAuthor = result.value.split('***')[1]
    })
    //wait for the detail page show
    .waitForElementVisible('.thumbnails','the detail page is show.')
    
});

Then(/^the product title show correctly$/, () => {
    return client
    //verify the if the product title is correct
    .execute(function(){
        return document.getElementsByClassName('product-information')[0].getElementsByClassName('product-title')[0].innerText;
    },[],function(result){
        console.log(result.value)
        client.assert.equal(result.value == title,true,'the product title is correct.')
    })
});

Then(/^the product author or brand show correctly$/, () => {
    return client
    //verify the if the product title is correct
    .execute(function(){
        try{
            return document.getElementsByClassName('product-brands-authors')[0].getElementsByTagName('a')[0].innerText;
        }catch(err){
            return '';
        }
        
    },[],function(result){
        console.log(result.value)
        console.log(brandOrAuthor)
        client.assert.equal(result.value == brandOrAuthor,true,'the product author or brand is correct.')
    })
});