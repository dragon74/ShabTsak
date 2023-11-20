import { TableRow, TableCell, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const GuardOutpostTableRow = ({ outpostLimit, outposts, handleDelete }) => {
  const outpost = outposts?.find((o) => o.id === outpostLimit.outpostId);

  return (
    <TableRow>
      <TableCell>{outpost ? outpost.name : "Unknown"}</TableCell>
      <TableCell>
        <Tooltip title="Delete">
          <IconButton aria-label="delete" color="error" onClick={() => handleDelete(outpostLimit.id)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};

export default GuardOutpostTableRow;
