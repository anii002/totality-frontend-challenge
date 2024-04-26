import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCalendar } from "@fortawesome/free-solid-svg-icons";
import swal from 'sweetalert';

function CartSection() {
  const location = useLocation();
  const { cart } = location.state;
  const [cartItems, setCartItems] = useState(cart || []);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const calculateTotalCost = () => {
    let total = 0;
    if (cartItems) {
      cartItems.forEach((booking) => {
        total += booking.totalPrice;
      });
    }
    return total;
  };

  const removeFromCart = (idToRemove) => {
    const updatedCart = cartItems.filter(
      (booking) => booking.id !== idToRemove
    );
    setCartItems(updatedCart);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handelsubmitpayment =()=>{
    swal("Payment Done !!")
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = {};
    let formIsValid = true;

    if (!formData.name) {
      formIsValid = false;
      errors["name"] = "Please enter your name";
    }

    if (!formData.email) {
      formIsValid = false;
      errors["email"] = "Please enter your email";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formIsValid = false;
      errors["email"] = "Please enter a valid email address";
    }

    if (!formData.phone) {
      formIsValid = false;
      errors["phone"] = "Please enter your phone number";
    }

    setFormErrors(errors);

    if (formIsValid) {
      console.log("Form submitted with data:", formData);
    }
  };

  return (
    <div className="container py-2">
      <div className="text-center">
        <h6 className="section-title text-center text-primary text-uppercase">
          Room Booking
        </h6>
        <h1 className="mb-5">
          Cart A<span className="text-primary text-uppercase">Luxury Room</span>
        </h1>
      </div>
      <div className="container d-flex  flex-wrap col-lg-12 justify-content-center items-center gap-5">
        <div className="col-lg-6 border p-3">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="name">Your Name</label>
                  <div className="text-danger m-0">{formErrors.name}</div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="email">Your Email</label>
                  <div className="text-danger m-0">{formErrors.email}</div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    name="phone"
                    placeholder="Your Phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="phone">Your Phone</label>
                  <div className="text-danger m-0">{formErrors.phone}</div>
                </div>
              </div>
              <div>
                <button className="btn btn-primary w-100 " type="submit">
                  Fill Form
                </button>
              </div>
            </div>
          </form>
        </div>

        {cartItems && cartItems.length > 0 ? (
          <div className="card col-lg-4 gap-4">
            <div className="card-body">
              <h5 className="card-title mb-3">Booked Properties & Summary</h5>
              <div>
                {cartItems.map((booking, index) => (
                  <div key={index}>
                    <div className="d-flex justify-content-between items-center mb-2">
                      <small className="border-end me-3 pe-4">
                        <h6 className="mb-0">{booking.roomData.name}</h6>
                      </small>
                      <small className="border-end me-3 pe-4">
                        <img
                          src={booking.roomData.imageSrc}
                          className="img-fluid object-fit-cover rounded"
                          style={{ maxWidth: "50px", maxHeight: "50px" }}
                          alt="Room"
                        />
                      </small>
                      <small className="border-end me-3 pe-4">
                        
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="text-danger clickable-icon"
                          onClick={() => removeFromCart(booking.id)}
                        />
                      </small>
                    </div>
                    <div className="d-flex justify-content-between items-center">
                      <small className="mb-0 border-end me-3 pe-3">
                        <p>
                          <FontAwesomeIcon
                            icon={faCalendar}
                            className="text-primary me-2"
                          />
                          {booking.checkInDate} - {booking.checkOutDate}
                        </p>
                      </small>
                      <small className="pe-3">
                        <p>Room: {cartItems.length}</p>
                      </small>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <p className="mb-4">Payable Amount: {calculateTotalCost()}</p>
                <button className="btn btn-sm btn-primary " onClick={handelsubmitpayment}>Payment</button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-danger">No properties booked yet.</p>
            <Link to="/">
              <button className="btn btn-primary">Add to Cart</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartSection;
