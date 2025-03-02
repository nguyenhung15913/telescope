import { useState, useEffect, useRef } from 'react';
import { Button, createStyles, makeStyles, Theme } from '@material-ui/core';
import { connect } from 'formik';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

import { feedDiscoveryServiceUrl } from '../../../config';
import useAuth from '../../../hooks/use-auth';
import { SignUpForm } from '../../../interfaces';
import { TextInput, CheckBoxInput } from '../FormFields';
import formModels from '../Schema/FormModel';

const { channelUrl, channelOwnership } = formModels;

// See feed-discovery service
type FeedType = 'blog' | 'youtube' | 'twitch';
type DiscoveredFeed = { feedUrl: string; type: FeedType };
type DiscoveredFeeds = { feedUrls: DiscoveredFeed[] };

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '0',
      margin: '0',
      position: 'relative',
      width: '100%',
      minHeight: '80%',
      [theme.breakpoints.down(600)]: {
        minHeight: '75%',
      },
    },
    container: {
      display: 'grid',
      gridTemplateAreas: '1fr',
      textAlign: 'center',
      justifyItems: 'center',
      alignItems: 'center',
      position: 'absolute',
      minHeight: '100%',
      width: '100%',
      [theme.breakpoints.down(600)]: {
        width: '95%',
        marginLeft: '2.5%',
      },
    },
    blogPageTitle: {
      fontSize: '1.5em',
    },
    helpText: {
      fontSize: '1.1em',
      lineHeight: '1.8em',
    },
    infoContainer: {
      display: 'grid',
      textAlign: 'center',
      gridGap: '10%',
      justifyItems: 'center',
      alignItems: 'center',
      width: '90%',
    },
    inputsContainer: {
      width: '100%',
      display: 'grid',
      gridTemplateColumns: '75% 25%',
      '& .MuiFormHelperText-root': {
        fontSize: '0.9em',
        color: 'black',
      },
      '& .MuiFormLabel-root': {
        color: 'black',
      },
      [theme.breakpoints.down(600)]: {
        gridTemplateColumns: '80% 20%',
      },
    },
    helpMessage: {
      fontSize: '.9em',
      color: 'black',
    },
    button: {
      height: '35px',
      width: '50%',
      alignSelf: 'center',
      fontSize: '0.8em',
      marginLeft: '5%',
      background: '#121D59',
      color: '#A0D1FB',
      '&:hover': {
        color: 'black',
        border: '1px solid #121D59',
      },
      '&.Mui-disabled': {
        backgroundColor: 'inherit',
      },
      [theme.breakpoints.down(600)]: {
        width: 'auto',
      },
    },
    RssButtonContainer: {
      width: '90%',
      display: 'grid',
    },
    infoRSSContainer: {
      minHeight: '120px',
      maxHeight: '120px',
      width: '100%',
      overflowY: 'auto',
    },
    noBlogMessage: {
      fontSize: '1em',
      color: '#474747',
      marginTop: '40px',
    },
    text: {
      fontSize: '0.9em',
      alignSelf: 'end',
      color: '#474747',
    },
    RssButtonWrapper: {
      width: '100%',
    },
    RssButton: {
      width: '101%',
      borderRadius: '0',
      background: '#121D59',
      color: '#A0D1FB',
      '&:hover': {
        color: 'black',
        border: '1px solid #121D59',
      },
    },
    agreeMessage: {
      [theme.breakpoints.down(600)]: {
        alignSelf: 'end',
      },
    },
    formControlLabel: {
      fontSize: '.9em',
      height: '10px',
      color: '#474747',
    },
  })
);

const ChannelFeeds = connect<{}, SignUpForm>((props) => {
  const classes = useStyles();
  const { values, errors, setFieldValue } = props.formik;
  const { token } = useAuth();

  const [channelUrlError, setChannelUrlError] = useState('');
  const [validating, setValidating] = useState(false);
  const controllerRef = useRef<AbortController | null>();

  const validateChannel = async () => {
    if (errors.channelUrl) {
      setFieldValue('feeds', [], true);
      return;
    }
    try {
      setValidating(true);
      controllerRef?.current?.abort();
      controllerRef.current = new AbortController();
      // Allow a list of URLs, separated by spaces
      const urls = values.channelUrl.split(/ +/);
      const response = await fetch(`${feedDiscoveryServiceUrl}`, {
        signal: controllerRef.current?.signal,
        method: 'post',
        headers: {
          Authorization: `bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(urls),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const { feedUrls }: DiscoveredFeeds = await response.json();

      setChannelUrlError('');
      setFieldValue(
        'allFeeds',
        feedUrls.map((discoveredFeed: DiscoveredFeed) => discoveredFeed.feedUrl)
      );
    } catch (err) {
      console.error(err, 'Unable to discover feeds');

      setChannelUrlError('Unable to discover feeds');
      setFieldValue('allFeeds', []);
    } finally {
      // eslint-disable-next-line require-atomic-updates
      controllerRef.current = null;
      setValidating(false);
    }
  };

  const handleCheck = (url: string) => {
    const selectedFeeds = values.feeds.includes(url)
      ? values.feeds.filter((val: string) => val !== url)
      : [...values.feeds, url];

    setFieldValue('feeds', selectedFeeds, true);
  };

  useEffect(() => {
    if (errors.channelUrl) {
      validateChannel();
    }

    return () => {
      controllerRef?.current?.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <h1 className={classes.blogPageTitle}>YouTube and Twitch</h1>
        <h2 className={classes.helpText}>
          OPTIONAL: Enter your YouTube and/or Twitch channels and select the RSS feed(s) you want to
          use in Telescope (separate more than one URL with a space)
        </h2>
        <div className={classes.infoContainer}>
          <div className={classes.inputsContainer}>
            <TextInput
              name={channelUrl.name}
              label={channelUrl.label}
              helperText={channelUrlError || 'Validate your YouTube or Twitch URL(s)'}
              error={!!channelUrlError}
            />
            <Button className={classes.button} onClick={validateChannel} disabled={validating}>
              Validate Channel(s)
            </Button>
          </div>
          <div className={classes.RssButtonContainer}>
            <div className={classes.infoRSSContainer}>
              {values.allFeeds.length ? (
                <FormControl required component="fieldset">
                  <FormGroup>
                    {values.allFeeds.map((url) => (
                      <FormControlLabel
                        key={url}
                        control={
                          <Checkbox
                            checked={values.feeds.includes(url)}
                            onChange={() => handleCheck(url)}
                          />
                        }
                        label={<h1 className={classes.formControlLabel}>{url}</h1>}
                      />
                    ))}
                  </FormGroup>
                  <FormHelperText className={classes.helpMessage} error>
                    {errors.feeds || ''}
                  </FormHelperText>
                </FormControl>
              ) : (
                <h3 className={classes.noBlogMessage}>
                  Please validate your YouTube or Twitch URL(s)
                </h3>
              )}
            </div>
          </div>
        </div>
        <CheckBoxInput
          label={channelOwnership.label}
          name={channelOwnership.name}
          checked={values.channelOwnership}
        />
      </div>
    </div>
  );
});

export default ChannelFeeds;
