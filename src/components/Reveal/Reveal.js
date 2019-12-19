import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles, withTheme } from '@material-ui/core/styles';
import * as firebase from 'firebase';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getInformalBabysSex } from '../../lib/helperFunctions';

const style = (theme) => ({
    root: {
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    timer: {
        width:50,
        margin: "auto",
        padding: theme.spacing(2),
        borderRadius: "50%",
        backgroundColor: "white",
        height: 50,
        display: "flex",
        justifyContent: "center",
        verticalAlign: "middle",
        alignItems: "center",
        marginTop: theme.spacing(2)
    },
    babysSex: {
        padding: theme.spacing(2),
        marginTop: theme.spacing(2),
        color: '#ffffff',
    },
    text: {
        color: '#ffffff',
    }
});

const Reveal = (props) => {
    const [revealData, setRevealData] = useState({});
    const [isFetching, setIsFetching] = useState(false);

    const hasBeenRevealed = localStorage.getItem(props.match.params.id);
    const initialTimerValue = (hasBeenRevealed) ? 0 : 5;
    const [timer, setTimer] = useState(initialTimerValue);

    useEffect(() => {
        const { id } = props.match.params;
        const getRevealData = async () => {
            setIsFetching(true);

            const db = firebase.firestore();
            const document = await db.doc(`reveals/${id}`).get();
            var reveal = document.data();
            setRevealData(reveal);

            setIsFetching(false);
        }

        getRevealData();
    }, [props, props.match.params]);

    useEffect(() => {
        if (timer === 0) {
            localStorage.setItem(props.match.params.id, 'true');
            return;
        }

        if (!timer) {
            return;
        }

        // save intervalId to clear the interval when the
        // component re-renders
        const interval = setInterval(() => {
            setTimer(timer - 1);
        }, 1000);

        // clear interval on re-render to avoid memory leaks
        return () => clearInterval(interval);
    }, [props.match.params, timer]);

    const getMainColor = () => {
        const defaultColor = props.theme.palette.primary.main;
        const boyColor = '#6386B2';
        const girlColor = '#FF7874';
        if (timer) {
            return defaultColor;
        }

        switch (revealData.babysSex) {
            case 'male':
                return boyColor;
            case 'female':
                return girlColor;
            default:
                return defaultColor;
        }
    };

    const mainColor = getMainColor();
    return (
        <div
            className={props.classes.root}
            style={{
                backgroundColor: mainColor
            }}
        >
            {
                isFetching &&
                <CircularProgress />
            }
            {
                !isFetching &&
                <div>
                    <Typography variant="h5" className={props.classes.text}>
                        {revealData.fathersName} and {revealData.mothersName} are having a baby...
                    </Typography>
                    {
                        timer > 0 &&
                        <Typography variant="h4" className={props.classes.timer} style={{ color: mainColor }}>
                            {timer}
                        </Typography>
                    }
                    {
                        timer <= 0 &&
                        <Typography variant="h3" className={props.classes.babysSex}>
                            {getInformalBabysSex(revealData.babysSex).toUpperCase()}
                        </Typography>
                    }
                </div>
            }
        </div>
    );
}
 
export default withTheme(withStyles(style)(Reveal));
