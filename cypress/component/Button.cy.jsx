
import { mount } from 'cypress/react';
import Button from '../../src/components/Button';

describe('Button component test', () => {
  it('відображає правильний текст кнопки', () => {
    mount(<Button>Натисни мене</Button>);

    cy.get('button').should('contain.text', 'Натисни мене');
  });
});
