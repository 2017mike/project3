import './ProjectIssueModal.css'
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
import Spacer from '../../components/Spacer'
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Card from '@material-ui/core/Card';
import ReplyAPI from '../../utils/ReplyAPI'
import IssueAPI from '../../utils/IssueAPI'
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';

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
  highpriority: {
    fontSize: 12,
    textAlign: 'center',
    marginRight: 10,
    color: 'red',
    fontWeight: '800'
  },
  mediumpriority: {
    fontSize: 12,
    textAlign: 'center',
    marginRight: 10,
    color: '#f79d0c',
    fontWeight: '800'
  },
  lowpriority: {
    fontSize: 12,
    textAlign: 'center',
    marginRight: 10,
    color: '#14a7fc',
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
  },
  formControl: {
    margin: 10,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: 20,
  },
  hidden: {
    display: 'none'
  },
  comments: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginBottom: 12,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 8,
    paddingBottom: 8,
  }
});




const ProjectCard = props => {
  const classes = useStyles();
  


  // console.log('this is props in ProjectIssueModal', props)


  const [issueState, setIssueState] = useState({
    title: '',
    body: '',
    status: '',
    priority: '',
    issue: []
  })


  // For the Status dropdown
  const [openStatus, setStatusOpen] = useState(false); 
  
  const handleInputChange = ({ target }) => {
    setIssueState({ ...issueState, [target.name]: target.value })
  }
  
  const [open, setOpen] = useState(false);

  const [deleteConfirm, setDeleteConfirm] = useState(false)
 
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleStatusOpen = () => {
    setStatusOpen(true);
  };


  
  const handleClose = () => {
    setStatusOpen(false);
    setOpen(false)
    setDeleteConfirm(false)
  };

  const [issueReply, setIssueReply] = useState("");

  function handleIssueReply(e) {
    setIssueReply(e.target.value)
  }

  function submitIssueReply(e) {
    ReplyAPI.create({
      text: issueReply,
      pid: props.id
    })
    window.location.reload()
  }

  
  const [issueStatus, setIssueStatus] = useState(props.status)
  const [issueDescription, setIssueDescription] = useState('')
  const [issuePriority, setIssuePriority] = useState(props.priority)

  
  function handleIssuePriority(e) {
    setIssuePriority(e.target.value)
    
  }
  
  function handleIssueStatus(e) {
    setIssueStatus(e.target.value)
    // console.log(e.target.value, 'this is target')
  }
  
  
const handlePublicTrue = () => {
  setIssuePublic(true)
  console.clear();
  console.log('this is the issuePublic before update', issuePublic)
}

  const [issuePublic, setIssuePublic] = useState(true);

  const handleGoPublic = () => {
    IssueAPI.update(props.id, {
      isPublic: issuePublic
    })
      .then(res => {
        console.clear();
        console.log('status priority updated - ProjectIssueModal', res)
        handleClose()
      })
      .catch(err => console.log('Problem in the ProjectIssueModal', err))
    // window.location.reload()
    
  }


  const handleUpdateIssue = () => {
    IssueAPI.update(props.id, {
      status: issueStatus,
      priority: issuePriority
    })
      .then(res => {
        console.log('status priority updated - ProjectIssueModal', res)
      })
      .catch(err => console.log('Problem in the ProjectIssueModal', err))
    window.location.reload()
  }

  const [replies, setReplies] = useState([]);
    
    useEffect(() => {
      IssueAPI.getById(props.id)
      .then((res) => {
        setReplies(res.data.replies)
        console.log('check out replies', res.data.replies)
      })
      .catch(e => console.error(e))
      }
    // eslint-disable-next-line
  , [])

  const handleRefresh= () =>{
    window.location.reload()
  }
 
const handleDeleteOpen = () => {
  setDeleteConfirm(true)
}

  return (
    <Dialog maxWidth='lg' fullWidth open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title" className='dialogtitle'>
        {props.title}
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          <Grid container>
            <Grid className={classes.issueleft} item xs={12} lg={9}>
              {/* description body */}
              <Typography className={classes.mb}>
                {props.body}
              </Typography>

              <TextField
                margin="dense"
                id="comment"
                label="Comment"
                type="comment"
                fullWidth
                onChange={handleIssueReply}
              />
              <Button color="primary" variant="contained" onClick={submitIssueReply}>Submit</Button>
              <Spacer y={4} />
              <Paper style={{ maxHeight: 200, overflow: 'auto', boxShadow: 'none'}}>
                <List >
              {
                replies && replies.map((props, key) => {
                  return (
                    <div key={key}>
                      <Card className={classes.comments}>
                      {props.author.name} {props.createdAt}: {props.text}
                      </Card>
                    </div>
                  )
                })
              }              
                </List>
              </Paper>
            </Grid>
            <Grid className={classes.issueright} item xs={12} lg={3}>
              <Spacer y={1}/>
              <Typography className={classes.title} color="textSecondary">
                Posted by
              </Typography>
              <Chip
                icon={<FaceIcon />}
                clickable
                label={props.author}
                variant="outlined"
              />
              <Spacer y={2} />


              <Typography className={classes.title} color="textSecondary">
                Status
              </Typography>
              {/* <Button
                variant="contained"
                color="primary"
                onChange={handleInputChange}
                endIcon={<Icon>expand_more</Icon>}
                onClick={handleStatusOpen}
              >
                {props.status}
              </Button> */}
              <p><FormControl className={classes.formControl}>
                <Select
                  id="status"
                  defaultValue={props.status}
                  onChange={handleIssueStatus}
                  fullWidth
                  open={openStatus}
                  onClose={handleClose}
                  onOpen={handleStatusOpen}
                // className={classes.hidden}
                >
                  <MenuItem value="Open">
                    Open
                  </MenuItem>
                  <MenuItem value="In Progress">
                    In Progress</MenuItem>
                  <MenuItem value="Closed">
                    Closed</MenuItem>
                </Select>
              </FormControl></p>

              <Spacer y={2} />


              <Typography color="textSecondary">
                Priority
              </Typography>

              <FormControl className={classes.formControl}>
                <Select
                  id="priority"
                  defaultValue={props.priority}
                  onChange={handleIssuePriority}
                  fullWidth
                > 

                  <MenuItem value="High">
                    <Icon className={classes.highpriority}>radio_button_unchecked</Icon> High
                  </MenuItem>
                  <MenuItem value="Medium">
                    <Icon className={classes.mediumpriority}>radio_button_unchecked</Icon> Medium</MenuItem>
                  <MenuItem value="Low">
                    <Icon className={classes.lowpriority}>radio_button_unchecked</Icon> Low</MenuItem>
                </Select>
               
              </FormControl>
              <Spacer y={4} />
              <Typography className={classes.title} color="textSecondary">
                Ask the Community
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                className={classes.ask}
                onClick={handleClickOpen}
              >
                Ask the Community
              </Button>
              <Dialog
                open={open}
                onClose={props.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">{"Are You Sure You Want To Ask The Community"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Once you confirm, this issue will be public in the community-issues page.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Keep Private
                  </Button>
                  <Button onClick={handleGoPublic} color="primary" variant="contained" autoFocus>
                    Go Public
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
          </Grid>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDeleteOpen} color="primary">
          Delete
        </Button>
        <Dialog
          open={deleteConfirm}
          onClose={props.handleClose}
          aria-labelledby="delete"
          aria-describedby="delete"
        >
          <DialogTitle id="delete">{"Do You Wish To Delete?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="delete">
              Once you delete, this issue will be permanently deleted.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={handleRefresh} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
        <Button onClick={props.handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleUpdateIssue} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ProjectCard