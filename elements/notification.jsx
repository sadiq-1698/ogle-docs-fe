const NotificationIcon = ({ transform = "translate(3, 3)" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      version="1.1"
      x="0"
      y="0"
      width="30px"
      height="30px"
      viewBox="0 0 30 30"
      preserveAspectRatio="none"
    >
      <g xmlns="http://www.w3.org/2000/svg" transform={transform}>
        <path d="M0 0h24v24H0z" fill="none" />
        <path
          fill="#444746"
          d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.40-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"
        />
      </g>
    </svg>
  );
};

export default NotificationIcon;
