Feature: Naviguer sur le site de cypress

    Feature Description 

Scenario: Acceder au cours
    //Given I am on the homepage
    When I click on "start learning" button
    Then I should have access to the courses


Scenario: Acceder aux exemples
    //Given I am on the homepage
    When I click on "See Examples" button
    Then I should have access to the examples page