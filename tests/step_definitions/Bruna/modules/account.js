const globals = require('../../../global');
const cart = require('./cart');
const plp = require('./plp');
const base = require('../basic/base')
const http = require("http");
var orderIndex = -1;
const TITLE_CLASSNAME = cart.LINE_ITEM_TITLE_CLASSNAME;
const PRICE_CLASSNAME = cart.LINE_ITEM_PRICE_CLASSNAME;
const QUANTITY_CLASSNAME = cart.LINE_ITEM_QUANTITY_SELECTOR_CLASSNAME;
const ORDER_SHIPPING_COST_SELECTOR = '.order-total > dl > dd:nth-child(2)';
const ORDER_TOTAL_SELECTOR = '.order-total > dl > dd:nth-child(4)';
const OUT_OF_STOCK = 'This product is out of stock.';
//var addressIndex = -1;

var clickOrders = {
    showOrders: function () {
        var sec = this.section.leftMenu
        sec.waitForElementVisible('@orders', 'order menu link show correct.')
        sec.click('@orders')
        sec = this.section.orderOverview
        sec.waitForElementVisible('@orderDate', 'the order detail show correct.')
        this.api.pause(globals.middleWaitTime)
    }
}

var checkTheOrders = {
    checkSubmittedOrders: function (client) {
        let orders;
        let temp = cart.orderInfo;
        client
            .elements('css selector', '.orders', (result) => {
                orders = result.value;
                console.log(orders)
                console.log('*****')
                console.log(temp)
            })
            .perform((done) => {
                orders.forEach((element, index) => {
                    client.elementIdText(element.ELEMENT, (text) => {
                        console.log(text.value)
                        console.log(temp.get('orderNum'))
                        console.log(temp.get('orderTotal'))
                        console.log(temp.get('orderDate'))
                        var num = temp.get('orderNum')
                        var total = temp.get('orderTotal').trim()
                        var odate = temp.get('orderDate')
                        console.log('1' + text.value.indexOf(num) > -1)
                        console.log('2' + text.value.indexOf(total.substring(2)) > -1)
                        console.log('3' + text.value.indexOf(odate) > -1)
                        var result = (text.value.indexOf(num) > -1) && (text.value.indexOf(total.substring(2)) > -1) && (text.value.indexOf(odate) > -1)
                        if (result) {
                            orderIndex = index
                        }
                        console.log('the order index is : ' + orderIndex)
                        client.assert.equal(orderIndex > -1, true, 'the order is found in the list.')
                    });
                });
                done();
            })

    }
}

var checkTheOrderDetails = {
    checkSubmittedOrderDetails: function (client) {
        console.log('the order index is : ' + orderIndex)
        this.api.perform((done) => {
            var sec = this.section.orderOverview
            sec.click('div.orders-overview > div:nth-child(' + (orderIndex + 1) + ') .view-order', function () {
                console.log('click the view order button success.')
            })
            client.pause(globals.miniWaitTime)
            client.execute(function (TITLE_CLASSNAME, PRICE_CLASSNAME, QUANTITY_CLASSNAME, ORDER_SHIPPING_COST_SELECTOR, ORDER_TOTAL_SELECTOR) {
                var titles = Array.prototype.slice.call(document.getElementsByClassName(TITLE_CLASSNAME)).map(function (item) {
                    return item.innerText;
                });
                var quantities = Array.prototype.slice.call(document.getElementsByClassName(QUANTITY_CLASSNAME)).map(function (item) {
                    return item.innerText;
                });
                var prices = Array.prototype.slice.call(document.getElementsByClassName(PRICE_CLASSNAME)).map(function (item) {
                    return item.innerText;
                });
                var shippingCost = document.querySelectorAll(ORDER_SHIPPING_COST_SELECTOR)[0].innerText;
                var total = document.querySelectorAll(ORDER_TOTAL_SELECTOR)[0].innerText;
                return {
                    'titles': titles,
                    'quantities': quantities,
                    'prices': prices,
                    'shippingCost': shippingCost,
                    'total': total
                };
            }, [TITLE_CLASSNAME, PRICE_CLASSNAME, QUANTITY_CLASSNAME, ORDER_SHIPPING_COST_SELECTOR, ORDER_TOTAL_SELECTOR], function (result) {
                console.log(result.value)
                client.assert.equal(cart.cartInfo.get('titles').toString(), result.value.titles.toString(), 'the product titles are correct.')
                client.assert.equal(cart.cartInfo.get('quantities').toString(), result.value.quantities.toString(), 'the product quantities are correct.')
                client.assert.equal(cart.cartInfo.get('prices').toString(), result.value.prices.toString(), 'the product prices are correct.')
                client.assert.equal(cart.cartInfo.get('shippingCost').toString(), result.value.shippingCost.toString(), 'the order shipping cost is correct.')
                client.assert.equal(cart.cartInfo.get('total').toString(), result.value.total.toString(), 'the order total is correct.')
            })
            done()
        })
        return client
    }
}

