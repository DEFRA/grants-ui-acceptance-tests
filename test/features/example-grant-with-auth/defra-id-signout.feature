Feature: Reusable grants-ui functionality

    @cdp @ci
    Scenario: Sign out of Defra ID and sign in as another user
        Given there is no application state or submissions stored for SBI "115722586" and grant "example-grant-with-auth"
        And there is no application state or submissions stored for SBI "115680267" and grant "example-grant-with-auth"

        # login as user 1
        Given the user navigates to "/example-grant-with-auth/start"
        And completes any login process as CRN "1101003693"
        Then the user should see SBI "115722586" as the logged in organisation

        # start
        Then the user should be at URL "start"
        And should see heading "Example Grant"
        When the user clicks on "Start now"

        # yes-no-field
        Then the user should be at URL "yes-no-field"
        When the user selects "Yes"
        And continues

        # autocomplete-field
        Then the user should be at URL "autocomplete-field"
        When the user selects "England" for AutocompleteField "Country"
        And continues

        # sign-out and sign in as user 2
        Given the user signs out of Defra ID
        And navigates to "/example-grant-with-auth/start"
        And completes any login process as CRN "1100995056"
        Then the user should see SBI "115680267" as the logged in organisation

        # start
        Then the user should be at URL "start"
        And should see heading "Example Grant"
        When the user clicks on "Start now"

        # yes-no-field
        Then the user should be at URL "yes-no-field"
        When the user selects "Yes"
        And continues

        # autocomplete-field
        Then the user should be at URL "autocomplete-field"
        When the user selects "Wales" for AutocompleteField "Country"
        And continues

        # sign-out and sign in again as user 1
        Given the user signs out of Defra ID
        And navigates to "/example-grant-with-auth/start"
        And completes any login process as CRN "1101003693"
        Then the user should see SBI "115722586" as the logged in organisation

        # start
        Then the user should be at URL "start"
        And should see heading "Example Grant"
        When the user clicks on "Start now"

        # yes-no-field
        Then the user should be at URL "yes-no-field"
        And should see "Yes" as the selected radio option
        When the user continues

        # autocomplete-field
        Then the user should be at URL "autocomplete-field"
        And should see "England" selected for AutocompleteField "Country"
