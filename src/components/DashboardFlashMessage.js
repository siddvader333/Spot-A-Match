import React from 'react';
import FlashMessage from 'react-flash-message';
import '../css/components/DashboardFlashMessage.css';
const DashboardFlashMessage = (props) => {
	return (
		<FlashMessage persistOnHover={true} duration={props.duration}>
			<div data-aos="fade-down" data-aos-duration="1500" className="flash-message-container">
				<p className="flash-message-text">{props.displayText}</p>
			</div>
		</FlashMessage>
	);
};

export default DashboardFlashMessage;
