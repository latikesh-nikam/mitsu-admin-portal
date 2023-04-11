import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import styles from "./drawer.module.scss";
import { sideBarData } from './drawer.data';
import { Link } from 'react-router-dom';

const drawerWidth = 200;

export default function DrawerLeft() {
  return (
    <Box className={styles.box}>
      <CssBaseline />
      <AppBar sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
      }}>

      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar sx={{
          backgroundColor: '#3CC6F0'
        }} />
        <Divider />
        <List>
          {
            sideBarData?.map((text, index) => (
              <Link to={`${text.link}`} key={index} className={styles.links}>
                <ListItem>
                  <ListItemButton>
                    <ListItemText primary={text.label} className={styles.sidebarText} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))
          }
        </List>
        <Divider />
        <List>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 5 }}
      >
      </Box>
    </Box>
  );
}