import React from 'react';
import '../css/components/DashboardOptions.css';

class DashboardOptions extends React.Component{
    render(){
        return(
            <div className="container">

                <div className="box">
                    <div className="imgBox">
                        <img src="https://rxmusic.com/wp-content/uploads/2018/04/Dollarphotoclub_74179490.jpg"/>
                    </div>
                    <div className="details">
                        <div className="content">
                            <h2>Join a session with another listener.</h2>
                            <button onclick="window.location.href = 'https://google.com';">Click Here</button>
                        </div>
                    </div>
                </div>
                <div className="box">
                    <div className="imgBox">
                        <img src="https://media.timeout.com/images/102182623/630/472/image.jpg"/>
                    </div>
                    <div className="details">
                        <div className="content">
                            <h2>Join a hosted room and enjoy the ride.</h2>
                            <button onclick="window.location.href = 'https://google.com';">Click Here</button>
                        </div>
                    </div>
                </div>
                <div className="box">
                    <div className="imgBox">
                        <img src="https://www.wallpaperup.com/uploads/wallpapers/2013/11/09/172018/a83393b8e0ba294b604cd8fb1cc76cc6-700.jpg"/>
                    </div>
                    <div className="details">
                        <div className="content">
                            <h2>Host your own room (Premium Feature).</h2>
                            <button onclick="window.location.href = 'https://google.com';">Click Here</button>
                        </div>
                    </div>
                </div>
	        </div>
        );
    }
}

export default DashboardOptions;