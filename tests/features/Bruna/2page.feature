@page
Feature: Page Functions
    Functions in the clp and plp
    Scenario: Open homepage
        Given open the bruna homepage

    @product_list_plp
    Scenario:Product list in the PLP page
        When enter the plp page
        Then check the product list item title
        And check the product list item image
        And check the product list item price
        When check the product list item add to wishlist button
        Then click the add to wishlist button to add product
        And add to wishlist success
        When check the product list item add to cart button
        Then click the add to cart button to add product
        And add to cart success

    @enter_clp
    Scenario: Enter CLP page
        Given enter CLP page

    @subcategory_navigation
    Scenario Outline: Subcategory <subcategory_name> navigation
        When click the <category_name> with index <category_index>
        Then subcategory name is <subcategory_name> with index <category_index> and <subcategory_index>
        And the url of <subcategory_name> is <subcategory_link_url> with index <category_index> and <subcategory_index>

        Examples:
            | category_index | category_name | subcategory_index | subcategory_name | subcategory_link_url |
            # | 0              | Genres        | 0                 | Alle boeken                | https://domain/boeken/nederlandse-boeken      |
            # | 0              | Genres        | 1                 | Literatuur en romans       | https://domain/boeken/literatuur-romans       |
            # | 0              | Genres        | 2                 | Thrillers en spanning      | https://domain/boeken/thrillers-spanning      |
            # | 0              | Genres        | 3                 | Fantasy en science fiction | https://domain/boeken/fantasy-science-fiction |
            # | 0              | Genres        | 4                 | Kinderboeken               | https://domain/boeken/kinderboeken            |
            # | 0              | Genres        | 5                 | Kookboeken                 | https://domain/boeken/kookboeken              |
            # | 0              | Genres        | 6                 | Sportboeken                | https://domain/boeken/sportboeken             |
            # | 0              | Genres        | 7                 | Studieboeken               | https://domain/boeken/studieboeken            |
            # | 0              | Genres        | 8                 | Young adult                | https://domain/boeken/young-adult             |
            # | 1              | E-books       | 0                 | eBooks                     | https://domain/boeken/ebooks                  |
            # | 1              | E-books       | 1                 | eBook top 10               | https://domain/ebook-top-10                   |
            # | 1              | Talen         | 0                 | Engelstalige boeken        | https://domain/boeken/engelse-boeken          |
            # | 1              | Talen         | 1                 | Duitstalige boeken         | https://domain/boeken/duitse-boeken           |
            # | 2              | Talen         | 2                 | Franstalige boeken         | https://domain/boeken/franse-boeken           |
            # | 2              | Talen         | 3                 | Spaanstalige boeken        | https://domain/boeken/spaanse-boeken          |
            | 0 | Genres  | 0 | Alle boeken             | https://domain/catalog-presentation/default |
            | 0 | Genres  | 1 | Literatuur & Romans     | https://domain/                             |
            | 0 | Genres  | 2 | Thriller & spanning     | https://domain/                             |
            | 0 | Genres  | 3 | Fantasy                 | https://domain/                             |
            | 0 | Genres  | 4 | Kinderboeken            | https://domain/                             |
            | 0 | Genres  | 5 | Young adult             | https://domain/                             |
            | 0 | Genres  | 6 | Kookboeken              | https://domain/                             |
            | 1 | Auteur  | 0 | Spannende Boeken Weken  | https://domain/                             |
            | 1 | Auteur  | 1 | Te reserveren           | https://domain/                             |
            | 2 | E-books | 0 | Alle e-books            | https://domain/                             |
            | 2 | E-books | 1 | Populaire e-books       | https://domain/                             |
            | 3 | Talen   | 0 | Engelstalige boeken     | https://domain/                             |
            | 3 | Talen   | 1 | Nederlandstalige boeken | https://domain/                             |

    @enter_plp_page
    Scenario: Enter product listing page
        Given open homepage and click the Bekijk alles link

    @filter_result
    Scenario: Filter result number
        Given the filter result number is show
        When choose the brand in filter
        Then the filter result will change

    @reset_filter
    Scenario: Reset filter
        When click the reset link
        Given the default filter result is show
        And choose a new brand
        When click the reset link
        Then the filter will be reset

    @catalog_title
    Scenario: Catalogue title in PLP page
        When click the product in the list
        Then enter the pdp page and click the product brand or author link
        And return the PLP page and the catalogue title show correctly

    @page_navigation
    Scenario: Page navigation
        Given the page number link is show
        When click the page number link
        Then redirect to the correct page
        When click the left arrow
        Then redirect to the previous page
        When click the right arrow
        Then redirect to the next page

    @clp_list_banner
    Scenario: Product list and banner in CLP page
        Then the product list title is show
        And the product list sub title is show
        And the product title is show
        And the product author is show
        And the product price is show
        And the add to wishlist button is show
        When click the add to wishlist button
        Then add product into wishlist successful
        When click the Bekijk alles link
        Then redirect to the PLP page
        When return the CLP page
        Then banner title is show
        And banner subtitle is show
        And banner description is show
        And banner image is show
        When check the CTA link
        Then redirect to the PDP page
        When click the wis alles link
        Then clear the recent viewed product list

    @process_indicator
    Scenario: Process indicator
        Given open the homepage
        Then clear the cart
        And click the cart icon
        And check the process indicator

    @filter_plp
    Scenario:Filter in the PLP page
        When enter the plp page to choose filter
        Then check the brand filter title
        And check the category filter title
        And check the price filter title
        When choose a brand filter
        Then the brand filter result is correct
        And click the filter reset
        When set a price filter
        Then the price filter result is correct

    @sort_plp
    Scenario:Sort in the PLP page
        When choose the Prijs oplopend in the sort dropdown list
        Then the product filter result show correct in ascending order
        When choose the Prijs aflopend in the sort dropdown list
        Then the product filter result show correct in descending order

    @search_item
    Scenario Outline: Search items by <type>
        Given open the homepage and input the <keyword> and click the search button
        Then redirect to the search result page
        And the search result is correct when seach in <type> with <keyword> and <selector>

        Examples:
            | type    | selector                                                | keyword  |
            | title   | span.product-title.gradient-overlay > a > span          | Provence |
            | binding | div.price-container > a > div > div:nth-child(2) > span | E-BOOK   |
            | author  | div.product-authors.gradient-overlay > a > ul > li      | Aurélie |
            | brand   | div > span.product-brand.gradient-overlay               | Atlanta  |