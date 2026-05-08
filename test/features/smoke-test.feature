Feature: Smoke Test

    Scenario: Complete a full example-grant-with-auth journey to submission
        Given there is no application state stored for CRN "1100957269" and SBI "107593059" and grant "example-grant-with-auth"

        # start
        Given the user navigates to "/example-grant-with-auth/start"
        And completes any login process as CRN "1100957269"
        Then the user should see heading "Example Grant"
        When the user clicks on "Start now"

        # yes-no-field
        Then the user should be at URL "yes-no-field"
        And should see heading "YesNoField Example"
        When the user selects "Yes"
        And continues

        # autocomplete-field
        Then the user should be at URL "autocomplete-field"
        And should see heading "AutocompleteField Example"
        When the user selects "England" for AutocompleteField "Country"
        And continues

        # radios-field
        Then the user should be at URL "radios-field"
        And should see heading "RadiosField Example"
        When the user selects "Option two"
        And continues

        # checkboxes-field
        Then the user should be at URL "checkboxes-field"
        And should see heading "CheckboxesField Example"
        When the user selects the following
            | Option one |
        And continues

        # number-field
        Then the user should be at URL "number-field"
        And should see heading "NumberField Example"
        When the user enters "100000" for "Enter amount"
        And continues

        # date-parts-field
        Then the user should be at URL "date-parts-field"
        And should see heading "DatePartsField Example"
        When the user enters the date in a week for DatePartsField "datePartsField"
        And continues

        # month-year-field
        Then the user should be at URL "month-year-field"
        And should see heading "MonthYearField Example"
        When the user enters month "08" and year "2025" for MonthYearField "monthYearField"
        And continues

        # select-field
        Then the user should be at URL "select-field"
        And should see heading "SelectField Example"
        When the user selects "Option three" for "Select option"
        And continues

        # multiline-text-field
        Then the user should be at URL "multiline-text-field"
        And should see label heading "MultilineTextField Example"
        When the user enters "Lorem ipsum" for MultilineTextField "MultilineTextField Example"
        And continues

        # select-land-parcel
        Then the user should be at URL "select-land-parcel"
        And should see heading "Select all the eligible land parcels for the location of your woodland"
        When the user selects the following
            | SD6351 8781 |
        And continues

        # multi-field-form
        Then the user should be at URL "multi-field-form"
        And should see heading "Multi Field Form Example"
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

        # check-details
        Then the user should be at URL "check-details"
        And should see heading "Check your details"
        When the user selects "Yes"
        And continues

        # summary
        Then the user should be at URL "summary"
        And should see heading "Check your answers"
        When the user continues

        # declaration
        Then the user should be at URL "declaration"
        And should see heading "Confirm and send"
        When the user confirms and sends

        # confirmation
        Then the user should be at URL "confirmation"
        And should see heading "Details submitted"
        And should see an "EGWA" reference number for their application
