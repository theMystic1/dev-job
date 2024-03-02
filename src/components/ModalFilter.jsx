import { useJobs } from "../contexts/JobsContext";
import Button from "./Button";

function ModalFilter() {
  const { jobDetails, dispatch, isFullTime, jobs, location } = useJobs();

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
  function handleLocation(e) {
    e.preventDefault();
    dispatch({ type: "location/changed", payload: e.target.value });
    // e.target.value;
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: "isModalOpen" });
    return getJobsByLocation(e) && handleJobType(e);
  }

  return (
    <form className="modal_window" onSubmit={handleSubmit}>
      <span className="srch_loc">
        <img src="/location.svg" alt="location" />
        <input
          type="text"
          placeholder="Filter by location"
          name="search"
          className="location-input"
          value={location}
          onChange={handleLocation}
        />
      </span>

      <span
        className="imgtype"
        onClick={() => dispatch({ type: "fulltime/toggled" })}
      >
        {!isFullTime ? (
          <img src="/stop-outline.svg" alt="stop" />
        ) : (
          <img src="/checkbox.svg" alt="check" />
        )}
        <p className="jobtype">Full Time only</p>
      </span>
      <span className="modal_btn">
        <Button className="btn-search_modal">Search</Button>
      </span>
    </form>
  );
}

export default ModalFilter;
