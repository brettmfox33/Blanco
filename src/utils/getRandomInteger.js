/**
 * Create a random number between min and max value
 **/
export default function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}