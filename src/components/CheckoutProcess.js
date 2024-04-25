import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const CheckoutProcess = ({ bookedProperties, cartTotal }) => {
  const [bookingDetails, setBookingDetails] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    paymentMethod: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBookingDetails({
      ...bookingDetails,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Booking details:', bookingDetails);
    setBookingDetails({
      fullName: '',
      email: '',
      phoneNumber: '',
      paymentMethod: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
    });
  };

  return (
    <div>
      <div>
        <ul>
          {bookedProperties.map((property) => (
            <li key={property.id}>{property.title}</li>
          ))}
        </ul>
        <p>Total Cost: ${cartTotal}</p>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} controlId="formFullName">
          <Form.Label column sm={2}>
            Full Name:
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="fullName"
              value={bookingDetails.fullName}
              onChange={handleInputChange}
              required
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formEmail">
          <Form.Label column sm={2}>
            Email:
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="email"
              name="email"
              value={bookingDetails.email}
              onChange={handleInputChange}
              required
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formPhoneNumber">
          <Form.Label column sm={2}>
            Phone Number:
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="tel"
              name="phoneNumber"
              value={bookingDetails.phoneNumber}
              onChange={handleInputChange}
              required
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formPaymentMethod">
          <Form.Label column sm={2}>
            Payment Method:
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              as="select"
              name="paymentMethod"
              value={bookingDetails.paymentMethod}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Payment Method</option>
              <option value="creditCard">Credit Card</option>
              <option value="debitCard">Debit Card</option>
              <option value="paypal">PayPal</option>
            </Form.Control>
          </Col>
        </Form.Group>
        {bookingDetails.paymentMethod && (
          <>
            <Form.Group as={Row} controlId="formCardNumber">
              <Form.Label column sm={2}>
                Card Number:
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  name="cardNumber"
                  value={bookingDetails.cardNumber}
                  onChange={handleInputChange}
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formExpiryDate">
              <Form.Label column sm={2}>
                Expiry Date:
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  name="expiryDate"
                  value={bookingDetails.expiryDate}
                  onChange={handleInputChange}
                  placeholder="MM/YYYY"
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formCVV">
              <Form.Label column sm={2}>
                CVV:
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  name="cvv"
                  value={bookingDetails.cvv}
                  onChange={handleInputChange}
                  required
                />
              </Col>
            </Form.Group>
          </>
        )}
        <Button type="submit">Confirm Booking</Button>
      </Form>
    </div>
  );
};

export default CheckoutProcess;
