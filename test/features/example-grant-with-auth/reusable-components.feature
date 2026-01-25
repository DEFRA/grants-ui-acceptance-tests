Feature: Reusable grants-ui functionality

    @cdp @ci
    Scenario: Use all available components in example journey and analyze accessibility
        Given there is no application state stored for CRN "1100957269" and SBI "107593059" and grant "example-grant-with-auth"

        # start
        Given the user navigates to "/example-grant-with-auth/start"
        And completes any login process as CRN "1100957269"
        Then the user should see heading "Example Grant"
        And the page is analyzed for accessibility
        When the user clicks on "Start now"

        # yes-no-field
        Then the user should be at URL "yes-no-field"
        And should see heading "YesNoField Example"
        And the page is analyzed for accessibility
        When the user selects "No"
        And continues

        # terminal-page
        Then the user should be at URL "terminal-page"
        And should see heading "Terminal Page Example"
        And the page is analyzed for accessibility
        When the user navigates backward
        
        # yes-no-field
        Then the user should be at URL "yes-no-field"
        When the user selects "Yes"
        And continues

        # autocomplete-field
        Then the user should be at URL "autocomplete-field"
        And should see heading "AutocompleteField Example"
        And the page is analyzed for accessibility
        When the user selects "England" for AutocompleteField "Country"
        And continues

        # radios-field
        Then the user should be at URL "radios-field"
        And should see heading "RadiosField Example"
        And the page is analyzed for accessibility
        When the user selects "Option one"
        And continues

        # conditional-page
        Then the user should be at URL "conditional-page"
        And should see heading "Conditional Page Example"
        And the page is analyzed for accessibility
        When the user continues

        # checkboxes-field
        Then the user should be at URL "checkboxes-field"
        And should see heading "CheckboxesField Example"
        And the page is analyzed for accessibility
        When the user selects the following
            | Option two   |
            | Option three |
        And continues

        # number-field
        Then the user should be at URL "number-field"
        And should see heading "NumberField Example"
        And the page is analyzed for accessibility
        When the user enters "100000" for "Enter amount"
        And continues

        # date-parts-field
        Then the user should be at URL "date-parts-field"
        And should see heading "DatePartsField Example"
        And the page is analyzed for accessibility
        When the user enters the date in a week for DatePartsField "datePartsField"
        And continues

        # month-year-field
        Then the user should be at URL "month-year-field"
        And should see heading "MonthYearField Example"
        And the page is analyzed for accessibility
        When the user enters month "08" and year "2025" for MonthYearField "monthYearField"
        And continues
    
        # select-field
        Then the user should be at URL "select-field"
        And should see heading "SelectField Example"
        And the page is analyzed for accessibility
        When the user selects "Option three" for "Select option"
        And continues

        # multiline-text-field
        Then the user should be at URL "multiline-text-field"
        And should see label heading "MultilineTextField Example"
        And the page is analyzed for accessibility
        When the user enters "Lorem ipsum" for MultilineTextField "MultilineTextField Example"
        And continues

        # multi-field-form
        Then the user should be at URL "multi-field-form"
        And should see heading "Multi Field Form Example"
        And the page is analyzed for accessibility
        When the user enters the following
            | FIELD                     | VALUE                                              |
            | Name                      | James Test-Farmer                                  |
            | Email address             | cl-defra-gae-test-applicant-email@equalexperts.com |
            | Mobile number             | 07777 123456                                       |
            | Address line 1            | Test Farm                                          |
            | Address line 2 (optional) | Cogenhoe                                           |
            | Town                      | Northampton                                        |
            | County (optional)         | Northamptonshire                                   |
            | Postcode                  | NN7 1NN                                            |
        And continues

        # summary
        Then the user should be at URL "summary"
        And should see heading "Check your answers"
        And the page is analyzed for accessibility
        And should see the following answers
            | QUESTION         | ANSWER                                             |
            | Yes or No        | Yes                                                |
            | Country          | England                                            |
            | Radio option     | Option one                                         |
            | Checkbox options | Option two                                         |
            |                  | Option three                                       |
            | Enter amount     | 100000                                             |
            | Date             | {DATE IN A WEEK}                                   |
            | Month and year   | August 2025                                        |
            | Select option    | Option three                                       |
            | Description      | Lorem ipsum                                        |
            | Name             | James Test-Farmer                                  |
            | Email address    | cl-defra-gae-test-applicant-email@equalexperts.com |
            | Mobile number    | 07777 123456	                                    |
            | Address          | Test Farm                                          |
            |                  | Cogenhoe                                           |
            |                  | Northampton                                        |
            |                  | Northamptonshire                                   |
            |                  | NN7 1NN                                            |
        When the user chooses to change their summary answer to question "Country"

        # autocomplete-field
        Then the user should be at URL "autocomplete-field"
        And the page is analyzed for accessibility
        When the user selects "Wales" for AutocompleteField "Country"
        And continues

        # summary
        Then the user should be at URL "summary"
        And the page is analyzed for accessibility
        And should see the following answers
            | QUESTION         | ANSWER                                             |
            | Yes or No        | Yes                                                |
            | Country          | Wales                                              |
            | Radio option     | Option one                                         |
            | Checkbox options | Option two                                         |
            |                  | Option three                                       |
            | Enter amount     | 100000                                             |
            | Date             | {DATE IN A WEEK}                                   |
            | Month and year   | August 2025                                        |
            | Select option    | Option three                                       |
            | Description      | Lorem ipsum                                        |
            | Name             | James Test-Farmer                                  |
            | Email address    | cl-defra-gae-test-applicant-email@equalexperts.com |
            | Mobile number    | 07777 123456	                                    |
            | Address          | Test Farm                                          |
            |                  | Cogenhoe                                           |
            |                  | Northampton                                        |
            |                  | Northamptonshire                                   |
            |                  | NN7 1NN                                            |
        When the user continues

        # declaration
        Then the user should be at URL "declaration"
        And should see heading "Confirm and send"
        And the page is analyzed for accessibility
        When the user confirms and sends
        
        # confirmation
        Then the user should be at URL "confirmation"
        And should see heading "Details submitted"
        And the page is analyzed for accessibility
        And should see an "EGWA" reference number for their application

        # GAS
        And the reference number along with SBI "107593059" and CRN "1100957269" should be submitted to GAS
