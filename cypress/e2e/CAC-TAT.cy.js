/// <reference types="cypress" />

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
    cy.get('#phone-checkbox').check()
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

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .each(typeOfService => {
        cy.wrap(typeOfService)
          .check()
          .should('be.checked')
      })
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .as('checkboxes')
      .check()
      .should('be.checked')

    cy.get('@checkboxes')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/example.json')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
        //aqui estamos acessando diretamente a estrutura do input, onde a propriedade FILES (array) tem dentro dela uma propriedade NAME que deve ser igual ao nome do arquivo
      })
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })

  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json')
      .as('arquivo')

    cy.get('input[type="file"]')
      .selectFile('@arquivo', { action: 'drag-drop' })
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a', 'Política de Privacidade') // não é indicado usar apenas o 'a' pois é muito genérico
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click()

    cy.contains('h1', 'CAC TAT - Política de Privacidade')
      .should('be.visible')
  })

  it('exibe mensagem por 3 segundos', () => {
    cy.clock() // congela o relógio do navegador

    cy.get('#firstName').type('Lucas')
    cy.get('#lastName').type('Isquerdo')
    cy.get('#email').type('lucasisquerdo22@gmail.com')
    cy.get('#phone').type('18991275263')
    cy.get('#open-text-area').type('Obrigado!')
    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible')

    cy.tick(3000) // avança o relógio três segundos (em milissegundos). Avanço este tempo para não perdê-lo esperando.

    cy.get('.success').should('not.be.visible')
  })

  Cypress._.times(5, () => {
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
      cy.contains('a', 'Política de Privacidade') // não é indicado usar apenas o 'a' pois é muito genérico
        .should('have.attr', 'href', 'privacy.html')
        .and('have.attr', 'target', '_blank')
    })
  })

  it('exibe e oculta as mensagens de sucesso e erro usando .invoke()', () => {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
  })

  it('preenche o campo da área de texto usando o comando invoke', () => {
    cy.get('#open-text-area')
      .invoke('val', 'um texto qualquer')
      .should('have.value', 'um texto qualquer')
  })

  it('faz uma requisição HTTP', ()=>{
    cy.request('GET', 'https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html')
    .as('getRequest')
    .its('status')
    .should('be.equal', 200)

    cy.get('@getRequest')
    .its('statusText')
    .should('be.equal', 'OK')

     cy.get('@getRequest')
    .its('body')
    .should('include', 'CAC TAT')
  })
})