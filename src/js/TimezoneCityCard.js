import React from "react";
import "../style/timezoneCityCard.css";
import Timer from "./Timer";
import { days, months } from "./utils";

class TimezoneCityCard extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			utc_time: null,
			time: null
		};

		this.ordinals = ["st", "nd", "rd", "th"];
		this.timezone = this.props.selectedCity.timezone;
		this.datetime = this.props.selectedCity.datetime;
		this.utc_datetime = this.props.selectedCity.utc_datetime;
		this.utc_offset = this.props.selectedCity.utc_offset;
		this.getTime = this.getTime.bind(this);
		this.getDate = this.getDate.bind(this);
		this.isLoading = this.isLoading.bind(this);
		// selectedCity:{timezone,client_ip,utc_datetime,datetime,utc_offset}
	}

	getTime(time) {
		return time.slice(11, 19);
	}

	getDate(date) {
		const dateObj = new Date(date);
		const dateNum = dateObj.getDate().toString();
		const index = dateNum.length - 1;
		const currentDayOrdinal =
			dateNum[index] === "1"
				? this.ordinals[0]
				: dateNum[index] === "2"
				? this.ordinals[1]
				: dateNum[index] === "3"
				? this.ordinals[2]
				: this.ordinals[3];
		return `${days[dateObj.getDay()]} ${dateNum}${currentDayOrdinal} ${
			months[dateObj.getMonth()]
		}`;
	}
	componentDidMount() {
		const utc_time = this.getTime(this.utc_datetime);
		const time = this.getTime(this.datetime);
		console.log(time);
		this.setState({
			utc_time,
			time
		});
	}
	isLoading() {
		return !(this.state.utc_time || this.state.time);
	}
	render() {
		return (
			<div className="timezoneDetails">
				<div className="flex-container timezoneTitle">
					<span>{this.timezone}</span>
				</div>
				<div className="timezone-wrapper">
					<div className="utc-wrapper">
						<div className="halfWidth">
							<span>UTC Time: </span>
						</div>
						<div className="halfWidth digital utc-color">
							{/* <span>{this.state.utc_time}</span> */}
							{console.log(this.isLoading())}
							{/* {this.isLoading() && <Timer time={this.state.utc_time} />} */}
						</div>
						<div className="halfWidth">
							<span>UTC Offset: </span>
						</div>
						<div className="halfWidth digital utc-color">
							<span>{this.utc_offset}</span>
						</div>
					</div>
					<div className="date-wrapper">
						<div className="halfWidth">
							<span>Date:</span>
						</div>
						<div className="halfWidth">
							<span>{this.getDate(this.datetime)}</span>
						</div>
						<div className="halfWidth">
							<span>Time: </span>
						</div>
						<div className="halfWidth digital date-color">
							{/* <span>{this.state.time}</span> */}
							{this.isLoading()}
							{/* {this.isLoading() && <Timer time={this.state.time} />} */}
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default TimezoneCityCard;
