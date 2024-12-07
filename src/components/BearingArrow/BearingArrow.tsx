/**
 * A component that renders an SVG arrow pointing in the direction of the given bearing.
 *
 * @param {object} props
 * @param {number} props.bearing The direction in degrees
 * @returns {JSX.Element} A SVG arrow pointing in the direction of the given bearing
 */
const BearingArrow = (
  {
    bearing = 0,
    arrowSize = 15,
    color = "black",
    boxSize = "70%"
  }: {
    bearing: number,
    arrowSize?: number,
    color?: string,
    boxSize?: string
  }) => {
  const halfSize = arrowSize / 2; // For centring

  return (
    <svg
      width={boxSize}
      height={boxSize}
      viewBox={`-${halfSize} -${halfSize} ${arrowSize} ${arrowSize}`} // Origin is within centre of element
      xmlns="http://www.w3.org/2000/svg"
      className={"mx-auto my-0 overflow-hidden block"}
      style={{
        transform: `rotate(${bearing}deg)`,
        transformOrigin: "center", // Point of rotation must be in element centre
      }}
    >
      {/* Forward line */}
      <line
        x1={0}
        y1={0}
        x2={0}
        y2={-halfSize + 5}  // Line extends to -halfSize, so the arrow's tip is at the top
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
      />
      {/* Back line */}
      <line
        x1={0}
        y1={0}
        x2={0}
        y2={halfSize}
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
      />
      {/* Arrowhead */}
      <polygon
        points={`0,${-halfSize} -5,${-halfSize + 6} 5,${-halfSize + 6}`} // Triangle head
        fill={color}
      />
    </svg>
  );
};

export default BearingArrow