Feature: Example Grant Elimination

    Scenario: Explore all elimination routes
        # start
        Given the user navigates to "/example-grant/start"
        And completes any login process
        When the user clicks on "Start now"

        # are-you-in-england
        Then the user should be at URL "are-you-in-england"
        When the user selects "No"
        And continues

        # you-must-be-in-england
        Then the user should be at URL "you-must-be-in-england"
        And should see heading "You must be in England"
        When the user navigates backward
        Then the user should be at URL "are-you-in-england"
