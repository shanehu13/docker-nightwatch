@public
Feature: Public Functions
    Static check in the header and footer
    @homepage
    Scenario: Open homepage
        Given open the bruna homepage

    @menu
    Scenario Outline: Subcategory <menu_text>
        When move mouse to the category text
        Then the subcategory list show
        And check subcategory name <menu_text> and url <menu_url> with index <menu_index>
        When move mouse out of subcategory
        Then subcategory fold again

        Examples:
            | menu_index | menu_text | menu_url |
            # | 0          | Boeken top 10                        | https://domain/boeken-top-10                                                                   |
            # | 1          | Boeken top 100                       | https://domain/boeken-top-100                                                                  |
            # | 2          | Kinderboeken top 10                  | https://domain/kinderboeken-top-10                                                             |
            # | 3          | Thriller top 10                      | https://domain/thriller-top-10                                                                 |
            # | 4          | Literatuur & roman top 10            | https://domain/literatuur-en-roman-top-10                                                      |
            # | 5          | Alle toplijsten                      | https://domain/boeken                                                                          |
            # | 6          | Literaire non-fictie                 | https://domain/boeken/nederlandse-boeken/literatuur-romans/non-fictie                          |
            # | 7          | Biografieën                          | https://domain/boeken/nederlandse-boeken/literatuur-romans/non-fictie/biografie-van-schrijvers |
            # | 8          | Poëzie                               | https://domain/boeken/nederlandse-boeken/literatuur-romans/poezie                              |
            # | 9          | Literatuur                           | https://domain/boeken/nederlandse-boeken/literatuur-romans/literatuur                          |
            # | 10         | Romans                               | https://domain/boeken/nederlandse-boeken/literatuur-romans/romans                              |
            # | 11         | Alle literatuur & romans             | https://domain/boeken/nederlandse-boeken/literatuur-romans                                     |
            # | 12         | eBooks                               | https://domain/boeken/ebooks                                                                   |
            # | 13         | Engelse boeken                       | https://domain/boeken/engelse-boeken                                                           |
            # | 14         | Nieuwe boeken                        | https://domain/nieuwe-boeken                                                                   |
            # | 15         | Te reserveren titels                 | https://domain/boeken                                                                          |
            # | 16         | Donald Duck weken                    | https://domain/donald-duck                                                                     |
            # | 17         | Alle boeken                          | https://domain/boeken/all                                                                      |
            # | 18         | Leesboeken                           | https://domain/boeken/nederlandse-boeken/kinderboeken/leesboeken                               |
            # | 19         | Prentenboeken                        | https://domain/boeken/nederlandse-boeken/kinderboeken/prentenboeken                            |
            # | 20         | Leren lezen                          | https://domain/boeken/nederlandse-boeken/kinderboeken/leren-lezen                              |
            # | 21         | Leerzame boeken                      | https://domain/boeken/nederlandse-boeken/kinderboeken/informatieve-boeken                      |
            # | 22         | Luisterboeken                        | https://domain/boeken/nederlandse-boeken/kinderboeken/luisterboeken-muziek                     |
            # | 23         | Voorleesboeken                       | https://domain/boeken/nederlandse-boeken/kinderboeken/verhalen-sprookjes                       |
            # | 24         | Alle kinderboeken                    | https://domain/boeken/nederlandse-boeken/kinderboeken                                          |
            # | 25         | Literatuur & Romans                  | https://domain/                                                                                |
            # | 26         | Thrillers & spanning                 | https://domain/                                                                                |
            # | 27         | Kookboeken                           | https://domain/boeken/kookboeken                                                               |
            # | 28         | Fantasy                              | https://domain/                                                                                |
            # | 29         | Lifestyleboeken                      | https://domain/boeken/nederlandse-boeken/sport-hobby-lifestyle/lifestyle                       |
            # | 30         | Kinderboeken                         | https://domain/                                                                                |
            # | 31         | Gezondheid & psychologie boeken      | https://domain/boeken/nederlandse-boeken/gezondheid-psychologie                                |
            # | 32         | Young adult                          | https://domain/                                                                                |
            # | 33         | Sportboeken                          | https://domain/boeken/sportboeken                                                              |
            # | 34         | Kookboeken                           | https://domain/                                                                                |
            # | 35         | Creatieve boeken                     | https://domain/boeken/nederlandse-boeken/sport-hobby-lifestyle/creatieve-hobby-s               |
            # | 36         | Alle sport, hobby & lifestyle-boeken | https://domain/boeken/nederlandse-boeken/sport-hobby-lifestyle                                 |
            # | 37         | Kunst & cultuur                      | https://domain/                                                                                |
            # | 38         | Studieboeken                         | https://domain/                                                                                |
            # | 39         | Computer & internet                  | https://domain/                                                                                |
            # | 40         | Business & Communicatie              | https://domain/                                                                                |
            # | 41         | Geschiedenis & Maatschappij          | https://domain/                                                                                |
            # | 42         | Woordenboeken                        | https://domain/boeken/nederlandse-boeken/taal/woordenboeken                                    |
            # | 43         | Studieboeken                         | https://domain/boeken/studieboeken                                                             |
            # | 44         | Reizen & vakantie                    | https://domain/boeken/reizen-vakantie                                                          |
            # | 45         | Young adult                          | https://domain/boeken/young-adult                                                              |
            # | 46         | Fantasy & science fiction            | https://domain/boeken/fantasy-science-fiction                                                  |
            # | 47         | Alle boekcategorieën                 | https://domain/boeken/nederlandse-boeken                                                       |
            # | 48         | Literaire thrillers                  | https://domain/boeken/nederlandse-boeken/thrillers-spanning/literaire-thrillers                |
            # | 49         | Scandinavische thrillers             | https://domain/scandinavische-thrillers                                                        |
            # | 50         | Detectives                           | https://domain/boeken/nederlandse-boeken/thrillers-spanning/detectives                         |
            # | 51         | Horror                               | https://domain/boeken/nederlandse-boeken/thrillers-spanning/horror-griezel                     |
            # | 52         | Alle thriller boeken                 | https://domain/boeken/nederlandse-boeken/thrillers-spanning                                    |
            | 0  | Literatuur & Romans         | http: |
            | 1  | Thrillers & spanning        | http: |
            | 2  | Fantasy                     | http: |
            | 3  | Kinderboeken                | http: |
            | 4  | Young adult                 | http: |
            | 5  | Kookboeken                  | http: |
            | 6  | Reizen & vrije tijd         | http: |
            | 7  | Kunst & cultuur             | http: |
            | 8  | Studieboeken                | http: |
            | 9  | Computer & internet         | http: |
            | 10 | Business & Communicatie     | http: |
            | 11 | Geschiedenis & Maatschappij | http: |
            | 12 | Alle boeken                 | http: |
            | 13 | Nieuw verschenen            | http: |
            | 14 | Te reserveren               | http: |
            | 15 | Spannende Boeken Weken      | http: |
            | 16 | Boeken top 100              | http: |
            | 17 | Engelstalige boeken         | http: |
            | 18 | Nederlandstalige boeken     | http: |
            | 19 | Populaire e-books           | http: |
            | 20 | Alle e-books                | http: |

    @logo
    Scenario: Logo check
        When click the logo
        And redirect to homepage

    @usp
    Scenario: Usp check
        Then the usp show
        And the customer service link show
        And the bruna folder link show

    @legal_frameworks
    Scenario: Legal frameworks
        When click the voorwaarden link
        Then redirect to the conditions page
        When click the Privacy-en Cookiebeleid link
        Then redirect to the Privacy and Cookie Policy page

    @copyrights
    Scenario: Copyrights
        Then check the copyrights link text

    @social_media
    Scenario: Social media
        Then check the social media link url

    @payment_shipping_options
    Scenario: Payment shipping options
        Then check the payment and shipping options icon

    @service_page_link
    Scenario Outline: Service page link of <link_text>
        Then verify the header <link_header> is not clickable
        And check the link text of <link_text> with index <link_index>
        And check the link url <link_url> of <link_text> with index <link_index>

        Examples:
            | link_index | link_header        | link_text                | link_url |
            | 0          | Klantenservice     | Veelgestelde vragen      | http:    |
            | 1          | Klantenservice     | Verzenden & retourneren  | http:    |
            | 2          | Klantenservice     | Betalen                  | http:    |
            | 3          | Klantenservice     | Bruna cadeaukaart        | http:    |
            | 4          | Klantenservice     | Contact                  | http:    |
            | 5          | Winkelen bij Bruna | De voordelen van Bruna   | http:    |
            | 6          | Winkelen bij Bruna | Winkels & openingstijden | http:    |
            | 7          | Winkelen bij Bruna | Assortiment in de winkel | http:    |
            | 8          | Winkelen bij Bruna | Bruna cadeaukaart        | http:    |
            | 9          | Winkelen bij Bruna | Servicepunten            | http:    |
            | 10         | Over Bruna         | De organisatie           | http:    |
            | 11         | Over Bruna         | In de pers               | http:    |
            | 12         | Over Bruna         | Werken bij Bruna         | http:    |
            | 13         | Over Bruna         | Franchiser worden        | http:    |

    @promotional_banner
    Scenario: Promotional banner
        Given the promotional banner is shown
        Then check the banner title and subtitle
        And check the banner description
        When click the banner CTA link
        Then redirect to the promotional product detail page
        And check the banner image

    @recent_viewed_product
    Scenario: Recent viewed product
        When recent viewed product list is shown
        Then show the message
        When view a product and return to homepage
        Then the viewed product list will contain the product recent viewed

    @promoted_product_list
    Scenario: Promoted product list
        When promoted product list is shown
        Then check the promoted product list title
        And check the promoted product list subtitle
        When click the promoted product list link
        Then redirect to the promoted product list page

    @cart
    Scenario: Cart entrypoint
        Then check the cart link on the homepage and click
        And redirect to the cart page

    @trust_buying
    Scenario: Trust buying
        When click the trust buying icon
        Then redirect to the trust buying website

    @hero_image_banner
    Scenario: Hero image banner
        Given the hero image banner is shown
        Then check the banner text and overlay text
        When click the CTA link text
        Then redirect to the product detail page
    # When click the hero image
    # Then redirect to the product detail page


    @customer_service_block
    Scenario: Customer service block
        Then check the customer service block icon
        And check the customer service block title text
        And check the customer service block title url
        And check the customer service block description
        And check the customer service block phone number text
        And check the customer service block phone number url


    @find_my_bruna_store
    Scenario: Find my bruna store
        Then check the find my bruna store icon
        And check the find my bruna store title text
        And check the find my bruna store title url
        And check the find my bruna store description
        And check the find my bruna store link text
        And check the find my bruna store link url

    @find_a_store_entry_point
    Scenario: Find my bruna store
        Then check the find store text
        And check the find store icon
        And check the find store url

    @wishlist
    Scenario: Wishlist entrypoint
        Given check the wishlist link in the header
        Then add a product into wishlist
        And click the wishlist icon to enter the wishlist page
        And redirect to the wishlist page
        And move product into cart
        When click the cart icon to enter cart page
        Then the product quantity should be right

    @my_store
    Scenario: Choose your store
        Given click the my store link in the header
        When input the search key word and click the search button
        Then the store search result will show
        Then click the cancel button and check store search result
        When choose the filter day check box and choose a store search result
        Then the store detail will show correct