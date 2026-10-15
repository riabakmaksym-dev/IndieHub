import Button from '../../src/components/Button';

describe('Button component test', () => {
  it('відображає правильний текст кнопки', () => {
    cy.mount(<Button>Натисни мене</Button>);

    cy.get('button').should('have.text', 'Натисни мене');
  });
});