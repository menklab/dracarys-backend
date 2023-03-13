Feature: Check that user is not able to use endpoints without authorization

  Scenario Outline: Requested endpoint should return status 404 when user is not authorized
    Given api link "<link>"
    When use given link to make a "<method>" api request
    Then I should get "<status>"

  Examples:
    | link                                | method | status |
    | auth/requestMessage                 | GET    | 200    |
    | program                             | GET    | 404    |
    | program/1                           | GET    | 404    |
    | program                             | POST   | 404    |
    | program/1                           | PATCH  | 404    |
    | program/1                           | DELETE | 404    |
    | account                             | GET    | 404    |
    | account/1                           | GET    | 404    |
    | account                             | POST   | 404    |
    | account/1                           | PATCH  | 404    |
    | account/1                           | DELETE | 404    |
    | account/generate-code               | GET    | 404    |
    | account-element                     | GET    | 404    |
    | account-element/1                   | GET    | 404    |
    | account-element                     | POST   | 404    |
    | account-element/1                   | PATCH  | 404    |
    | account-element/1                   | DELETE | 404    |
    | account-element/1                   | DELETE | 404    |
    | instruction                         | GET    | 404    |
    | instruction/1                       | GET    | 404    |
    | instruction                         | POST   | 404    |
    | instruction/1                       | PATCH  | 404    |
    | instruction/1                       | DELETE | 404    |
    | instruction/generate-code           | GET    | 404    |
    | instruction-element                 | GET    | 404    |
    | instruction-element/1               | GET    | 404    |
    | instruction-element                 | POST   | 404    |
    | instruction-element/1               | PATCH  | 404    |
    | instruction-element/1               | DELETE | 404    |
    | instruction-element/generic-types   | GET    | 404    |