Feature: Check that user is able to perform create, read, update and delete operations in api modules

  Scenario Outline: User is able to perform create, read, update and delete operations in api modules
    Given module "program"
    When create new entity with "{\"name\": \"Program1\"}" data in program module
    Then I get response "201"
    When read newly created entity
    Then I get response "200"
    When update newly created entity with "{\"name\": \"Program1Updated\"}" data
    Then I get response "200"

    Given module "account"
    When create new entity with "{\"name\": \"Account1\"}" data in account module
    Then I get response "201"
    When read newly created entity
    Then I get response "200"
    When update newly created entity with "{\"name\": \"Account1Updated\"}" data
    Then I get response "200"

    Given module "account-element"
    When create new entity with "{\"name\": \"account_element_1\", \"type\": \"String\"}" data in account-element module
    Then I get response "201"
    When read newly created entity
    Then I get response "200"
    When update newly created entity with "{\"name\": \"account_element_1_updated\", \"type\": \"String\"}" data
    Then I get response "200"

    Given module "instruction"
    When create new entity with "{\"name\": \"Instruction1\"}" data in instruction module
    Then I get response "201"
    When read newly created entity
    Then I get response "200"
    When update newly created entity with "{\"name\": \"Instruction1Updated\"}" data
    Then I get response "200"

    Given module "instruction-element"
    When create new entity with "{\"order\": 1, \"name\": \"instruction_element_1\", \"mut\": false, \"accountType\": \"SystemAccount\", \"genericType\": {\"id\": null, \"type\": \"TokenAccount\", \"name\": \"TokenAccount\"}}" data in instruction-element module
    Then I get response "201"
    When read newly created entity
    Then I get response "200"
    When update newly created instruction-element entity with "{\"order\": 1, \"name\": \"instruction_element_1_updated\", \"mut\": false, \"accountType\": \"SystemAccount\", \"genericType\": {\"id\": null, \"type\": \"TokenAccount\", \"name\": \"TokenAccount\"}}" data
    Then I get response "200"

    Given module "instruction-element"
    When delete newly created instruction-element entity
    Then I get response "204"

    Given module "instruction"
    When delete newly created instruction entity
    Then I get response "204"

    Given module "account-element"
    When delete newly created account-element entity
    Then I get response "204"

    Given module "account"
    When delete newly created account entity
    Then I get response "204"

    Given module "program"
    When delete newly created program entity
    Then I get response "204"
