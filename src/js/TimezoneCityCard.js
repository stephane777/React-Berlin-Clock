import React from "react";
import "../style/timezoneCityCard.css";
import Timer from "./Timer";
import ErrorBoundaries from "./ErrorBoundaries";
import { days, months } from "./utils";

const TimezoneCityCard = ({ selectedCity }) => {
	const { timezone, datetime, utc_datetime, utc_offset } = selectedCity;
	console.log(`[timezoneCityCard]: ${datetime}`);
	console.log(`[timezoneCityCard]: ${utc_datetime}`);
	const ordinals = ["st", "nd", "rd", "th"];
	// selectedCity:{timezone,client_ip,utc_datetime,datetime,utc_offset}

	const getTime = time => {
		return time.slice(11, 19);
	};

	const getDate = date => {
		const dateObj = new Date(date.slice(0, 19));
		const dateNum = dateObj.getDate().toString();
		const index = dateNum.length - 1;
		const currentDayOrdinal =
			dateNum[index] === "1"
				? ordinals[0]
				: dateNum[index] === "2"
				? ordinals[1]
				: dateNum[index] === "3"
				? ordinals[2]
				: ordinals[3];
		return `${days[dateObj.getDay()]} ${dateNum}${currentDayOrdinal} ${
			months[dateObj.getMonth()]
		}`;
	};
	console.log(`[calc datetime] : ${getDate(datetime)}`);
	const utc_time = utc_datetime ? getTime(utc_datetime) : null;
	const time = datetime ? getTime(datetime) : null;
	// console.log(`[TimezoneCityCard] render(): ${utc_time}`);
	// console.log(`[TimezoneCityCard] render(): ${time}`);
	return (
		<div className="timezoneDetails">
			<div className="flex-container timezoneTitle">
				<span>{timezone}</span>
			</div>
			<div className="timezone-wrapper">
				<div className="utc-wrapper">
					<div className="halfWidth">
						<span>UTC Time: </span>
					</div>
					<div className="halfWidth digital utc-color">
						<Timer time={utc_time} />
					</div>
					<div className="halfWidth">
						<span>UTC Offset: </span>
					</div>
					<div className="halfWidth digital utc-color">
						<span>{utc_offset}</span>
					</div>
				</div>
				<div className="date-wrapper">
					<div className="halfWidth">
						<span>Date:</span>
					</div>
					<div className="halfWidth">
						<span>{getDate(datetime)}</span>
					</div>
					<div className="halfWidth">
						<span>Time: </span>
					</div>
					<div className="halfWidth digital date-color">
						<Timer time={time} />
					</div>
				</div>
			</div>
		</div>
	);
};
export default TimezoneCityCard;
