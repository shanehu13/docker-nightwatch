const assert = require('assert');
const {
    client
} = require('nightwatch-cucumber');
const {
    Given,
    Then,
    When
} = require('cucumber');

var leesMeerLinkStatus = true;
var leesMeerLinkStyle = 'block';
var summaryHeightBeforeClickShowMoreLink;

Given(/^the product specification show$/, () => {
    return client
        //open the detail page of product with specification
        .url(client.globals.productWithSpecificationUrl)
        //wait for the product specification show
        .waitForElementVisible('.product-specifications-wrapper', 'the product specification is show.')
        .pause(client.globals.middleWaitTime)
        //verify the specification title and specification text
        .execute(function () {
            return {
                title: document.getElementsByClassName('product-properties-title')[0].innerText,
                description: document.getElementsByClassName('product-specifications')[0].innerText
            }
        }, [], function (result) {
            client.assert.equal(client.globals.productSpecificationTitle.indexOf(result.value.title) > -1, true, 'the product specification title is correct.')
            client.assert.equal(result.value.description.length > 0, true, 'the product specification is not empty.')
        })
});

When(/^click the lees meer link$/, () => {
    var cutOffHeight = client.globals.productLeesMeerCutOff
    return client
        //get the specification height before click the show more link
        .execute(function (leesMeerLinkStatus, leesMeerLinkStyle, cutOffHeight) {
            //check the article height to see if the height is over the cut-off
            var articleHeight = window.getComputedStyle(document.getElementsByClassName('product-specifications-wrapper')[0], null).getPropertyValue('height').replace(/[^0-9|\.]/ig, "");
            leesMeerLinkStyle = window.getComputedStyle(document.getElementsByClassName('product-specifications-wrapper')[0].getElementsByClassName('read-more')[0], null).getPropertyValue('display');
            if (parseFloat(articleHeight) > cutOffHeight) {
                leesMeerLinkStatus = leesMeerLinkStyle != 'none'
            } else {
                leesMeerLinkStatus = leesMeerLinkStyle == 'none'
            }
            return {
                height: articleHeight,
                status: leesMeerLinkStatus
            };
        }, [leesMeerLinkStatus, leesMeerLinkStyle, cutOffHeight], function (result) {
            console.log(result.value)
            summaryHeightBeforeClickShowMoreLink = parseFloat(result.value.height)
            client.assert.equal(result.value.status, true, 'the show more link is show correctly.')
            console.log(summaryHeightBeforeClickShowMoreLink)
        })
        //click the show more link if the link is show on the page
        .execute(function (leesMeerLinkStyle) {
            if (leesMeerLinkStyle != 'none') {
                document.getElementsByClassName('product-specifications-wrapper')[0].getElementsByClassName('read-more')[0].click();
            }
        }, [leesMeerLinkStyle])
});

Then(/^the specification show completely$/, () => {
    return client
        //check if the summary show all by compare the height
        .execute(function () {
            return parseFloat(window.getComputedStyle(document.getElementsByClassName('product-specifications-wrapper')[0], null).getPropertyValue('height').replace(/[^0-9|\.]/ig, ""));
        }, [], function (result) {
            console.log(result.value)
            client.assert.equal(result.value >= summaryHeightBeforeClickShowMoreLink, true, 'the specification show completely.')
        })
});