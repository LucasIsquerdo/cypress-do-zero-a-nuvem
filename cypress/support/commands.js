/* Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () =>
{
    cy.get('#firstName').type('Lucas')
    cy.get('#lastName').type('Isquerdo')
    cy.get('#email').type('lucasisquerdo22@gmail.com')
    cy.get('#phone').type('18991275263')
    cy.get('#open-text-area').type('Obrigado!')
    cy.get('#submit_btn').click()
}) PRIMEIRA VERSÃO*/

/* Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data) =>
{
    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#phone').type(data.phone)
    cy.get('#open-text-area').type(data.text)
    cy.get('#submit_btn').click()
}) SEGUNDA VERSÃO*/

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {
    firstName: 'John',
      lastName: 'Doe',
      email: 'john@gmail.com',
      phone: '43151678',
      text: 'Test'
}) =>
{
    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#phone').type(data.phone)
    cy.get('#open-text-area').type(data.text)
    cy.get('#submit_btn').click()
})