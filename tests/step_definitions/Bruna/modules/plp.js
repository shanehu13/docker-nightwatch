const globals = require('../../../global');
var url = globals.brunaHomepage;
var chosenIndex = 0; //Math.floor(Math.random() * (globals.plpProductCountPerPage));
var chosenBrandName = '';
var chosenBrandResultNum = -1;
var pageTotal = -1;
var defaultResultNum = -1;
var currentResultNum = -1;
var minPrice = -1;
var maxPrice = -1;
var lastPageNum = -1;
var AddItems = [];
var item = {
    'title': '',
    'price': '',
    'addToCartTitle': ''
}

var checkItemTitle = {
    checkProductListItemTitle: function () {
        var sec = this.section.productList.section.productItem.section.product
        sec.waitForElementVisible('@itemTitle', 'The item title is show.')
        sec.getText('@itemTitle', function (result) {
            console.log(result.value)
            item.title = result.value
            sec.assert.equal(result.value.length > 0, true, 'The item title is ' + result.value)
        })
        return this
    }
}

var verifyItemSearchKeyword = {
    verifyProductListSearchKeyword: function (sec, keyword) {
        sec.waitForElementVisible('@searchKeyword', 'The keyword is show.')
        sec.getText('@searchKeyword', function (result) {
            console.log('keyword is ' + result.value)
            sec.assert.equal(result.value, keyword, 'The search keyword ' + result.value + ' is correct.')
        })
        return this
    }
}

var checkItemPrice = {
    checkProductListItemPrice: function () {
        var sec = this.section.productList.section.productItem.section.product
        sec.waitForElementVisible('@itemPrice', 'The item price is show.')
        sec.getText('@itemPrice', function (result) {
            console.log(result.value)
            item.price = result.value
            sec.assert.equal(parseFloat(result.value.substring(1)) > 0, true, 'The item price is ' + result.value)
        })
        return this
    }
}

var checkItemImage = {
    checkProductListItemImage: function () {
        var sec = this.section.productList.section.productItem.section.product
        sec.waitForElementVisible('@itemImage', 'The item image is show.')
        sec.getAttribute('@itemImage', 'width', function (result) {
            console.log(result.value)
            sec.assert.equal(parseInt(result.value) > globals.errorImgWidth, true, 'The item image is show correct,width is ok.')
        })
        sec.getAttribute('@itemImage', 'height', function (result) {
            console.log(result.value)
            sec.assert.equal(parseInt(result.value) > globals.errorImgHeight, true, 'The item image is show correct,height is ok.')
        })
        return this
    }
}

var checkItemBrand = {
    checkProductListItemBrand: function (section) {
        var sec = section.productList.section.productItem.section.product
        //sec.waitForElementVisible('@itemBrand', 'The item brand is show.')
        sec.getText('@itemBrand', function (result) {
            console.log(result.value)
            console.log('Index is: ' + chosenIndex)
            sec.assert.equal(result.value, chosenBrandName, 'The item brand name is correct.')
        })
        return this
    }
}

var checkItemAddToWishlistButton = {
    checkProductListItemAddToWishlistButton: function () {
        var sec = this.section.productList.section.productItem.section.product
        sec.waitForElementVisible('@wishlistButton', 'The item add to wishlist button is show.')
        return this
    }
}

var checkItemAddToCartButton = {
    checkProductListItemAddToCartButton: function () {
        var sec = this.section.productList.section.productItem.section.product
        sec.waitForElementVisible('@addToCartButton', 'The item add to cart button is show.')
        sec.getText('@addToCartButton', function (result) {
            item.addToCartTitle = result.value
        })
        return this
    }
}

var moveToTheItem = {
    moveToProductListItem: function () {
        var sec = this.section.productList.section.productItem.section.product
        console.log('fdkfdkf:' + chosenIndex)
        sec.waitForElementVisible('@itemImage')
        sec.moveToElement('@itemImage', 1, 1, function () {
            console.log('Move mouse to the item image success.')
        })
        this.api.pause(globals.miniWaitTime)
        return this
    }
}

