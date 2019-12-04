import React from 'react';
import '../css/components/DashboardOptionsIcons3.css';


class DashboardOptionsIcons3 extends React.Component{
    constructor(props) {
		super(props);
	}
    
    render(){
        return(

            <div className="container container-dashboard-options3 mt-3">

                <div className = "text-dashboard-options">                    
                    <p>Host your own room (Premium Feature).</p>
                        <button className="btn-dashboard-options" onClick = {this.props.onClick} >Host Room</button>
                </div>
                
            </div>
        );
    }

}

export default DashboardOptionsIcons3;