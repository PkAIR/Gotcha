import 'cypress-xpath'

describe('Sending new report', function() {
    it('Navigating to the Report side', () => {
        cy.visit('https://xn--90adear.xn--p1ai/request_main')
        
        cy.log('Checkilng an agreement checkbox')
        cy.get('div.f-left.checkError > b > label').click()
        cy.log('Going to the next step')
        cy.get('div.f-right.u-form > button').click()
    })

    it('Choosing region and department', () => {   
        cy.xpath('(//td[contains(., "Регион")])[1]/ancestor::tr/td[2]/select')
            .select('78 г. Санкт-Петербург', {force: true})
        cy.log('Region was set')
        cy.xpath('(//td[contains(., "Подразделение")])[1]/ancestor::tr/td[2]/select')
            .select('УГИБДД ГУ МВД России по г. Санкт-Петербургу и Ленинградской области', {force: true})
        cy.log('Department was set too')        
    })

    it('Setting personal information', () => {
        cy.get('#surname_check')
            .type('Калюгин').should('have.value', 'Калюгин')
        cy.get('#firstname_check')   
            .type('Павел').should('have.value', 'Павел')
        cy.get('#email_check').type('test.test@gmail.com')
        /*cy.xpath('//*[@name="region"]', {force: true})
            .select('г. Санкт-Петербург')*/
        cy.get('#select2-event_region-ia-container').select('г. Санкт-Петербург')
    })

    it('Filling the reason', () => {
        cy.get('.textarea').type('Temp reason')    
    })

    it('Wait for file to be uploaded', () => {
        cy.get('#fileupload-input').click()
        cy.log('Upload necessary file please')
        cy.wait(10000)
        cy.log('Waiting for file to be uploaded finally')        
        cy.get('.half_link', { timeout: 15000 })
        
        cy.log('Attention! Please provide captcha. Waiting for your input')
    })
    
    it('Passing mailbox check', () => {
        cy.get('#confirm_but:first-child', { timeout: 20000 }).click()
        cy.log('Attention! Please provide e-mail confirmation code. Waiting for your input')
        cy.get('#success > img', {timeout: 20000})
        cy.log('Mail was confirmed')
    })

    it('Checking correctness for the report', () => {
        //cy.xpath('//label[text()="Корректность введенных данных подтверждаю"]').click()
        cy.get('#correct:first-child').click()
    })

    it('Sending the report', () => {
        cy.xpath('//span[text()="Отправить"]').click()
    })
})