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
                      <button className="btn-dashboard-options" onClick = {this.props.onClick}>Join Room</button>
                </div>
                
            </div>
        );
    }

}

export default DashboardOptionsIcons2;