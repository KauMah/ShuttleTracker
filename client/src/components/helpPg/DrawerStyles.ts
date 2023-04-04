import { css } from '@emotion/react';

export const dropdownStyles = {
  container: css({
    position: 'relative',
    display: 'inline-block',
  }),
  button: css({
    backgroundColor: '#ffffff',
    border: '1px solid #ced4da',
    color: '#212529',
    padding: '8px 16px',
    fontSize: '14px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  }),
  dropdown: css({
    position: 'absolute',
    top: '100%',
    left: 0,
    zIndex: 1,
    display: 'block',
    float: 'left',
    minWidth: '160px',
    margin: 0,
    fontSize: '14px',
    color: '#212529',
    textAlign: 'left',
    listStyle: 'none',
    backgroundColor: '#fff',
    backgroundClip: 'padding-box',
    border: '1px solid rgba(0, 0, 0, 0.15)',
    borderRadius: '0.25rem',
    padding: '8px 0',
  }),
  item: css({
    padding: '0.25rem 1.5rem',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#f8f9fa',
    },
  }),
};
