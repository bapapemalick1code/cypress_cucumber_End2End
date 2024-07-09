Feature: Login

  Scenario Outline: Successful login with valid credentials
    Given I open the OrangeHRM login page
    When I enter "<username>" and "<password>"
    And I click the login button
    Then I should see the dashboard page

    Examples:
      | username | password   |
      | Admin    | admin123   |
     


Scenario Outline: login with invalid credentials
    Given I open the OrangeHRM login page
    When I enter invalid "<username>" and "<password>"
    And I click the login button
    Then I should see the message error

    Examples:
      | username | password   |
      | User1    | admin123   |
      | User2    | password2  |
      | User3    | password3  |  
