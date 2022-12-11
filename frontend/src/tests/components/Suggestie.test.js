import React from 'react';
import { render, fireEvent, findByText, screen, queryByAttribute} from '@testing-library/react';
import Suggestie from '../../components/suggesties/Suggestie';

test('form is filled in correctly', async () => {
  const getById = queryByAttribute.bind(null, "id");
  // Create a DOM element to use as the container
  const container = document.createElement('div');

  // Render the component in the container
  const { getByLabelText, getByText } = render(<Suggestie />, container);

  // Get the input fields for X and Y coordinates
  const xInput = getByLabelText('X');
  const yInput = getByLabelText('Y');

  // Fill in the input fields with valid coordinates
  fireEvent.change(xInput, { target: { value: 10 } });
  fireEvent.change(yInput, { target: { value: 20 } });
  expect(xInput).toBeInTheDocument();

  // Click the submit button
  const submitButton = getByText('Geef een suggestie!');
  const setSuggestie = jest.spyOn(Suggestie.prototype, 'submitForm');
  fireEvent.click(submitButton);
  expect(setSuggestie).toHaveBeenCalled();

  // Wait for the suggestion to be displayed
  // const suggestion = await findById('Your suggestion is: ...');

  // Check that the suggestion matches the expected value
  // expect(getById("suggestie")).toBeInTheDocument();
  // expect(suggestion).toHaveTextContent('Your suggestion is: ...');
});
