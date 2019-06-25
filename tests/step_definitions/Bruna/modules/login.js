const globals = require('../../../global');

var login = {
    accountLogin: function(email,password){
        var sec = this.section.pop.section.login
        this.api.pause(globals.miniWaitTime)
        sec.setValue('@email', email,function(){
            console.log('input email success.')
        })
        this.api.pause(globals.miniWaitTime)
        sec.setValue('@password', password,function(){
            console.log('input password success.')
        })
        this.api.pause(globals.miniWaitTime)
        sec.click('@loginButton',function(){
            console.log('click the login button success.')
        })
        this.api.pause(globals.longWaitTime)
        this.api.pause(globals.longWaitTime)
        return this
    }
}

var closePopup = {
    closePopupDialogue: function(){
        var sec = this.section.pop
        sec.waitForElementVisible('@closeButton')
        sec.click('@closeButton',function(){
            console.log('click the close button success.')
        })
        this.api.pause(globals.miniWaitTime)
        return this
    }
}

var waitForPopup = {
    waitForPopupDialogue: function(){
        var sec = this.section.pop
        sec.waitForElementVisible('@closeButton','the login pop up dialogue show success.')
        return this
    }
}

 module.exports = {
    commands: [
        login,
        closePopup,
        waitForPopup
    ],
    sections:{
        pop:{
            selector: '.popup',
            elements:{
                closeButton:{
                    selector: '.close-popup'
                }
            },
            sections:{
                register: {
                    selector: '.register',
                    elements: {
                        registerTitle: {
                            selector: 'div.register > h2'
                        },
                        registerDescription: {
                            selector: 'div.register > p'
                        },
                        registerListInfo: {
                            selector: '.usp-linklist'
                        },
                        registerButton: {
                            selector: '.button-bottom'
                        }
                    }
                },
                login: {
                    selector: '.login-form-login',
                    elements: {
                        loginTitle: {
                            selector: 'div.login-form-login > h2'
                        },
                        loginDescription: {
                            selector: 'div.login-form-login > p'
                        },
                        email: {
                            selector: '#emailLogin'
                        },
                        password: {
                            selector: '#password'
                        },
                        loginButton: {
                            selector: 'form.regForm > div > div > button'
                        }
                    }
                },
            }
        }
    }
} 