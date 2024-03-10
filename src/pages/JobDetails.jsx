import Footer from "../components/Footer";
import JobInformation from "../components/JobInformation";
import DetailsNav from "../components/DetailsNav";
// import PageNotFound from "./PageNotFound";

function JobDetails() {
  return (
    <section className="job-desc">
      <DetailsNav />
      <JobInformation />
      <Footer />
    </section>
  );
}

export default JobDetails;