var clickAddToWishlistButton = {
    addToWishlist: function () {
        var sec = this.section.productList.section.productItem.section.product
        sec.click('@wishlistButton', function () {
            console.log('click the add to wishlist button success.')
        })
        this.api.pause(globals.middleWaitTime)
        return this
    }
}

var clickAddToCartButton = {
    addToCart: function () {
        var sec = this.section.productList.section.productItem.section.product

        sec.click('@addToCartButton', function () {
            console.log('click the add to cart button success.')
        })
        return this
    }
}

var getCurrentPageItemCounts = {
    getCurrentPageCount: function (client) {
        client.perform((done) => {
            client.pause(globals.miniWaitTime)
            client.execute(function () {
                return document.getElementsByClassName('product-list')[0].childElementCount;
            }, [], function (result) {
                console.log(result.value)
                console.log(Math.random())
                pageTotal = parseInt(result.value)
                console.log('current page number is:' + pageTotal)
                chosenIndex = Math.floor(Math.random() * pageTotal)
                console.log(chosenIndex)
            })
            done()
        })
    }
}

var getAllPageItemCounts = {
    getAllPageCounts: function (client, sec) {
        client.perform((done) => {
            if (currentResultNum > globals.plpProductCountPerPage) {
                sec.getText('@lastPage', function (result) {
                    lastPageNum = parseInt(result.value)
                })
                sec.click('@lastPage', () => {
                    console.log('click the last page number success.')
                    client.pause(globals.middleWaitTime)
                    client.elements('css selector', '.item', (result) => {
                        pageTotalNum = /*pageTotal*/ parseInt(result.value.length) + (lastPageNum - 1) * globals.plpProductCountPerPage
                        console.log('pageTotalNum:' + pageTotalNum)
                        console.log('currentResultNum:' + currentResultNum)
                        client.assert.equal(currentResultNum, pageTotalNum, 'the price filter result is correct.')
                    })
                })
                done()
            } else {
                getCurrentPageItemCounts.getCurrentPageCount(client)
            }
            done()
        })
    }
}

var getCurrentResultNumber = {
    getCurrentResultNum: function (api, sec) {
        api.pause(globals.miniWaitTime)
        sec.waitForElementVisible('@resultNum')
        sec.getText('@resultNum', function (result) {
            currentResultNum = parseInt(result.value)
            console.log('The current result number is ' + currentResultNum)
        })
        return this
    }
}

var getTheBrandTitle = {
    checkTheBrandTitle: function () {
        var sec = this.section.sidebar.section.brand
        sec.getText('@brandTitle', function (result) {
            sec.assert.equal(result.value, globals.filterBrandTitle, 'the brand title is correct.')
        })
    }
}

var getTheCategoryTitle = {
    checkTheCategoryTitle: function () {
        var sec = this.section.sidebar.section.category
        sec.getText('@categoryTitle', function (result) {
            sec.assert.equal(result.value, globals.filterCategoryTitle, 'the category title is correct.')
        })
    }
}

var getThePriceTitle = {
    checkThePriceTitle: function () {
        var sec = this.section.sidebar.section.price
        sec.getText('@priceTitle', function (result) {
            sec.assert.equal(result.value, globals.filterPriceTitle, 'the price title is correct.')
        })
    }
}

var chooseBrand = {
    chooseABrand: function () {
        var sec = this.section.sidebar.section.brand.section.brandItem
        sec.getText('@brandItemName', function (result) {
            chosenBrandName = result.value
            console.log('choose the brand ' + chosenBrandName)
        })
        sec.getText('@brandItemCount', function (result) {
            chosenBrandResultNum = result.value.replace(/[^0-9]/ig, "")
            console.log('brand ' + chosenBrandName + ' has ' + chosenBrandResultNum + ' result.')
        })
        sec.click('@brandItemCheck', function () {
            console.log('Index is: ' + chosenIndex)
            console.log('choose the brand success.')
        })
        this.api.pause(globals.miniWaitTime)
    }
}

