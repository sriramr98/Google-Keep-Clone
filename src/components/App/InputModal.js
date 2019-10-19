import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/styles/makeStyles';
import TextAreaAutoSize from 'react-autosize-textarea';
import PaletteOutlinedIcon from '@material-ui/icons/PaletteOutlined';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import UndoOutlinedIcon from '@material-ui/icons/UndoOutlined';
import RedoOutlinedIcon from '@material-ui/icons/RedoOutlined';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles({
  dialogBackdrop: {
    backgroundColor: 'transparent',
  },
  input: {
    border: '0px solid',
    '&:focus': {
      outline: 'none',
    },
  },
  titleInput: {
    height: '50px',
    fontSize: '1.4rem',
    fontWeight: 'bold',
  },
  contentInput: {
    fontSize: '1rem',
  },
  dialogActions: {
    justifyContent: 'flex-start',
  },
  cancelButton: {
    marginLeft: 'auto',
  },
});

function InputModal({open, toggleModal}) {
  const styles = useStyles();

  function handleCloseClick() {
    onDialogClose();
    toggleModal();
  }

  function onDialogClose() {
    console.log('Save to db');
  }
  return (
    <Dialog
      onClose={onDialogClose}
      onBackdropClick={() => toggleModal()}
      BackdropProps={{className: styles.dialogBackdrop}}
      open={open}
      onEscapeKeyDown={() => toggleModal()}
      fullWidth
    >
      <DialogContent>
        <Box display="flex" flexDirection="column">
          <input
            type="text"
            name="title"
            placeholder="title"
            className={`${styles.input} ${styles.titleInput}`}
            autoComplete="off"
          />
          <TextAreaAutoSize
            type="text"
            placeholder="Note Content"
            className={`${styles.input} ${styles.contentInput}`}
            rows={4}
          />
          <Typography style={{marginLeft: 'auto'}} variant="caption">
            Edited 9:20 PM
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions classes={{root: styles.dialogActions}}>
        <Tooltip title="Color">
          <IconButton>
            <PaletteOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Image">
          <IconButton>
            <ImageOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Archive">
          <IconButton>
            <ArchiveOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="More">
          <IconButton>
            <MoreVertOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Undo">
          <IconButton>
            <UndoOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Redo">
          <IconButton>
            <RedoOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Button className={styles.cancelButton} onClick={handleCloseClick}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default InputModal;
