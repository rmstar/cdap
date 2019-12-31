import { StyleRules } from '@material-ui/core/styles/withStyles';

const ENDPOINT_RADIUS = 7;

const nodeStyles = (theme, customNodeStyles = {}): StyleRules => {
  return {
    root: {
      height: '100px',
      width: '200px',
      border: '1px solid #48c038',
      display: 'inline-block',
      position: 'absolute',
      // TODO
      // '&:hover': {
      //   borderWidth: '4px',
      //   margin: '-2px',
      //   height: '104px',
      //   width: '204px',
      // },
      ...customNodeStyles,
    },
  };
};

const endpointCircle = (theme): StyleRules => {
  return {
    root: {
      width: `${ENDPOINT_RADIUS * 2}px`,
      height: `${ENDPOINT_RADIUS * 2}px`,
      backgroundColor: theme.palette.bluegrey[100],
      borderRadius: '100%',
      position: 'absolute',
      right: `-${ENDPOINT_RADIUS}px`,
      top: '41px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '&.hover': {
        backgroundColor: `${theme.palette.blue[300]}`,
        '&:before': {
          display: 'block',
        },
        '&:after': {
          display: 'block',
        },
        '& *': {
          visibility: 'hidden',
        },
      },
      '&:before': {
        content: '""',
        position: 'absolute',
        left: '100%',
        width: '5px',
        borderBottom: `2px solid ${theme.palette.blue[300]}`,
        display: 'none',
      },
      '&:after': {
        content: '""',
        width: 0,
        height: 0,
        borderTop: `${ENDPOINT_RADIUS}px solid transparent`,
        borderBottom: `${ENDPOINT_RADIUS}px solid transparent`,
        borderLeft: `${ENDPOINT_RADIUS}px solid ${theme.palette.blue[300]}`,
        transform: 'translateX(12px)',
        display: 'none',
      },
    },
  };
};
const endpointCaret = (theme): StyleRules => ({
  root: {
    width: 0,
    height: 0,
    borderTop: '4px solid transparent',
    borderBottom: '4px solid transparent',
    borderLeft: `${ENDPOINT_RADIUS}px solid #bac0d6`,
    transform: 'translateX(1px)',
  },
});

const endpointPaintStyles = {
  width: 20,
  height: 20,
  connectorStyle: {
    lineWidth: 2,
    outlineColor: 'transparent',
    outlineWidth: 4,
    strokeStyle: '#4e5568',
    strokeWidth: 3,
  },
  fill: 'black',
  lineWidth: 3,
  radius: 5,
  stroke: 'black',
};

const endpointTargetEndpointParams = (endpointId) => {
  return {
    allowLoopback: false,
    anchor: 'ContinuousLeft',
    dropOptions: { hoverClass: 'drag-hover' },
    isTarget: true,
    uuid: endpointId,
  };
};

const genericNodeStyles = (customNodeStyles = {}) => {
  return (theme): StyleRules => {
    return {
      root: {
        ...nodeStyles(theme, customNodeStyles).root,
      },
      endpointCircle: {
        ...endpointCircle(theme).root,
      },
      endpointCaret: {
        ...endpointCaret(theme).root,
      },
    };
  };
};

export {
  endpointCircle,
  endpointCaret,
  endpointPaintStyles,
  endpointTargetEndpointParams,
  nodeStyles,
  genericNodeStyles,
};
