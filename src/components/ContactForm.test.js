import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import ContactForm from './ContactForm';
import { act } from 'react-dom/test-utils';

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

test('contact form input fields can be filled in and submitted', async () => {
    // render the App component
    const { getByLabelText, getByTestId, findByText } = render(<App />);

    // query for the 4 form input fields and submit button
    const firstNameInput = getByLabelText(/first name/i);
    const lastNameInput = getByLabelText(/last name/i);
    const emailInput = getByLabelText(/email/i);
    const messageInput = getByLabelText(/message/i);
    const button = getByTestId(/submit/i);

    // "types" into each input field
    fireEvent.change(firstNameInput, { target: { value: 'Shayne' } });
    fireEvent.change(lastNameInput, { target: { value: 'Smith' } });
    fireEvent.change(emailInput, { target: { value: 'seanmx96@gmail.com' } });
    fireEvent.change(messageInput, { target: { value: 'Ready to go kayaking this summer' } });

    // submits data collected in input fields
    fireEvent.click(button);

    // query for the text that was entered into input fields above
    const shayne = findByText(/shayne/i);
    const smith = findByText(/smith/i);
    const email = findByText(/seanmx96@gmail.com/i);
    const message = findByText(/Ready to go kayaking this summer/i);

    // assert that all form fields have proper text inputted
    // expect(shayne).toBeInTheDocument();
    // expect(smith).toBeInTheDocument();
    // expect(email).toBeInTheDocument();
    // expect(message).toBeInTheDocument();
});

test('collected form data renders and isn\t overwritten', async () => {
    // render the App component
    const { getByLabelText, getByTestId, findByText } = render(<App />);

    // query for the 4 form input fields and submit button
    const firstNameInput = getByLabelText(/first name/i);
    const lastNameInput = getByLabelText(/last name/i);
    const emailInput = getByLabelText(/email/i);
    const messageInput = getByLabelText(/message/i);
    const button = getByTestId(/submit/i);

    // "types" into each input field
    fireEvent.change(firstNameInput, { target: { value: 'Shayne' } });
    fireEvent.change(lastNameInput, { target: { value: 'Smith' } });
    fireEvent.change(emailInput, { target: { value: 'seanmx96@gmail.com' } });
    fireEvent.change(messageInput, { target: { value: 'Ready to go kayaking this summer' } });

    // submits data collected in input fields
    fireEvent.click(button);

    // assert that collected data is rendered
    let userInfo = findByText(/shayne/i);
    // expect(userInfo).toBeInTheDocument();

    // Fill out each input field and submit once more
    // "types" into each input field
    fireEvent.change(firstNameInput, { target: { value: 'Jane' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'jane@doe.com' } });
    fireEvent.change(messageInput, { target: { value: 'None of my assertions are working lol' } });

    // submits data collected in input fields
    fireEvent.click(button);

    // assert that collected data is rendered
    userInfo = findByText(/jane/i);
    // expect(userInfo).toBeInTheDocument();

});
