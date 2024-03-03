import { useParams } from "react-router-dom";
import Button from "./Button";
import { useEffect } from "react";
import { useJobs } from "../contexts/JobsContext";
import Spinner from "./Spinner.";
import PageNotFound from "../pages/PageNotFound";

function JobInformation() {
  const { id } = useParams();
  const { getJob, currentJob, isLoading } = useJobs();
  const {
    contract,
    description,
    location,
    position,
    postedAt,
    requirements,
    role,
  } = currentJob;
  // console.log(currentJob);

  useEffect(() => {
    getJob(id);
  }, [id]);

  // console.log(currentJob);
  if (isLoading) return <Spinner />;
  // if (!currentJob) return <PageNotFound />;
  return (
    <section className="job--info">
      <header className="heading">
        <div className="head-info">
          <span className="time-type">
            <p className="time">{postedAt}</p>
            <ul>
              <li className="type">{contract}</li>
            </ul>
          </span>
          <h1 className="title">{position}</h1>

          <h3 className="country">{location}</h3>
        </div>
        <span>
          <Button className="btn_apply">Apply Now</Button>
        </span>
      </header>

      <p className="desc">{description}</p>

      <h2 className="req">Requirements</h2>

      <p className="desc requirement">{requirements?.content}</p>

      <ul className="requ-list">
        {requirements?.items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <h2 className="req">What You Will Do</h2>

      <p className="desc">{role?.content}</p>

      <ol className="requ-list">
        {role?.items.map((item, i) => (
          <li key={i}>
            <span className="index">{i + 1}</span> <span>{item}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default JobInformation;
