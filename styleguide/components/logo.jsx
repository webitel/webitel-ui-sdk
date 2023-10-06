import { markRaw } from 'vue';
import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';
import logo from './logo.png';

const styles = ({ fontFamily, color }) => ({
  logo: {
    display: 'flex',
    alignItems: 'center',
    margin: 0,
    fontFamily: fontFamily.base,
    fontSize: 18,
    fontWeight: 'normal',
  },
  image: {
    width: '2.5em',
    marginLeft: '-0.5em',
  },
});

export function LogoRenderer({ classes, children }) {
  const template = '<div>nihuya</div>';
  // console.info(eval(template));
  console.info(classes, children);
  return JSON.stringify(markRaw(
    <div>Nihuya</div>
  ));
}

LogoRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
};

export default Styled(styles)(LogoRenderer);
