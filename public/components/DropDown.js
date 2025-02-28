import React from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



const DropDown = ({topic, items, onStartChange}) => {
  const [value, seValue] = React.useState('');
  const menuItems = items.map((data, index) => {
    return <MenuItem key={index} value={index}>{data}</MenuItem>
  });


  const handleChange = (event) => {
    let newVal = event.target.value
    seValue(newVal);
    onStartChange(newVal);
  };

  return (
    <Box sx={{ maxWidth: 140, width: '100%', marginTop: 5, marginBottom: 2 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{topic}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label="Age"
          onChange={handleChange}
        >
        {menuItems}
        </Select>
      </FormControl>
    </Box>
  );
}


export default DropDown;