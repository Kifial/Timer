export const setTimerTime = (time) => {
  let [hours, minutes, seconds] = [...time];
  seconds = `${+seconds + 1}`;
  if (seconds.length == 1) {
    seconds = '0' + seconds;
  }
  if (seconds == '60') {
    seconds = '00';
    minutes = `${+minutes + 1}`;
    if (minutes.length == 1) {
      minutes = '0' + minutes;
    }
    if (minutes == '60') {
      minutes = '00';
      hours = `${+hours + 1}`;
      if (hours.length == 1) {
        hours = '0' + hours;
      }
    }
  }
  return [hours, minutes, seconds];
};