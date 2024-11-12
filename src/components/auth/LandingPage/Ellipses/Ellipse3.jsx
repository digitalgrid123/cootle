import * as React from "react";

const Ellipse3 = (props) => {
  const { width = 438, height = 421 } = props; // Set default values for width and height

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 438 421"
    >
      <g filter="url(#filter0_f_2343_11615)">
        <ellipse cx="219" cy="210.5" fill="#fff" rx="69" ry="60.5"></ellipse>
        <ellipse
          cx="219"
          cy="210.5"
          fill="url(#pattern0_2343_11615)"
          rx="69"
          ry="60.5"
        ></ellipse>
        <ellipse
          cx="219"
          cy="210.5"
          fill="url(#paint0_linear_2343_11615)"
          fillOpacity="0.8"
          rx="69"
          ry="60.5"
        ></ellipse>
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_2343_11615"
          x1="219.476"
          x2="164.789"
          y1="150"
          y2="229.575"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFB726"></stop>
          <stop offset="1" stopColor="#394D66"></stop>
        </linearGradient>
        <pattern
          id="pattern0_2343_11615"
          width="1.043"
          height="1.19"
          patternContentUnits="objectBoundingBox"
        >
          <use
            xlinkHref="#image0_2343_11615"
            transform="scale(.00474 .0054)"
          ></use>
        </pattern>
        <filter
          id="filter0_f_2343_11615"
          width="438"
          height="421"
          x="0"
          y="0"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feBlend
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          ></feBlend>
          <feGaussianBlur
            result="effect1_foregroundBlur_2343_11615"
            stdDeviation="75"
          ></feGaussianBlur>
        </filter>
      </defs>
    </svg>
  );
};

export default Ellipse3;
