import React from "react";
import { months } from "./utils";

class Timer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			time: this.props.time,
			timer: null
		};
	}
	// console.log(time);
	// const [this.hour, this.min, this.sec] = this.props.time.split(":");
	timer() {
		const counter = () => {
			// console.log(this.state.time);

			const [hour, minute, seconde] = this.state.time.split(":");
			const time = { hour: hour, minute: minute, seconde: seconde };
			const calcTime = unit => {
				unit = +unit + 1;
				return unit.toString().length == 1 ? "0" + unit : unit;
			};

			if (seconde == 59 && minute == 59 && hour == 23) {
				this.setState({
					time: `00:00:00`
				});
			} else if (seconde == 59 && minute == 59) {
				this.setState({
					time: `${calcTime(hour)}:00:00`
				});
			} else if (seconde == 59 && minute < 59) {
				this.setState({
					time: `${hour}:${calcTime(minute)}:00`
				});
			} else if (seconde < 59) {
				this.setState({
					time: `${hour}:${minute}:${calcTime(seconde)}`
				});
			}
		};
		counter();
		const timer = setInterval(counter, 1000);
		return timer;
	}
	componentDidMount() {
		const timer = this.timer();
		this.setState({
			timer
		});
	}
	componentWillUnmount() {
		clearInterval(this.state.timer);
		console.log("[Timer.js] : componentWillUnmount()");
	}

	render() {
		return <span>{this.state.time}</span>;
	}
}
export default Timer;
