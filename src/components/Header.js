import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

const handleLoginRender = (isLoggedIn) => {
    if(isLoggedIn){
      return (
          <>
          <Menu.Item className="menu">
        <NavLink className="menu" to="/logout"> Logout </NavLink>
        </Menu.Item>
        <Menu.Item className="menu">
        <NavLink className="menu" to="/new_election_form"> Add New Election </NavLink>
        </Menu.Item>
        </>
      )
    }else{
      return(
        <>
        <Menu.Item className="menu">
          <NavLink className="menu" to="/login"> Login </NavLink>
          </Menu.Item>
          <Menu.Item className="menu">
          <NavLink className="menu" to="/signup"> Signup </NavLink>
          </Menu.Item>
        </>
      )
    }
  }

  const Header = (props) => {

    return (
        <Menu tabular>
            <Menu.Item className="menu">
          <NavLink className="menu" to="/"> Home </NavLink>
          </Menu.Item>
          <Menu.Item className="menu">
          {
            handleLoginRender(props.isLoggedIn)
          }
          </Menu.Item>
          
          
        </Menu>
    )
  }
  
  export default Header;