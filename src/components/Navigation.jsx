import Logo from "./Logo";

function Navigation({ isDarkMode, onHandleDarkMode }) {
  return (
    <nav className="nav">
      <Logo />
      <span>
        <img src="/sunny.svg" alt="sun" />
        <button className="toggle-mode" onClick={onHandleDarkMode}>
          <div
            className={`toggle-el ${isDarkMode ? "toggle" : "notToggle"}`}
          ></div>
        </button>
        <img src="/moon.svg" alt="sun" />
      </span>
    </nav>
  );
}

export default Navigation;