var clickAddressbook = {
    showAddressbook: function () {
        var sec = this.section.leftMenu
        sec.waitForElementVisible('@address', 'addressbook menu link show correct.')
        sec.click('@address')
        sec = this.section.addressbookOverview
        sec.waitForElementVisible('@addButton', 'the address detail show correct.')
    }
}

var clickWishlist = {
    showWishlist: function () {
        var sec = this.section.leftMenu
        sec.waitForElementVisible('@wishlist', 'wishlist menu link show correct.')
        sec.click('@wishlist')
        sec = this.section.wishlistOverview
        sec.waitForElementVisible('@wishlistTitle', 'the wishlist detail show correct.')
    }
}

var clickPersonalInfo = {
    showPersonalInfo: function () {
        var sec = this.section.leftMenu
        sec.waitForElementVisible('@personalInfo', 'personal info menu link show correct.')
        sec.click('@personalInfo')
        sec = this.section.personalInfoOverview
        //sec.waitForElementVisible('@subtitle', 'the personal info subtitle show correct.')
    }
}

var clickEbook = {
    showEbookOrders: function () {
        var sec = this.section.leftMenu
        sec.waitForElementVisible('@ebooks', 'ebook orders menu link show correct.')
        sec.click('@ebooks')
        sec = this.section.ebookOverview
        sec.waitForElementVisible('@title', 'the ebook orders title show correct.')
    }
}

var verifyEbookOrder = {
    verifyTheEbookOrder: function (client) {
        let ebookOrders;
        let orderIndex = -1;
        let orderInfo = cart.orderInfo;
        let cartInfo = cart.cartInfo;
        let result = false;
        console.log(orderInfo)
        console.log(cartInfo)
        client
            .elements('css selector', '.my-products', (result) => {
                ebookOrders = result.value;
                console.log(ebookOrders)
            })
            .perform((done) => {
                ebookOrders.forEach((element, index) => {
                    client.elementIdText(element.ELEMENT, (text) => {
                        if (text.value.indexOf(orderInfo.get('orderNum')) > -1) {
                            orderIndex = text.value.indexOf(orderInfo.get('orderNum'))
                            result = (text.value.indexOf(cartInfo.get('titles').toString()) > -1) &&
                                (text.value.indexOf(cartInfo.get('bindings').toString()) > -1)
                            client.assert.equal(result, true, 'The order info is correct.')
                            client.getAttribute('.block-wrap > div:nth-child(' + (2 + index) + ') .download > a', 'href', function (result) {
                                console.log(result.value)
                                var downloadUrl = result.value
                                var url = downloadUrl.substring(downloadUrl.indexOf('//') + 2)
                                var path = url.substring(url.indexOf('/'));
                                var domain = url.substring(0, url.indexOf('/'));
                                console.log('domain:' + domain + ',path:' + path)
                            })
                        }
                    })
                })
                client.perform((done) => {
                    console.log('orderIndex:' + orderIndex)
                    client.assert.equal(orderIndex > -1, true, 'the ebook order is found.')
                    done();
                })
                verifyDownload.verifyTheEbookLink(client)
                done();
            })
    }
}

var clickResetPassword = {
    showResetPassword: function () {
        var sec = this.section.leftMenu
        sec.waitForElementVisible('@resetPassword', 'reset password menu link show correct.')
        sec.click('@resetPassword')
        sec = this.section.resetPasswordOverview
        //sec.waitForElementVisible('@subtitle', 'the reset password subtitle show correct.')
    }
}

var updatePassword = {
    updateThePassword: function (oldPassword, newPassword) {
        var sec = this.section.resetPasswordOverview
        base.inputText(this.api, sec, '@oldPassword', oldPassword)
        base.inputText(this.api, sec, '@newPassword', newPassword)
        base.inputText(this.api, sec, '@confirmPassword', newPassword)
        base.clickButton(this.api, sec, '@saveButton', 'save')
        base.verifyText(sec, '@successInfo', globals.myAccounrResetPasswordTips, 'Update password success.',false)
    }
}

