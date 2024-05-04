import mockIngredients from '../ingredients.json';
console.log(mockIngredients);

describe('test stellar burger', () => {
  it('open site', () => {
    cy.visit('http://localhost:4000');
  })
})

