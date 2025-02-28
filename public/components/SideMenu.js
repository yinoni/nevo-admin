'use client';
import React from "react";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import '../styles/SideMenu.css';
import Image from 'next/image';
import lines from '../assets/lines.svg';
import house from '../assets/house.svg';
import clock from '../assets/clock.svg';

const SideMenu = () => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const onItemClicked = (href) => {
    window.location.assign(href);
  }

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {[{text: 'בית', href: '/', icon: house}, {text: 'ניהול שעות', href: '/hours', icon: clock}].map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => onItemClicked(item.href)}>
              <Image style={{marginRight: 10}} width={20} height={20} src={item.icon} alt='icon' />
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div className="container">
      <Button onClick={toggleDrawer(true)}><Image src={lines} alt='menu' /></Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}

export default SideMenu;