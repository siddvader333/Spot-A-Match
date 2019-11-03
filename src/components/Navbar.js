import React from 'react';
import '../css/components/Navbar.css'

class Navbar extends React.Component{
    render(){
        return(
        <div className="nav">
            
                <button onClick={this.props.openMenu}>Menu</button>
                
                <a href="/dashboard"><span>Spot-A-Match</span></a>
		
	    </div>

        );
    }
}

export default Navbar;