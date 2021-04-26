import { NavLink } from 'react-router-dom';
import classes from './Topbar.module.css';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';

const Topbar = (props) => {
    const history = useHistory();
    const loginrole = window.localStorage.getItem('userType');
    return (<>
    
        <div className={classes.topbarWrapper}>
            <div className={classes.topbarLeft}>
                <img src="https://i.ibb.co/XSjyb9n/Capture.png" alt="Capture" />
            </div>
            {loginrole === "storemanager" ? <div className={classes.topbarMid}>

                <NavLink className={classes.menuItem} to='/products' activeClassName={classes.activeNav}> Products</NavLink>
                <NavLink className={classes.menuItem} to='/orders' activeClassName={classes.activeNav}> Orders</NavLink>
                <NavLink className={classes.menuItem} to='/users' activeClassName={classes.activeNav}> Users</NavLink>
            </div> : <div className={classes.topbarMid}><NavLink className={classes.menuItem} to='/orders' activeClassName={classes.activeNav}> Orders</NavLink></div>}
            <div className={classes.btnContainer}>
                <Button
                    onClick={() => {
                        localStorage.removeItem("userType");
                        history.push('/')
                    }}
                    variant="contained"
                    color="secondary"
                >
                    Sign Out
                        </Button>
            </div>
        </div>
    </>);
}

export default Topbar;