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
import Button from '@material-ui/core/Button';
import ThemeWrapper from 'components/ThemeWrapper';
import { DAGProvider, MyContext } from 'components/DAG/DAGProvider';
import { SourceNode } from 'components/DAG/Nodes/SourceNode';
import { TransformNode } from 'components/DAG/Nodes/TransformNode';
import { DAGRenderer } from 'components/DAG/DAGRenderer';
import {
  defaultJsPlumbSettings,
  defaultConnectionStyle,
  selectedConnectionStyle,
  dashedConnectionStyle,
  solidConnectionStyle,
  conditionTrueConnectionStyle,
  conditionFalseConnectionStyle,
} from 'components/DAG/JSPlumbSettings';
import { fromJS } from 'immutable';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';

const registerTypes = {
  connections: {
    basic: defaultConnectionStyle,
    conditionFalse: conditionFalseConnectionStyle,
    conditionTrue: conditionTrueConnectionStyle,
    dashed: dashedConnectionStyle,
    selected: selectedConnectionStyle,
    solid: solidConnectionStyle,
  },
  endpoints: {},
};

export default class DAG extends React.PureComponent {
  public addNode = (addNode, type) => {
    addNode(
      fromJS({
        config: {
          label: `Node_${Date.now()
            .toString()
            .substring(5)}`,
        },
        type,
        id: `Node_${Date.now()
          .toString()
          .substring(5)}`,
        name: 'Ma Node!',
      })
    );
  };
  public nodeTypeToComponentMap = {
    source: SourceNode,
    transform: TransformNode,
  };
  public render() {
    return (
      <div className="diagram-container">
        <ThemeWrapper>
          <DAGProvider>
            <div>
              <h4> Inside DAG Provider </h4>
              <MyContext.Consumer>
                {(context) => {
                  return (
                    <React.Fragment>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.addNode.bind(this, context.addNode, 'source')}
                      >
                        Add Source
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.addNode.bind(this, context.addNode, 'transform')}
                      >
                        Add Transform
                      </Button>
                      <DAGRenderer
                        nodes={context.nodes}
                        connections={context.connections}
                        onConnection={context.addConnection}
                        onConnectionDetached={context.removeConnection}
                        onDeleteNode={context.removeNode}
                        jsPlumbSettings={defaultJsPlumbSettings}
                        // registerTypes={registerTypes}
                      >
                        {context.nodes.map((node, i) => {
                          const nodeObj = node.toJS();
                          const Component = this.nodeTypeToComponentMap[nodeObj.type];
                          return <Component {...nodeObj} key={i} />;
                        })}
                      </DAGRenderer>
                    </React.Fragment>
                  );
                }}
              </MyContext.Consumer>
            </div>
          </DAGProvider>
        </ThemeWrapper>
      </div>
    );
  }
}
