Feature: Reusable grants-ui components

    Scenario: Use the Save and Return feature
        Given there is no application state stored for CRN "1100960953" and SBI "115460751" and grant "example-grant-with-auth"

        # start
        Given the user navigates to "/example-grant-with-auth/start"
        And completes any login process as CRN "1100960953"
        Then the user should see heading "Example Grant"
        When the user clicks on "Start now"

        # yes-no-field
        Then the user should be at URL "yes-no-field"
        When the user selects "Yes"
        And decides to save and return to their application later

        # exit
        Then the user should be at URL "exit"
        And should see heading "Your progress has been saved"
