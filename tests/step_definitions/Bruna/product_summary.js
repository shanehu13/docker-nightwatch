const assert = require('assert');
const {
    client
} = require('nightwatch-cucumber');
const {
    Given,
    Then,
    When
} = require('cucumber');

var summaryHeightBeforeClickShowMoreLink;
var leesMeerLinkStatus = false;
var leesMeerLinkStyle = 'block';

When(/^open the PDP page$/, () => {
    return client
        //open the detail page of product with summary
        .url(client.globals.productWithSummaryUrl)
});

Then(/^the product summary show$/, () => {
    return client
        //wait for the summary show
        .waitForElementVisible('.product-summary', 'the product summary is show.')
        .pause(client.globals.middleWaitTime)
        //verify the summary title and summary text
        .execute(function () {
            return document.getElementsByClassName('product-summary')[0].children[0].innerText + '***' + document.getElementsByClassName('product-summary')[0].children[1].innerText;
        }, [], function (result) {
            client.assert.equal(client.globals.productSummaryTitle.indexOf(result.value.split('***')[0]) > -1, true, 'the product summary title is correct.')
            client.assert.equal(result.value.split('***')[1].length > 0, true, 'the product summary is not empty.')
        })
});

When(/^click the show more link$/, () => {
    var cutOffHeight = client.globals.productLeesMeerCutOff
    return client
        //get the summary height before click the show more link
        .execute(function (leesMeerLinkStatus, leesMeerLinkStyle, cutOffHeight) {
            //check the article height to see if the height is over the cut-off
            var articleHeight = window.getComputedStyle(document.getElementsByClassName('product-summary')[0], null).getPropertyValue('height').replace(/[^0-9|\.]/ig, "");
            leesMeerLinkStyle = window.getComputedStyle(document.getElementsByClassName('product-summary')[0].getElementsByClassName('read-more')[0], null).getPropertyValue('display');
            if (parseFloat(articleHeight) > cutOffHeight) {
                leesMeerLinkStatus = leesMeerLinkStyle != 'none'
            } else {
                leesMeerLinkStatus = leesMeerLinkStyle == 'none'
            }
            return articleHeight + '***' + leesMeerLinkStatus;
        }, [leesMeerLinkStatus, leesMeerLinkStyle, cutOffHeight], function (result) {
            console.log(result.value)
            summaryHeightBeforeClickShowMoreLink = parseFloat(result.value.split('***')[0])
            client.assert.equal(result.value.split('***')[1], 'true', 'the show more link is show correctly.')
            console.log(summaryHeightBeforeClickShowMoreLink)
        })
        //click the show more link if the link is show on the page
        .execute(function (leesMeerLinkStyle) {
            if (leesMeerLinkStyle != 'none') {
                document.getElementsByClassName('product-summary')[0].getElementsByClassName('read-more')[0].click();;
            }
        }, [leesMeerLinkStyle])
});

Then(/^the summary show completely$/, () => {
    return client
        //check if the summary show all by compare the height
        .execute(function () {
            return parseFloat(window.getComputedStyle(document.getElementsByClassName('product-summary')[0], null).getPropertyValue('height').replace(/[^0-9|\.]/ig, ""));
        }, [], function (result) {
            console.log(result.value)
            client.assert.equal(result.value >= summaryHeightBeforeClickShowMoreLink, true, 'the summary show completely.')
        })
});