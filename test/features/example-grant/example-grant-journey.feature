Feature: Example Grant Journey

    Scenario: Apply for a grant
        # start
        Given the user navigates to "/example-grant/start"
        Then the user should be at URL "start"
        And should see heading "Start page"
        When the user clicks on "Start now"

        # are-you-in-england
        Then the user should be at URL "are-you-in-england"
        And should see heading "Are you in England?"
        When the user selects "Yes"
        And continues

        # what-is-your-business
        Then the user should be at URL "what-is-your-business"
        And should see heading "What is your business?"
        When the user selects "A grower or producer of agricultural or horticultural produce"
        And continues

        # summary
        Then the user should be at URL "summary"
        And should see heading "Check your answers before submitting your form"
        And should see the following answers
            | QUESTION               | ANSWER                                                        |
            | Are you in England?    | Yes                                                           |
            | What is your business? | A grower or producer of agricultural or horticultural produce |
        When the user submits their form

        # status
        Then the user should be at URL "status"
        And should see heading "Form submitted"