var logout = {
    logoutAccount: function () {
        var sec = this.section.leftMenu
        base.waitElement(this.api, sec, '@logoutMenu', 'logout menu show success.')
        base.clickButton(this.api, sec, '@logoutMenu', 'logout')
        this.api.pause(globals.middleWaitTime)
        this.api.assert.urlEquals(globals.brunaHomepage)
    }
}

var checkPersonalInfo = {
    checkThePersonalInfo: function (personalInfo) {
        var sec = this.section.personalInfoOverview
        if (personalInfo.gender === 'M') {
            sec.getAttribute('@genderM', 'checked', function (result) {
                console.log(typeof (result.value))
                console.log(result.value)
                sec.assert.equal(result.value, 'true', 'the gender is correct.')
            })
        } else {
            sec.getAttribute('@genderF', 'checked', function (result) {
                console.log(typeof (result.value))
                console.log(result.value)
                sec.assert.equal(result.value, 'true', 'the gender is correct.')
            })
        }
        sec.getValue('@firstName', function (result) {
            sec.assert.equal(result.value, personalInfo.firstName, 'the first name is correct.')
        })
        sec.getValue('@lastName', function (result) {
            sec.assert.equal(result.value, personalInfo.lastName, 'the last name is correct.')
        })
        sec.getValue('@email', function (result) {
            sec.assert.equal(result.value, personalInfo.email, 'the email is correct.')
        })
        sec.getValue('@phone', function (result) {
            sec.assert.equal(result.value, personalInfo.phone, 'the phone is correct.')
        })
    }
}

var updatePersonalInfo = {
    updateThePersonalInfo: function (personalInfo) {
        var sec = this.section.personalInfoOverview
        if (personalInfo.gender === 'M') {
            this.api.execute(function () {
                document.querySelectorAll('input[value="M"]')[0].click();
            }, [], function () {
                console.log('choose gender male success.')
            })
        } else {
            this.api.execute(function () {
                document.querySelectorAll('input[value="F"]')[0].click();
            }, [], function () {
                console.log('choose gender female success.')
            })
        }
        this.api.pause(globals.miniWaitTime)
        sec.clearValue('@firstName')
        sec.setValue('@firstName', personalInfo.firstName, function () {
            console.log('set the first name "' + personalInfo.firstName + '" success.')
        })
        this.api.pause(globals.miniWaitTime)
        sec.clearValue('@lastName')
        sec.setValue('@lastName', personalInfo.lastName, function () {
            console.log('set the last name "' + personalInfo.lastName + '" success.')
        })
        this.api.pause(globals.miniWaitTime)
        sec.clearValue('@email')
        sec.setValue('@email', personalInfo.email, function () {
            console.log('set the email "' + personalInfo.email + '" success.')
        })
        this.api.pause(globals.miniWaitTime)
        sec.clearValue('@phone')
        sec.setValue('@phone', personalInfo.phone, function () {
            console.log('set the phone "' + personalInfo.phone + '" success.')
        })
        this.api.pause(globals.miniWaitTime)
        sec.click('@saveButton', function () {
            console.log('click the save button success.')
        })
        sec.waitForElementVisible('@successInfo', 'the update tips show.')
        sec.getText('@successInfo', function (result) {
            sec.assert.equal(globals.myAccountPersonalInfoUpdateTips.indexOf(result.value) > -1 , true, 'the update is success.')
        })
    }
}

var checkWishlist = {
    checkWishlistInfo: function () {
        var sec = this.section.wishlistOverview.section.wishlistItems
        sec.getText('@title', function (result) {
            sec.assert.equal(plp.item.title, result.value, 'the item title is correct.')
        })
        sec.getText('@price', function (result) {
            sec.assert.equal(plp.item.price, result.value, 'the item price is correct.')
        })
        sec.getText('@addToCartButton', function (result) {
            if (plp.item.addToCartTitle != 'In winkelwagen') {
                sec.assert.equal(OUT_OF_STOCK, result.value, 'the item stock info is correct.')
            } else {
                sec.assert.equal(plp.item.addToCartTitle, result.value, 'the item add to cart button is correct.')
            }
        })
    }
}

var clickAdd = {
    clickAddButton: function () {
        var sec = this.section.addressbookOverview
        sec.click('@addButton', function () {
            console.log('click the add button success.')
        })
        this.api.pause(globals.miniWaitTime)
        sec.click('@cancelButton', function () {
            console.log('click the cancel button success.')
        })
        this.api.pause(globals.miniWaitTime)
        sec.click('@addButton', function () {
            console.log('click the add button success.')
        })
    }
}

