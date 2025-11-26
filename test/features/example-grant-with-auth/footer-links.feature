Feature: Reusable grants-ui functionality

    @ci @cdp
    Scenario: Footer should contain expected links
        Given there is no application state stored for SBI "106281016" and grant "example-grant-with-auth"

        # start
        Given the user navigates to "/example-grant-with-auth/start"
        And completes any login process as CRN "1100961682"
        Then the user should see heading "Example Grant"

        # privacy link
        Then the footer should contain a "Privacy (opens in new tab)" link to URL "https://www.gov.uk/government/organisations/rural-payments-agency/about/personal-information-charter"
