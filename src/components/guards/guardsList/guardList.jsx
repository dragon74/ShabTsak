import PropTypes from "prop-types";
import { Container, CssBaseline, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import GuardItem from "./GuardItem";
import GuardService from "@/services/GuardService";
import { useQuery } from "react-query";

const GuardList = ({ campId, handleEdit, handleDelete }) => {
  const {
    data: guards,
    isLoading,
    isError,
  } = useQuery({
    enabled: !!campId,
    queryFn: () => GuardService.getGuardsByCampId(campId),
    queryKey: ["guards", campId],
  });

  if (isLoading) {
    return <Typography align="center">Loading...</Typography>;
  }

  if (isError || !Array.isArray(guards) || guards.length === 0) {
    return <Typography align="center">No guards available</Typography>;
  }

  return (
    <>
      <CssBaseline />
      <Container maxWidth="md" sx={{ padding: 0 }}>
        <Paper elevation={3} sx={{ marginTop: 2 }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">#</TableCell>
                  <TableCell align="center">פרופיל</TableCell>
                  <TableCell align="center">פרטים</TableCell>
                  <TableCell align="center">שיבוץ אוטומטי</TableCell>
                  <TableCell align="center">פעולות</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {guards.map((guard, index) => (
                  <GuardItem key={guard.id} index={index} guard={guard} campId={campId} onEdit={() => handleEdit(guard)} onDelete={() => handleDelete(guard)} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </>
  );
};

GuardList.propTypes = {
  campId: PropTypes.number,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default GuardList;
