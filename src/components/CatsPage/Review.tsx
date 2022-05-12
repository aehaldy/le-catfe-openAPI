import React from 'react';
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';

export const Review = ({ review }: Record<string, any>) => {
    const { rating, author, title, comment } = review;

    return (
        <Grid item container direction="column" style={{padding: "20px 0 20px 0"}}>
            <Grid item>
                <Typography variant="h6" color="primary">{title}</Typography>
            </Grid>
            <Grid item container>
            <Grid item>
                <Rating name="read-only" value={rating} readOnly />
            </Grid>
            <Grid item>
                <Typography variant="subtitle1" color="secondary">{author}</Typography>
            </Grid>
            </Grid>
            <Grid item>
                <Typography variant="body1" color="primary">{comment}</Typography>
            </Grid>
        </Grid>
    )
};
