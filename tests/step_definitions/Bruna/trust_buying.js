const assert = require('assert');
const {
    client
} = require('nightwatch-cucumber');
const {
    Given,
    Then,
    When
} = require('cucumber');

Then(/^click the trust buying icon$/, () => {
    return client
        .url(client.globals.brunaHomepage)
        //wait fot the trust biuying icon show
        .waitForElementPresent('.footer-trustpilot','the trust buying icon is shown.')
        //click the trust biuying icon
		.frame(0)
		.moveToElement('#profile-link', 0, 0)
		.pause(client.globals.miniWaitTime)
        .click('#profile-link')
        .frameParent()
		.pause(client.globals.miniWaitTime)
});

Then(/^redirect to the trust buying website$/, () => {
    return client
        //check the url
		.pause(client.globals.miniWaitTime)
		.window_handles(function(result) {//switch the tabs
				//console.log(result.length);
				var handle = result.value[1];
				client.switchWindow(result.value[1]);
				client.assert.urlContains(client.globals.trustBuyingSite);
				client.pause(client.globals.miniWaitTime)
                client.closeWindow();
                client.switchWindow(result.value[0]);
		})
});