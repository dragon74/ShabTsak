import { TableCell, TableRow, IconButton, Button, Avatar, Chip, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { getGravatarUrl } from "../../GuardList/utils";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const GuardItem = ({ campId, guard, onEdit, onDelete }) => {
  const navigate = useNavigate();
  const handleLimitButtonClick = () => {
    // Pass the campId using state when navigating to the guard profile page
    navigate(`/guards/${guard.id}`, { state: { campId: campId } });
  };

  return (
    <TableRow key={guard.id}>
      <TableCell>
        <Avatar src={getGravatarUrl(guard.mail)} alt={guard.name} />
      </TableCell>
      <TableCell>
        <div style={{ maxWidth: "200px", textOverflow: "ellipsis", overflow: "hidden" }}>{guard.name}</div>
        <div style={{ whiteSpace: "nowrap" }}>Email: {guard.mail}</div>
        <div>Phone: {guard.phone}</div>
      </TableCell>
      <TableCell>
        <Chip label={guard?.shouldBeAllocated ? "משתתף" : "לא משתתף"} color={guard?.shouldBeAllocated ? "primary" : "secondary"} />
      </TableCell>
      <TableCell>
        <Stack direction="row" alignItems="center" flexWrap="nowrap">
          <Button onClick={() => handleLimitButtonClick()} variant="outlined" color="primary" size="small" sx={{ marginRight: "10px" }}>
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
};

GuardItem.propTypes = {
  guard: PropTypes.object.isRequired,
  campId: PropTypes.number,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default GuardItem;
