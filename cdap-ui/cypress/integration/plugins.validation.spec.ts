import {getArtifactsPoll, loginIfRequired} from '../helpers';
import {DEFAULT_BIGQUERY_DATASET, DEFAULT_BIGQUERY_TABLE, DEFAULT_GCP_PROJECTID, DEFAULT_GCP_SERVICEACCOUNT_PATH} from '../support/constants';
import {INodeInfo} from '../typings';

const sourceNode: INodeInfo = {
  nodeName: 'BigQueryTable',
  nodeType: 'batchsource'
};

const sourceProperties = {
  referenceName: 'BQ_Source',
  project: DEFAULT_GCP_PROJECTID,
  datasetProject: DEFAULT_GCP_PROJECTID,
  dataset: DEFAULT_BIGQUERY_DATASET,
  table: DEFAULT_BIGQUERY_TABLE,
  serviceFilePath: DEFAULT_GCP_SERVICEACCOUNT_PATH,
};

let headers = {};

describe('Plugin properties', () => {
  // Uses API call to login instead of logging in manually through UI
  before(() => {
    loginIfRequired().then(() => {
      cy.getCookie('CDAP_Auth_Token').then((cookie) => {
        if (!cookie) {
          return;
        }
        headers = {
          Authorization: 'Bearer ' + cookie.value,
        };
      });
    });
    cy.visit('/pipelines/ns/default/studio');
  });

  beforeEach(() => {
    getArtifactsPoll(headers);
  });

  it('should be validated and errors found in properties', () => {
    cy.add_node_to_canvas(sourceNode);
    cy.get(
          '[data-cy="plugin-node-BigQueryTable-batchsource-0"] .node .node-configure-btn')
        .invoke('show')
        .click();
    // Testing for errors found, rgb(164, 4, 3) is the red border color
    cy.get('[data-cy="plugin-properties-validate-btn"]').click();
    cy.get('[data-cy="plugin-properties-errors-found"]')
        .should('have.text', '3 errors found.');
    cy.get('[data-cy="referenceName"] > [data-cy="widget-wrapper-container"]')
        .should('have.css', 'border-color', 'rgb(164, 4, 3)');
    // Testing if the widget is highlighted when there is an error
    // and the error text
    cy.get('[data-cy="referenceName"] ~ [data-cy="property-row-error"]')
        .should(
            'have.text', 'Required property \'referenceName\' has no value.');
    cy.get('[data-cy="referenceName"] > [data-cy="widget-wrapper-container"]')
        .should('have.css', 'border-color', 'rgb(164, 4, 3)');
  });

  it('should be validated and no errors found in plugin properties', () => {
    // Testing for no errors found
    cy.get('input[data-cy="referenceName"]').type('randomName');
    cy.get('input[data-cy="dataset"]').type('randomDataset');
    cy.get('input[data-cy="table"]').type('randomTableName');
    cy.get('[data-cy="plugin-properties-validate-btn"]').click();
    cy.get('[data-cy="plugin-properties-no-errors"]')
        .should('have.text', 'No errors found.');
  });

  it('should be validated and errors found in schema', () => {
    // configuring properties for the plugin
    cy.get('input[data-cy="referenceName"]')
        .clear()
        .type(sourceProperties.referenceName);
    cy.get('input[data-cy="project"]').clear().type(sourceProperties.project);
    cy.get('input[data-cy="datasetProject"]')
        .clear()
        .type(sourceProperties.datasetProject);
    cy.get('input[data-cy="dataset"]').clear().type(sourceProperties.dataset);
    cy.get('input[data-cy="table"]').clear().type(sourceProperties.table);
    cy.get('input[data-cy="serviceFilePath"]')
        .clear()
        .type(sourceProperties.serviceFilePath);
    // retrieving schema
    cy.get('[data-cy="get-schema-btn"]').click();
    cy.get('[data-cy="get-schema-btn"]').contains('Get Schema', {
      timeout: 10000
    });
    // Changing type of one of the fields in schema to timestamp and validating
    // This will cause validation to fail and an error would show up in schema
    // modal
    cy.get('select[data-cy=schema-row-type-select-0]')
        .select('string:timestamp');
    cy.get('[data-cy="plugin-properties-validate-btn"]').click();
    cy.get('[data-cy="schema-row-0"]')
        .should('have.css', 'border', '2px solid rgb(164, 4, 3)')
    cy.get('[data-cy="schema-row-error-0"]')
        .should(
            'have.text',
            '\n            Field \'name\' of type \'timestamp in microseconds\' has incompatible type with column \'name\' in BigQuery table \'cdap_gcp_ui_test.users\'. Modify the input so that it is of type \'string\'.\n          ')
  });
});
