import React from 'react';

const BookingManagement = ({ bookedProperties, removeFromCart }) => {
  const handleRemoveFromCart = (property) => {
    removeFromCart(property);
  };

  return (
    <div>
      {bookedProperties.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <ul>
          {bookedProperties.map((property) => (
            <li key={property.id}>
              {property.title} - ${property.price}
              <button onClick={() => handleRemoveFromCart(property)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookingManagement;
