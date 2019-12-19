import React, { useState } from 'react';
import * as firebase from 'firebase';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import copy from 'copy-to-clipboard';
import { getInformalBabysSex } from '../../lib/helperFunctions';

const style = (theme) => ({
    root: {
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.primary.main,
    },
    card: {
        maxWidth: 600,
        margin: '0 auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
    title: {
        color: theme.palette.primary.main,
        padding: theme.spacing(2),
    },
    subtitle: {
        paddingRight: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        paddingTop: theme.spacing(2)
    },
    content: {
        marginTop: theme.spacing(2),
    },
    field: {
        marginBottom: theme.spacing(2),
    },
    flexGrow: {
        flex: 1
    },
});

const RevealForm = (props) => {
    const [fathersName, setFathersName] = useState('');
    const [mothersName, setMothersName] = useState('');
    const [babysSex, setBabysSex] = useState('');
    const [revealLink, setRevealLink] = useState('');
    const [isFetching, setIsFetching] = useState(false);

    const handleFathersNameChange = (event) => {
        setFathersName(event.target.value)
    };

    const handleMothersNameChange = (event) => {
        setMothersName(event.target.value)
    };

    const handleBabysSexChange = (event) => {
        setBabysSex(event.target.value);
    };

    const handleSaveClick = async () => {
        if (isFetching) {
            return;
        }

        setIsFetching(true);

        const revealData = {
            fathersName,
            mothersName,
            babysSex
        };

        const db = firebase.firestore();
        const response = await db.collection('reveals').add(revealData);
        setRevealLink(`${window.location.href}${response.id}`);
        setIsFetching(false);
    };

    const copyRevealLinkToClipboard = () => {
        copy(revealLink);
    };

    return (
        <form onSubmit={handleSaveClick} className={props.classes.root}>
            <Card className={props.classes.card} elevation={8}>
                <Typography color="inherit" variant="h4" className={props.classes.title}>
                    Gender Reveal
                </Typography>
                <Typography variant="subtitle1" className={props.classes.subtitle}>
                    Create your gender reveal annoucement
                </Typography>
                <CardContent className={props.classes.content}>
                    <TextField
                        value={fathersName}
                        label="Father's Name"
                        variant="outlined"
                        onChange={handleFathersNameChange}
                        fullWidth
                        className={props.classes.field}
                    />
                    <TextField
                        value={mothersName}
                        label="Mother's Name"
                        variant="outlined"
                        onChange={handleMothersNameChange}
                        fullWidth
                        className={props.classes.field}
                    />
                    <FormControl
                        variant="outlined"
                        fullWidth
                        className={props.classes.field}
                    >
                        <Select
                            value={babysSex}
                            onChange={handleBabysSexChange}
                            displayEmpty
                        >
                            <MenuItem value="" disabled>Select Gender</MenuItem>
                            <MenuItem value="male">Boy</MenuItem>
                            <MenuItem value="female">Girl</MenuItem>
                        </Select>
                    </FormControl>
                    {
                        revealLink &&
                        <Typography
                            paragraph
                            variant="caption"
                            gutterBottom
                        >
                            Congratulations on your new baby {getInformalBabysSex(babysSex)}! Share the link below with your friends and family!
                        </Typography>
                    }
                    {
                        revealLink &&
                        <Grid
                            container
                            alignItems="center">
                            <Grid
                                item
                                className={props.classes.flexGrow}
                            >
                                <Typography display="inline" id="revealLink">
                                    {revealLink}
                                </Typography>
                            </Grid>
                            <Grid
                                item
                            >
                                <Button
                                    onClick={copyRevealLinkToClipboard}
                                    color="primary"
                                    alignItems="right"
                                >
                                    Copy
                                </Button>
                            </Grid>
                        </Grid>
                    }
                </CardContent>
                <CardActions>
                    <Button
                        onClick={handleSaveClick}
                        disabled={isFetching}
                        color="primary"
                        variant="contained"
                        fullWidth
                    >
                        Reveal
                    </Button>
                    {
                        isFetching &&
                        <CircularProgress />
                    }
                </CardActions>
            </Card>
        </form>
    );
}
 
export default withStyles(style)(RevealForm);
