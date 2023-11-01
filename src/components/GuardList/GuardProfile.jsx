import { useParams } from "react-router-dom";
import { Card, CardContent, Typography, Avatar } from "@mui/material";
import { getGravatarUrl } from "./utils";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import TimeLimitForm from "./TimeLimitForm";
import TimeLimitTable from "./TimeLimitTable";
import BackLink from "../general_comps/backLink";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useQuery } from "react-query";
import GuardService from "@/services/GuardService.js";
import LoadingComp from "components/general_comps/loadingComp.jsx";
import TimeLimitService from "@/services/TimeLimitService.js";

const GuardProfile = () => {
  const { id: guardId } = useParams();
  const { isLoading: loadingGuard, isError: errorGuard, data: guard } = useQuery({
    queryKey: ["guard", guardId],
    queryFn: () => GuardService.getGuardDetails(guardId),
    enabled: !!guardId,
    initialData: null
  })
  const { data: timeLimits } = useQuery({
    queryKey: ["timeLimit", guardId],
    queryFn: () => TimeLimitService.getGuardTimeLimits(guardId),
    enabled: !!guardId,
    initialData: []
  })
  console.log(timeLimits)

  if (loadingGuard) return <LoadingComp />
  if (!errorGuard) return <>Error!</>
  if (!guard) return "ASD"

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
        {timeLimits.length > 0 && <TimeLimitTable timeLimits={timeLimits} />}
      </CardContent>
      <BackLink place="end" icon={<ArrowBackIosIcon />}>
        חזרה לרשימת השומרים
      </BackLink>
    </Card>
  );
};

export default GuardProfile;
