import React, { useEffect, useState } from "react";
import RestaurantDataService from "../services/restaurant.js";
import { Link } from "react-router-dom";

const RestaurantsList = props => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchZip, setSearchZip] = useState("");
  const [searchCuisines, setSearchCuisines] = useState("");
  const [cuisines, setCuisines] = useState(["All Cuisines"]);

  useEffect(()=> {
    retrieveRestaurants();
    retrieveCuisines();
  }, [])

  const BySearchName = e => {
    setSearchName(e.target.value)
  }

  const BySearchZip = e => {
    setSearchZip(e.target.value)
  }

  const BySearchCuisines = e => {
    setSearchCuisines(e.target.value)
  }

  const retrieveRestaurants = () => {
    RestaurantDataService.getAll()
      .then(res => {
        console.log(res.data);
        setRestaurants(res.data.restaurants);
      })
      .catch(e => {
        console.log(e);
      })
  }

  const retrieveCuisines = () => {
    RestaurantDataService.getCuisines()
      .then(res => {
        console.log(res.data);
        setCuisines(["All Cuisines"].concat(res.data))
      })
      .catch(e => {
        console.log(e);
      })
  }
  
  const refreshList = () => {
    retrieveRestaurants();
  }

  const find = (query, by) => {
    RestaurantDataService.find(query, by)
      .then(res => {
        console.log(res.data);
        setRestaurants(res.data.restaurants)
      })
      .catch(e => {
        console.log(e);
      })
  }

  const findName = () => {
    find(searchName, "name")
  }

  const findZip = () => {
    find(searchZip, "zipcode")
  }

  const findCuisine = () => {
    if(searchCuisines === "All Cuisines"){
      refreshList();
    }else{
      find(searchCuisines, "cuisine")
    }
  }

  return (
    <div>
      <div className="row pb-1">
        <div className="input-group col-lg-4">
          <input
            type="text"
            placeholder="Search By Name"
            className="form-control"
            value={searchName}
            onChange={BySearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findName}
            >
              Search
            </button>
          </div>
        </div>
        <div className="input-group col-lg-4">
          <input
            type="text"
            placeholder="Search By Zip"
            className="form-control"
            value={searchZip}
            onChange={BySearchZip}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findZip}
            >
              Search
            </button>
          </div>
        </div>
        <div className="input-group col-lg-4">
          <select onChange={BySearchCuisines}>
            {cuisines.map((cuisine) => {
              return (
                <option value={cuisine}>{cuisine.substring(0, 20)}</option>
              );
            })}
          </select>
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findCuisine}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        {restaurants.map((restaurant) => {
          const address = `${restaurant.address.building} ${restaurant.address.street}, ${restaurant.address.zipcode}`;
          return (
            <div className="col-lg-4 pb-1">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{restaurant.name}</h5>
                  <p className="card-text">
                    <strong>Cuisine: </strong>
                    {restaurant.cuisine}
                    <br />
                    <strong>Address: </strong>
                    {address}
                  </p>
                  <div className="row">
                    <Link
                      to={"/restaurants/" + restaurant._id}
                      className="btn btn-primary col-lg-5 mx-1 mb-1"
                    >
                      View Reviews
                    </Link>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={"https://www.google.com/maps/place/" + address}
                      className="btn btn-primary col-lg-5 mx-1 mb-1"
                    >
                      View Map
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RestaurantsList;
