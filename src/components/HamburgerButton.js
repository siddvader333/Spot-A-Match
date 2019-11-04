import React from 'react';
import { Motion, spring, presets } from 'react-motion';
import '../css/components/HamburgerButton.css';

export default class HamburgerButton extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			toggle: false
		};
	}

	handleClick() {
		this.setState({ toggle: !this.state.toggle });
	}

	render() {
		const style = {
			overflow: 'visible',
			cursor: 'pointer',
			// disable touch highlighting on devices
			WebkitTapHighlightColor: 'rgba(0,0,0,0)'
		};

		return (
			<div onClick={this.props.onClick} className="hamburger-button-container">
				<svg viewBox="0 0 96 96" height="1em" onClick={this.handleClick.bind(this)} style={style}>
					<Motion
						style={{
							x: spring(this.state.toggle ? 1 : 0, presets.wobbly),
							y: spring(this.state.toggle ? 0 : 1, presets.wobbly)
						}}
					>
						{({ x, y }) => (
							<g
								id="navicon"
								fill="none"
								stroke="currentColor"
								strokeWidth="14"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<line
									/*transform={`translate(${x * 12}, ${x * -7}) rotate(${x * 45}, 7, 26)`} */
									x1="14"
									y1="52"
									x2="178"
									y2="52"
								/>
								<line
									/*transform={`translate(${x * 12}, ${x * 7}) rotate(${x * -45}, 7, 70)`} */
									x1="14"
									y1="140"
									x2="178"
									y2="140"
								/>
								<line
									/*transform={`translate(${x * -96})`} */
									/*opacity={y} */
									x1="14"
									y1="96"
									x2="178"
									y2="96"
								/>
							</g>
						)}
					</Motion>
				</svg>
			</div>
		);
	}
}
