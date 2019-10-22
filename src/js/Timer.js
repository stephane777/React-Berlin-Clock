import React from "react";
import { months } from "./utils";

class Timer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			time: this.props.time
		};
	}
	// console.log(time);
	// const [this.hour, this.min, this.sec] = this.props.time.split(":");
	timer() {
		setInterval(() => {
			const seconde = this.state.time.split(":")[2];
			const minute = this.state.time.split(":")[1];
			const hour = this.state.time.split(":")[0];

			let sec, min, hr;
			if (seconde == 59 && minute == 59 && hour == 23) {
				this.setState({
					time: `00:00:00`
				});
			} else if (seconde == 59 && minute == 59) {
				hr = +hr + 1;
				hr = hr.length < 2 ? "0" + hr : hr;
				this.setState({
					time: `${hr}:00:00`
				});
			} else if (seconde == 59 && minute < 59) {
				sec = +seconde + 1;
				sec = sec.length < 2 ? "0" + sec : sec;
				min = +min + 1;
				min = min.length < 2 ? "0" + min : min;
				this.setState({
					time: `${this.hour}:${min}:${sec}`
				});
			} else if (seconde < 59) {
				sec = +seconde + 1;
				sec = sec.length < 2 ? "0" + sec : sec;
				this.setState({
					time: `${hour}:${minute}:${sec}`
				});
			}
		}, 1000);
	}
	componentDidMount() {
		this.timer();
	}

	render() {
		return <span>{this.state.time}</span>;
	}
}
export default Timer;
