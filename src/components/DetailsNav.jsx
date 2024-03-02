import { useJobs } from "../contexts/JobsContext";
import Button from "./Button";

function DetailsNav() {
  const { currentJob, isLoading } = useJobs();

  const { company, logo, logoBackground, website } = currentJob;

  // console.log(logo);

  if (isLoading) return;

  return (
    <nav className="details-nav">
      <span className="img-name">
        <div className="img--cont" style={{ backgroundColor: logoBackground }}>
          <img src={logo} style={{ width: "60px" }} alt={company} />
        </div>
        <span className="comp--name">
          <p className="name_company">{company}</p>

          <a href="scoot.com">{company}.com</a>
        </span>
      </span>

      <span className="site_link--span">
        <Button className="site_link">
          <a href={website}>Company site</a>
        </Button>
      </span>
    </nav>
  );
}

export default DetailsNav;
