import React, { useEffect, useState} from 'react'
import { CSRF_TOKEN } from "../common/csrf_token.js"
import {
    BrowserRouter as Router,
    useParams
  } from "react-router-dom";
import WriteReview from './OneReview' 


function SlugBook() {
    let {slug} = useParams()
    const [state, setState] = useState([])
    const [b_id , setId ]  = useState()
    let [stateCounter,setCounter] = useState(0)

    
    useEffect(() => {

        fetch(`/app/book/${slug}/al`,{
            credentials: 'include',
            method: 'GET',
            mode: 'same-origin',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'X-CSRFToken': CSRF_TOKEN
            }})
            .then(response => {
            console.log(response);
            return response.json();
          })
            .then(data => {
                setState(data = data)
                setId(data[0].ebook)
              console.log(data)})
              .catch(err => console.log(err));
            },[stateCounter])

    function handleUp(){
      setTimeout(function(){
      setCounter(stateCounter = stateCounter+1)
      console.log(stateCounter)},1500)
    }

    return (
        <p>
          <div className = 'review-head'>Airline Reviews and Sentiments</div>

            <ul>
        {state.map(data => {
          return (
            <li >
              
              <div className = 'reviews'>{data.review}-<mark>{data.sentiment}</mark></div>
              
            </li>
          );
        })}
      </ul>
      <div className = 'review-text'>Write your Reviews here:</div>
      <WriteReview url = {slug} id = {b_id} handleUp  = {handleUp } />

        </p>
    )
}

export default SlugBook