import React from "react";
import { Table, TableBody, Typography } from "@mui/material";
import GuardItem from "./GuardItem";
import { useQuery } from "react-query";
import GuardService from "../../../services/GuardService";
import { useParams } from "react-router-dom";

const GuardList = ({ handleEdit }) => {
  const params = useParams();
  const campId = params.id;

  const {
    data: guards,
    isLoading,
    isError,
  } = useQuery(["guards", campId], () => GuardService.getGuardsByCampId(campId), {
    enabled: !!campId,
    initialData: [],
  });

  if (isLoading) {
    return <Typography align="center">Loading...</Typography>;
  }

  if (isError || !guards.length) {
    return <Typography align="center">No guards available</Typography>;
  }

  return (
    <Table sx={{ marginBottom: "15px", boxShadow: "0 3px 5px rgba(0,0,0,0.2)" }}>
      <TableBody>
        {guards.map((guard) => (
          <GuardItem key={guard.id} guard={guard} onEdit={() => handleEdit(guard)} />
        ))}
      </TableBody>
    </Table>
  );
};

export default GuardList;
