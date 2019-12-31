/*
 * Copyright © 2019 Cask Data, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
*/

import * as React from 'react';
import { INodeComponentProps } from 'components/DAG/DAGRenderer';
import withStyles, { WithStyles, StyleRules } from '@material-ui/core/styles/withStyles';
import {
  endpointCaret,
  endpointCircle,
  endpointPaintStyles,
  endpointTargetEndpointParams,
} from 'components/DAG/Nodes/utilities';
const styles = (theme): StyleRules => ({
  root: {
    height: '100px',
    width: '200px',
    border: '1px solid #48c038',
    display: 'inline-block',
    position: 'absolute',
  },
  endpointCircle: {
    ...endpointCircle(theme).root,
  },
  endpointCaret: {
    ...endpointCaret(theme).root,
  },
});

interface ISourceNodeProps extends WithStyles<typeof styles>, INodeComponentProps {}
class SourceNodeComponent extends React.Component<ISourceNodeProps, any> {
  private rootRef: HTMLElement | null;

  public componentDidMount() {
    const source = {
      isSource: true,
      maxConnections: -1, // -1 means unlimited connections
      Endpoint: 'Dot',
      EndpointStyle: { radius: 10 },
      Connector: [
        'Flowchart',
        { stub: [10, 15], alwaysRespectStubs: true, cornerRadius: 20, midpoint: 0.2 },
      ],
      paintStyle: endpointPaintStyles,
    };
    if (this.props.initNode && typeof this.props.initNode === 'function') {
      const initConfig = {
        endPointParams: [
          {
            element: this.rootRef,
            params: source,
            referenceParams: {},
          },
        ],
        makeTargetParams: endpointTargetEndpointParams(`${this.props.id}-DottedEndPoint`),
        nodeId: this.props.id,
      };
      this.props.initNode(initConfig);
    }
  }

  public shouldComponentUpdate() {
    return false;
  }

  public render() {
    console.log('Rendering node: ', this.props.id);
    const { classes } = this.props;
    const Endpoint = () => (
      <div className={classes.endpointCircle} ref={(ref) => (this.rootRef = ref)}>
        <div className={classes.endpointCaret} />
      </div>
    );
    return (
      <div id={this.props.id} className={classes.root}>
        {this.props.config && this.props.config.label ? this.props.config.label : this.props.id}
        <Endpoint />
      </div>
    );
  }
}
const SourceNode = withStyles(styles)(SourceNodeComponent);
export { SourceNode };
