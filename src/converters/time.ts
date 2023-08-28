export function padTo2Digits(number: number) {
  return number.toString().padStart(2, "0");
}

export function convertMillistoHMS(milliseconds: number | undefined) {
  if (milliseconds === undefined) {
    return null;
  }
  const seconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(seconds / 3600);
  let remainingSeconds = seconds - hours * 3600;
  const minutes = Math.floor(remainingSeconds / 60);
  remainingSeconds -= minutes * 60;

  const showHours = hours > 0 ? padTo2Digits(hours) + ":" : "";
  const showMinutes =
    hours > 0 || minutes > 0 ? padTo2Digits(minutes) + ":" : "";
  const showSeconds =
    hours > 0 || minutes > 0
      ? padTo2Digits(remainingSeconds)
      : remainingSeconds;

  return showHours + showMinutes + showSeconds;
}
