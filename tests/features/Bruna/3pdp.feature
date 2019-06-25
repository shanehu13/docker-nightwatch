@pdp
Feature: PDP Functions
    Functions in the pdp
    Scenario: Open homepage
        Given open the bruna homepage
    
    @cta_in_pdp
    Scenario Outline: CTA link in PDP page
        When choose a <quantity> quantity and click the add to cart button
        Then the cart icon number will show correct
        When click the cart icon in pdp page
        Then the product is in the cart page and info is correct
        And clear the cart and return to the pdp page

        Examples:
            | quantity |
            | min      |
            | max      |
            | middle   |

    @breadcump
    Scenario: Breadcump
        Given open homepage and click a product image
        Then the breadcump is show correct

    @upselling_list
    Scenario: Upselling list in PDP page
        Then promoted product list should not be empty
        And the recent view product list should contain the current product

    @carousel_media
    Scenario: Product carousel media
        Given the carousel image thumbnails are display
        When click on the thumbnails
        Then the thumbnails will be surounded by red line
        And the carousel image will show on the right

    @product_title_in_pdp
    Scenario: Product title in PDP page
        When enter the PDP page
        Then the product title show correctly
        And the product author or brand show correctly

    @wishlist_in_pdp
    Scenario: Wishlist function in PDP page
        When click the add to wishlist button in pdp page
        Then the wishlist icon number will plus one
        When click the wishlist icon
        Then the product is in the wishlist page

    @product_bindings
    Scenario: Product bindings in the PDP page
        When open the detail page of product with bindings
        Then the bindings show correctly
        And the bindings title and price show
        When click the bindings
        Then the redirect to another detail page

    @product_summary
    Scenario: Product summary in the PDP page
        When open the PDP page
        Then the product summary show
        When click the show more link
        Then the summary show completely

    @product_specification
    Scenario: Product specification in the PDP page
        Given the product specification show
        When click the lees meer link
        Then the specification show completely

    @ebook_quantity
    Scenario: Ebook quantity check
        When open the ebook pdp page
        Then the quanitity should be fixed
        When add ebook into cart
        Then check the quantity in the item list in cart page