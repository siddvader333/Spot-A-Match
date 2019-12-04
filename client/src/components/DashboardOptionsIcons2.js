import React from 'react';
import '../css/components/DashboardOptionsIcons2.css';


class DashboardOptionsIcons2 extends React.Component{
    constructor(props) {
		super(props);
	}
    
    render(){
        return(

            <div className="container container-dashboard-options2 mt-3">

                <div className = "text-dashboard-options">                    
                    <p>Join a hosted room and enjoy the ride.</p>
                    <a href = {this.props.link}>
                      <button className="btn-dashboard-options">Join Room</button>
                    </a>
                </div>
                
            </div>
        );
    }

}

export default DashboardOptionsIcons2;