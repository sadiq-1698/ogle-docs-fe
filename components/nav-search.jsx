import "../styles/globals.css";

export default function NavSearch() {
  return (
    <div className="nav-search bg-grey-6 p-1 flex items-center w-4/12 h-11 rounded-md">
      <button
        role="button"
        aria-label="Search"
        className="h-10 w-10 p-1 ml-1 flex items-center justify-center rounded-full hover:bg-gray-200 transition-all ease-in-out"
      >
        <svg
          focusable="false"
          height="28px"
          width="28px"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill="#7B7F83"
        >
          <path d="M20.49,19l-5.73-5.73C15.53,12.2,16,10.91,16,9.5C16,5.91,13.09,3,9.5,3S3,5.91,3,9.5C3,13.09,5.91,16,9.5,16 c1.41,0,2.7-0.47,3.77-1.24L19,20.49L20.49,19z M5,9.5C5,7.01,7.01,5,9.5,5S14,7.01,14,9.5S11.99,14,9.5,14S5,11.99,5,9.5z"></path>
          <path d="M0,0h24v24H0V0z" fill="none"></path>
        </svg>
      </button>
      <input
        placeholder="Search"
        className="h-full w-11/12 px-2 bg-transparent outline-none"
      ></input>
    </div>
  );
}
