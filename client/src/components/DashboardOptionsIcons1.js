import React from 'react';
import '../css/components/DashboardOptionsIcons1.css';


class DashboardOptionsIcons1 extends React.Component{
    constructor(props) {
		super(props);
	}
    
    
    render(){
        return(

            <div className="container container-dashboard-options mt-3">

                <div className = "text-dashboard-options">                    
                    <p>Join a session with another listener.</p>
                    <button onClick={this.props.onClick} className="btn-dashboard-options">Start Session</button>
                    
                </div>
                
            </div>
        );
    }

}

export default DashboardOptionsIcons1;