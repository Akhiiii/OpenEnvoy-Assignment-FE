import React from 'react';

export const TrendDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M10 3L10 15"
      stroke="#D0004B"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.8333 10L10 15.8333L4.16668 10"
      stroke="#D0004B"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>

);

export default TrendDownIcon;
