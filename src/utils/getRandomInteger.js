/**
 * Create a random number between min and max value including the min and max values.
 **/
export default function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}