import Footer from "../components/Footer";
import JobInformation from "../components/JobInformation";
import DetailsNav from "../components/DetailsNav";
import { useJobs } from "../contexts/JobsContext";
import PageNotFound from "./PageNotFound";

function JobDetails() {
  const { currentJob } = useJobs();
  if (!currentJob) return <PageNotFound />;
  return (
    <section className="job-desc">
      <DetailsNav />
      <JobInformation />
      <Footer />
    </section>
  );
}

export default JobDetails;
