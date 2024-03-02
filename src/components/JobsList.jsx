import { Link } from "react-router-dom";

function JobsList({ job }) {
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
  return (
    <li>
      <Link
        className="job link"
        to={`${id}?title=${position.replace(/\s/g, "_")}`}
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
    </li>
  );
}

export default JobsList;
