const {
    client
} = require('nightwatch-cucumber');
const {
    Given,
    Then,
    When
} = require('cucumber');
var account = client.page.account();
var homepage = client.page.homepage();
var personalInfo = {
    gender:client.globals.userInfo['gender'],
    firstName:client.globals.userInfo['firstName'],
    lastName:client.globals.userInfo['lastName'],
    email:client.globals.loginEmail,
    phone:''
}
var updatePersonalInfo = {
    gender:client.globals.userInfo['gender'] === 'M'? 'F':'M',
    firstName:client.globals.userInfo['firstName']+'edit',
    lastName:client.globals.userInfo['lastName']+'edit',
    email:'testedit@test.com',
    phone:'022-123456'
}

Given(/^enter the personal info page in my account$/, () => {
    homepage.enterMyAccount()
    account.showPersonalInfo()
    return client
});

Then(/^personal info show correct$/, () => {
    account.checkThePersonalInfo(personalInfo)
    return client
});

When(/^update the personal info$/, () => {
    account.updateThePersonalInfo(updatePersonalInfo)
    return client
});

Then(/^update the personal info success$/, () => {
    client.refresh()
    account.checkThePersonalInfo(updatePersonalInfo)
    return client
});