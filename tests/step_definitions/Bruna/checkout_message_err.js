const assert = require('assert');
const {
    client
} = require('nightwatch-cucumber');
const {
    Given
} = require('cucumber');
const cart = require('./modules/cart');

Given(/^save the order info when errror occur$/, () => {
    cart.setOrderInfoError(client)
    return client
});