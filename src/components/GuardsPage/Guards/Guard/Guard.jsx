import PropTypes from "prop-types";
import { TableCell, TableRow, IconButton, Button, Avatar, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { getGravatarUrl } from "../../../GuardProfile/GuardProfileLimits/utils.js";
import { useNavigate } from "react-router-dom";

const Guard = ({ campId, guard, onEdit, onDelete, index }) => {
  const navigate = useNavigate();

  const handleLimitButtonClick = () => {
    navigate(`/guards/${guard.id}`, { state: { campId: campId } });
  };

  return (
    <TableRow>
      <TableCell align="center">{index + 1}</TableCell>
      <TableCell align="center">
        <Avatar src={getGravatarUrl(guard.mail)} alt={guard.name} />
      </TableCell>
      <TableCell align="center">
        <div style={{ maxWidth: "200px", overflowWrap: "break-word" }}>{guard.name}</div>
        <div>Email: {guard.mail}</div>
        <div>Phone: {guard.phone}</div>
      </TableCell>
      <TableCell align="center">{guard.shouldBeAllocated ? <CheckCircleIcon style={{ color: "green" }} /> : <RadioButtonUncheckedIcon style={{ color: "grey" }} />}</TableCell>
      <TableCell align="center">
        <Stack direction="row" alignItems="center" spacing={1}>
          <Button onClick={handleLimitButtonClick} variant="outlined" color="primary" size="small">
            הגבלות
          </Button>
          <IconButton onClick={onEdit} size="large" color="secondary">
            <EditIcon />
          </IconButton>
          <IconButton onClick={onDelete} size="large" color="error">
            <DeleteIcon />
          </IconButton>
        </Stack>
      </TableCell>
    </TableRow>
  );
};
Guard.propTypes = {
  index: PropTypes.number.isRequired,
  guard: PropTypes.object.isRequired,
  campId: PropTypes.number,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Guard;
