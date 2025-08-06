Feature: Example Grant Input Validation

    # scenario can be re-enabled when session cookie-keyed cache storage is re-introduced
    @disabled
    Scenario: Explore all input validation
        # start
        Given the user navigates to "/example-grant/start"
        And completes any login process
        Then the user should be at URL "start"
        When the user clicks on "Start now"

        # are-you-in-england
        Then the user should be at URL "are-you-in-england"
        When the user continues
        Then the user should see error "Are you in England? - select yes or no"
        When the user selects "Yes"
        And continues

        # what-is-your-business
        Then the user should be at URL "what-is-your-business"
        When the user continues
        Then the user should see error "Select what is your business?"
        When the user selects "A grower or producer of agricultural or horticultural produce"
        And continues

        # summary
        Then the user should be at URL "summary"
