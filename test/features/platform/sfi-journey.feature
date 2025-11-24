Feature: Grants Platform farm-payments end-to-end scenarios

    Scenario: Successfully apply for a farm-payments grant
        Given there are no grant applications, cases or agreements for SBI "106514040" and grant "farm-payments"

        # applicant submits the application
        When the applicant with CRN "1103313150" submits a farm-payments application for the following
            | Land Parcel | Action |
            | SD7858-1059 | CMOR1  |
        Then the applicant is given a unique reference number
        And the application in grants-ui has a status of "SUBMITTED"
        And the application in GAS has a status of "APPLICATION_RECEIVED"
        And the case has a status of "APPLICATION_RECEIVED"

        # case-worker starts the review
        When a case-worker starts reviewing the case
        Then the application in GAS has a status of "IN_REVIEW"
        And the case has a status of "IN_REVIEW"

        # case-worker approves the case
        When the case-worker approves the case
        Then the application in GAS has a transient status of "AGREEMENT_GENERATING"
        And the case has a transient status of "AGREEMENT_GENERATING"

        # agreement drafted
        Then the agreement is generated with a status of "OFFERED"
        And the application in GAS has a status of "AGREEMENT_DRAFTED"
        And the case has a status of "AGREEMENT_DRAFTED"

        # agreement reviewed
        When the case-worker is happy with the agreement and emails the applicant
        Then the application in GAS has a status of "AGREEMENT_OFFERED"
        And the case has a status of "AGREEMENT_OFFERED"

        # applicant views the agreement
        When the applicant returns to their application in grants-ui
        Then the applicant is redirected to their agreement

        # applicant accepts the agreement
        When the applicant accepts the agreement
        Then the agreement has a status of "ACCEPTED"
        Then the application in GAS has a status of "AGREEMENT_ACCEPTED"
        And the case has a status of "AGREEMENT_ACCEPTED"

        # applicant subsequently revisits their application
        When the applicant returns to the application in grants-ui
        Then the application is redirected to their agreement

    Scenario: Withdraw a farm-payments grant application before an agreement is generated
        Given there are no grant applications, cases or agreements for SBI "106514040" and grant "farm-payments"

        # applicant submits the application
        When the applicant with CRN "1103313150" submits a farm-payments application for the following
            | Land Parcel | Action |
            | SD7858-1059 | CMOR1  |
        Then the applicant is given a unique reference number
        And the application in grants-ui has a status of "SUBMITTED"
        And the application in GAS has a status of "APPLICATION_RECEIVED"
        And the case has a status of "APPLICATION_RECEIVED"

        # applicant withdraws the application
        When the RPS withdraws the application
        Then the application in GAS has a status of "WITHDRAWAL_REQUESTED"
        And the case has a status of "WITHDRAWAL_REQUESTED"

        # no agreements, GAS withdraws the application
        Then the application in GAS has a status of "APPLICATION_WITHDRAWN"
        And the case has a status of "APPLICATION_WITHDRAWN"

        # applicant revisits their application
        When the applicant returns to the application in grants-ui
        Then the application in grants-ui has a status of "CLEARED"
        And the applicant is able to submit a new application

    Scenario: Withdraw a farm-payments grant application after an agreement is generated
        Given there are no grant applications, cases or agreements for SBI "106514040" and grant "farm-payments"

        # applicant submits the application
        When the applicant with CRN "1103313150" submits a farm-payments application for the following
            | Land Parcel | Action |
            | SD7858-1059 | CMOR1  |
        Then the applicant is given a unique reference number
        And the application in grants-ui has a status of "SUBMITTED"
        And the application in GAS has a status of "APPLICATION_RECEIVED"
        And the case has a status of "APPLICATION_RECEIVED"

        # case-worker starts the review
        When a case-worker starts reviewing the case
        Then the application in GAS has a status of "IN_REVIEW"
        And the case has a status of "IN_REVIEW"

        # case-worker approves the case
        When the case-worker approves the case
        Then the application in GAS has a status of "AGREEMENT_GENERATING"
        And the case has a status of "AGREEMENT_GENERATING"

        # agreement drafted
        Then the agreement is generated with a status of "OFFERED"
        And the application in GAS has a status of "AGREEMENT_DRAFTED"
        And the case has a status of "AGREEMENT_DRAFTED"

        # agreement reviewed
        When the case-worker is happy with the agreement and emails the applicant
        Then the application in GAS has a status of "AGREEMENT_OFFERED"
        And the case has a status of "AGREEMENT_OFFERED"

        # applicant withdraws the application
        When the RPS withdraws the application
        Then the application in GAS has a status of "WITHDRAWAL_REQUESTED"
        And the case has a status of "WITHDRAWAL_REQUESTED"

        # agreement withdrawn
        Then the agreement has a status of "WITHDRAWN"
        Then the application in GAS has a status of "APPLICATION_WITHDRAWN"
        And the case has a status of "APPLICATION_WITHDRAWN"

        # applicant revisits their application
        When the applicant returns to the application in grants-ui
        Then the application in grants-ui has a status of "CLEARED"
        And the applicant is able to submit a new application
