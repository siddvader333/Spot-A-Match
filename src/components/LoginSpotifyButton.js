import React from 'react'
import '../css/components/LoginSpotifyButton.css'

class LoginSpotifyButton extends React.Component {
    constructor(props){
        super(props);
    }
    render(){

        
        return (

            <a href="https://www.spotify.com/ca-en/">
              <button className="log-in-spotify">
                {this.props.displayText}
              </button>
            </a>
  
      );
    }

  }
  
  export default LoginSpotifyButton;