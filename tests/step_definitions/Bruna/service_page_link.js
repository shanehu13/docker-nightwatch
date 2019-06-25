const assert = require('assert');
const {
    client
} = require('nightwatch-cucumber');
const {
    Given,
    Then,
    When
} = require('cucumber');

Then(/^verify the header (.+) is not clickable$/, (link_header) => {
    return client
        .execute(function(data){
            return Array.prototype.slice.call(document.getElementsByClassName('footer-title')).map(function(item){return item.nodeName+'***'+item.innerText})
        },[],function(result){
            for(var i = 0;i<result.value.length;i++){
                if(result.value[i].indexOf(`${link_header}`)!=-1){
                    client.assert.equal(result.value[i].split('***')[0],'DIV','the service page link header is not clickable.')
                }
            }
        })
});

Then(/^check the link text of (.+) with index (\d+)$/, (link_text,index) => {
    return client
        .execute(function(){
            //return all the link text in the services page list
            return document.getElementsByClassName('grid-margin-x')[0].innerText;
        },[],function(result){
            //verify if the service page link text is contained
            console.log(result.value)
            console.log(`${link_text}`)
            client.assert.equal(result.value.indexOf(`${link_text}`)!=-1,true,'the service page link text is correct.')
        })
});

Then(/^check the link url (.+) of (.+) with index (\d+)$/, (link_url,link_text,index) => {
    return client
        .execute(function(data){
            return Array.prototype.slice.call(document.getElementsByClassName('grid-margin-x')[0].getElementsByTagName('a')).map(
                function(item){
                    return item.innerText+item.href
                }
            )
        },[],function(result){
            //verify the service page link url
            client.assert.equal(result.value[`${index}`],`${link_text}`+`${link_url}`,true,'the service page link url is correct.')
        })
});