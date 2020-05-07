import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import ContactForm from './ContactForm';

test('contact form renders without errors', () => {
    render(<ContactForm />);
});


test('contact form input fields are rendered', () => {
    // render the App component
    const { getByLabelText } = render(<App />);

    // query for the 4 form input fields - first name, last name, email, message
    const firstNameInput = getByLabelText(/first name/i);
    const lastNameInput = getByLabelText(/last name/i);
    const emailInput = getByLabelText(/email/i);
    const messageInput = getByLabelText(/message/i);

    // assert that all form fields are rendered
    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(messageInput).toBeInTheDocument();
});

test('contact form input fields can be filled in and submitted', () => {
    // render the App component
    const { getByLabelText, getByText, getByTestId } = render(<App />);

    // query for the 4 form input fields and submit button
    const firstNameInput = getByLabelText(/first name/i);
    const lastNameInput = getByLabelText(/last name/i);
    const emailInput = getByLabelText(/email/i);
    const messageInput = getByLabelText(/message/i);
    // const button = getByTestId(/submit/i);

    // "types" into each input field
    fireEvent.change(firstNameInput, { target: { value: 'Shayne' } });
    fireEvent.change(lastNameInput, { target: { value: 'Smith' } });
    fireEvent.change(emailInput, { target: { value: 'seanmx96@gmail.com' } });
    fireEvent.change(messageInput, { target: { value: 'Ready to go kayaking this summer' } });
    // fireEvent.click(button);

    // query for the text that was entered into input fields above
    const shayne = getByText(/shayne/i);
    const smith = getByText(/smith/i);
    const email = getByText(/seanmx96@gmail.com/i);
    const message = getByText(/Ready to go kayaking this summer/i);

    // assert that all form fields have proper text inputted
    expect(shayne).toBeInTheDocument();
    expect(smith).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(message).toBeInTheDocument();

});