var checkBrandFilterResult = {
    checkChosenBrandFilterResult: function (client) {
        getCurrentPageItemCounts.getCurrentPageCount(client)
        client.perform(() => {
            client.assert.equal(chosenBrandResultNum, pageTotal, 'the filter result number is correct.')
        })
        checkItemBrand.checkProductListItemBrand(this.section)
    }
}

var checkPriceFilterResult = {
    checkSetPriceFilterResult: function (client) {
        getCurrentResultNumber.getCurrentResultNum(this.api, this.section.sidebar.section.resultAndReset)
        getCurrentPageItemCounts.getCurrentPageCount(client)
        getAllPageItemCounts.getAllPageCounts(client, this.section.pagination)
    }
}

var verifyTheResultCount = {
    verifyTheResultNum: function (expect, sec) {
        sec.getText('@resultNum', function (result) {
            console.log('current' + result.value)
            console.log('expect' + expect)
            sec.assert.equal(parseInt(result.value), expect, 'the result number is correct.')
        })
    }
}

var resetFilter = {
    clickResetButton: function () {
        var sec = this.section.sidebar.section.resultAndReset
        sec.click('@resetButton', function () {
            console.log('click the reset button success.')
            console.log('defaultResultNum ' + defaultResultNum)
        })
        this.api.pause(globals.middleWaitTime)
        this.api.perform(function () {
            verifyTheResultCount.verifyTheResultNum(defaultResultNum, sec)
        })

    }
}

var getTheDefaultResultCount = {
    getDefaultResultNum: function () {
        this.api.pause(globals.miniWaitTime)
        var sec = this.section.sidebar.section.resultAndReset
        sec.getText('@resultNum', function (result) {
            defaultResultNum = parseInt(result.value)
            console.log('The default result number is ' + defaultResultNum)
        })
    }
}

var getThePriceSection = {
    getItemPriceSection: function () {
        this.api.pause(globals.miniWaitTime)
        var sec = this.section.sidebar.section.price
        sec.getValue('@minPrice', function (result) {
            minPrice = parseInt(result.value)
        })
        sec.getValue('@maxPrice', function (result) {
            maxPrice = parseInt(result.value)
        })
    }
}

var setMinPrice = {
    setTheMinPrice: function (client) {
        //set an random min price
        var sec = this.section.sidebar.section.price
        client.perform(function () {
            var setMin = Math.floor(Math.random() * maxPrice)
            minPrice = setMin
            sec.clearValue('@minPrice')
            sec.setValue('@minPrice', [setMin,this.api.Keys.TAB], function () {
                console.log('set min price '+ setMin +' success.')
            })
            sec.clearValue('@minPrice')
            sec.setValue('@minPrice', [setMin,this.api.Keys.TAB], function () {
                console.log('set min price '+ setMin +' success.')
            })
            sec.clearValue('@minPrice')
            sec.setValue('@minPrice', [setMin,this.api.Keys.TAB], function () {
                console.log('set min price '+ setMin +' success.')
            })
            this.api.pause(globals.middleWaitTime)
        })
    }
}

var verifyThePrice = {
    checkAllPrice: function (client) {
        let allPrices;
        client
            .elements('css selector', 'div.price-container a .price .price', (result) => {
                allPrices = result.value;
            })
            .perform((done) => {
                allPrices.forEach((element) => {
                    client.elementIdText(element.ELEMENT, (text) => {
                        console.log('this item price is ' + text.value)
                        console.log(maxPrice)
                        console.log(minPrice)
                        this.api.assert.equal(parseFloat(text.value.substring(1)) <= parseFloat(maxPrice), true, 'the item price is less than the max price.')
                        this.api.assert.equal(parseFloat(text.value.substring(1)) >= parseFloat(minPrice), true, 'the item price is more than the min price.')
                    });
                });
                done();
            })
    }
}


//isbn
//ean,8710968002115

