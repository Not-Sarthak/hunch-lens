export const DashboardIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 18 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 7H17M1 13H17M1 1H17"
        stroke={
          className === "active-gradient"
            ? "url(#analytics-gradient)"
            : "currentColor"
        }
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="analytics-gradient"
          x1="10"
          y1="1"
          x2="10"
          y2="19"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#6FDBB5" />
          <stop offset="1" stopColor="#45A176" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const ProfileIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
        stroke={
          className === "active-gradient"
            ? "url(#analytics-gradient)"
            : "currentColor"
        }
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="analytics-gradient"
          x1="10"
          y1="1"
          x2="10"
          y2="19"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#6FDBB5" />
          <stop offset="1" stopColor="#45A176" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const LeaderboardIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      stroke={
        className === "active-gradient"
          ? "url(#profile-gradient)"
          : "currentColor"
      }
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 21V15C9 14.0681 9 13.6022 8.84776 13.2346C8.64477 12.7446 8.25542 12.3552 7.76537 12.1522C7.39782 12 6.93188 12 6 12C5.06812 12 4.60218 12 4.23463 12.1522C3.74458 12.3552 3.35523 12.7446 3.15224 13.2346C3 13.6022 3 14.0681 3 15V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.0799 21 6.2 21H9ZM9 21H15M9 21V6C9 5.06812 9 4.60218 9.15224 4.23463C9.35523 3.74458 9.74458 3.35523 10.2346 3.15224C10.6022 3 11.0681 3 12 3C12.9319 3 13.3978 3 13.7654 3.15224C14.2554 3.35523 14.6448 3.74458 14.8478 4.23463C15 4.60218 15 5.06812 15 6V21M15 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V11C21 10.0681 21 9.60218 20.8478 9.23463C20.6448 8.74458 20.2554 8.35523 19.7654 8.15224C19.3978 8 18.9319 8 18 8C17.0681 8 16.6022 8 16.2346 8.15224C15.7446 8.35523 15.3552 8.74458 15.1522 9.23463C15 9.60218 15 10.0681 15 11V21Z"
      />
      <defs>
        <linearGradient
          id="profile-gradient"
          x1="10"
          y1="1"
          x2="10"
          y2="19"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#6FDBB5" />
          <stop offset="1" stopColor="#45A176" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const HamburgerIcon: React.FC<{
  isOpen: boolean;
  toggle: () => void;
}> = ({ isOpen, toggle }) => {
  return (
    <button
      onClick={toggle}
      className="lg:hidden flex flex-col justify-center items-center w-10 h-10 relative z-50"
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      <span
        className={`block w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${
          isOpen ? "rotate-45 translate-y-1.5" : ""
        }`}
      ></span>
      <span
        className={`block w-6 h-0.5 bg-white rounded-full my-1.5 transition-all duration-300 ${
          isOpen ? "opacity-0" : ""
        }`}
      ></span>
      <span
        className={`block w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${
          isOpen ? "-rotate-45 -translate-y-1.5" : ""
        }`}
      ></span>
    </button>
  );
};

export const ThreeDotsIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.99996 5.00001C9.53972 5.00001 9.16663 4.62691 9.16663 4.16668C9.16663 3.70644 9.53972 3.33334 9.99996 3.33334C10.4602 3.33334 10.8333 3.70644 10.8333 4.16668C10.8333 4.62691 10.4602 5.00001 9.99996 5.00001Z"
      stroke="#737373"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.99996 10.8333C9.53972 10.8333 9.16663 10.4602 9.16663 10C9.16663 9.53977 9.53972 9.16668 9.99996 9.16668C10.4602 9.16668 10.8333 9.53977 10.8333 10C10.8333 10.4602 10.4602 10.8333 9.99996 10.8333Z"
      stroke="#737373"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.99996 16.6667C9.53972 16.6667 9.16663 16.2936 9.16663 15.8333C9.16663 15.3731 9.53972 15 9.99996 15C10.4602 15 10.8333 15.3731 10.8333 15.8333C10.8333 16.2936 10.4602 16.6667 9.99996 16.6667Z"
      stroke="#737373"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
