import 'cypress-xpath'

it('Navigating to the Report side', () => {
    cy.visit('https://xn--90adear.xn--p1ai/request_main')
    
    cy.get('div.f-left.checkError > b > label').click()
    cy.get('div.f-right.u-form > button').click()
})

it('Choosing region and department', () => {   
    cy.xpath('(//td[contains(., "Регион")])[1]/ancestor::tr/td[2]/select')
        .select('78 г. Санкт-Петербург', {force: true})
    cy.xpath('(//td[contains(., "Подразделение")])[1]/ancestor::tr/td[2]/select')
        .select('УГИБДД ГУ МВД России по г. Санкт-Петербургу и Ленинградской области', {force: true})
})

it('Setting personal information', () => {
    cy.get('#surname_check')
        .type('Калюгин').should('have.value', 'Калюгин')
    cy.get('#firstname_check')   
        .type('Павел').should('have.value', 'Павел')
    cy.get('#email_check').type('test.test@gmail.com')
    /*cy.xpath('//*[@name="region"]', {force: true})
        .select('г. Санкт-Петербург')*/
})

it('Filling the reason', () => {
    // Filling reason
    cy.get('.textarea').type('test')    
})