var clickEdit = {
    clickEditButton: function () {
        console.log('addressIndex is ' + addressIndex)
        var sec = this.section.addressbookOverview.section.addressbook
        sec.click('@editButton', function () {
            console.log('click the edit button success.')
        })
        this.api.pause(globals.miniWaitTime)
    }
}

var clickDelete = {
    clickDeleteButton: function () {
        var sec = this.section.addressbookOverview.section.addressbook
        sec.click('@deleteButton', function () {
            console.log('click the delete button success.')
        })
        this.api.pause(globals.miniWaitTime)
    }
}

var addAddress = {
    updateAddressBook: function (newAddress) {
        if (newAddress.gender === 'M') {
            this.api.execute(function () {
                document.querySelectorAll('input[value="M"]')[0].click();
            }, [], function () {
                console.log('choose gender male success.')
            })
        } else {
            this.api.execute(function () {
                document.querySelectorAll('input[value="F"]')[0].click();
            }, [], function () {
                console.log('choose gender female success.')
            })
        }
        this.api.pause(globals.miniWaitTime)
        var sec = this.section.addressbookOverview
        sec.clearValue('@firstName')
        sec.setValue('@firstName', newAddress.firstName, function () {
            console.log('set first name ' + newAddress.firstName + ' success.')
        })
        this.api.pause(globals.miniWaitTime)
        sec.clearValue('@lastName')
        sec.setValue('@lastName', newAddress.lastName, function () {
            console.log('set last name ' + newAddress.lastName + ' success.')
        })
        this.api.pause(globals.miniWaitTime)
        sec.clearValue('@company')
        sec.setValue('@company', newAddress.company, function () {
            console.log('set company ' + newAddress.company + ' success.')
        })
        this.api.pause(globals.miniWaitTime)
        sec.setValue('@country', globals.countryCode[newAddress.country], function () {
            console.log('set country ' + newAddress.country + ' success.')
        })
        this.api.pause(globals.miniWaitTime)
        sec.clearValue('@postcode')
        sec.setValue('@postcode', newAddress.postcode, function () {
            console.log('set postcode ' + newAddress.postcode + ' success.')
        })
        this.api.pause(globals.miniWaitTime)
        sec.clearValue('@houseNum')
        sec.setValue('@houseNum', newAddress.houseNum, function () {
            console.log('set houseNum ' + newAddress.houseNum + ' success.')
        })
        this.api.pause(globals.miniWaitTime)
        sec.clearValue('@addition')
        sec.setValue('@addition', newAddress.addition, function () {
            console.log('set addition ' + newAddress.addition + ' success.')
        })
        this.api.pause(globals.miniWaitTime)
        sec.clearValue('@address')
        sec.setValue('@address', newAddress.address, function () {
            console.log('set address ' + newAddress.address + ' success.')
        })
        this.api.pause(globals.miniWaitTime)
        sec.clearValue('@city')
        sec.setValue('@city', newAddress.city, function () {
            console.log('set city ' + newAddress.city + ' success.')
        })
        sec.click('@saveButton', function () {
            console.log('click the save button success.')
        })
        this.api.pause(globals.middleWaitTime)
    }
}

var checkAddress = {
    checkAddressInfo: function (client, address, operation) {
        let addresses;
        let addressIndex = -1;
        let result = false;
        client
            .elements('css selector', '.entry-wrap', (result) => {
                addresses = result.value;
                console.log(addresses)
                console.log(address)
            })
            .perform((done) => {
                addresses.forEach((element, index) => {
                    client.elementIdText(element.ELEMENT, (text) => {
                        console.log(text.value)
                        console.log('***************')
                        console.log('firstName is ' + address.firstName)
                        result = (text.value.indexOf(address.firstName) > -1) &&
                            (text.value.indexOf(address.lastName) > -1) &&
                            (text.value.indexOf(address.houseNum) > -1) &&
                            (text.value.indexOf(address.addition) > -1) &&
                            (text.value.indexOf(address.postcode) > -1) &&
                            (text.value.indexOf(address.city) > -1) &&
                            (text.value.indexOf(address.country) > -1)
                        console.log('result is ' + result)
                        if (result) {
                            addressIndex = index
                            console.log('the address index is : ' + addressIndex)
                            client.assert.equal(addressIndex > -1, true, 'the address is found and info is correct.')
                            if (operation === 'add' || operation === 'edit') {
                                client.pause(globals.miniWaitTime)
                                client.click('.user-profile-addresses .row .entry-wrap:nth-child(' + (addressIndex + 1) + ') .edit', function () {
                                    console.log('click the edit button success.')
                                })
                                client.pause(globals.miniWaitTime)
                                var gender = address.gender
                                client.execute(function (gender) {
                                    if (gender === 'M')
                                        return document.querySelectorAll('input[value="M"]')[0].checked;
                                    else
                                        return document.querySelectorAll('input[value="F"]')[0].checked;
                                }, [gender], function (result) {
                                    client.assert.equal(result.value, true, 'the address gender is correct.')
                                })
                            }
                            client.pause(globals.miniWaitTime)
                            if (operation === 'delete') {
                                console.log('before click delete the addressIndex is : '+addressIndex)
                                client.click('.user-profile-addresses .row .entry-wrap:nth-child(' + (addressIndex + 1) + ') .remove', function () {
                                    console.log('click the delete button success.')
                                })
                            }
                        }
                    });
                });
                if (operation === 'deleteverify') {
                    client.assert.equal(result, false, 'the address is delete success.')
                }
                done();
            })
    }
}

