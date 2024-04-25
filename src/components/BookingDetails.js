import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import swal from 'sweetalert';

function BookingDetails() {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [cart, setCart] = useState([]); // State to hold cart data
  const [error, setError] = useState(""); // State to hold validation error
  const location = useLocation();
  const { roomData } = location.state;
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!checkInDate || !checkOutDate) {
      setError("check-in or check-out dates are required.");
      return;
    }

    if (new Date(checkOutDate) <= new Date(checkInDate)) {
      setError("Check-out date must be after check-in date.");
      return;
    }

    const booking = {
      roomData: roomData,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      totalPrice: roomData.price,
      roomimage: roomData.imageSrc
    };
    setCart([...cart, booking]);
    swal("Cart Item!!")
    navigate("/cart", { state: { cart: [...cart, booking] } });
  };

  return (
    <div className="container-xxl bg-white p-0">
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center">
            <h6 className="section-title text-center text-primary text-uppercase">
              Room Booking
            </h6>
            <h1 className="mb-5">
              Book A
              <span className="text-primary text-uppercase">Luxury Room</span>
            </h1>
          </div>
          <div className="d-flex  flex-wrap justify-content-center gap-2">
            <div className="col-lg-6">
              <div className="row g-3">
                <img src={roomData.imageSrc} alt="Room" />
              </div>
            </div>
            <div className="col-lg-3 border">
              <div className="p-4 ">
                <form>
                  <div className="row g-2">
                    <h6 className="font-weight-normal">
                      Property Details:
                      <span className="text-truncat font-weight-bold mx-2">
                        {roomData.name}
                      </span>
                    </h6>

                    <label className="mb-1" htmlFor="checkOut">
                      Check-In Date:
                    </label>
                    <input
                      className="m-0 border rounded"
                      type="date"
                      id="checkIn"
                      name="checkIn"
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                    />
                    <label className="mb-1" htmlFor="checkOut">
                      Check-Out Date:
                    </label>
                    <input
                      className="m-0 border rounded "
                      type="date"
                      id="checkOut"
                      name="checkOut"
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                    />
                    {error && <p className="text-danger m-0">{error}</p>}
                    <h6 className="mt-2">
                      Total Price:
                      <span className="text-truncat font-weight-bold bg-light rounded px-2">
                        {roomData.price}
                      </span>
                    </h6>
                    <button
                      type="button"
                      className="btn btn-primary mt-4"
                      onClick={handleAddToCart}
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
    </div>
  );
}

export default BookingDetails;
