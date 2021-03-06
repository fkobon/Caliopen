import { createSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Presenter from './presenter';

const devicesSelector = state => state.device.devicesById;
const deviceIdSelector = (state, ownProps) => ownProps.params.deviceId;

const mapStateToProps = createSelector(
  [devicesSelector, deviceIdSelector],
  (devicesById, deviceId) => ({ device: devicesById[deviceId] })
);

export default compose(
  connect(mapStateToProps)
)(Presenter);
