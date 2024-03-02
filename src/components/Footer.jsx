import { useJobs } from "../contexts/JobsContext";
import Button from "./Button";

function Footer() {
  const { currentJob, isLoading } = useJobs();

  const { company, position } = currentJob;

  if (isLoading) return;
  return (
    <footer className="footer">
      <div className="footer_cont">
        <span>
          <h1 className="title">{position}</h1>
          <p className="time">{company} Inc.</p>
        </span>

        <span>
          <Button className="footer_btn">Apply Now</Button>
        </span>
      </div>
    </footer>
  );
}

export default Footer;
