// CartSection.js
import React from "react";

function CartSection() {
  // Dummy data for booked properties
  const bookedProperties = [
    {
      id: 1,
      propertyName: "Luxury Suite",
      bookingDates: "Apr 30, 2024 - May 5, 2024",
      totalPrice: "$1500",
    },
    {
      id: 2,
      propertyName: "Deluxe Room",
      bookingDates: "May 10, 2024 - May 15, 2024",
      totalPrice: "$1200",
    },
  ];
  const calculateTotalCost = () => {
    let totalCost = 0;
    for (const property of bookedProperties) {
      // Extract numeric value from totalPrice string and convert to number
      const price = parseFloat(property.totalPrice.replace("$", ""));
      totalCost += price;
    }
    return totalCost.toFixed(2); // Return total cost rounded to 2 decimal places
  };
  return (
    <div className="container py-5">
      <h2 className="mb-4">Cart</h2>
      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Booked Properties</h5>
              <div className="list-group">
                {bookedProperties.map((property) => (
                  <div key={property.id} className="list-group-item">
                    <div className="d-flex justify-content-between">
                      <h6 className="mb-0">{property.propertyName}</h6>
                      <p className="mb-0">{property.bookingDates}</p>
                    </div>
                    <p className="mb-0">Total: {property.totalPrice}</p>
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
                <p>Total Properties: {bookedProperties.length}</p>
                <p>Total Cost: {calculateTotalCost()}</p>
                <button className="btn btn-primary w-100">Checkout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartSection;