var clearWishlist = {
    clearWishlistInfo: function (client) {
        let buttons
        client
            .elements('css selector', '.delete > a', (result) => {
                buttons = result.value;
            })
            .perform((done) => {
                buttons.forEach((element) => {
                    client.elementIdClick(element.ELEMENT, (text) => {
                        console.log('click the delete button success.')
                    });
                });
                client.waitForElementVisible('.wishlist--empty', 'clear wishlist success.')
                done();
            })
    }
}

var moveToCart = {
    clickMoveToCartButton: function (client) {
        let buttons
        client
            .elements('css selector', '.cart-product-information-bottom :nth-child(2) > a', (result) => {
                buttons = result.value;
            })
            .perform((done) => {
                buttons.forEach((element) => {
                    client.elementIdClick(element.ELEMENT, (text) => {
                        console.log('click the move to cart button success.')
                    });
                });
                client.waitForElementVisible('.wishlist--empty', 'clear wishlist success.')
                done();
            })
    }
}

var verifyDownload = {
    verifyTheEbookLink: function (client) {
        var request = http.request({
            host: "www.baidu.com",
            port: 80,
            path: "/search",
            method: "HEAD"
        }, function (response) {
            console.log('content-length:' + response.headers["content-length"])
            //   client.assert.equal(response.headers["content-length"], 123, 'Same file size');
            //   client.end();
            console.log('STATUS: ' + response.statusCode);
            console.log('HEADERS: ' + JSON.stringify(response.headers));
            console.log(client)
        })

        request.on("error", function (err) {
            console.log(err);
            client.end();
        })

        request.end();
    }
}



