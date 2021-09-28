import React,{Component} from 'react';
import { CSRF_TOKEN } from "../common/csrf_token.js"

export default class WriteReview extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data:[],
        review: "",
        rating: '',
        ebook: '',
        loaded:false,
        placeholder:"Loading"
  
    };
    this.reviewchangeHandler = this.reviewchangeHandler.bind(this)
    this.ratingchangeHandler = this.ratingchangeHandler.bind(this)
    this.submitHandler = this.submitHandler.bind(this)

  }
    reviewchangeHandler(event){
        this.setState({review: event.target.value})}

    ratingchangeHandler(event){
        this.setState({rating: event.target.value})}

    submitHandler(e){
      e.preventDefault()
      fetch(`/app/book/${this.props.url}/ans`,{
        credentials: 'include',
        method: 'POST',
        mode: 'same-origin',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken': CSRF_TOKEN
        },
        body:JSON.stringify({review:this.state.review,rating:this.state.rating,ebook :this.props.id})
      })
      .then(response => {
                if(response.status > 399){ this.setState(
                  { placeholder: "Something went wrong!"}); }
                return response.json()})
      .then(json => {
                  this.setState({ data: json ,
                    loaded: true
                  });
                } );

    }


    render(){
      var x = this.state.data
      let info ;

      if(this.state.placeholder === 'Loading' & this.state.loaded===true){
        info =   <alert>review submitted</alert>}
      else  if(this.state.placeholder === 'Something went wrong!'){info = <alert>already reviewed this flight</alert>}


        return  <div className = 'reviewWrite'>
            {info}
            <form id="submit_job" onSubmit={this.submitHandler}>
              <div class="form-inline">
                <label for="formGroupExampleInput">REVIEW:</label>
                <input type="text" name={"review"} onChange={this.reviewchangeHandler}  class="form-control" id="formGroupExampleInput" placeholder="REVIEW"/> 
              </div>

              <br/>

              <div class="form-inline">
                <label for="formGroupExampleInput">RATING:</label>
                <input type="text" name={"rating"} onChange={this.ratingchangeHandler} class="form-control" id="formGroupExampleInput2" placeholder="RATING"/>
              </div>


              <button type="submit"  onClick = {this.props.handleUp} class="btn btn-primary mb-2">Submit</button>
            </form>
          </div>  
    
    }}