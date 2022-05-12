import React, { useState, useEffect } from 'react';
import Grid from "@mui/material/Grid";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { getCats } from '../../actions/cats';
import { NewCat } from '../../sdk';
import Rating from '@mui/material/Rating';
import { Review } from './Review';

const catImages = [
    'https://s36537.pcdn.co/wp-content/uploads/1970/01/GettyImages-1156515296.jpg.optimal.jpg',
    'https://imgix.bustle.com/inverse/b5/9e/ca/00/d00b/4ed1/93b6/7356790015e5/shutterstock1078303643jpg.jpeg?w=1200&h=630&fit=crop&crop=faces&fm=jpg',
    'https://cdn.shopify.com/s/files/1/0011/0552/articles/RCF_blog_718x.jpg?v=1556467722',
    'https://cdn.wamiz.fr/cdn-cgi/image/quality=80,width=1200,height=675,fit=cover/article/main-picture/5cffc2be5d7ff470367167.jpg',
    'https://static.themoscowtimes.com/image/1360/11/portrait-of-a-cat.jpg',
]

interface SelectedCat {
    imgUrl?: string;
    name?: string;
    breed?: string;
    pairing?: string;
    description?: string;
    rating?: number;
    reviews?: Record<string, any>[];
  }

export const Cats = () => {
    const [ catsArray, setCatsArray ] = useState<NewCat[]>([])
    const [ selectedCat, setSelectedCat ] = useState<Partial<SelectedCat>>({});
    const [ openReviews, setOpenReviews ] = useState(false);

    useEffect( () => {
        getCats().then(data => {
          if (data) setCatsArray(data)
        })
      }, [])

    useEffect(() => {
        if (openReviews) {
            window.scrollTo({
                top: 780,
                left: 0,
                behavior: 'smooth'
              });
        }
    }, [openReviews])

    const selectACat = (cat: SelectedCat) => {
        setOpenReviews(false);
        setSelectedCat(cat);
    }

    const gotToReviews = () => {
        setOpenReviews(true);
    }

    return (
        <Grid container direction="column">
            {Object.keys(selectedCat).length > 0 && 
            <Paper style={{alignSelf: 'center', width: "80%", marginBottom: 10}}>
                <Grid item container direction="row" wrap={'nowrap'}>
                    <Grid item>
                        <img src={selectedCat.imgUrl} alt="selected cat" style={{
                            margin: 4,
                            height: "350px",
                            borderRadius: 6,
                            }}
                        />
                    </Grid>
                    <Grid item xs={4} container direction="column" justifyContent="space-evenly" style={{marginLeft: "20px"}}>
                        <Grid item container direction="column">
                            <Grid item container alignItems={"center"}>
                                <Grid item>
                                    <Typography gutterBottom variant="h4" component="div">
                                        {selectedCat.name}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle1" color="primary" style={{paddingLeft: "14px"}}>
                                        {selectedCat.breed}
                                    </Typography>
                                </Grid>
                                
                        </Grid>
                            <Grid item>
                                {/* TODO replace value with selectedCat.rating */}
                                <Rating name="read-only" value={3} readOnly />
                            </Grid>
                            <Grid item>
                                <Button color="secondary" size="small" onClick={gotToReviews}>See Reviews</Button>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Typography variant="body1" color="primary">
                                {selectedCat.description}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle1" color="primary">
                                Pairs With: {selectedCat.pairing}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
            }
            <Grid item container direction="row" justifyContent={"space-evenly"} alignItems={"center"}>
                {catsArray.length > 0 && catImages.map((cat, i) => {
                    const catData = catsArray[i];
                    return (
                        <Card sx={selectedCat?.imgUrl === cat 
                            ? { maxWidth: 345, marginBottom: 4, border: "3px solid #ee92c2"}
                            : {maxWidth: 345, marginBottom: 4}} 
                            onClick={() => selectACat({"imgUrl": cat, ...catData})}
                        >
                        <CardMedia
                        component="img"
                        height="140"
                        image={cat}
                        alt="name"
                        />
                        <CardContent style={{ textAlign: 'center' }}>
                        <Typography gutterBottom variant="h5" component="div">
                            {catData.name}
                        </Typography>
                        <Typography variant="body2" color="secondary">
                            {catData.breed}
                        </Typography>
                        {/* TODO replace value with catData.rating */}
                        <Rating name="read-only" value={3} size="small" readOnly />
                        </CardContent>
                    </Card>
                    )
                })}
            </Grid>
            {openReviews && (
                <Grid item container justifyContent={"center"} alignItems="center" direction="column" style={{
                    backgroundColor: '#f5d8c5',
                    padding: "32px",
                }}>
                    {/* TODO map Reviews into Review component here */}
                </Grid>
            )}
        </Grid>
    )
}