describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })
  it('verifica o título da aplicação', () => {
    cy.visit('./src/index.html')
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })
  it('preenche os campos obrigatórios e envia o formulário', () => {
    //const longText = Cypress._.repeat("Obrigado!", 30)
    // utiliza-se essa função para repetir uma string X vezes
    cy.get('#firstName').type('Lucas')
    cy.get('#lastName').type('Isquerdo')
    cy.get('#email').type('lucasisquerdo22@gmail.com')
    cy.get('#phone').type('18991275263')
    //cy.get('#open-text-area').type(longText) -> dessa forma o teste demora mais a executar, o delay padrão é 10 ms
    //cy.get('#open-text-area').type(longText, {delay: 0}) -> dessa forma instruímos a não ter delay na digitação, ficando mais rápido
    cy.get('#open-text-area').type('Obrigado!')
    cy.get('#submit_btn').click()

    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Lucas')
    cy.get('#lastName').type('Isquerdo')
    cy.get('#email').type('testError.com')
    cy.get('#phone').type('18991275263')
    cy.get('#open-text-area').type('Obrigado!')
    cy.get('#submit_btn').click()

    cy.get('.error').should('be.visible')

  })

  it('não permitir caracteres não-númericos no telefone', () => {

    cy.get('#phone')
      .type('xyz')
      .should('have.value', '')

  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Lucas')
    cy.get('#lastName').type('Isquerdo')
    cy.get('#email').type('lucasisquerdo22@gmail.com')
    cy.get('#open-text-area').type('Obrigado!')
    cy.get('#phone-checkbox').click()
    cy.get('#submit_btn').click()

    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('Lucas')
      .should('have.value', 'Lucas')
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
      .type('Isquerdo')
      .should('have.value', 'Isquerdo')
      .clear()
      .should('have.value', '')
    cy.get('#email')
      .type('lucasisquerdo22@gmail.com')
      .should('have.value', 'lucasisquerdo22@gmail.com')
      .clear()
      .should('have.value', '')
    cy.get('#phone')
      .type('123456789')
      .should('have.value', '123456789')
      .clear()
      .should('have.value', '')
    cy.get('#open-text-area')
      .type('Obrigado!')
      .should('have.value', 'Obrigado!')
      .clear()
      .should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.get('#submit_btn').click()

    cy.get('.error').should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado', () => {
    const data = {
      firstName: 'Lucas',
      lastName: 'Isquerdo',
      email: 'lucasisquerdo22@gmail.com',
      phone: '123456789',
      text: 'Teste'
    }

    //cy.fillMandatoryFieldsAndSubmit() -> primeira versão
    cy.fillMandatoryFieldsAndSubmit(data) // se eu não passar o "data", ele pega o padraõ definido.

    cy.get('.success').should('be.visible')
  })

  it('testando a obtenção do botão de envio com Contains', () => {
    cy.get('#firstName').type('Lucas')
    cy.get('#lastName').type('Isquerdo')
    cy.get('#email').type('lucasisquerdo22@gmail.com')
    cy.get('#phone').type('18991275263')
    cy.get('#open-text-area').type('Obrigado!')
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
  })

  it('testando a inclusão de dados sensíveis', () => {
    cy.get('#firstName').type(Cypress.env('user_name'), { log: false })
    cy.get('#lastName').type(Cypress.env('user_password'), { log: false })

  })

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"], [value="feedback"]')
    .check()
    .should('be.checked')
  })

  it.only('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .each(typeOfService => {
        cy.wrap(typeOfService)
          .check()
          .should('be.checked')
      })
  })
})