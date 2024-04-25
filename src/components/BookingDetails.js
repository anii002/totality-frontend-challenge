/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from "react";

function BookingForm() {
  const [cart, setCart] = useState([]);
  const [propertyDetails, setPropertyDetails] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");

  // Function to calculate the cost of booking based on check-in and check-out dates
  const calculateCost = (checkIn, checkOut) => {
    // Dummy cost calculation logic here
    const nightlyRate = 100; // Dummy nightly rate
    const duration = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)); // Calculate duration in days
    return nightlyRate * duration;
  };

  // Function to add a booking to the cart
  const addToCart = () => {
    const newBooking = {
      propertyDetails: propertyDetails,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      cost: calculateCost(checkInDate, checkOutDate),
    };
    setCart([...cart, newBooking]);
    setPropertyDetails("");
    setCheckInDate("");
    setCheckOutDate("");
  };

  // Function to remove a booking from the cart
  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  // Function to calculate total cost of all bookings in the cart
  const calculateTotalCost = () => {
    let total = 0;
    cart.forEach((booking) => {
      total += booking.cost;
    });
    return total;
  };

  // Function to handle checkout process
  const handleCheckout = () => {
    // Placeholder for checkout process
    alert("Checkout functionality will be implemented later.");
  };

  return (
    <div className="container-xxl bg-white p-0">
      {/* Booking Start */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title text-center text-primary text-uppercase">
              Room Booking
            </h6>
            <h1 className="mb-5">
              Book A{" "}
              <span className="text-primary text-uppercase">Luxury Room</span>
            </h1>
          </div>
          <div className="row g-5">
            <div className="col-lg-6">
              <div className="row g-3">
                <img
                  src="https://via.placeholder.com/800x400"
                  alt="Placeholder Image"
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="wow fadeInUp" data-wow-delay="0.2s">
                <form>
                  <div className="row g-3">
                    <label htmlFor="property">Property Details:</label>
                    <input
                      type="text"
                      id="property"
                      name="property"
                      value={propertyDetails}
                      onChange={(e) => setPropertyDetails(e.target.value)}
                    />
                    <label htmlFor="checkIn">Check-In Date:</label>
                    <input
                      type="date"
                      id="checkIn"
                      name="checkIn"
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                    />
                    <label htmlFor="checkOut">Check-Out Date:</label>
                    <input
                      type="date"
                      id="checkOut"
                      name="checkOut"
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                    />
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={addToCart}
                    >
                      Add to Cart
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Booking End */}

      {/* Cart Section */}
      <div className="container py-5">
        <h2 className="mb-4">Cart</h2>
        <div className="row">
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Booked Properties</h5>
                <div className="list-group">
                  {cart.map((booking, index) => (
                    <div key={index} className="list-group-item">
                      <div className="d-flex justify-content-between">
                        <h6 className="mb-0">{booking.propertyDetails}</h6>
                        <p className="mb-0">
                          {booking.checkInDate} - {booking.checkOutDate}
                        </p>
                      </div>
                      <p className="mb-0">Total: ${booking.cost}</p>
                      <button
                        className="btn btn-danger btn-sm mt-2"
                        onClick={() => removeFromCart(index)}
                      >
                        Remove
                      </button>
                      </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Summary</h5>
                <div>
                  <p>Total Properties: {cart.length}</p>
                  <p>Total Cost: ${calculateTotalCost()}</p>
                  <button
                    className="btn btn-primary w-100"
                    onClick={handleCheckout}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Cart Section End */}
    </div>
  );
}

export default BookingForm;
