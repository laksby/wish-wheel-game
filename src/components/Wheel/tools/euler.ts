export function getRotationFromMatrixNotation(matrixNotation: string): number {
  const matrixRegex = /matrix\((.*),\s*(.*),\s*(.*),\s*(.*),\s*(.*),\s*(.*)\)/g;
  const values = matrixRegex.exec(matrixNotation)?.slice(1, 7);
  const numbers = values?.map(n => parseFloat(n)) || [];

  const angle = Math.round(Math.atan2(numbers[1], numbers[0]) * (180 / Math.PI));
  return angle < 0 ? angle + 360 : angle;
}
