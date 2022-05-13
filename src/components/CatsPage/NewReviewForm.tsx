import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
// import { NewReviewRatingEnum } from '../../sdk';

const user = {
  userName: "smartKat9000"
}

export default function NewReviewForm({ cat, uuid }: Record<string, string>) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState<string>("");
  // TODO Uncomment, as well as import Above
  // const [rating, setRating] = useState<NewReviewRatingEnum>(1);
  const [comment, setComment] = useState<string>("");


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const changeComment = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const submitRating = () => {
    // TODO -- POST data from title, rating, comment under a Username
    handleClose()
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Rate {cat}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Leave a Rating</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="title"
            label="Title"
            fullWidth
            variant="standard"
            value={title}
            onChange={changeTitle}
          />
          <Typography component="legend" variant="caption" color="primary">Rating*</Typography>
            <Rating
                size='large'
                name="simple-controlled"
                // TODO Uncomment these bits:
                // value={rating}
                // onChange={(event, newValue) => {
                //   if (newValue) setRating(newValue as NewReviewRatingEnum);
                // }}
            />
          <TextField
            label="Comment"
            multiline
            fullWidth
            rows={4}
            value={comment}
            onChange={changeComment}
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={submitRating}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}