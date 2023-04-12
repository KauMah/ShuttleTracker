import { $black, $grey, $lightGrey, $white } from '../../assets/colors';

import React from 'react';
import { css } from '@emotion/react';

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  customStyle?: React.CSSProperties;
}

const styles = {
  inputStyle: css({
    padding: '10px 5px',
    transition: 'background-color .25s',
    backgroundColor: $lightGrey,
    border: 'none',
    width: '100%',
    height: '100%',
    '&:hover': {
      backgroundColor: $grey,
    },
  }),
  inputTitle: css({
    color: $black,
    fontFamily: 'Helvetica',
    padding: '3px',
    margintopo: '10px',
  }),
};

const TextInput = (props: CustomInputProps): JSX.Element => {
  const { name } = props;
  return (
    <>
      <h4 css={styles.inputTitle}>{name?.toUpperCase()}</h4>
      <input css={styles.inputStyle} {...props} />
    </>
  );
};

export default TextInput;
