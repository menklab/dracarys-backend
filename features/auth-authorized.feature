Feature: Check that user is able to use endpoints with authorization

  Scenario Outline: Requested endpoint should return status 200 when user is authorized
    Given link "<link>"
    When use link to make a "<method>" api request
    Then I should get response "<status>"

  Examples:
    | link                                | method | status |
    | program                             | GET    | 200    |
    | account                             | GET    | 200    |
    | account-element                     | GET    | 200    |
    | instruction?programId=1             | GET    | 200    |
    | instruction-element                 | GET    | 200    |
