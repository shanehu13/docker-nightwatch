const assert = require('assert');
const {
    client
} = require('nightwatch-cucumber');
const {
    Given,
    Then,
    When
} = require('cucumber');


Then(/^the product list title is show$/, () => {
    return client
    //click the the menu Boeken
    .click('body > header > div.navigation-bar > div > div > div > nav > ul > li > ul > li.has-submenu > a',function(){
        console.log('click the menu successful.')
    })
    //wait for the clp banner show.
    .waitForElementVisible('.category-landing-banner','the CLP page is load successful.')
    .pause(client.globals.middleWaitTime)
    //wait for product list title
    .execute(function(){
        return document.getElementsByClassName('product-list-heading')[0].getElementsByTagName('h2')[0].innerText;
    },[],function(result){
        client.assert.equal(result.value.length > 0,true,'the product list titlt is show.')
    })
});

Then(/^the product list sub title is show$/, () => {
    return client
    //wait for product list sub title
    .execute(function(){
        return document.getElementsByClassName('product-list-heading')[0].getElementsByClassName('subtitle')[0].innerText;
    },[],function(result){
        client.assert.equal(result.value.length > 0,true,'the product list sub titlt is show.')
    })
});

Then(/^the product title is show$/, () => {
    return client
    //verify for product title
    .execute(function(){
        var result = true;
        var titles = Array.prototype.slice.call(document.querySelectorAll('ul.product-list>li')).map(function(item){return item.getElementsByClassName('product-title')[0].innerText});
        for (temp in titles){
            result = result && ( titles[temp].length > 0 );
        }
        return result;
    },[],function(result){
        client.assert.equal(result.value,true,'the product titlt is show.')
    })
});

Then(/^the product author is show$/, () => {
    return client
    //verify for product author or brand
    .execute(function(){
        var result = true;
        var titles = Array.prototype.slice.call(document.querySelectorAll('ul.product-list>li')).map(function(item){return item.getElementsByClassName('gradient-overlay')[1].innerText});
        for (temp in titles){
            result = result && ( titles[temp].length > 0 );
        }
        return result;
    },[],function(result){
        //client.verify.equal(result.value,true,'the product author/brand is show.')
        console.log('the product title is show ' + (result.value == true ? 'correct.' : 'wrong.'))
    })
});

Then(/^the product price is show$/, () => {
    return client
    //verify for product price
    .execute(function(){
        var result = true;
        var titles = Array.prototype.slice.call(document.querySelectorAll('ul.product-list>li')).map(function(item){return item.getElementsByClassName('price')[0].innerText});
        for (temp in titles){
            result = result && ( titles[temp].length > 0 );
        }
        return result;
    },[],function(result){
        client.assert.equal(result.value,true,'the product price is show.')
    })
});

Then(/^the add to wishlist button is show$/, () => {
    return client
    //verify for product add to wishlist button
    .execute(function(){
        return document.getElementsByClassName('btn-wishlist').length === document.querySelectorAll('ul.product-list>li').length;
    },[],function(result){
        client.assert.equal(result.value,true,'the product add to wishlist button is show.')
    })
});

When(/^click the add to wishlist button$/, () => {
    return client
    //clear the wishlist first
    .execute(function(){
        document.getElementsByClassName('wishlist')[0].click();
    })
    //wait for the wishlist title
    .waitForElementVisible('.account-content')
    //clear the wishlist by click the delete button
    .execute(function(){
        var size = document.getElementsByClassName('delete').length;
        for(i=0;i<size;i++){document.getElementsByClassName('delete')[i].getElementsByTagName('a')[0].click();}
        return document.getElementsByClassName('wishlist--empty')[0].innerText;
    },[],function(result){
        assert.equal(client.globals.wishlistTips,result.value,'the wishlist is empty and tips is show.')
    })
    //return the CLP page
    .click('body > header > div.navigation-bar > div > div > div > nav > ul > li > ul > li.has-submenu > a',function(){
        console.log('click the menu successful.')
    })
    //wait for the clp banner show.
    .waitForElementVisible('.category-landing-banner','the CLP page is load successful.')
    .pause(client.globals.middleWaitTime)
    //add a product into the wishlist by click the add to wishlist button
    .execute(function(){
        document.getElementsByClassName('product-list')[0].getElementsByClassName('btn-wishlist')[0].click();
    })
    //need wait for the icon number show
    .pause(client.globals.middleWaitTime)
});

