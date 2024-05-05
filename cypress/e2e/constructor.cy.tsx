/// <reference types="cypress"/>

describe('test stellar burger', () => {
  it('открытие и закрытие модальных окон', () => {
    cy.visit('http://localhost:4000');
    //открытие
    cy.get(':nth-child(2) > :nth-child(2) > .J2V21wcp5ddf6wQCcqXv > img').click();
    
    cy.get('.xqsNTMuGR8DdWtMkOGiM').should('be.visible');
    //открылось то, на которое нажимали
    cy.get('.G7XCxXE59ujtXU1FO7W1 > .text_type_main-medium').then((value) => {
      cy.get(':nth-child(2) > :nth-child(2) > .J2V21wcp5ddf6wQCcqXv > img')
      .next()
      .next()
      .should('have.text', value.text());
    });
    //закрытие на кнопку
    cy.get('.Z7mUFPBZScxutAKTLKHN').click();
  })

  it('добавление булки и начинки + отправка заказа', () => {
    cy.visit('http://localhost:4000');
    cy.intercept('GET', '**/ingredients', {fixture: 'ingredients.json' });
    cy.intercept('POST', '**/orders', {fixture: 'order.json' });

    cy.setCookie("refreshToken", "test-refreshToken");
    cy.setCookie('accessToken', 'test-accessToken');
  
    // добавляется булка
    cy.get(':nth-child(2) > :nth-child(2) > .common_button').click();
    // проверка, что булка в конструкторе
    cy.get('.mJns_Jb07jLke7LQ6UAF.mb-4 > .constructor-element > .constructor-element__row > .constructor-element__text').should('have.text','Флюоресцентная булка R2-D3 (верх)');
    // добавляется начинкака
    cy.get(':nth-child(4) > :nth-child(2) > .common_button').click();
    // проверка, что начинка в конструкторе
    cy.get('.Hf3gHktDVu9C__6KCbWX > .constructor-element > .constructor-element__row > .constructor-element__text').should('have.text', 'Филе тетраодонтимформа');

    // вызывается клик по кнопке «Оформить заказ»
    cy.get('.button').click();

    // логинимся
    if(cy.url().should('include', '/login')) {
      cy.intercept('POST', '**/auth/login', {fixture: 'user.json' });
      cy.get(':nth-child(1) > .input__container > .input').type('biblo@test.com');
      cy.get(':nth-child(2) > .input__container > .input').type('555777');
      cy.get('.button').click();
    }
    // проверка, что модальное окно открылось
    let titleText = require('../fixtures/order.json')
    cy.get('.xqsNTMuGR8DdWtMkOGiM').should('be.visible');
    cy.get('.U070UGjz0x5J0l3NxX3I').should(($identifier) => {
      const idText = $identifier.text()
      expect(idText, 'ID').to.equal(String(titleText.order.number));
    });
    // закрываем модалку
    cy.get('.Z7mUFPBZScxutAKTLKHN').click();
    // проверяем что конструктор пуст
    cy.get('.OF4tMG36q2aG7QGwf6XA').should('have.text','Выберите булки');
    cy.get('.HEJ0tV35JHL7iuHL89vk > ._W_JfNJJl5H5e8eqr8Ya').should('have.text', 'Выберите начинку');
  })

})

