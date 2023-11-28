import { useLocation, useParams } from "react-router-dom";
import { Card, CardContent, Typography, Avatar } from "@mui/material";
import { getGravatarUrl } from "./utils";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import TimeLimitForm from "./TimeLimitForm";
import TimeLimitTable from "./TimeLimitTable";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import BackLink from "components/general_comps/backLink.jsx";
import OutpostLimit from "./outpostLimits/outpostLimit";
import { getGuardDetails } from "@/services/GuardService";
import { useQuery, useQueryClient } from "react-query";
import { deleteTimeLimit, getGuardTimeLimits } from "@/services/TimeLimitService";

const GuardProfile = () => {
  const { state } = useLocation();
  const { guardId } = useParams();
  const campId = state?.campId || "";
  const queryClient = useQueryClient();

  const { data: guard, error, isLoading } = useQuery(["guard", guardId], () => getGuardDetails(guardId));
  const { data: timeLimits } = useQuery(["guardTimeLimits", guardId], () => getGuardTimeLimits(guardId));

  const handleDelete = async (timeLimitId) => {
    try {
      await deleteTimeLimit(timeLimitId);
      queryClient.invalidateQueries(["guardTimeLimits"]);
    } catch (error) {
      console.error("Error deleting time limit:", error);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (isLoading || !guard) {
    return "Loading...";
  }

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

        <TimeLimitForm id={guardId} timeLimits={timeLimits} />
        {timeLimits && timeLimits.length > 0 && <TimeLimitTable timeLimits={timeLimits} handleDelete={handleDelete} />}

        <OutpostLimit guardId={Number(guardId)} campId={Number(campId)} />
      </CardContent>
      <BackLink place="end" icon={<ArrowBackIosIcon />}>
        חזרה לרשימת השומרים
      </BackLink>
    </Card>
  );
};

export default GuardProfile;
