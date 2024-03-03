import Button from "./Button";
import JobsList from "./JobsList";
import ErrorMessage from "./ErrorMessage";
import Spinner from "./Spinner.";
import Filter from "./Filter";
import { useJobs } from "../contexts/JobsContext";
import PhoneFilter from "./PhoneFilter";
import ModalFilter from "./ModalFilter";

function JobsContainer() {
  const {
    jobs,
    isLoading,
    fullList,
    handleClick,
    isSearchedData,
    originalJobs,
    isModalOpen,
    // allJobs,
  } = useJobs();

  if (isLoading) return <Spinner />;

  if (!originalJobs.length && isSearchedData) {
    return (
      <>
        <Filter />
        <ErrorMessage />
      </>
    );
  }
  return (
    <>
      <Filter />
      <PhoneFilter />
      {isModalOpen && <ModalFilter />}
      <section className="jobs">
        {isSearchedData
          ? originalJobs.map((job) => <JobsList job={job} key={job.id} />)
          : fullList
          ? jobs?.map((job) => <JobsList job={job} key={job.id} />)
          : jobs
              ?.slice(0, 12)
              .map((job) => <JobsList job={job} key={job.id} />)}
      </section>
      <span className="more-btn">
        {jobs.length > 0 && !isSearchedData && (
          <Button
            className="more_btn"
            onClick={handleClick}
            disabled={isLoading}
          >
            {fullList ? "Show less" : "Load more"}
          </Button>
        )}
      </span>
    </>
  );
}

export default JobsContainer;
