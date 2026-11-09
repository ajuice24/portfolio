import type { WorkMark } from "@/data/portfolio";

const stroke = "#18181b";

export function WorkFrame({ mark }: { mark: WorkMark }) {
  return (
    <svg
      viewBox="0 0 160 100"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <rect width="160" height="100" fill="#e8ecf0" />
      {mark === "signal" && (
        <>
          <circle cx="80" cy="52" r="6" fill="none" stroke={stroke} strokeOpacity="0.7" />
          <circle cx="80" cy="52" r="16" fill="none" stroke={stroke} strokeOpacity="0.4" />
          <circle cx="80" cy="52" r="28" fill="none" stroke={stroke} strokeOpacity="0.22" />
        </>
      )}
      {mark === "orbit" && (
        <>
          <ellipse
            cx="80"
            cy="52"
            rx="46"
            ry="16"
            fill="none"
            stroke={stroke}
            strokeOpacity="0.35"
          />
          <ellipse
            cx="80"
            cy="52"
            rx="28"
            ry="10"
            fill="none"
            stroke={stroke}
            strokeOpacity="0.25"
          />
          <circle cx="118" cy="44" r="3.5" fill={stroke} fillOpacity="0.75" />
          <circle cx="80" cy="52" r="4" fill={stroke} fillOpacity="0.45" />
        </>
      )}
      {mark === "horizon" && (
        <>
          <path d="M16 62h128" stroke={stroke} strokeOpacity="0.45" />
          <path d="M28 70h104" stroke={stroke} strokeOpacity="0.28" />
          <path d="M40 78h80" stroke={stroke} strokeOpacity="0.16" />
          <circle cx="46" cy="36" r="8" fill="none" stroke={stroke} strokeOpacity="0.4" />
        </>
      )}
      {mark === "plan" && (
        <>
          <rect x="36" y="22" width="88" height="56" fill="none" stroke={stroke} strokeOpacity="0.4" />
          <path d="M36 42h88M68 22v56M108 42v36" stroke={stroke} strokeOpacity="0.28" />
        </>
      )}
      {mark === "shelves" && (
        <>
          <rect x="34" y="28" width="36" height="44" fill="none" stroke={stroke} strokeOpacity="0.4" />
          <rect x="62" y="20" width="36" height="52" fill="#e8ecf0" stroke={stroke} strokeOpacity="0.55" />
          <rect x="90" y="34" width="36" height="38" fill="#e8ecf0" stroke={stroke} strokeOpacity="0.28" />
        </>
      )}
    </svg>
  );
}
