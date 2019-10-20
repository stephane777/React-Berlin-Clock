import React from "react";
import "../style/timezoneCityCard.css";
import days from "./days";
import months from "./months";

class TimezoneCityCard extends React.Component {
	constructor(props) {
		super(props);
		this.ordinals = ["st", "nd", "rd", "th"];
		this.timezone = this.props.selectedCity.timezone;
		this.datetime = this.props.selectedCity.datetime;
		this.utc_datetime = this.props.selectedCity.datetime;
		this.utc_offset = this.props.selectedCity.utc_offset;
		this.getTime = this.getTime.bind(this);
		this.getDate = this.getDate.bind(this);
		// selectedCity:{timezone,client_ip,utc_datetime,datetime,utc_offset}
	}

	getTime(time) {
		// console.log(`time: ${time}`);
		return time.slice(11, 19);
	}

	getDate(date) {
		const dateObj = new Date(date);
		const dateNum = dateObj.getDate();
		const currentDayOrdinal =
			dateNum[0] === "1"
				? this.ordinals[0]
				: dateNum[0] === "2"
				? this.ordinals[1]
				: dateNum[0] === "3"
				? this.ordinals[2]
				: this.ordinals[3];
		return `${days[dateObj.getDay()]} ${dateNum}${currentDayOrdinal} ${
			months[dateObj.getMonth()]
		}`;
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
							<span>UTCTime: </span>
						</div>
						<div className="halfWidth digital utc-color">
							<span>{this.getTime(this.utc_datetime)}</span>
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
							<span>{this.getTime(this.datetime)}</span>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default TimezoneCityCard;
