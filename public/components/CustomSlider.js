import React, { useState } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';


const CustomSlider = ({onChange}) => {
    const [sliderState, setSliderState] = useState(0);
    
    const handleChange = (event, newValue) => {
        setSliderState(newValue);
        onChange(newValue);
    };    

    return (
        <Box sx={{ width: '55%', marginTop: 5}}>
            <Tabs
                value={sliderState}
                onChange={handleChange}
                aria-label="secondary tabs example"
            >
                <Tab value={0} label="בחירת שעות" />
                <Tab value={1} label="עריכת שעות" />
            </Tabs>
        </Box>
    );
}


export default CustomSlider;
