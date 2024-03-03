import { Link } from "react-router-dom";
import { useJobs } from "../contexts/JobsContext";

function JobsList({ job }) {
  const { getJob } = useJobs();
  const {
    position,
    logoBackground,
    id,
    postedAt,
    contract,
    company,
    location,
    logo,
  } = job;
  // console.log(id);
  return (
    <div>
      <Link
        className="job link"
        to={`${id}?title=${position.replace(/\s/g, "_")}`}
        // onClick={getJob}
      >
        <div
          className="logo-bg"
          style={{ backgroundColor: `${logoBackground}` }}
        >
          <img src={logo} alt="scoot" />
        </div>
        <span className="time-type">
          <p className="time">{postedAt}</p>
          <ul>
            <li className="type">{contract}</li>
          </ul>
        </span>

        <h1 className="title">{position}</h1>

        <p className="company">{company}</p>

        <h3 className="country">{location}</h3>
      </Link>
    </div>
  );
}

export default JobsList;
