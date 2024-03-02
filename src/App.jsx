import JobsContainer from "./components/JobsContainer";
import JobDetails from "./pages/JobDetails";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import { JobsProvider } from "./contexts/JobsContext";
import PageNotFound from "./pages/PageNotFound";
import Navigation from "./components/Navigation";
import { useState } from "react";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  function handleDarkMode() {
    setIsDarkMode((isd) => !isd);
  }
  return (
    <JobsProvider>
      <MainPage isDarkMode={isDarkMode}>
        <BrowserRouter>
          <Navigation
            onHandleDarkMode={handleDarkMode}
            isDarkMode={isDarkMode}
          />

          <Routes>
            <Route path="*" element={<PageNotFound />} />
            <Route path="/" element={<JobsContainer />} />
            {/* <Route path="jobs" element={<JobsContainer />} /> */}

            <Route path="jobs/:id" element={<JobDetails />} />
            <Route path="/:id" element={<JobDetails />} />
          </Routes>
        </BrowserRouter>
      </MainPage>
    </JobsProvider>
  );
}

export default App;
