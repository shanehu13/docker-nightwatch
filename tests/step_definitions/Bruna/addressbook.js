const {
    client
} = require('nightwatch-cucumber');
const {
    Given,
    Then
} = require('cucumber');
var homepage = client.page.homepage();
var account = client.page.account();
const newAddress = {
    'gender': 'M',
    'firstName': 'testfirstname',
    'lastName': 'testlastname',
    'company': 'testcompany',
    'country': 'België',
    'postcode': '1234 AB',
    'houseNum': '123',
    'addition': 'ABC',
    'address': 'testaddress',
    'city': 'testcity'
};
const editAddress = {
    'gender': 'F',
    'firstName': 'editfirstname',
    'lastName': 'editlastname',
    'company': 'editcompany',
    'country': 'België',
    'postcode': '4321 AB',
    'houseNum': '321',
    'addition': 'CBA',
    'address': 'editaddress',
    'city': 'editcity'
};

Given(/^add address info$/, () => {
    homepage.enterMyAccount()
    account.showAddressbook()
    account.clickAddButton()
    account.updateAddressBook(newAddress)
    account.checkAddressInfo(client, newAddress, 'add')
    return client
});

Then(/^edit address info$/, () => {
    account.updateAddressBook(editAddress)
    account.checkAddressInfo(client, editAddress, 'edit')
    return client
});

Then(/^delete address info$/, () => {
    account.checkAddressInfo(client, editAddress, 'delete')
    account.checkAddressInfo(client, editAddress, 'deleteverify')
    return client
});