var verifyTheFields = {
    checkAllFields: function (fieldName, selector, client, expect) {
        let alls;
        client
            .elements('css selector', selector, (result) => {
                alls = result.value;
            })
            .perform((done) => {
                alls.forEach((element) => {
                    client.elementIdText(element.ELEMENT, (text) => {
                        console.log('the result field is ' + text.value)
                        switch (fieldName) {
                            case 'title':
                                client.assert.equal(text.value.toUpperCase().indexOf(expect.toUpperCase()) > -1, true, 'the title contains "' + expect + '".')
                                break;
                            case 'binding':
                                client.assert.equal(text.value, expect, 'the binding is the same as "' + expect + '".')
                                break;
                            case 'author':
                                client.assert.equal(text.value.toUpperCase().indexOf(expect.toUpperCase()) > -1, true, 'the author contains "' + expect + '".')
                                break;
                            case 'brand':
                                client.assert.equal(text.value.toUpperCase().indexOf(expect.toUpperCase()) > -1, true, 'the brand contains "' + expect + '".')
                                break;
                        }
                    });
                });
                done();
            })
    }
}

var verifyPriceSort = {
    checkThePriceSortResult: function (client, sortType) {
        let allPrices;
        let tempPrice;
        client
            .elements('css selector', 'div.price-container a .price .price', (result) => {
                allPrices = result.value;
            })
            .perform((done) => {
                allPrices.forEach((element, index) => {
                    client.elementIdText(element.ELEMENT, (text) => {
                        if (index > 0) {
                            console.log('now item price is ' + text.value.substring(1))
                            console.log('previous item price is ' + tempPrice)
                            switch (sortType) {
                                case globals.sortOptions['sortAesc']:
                                    client.assert.equal(parseFloat(text.value.substring(1)) >= tempPrice, true, 'the price sort is correct.')
                                    break;
                                case globals.sortOptions['sortDesc']:
                                    client.assert.equal(parseFloat(text.value.substring(1)) <= tempPrice, true, 'the price sort is correct.')
                                    break;
                            }
                        }
                        tempPrice = parseFloat(text.value.substring(1))
                    });
                });
                done();
            })
    }
}

var chooseSortOption = {
    chooseASortOption: function (option) {
        var sec = this.section.sort
        sec.click('@sortList')
        this.api.pause(globals.miniWaitTime)
        sec.click(option)
        this.api.pause(globals.middleWaitTime)
    }
}

var goToLastPage = {
    enterLastPage: function () {
        var sec = this.section.pagination
        sec.click('@lastPage', () => {
            console.log('click the last page number success.')
        })
        this.api.pause(globals.middleWaitTime)
    }
}

var goToFirstPage = {
    enterFirstPage: function () {
        var sec = this.section.pagination
        sec.click('@firstPage', () => {
            console.log('click the first page number success.')
        })
        this.api.pause(globals.middleWaitTime)
    }
}

var verifySeachResult = {
    verifySeachResultByName: function (fieldName, selector, client, expect) {
        getCurrentResultNumber.getCurrentResultNum(this.api, this.section.sidebar.section.resultAndReset)
        verifyItemSearchKeyword.verifyProductListSearchKeyword(this.section.sidebar.section.resultAndReset, expect)
        this.api.perform(function (done) {
            if (currentResultNum > 0) {
                verifyTheFields.checkAllFields(fieldName, selector, client, expect)
            } else {
                console.log('the result is empty.')
            }
            done();
        })
    }
}

var addItems = {
    saveAddItemsInfo: function () {
        this.api.perform((done) => {
            AddItems.push(item)
            console.log(AddItems)
            done()
        })
    }
}

