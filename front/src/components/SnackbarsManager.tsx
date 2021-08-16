import React, { useState, useEffect, SyntheticEvent } from 'react';

import { useSelector } from 'react-redux';

import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import { removeHeadOfQueue, emptyQueue, updateHeadOfQueue } from '../actions/snackbarsActions';

import { RootState } from '../store';

function SnackbarsManager() {
  const snackbars = useSelector((state: RootState) => state.snackbars.queue);

  const [open, setOpen] = useState(false);
  const [hasJustExited, setHasJustExited] = useState(false); // has the Snackbar just finished its exit animation?

  const handleOnCloseClick = () => {
    emptyQueue();
    setOpen(false);
  };

  const handleOnClose = (event: SyntheticEvent, reason: string) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  const handleOnExited = () => {
    setHasJustExited(true);
  };

  useEffect(() => {
    // there's a Snackbar to show
    if (snackbars[0]) {
      if (snackbars.length > 1) {
        // if the Snackbar we're about to show can be dumped and there are pending Snackbars,
        // we discard it immediately and fetch the next one
        if (snackbars[0].canBeDumped) {
          removeHeadOfQueue();
          return;
        }
        // if the Snackbar we're about to show isn't one that closes automatically,
        // and there are pending Snackbars, we close it in 3s so that it doesn't block the queue
        if (!snackbars[0].duration) {
          updateHeadOfQueue({ duration: 3000 });
        }
      }

      setOpen(true);
    }
  }, [snackbars]);

  useEffect(() => {
    if (hasJustExited) {
      setHasJustExited(false);

      // the Snackbar has finished its exit animation; we fetch the next one in queue
      removeHeadOfQueue();
    }
  }, [hasJustExited]);

  if (snackbars[0]) {
    return (
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={open}
        autoHideDuration={snackbars[0].duration}
        onClose={handleOnClose}
        TransitionProps={{
          onExited: handleOnExited,
        }}
      >
        <Alert
          onClose={snackbars[0]?.showClose ? handleOnCloseClick : undefined}
          variant="filled"
          severity={snackbars[0].severity}
          elevation={2}
        >
          {snackbars[0].msg}
        </Alert>
      </Snackbar>
    );
  }

  return null;
}

export default SnackbarsManager;
