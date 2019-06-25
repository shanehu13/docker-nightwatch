const path = require('path')
const dotenvPath = path.resolve(
  __dirname,
  `./${process.env.environment || 'dev'}.env`
)

const dotenv = require('dotenv');
require('dotenv').config({ path: dotenvPath })


const protocol = 'https://';
const auth = 'bruna:20181228@';
const url = process.env.LAUNCH_URL;
const testUrl = protocol + url + '/';
const testHomePage = protocol + auth + url + '/';
const timpStamp = new Date().getTime() + '';

module.exports = {
    dotpath: dotenvPath,
    webAddress: `${url}`,
    skip_testcases_on_fail: false,
    waitForConditionTimeout: 30000,
    longWaitTime: 60000,
    middleWaitTime: 10000,
    shortWaitTime: 7000,
    miniWaitTime: 3000,
    sitecoreLoginName: "admin",
    sitecorePassword: "b",
    cardNumber: "70567803153028",
    password: "Test.123",
    sitecoreHomepage: "https://bruna.local/sitecore",
    homepage: `${testHomePage}`,
    brunaHomepage: `${testUrl}`,
    mercuryHomepage: "http://mercury-demo-v2.westeurope.cloudapp.azure.com/",
    conditionPage: "about:blank",
    conditionLinkText: "Voorwaarden",
    policyCookiePage: "about:blank",
    policyCookieLinkText: "Privacy- en Cookiebeleid",
    copyrightsText: "All rights reserved ©2018 Bruna",
    searchKeyword: "department",
    productKeyword: "cracker",
    storeKeyword: "AMSTERDAM",
    bookKeyword: "Harry",
    heroImageBannerText: "Ontdek Bruna’s ultieme vakantieboeken collectie",
    heroImageBannerCTAText: "Bekijk de collectie",
    heroImageBannerCTATextLink: `${testUrl}catalog?location=`,
    promotionalBannerTitle: "De dag van de doden",
    promotionalBannerSubtitle: "Bruna uitgelicht",
    promotionalBannerDescription: "De dag van de doden' is het achtste en laatste deel in de spannende Frieda Klein-serie van Nicci French. De bladeren vallen van de bomen…",
    promotionalBannerLink: `${testUrl}`,
    recentViewedProductTips: "No recently viewed products",
    promotedProductListTitle: "Bruna Top 100",
    promotedProductListSubtitle: "Alle nieuwe release in één overzicht. Gratis thuisbezorgd vanaf €19,95",
    promotedProductListLink: `${testUrl}catalog?location=`,
    cartTtile: "Shopping cart",
    cartSubtitle: "Overview of the products in your shopping cart",
    cartEmptyTips: "De winkelwagen is leeg",
    cartLink: `${testUrl}cart`,
    wishlistTtile: "Wishlist",
    wishlistSubtitle: "Overview of the products in your wishlist",
    wishlistLink: `${testUrl}en/Wishlist`,
    wishlistTips: "Your wishlist is empty.",
    uspLinkText1: "Deals you'll love",
    uspLinkText2: "Low price guaranteed",
    uspLinkText3: "Delivery or free pick up",
    trustBuyingSite: "trustpilot.com",
    twitterUrl: "https://twitter.com",
    facebookUrl: "https://www.facebook.com",
    customerServiceBlockTitle: "We helpen je graag!",
    customerServiceBlockDescription: "We staan klaar voor je opwerkdagen tussen 09:00 en 17:00",
    customerServiceBlockPhone: "088 - 7800 600",
    customerServiceBlockUrl: `${testUrl}`,
    findMyBrunaStoreTitle: "Vind een Bruna winkel",
    findMyBrunaStoreDescription1: 'Er zit altijd wel een',
    findMyBrunaStoreDescription2: 'Bruna winkel bij jou in de buurt.',
    findMyBrunaStoreUrl: `${testUrl}`,
    findMyBrunaStoreLinkText: "link for test",
    findMyBrunaStoreLinkUrl: `${testUrl}`,
    findStoreText: "Kies je winkel",
    findStoreUrl: `${testUrl}`,
    plpProductCountPerPage: 16,
    errorImgWidth: 16,
    errorImgHeight: 16,
    clpBannerLink: `${testUrl}`,
    firstPageUrl: `${testUrl}catalog?location=`,
    wishlistProductPDPUrl: `${testUrl}catalog?location=product%3d0608917253429`,
    productWithBindingUrl: `${testUrl}catalog?location=product%3d9789021407098`,
    bindingBorderColor: "rgb(237, 51, 37)",
    checkoutProcessIndicator: ["1Winkelmandje", "2Gegevens", "3Betaalwijze", "4Bevestiging"],
    thumbnailBorderColor: "rgb(237, 51, 37)",
    productWithSummaryUrl: `${testUrl}catalog?location=product%3d9789492991003`,
    productSummaryTitle: ["Samenvatting","Description"],
    productSpecificationTitle: ["Specificaties","Specifications"],
    productLeesMeerCutOff: 245,
    freeShippingThreshold: 40,
    freeShippingMessageTemplate: "Voeg €<price> toe en ontvang gratis verzending",
    checkoutProductUrl: `${testUrl}boeken/wereld-voetbal-recordboek-2019-9789492899194`,//catalog?location=product%3d9789492920508`,
    shippingOptionTitle: "Bezorgen of ophalen",
    productWithSpecificationUrl: `${testUrl}catalog?location=product%3d9789021407098`,
    productCTAUrl: `${testUrl}boeken/formule-1-2019-fast-forward-9789492920508`,
    registerValidationTips: ["Enter salutation,Enter your first name,Enter surname,Enter zip code,Enter house number,Enter address,Enter a city,Enter a valid email address,Password needs to be at least 8 characters long,Passwords do not match","Je moet een aanhef kiezen,Enter your first name,Enter surname,Voer een geldige postcode in,Enter house number,Enter address,Enter a city,Voer een geldig e-mailadres in,Het wachtwoord moet minstens 8 tekens lang zijn,De wachtwoorden komen niet overeen"],
    registerUserData: '',
    loginTitle: 'Inloggen',
    loginDescription: ['Log in op jouw account!','Log in om je laastste bestellingen te kunnen zien!'],
    registerTitle: ['Not a member yet?','Nog geen account?'],
    registerDescription: ['An account is not required, but can be very usefull.','Met een account kun je sneller bestellen en krijg je toegang tot:'],
    registerList: ["Deals You'll love,Low price guaranteed,Delivery or free pick up","Jouw bestellingsoverzicht,Jouw eigen verzameling eBooks,Jouw verlanglijstje"],
    loginValidationTips: ["Enter a valid email address,Password needs to be at least 8 characters long","Voer een geldig e-mailadres in,Het wachtwoord moet minstens 8 tekens lang zijn"],
    loginFailTips: ['Invalid email or password','Ongeldig e-mailadres of wachtwoord'],
    loginFailEmail: 'wrong@wrong.wrong',
    loginFailPassword: 'wrong',
    loginEmail: 'email' + timpStamp + '@test.com',//'email1546847586194@test.com',////'email1546825790374@test.com',////'email1545904912259@test.com',//'email1545113068904@test.com',////,//////'email1544497446478@test.com',////'johndoe@gmail.com',////'email1544147817898@test.com',//'email1544059308824@test.com',////
    loginPassword: 'test.123',
    editPassword: 'test.1234',
    countryCode: {
        'Nederland' : 'NLD',
        'België' : 'BEL'
    },
    userInfo: {
        gender: 'M',
        firstName:'fisrtName',
        middleName:'middleName',
        lastName:'lastName',
        company:'company',
        country:'NLD',
        zipCode:'1234 AB',
        houseNum:timpStamp.substring(0, 3),
        address:'address' + timpStamp,
        city:'city' + timpStamp,
        addition:timpStamp.substring(0, 3)
    },
    paymentMethodsTitle: ['Betaalmethode', 'Betaalwijze'],
    chosenPaymentOption: 'CreditCard',
    paymentMethodSummaryTitle: ['Payment', 'Betaalwijze'],
    paymentMethodSummaryEditButton: 'Wijzig',
    creditCardBrand: ['American Express_brand', 'VISA_brand', 'Eurocard_brand', 'BCMC_brand'],
    mastercardNum: '5399999999999999',
    expireMonth: '12',
    expireYear: '2022',
    verificationCode: '123',
    checkoutMessageTitle: 'Bedankt!',
    checkoutMessageDescription: 'Je ordernummer is <orderNum>. Je ontvangt een bevestiging van je bestelling op de mail. We gaan meteen voor je aan de slag!',
    homeDeliverProductUrl: `${testUrl}register-atlanta-321x226mm-2x4kolommen-108blz-000450`,
    homeDeliverProductShippingInfo: 'Dit product kan alleen worden thuis bezorgd binnen Nederland',
    ebookProductUrl: `${testUrl}papia-papiamentu-ku-mi-2-9789492926166`,
    lineItemDeleteLinkText: 'Verwijder',
    cartListProductUrl: `${testUrl}amstel-tracks-now-by-amstel-quartet-0608917253429`,//insight-guides-provence-9789812584144`,//catalog?location=product%3d9789492920508`, //`${testUrl}rugzak-eastpak-tordi-blauw-5415187698783`,
    cartListEbookProductUrl: `${testUrl}catalog?location=product%3d9789492991003`,//9789492991003
    deliveryMoment: ['Immediate delivery', 'Next day delivery', 'Day after tomorrow delivery', 'Within seven days delivery', 'After seven days delivery','1 dag levertjid'],
    ebookDeliveryMoment: 'Directe download na aankoop',
    freeShippingOrderSubtotal: '40',
    defaultShippingCost: '1,95',
    shippingMethodHomeDelivery: 'Thuis laten bezorgen',
    shippingMethodStoreFetch: 'Ophalen in een Bruna winkel',
    countryShippingCost: {
        'BEL': '3,95',
        'NLD': '1,95'
    },
    filterBrandTitle: 'Merk',
    filterCategoryTitle: 'Categorie',
    filterPriceTitle: 'Prijs',
    sortOptions: {
        'sortAesc': '/sortby-price',
        'sortDesc': '/sortby-price-desc'
    },
    seachType: {
        'title': 'title',
        'binding': 'binding',
        'brand': 'brand',
        'author': 'author'
    },
    myAccountPersonalInfoSubtitle: 'View or edit your personal details',
    myAccountPersonalInfoUpdateTips: ['Personal details updated successfully.','De wijzigingen zijn opgeslagen'],
    myAccounrResetPasswordTips: ['Password successfully changed','Het wachtwoord is gewijzigd'],
    checkoutTitleStep2: 'Maak een account',
    checkoutErrorMessage: 'Er is een fout opgetreden. Probeer later opnieuw. Bent u de eigenaar of de designer van deze website? Meld u dan aan in het backoffice van Ingenico om de details van de foutmelding te bekijken.',
    checkoutErrorMessage1: 'Er is een fout opgetreden, probeer het later opnieuw. Als u de eigenaar of integrator van deze website bent, meld u dan aan bij de backoffice van  om de details van de fout te zien.',
    ebookShippingMethod: 'Digitale levering',
    loginUrl: [`${testUrl}account/orders-overview`,`${testUrl}account/mijn-bestellingen`],

    beforeEach: (browser, done) => {
        var args = require('minimist');
        var argv = args(process.argv);
        if (argv != null && argv != undefined) {
            if (argv.env == "smoke") {
                browser.globals.environment = argv.env;
            } else if (argv.env == "dev") {
                browser.globals.environment = argv.env;
            } else if (argv.env == "stage") {
                browser.globals.environment = argv.env;
            }
        } else {
            browser.globals.environment = "default";
        }

        console.log("Run against:" + browser.globals.environment);
        done();
    }
}