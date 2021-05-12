import React from 'react';
import { Link } from "react-router-dom";
import './RestaurantList.css';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const RestaurantList=({nearby}) => {

return(
    <div className='showlist'>
        {nearby.map((resturant) => (
            <div className='listitem'>


                <img className = 'image' src ={`https://maps.googleapis.com/maps/api/place/photo?maxheight=200&photoreference=${resturant.view.photo_reference}&key=AIzaSyDGx9NguhqUd5CeQR8FA12jwLTyFgBekxU`} alt="/.default_avatar.png" />
               
                <h1 className='title'>  
                <Link to={`/Resturant/${resturant.place_id}`}>
                     {resturant.name} 
                </Link>                             
                </h1>  

                <div className='open_close'>

                    {resturant.close && (<span className="curclose">permanent close</span>)}
                    {!resturant.close && resturant.open&& resturant.open.open_now &&(
                        <div>
                            
                            <span className="curopen">open now</span>    
                            &nbsp;&nbsp; 
                                    {[...Array(resturant.price)].map((e, i) => {
                                    return <span className="price">$</span>
                            })}                                         
                        </div>
                    )}  
                    {!resturant.close && !resturant.open.open_now &&(
                        <div>
                            
                            <span className="nowclose">close now</span>    
                            &nbsp;&nbsp; 
                                    {[...Array(resturant.price)].map((e, i) => {
                                    return <span className="price">$</span>
                            })}                                         
                        </div>
                    )} 

                </div>
                


                <div className='address'>
                    {resturant.vicinity}
                </div>

  
                
                <div className='rating'>
                  <Box component="fieldset" mb={2} borderColor="transparent">
                  <Rating  name="read-only" value={resturant.rating} readOnly />
                  </Box>
                </div>

                <div className='ratingnumber'>
                <Typography  component="legend"> {resturant.rating} stars ({resturant.ratingtotal})</Typography>
                </div>
            </div>
        ))}
    








    </div>







);
};

export default RestaurantList;