import 'cypress-xpath'

const elementTimeout = 90000

describe('Sending new report', function() {
    it('Navigating to the Report side', () => {
        cy.visit('https://xn--90adear.xn--p1ai/request_main')
        
        cy.log('Checkilng an agreement checkbox')
        cy.get('div.f-left.checkError > b > label').click()
        cy.log('Going to the next step')
        cy.get('div.f-right.u-form > button').click()
    })

    it('Choosing region and department', () => {   
        cy.fixture('data.json').then(data => {
            cy.xpath('//select[@name="region_code"]')
                .select(data.region, {force: true})
            cy.log('Region was set')

            cy.get('#subunit_check')
                .select(data.department, {force: true})
            cy.log('Department was set too')  
        });           
    })

    it('Setting personal information', () => {
        cy.fixture('data.json').then(data => {
            cy.get('#surname_check').type(data.surname)
            cy.get('#firstname_check').type(data.name)
            cy.get('#email_check').type(data.email)

            cy.log('Setting region of accident')
            cy.xpath('//span[contains(@id, "select2-event_region")]').click()
            cy.xpath('//input[@type="search"]').type(data.placeOfAcc + '{enter}')
        })
    })

    it('Filling the reason', () => {
        cy.fixture('data.json').then(data => {
            cy.get('.textarea').type(data.reason)
        })
    })

    it('Wait for file to be uploaded', () => {
        cy.log('Upload necessary file please')
        const fileName = 'Doom.png';
        const fileType = 'image/png';
        const fileInput = 'input[type=file]:first-child';
        cy.uploadFile(fileName, fileType, fileInput)
        
        cy.log('Waiting for file to be uploaded finally')        
        cy.get('.half_link', { timeout: elementTimeout })
        
        cy.log('Attention! Please provide captcha. Waiting for your input')
    })
    
    it('Passing mailbox check', () => {
        cy.get('#confirm_but:first-child', { timeout: elementTimeout }).click()
        cy.log('Attention! Please provide e-mail confirmation code. Waiting for your input')
        cy.contains('Почта подтверждена!', {timeout: elementTimeout})
        cy.log('Mail was confirmed')
    })

    it('Checking correctness for the report', () => {
        cy.get('#correct:first-child').click()
    })

    it('Sending the report', () => {
        cy.xpath('//span[text()="Отправить"]').click()
    })
})