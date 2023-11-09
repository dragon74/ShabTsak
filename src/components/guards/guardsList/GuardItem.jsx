import {
  TableCell,
  TableRow,
  IconButton,
  Button,
  Avatar,
  Chip, Stack,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { getGravatarUrl } from "../../GuardList/utils";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import useBreakpoint from "@/hooks/useBreakpoint";

const GuardItem = ({ guard, onEdit, onDelete }) => {
  const tableRowSx = useBreakpoint({ md: [false, { display: "flex", alignItems: "center", flexDirection: "column", "> *": { border: "0" }, boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px", marginBottom: 2, borderRadius: "12px", marginX: "1rem" }] });

  return (
    <TableRow key={guard.id} sx={tableRowSx}>
      <TableCell>
        <Avatar src={getGravatarUrl(guard.mail)} alt={guard.name} />
      </TableCell>
      <TableCell sx={{ textAlign: "center" }}>
        <div style={{ maxWidth: "200px", textOverflow: "ellipsis", overflow: "hidden" }}>{guard.name}</div>
        <div style={{ whiteSpace: "nowrap" }}>Email: {guard.mail}</div>
        <div>Phone: {guard.phone}</div>
      </TableCell>
      <TableCell>
        <Chip
          label={guard?.shouldBeAllocated ? "משתתף" : "לא משתתף"}
          color={guard?.shouldBeAllocated ? "primary" : "secondary"}
        />
      </TableCell>
      <TableCell>
        <Stack direction="row" alignItems="center" flexWrap="nowrap">
          <Button
            component={Link}
            to={`/guards/${guard.id}`}
            variant="outlined"
            color="primary"
            size="small"
            sx={{ marginRight: "10px" }}
          >
            מגבלות
          </Button>
          <IconButton onClick={() => onEdit(guard)} size="large" color="secondary">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => onDelete(guard)} size="large" color="error">
            <DeleteIcon />
          </IconButton>
        </Stack>
      </TableCell>
    </TableRow>
  );
}

GuardItem.propTypes = {
  guard: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default GuardItem;
