import React, { useState } from "react";
import { useLocation,Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
function CartSection() {
  const location = useLocation();
  const { cart } = location.state;
  console.log(cart, "bbbb");
  const [cartItems, setCartItems] = useState(cart || []);

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

  return (
    <div className="container py-5">
      <div className="text-center">
        <h6 className="section-title text-center text-primary text-uppercase">
          Room Booking
        </h6>
        <h1 className="mb-5">
          Cart A <span className="text-primary text-uppercase">Luxury Room</span>
        </h1>
      </div>
      {cartItems && cartItems.length > 0 ? (
        <div className="row">
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Booked Properties</h5>
                <div className="list-group">
                  {cartItems.map((booking, index) => (
                    <div
                      key={index}
                      className="list-group-item d-flex justify-content-between items-center"
                    >
                      <h6 className="mb-0">{booking.roomData.name}</h6>
                      <div className="d-flex ">
                        <p className="mb-0">
                          {booking.checkInDate} - {booking.checkOutDate}
                        </p>
                      </div>
                      <div className="row">
                        <img
                          src={booking.roomData.imageSrc}
                          className="img-fluid object-fit-cover rounded"
                          style={{ maxWidth: "50px", maxHeight: "50px" }}
                          alt="Room"
                        />
                      </div>

                      <FontAwesomeIcon
                        icon={faTrash}
                        className="text-danger"
                        onClick={() => removeFromCart(booking.id)}
                      />
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
                  <p>Total Properties: {cartItems.length}</p>
                  <p>Total Cost:{calculateTotalCost()}</p>
                  <button className="btn btn-primary">checkout</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p className="text-danger">No properties booked yet.</p>
          <Link to="/" ><button className="btn btn-primary">Add to Cart</button></Link>
        </div>
      )}
    </div>
  );
}

export default CartSection;
