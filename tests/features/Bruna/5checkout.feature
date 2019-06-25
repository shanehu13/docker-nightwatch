@checkout_flow
Feature: Check out function
    Check out function
    Scenario: Open homepage
        Given open the bruna homepage

    @logout
    Scenario: Logout current account
        Given enter my account
        Then click logout menu to logout

    @free_shipping_message
    Scenario: Free shipping message during the checkout
        Given add product into cart and enter the cart
        Then the free shipping message show correctly

    @total_summary
    Scenario: Order total summary in the check out flow Step 1
        Given choose a shipping option
        Then the product price in the summary show correct
        And the shipping fee in the summary show correct
        And the tax in the summary show correct
        And the order total price is correct
        And the giftcode option show correctly

    @shipping_option
    Scenario: Shipping option in the check out flow step 1
        Given enter a pdp page and choose a quantity to add into cart
        When click the cart icon to check the shipping options
        Then the shipping option title is show
        And the shipping option text is show
        And the shipping option description is show

    @delivery_info
    Scenario: Delivery or shipping info in the PDP page
        When enter the pdp page to check the delivery info
        Then the delivery info is correct

    @home_deliver_product
    Scenario: Only home deliverable product
        When add home deliverable product into cart
        Then check the shipping info in the product list

    @product_list_checkout
    Scenario: Product list during checkout
        When open the pdp page
        Then verify the delivery moment
        And add into cart and enter cart page
        Then check the product list info
        And verify the delivery moment in the cart page
        And delete all the products

    @delivery_moment_on_pdp_ebook
    Scenario: Verify the delivery momoent of ebook product in the PDP page
        When open an ebook pdp page
        Then verify the ebook details
        And verify the ebook delivery moment and add into cart

    @product_list_checkout_ebook
    Scenario: Product list during checkout
        Then enter cart page tocheck the ebook product list info
        And verify the ebook binding in the cart page
        And delete all the ebook products

    @personal_info_checkout
    Scenario: Personal info during the check out flow
        Given click the to shipping button
        Then check the newsletter subscription status without login
        When return the checkout flow step 1 and click the next button
        Then the login dialogue pop up
        When login the account to continue
        Then navigate to the checkout step 2
        When click the back to shopping basket button
        Then navigate to the checkout step 1
        Then went to the step 2 to input the personal info
        And click the next button to check the personal info

    @payment_method_checkout
    Scenario: Payment method during the check out flow step 3
        Given the payment method title is shown
        And the payment option title and icon is show
        When choose a payment option and click the next step button
        Then chosen payment option will show in the summary in the check out step 4

    @checkout_success_message
    Scenario: Checkout success message
        Given verify the payment page
        Given choose a payment gateway
        When input payment info and click the pay button
        Then show the check out success message
        And the order confirmation show correctly

    # @checkout_error_message
    # Scenario: Checkout error message
    #     Given save the order info when errror occur

    @check_orders
    Scenario: Check orders in the my account
        Given enter my account page
        Then check the order info

    @checkout_ebook
    Scenario: Check out an ebook
        Given search an ebook and add to cart
        Then check out the ebook success

    @checkout_success_message
    Scenario: Checkout success message
        Given verify the payment page
        Given choose a payment gateway
        When input payment info and click the pay button
        Then show the check out success message
        And the order confirmation show correctly

    @ebook_download
    Scenario: Verify the ebook download info in my account
        Given click the ebook menu in my account
        Then verify the download link