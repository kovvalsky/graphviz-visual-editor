import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ColorPicker from 'material-ui-color-picker'

const drawerWidth = 500;//240;

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  drawerPaperClosed: {
    position: 'relative',
    width: drawerWidth,
    height: 0,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
});

const nodeStyles = [
  "(no style)",
  "dashed",
  "dotted",
  "solid",
  "invis",
  "bold",
  "filled",
  "striped",
  "wedged",
  "diagonals",
  "rounded",
  "radial",
];

class FormatDrawer extends React.Component {

  constructor(props) {
    super(props);
    let style = this.props.defaultNodeAttributes.style;
    if (style == null) {
      style = [];
    }
    else {
      style = style.split(', ');
    }
    style = new Set(style);
    this.currentStyle = style;
  }

  handleDrawerClose = () => {
    this.props.onFormatDrawerClose();
  };

  handleNodeStyleChange = (styleName) => (event) => {
    const checked = event.target.checked;
    let style = this.currentStyle.add(styleName);
    if (styleName === '(no style)' && checked) {
      style = null;
    }
    else {
      if (checked) {
        style.add(styleName);
      }
      else {
        style.delete(styleName);
      }
      style = [...style].join(', ');
    }
    this.props.onNodeStyleChange(style);
  };

  handleNodeColorChange = (color) => {
    this.props.onNodeColorChange(color);
  };

  handleNodeFillColorChange = (color) => {
    this.props.onNodeFillColorChange(color);
  };

  render() {
    const { classes, theme } = this.props;
    const { open } = this.props;

    let currentStyle = this.props.defaultNodeAttributes.style;
    if (currentStyle == null) {
      currentStyle = ['(no style)'];
    }
    else {
      currentStyle = currentStyle.split(', ');
    }
    currentStyle = new Set(currentStyle);

    return (
      <div className={classes.root}>
        <Drawer
          variant="persistent"
          anchor='left'
          open={open}
          classes={{
            paper: open ? classes.drawerPaper : classes.drawerPaperClosed,
          }}
        >
          <div className={classes.drawerHeader}>
            Node attributes
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <FormControl className={classes.formControl}>
            <InputLabel shrink htmlFor="style">
              style
            </InputLabel>
            <FormGroup row>
              {nodeStyles.map((style) =>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={currentStyle.has(style)}
                    onChange={this.handleNodeStyleChange(style)}
                    value={style}
                    />
                  }
                  key={style}
                  label={style}
                />
              )}
            </FormGroup>
          </FormControl>
          <List>
            <ListItem>
              color:
              <ColorPicker
                name='color'
                defaultValue={this.props.defaultNodeAttributes.color}
                onChange={color => this.handleNodeColorChange(color)}
              />
            </ListItem>
            <ListItem>
              fillcolor:
              <ColorPicker
                name='fillcolor'
                defaultValue={this.props.defaultNodeAttributes.fillcolor}
                onChange={color => this.handleNodeFillColorChange(color)}
              />
            </ListItem>
          </List>
        </Drawer>
      </div>
    );
  }
}

FormatDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(FormatDrawer);