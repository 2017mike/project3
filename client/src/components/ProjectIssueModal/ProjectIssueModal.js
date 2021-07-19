import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import FaceIcon from '@material-ui/icons/Face';
import AddIcon from '@material-ui/icons/Add';
import Spacer from '../../components/Spacer'


const useStyles = makeStyles({
  root: {
    minWidth: 175,
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    height: 200,
  },
  title: {
    fontSize: 14,
  },
  mb: {
    marginBottom: 20,
  },
  issueleft: {
    paddingRight: 20,
  },
  issueright: {
    paddingLeft: 20,
    borderLeft: '1px solid #ccc',
  },
  issuerightchip: {
    marginBottom: 20,
    borderLeft: '1px solid #ccc',
  },
  projectcard: {
    marginRight: 20,
    marginBottom: 20,
  },
  codebox: {
    border: '1px solid #ddd',
    borderLeft: '3px solid blue',
    padding: 20,
    fontFamily: 'monospace',
    backgroundColor: '#eee'
  },
  priority: {
    fontSize: 12,
    textAlign: 'center',
    marginRight: 10,
    color: 'red',
    fontWeight: '800'
  },
  ask: {
    backgroundColor: 'red',
    width: '90%'
  },
  addbtn: {
    textAlign: 'center',
    margin: 'auto'
  },
  editbtn: {
    textAlign: 'right',
  }
});


const myHTML = `
function MyConstructor(data, transport) {
                              this.data = data;
                            transport.on('data', function () {
                              alert(this.data);
    });
}

                            // Mock transport object
                            var transport = {
                              on: function(event, callback) {
                              setTimeout(callback, 1000);
    }
};

                            // called as
                            var obj = new MyConstructor('foo', transport);`;
const myHTML2 = `
function MyConstructor(data, transport) {
                              this.data = data;
                            transport.on('data', this.alert);
}

                            MyConstructor.prototype.alert = function() {
                              alert(this.name);
};`;


const ProjectCard = props => {
  const classes = useStyles();

  return (
    <Dialog maxWidth='lg' fullWidth='true' open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Why do I get “Reducer […] returned undefined during initialization” despite providing initialState to createStore()?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Grid container>
            <Grid className={classes.issueleft} item xs={9}>
              <Typography className={classes.mb} variant="p" component="p">
                I have a constructor function which registers an event handler:
                <div className={classes.codebox}>{myHTML}</div>

                However, I'm not able to access the data property of the created object inside the callback. It looks like this does not refer to the object that was created but to an other one.

                I also tried to use an object method instead of an anonymous function:
                <div className={classes.codebox}>{myHTML2}</div>


                but it exhibits the same problems.

                How can I access the correct object?
              </Typography>

              <TextField
                margin="dense"
                id="comment"
                label="Comment"
                type="comment"
                fullWidth
              />
              <Button color="primary" variant="contained">Submit</Button>
            </Grid>
            <Grid className={classes.issueright} item xs={3}>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                Posted by
              </Typography>
              <Chip
                icon={<FaceIcon />}
                clickable
                label="Susan Doe"
                variant="outlined"
              />
              <Spacer y={2} />


              <Typography className={classes.title} color="textSecondary" gutterBottom>
                Assigned
              </Typography>
              <Chip
                icon={<FaceIcon />}
                clickable
                label="Matt Bitt"
                onDelete={props.handleDelete}
                color="default"
                variant="outlined"
              />
              <Chip
                icon={<AddIcon />}
                label="Add"
                clickable
                variant="outlined"
              />
              <Spacer y={2} />


              <Typography className={classes.title} color="textSecondary" gutterBottom>
                Status
              </Typography>
              <Button
                variant="contained"
                color="primary"
                endIcon={<Icon>expand_more</Icon>}
              >
                Open
              </Button>
              <Spacer y={2} />


              <Typography className={classes.title} color="textSecondary" gutterBottom>
                Priority
              </Typography>
              <Icon className={classes.priority}>radio_button_unchecked</Icon>
              <span className={classes.priority}>High Priority</span>
              <Spacer y={4} />


              <Typography className={classes.title} color="textSecondary" gutterBottom>
                Ask the Community
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                className={classes.ask}
                endIcon={<Icon>expand_more</Icon>}
              >
                Ask the Community
              </Button>
            </Grid>
          </Grid>

        </DialogContentText>

      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={props.handleClose} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ProjectCard