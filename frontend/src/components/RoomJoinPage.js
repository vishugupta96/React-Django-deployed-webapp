import React,{Component} from 'react';
import { CSRF_TOKEN } from "../common/csrf_token.js"



function ListItem(props) {
  // Correct! There is no need to specify the key here:
  return <div className = 'ListItem'><li><a href={"/slug/"+props.value.slug+"/"}> {props.value.title}</a></li></div>;
}


export default class RoomJoinPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
      placeholder: "Loading"
    };
  }

  componentDidMount() {
    fetch("/app/book/", {
      credentials: 'include',
      method: 'GET',
      mode: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': CSRF_TOKEN
      },

     })
      .then(response => {
        if (response.status > 400) {
          return this.setState(() => {
            return { placeholder: "Something went wrong!" };
          });
        }
        return response.json();
      })
      .then(data => {
        this.setState(() => {
          return {
            data,
            loaded: true
          };
        });
      });
  }

  render() {
      var x = this.state.data;
      let info ;
      let head;
     
      
      if(this.state.placeholder === 'Loading'){
        head = <div className='flight-text'>Top Flights</div>
        info =  x.map(data => <ListItem key={data.title.toString()} value={data} />
        ) }
      else{info = <h3>Please Login  </h3>}

    return (
      <div>
        {head}

        <div className = 'flights'><ul>
        {info}
        </ul></div>        
      </div>)}}