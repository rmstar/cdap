/*
 * Copyright © 2020 Cask Data, Inc.
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
import { WithStyles } from '@material-ui/core/styles/withStyles';
import { endpointTargetEndpointParams, genericNodeStyles } from 'components/DAG/Nodes/utilities';
const AbstractNodeStyles = genericNodeStyles();

export interface IAbstractNodeProps<S extends typeof AbstractNodeStyles>
  extends WithStyles<S>,
    INodeComponentProps {}

export class AbstractNode<
  P extends IAbstractNodeProps<typeof AbstractNodeStyles>
> extends React.Component<P, any> {
  private rootRef: HTMLElement | null;

  public type = '';

  public componentDidMount() {
    const endPointParams = this.getEndpointParams();
    if (this.props.initNode && typeof this.props.initNode === 'function') {
      const initConfig = {
        endPointParams: [
          {
            element: this.rootRef,
            params: endPointParams,
            referenceParams: {},
          },
        ],
        makeTargetParams: endpointTargetEndpointParams(`${this.props.id}-DottedEndPoint`),
        nodeId: this.props.id,
        checkForValidIncomingConnection: this.checkForValidIncomingConnection,
      };
      this.props.initNode(initConfig);
    }
  }
  public shouldComponentUpdate() {
    return false;
  }

  public getEndpointParams = () => {
    return null;
  };

  public checkForValidIncomingConnection = (connObj) => true;

  public render() {
    const { classes } = this.props;
    const Endpoint = () => (
      <div
        className={classes.endpointCircle}
        ref={(ref) => (this.rootRef = ref)}
        data-node-type={this.type}
      >
        <div className={classes.endpointCaret} />
      </div>
    );
    return (
      <div id={this.props.id} className={classes.root} data-node-type={this.type}>
        {this.props.config && this.props.config.label ? this.props.config.label : this.props.id}
        <Endpoint />
      </div>
    );
  }
}
