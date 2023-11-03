import { useMutation, useQueryClient } from 'react-query';
import GuardService from '@/services/GuardService';
import GuardType from '@/types/Guard.type';
import { Box, Button, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import PropTypes from "prop-types";
import { toast } from 'react-toastify';

export const GuardDialogDelete = ({ guard, closeDialog }) => {
    const mutation = useMutation({
        mutationFn: () => GuardService.deleteGuard(guard.id),
        onSuccess,
        onError: () => toast.error("Failed to delete"),
    })

    const { invalidateQueries } = useQueryClient();

    function onSuccess() {
        invalidateQueries("guards")
        toast.success("It did it!!!");
        closeDialog();
    }


    return (
        <Box component="form" onSubmit={() => closeDialog()} sx={{ px: 2, py: 1 }}>
            <DialogTitle>האם ברצונך למחוק את שומר {guard.name}?</DialogTitle>
            <DialogContent></DialogContent>
            <DialogActions>
                <Button type="submit" color="primary">
                    ביטול
                </Button>
                <Button onClick={() => mutation()} color="primary" variant="contained">
                    מחק
                </Button>

            </DialogActions>
        </Box>
    );
}

GuardDialogDelete.propTypes = {
    guard: GuardType,
    closeDialog: PropTypes.func
}