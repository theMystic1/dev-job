import { useEffect, useState } from "react";
import { useJobs } from "../contexts/JobsContext";
import Button from "./Button";

function Filter() {
  // const [location, setLocation] = useState("");
  const { jobDetails, dispatch, isFullTime, jobs, location } = useJobs();

  function handeleDeatils(e) {
    dispatch({ type: "jobDetails/changed", payload: e.target.value });
  }

  function handleLocation(e) {
    e.preventDefault();
    dispatch({ type: "location/changed", payload: e.target.value });
    // e.target.value;
  }

  async function getJobsByLocation(e) {
    e.preventDefault();
    try {
      if (location.length < 1) return;
      dispatch({ type: "isLoading", payload: true });
      const theJobs = await jobs.filter((job) =>
        job.location.toLowerCase().includes(location.toLowerCase())
      );

      const fulltime = (await isFullTime)
        ? theJobs.filter((job) => job.contract.toLowerCase() === "full time")
        : theJobs;

      setTimeout(() => {
        dispatch({ type: "searchedJobs/loaded", payload: fulltime });

        dispatch({ type: "location/changed", payload: "" });
      }, 1000);
    } catch (error) {
      dispatch({ type: "error", payload: "Error fetching job" });
    }
  }

  function handleJobType(e) {
    e.preventDefault();
    dispatch({ type: "isLoading", payload: true });

    const fulltime = isFullTime
      ? jobs.filter((job) => job.contract.toLowerCase() === "full time")
      : jobs;

    setTimeout(() => {
      dispatch({ type: "searchedJobs/loaded", payload: fulltime });
    }, 1000);
  }

  async function handleTitleSearch(e) {
    e.preventDefault();
    try {
      if (jobDetails.length < 1) return;
      dispatch({ type: "isLoading", payload: true });
      const theJobs = await jobs.filter((job) =>
        job.position.toLowerCase().includes(jobDetails.toLowerCase())
      );

      const fulltime = (await isFullTime)
        ? theJobs.filter((job) => job.contract.toLowerCase() === "full time")
        : theJobs;

      setTimeout(() => {
        dispatch({ type: "searchedJobs/loaded", payload: fulltime });

        dispatch({ type: "jobDetails/changed", payload: "" });
      }, 1000);
    } catch (error) {
      dispatch({ type: "error", payload: "Error fetching job" });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    return (handleTitleSearch(e) && handleJobType(e)) || getJobsByLocation(e);
  }

  return (
    <form className="filter" onSubmit={handleSubmit}>
      <img src="/search.svg" alt="src" />
      <input
        type="text"
        placeholder="Filter by title, companies, expertise..."
        name="search"
        className="title-input"
        value={jobDetails}
        onChange={handeleDeatils}
      />

      <img src="/location.svg" alt="location" />
      <input
        type="text"
        placeholder="Filter by location"
        name="search"
        className="location-input"
        value={location}
        onChange={handleLocation}
      />

      <span>
        <span onClick={() => dispatch({ type: "fulltime/toggled" })}>
          {!isFullTime ? (
            <img src="/stop-outline.svg" alt="stop" />
          ) : (
            <img src="/checkbox.svg" alt="check" />
          )}
          <p className="jobtype">Full Time only</p>
        </span>
        <Button
          className="btn-search"
          // onClick={() => getJobsByLocation(location)}
        >
          Search
        </Button>
      </span>
    </form>
  );
}

export default Filter;
