import { Table, TableBody, TableCell, TableRow, IconButton, Button, Avatar, Chip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { getGravatarUrl } from "./utils";
import { Link } from "react-router-dom";

const StatusChip = ({ shouldBeAllocated }) => (shouldBeAllocated ? <Chip label="משתתף" color="primary" /> : <Chip label="לא משתתף" color="secondary" />);

export const GuardItem = ({ guard, onEdit, onDelete }) => (
  <Table sx={{ marginBottom: "15px", boxShadow: "0 3px 5px rgba(0,0,0,0.2)" }}>
    <TableBody>
      <TableRow key={guard.id}>
        <TableCell>
          <Avatar src={getGravatarUrl(guard.mail)} alt={guard.name} />
        </TableCell>
        <TableCell>
          <div>{guard.name}</div>
          <div>Email: {guard.mail}</div>
          <div>Phone: {guard.phone}</div>
        </TableCell>
        <TableCell>
          <StatusChip shouldBeAllocated={guard.shouldBeAllocated} />
        </TableCell>
        <TableCell>
          <Button component={Link} to={`/guards/${guard.id}`} variant="outlined" color="primary" size="small" sx={{ marginRight: "10px" }}>
            מגבלות
          </Button>
          <IconButton onClick={() => onEdit(guard)} size="large">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => onDelete(guard)} size="large" sx={{ marginLeft: "10px" }}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
);
