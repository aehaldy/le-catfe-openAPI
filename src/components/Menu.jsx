import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { getMenuItems } from '../actions';
import { Typography } from '@mui/material';

const menuItemImages = [
'https://www.incrediblethings.com/wp-content/uploads/2014/11/cat-latte-art-1.jpg',
'https://img.sndimg.com/food/image/upload/q_92,fl_progressive,w_1200,c_scale/v1/img/recipes/41/09/78/picdYpaDx.jpg',
'https://teacoffeeanddrinks.com/wp-content/uploads/2021/06/black-coffee-recipe-hot-and-iced-black-coffee-recipe.jpg',
'https://www.archanaskitchen.com/images/archanaskitchen/beverages/Green_tea_recipe.jpg',
'https://www.theflavorbender.com/wp-content/uploads/2020/05/French-Croissants-SM-2363.jpg',
'https://veenaazmanov.com/wp-content/uploads/2021/07/Chocolate-Croissants-Pain-au-Chocolate-9.jpg',
'https://marigoldcoloradosprings.com/wp-content/uploads/2020/05/coconut-la-raz-square.png'
]


export const Menu = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [ selectedItem, setSelectedItem ] = useState({})

    useEffect( () => {
        getMenuItems().then(data => {
          if (data) setMenuItems(data)
        })
      }, [])

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Paper elevation={1} style={{margin: "10px", padding: "30px", width: "90%"}}>
            <Grid container wrap={'nowrap'}>
                <Grid item xs={8}> 
                    <ImageList sx={{ width: "100%", height: 460 }}>
                    {menuItems.map((item, i) => (
                        <ImageListItem key={item.image_url} onClick={() => setSelectedItem(item)}>
                        <img
                            src={`${menuItemImages?.[i] || item.image_url}?w=248&fit=crop&auto=format`}
                            alt={item.title}
                            loading="lazy"
                        />
                        <ImageListItemBar
                            title={item.title}
                            style={
                                item.id === selectedItem?.id 
                                    ? {background: "#a8b4a5", opacity: "0.7"}
                                    : {background: "black", opacity: "0.7"}
                            }
                        />
                        </ImageListItem>
                    ))}
                    </ImageList>
                </Grid>
                <Grid item container direction={'column'} xs={4} style={{
                    margin: "32px", 
                    marginRight: 0,
                    padding: "20px",
                    borderRadius: 12,
                    background: `repeating-linear-gradient(
                        to right,
                        #ffd4ea,
                        #ffd4ea 10px,
                        #e0c2d5 10px,
                        #e0c2d5 20px
                    )`
                }}>
                    <Grid item alignSelf={'center'}>
                        <Typography variant="h5">{selectedItem?.title || ""}</Typography>
                    </Grid>
                    <Grid item  alignSelf={'center'}>
                        <Typography variant="subtitle2" mt={2}>${selectedItem?.price || ""}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body1" mt={3}>{selectedItem?.description || "Select a menu item."}</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
        </div>
    )
};