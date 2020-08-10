import { makeStyles } from '@material-ui/styles';
import { colors } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    justifyContent : "left"
  },
  drawer : {
    paddingTop : "0px",
    width: "160px",
  },
  item: {
    display: 'fixed',
    paddingTop: 0,
    paddingBottom: 0,
  },
  button: {
    color: colors.purple[500],
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
  },
  btnRoot : {
    paddingLeft : "25px",
    justifyContent : "left !important"
  },
  subMenu : {
    paddingLeft : "50px !important",
  },
  but: {
    color: "#ffffff",
    display: 'fixed',
    paddingTop: 0,
    paddingBottom: 0,
  }
}));
export default useStyles;