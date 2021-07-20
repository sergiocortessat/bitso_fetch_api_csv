import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  /* stylelint-disable */
  root: {
    minWidth: 125,
    textAlign: 'center',
  },
  title: {
    fontSize: 14,
  },

  pos: {
    marginBottom: 12,
  },
  /* stylelint-enable */
});

export default function SimpleCard({ name, data, currency }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {name}
        </Typography>
        <Typography variant="h5" component="h2">
          {`${Number(data).toFixed(2)} ${currency}`}
        </Typography>
      </CardContent>
    </Card>
  );
}
SimpleCard.defaultProps = {
  name: '',
  data: 0,
  currency: '',
};
// validate propsTypes
SimpleCard.propTypes = {
  name: PropTypes.string,
  data: PropTypes.number,
  currency: PropTypes.string,
};
