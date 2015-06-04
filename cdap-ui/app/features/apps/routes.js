angular.module(PKG.name+'.feature.apps')
  .config(function ($stateProvider, $urlRouterProvider, MYAUTH_ROLE) {

    /**
     * State Configurations
     */
    $stateProvider

      .state('apps', {
        abstract: true,
        template: '<ui-view/>',
        url: '/apps',
        data: {
          authorizedRoles: MYAUTH_ROLE.all,
          highlightTab: 'development'
        },
        parent: 'ns'
      })

      .state('apps.list', {
        url: '',
        templateUrl: '/assets/features/apps/templates/list.html',
        controller: 'CdapAppListController',
        ncyBreadcrumb: {
          label: 'Applications',
          parent: 'overview'
        }
      })

      .state('apps.detail', {
        url: '/:appId',
        abstract: true,
        template: '<ui-view/>'
      })
        .state('apps.detail.overview', {
          url: '/overview',
          templateUrl: '/assets/features/apps/templates/detail.html',
          ncyBreadcrumb: {
            skip: true
          }
        })
          .state('apps.detail.overview.status', {
            url: '/status',
            ncyBreadcrumb: {
              parent: 'apps.list',
              label: '{{$state.params.appId}}'
            },
            controller: 'CdapAppDetailStatusController',
            templateUrl: '/assets/features/apps/templates/tabs/status.html'
          })

          .state('apps.detail.overview.dataset', {
            url: '/datasets',
            ncyBreadcrumb: {
              label: 'Dataset',
              parent: 'apps.detail.overview.status'
            },
            templateUrl: '/assets/features/apps/templates/tabs/datasets.html'
          });

  });
