import React from "react";
import Chip from '@mui/material/Chip';



const CustomChip = ({chipText, handleDelete}) => {
    
    const handleChipClick = () => {
        handleDelete(chipText);
    }
    
    return (
        <Chip
            sx={{marginLeft: 2, marginBottom: 2}}
            label={chipText}
            onClick={handleChipClick}
            onDelete={handleChipClick}
        />
    );
}


export default CustomChip;