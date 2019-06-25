const properties = require('./property');
const globals = require('../../../global');
func1 = function (client, by, location, message) {
    switch (by) {
        case properties.BY_CLASS:
            client.waitForElementVisible('.' + location, message);
            break;
        case properties.BY_ID:
            client.waitForElementVisible('#' + location, message);
            break;
        case properties.BY_CSS_SELECTOR:
            client.waitForElementVisible(location, message);
            break;
    }
};

func2 = function (client, url) {
    client.url(url)
};

func3 = function (client, location, value) {
    client.setValue(location, value)
};

func4 = function (client, time) {
    client.pause(time)
};

func5 = function (client, js, paras, action) {
    client.execute(js, [paras], action)
};

func6 = function (client, expect, actual, message) {
    client.assert.equal(expect, actual, message)
};

func7 = function (client, expect, actual, message) {
    client.assert.equal(actual.indexOf(expect) > -1, true, message)
};

func8 = function (client, by, location, expect, message) {
    switch (by) {
        case properties.BY_CLASS:
            client.getText('.' + location, function (result) {
                this.assert.equal(result.value, expect, message)
            });
            break;
        case properties.BY_ID:
            client.getText('#' + location, function (result) {
                this.assert.equal(result.value, expect, message)
            });
            break;
        case properties.BY_CSS_SELECTOR:
            client.getText(location, function (result) {
                this.assert.equal(result.value, expect, message)
            });
            break;
    }
}

func9 = function (client, sec, selector, value) {
    client.pause(globals.miniWaitTime)
    sec.clearValue(selector)
    sec.setValue(selector, value, function () {
        console.log('input ' + value + ' success.')
    })
}

func10 = function (client, sec, selector, btnText) {
    client.pause(globals.miniWaitTime)
    sec.click(selector, function () {
        console.log('click ' + btnText + 'button success.')
    })
}

func11 = function (sec, selector, actual, message, operate) {
    sec.waitForElementVisible(selector)
    sec.getText(selector, function (result) {
        if (operate)
            sec.assert.equal(actual, result.value, message)
        else
            sec.assert.equal(actual.indexOf(result.value) > -1, true, message)
    })
}

module.exports = {
    waitElement: func1,
    openUrl: func2,
    setListValue: func3,
    wait: func4,
    executeJs: func5,
    assertEqual: func6,
    assertContain: func7,
    getTextAndVerify: func8,
    inputText: func9,
    clickButton: func10,
    verifyText: func11
}