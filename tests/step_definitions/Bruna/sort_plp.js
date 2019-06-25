const {
    client
} = require('nightwatch-cucumber');
const {
    Then,
    When
} = require('cucumber');
var plp = client.page.plp();
var homepage = client.page.homepage();

When(/^choose the Prijs oplopend in the sort dropdown list$/, () => {
    homepage.navigate()
    homepage.enterProductListPage()
    plp.chooseASortOption('@byPriceAesn')
    return client
});

Then(/^the product filter result show correct in ascending order$/, () => {
    plp.checkThePriceSortResult(client,client.globals.sortOptions['sortAesc'])
    plp.enterLastPage()
    plp.checkThePriceSortResult(client,client.globals.sortOptions['sortAesc'])
    return client
});

When(/^choose the Prijs aflopend in the sort dropdown list$/, () => {
    plp.enterFirstPage()
    plp.chooseASortOption('@byPriceDesn')
    return client
});

Then(/^the product filter result show correct in descending order$/, () => {
    plp.checkThePriceSortResult(client,client.globals.sortOptions['sortDesc'])
    plp.enterLastPage()
    plp.checkThePriceSortResult(client,client.globals.sortOptions['sortDesc'])
    return client
});
