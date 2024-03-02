import Overlay from "../components/Overlay";

function MainPage({ children, isDarkMode }) {
  return (
    <main className={`app ${isDarkMode ? "dark-theme" : ""}`}>
      <Overlay />
      {children}
    </main>
  );
}

export default MainPage;
