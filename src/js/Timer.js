import React from "react";

const Timer = ({ time }) => {
	console.log(time);
	const [hour, min, sec] = time.split(":");
	console.log(hour);
	console.log(min);
	console.log(sec);
	return <span>{time}</span>;
};
export default Timer;
