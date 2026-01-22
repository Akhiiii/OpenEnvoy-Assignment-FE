import React from 'react';

export const TrendUpIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M10 17L10 5"
      stroke="#00AC4F"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.16666 9.99999L10 4.16666L15.8333 9.99999"
      stroke="#00AC4F"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default TrendUpIcon;
