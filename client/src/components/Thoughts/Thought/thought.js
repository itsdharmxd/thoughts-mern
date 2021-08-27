import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DateTime } from "luxon";
import clsx from "clsx";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Grid,
  Slide,
  IconButton,
} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";

import { likeThought, deleteThought } from "../../../redux/actions/thoughts";
import Popup from "../../Popup/popup";
import useStyles from "./styles";

const Thought = ({ thought }) => {
  const user = useSelector((state) => state.authState.authData);

  const relativeTime = DateTime.fromISO(thought.createdAt).toRelative();
  const thoughtTime = relativeTime === "0 seconds ago" ? "now" : relativeTime;

  const [likedByUser, setLikedByUser] = useState(thought.likedByUser);
  const [showThought, setShowThought] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    setLikedByUser(thought.likedByUser);
    console.log(thought);
  }, [thought.likedByUser]);

  const likeThisThought = () => {
    dispatch(likeThought(thought._id));
    // setLikedByUser(!likedByUser);
  };

  const delThought = () => {
    dispatch(deleteThought(thought._id));
    setShowThought(false);
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  // TODO:
  // 1.CHECK IF LIKED BY USER
  // 2.CHANGE ThumbUpAltIcon COLOR AS PER 1
  //3.SHOW LIKED BUTTON FOR EVERYONE

  return (
    <>
      <Slide direction="up" in={showThought} mountOnEnter unmountOnExit>
        <Grid item>
          <Card variant="outlined">
            <CardContent>
              <Grid
                className={classes.cardItem}
                container
                alignItems="center"
                style={{ paddingBottom: 10 }}
                justify="space-between"
                direction="row"
              >
                <Typography variant="h4"> {thought.title} </Typography>
                <Typography color="textSecondary" gutterBottom>
                  {" "}
                  {thoughtTime}{" "}
                </Typography>
              </Grid>
              {thought.body && (
                <>
                  <hr />
                  <Typography
                    className={clsx(classes.body, classes.cardItem)}
                    variant="body1"
                    component="p"
                  >
                    {" "}
                    {thought.body}{" "}
                  </Typography>
                </>
              )}
              <hr />
              <Typography className={classes.cardItem} variant="body2">
                Made by {thought.author.name}
              </Typography>
            </CardContent>
            {user?.profile._id === thought.author._id && (
              <CardActions className={classes.actionsContainer}>
                <IconButton
                  color={likedByUser ? "primary" : "default"}
                  onClick={likeThisThought}
                >
                  <ThumbUpAltIcon />
                </IconButton>
                <IconButton
                  color="primary"
                  href={`thoughts/edit/${thought._id}`}
                >
                  <EditIcon />
                </IconButton>
                <IconButton color="primary" onClick={delThought}>
                  <DeleteForeverIcon />
                </IconButton>
              </CardActions>
            )}
          </Card>
        </Grid>
      </Slide>
      <Popup actionDone={showPopup} message="Deleted" />
    </>
  );
};

export default Thought;
