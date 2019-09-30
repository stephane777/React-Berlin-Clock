import React from "react";

const TimezoneCityCard = ({ selectedCity }) => {
	const {
		timezone,
		client_ip,
		utc_datetime,
		datetime,
		utc_offset
	} = selectedCity;
	return (
		<div className="timezoneDetails">
			<div>
				<span>Timezone: </span>
				<span>{timezone}</span>
			</div>
			<div>
				<span>Client IP: </span>
				<span>{client_ip}</span>
			</div>
			<div>
				<span>UTC Date & Time: </span>
				<span>{utc_datetime}</span>
			</div>
			<div>
				<span>UTC Offset: </span>
				<span>{utc_offset}</span>
			</div>
			<div>
				<span>Local Date & Time: </span>
				<span>{datetime}</span>
			</div>
		</div>
	);
};
export default TimezoneCityCard;
