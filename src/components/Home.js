
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { hotelRooms } from "./HotelRooms";
import {
  faBed,
  faStar,
  faBath,
  faWifi,
  faMapMarkerAlt,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

function Home() {
  const [searchInput, setSearchInput] = useState("");
  const [sortByPrice, setSortByPrice] = useState("");
  const navigate = useNavigate();

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSortByPriceChange = (e) => {
    setSortByPrice(e.target.value);
  };

  const handleBookButtonClick = (room) => {
    
    navigate("/booking", { state: { roomData: room } });
  };

  const filteredAndSortedRooms = hotelRooms
    .filter((room) =>
      room.location.toLowerCase().includes(searchInput.toLowerCase())
    )
    .sort((a, b) => {
      const priceA = parseFloat(a.price.replace(/[^\d.]/g, ""));
      const priceB = parseFloat(b.price.replace(/[^\d.]/g, ""));
      if (sortByPrice === "asc") {
        return priceA - priceB;
      } else if (sortByPrice === "desc") {
        return priceB - priceA;
      } else {
        return 0;
      }
    });

  return (
    <div className="container-xxl bg-white p-0">
      <div className="container-xxl py-2">
        <div className="container d-flex flex-wrap justify-content-between align-items-center">
          <div className="d-flex align-items-center mt-4">
            <div className="position-relative">
              <input
                className="p-2 rounded border"
                type="text"
                placeholder="Search by location..."
                value={searchInput}
                onChange={handleSearchInputChange}
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="position-absolute top-50 end-0 translate-middle-y me-3 text-primary"
              />
            </div>
          </div>
          <div>
            <h6 className="text-md font-weight-bold ">Sort by Price:</h6>
            <select
              className="p-2 rounded border"
              value={sortByPrice}
              onChange={handleSortByPriceChange}
            >
              <option value="">All</option>
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </select>
          </div>
        </div>
        <div className="container">
          <div className="text-center ">
            <h6 className="section-title text-center text-primary text-uppercase">
              Our Rooms
            </h6>
            <h1 className="mb-5">
              Explore Our{" "}
              <span className="text-primary text-uppercase">Rooms</span>
            </h1>
          </div>
          <div className="row g-4">
            {filteredAndSortedRooms.map((room) => (
              <div key={room.id} className="col-lg-4 col-md-6 ">
                <div className="room-item shadow rounded overflow-hidden">
                  <div className="position-relative">
                    <img
                      className="d-block w-100"
                      src={room.imageSrc}
                      alt={room.name}
                    />
                    <small className="position-absolute start-0 top-100 translate-middle-y bg-primary text-white rounded py-1 px-3 ms-4">
                      {room.price}
                    </small>
                  </div>
                  <div className="p-4 mt-2">
                    <div className="d-flex justify-content-between mb-3">
                      <h5 className="mb-0">{room.name}</h5>
                      <div className="ps-2">
                        {[...Array(room.stars)].map((_, index) => (
                          <FontAwesomeIcon
                            key={index}
                            icon={faStar}
                            className="text-primary"
                          />
                        ))}
                      </div>
                    </div>
                    <div className="d-flex mb-2">
                      <small className="border-end me-3 pe-3">
                        <FontAwesomeIcon
                          icon={faBed}
                          className="text-primary me-2"
                        />
                        {room.beds} Bed
                      </small>
                      <small className="border-end me-3 pe-3">
                        <FontAwesomeIcon
                          icon={faBath}
                          className="text-primary me-2"
                        />
                        {room.baths} Bath
                      </small>
                      {room.wifi && (
                        <small>
                          <FontAwesomeIcon
                            icon={faWifi}
                            className="text-primary me-2"
                          />
                          Wifi
                        </small>
                      )}
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <FontAwesomeIcon
                        icon={faMapMarkerAlt}
                        className="text-primary me-2"
                      />
                      <small>Location: {room.location}</small>
                    </div>
                    <p
                      className="text-body mb-2 font-weight-bold"
                      style={{
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {room.description}
                    </p>

                    <div className="d-flex justify-content-end">
                      <button
                        className="btn btn-sm btn-dark rounded py-2 px-4"
                        onClick={() => handleBookButtonClick(room)}
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
