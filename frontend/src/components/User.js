import React,{Component} from 'react';
import { CSRF_TOKEN } from "../common/csrf_token.js"
import Tippy from '@tippyjs/react'
// import 'react-tippy/dist/tippy.css'

export default class GetUser extends Component {
  constructor(props) {
    super(props);
    this.state={
      data: [],
      loaded: false,
      placeholder: "Loading"}


  }

  componentDidMount(){
    fetch("/api/user/",
    {
      credentials: 'include',
      method: 'GET',
      mode: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': CSRF_TOKEN
      },

     })
     .then(res => {
       if (res.status > 400){this.setState({
         placeholder:'Something Went Wrong'
       })}
       return res.json()
     })
     .then(res => {
       console.log(res)
       this.setState({
         data:[res],
         loaded : true
       })
      })
  }

  
  render() {
    var x = this.state.placeholder;
    var y = this.state.loaded;
    var z = this.state.data;
    const user = z.map(data => data.username);
    let button;  

    if(this.state.placeholder === 'Loading'){
      button = <a  class="nav-link "  href="/accounts/logout/" > Logout </a>
    }else{
      button = <a class="nav-link "  href="/accounts/login/" >Login</a>
    }

    return(<div>

    <section id="nav-bar">
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="/"></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <i class="fa fa-bars" aria-hidden="true"></i>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item ">
            <a class="nav-link" href="/">Home </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/join">Flights</a>
          </li>
          <li class="nav-item">
            {button}
          </li>
          
        </ul>
      </div>

    </nav>
    
</section>

    <Tippy className='tt' content = {user}>
    <section id = 'banner' >
              <div class = 'container' >
                <div class = 'row'>
                  <div class = "col-md-6">
                    <p class = 'project-title'>Flight Review</p>
                  </div>
                </div>
              </div>
    </section>
    </Tippy>
        
</div>)



  }
}