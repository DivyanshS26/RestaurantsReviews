import React, { useEffect, useState } from 'react'
import RestaurantDataServices from "../services/restaurant.js"
import { Link,useParams } from 'react-router-dom'

const Restaurant = props => {
  const initialState = {
    id:null,
    name: "",
    address: {},
    cuisine: "",
    reviews: []
  }
  const { id } = useParams();

  const [restaurant, setRestaurants] = useState(initialState);

  const getRestaurant = id => {
    RestaurantDataServices.get(id)
      .then(res => {
        console.log(res.data);
        setRestaurants(res.data)
      })
      .catch(e => {
        console.log(e);
      })
  }

  useEffect(() => {
    getRestaurant(id);
  }, [id])

  const deleteReview = (reviewId, Index) => {
    RestaurantDataServices.deleteReview(reviewId, props.user.id)
      .then(res => {
        setRestaurants(prevState => {
          prevState.reviews.splice(Index, 1)
          return(
            {
              ...prevState
            }
          )
        })
      })
      .catch(e => {
        console.log(e);
      })
  }

  return (
    <div>
    {restaurant ? (
      <div>
        <h5>{restaurant.name}</h5>
        <p>
          <strong>Cuisine: </strong>{restaurant.cuisine}<br/>
          <strong>Address: </strong>{restaurant.address.building} {restaurant.address.street}, {restaurant.address.zipcode}
        </p>
        <Link to={`/restaurants/${id}/review`} className="btn btn-primary">
          Add Review
        </Link>
        <h4> Reviews </h4>
        <div className="row">
          {restaurant.reviews.length > 0 ? (
           restaurant.reviews.map((review, index) => {
             return (
               <div className="col-lg-4 pb-1" key={index}>
                 <div className="card">
                   <div className="card-body">
                     <p className="card-text">
                       {review.text}<br/>
                       <strong>User: </strong>{review.name}<br/>
                       <strong>Date: </strong>{review.date}
                     </p>
                     {props.user && props.user.id === review.user_id &&
                        <div className="row">
                          <a onClick={() => deleteReview(review._id, index)} className="btn btn-primary col-lg-5 mx-1 mb-1">Delete</a>
                          <Link to={`/restaurants/${id}/review`}
                            state= {{currentReview: review}}
                          className="btn btn-primary col-lg-5 mx-1 mb-1">Edit</Link>
                        </div>                   
                     }
                   </div>
                 </div>
               </div>
             );
           })
          ) : (
          <div className="col-sm-4">
            <p>No reviews yet.</p>
          </div>
          )}

        </div>

      </div>
    ) : (
      <div>
        <br />
        <p>No restaurant selected.</p>
      </div>
    )}
  </div>
  )
}

export default Restaurant