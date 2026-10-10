describe('IndieHub — базові перевірки', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('головна сторінка відкривається', () => {
    cy.get('body').should('be.visible');
  });

  it('HTML-сторінка має заголовок', () => {
    cy.title().should('not.be.empty');
  });

  it('застосунок має кореневий елемент React', () => {
    cy.get('#root').should('exist');
  });
});