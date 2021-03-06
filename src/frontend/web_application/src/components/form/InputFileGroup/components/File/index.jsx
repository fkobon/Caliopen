import React, { PureComponent } from 'react';
import { Trans } from 'lingui-react';
import PropTypes from 'prop-types';
import Button from '../../../../Button';

class File extends PureComponent {
  static propTypes = {
    onRemove: PropTypes.func.isRequired,
    file: PropTypes.shape({}).isRequired,
  };

  static defaultProps = {
  };

  render() {
    const { file, onRemove } = this.props;
    const size = Math.round(file.size / 100) / 10;

    return (
      <div className="m-input-file-group__file">
        <Button
          className="m-input-file-group__file__remove"
          icon="remove"
          value={file}
          onClick={onRemove}
          shape="plain"
        />
        <span className="m-input-file-group__file__name">{file.name}</span>
        <span className="m-input-file-group__file__size">
          <Trans id="input-file-group.file.size">
            {size} kB
          </Trans>
        </span>
      </div>
    );
  }
}

export default File;
