import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, Typography, Avatar } from "@mui/material";
import { getGravatarUrl, getDayName } from "./utils";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import TimeLimitForm from "./TimeLimitForm";
import TimeLimitTable from "./TimeLimitTable";
import { GUARD_URL, API_URL } from "../../constants/apiConstants";
import { toast } from "react-toastify";
import BackLink from "../general_comps/backLink";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const GuardProfile = () => {
  const { id } = useParams();
  const [guard, setGuard] = useState(null);
  const [timeLimits, setTimeLimits] = useState([]);
  const [error, setError] = useState("");

  const fetchGuardDetails = async () => {
    try {
      const response = await axios.get(GUARD_URL + `/${id}`);
      setGuard(response.data);
    } catch (err) {
      console.error("Error fetching guard details:", err);
      setError("Failed to fetch guard details. Please try again.");
      toast.error("Failed to fetch guard details. Please try again.");
    }
  };

  const fetchTimeLimits = async () => {
    try {
      const response = await axios.get(API_URL + `/guardtimelimit/guard/${id}`);
      setTimeLimits(response.data);
    } catch (err) {
      console.error("Error fetching guard time limits:", err);
      setError("Failed to fetch time limits. Please try again.");
      toast.error("Failed to fetch time limits. Please try again.");
    }
  };

  useEffect(() => {
    fetchGuardDetails();
    fetchTimeLimits();
  }, [id]);

  const handleDelete = async (timeLimitId) => {
    try {
      await axios.delete(API_URL + `/guardtimelimit/${timeLimitId}`);
      fetchTimeLimits();
      toast.success("Time limit deleted successfully.");
    } catch (err) {
      console.error("Error deleting time limit:", err);
      toast.error("Failed to delete time limit. Please try again.");
    }
  };

  if (error) return <div>{error}</div>;
  if (!guard) return "Loading...";

  return (
    <Card style={{ minWidth: 275, maxWidth: 500, margin: "auto", marginTop: "20px", padding: "16px" }}>
      <CardContent>
        <Avatar
          src={getGravatarUrl(guard.mail)}
          alt={guard.name}
          style={{ width: "120px", height: "120px", margin: "auto" }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = MilitaryTechIcon;
          }}
        >
          {!getGravatarUrl(guard.mail) && <MilitaryTechIcon fontSize="large" />}
        </Avatar>
        <Typography variant="h5" component="h2" style={{ marginBottom: "16px", textAlign: "center" }}>
          {guard.name}
        </Typography>

        {/* Display guard's details */}
        <Typography variant="body1" style={{ marginBottom: "8px" }}>
          מייל: {guard.mail}
        </Typography>
        <Typography variant="body1" style={{ marginBottom: "8px" }}>
          נייד: {guard.phone}
        </Typography>
        <Typography variant="body1" style={{ marginBottom: "16px" }}>
          משתתף: {guard.shouldBeAllocated ? "Yes" : "No"}
        </Typography>

        <TimeLimitForm id={id} fetchTimeLimits={fetchTimeLimits} timeLimits={timeLimits} />
        {timeLimits.length > 0 && <TimeLimitTable timeLimits={timeLimits} handleDelete={handleDelete} />}
      </CardContent>
      <BackLink place="end" icon={<ArrowBackIosIcon />}>
        חזרה לרשימת השומרים
      </BackLink>
    </Card>
  );
};

export default GuardProfile;
