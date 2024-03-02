import { useJobs } from "../contexts/JobsContext";
import Button from "./Button";

function PhoneFilter() {
  const { dispatch, isFullTime, jobs, jobDetails } = useJobs();

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

  function handeleDeatils(e) {
    dispatch({ type: "jobDetails/changed", payload: e.target.value });
  }

  function handleModalWindow(e) {
    e.preventDefault();
    dispatch({ type: "isModalOpen" });
  }

  return (
    <form className="phone-filter" onSubmit={handleTitleSearch}>
      <input
        type="text"
        placeholder="Filter by title..."
        value={jobDetails}
        onChange={handeleDeatils}
      />
      <span className="filter--btn" onClick={handleModalWindow}>
        <img src="./assets/mobile/icon-filter.svg" alt="" />
      </span>

      <Button className="btn--phn">
        <img src="/assets/mobile/003-search.png" alt="" />
      </Button>
    </form>
  );
}

export default PhoneFilter;
