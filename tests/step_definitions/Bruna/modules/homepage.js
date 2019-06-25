const globals = require('../../../global');
var url = globals.brunaHomepage;
var cartNum = 0;
var wishlistNum = 0;
var enterPlp = {
    enterProductListPage: function () {
        var sec = this.section
        sec.header.waitForElementVisible('@logo', 'The site logo show correct.')
        sec.productList.click('@viewAllLink', function () {
            console.log('click the view all link success.')
        })
        return this
    }
}

var getWishlistNumber = {
    checkTheWishlistIconNumber: function () {
        this.api.pause(globals.middleWaitTime)
        var sec = this.section.header
        sec.waitForElementVisible('@wishlistIconNumber')
        sec.getText('@wishlistIconNumber', function (result) {
            console.log(result.value)
            console.log(wishlistNum)
            sec.assert.equal(parseInt(result.value) - wishlistNum, 1, 'the wishlist icon show correct.')
            //wishlistNum = parseInt(result.value);
        })
        return this
    }
}

var getCartIconNumber = {
    checkCartIconNumber: function () {
        this.api.pause(globals.middleWaitTime)
        var sec = this.section.header
        sec.getText('@cartIconNumber', function (result) {
            sec.assert.equal(parseInt(result.value) - cartNum, 1, 'the cart icon show correct.')
            //cartNum = parseInt(result.value);
        })
        return this
    }
}

var clickWishlistIcon = {
    enterWishlistPage: function () {
        var sec = this.section
        sec.header.waitForElementVisible('@wishlistIcon', 'The wishlist icon in the header show correct.')
        sec.header.click('@wishlistIcon', function () {
            console.log('click the wishlist icon in the header success.')
        })
        return this
    }
}

var clickCartIcon = {
    enterCartPage: function () {
        var sec = this.section
        sec.header.waitForElementVisible('@cartIcon', 'The cart icon in the header show correct.')
        sec.header.click('@cartIcon', function () {
            console.log('click the cart icon in the header success.')
        })
        return this
    }
}

var searchItem = {
    searchItems: function (keyword) {
        this.api.pause(globals.middleWaitTime)
        var sec = this.section.header
        sec.waitForElementVisible('@searchText')
        sec.click('@searchText')
        this.api.pause(globals.miniWaitTime)
        sec.setValue('@searchText', keyword, function () {
            console.log('input keywords ' + keyword + ' successful.')
        })
        this.api.pause(globals.miniWaitTime)
        sec.click('@searchButton', function () {
            console.log('click search button success.')
        })
        return this
    }
}

var enterUseProfile = {
    enterMyAccount: function () {
        var sec = this.section.header
        sec.waitForElementVisible('@myAccount')
        sec.click('@myAccount', function () {
            console.log('click the my account icon success.')
        })
    }
}

var clickMyAccountLogin = {
    clickMyAccountToLogin: function () {
        var sec = this.section.header
        sec.waitForElementVisible('@myAccountLogout')
        sec.click('@myAccountLogout',function(){
            console.log('click the my account to login success.')
        })
    }
}

var clickMyStore = {
    clickMyStoreLink: function () {
        var sec = this.section.header
        sec.click('@myStore',function(){
            console.log('click the my store link success.')
        })
    }
}

var logoutByReq = {
    logoutByRequest: function (client) {
        //client.url(url+'mercury/account/account/logout')
        client.waitForFirstXHR('', 10000, function browserTrigger() {},function assertValues(xhr) {
                client.assert.equal(xhr.status, "success");
                client.assert.equal(xhr.method, "POST");
                //client.assert.equal(xhr.requestData, "200");
                client.assert.equal(xhr.httpResponseCode, "200");
                //client.assert.equal(xhr.responseData, "");
            })
    }
}

module.exports = {
    commands: [
        enterPlp,
        getWishlistNumber,
        getCartIconNumber,
        clickWishlistIcon,
        clickCartIcon,
        searchItem,
        enterUseProfile,
        clickMyAccountLogin,
        clickMyStore,
        logoutByReq,
    ],
    url: `${url}`,
    sections: {
        productList: {
            selector: '.product-list-variant',
            elements: {
                viewAllLink: {
                    selector: '.link-forward'
                },
            }
        },
        header: {
            selector: '.header-inner',
            elements: {
                logo: {
                    selector: '.header-logo'
                },
                myStore: {
                    selector: '.show-for-large > a'
                },
                myAccount: {
                    selector: '.usermenu .user-profile-menu-item'
                },
                myAccountLogout: {
                    selector: '.usermenu-content'
                },
                wishlistIcon: {
                    selector: '.miniwishlist-status'
                },
                cartIcon: {
                    selector: '.minicart-wrapper'
                },
                wishlistIconNumber: {
                    selector: 'div.miniwishlist-status > div > a > span.count'
                },
                cartIconNumber: {
                    selector: 'div.minicart-status > div > a > span.count'
                },
                searchText: {
                    selector: '#mini-search'
                },
                searchButton: {
                    selector: '.search-submit'
                }
            }
        },
    },
}