Then(/^add product into wishlist successful$/, () => {
    //verify the number on the wishlist icon
    return client
    .execute(function(){
        return document.getElementsByClassName('count')[0].innerText+'***'+document.getElementsByClassName('product-list')[0].getElementsByTagName('a')[2].innerText;
    },[],function(result){
        console.log(result.value)
        iconNum = result.value.split('***')[0]
        productName = result.value.split('***')[1]
        client.assert.equal('1',iconNum.replace(/[^0-9]/ig,""),'the wishlist icon number is correct.')
    })
});

When(/^click the Bekijk alles link$/, () => {
    //click the Bekijk alles link
    return client
        .execute(function(){
            document.getElementsByClassName('product-list-heading')[0].getElementsByTagName('a')[0].click();
        })

});

Then(/^redirect to the PLP page$/, () => {
    //wait for the filter show
    return client
    .waitForElementVisible('.filter-sidebar','filter bar is show.')
});

When(/^return the CLP page$/, () => {
    //return PLP page
    return client
    .back()
    .pause(client.globals.middleWaitTime)
});

Then(/^banner title is show$/, () => {
    //verify the banner title
    return client
    .execute(function(){
        var result = true;
        var titles = Array.prototype.slice.call(document.getElementsByClassName('promotion-banner-title')).map(function(item){return item.innerText;});
        for (temp in titles){
            result = result && ( titles[temp].length > 0 );
        }
        return result;
    },[],function(result){
        client.assert.equal(result.value,true,'the banner title is show.')
    })
});

Then(/^banner subtitle is show$/, () => {
    //verify the banner sub title
    return client
    .execute(function(){
        var result = true;
        var titles = Array.prototype.slice.call(document.getElementsByClassName('promotion-banner-subtitle')).map(function(item){return item.innerText;});
        for (temp in titles){
            result = result && ( titles[temp].length > 0 );
        }
        return result;
    },[],function(result){
        client.assert.equal(result.value,true,'the banner subtitle is show.')
    })
});

Then(/^banner description is show$/, () => {
    //verify the banner description
    return client
    .execute(function(){
        var result = true;
        var description = Array.prototype.slice.call(document.getElementsByClassName('promotion-banner-body')).map(function(item){return item.innerText;});
        for (temp in description){
            result = result && ( description[temp].length > 0 );
        }
        return result;
    },[],function(result){
        client.assert.equal(result.value,true,'the banner description is show.')
    })
});

Then(/^banner image is show$/, () => {
    //verify the banner image
    var width = client.globals.errorImgWidth
    var height = client.globals.errorImgHeight
    return client
    .execute(function(width,height){
        var result = true;
        var imageSize = Array.prototype.slice.call(document.getElementsByClassName('promotion-banner-image')).map(function(item){return item.firstElementChild.width+'*'+item.firstElementChild.height;});
        for (temp in imageSize){
            var size = imageSize[temp].split('*');
            result = result && ( parseInt(size[0]) > width ) && ( parseInt(size[1]) > height );
        }
        return result;
    },[width,height],function(result){
        client.assert.equal(result.value,true,'the banner image is show.')
    })
});

When(/^check the CTA link$/, () => {
    //check the CTA link
    var url = client.globals.clpBannerLink
    return client
    .execute(function(url){
        var result = true;
        var CTAUrl = Array.prototype.slice.call(document.getElementsByClassName("promotion-banner-content")).map(function(item){return item.getElementsByTagName('a')[0].href;});
        for (temp in CTAUrl){
            result = result && ( CTAUrl[temp] == url);
        }
        return result;
    },[url],function(result){
        //console.log(result.value)
        client.assert.equal(result.value,true,'the banner CTA link is correct.')
    })
});

Then(/^redirect to the PDP page$/, () => {
    //now the link is not navigate to the PDP page need to be fixed
});

When(/^click the wis alles link$/, () => {
    //click the wis alles link
    return client
    .click('.recently-viewed-clear',function(){
        console.log('click the wis alles link successful.')
    })
    .pause(client.globals.miniWaitTime)
});

Then(/^clear the recent viewed product list$/, () => {
    //check the message
    return client
    .getText('.recently-viewed-products',function(result){
        client.assert.equal(true,result.value.indexOf(client.globals.recentViewedProductTips)!=-1)
    })
});
