Feature: Tools

    Scenario: Set temporary application status in GAS
        Given the application status for "BDB-7BD-5E2" in GAS is now "AGREEMENT_OFFERED"
    
    Scenario: Check application status in grants-ui
        Then the grants-ui application status for SBI "300000001" and grant "farm-payments" should be "SUBMITTED"
