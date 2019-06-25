const {
    client
} = require('nightwatch-cucumber');
const {
    Then,
    When
} = require('cucumber');
const pdp = require('./modules/pdp');

When(/^open an ebook pdp page$/, () => {
    pdp.openPDPPage(client, client.globals.cartListEbookProductUrl)
    return client
});

Then(/^verify the ebook details$/, () => {
    pdp.getItemTitle(client)
    pdp.getItemBinding(client)
    pdp.getItemPrice(client)
    return client
});

Then(/^verify the ebook delivery moment and add into cart$/, () => {
    pdp.getEbookItemDeliveryMoment(client, 'The delivery moment is correct.')
    return client
});