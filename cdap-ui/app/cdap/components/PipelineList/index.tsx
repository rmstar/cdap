/*
 * Copyright © 2018 Cask Data, Inc.
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

import React, { useEffect, useState } from 'react';
import DeployedPipelineView from 'components/PipelineList/DeployedPipelineView';
import ResourceCenterButton from 'components/ResourceCenterButton';
import DraftPipelineView from 'components/PipelineList/DraftPipelineView';
import { Route, Switch, NavLink } from 'react-router-dom';
import { getCurrentNamespace, isValidNamespace } from 'services/NamespaceStore';
import Helmet from 'react-helmet';
import { Theme } from 'services/ThemeHelper';
import T from 'i18n-react';
import ee from 'event-emitter';
import globalEvents from 'services/global-events';

import './PipelineList.scss';

const PREFIX = 'features.PipelineList';

const PipelineList: React.SFC = () => {
  const namespace = getCurrentNamespace();
  const basepath = `/ns/${namespace}/pipelines`;

  const productName = Theme.productName;
  const featureName = Theme.featureNames.pipelines;

  const pageTitle = `${productName} | ${featureName}`;
  const eventEmitter = ee(ee);

  const [state, setState] = useState();

  useEffect(() => {
    async function verifyNsValidity() {
      try {
        const validNs = await isValidNamespace(namespace);
        if (!validNs) {
          // need to use setState to throw an error so that the error thrown here is caught by
          // error boundary  more info: https://github.com/facebook/react/issues/14981

          setState(() => {
            // This will display a page level error
            throw new Error(`Namespace ${namespace} does not exist.`);
          });
        }
      } catch (e) {
        throw e;
      }
    }
    verifyNsValidity();
  }, []);

  return (
    <div className="pipeline-list-view">
      <Helmet title={pageTitle} />
      <h4 className="view-header">
        <NavLink exact to={basepath} className="option" activeClassName="active">
          {T.translate(`${PREFIX}.deployed`)}
        </NavLink>

        <span className="separator">|</span>

        <NavLink exact to={`${basepath}/drafts`} className="option" activeClassName="active">
          {T.translate(`${PREFIX}.draft`)}
        </NavLink>
      </h4>

      <ResourceCenterButton />

      <Switch>
        <Route exact path="/ns/:namespace/pipelines" component={DeployedPipelineView} />
        <Route exact path="/ns/:namespace/pipelines/drafts" component={DraftPipelineView} />
      </Switch>
    </div>
  );
};

export default PipelineList;
