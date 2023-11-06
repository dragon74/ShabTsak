import { Table, TableBody, Typography } from "@mui/material";
import GuardItem from "./GuardItem";
import { useQuery } from "react-query";
import GuardService from "../../../services/GuardService";

const GuardList = ({ campId, handleEdit, handleDelete }) => {
  console.log(campId);

  const {
    data: guards,
    isLoading,
    isError,
  } = useQuery({
    enabled: !!campId,
    queryFn: () => GuardService.getGuardsByCampId(campId),
    queryKey: ["guards", campId],
    staleTime: Infinity,
  });

  if (isLoading) {
    return <Typography align="center">Loading...</Typography>;
  }

  // Updated check here
  if (isError || !Array.isArray(guards) || guards.length === 0) {
    return <Typography align="center">No guards available</Typography>;
  }

  return (
    <Table
      sx={{ marginBottom: "15px", boxShadow: "0 3px 5px rgba(0,0,0,0.2)" }}
    >
      <TableBody>
        {guards.map((guard) => (
          <GuardItem
            key={guard.id}
            guard={guard}
            onEdit={() => handleEdit(guard)}
            onDelete={() => handleDelete(guard)}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default GuardList;
