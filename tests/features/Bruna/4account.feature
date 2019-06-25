@account
Feature: Account functions
    Functions about user account
    Scenario: Open homepage
        Given open the bruna homepage
    
    @register
    Scenario: Register page function
        Given open the homepage and click the Mijn Bruna in the header
        Then the popup dialogue show
        And check the register dialogue info
        When click create account button
        Then redirect to the register page
        When click the register button
        Then all the validation tips show correctly
        When input the register info correctly and click the register button
        Then will redirect to register successful page
        And click the Mijn Bruna and check the dialogue info
        When input the empty login info and click the login button
        Then the validation tips show
        When input the wrong login info and click the login button
        Then the login failed tips show
        When input the correct login info and click the login button
        Then login successful

    @login
    Scenario: login with email and password
        Given click the my account
        Then input email and password to login

    @addressbook
    Scenario: Addressbook in the my account
        Given add address info
        Then edit address info
        And delete address info

    @wishlist_account
    Scenario: Wishlist in the my account
        Given add a product into wishlist and go to my account
        Then the wishlist info is correct in the my account and clear the wishlist
        And add product again and add product into the cart from wishlist

    @personal_info_myaccount
    Scenario: Personal info in my account
        Given enter the personal info page in my account
        Then personal info show correct
        When update the personal info
        Then update the personal info success

    @reset_password_myaccount
    Scenario: Reset password in my account
        Given upadate the password
        Then login with the new password
        When restore to the old password in my account
        Then login with old password should be success
        And logout success

    @shipping_store
    Scenario: Verify the store info during check out
        Given choose pick up in store in the cart
        Then verify the store info in the next steps