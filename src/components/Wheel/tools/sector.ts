export function getSectorPath(
  x: number,
  y: number,
  radius: number,
  a1: number,
  a2: number,
): string {
  const cx1 = Math.cos(degreesToRadians(a2)) * radius + x;
  const cy1 = -Math.sin(degreesToRadians(a2)) * radius + y;
  const cx2 = Math.cos(degreesToRadians(a1)) * radius + x;
  const cy2 = -Math.sin(degreesToRadians(a1)) * radius + y;

  return `M${x} ${y} ${cx1} ${cy1} A${radius} ${radius} 0 0 1 ${cx2} ${cy2}Z`;
}

export function getSectorCenter(
  x: number,
  y: number,
  spread: number,
  angle: number,
): [number, number] {
  const cx = (Math.cos(degreesToRadians(angle)) * spread) / 2 + x;
  const cy = (-Math.sin(degreesToRadians(angle)) * spread) / 2 + y;
  return [cx, cy];
}

export function degreesToRadians(degrees: number): number {
  return (Math.PI / 180) * degrees;
}
