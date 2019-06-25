const assert = require('assert');
const {
    client
} = require('nightwatch-cucumber');
const {
    Given,
    Then,
    When
} = require('cucumber');

Given(/^open the bruna homepage$/, () => {
    console.log(client.globals.dotpath)
    //console.log(process.env.environment)
    return client
        //open the home page
        .resizeWindow(1360,768)
        .url(client.globals.homepage)
        .url(client.globals.brunaHomepage)
});