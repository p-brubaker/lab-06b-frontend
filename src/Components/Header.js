import { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <header>
                <NavLink exact to='/'>List</NavLink>
                <NavLink to='/create'>Create</NavLink>
            </header>
        )      
    }
}

export default Header;