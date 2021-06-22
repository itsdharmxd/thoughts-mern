import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Card, CardContent, Typography, CardActions, Button, Grid } from '@material-ui/core'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import EditIcon from '@material-ui/icons/Edit'

import { deleteThought } from '../../../redux/actions/thoughts'
import Popup from '../../Popup/popup'
import useStyles from './styles'

const Thought = ({ thought }) => {
    const [showThought, setShowThought] = useState(true)
    const [showPopup, setShowPopup] = useState(false)
    const dispatch = useDispatch()
    const classes = useStyles()

    const delThought = () => {
        dispatch(deleteThought(thought._id))
        setShowThought(false)
        setShowPopup(true)
        setTimeout(() => {
            setShowPopup(false)
        }, 3000);
    }

    return (
        <>
            {
                showThought ? (
                    <Grid item>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="h4">
                                    {thought.title}
                                </Typography>
                                <Typography className={classes.time} color="textSecondary" gutterBottom>
                                    {thought.time}
                                </Typography>
                                <Typography className={classes.body} variant="body2" component="p">
                                    {thought.body}
                                </Typography>
                            </CardContent>
                            <CardActions className={classes.actionsContainer}>
                                <Button size="small" color="primary" href={`thoughts/edit/${thought._id}`}>
                                    EDIT
                                    <EditIcon />
                                </Button>
                                <Button style={{alignItems: "center", justifyContent: "center"}} size="small" color="secondary" onClick={() => delThought()}>
                                    DELETE
                                    <DeleteForeverIcon />
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ) : null 
            }
            <Popup actionDone={showPopup} message="Deleted" />
        </>
    )
}

export default Thought