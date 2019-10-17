import React from 'react'
import '../css/components/LoginProButton.css'

class LoginProButton extends React.Component {
    constructor(props){
        super(props);
    }
    render(){

        
        return (

            <a href="/session">
              <button className="log-in-pro">
                {this.props.displayText}
              </button>
            </a>
  
      );
    }

  }
  
  export default LoginProButton;