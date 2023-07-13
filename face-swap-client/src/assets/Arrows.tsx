import * as React from 'react';
import type { SVGProps } from 'react';
const SvgArrows = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 140 147" {...props}>
        <path
            stroke={props.stroke}
            strokeLinejoin="round"
            strokeWidth={5}
            d="M94.39 3.14a2.5 2.5 0 0 0-3.343 0l-8.204 7.374a2.5 2.5 0 0 0 0 3.719L105.13 34.26H5a2.5 2.5 0 0 0-2.5 2.5V49.24a2.5 2.5 0 0 0 2.5 2.5h100.129L82.843 71.768a2.5 2.5 0 0 0 0 3.718l8.204 7.373a2.5 2.5 0 0 0 3.343 0l42.281-38a2.499 2.499 0 0 0 0-3.718l-42.281-38Z"
        />
        <path
            stroke={props.stroke}
            strokeLinejoin="round"
            strokeWidth={3}
            d="M11 42h10v2H11zM93.338 12l9.504 8.557-1.338 1.487L92 13.486zM28 42h35v2H28z"
        />
        <path
            stroke={props.stroke}
            strokeLinejoin="round"
            strokeWidth={5}
            d="M45.61 64.14a2.5 2.5 0 0 1 3.343 0l8.204 7.374a2.5 2.5 0 0 1 0 3.719L34.87 95.26H135a2.5 2.5 0 0 1 2.5 2.5v12.478a2.5 2.5 0 0 1-2.5 2.5H34.871l22.286 20.028a2.503 2.503 0 0 1 0 3.719l-8.204 7.373a2.498 2.498 0 0 1-3.343 0l-42.281-38a2.5 2.5 0 0 1 0-3.718l42.281-38Z"
        />
        <path
            stroke={props.stroke}
            strokeLinejoin="round"
            strokeWidth={3}
            d="M129 103h-10v2h10zM46.662 73l-9.504 8.558 1.338 1.486L48 74.486zM112 103H77v2h35z"
        />
    </svg>
);
export default SvgArrows;