module.exports = {
    commands: [
        clickOrders,
        checkTheOrders,
        checkTheOrderDetails,
        clickAddressbook,
        clickWishlist,
        checkWishlist,
        clickPersonalInfo,
        checkPersonalInfo,
        updatePersonalInfo,
        clickResetPassword,
        updatePassword,
        clickEbook,
        verifyEbookOrder,
        addAddress,
        checkAddress,
        clickAdd,
        clickEdit,
        clickDelete,
        clearWishlist,
        moveToCart,
        logout,
        verifyDownload,
    ],
    sections: {
        leftMenu: {
            selector: '.account-sidebar',
            elements: {
                orders: {
                    selector: 'div.account-menu > ul:nth-child(2) >li:nth-child(1) >a'
                },
                wishlist: {
                    selector: 'div.account-menu > ul:nth-child(2) >li:nth-child(2) >a'
                },
                ebooks: {
                    selector: 'div.account-menu > ul:nth-child(2) >li:nth-child(3) >a'
                },
                address: {
                    selector: 'div.account-menu > ul:nth-child(4) >li:nth-child(1) >a'
                },
                personalInfo: {
                    selector: 'div.account-menu > ul:nth-child(4) >li:nth-child(2) >a'
                },
                resetPassword: {
                    selector: 'div.account-menu > ul:nth-child(4) >li:nth-child(3) >a'
                },
                logoutMenu: {
                    selector: '.logout'
                }
            }
        },
        ebookOverview: {
            selector: '.block-wrap',
            elements: {
                ebookOrder: {
                    selector: '.my-products'
                },
                title: {
                    selector: '.title'
                },
                thumbnail: {
                    selector: '.thumbnail > a > picture > img'
                },
                itemTitle: {
                    selector: '.lineItem-title'
                },
                orderNum: {
                    selector: '.order-number'
                },
                binding: {
                    selector: '.ebook-label'
                },
                author: {
                    selector: '.lineitem-fields'
                },
                downloadButton: {
                    selector: '.download a'
                }
            }
        },
        resetPasswordOverview: {
            selector: '.block-wrap',
            elements: {
                successInfo: {
                    selector: '.success-notice'
                },
                subtitle: {
                    selector: '.subtitle'
                },
                oldPassword: {
                    selector: '#password'
                },
                newPassword: {
                    selector: '#newPassword'
                },
                confirmPassword: {
                    selector: '#newPasswordConfirm'
                },
                saveButton: {
                    selector: '.regForm .button'
                }
            }
        },
        personalInfoOverview: {
            selector: '.block-wrap',
            elements: {
                successInfo: {
                    selector: '.success-notice'
                },
                subtitle: {
                    selector: '.subtitle'
                },
                genderM: {
                    selector: 'input[value="M"]'
                },
                genderF: {
                    selector: 'input[value="F"]'
                },
                firstName: {
                    selector: '#firstName'
                },
                lastName: {
                    selector: '#lastName'
                },
                email: {
                    selector: '#email'
                },
                phone: {
                    selector: '#eveningPhoneNumber'
                },
                saveButton: {
                    selector: '.regForm .button'
                }
            }
        },
        orderOverview: {
            selector: '.orders-overview',
            elements: {
                order: {
                    selector: '.orders'
                },
                orderDate: {
                    selector: 'div.orderdate-wrapper > dd'
                },
                orderNum: {
                    selector: 'div.ordernumber-wrapper > dd'
                },
                orderPrice: {
                    selector: 'div.orderprice > dd'
                },
                orderButton: {
                    selector: '.view-order'
                },
                productTitle: {
                    selector: '.lineItem-title'
                },
                productQuantity: {
                    selector: '.quantity-selector'
                },
                productPrice: {
                    selector: 'div.price > dd'
                },
                viewButton: {
                    selector: '.view-order'
                },
            }
        },
        wishlistOverview: {
            selector: '.block-wrap',
            elements: {
                wishlistTitle: '.title'
            },
            sections: {
                wishlistItems: {
                    selector: '.product',
                    elements: {
                        title: {
                            selector: '.lineItem-title',
                        },
                        price: {
                            selector: '.price'
                        },
                        addToCartButton: {
                            selector: '.cart-product-information-bottom :nth-child(2)'
                        },
                        deleteButton: {
                            selector: '.delete > a'
                        }
                    }
                }
            }
        },
        addressbookOverview: {
            selector: '.block-wrap',
            elements: {
                addButton: {
                    selector: '.new-address'
                },
                cancelButton: {
                    selector: '.cancel-button'
                },
                saveButton: {
                    selector: '.save-address'
                },
                genderM: {
                    selector: 'input[value="M"]'
                },
                genderF: {
                    selector: 'input[value="F"]'
                },
                firstName: {
                    selector: '#firstName'
                },
                lastName: {
                    selector: '#lastName'
                },
                company: {
                    selector: '#company'
                },
                country: {
                    selector: '.countryCode'
                },
                postcode: {
                    selector: '#zipPostalCode'
                },
                houseNum: {
                    selector: '#houseNumber'
                },
                addition: {
                    selector: '#addition'
                },
                address: {
                    selector: '#address1'
                },
                city: {
                    selector: '#city'
                }
            },
            sections: {
                addressbook: {
                    selector: '.entry-wrap',
                    elements: {
                        editButton: {
                            selector: '.edit',
                        },
                        deleteButton: {
                            selector: '.remove',
                        },
                        genderM: {
                            selector: 'input[value="M"]'
                        },
                        genderF: {
                            selector: 'input[value="F"]'
                        },
                        firstName: {
                            selector: '#firstName'
                        },
                        lastName: {
                            selector: '#lastName'
                        },
                        company: {
                            selector: '#company'
                        },
                        country: {
                            selector: '.countryCode'
                        },
                        postcode: {
                            selector: '#zipPostalCode'
                        },
                        houseNum: {
                            selector: '#houseNumber'
                        },
                        addition: {
                            selector: '#addition'
                        },
                        address: {
                            selector: '#address1'
                        },
                        city: {
                            selector: '#city'
                        },
                        cancelButton: {
                            selector: '.cancel-button'
                        },
                        saveButton: {
                            selector: '.save-address'
                        }
                    }
                }
            }
        }
    },
}