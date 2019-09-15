import degToRadians from "./degToRadians";

function rotatedWidth(side, rotation) {
  const diagonal = Math.sqrt(Math.pow(side, 2) + Math.pow(side, 2));
  const angle = 45 - (Math.abs(rotation) % 90);
  const finalWidth = diagonal * Math.cos(degToRadians(angle));
  return finalWidth;
}

export default rotatedWidth;