module.exports = {
    AddItems,
    item,
    commands: [
        checkItemTitle,
        checkItemPrice,
        checkItemImage,
        checkItemBrand,
        checkItemAddToWishlistButton,
        checkItemAddToCartButton,
        moveToTheItem,
        clickAddToWishlistButton,
        clickAddToCartButton,
        getCurrentPageItemCounts,
        getTheBrandTitle,
        getTheCategoryTitle,
        getThePriceTitle,
        chooseBrand,
        checkBrandFilterResult,
        checkPriceFilterResult,
        resetFilter,
        getTheDefaultResultCount,
        getCurrentResultNumber,
        verifyTheResultCount,
        getThePriceSection,
        setMinPrice,
        verifyThePrice,
        getAllPageItemCounts,
        verifyPriceSort,
        chooseSortOption,
        goToLastPage,
        goToFirstPage,
        verifySeachResult,
        verifyItemSearchKeyword,
        verifyTheFields,
        addItems,
    ],
    url: `${url}catalog?location=`,
    sections: {
        sort: {
            selector: '.sorting',
            elements: {
                sortList: {
                    selector: '#sortby'
                },
                byPriceAesn: {
                    selector: '#sortby > option:nth-child(2)'
                },
                byPriceDesn: {
                    selector: '#sortby > option:nth-child(3)'
                }
            }
        },
        pagination: {
            selector: '.pagination',
            elements: {
                firstPage: {
                    selector: 'ul.pagination > li:nth-child(2)'
                },
                previousPage: {
                    selector: '.previous'
                },
                nextPage: {
                    selector: '.next'
                },
                lastPage: {
                    selector: 'ul.pagination > li:nth-last-child(2)'
                }
            }
        },
        productList: {
            selector: '.product-list',
            sections: {
                productItem: {
                    selector: '.product-list > li',
                    index: chosenIndex,
                    sections: {
                        product: {
                            selector: '.product',
                            elements: {
                                wishlistButton: {
                                    selector: '.btn-wishlist'
                                },
                                itemImage: {
                                    selector: 'div.image > a > picture > img'
                                },
                                itemTitle: {
                                    selector: '.product-title'
                                },
                                itemAuthor: {
                                    selector: '.product-authors'
                                },
                                itemBrand: {
                                    selector: '.product-brand'
                                },
                                itemPrice: {
                                    selector: 'div.price-container > a > div > div:nth-child(1) > div.price'
                                },
                                addToCartButton: {
                                    selector: 'div.addto-cart > a'
                                },
                                itemBinding: {
                                    selector: '.product-binding'
                                }
                            }
                        }
                    }
                }
            }
        },
        sidebar: {
            selector: '.filter-sidebar',
            sections: {
                resultAndReset: {
                    selector: '.filter-count-and-clear',
                    elements: {
                        resultNum: {
                            selector: '.pull-left > strong:nth-child(1)'
                        },
                        resetButton: {
                            selector: '.clearfilter'
                        },
                        searchKeyword: {
                            selector: '.pull-left > strong:nth-child(2)'
                        }
                    }
                },
                brand: {
                    selector: '.filter-accordion > li:nth-child(1)',
                    elements: {
                        brandTitle: {
                            selector: '.filter-accordion-title'
                        }
                    },
                    sections: {
                        brandItem: {
                            selector: '.filterItem',
                            elements: {
                                brandItemCheck: {
                                    selector: '.wrap'
                                },
                                brandItemName: {
                                    selector: '.title'
                                },
                                brandItemCount: {
                                    selector: '.count'
                                }
                            }
                        }
                    }
                },
                category: {
                    selector: '.filter-accordion > li:nth-child(2)',
                    elements: {
                        categoryTitle: {
                            selector: '.filter-accordion-title'
                        },
                        categoryItem: {
                            selector: '.filterItem'
                        }
                    }
                },
                price: {
                    selector: '.filter-accordion > li:nth-child(3)',
                    elements: {
                        priceTitle: {
                            selector: '.filter-accordion-title'
                        },
                        minPrice: {
                            selector: '.low'
                        },
                        maxPrice: {
                            selector: '.high'
                        },
                        minHandle: {
                            selector: '.min-handle'
                        },
                        maxHandle: {
                            selector: '.max-handle'
                        }
                    }
                }
            }
        }
    },
}