import { createContext, useReducer, useEffect, useContext } from "react";

const initialState = {
  jobs: [],
  originalJobs: [],
  currentJob: {},
  isLoading: false,
  isSearchedData: false,
  fullList: false,
  location: "",
  jobDetails: "",
  isFullTime: false,
  isModalOpen: false,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "jobs/loaded":
      return {
        ...state,
        isLoading: false,
        jobs: action.payload,
      };
    case "searchedJobs/loaded":
      return {
        ...state,
        isLoading: false,
        isSearchedData: true,
        originalJobs: action.payload,
      };
    case "job/loaded":
      return {
        ...state,
        isLoading: false,
        currentJob: action.payload,
      };

    case "isLoading":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "error":
      return {
        ...state,
        error: action.payload,
      };
    case "fullList/toggled":
      return {
        ...state,
        isLoading: false,
        fullList: !state.fullList,
      };
    case "fulltime/toggled":
      return {
        ...state,
        isLoading: false,
        isFullTime: !state.isFullTime,
      };
    case "location/changed":
      return {
        ...state,
        isLoading: false,
        // jobs: action.payload,
        location: action.payload,
      };
    case "jobDetails/changed":
      return {
        ...state,
        isLoading: false,
        jobDetails: action.payload,
      };
    case "isModalOpen":
      return {
        ...state,
        isModalOpen: !state.isModalOpen,
      };
    default:
      throw new Error("Unknown action");
  }
}

const BASE_URL = "http://localhost:8000";

const JobsContext = createContext();

function JobsProvider({ children }) {
  const [
    {
      isLoading,
      jobs,
      currentJob,
      fullList,
      location,
      jobDetails,
      isFullTime,
      originalJobs,
      isSearchedData,
      isModalOpen,
      // allJobs,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(function () {
    dispatch({ type: "isLoading", payload: true });
    async function loadJobs() {
      try {
        const res = await fetch(`${BASE_URL}/jobs`);
        const data = await res.json();

        setTimeout(() => {
          dispatch({
            type: "jobs/loaded",
            payload: data,
          });
        }, 1000);

        // dispatch({
        //   type: "alljobs/loaded",
        //   payload: data,
        // });
        // payload: data,
      } catch (error) {
        dispatch({ type: "error", payload: error.message });
      }
    }

    loadJobs();
  }, []);

  async function getJob(id) {
    // console.log(id, currentJob.id);
    if (id === currentJob.id) return;
    dispatch({ type: "isLoading", payload: true });
    try {
      const res = await fetch(`${BASE_URL}/jobs/${id}`);
      const data = await res.json();

      // currentJob = {};
      setTimeout(() => {
        dispatch({ type: "job/loaded", payload: data });
      }, 1200);
    } catch (error) {
      dispatch({ type: "error", payload: "Error fetching job" });
    }
  }

  function handleClick(e) {
    e.preventDefault();
    dispatch({ type: "fullList/toggled" });
  }

  return (
    <JobsContext.Provider
      value={{
        jobs,
        isLoading,
        fullList,
        handleClick,
        getJob,
        currentJob,
        location,
        jobDetails,
        dispatch,
        isFullTime,
        originalJobs,
        isSearchedData,
        isModalOpen,
        // allJobs,
      }}
    >
      {children}
    </JobsContext.Provider>
  );
}

function useJobs() {
  const context = useContext(JobsContext);

  if (context === undefined)
    throw new Error("JobContext was used outside the JobProvider");

  return context;
}

export { JobsProvider, useJobs };
