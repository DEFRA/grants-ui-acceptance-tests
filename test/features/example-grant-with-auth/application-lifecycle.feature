Feature: Reusable grants-ui functionality

    Background:
        Given there is no application state stored for SBI "115664358" and grant "example-grant-with-auth"

        # start
        Given the user navigates to "/example-grant-with-auth/start"
        And completes any login process as CRN "1100995048"
        Then the user should see heading "Example Grant"
        When the user clicks on "Start now"

        # yes-no-field
        Then the user should be at URL "yes-no-field"
        When the user selects "Yes"
        And continues

        # autocomplete-field
        Then the user should be at URL "autocomplete-field"
        When the user selects "England" for AutocompleteField "Country"
        And continues

        # radios-field
        Then the user should be at URL "radios-field"
        When the user selects "Option two"
        And continues

        # checkboxes-field
        Then the user should be at URL "checkboxes-field"
        When the user selects the following
            | Option two   |
        And continues

        # number-field
        Then the user should be at URL "number-field"
        When the user enters "100000" for "Enter amount"
        And continues

        # date-parts-field
        Then the user should be at URL "date-parts-field"
        When the user enters the date in a week for DatePartsField "datePartsField"
        And continues

        # month-year-field
        Then the user should be at URL "month-year-field"
        When the user enters month "08" and year "2025" for MonthYearField "monthYearField"
        And continues
    
        # select-field
        Then the user should be at URL "select-field"
        When the user selects "Option two" for "Select option"
        And continues

        # multiline-text-field
        Then the user should be at URL "multiline-text-field"
        When the user enters "Lorem ipsum" for MultilineTextField "MultilineTextField Example"
        And continues

        # multi-field-form
        Then the user should be at URL "multi-field-form"
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
        When the user continues

        # declaration
        Then the user should be at URL "declaration"
        When the user confirms and sends
        
        # confirmation
        Then the user should be at URL "confirmation"
        And should see heading "Details submitted"
        And should see an "EGWA" reference number for their application
    
    @ci
    Scenario: Application is submitted, stored in backend storage and sent to GAS
        # validate Mongo state storage
        And the following application state should be stored for SBI "115664358" and grant "example-grant-with-auth"
            | FIELD               | VALUE              |
            | $$__referenceNumber | {REFERENCE NUMBER} |
            | applicationStatus   | SUBMITTED          |
            | submittedBy         | 1100995048         |
            | autocompleteField   | ENG                |
            | multilineTextField  | Lorem ipsum        |
            | applicantName       | James Test-Farmer  |

        # validate Mongo submission storage
        And the following application submission should be stored for SBI "115664358" and grant "example-grant-with-auth"
            | FIELD              | VALUE              |
            | referenceNumber    | {REFERENCE NUMBER} |
            | crn                | 1100995048         |

        # GAS
        And the reference number along with SBI "115664358" and CRN "1100995048" should be submitted to GAS

    @ci
    Scenario: SUBMITTED application with GAS status of RECEIVED is redirected to confirmation
        Given the application status in GAS is now "RECEIVED"
        And the user starts a new browser session
        And navigates to "/example-grant-with-auth/yes-no-field"
        And completes any login process as CRN "1100995048"
        Then the user should be at URL "confirmation"
        And the grants-ui application status for SBI "115664358" and grant "example-grant-with-auth" should still be "SUBMITTED"

    @ci
    Scenario: SUBMITTED application with GAS status of AWAITING_AMENDMENTS is redirected to summary and updated to REOPENED
        Given the application status in GAS is now "AWAITING_AMENDMENTS"
        And the user starts a new browser session
        And navigates to "/example-grant-with-auth/yes-no-field"
        And completes any login process as CRN "1100995048"
        Then the user should be at URL "summary"
        And the grants-ui application status for SBI "115664358" and grant "example-grant-with-auth" should be "REOPENED"

    @ci
    Scenario: SUBMITTED application with GAS status of APPLICATION_WITHDRAWN is redirected to start and updated to CLEARED
        Given the application status in GAS is now "APPLICATION_WITHDRAWN"
        And the user starts a new browser session
        And navigates to "/example-grant-with-auth/yes-no-field"
        And completes any login process as CRN "1100995048"
        Then the user should be at URL "start"
        And the grants-ui application status for SBI "115664358" and grant "example-grant-with-auth" should still be "CLEARED"

    @ci
    Scenario: SUBMITTED application with GAS status of OFFER_SENT is redirected to agreement
        Given the application status in GAS is now "OFFER_SENT"
        And the user starts a new browser session
        And navigates to "/example-grant-with-auth/yes-no-field"
        And completes any login process as CRN "1100995048"
        Then the user should be at URL "agreement"
        And the grants-ui application status for SBI "115664358" and grant "example-grant-with-auth" should still be "SUBMITTED"

    @ci
    Scenario: SUBMITTED application with GAS status of OFFER_WITHDRAWN is redirected to confirmation
        Given the application status in GAS is now "OFFER_WITHDRAWN"
        And the user starts a new browser session
        And navigates to "/example-grant-with-auth/yes-no-field"
        And completes any login process as CRN "1100995048"
        Then the user should be at URL "agreement"
        And the grants-ui application status for SBI "115664358" and grant "example-grant-with-auth" should still be "SUBMITTED"

    @ci
    Scenario: SUBMITTED application with GAS status of OFFER_ACCEPTED is redirected to confirmation
        Given the application status in GAS is now "OFFER_ACCEPTED"
        And the user starts a new browser session
        And navigates to "/example-grant-with-auth/yes-no-field"
        And completes any login process as CRN "1100995048"
        Then the user should be at URL "agreement"
        And the grants-ui application status for SBI "115664358" and grant "example-grant-with-auth" should still be "SUBMITTED"
