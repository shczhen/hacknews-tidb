import * as React from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

export function TiDBCloudLogo(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 256.74 256.74" {...props}>
      <defs>
        <linearGradient
          id="linear-gradient"
          x1="1798.23"
          y1="-5866.36"
          x2="1803.95"
          y2="-5872.2"
          gradientTransform="translate(-54830.49 -127812.94) scale(30.52 -21.8)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#e30c34" />
          <stop offset="1" stopColor="#b7062c" />
        </linearGradient>
      </defs>
      <g id="Layer_1" data-name="Layer 1">
        <g>
          <rect fill="none" width="256.74" height="256.74" />
          <g id="Group_1794" data-name="Group 1794">
            <path
              id="Path_4369"
              data-name="Path 4369"
              fill="url(#linear-gradient)"
              d="M202.51,79.58c-23.51-40.94-75.76-55.07-116.7-31.55-22.03,12.65-37.29,34.44-41.64,59.47C13.48,114.6-5.63,145.24,1.49,175.93c5.99,25.86,29.04,44.17,55.58,44.16,1.93,0,3.86-.1,5.78-.29h116.83c1.91,.15,3.83,.29,5.78,.29,39.37,0,71.29-31.92,71.29-71.29,0-32.8-22.38-61.37-54.23-69.22h0Z"
            />
            <g id="Group_1793" data-name="Group 1793">
              <path
                id="Path_4370"
                data-name="Path 4370"
                fill="#fff"
                d="M128.29,81.27l-44.16,25.5v25.49l22.09-12.75v51.32l22.08,12.73h0V106.75l22.08-12.75-22.08-12.74Z"
              />
              <path
                id="Path_4371"
                data-name="Path 4371"
                fill="#fff"
                d="M150.5,119.64v51.17l22.17-12.8v-51.19l-22.17,12.81Z"
              />
            </g>
          </g>
        </g>
      </g>
    </SvgIcon>
  );
}

export function WebsiteLogo(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 360 360" fill="none" {...props}>
      {/* <rect
        width="360"
        height="360"
        stroke="white"
        strokeWidth="10"
        fill="none"
      />
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M261.091 147.364H232.727C231.636 141.303 229.606 135.97 226.636 131.364C223.667 126.758 220.03 122.848 215.727 119.636C211.424 116.424 206.606 114 201.273 112.364C196 110.727 190.394 109.909 184.455 109.909C173.727 109.909 164.121 112.606 155.636 118C147.212 123.394 140.545 131.303 135.636 141.727C130.788 152.152 128.364 164.879 128.364 179.909C128.364 195.061 130.788 207.848 135.636 218.273C140.545 228.697 147.242 236.576 155.727 241.909C164.212 247.242 173.758 249.909 184.364 249.909C190.242 249.909 195.818 249.121 201.091 247.545C206.424 245.909 211.242 243.515 215.545 240.364C219.848 237.212 223.485 233.364 226.455 228.818C229.485 224.212 231.576 218.939 232.727 213L261.091 213.091C259.576 222.242 256.636 230.667 252.273 238.364C247.97 246 242.424 252.606 235.636 258.182C228.909 263.697 221.212 267.97 212.545 271C203.879 274.03 194.424 275.545 184.182 275.545C168.061 275.545 153.697 271.727 141.091 264.091C128.485 256.394 118.545 245.394 111.273 231.091C104.061 216.788 100.455 199.727 100.455 179.909C100.455 160.03 104.091 142.97 111.364 128.727C118.636 114.424 128.576 103.455 141.182 95.8182C153.788 88.1212 168.121 84.2727 184.182 84.2727C194.061 84.2727 203.273 85.697 211.818 88.5455C220.424 91.3333 228.152 95.4545 235 100.909C241.848 106.303 247.515 112.909 252 120.727C256.485 128.485 259.515 137.364 261.091 147.364Z"
        fill="#F1F1F1"
      /> */}
      <rect
        x="5"
        y="5"
        width="350"
        height="350"
        stroke="white"
        strokeWidth="10"
      />
      <path
        d="M180 88C134.695 88 98 106.298 98 128.889C98 151.48 134.695 169.778 180 169.778C225.305 169.778 262 151.48 262 128.889C262 106.298 225.305 88 180 88ZM98 149.333V180C98 202.591 134.695 220.889 180 220.889C225.305 220.889 262 202.591 262 180V149.333C262 171.924 225.305 190.222 180 190.222C134.695 190.222 98 171.924 98 149.333ZM98 200.444V231.111C98 253.702 134.695 272 180 272C225.305 272 262 253.702 262 231.111V200.444C262 223.036 225.305 241.333 180 241.333C134.695 241.333 98 223.036 98 200.444Z"
        fill="white"
      />
    </SvgIcon>
  );
}
