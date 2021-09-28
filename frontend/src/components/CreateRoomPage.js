// import React,{Component} from 'react';
// import { CSRF_TOKEN } from "../common/csrf_token.js"

// export default class CreateRoomPage extends Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//         data:[],
//         review: "",
//         rating: '',
//         ebook: '',
//         loaded:false,
//         placeholder:''
  
//     };
//     this.reviewchangeHandler = this.reviewchangeHandler.bind(this)
//     this.ratingchangeHandler = this.ratingchangeHandler.bind(this)
//     this.ebookchangeHandler = this.ebookchangeHandler.bind(this)
//     this.submitHandler = this.submitHandler.bind(this)
//     this.fetchTask = this.fetchTask.bind(this)
//   }
//     reviewchangeHandler(event){
//         this.setState({review: event.target.value})
//         console.log('clicked')}

//     ratingchangeHandler(event){
//         this.setState({rating: event.target.value})
//         console.log('clicked')}

//     ebookchangeHandler(event){
//         this.setState({ebook: event.target.value})
//         console.log('clicked')}
    
//     fetchTask(){
//       fetch("http://127.0.0.1:8000/app/reviews/",{
//         credentials: 'include',
//         method: 'GET',
//         mode: 'same-origin',
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json',
//           'X-CSRFToken': CSRF_TOKEN
//         }
//       })
//         .then(response => response.json())
//         .then(json => {
//             this.setState({ data: json });
//             console.log(json)
//           } );
//       }

//     componentWillMount() {
//       this.fetchTask()
//     }
//     submitHandler(e){
//       e.preventDefault()
//       console.log('ITEM:', this.state.data)
//       fetch("http://127.0.0.1:8000/app/reviews/",{
//         credentials: 'include',
//         method: 'POST',
//         mode: 'same-origin',
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json',
//           'X-CSRFToken': CSRF_TOKEN
//         },
//         body:JSON.stringify({review:this.state.review,rating:this.state.rating,ebook:this.state.ebook})
//       }).then(response => {
//         response.json()})
//       .then(json => {
//           this.setState({ data: json });
//         } );


//     }


//     render(){

//         var x = this.state.data
        
//         return  <div>
//             <pre>{JSON.stringify(x, null, 2) }</pre>
//             <form id="submit_job" onSubmit={this.submitHandler}>
//     <label>
//         REVIEW:
//         <input type="text" name={"review"} onChange={this.reviewchangeHandler}/>
//     </label>
//     <br/>
//     <label>
//         RATING:
//         <input type="text" name={"rating"} onChange={this.ratingchangeHandler}/>
//     </label>
//     <br/>
//     <label>
//         BOOK:
//         <input type="text" name={"ebook"} onChange={this.ebookchangeHandler}/>
//     </label>
//     <br/>
//     <button type="submit">Submit</button>
// </form>
//         </div>  
    
//     }}