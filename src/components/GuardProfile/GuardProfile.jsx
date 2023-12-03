import {Link, useLocation, useParams} from "react-router-dom";
import {Card, CardContent, Typography, Avatar, IconButton, Stack} from "@mui/material";
import { getGravatarUrl } from "./GuardProfileLimits/utils.js";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import GuardProfileTimeLimitForm from "components/GuardProfile/GuardProfileLimits/GuardProfileTimeLimit/GuardProfileTimeLimitForm/GuardProfileTimeLimitForm.jsx";
import GuardProfileTimeLimitTable from "components/GuardProfile/GuardProfileLimits/GuardProfileTimeLimit/GuardProfileTimeLimitTable/GuardProfileTimeLimitTable.jsx";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import BackLink from "components/general_comps/BackLink.jsx";
import GuardProfileOutpostLimit from "components/GuardProfile/GuardProfileLimits/GuardProfileOutpostLimit/GuardProfileOutpostLimit.jsx";
import { getGuardDetails } from "@/services/guardService.js";
import { useQuery, useQueryClient } from "react-query";
import { deleteTimeLimit, getGuardTimeLimits } from "@/services/timeLimitService.js";
import {EmailRounded} from "@mui/icons-material";
import GuardProfileContact from "components/GuardProfile/GuardProfileContact/GuardProfileContact.jsx";
import {Box} from "@mui/system";

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
    <Card style={{ minWidth: 450, maxWidth: 700, margin: "auto", marginTop: "20px", padding: "16px" }}>
      <CardContent>
        <Avatar
          src={getGravatarUrl(guard.mail)}
          alt={guard.name}
          style={{ width: "80px", height: "80px", margin: "0 auto 1em" }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = MilitaryTechIcon;
          }}
        >
          {!getGravatarUrl(guard.mail) && <MilitaryTechIcon fontSize="large" />}
        </Avatar>
        <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
          {guard.name}
        </Typography>
        <Stack direction="row" alignItems="center" gap={1} sx={{ marginBottom: '1em' }}>
          <Box sx={{ borderRadius: "50%", width: "1em", height: "1em", backgroundColor: guard.shouldBeAllocated ? "green" : "red", margin: 1 }} />
          סטטוס:
          <Typography variant="body1" fontWeight={500}>
            {guard.shouldBeAllocated ? "משתתף" : "לא משתתף"}
          </Typography>
        </Stack>
        <GuardProfileContact mail={guard.mail} phone={guard.phone} />
        <Typography variant="h6" component="h3">
          מגבלות:
        </Typography>
        <GuardProfileTimeLimitForm id={guardId} timeLimits={timeLimits} />
        {timeLimits && timeLimits.length > 0 && <GuardProfileTimeLimitTable timeLimits={timeLimits} handleDelete={handleDelete} />}
        <br />
        <GuardProfileOutpostLimit guardId={Number(guardId)} campId={Number(campId)} />
      </CardContent>
      <Box sx={{ marginInlineEnd: 1 }}>
        <BackLink place="end" icon={<ArrowBackIosIcon />}>
          חזרה לרשימת השומרים
        </BackLink>
      </Box>
    </Card>
  );
};

export default GuardProfile;
