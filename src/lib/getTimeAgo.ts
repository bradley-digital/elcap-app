import moment from "moment";

// There is a date function in lib/formats
// Might want to create a file for dates, lib/dates
export function getTimeAgo(timestamp: string): string {
  const currentTime = moment();
  const targetTime = moment(timestamp);
  const duration: moment.Duration = moment.duration(
    currentTime.diff(targetTime),
  );

  if (duration.asSeconds() < 60) {
    return "just now";
  } else if (duration.asMinutes() < 60) {
    return `${Math.floor(duration.asMinutes())} ${
      Math.floor(duration.asMinutes()) === 1 ? "minute" : "minutes"
    } ago`;
  } else if (duration.asHours() < 24) {
    return `${Math.floor(duration.asHours())} ${
      Math.floor(duration.asHours()) === 1 ? "hour" : "hours"
    } ago`;
  } else if (duration.asDays() < 7) {
    return `${Math.floor(duration.asDays())} ${
      Math.floor(duration.asDays()) === 1 ? "day" : "days"
    } ago`;
  } else {
    return targetTime.format("MM/DD/YYYY");
  }
}
