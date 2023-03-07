Feature: Check that user is not able to use endpoints without authorization

  Scenario Outline: Requested endpoint should return status 404 when user is not authorized
    Given api link "<link>"
    When use given link to make a "<method>" api request
    Then I should get "<status>"

  Examples:
    | link                    | method | status |
    | auth/requestMessage     | GET    | 200    |
    | program                 | GET    | 404    |
    | program/1               | GET    | 404    |
    | program                 | POST   | 404    |
    | program/1               | PATCH  | 404    |
    | program/1               | DELETE | 404    |