import React, {  useState, forwardRef } from 'react';
import {List, ListItem, Collapse, Button, Drawer } from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/Search';
import CreateIcon from '@material-ui/icons/Create';
import SubjectIcon from '@material-ui/icons/Subject';
import clsx from 'clsx';
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import menuItems from './sideBarItems';
import { NavLink as RouterLink } from 'react-router-dom';
import useStyles from './sideBarStyles';
import blockchainLogo from 'assets/image/blockchain.png';


const SideBar = (props) => {
    const [ menu, setMenu ] = useState({});
    const { className, ...rest } = props;
    const classes  = useStyles();
    const handleClick = (item) => {
        let newData = {...menu, [item] : !menu[item]};
        setMenu(newData);
    }
    const CustomRouterLink = forwardRef((props, ref) => (
      <div ref={ref} style={{ flexGrow: 1 }}>
        <RouterLink {...props} />
      </div>
    ));
    const handleMenu = ( children) => {
          const nama1 = menuItems.data.name1;
          const uerel1 = menuItems.data.url1;
          const nama2 = menuItems.data.name2;
          const uerel2 = menuItems.data.url2;
          const nama3 = menuItems.data.name3;
          const uerel3 = menuItems.data.url3;
          console.log(nama1) 
          console.log(uerel1)
        
              return (
            
                <List component="div" disablePadding>
                  <ListItem
                    className={classes.but}
                    disableGutters
                    style={{padding:"0px"}}
                    key={nama1}
                  >
                  
                    <Button
                      className={classes.but}
                      style={{ color: "#ffffff" }}
                      component={CustomRouterLink}
                      to={uerel1}
                    >
                    <ListItemIcon>
                      <SearchIcon style={{ color: "#ffffff" }} />
                      
                    </ListItemIcon>
                    {nama1}
                    </Button>
                  </ListItem>


                  <ListItem
                    className={classes.but}
                    disableGutters
                    style={{padding:"0px"}}
                    key={nama2}
                  >
                          
                    <Button
                      className={classes.but}
                      style={{ color: "#ffffff" }}
                      component={CustomRouterLink}
                      to={uerel2}
                    >
                    <ListItemIcon>
                      <CreateIcon style={{ color: "#ffffff" }} />
                      
                   </ListItemIcon>
                      {nama2}
                    </Button>
                  </ListItem>

                  
                  <ListItem
                    className={classes.but}
                    disableGutters
                    style={{padding:"0px"}}
                    key={nama3}
                  >
                  
                    <Button
                      className={classes.but}
                      style={{ color: "#ffffff" }}
                      component={CustomRouterLink}
                      to={uerel3}
                    >
                    <ListItemIcon>
                      <SubjectIcon style={{ color: "#ffffff" }} />
                      
                    </ListItemIcon>
                    {nama3}
                    </Button>
                  </ListItem>

                </List>
              
              )
                        
        
    }
return (
      <Drawer
          anchor="left"
          
          open={true}
          variant="persistent"
        >
        <div>
              <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                  <div className="sidebar-brand-icon">
                    <img className="img-icon" src={blockchainLogo} />
                  </div>
                  <div className="sidebar-brand-text mx-3">DFM</div>
                </a>
                
                
                    
          <List {...rest}  >
            <hr className="sidebar-divider my-0" />
            <li className="nav-item active">  
              <a className="nav-link">
              <span>{ handleMenu(menuItems.data) }</span></a>
            </li>
          </List>
               
          </ul>
        </div>
      </Drawer>
   )
}
export default SideBar;