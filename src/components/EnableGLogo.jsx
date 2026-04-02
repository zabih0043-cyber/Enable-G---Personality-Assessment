export default function EnableGLogo({ className = "", title = "Enable G" }) {
  return (
    <svg
      viewBox="0 0 240 92"
      aria-label={title}
      role="img"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>

      <g
        transform="translate(76 4)"
        stroke="#89c541"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        <g transform="translate(0 8)">
          <circle cx="10" cy="6" r="4" fill="#89c541" stroke="none" />
          <path d="M10 13v14" />
          <path d="M4 20l6-7 6 7" />
          <path d="M6 29l4-8 4 8" />
        </g>

        <g transform="translate(18 2)">
          <circle cx="12" cy="6" r="4.5" fill="#89c541" stroke="none" />
          <path d="M12 14v18" />
          <path d="M4 22l8-8 8 8" />
          <path d="M7 34l5-10 5 10" />
        </g>

        <g transform="translate(40 0)">
          <circle cx="12" cy="6" r="4.5" fill="#89c541" stroke="none" />
          <path d="M12 14v19" />
          <path d="M3 22l9-9 9 9" />
          <path d="M7 35l5-11 5 11" />
        </g>

        <g transform="translate(63 6)">
          <circle cx="10" cy="6" r="4" fill="#89c541" stroke="none" />
          <path d="M10 13v15" />
          <path d="M4 20l6-7 6 7" />
          <path d="M6 30l4-8 4 8" />
        </g>
      </g>

      <text
        x="120"
        y="64"
        textAnchor="middle"
        fill="#1f2937"
        fontSize="21"
        fontWeight="800"
        letterSpacing="1.8"
        style={{ fontFamily: "Inter, Arial, sans-serif" }}
      >
        ENABLE G
      </text>
    </svg>
  );
}
