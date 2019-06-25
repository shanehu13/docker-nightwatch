@test
Feature: Baidu Search

Scenario: Searching Baidu

  Given I open Baidu's search page
  Then the title is "百度一下，你就知道"
  And the Baidu search form exists