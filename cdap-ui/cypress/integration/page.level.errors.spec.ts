/*
 * Copyright © 2020 Cask Data, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License'); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
*/

import * as Helpers from '../helpers';

let headers = {};
const FAKE_NAMESPACE = 'fakeNamespace';
const NO_NAMESPACE_MSG =`Namespace ${FAKE_NAMESPACE} does not exist.`;
const SELECTOR_404='[data-cy="page-404-error-msg"]';
describe('Page level error because of ', () => {
  // Uses API call to login instead of logging in manually through UI
  before(() => {
    Helpers.loginIfRequired().then(() => {
      cy.getCookie('CDAP_Auth_Token').then((cookie) => {
        if (!cookie) {
          return;
        }
        headers = {
          Authorization: 'Bearer ' + cookie.value,
        };
      });
    });
  });

  beforeEach(() => {
    Helpers.getArtifactsPoll(headers);
  });

  it('no namespace in home page should show 404', () => {
    // Go to home page
    cy.visit(`/cdap/ns/${FAKE_NAMESPACE}`);
    cy.get(SELECTOR_404).should('have.text', NO_NAMESPACE_MSG);
  });

  it('no namespace in pipeline studio page should show 404', () => {
    // Go to Pipelines studio
    cy.visit(`/pipelines/ns/${FAKE_NAMESPACE}/studio`);
    cy.get(SELECTOR_404).should('have.text','\'namespace:fakeNamespace\' was not found.');
  });

  it('no namespace in pipeline list page should show 404', () => {
    // Go to Pipelines list
    cy.visit(`/cdap/ns/${FAKE_NAMESPACE}/pipelines`);
    cy.get(SELECTOR_404).should('have.text', NO_NAMESPACE_MSG);
  });

  it('no namespace in pipeline drafts page should show 404', () => {
    // Go to Pipelines drafts
    cy.visit(`/cdap/ns/${FAKE_NAMESPACE}/pipelines/drafts`);
    cy.get(SELECTOR_404).should('have.text', NO_NAMESPACE_MSG);
  });

  it('no namespace in wrangler should show 404', () => {
    // Go to wrangler
    cy.visit(`/cdap/ns/${FAKE_NAMESPACE}/wrangler`);
    cy.get(SELECTOR_404).should('have.text', NO_NAMESPACE_MSG);
  });

  it('no workspace in wrangler should show 404', () => {
    // Go to wrangler workspace
    cy.visit('/cdap/ns/default/wrangler/invalid-workspace-id');
    cy.get(SELECTOR_404).should('have.text','Workspace \'invalid-workspace-id\' does not exist.');
  });

  it('no namespace in metadata page should show 404', () => {
    // Go to metadata page
    cy.visit(`/metadata/ns/${FAKE_NAMESPACE}`);
    cy.get(SELECTOR_404).should('have.text', NO_NAMESPACE_MSG);
  });

  it('no namespace in metadata search results page should show 404', () => {
    // Go to metadata search results page
    cy.visit(`/metadata/ns/${FAKE_NAMESPACE}/search/search_term/result`);
    cy.get(SELECTOR_404).should('have.text', NO_NAMESPACE_MSG);
  });

});
