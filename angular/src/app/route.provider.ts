import { RoutesService, eLayoutType } from '@abp/ng.core';
import { APP_INITIALIZER } from '@angular/core';

export const APP_ROUTE_PROVIDER = [
  { provide: APP_INITIALIZER, useFactory: configureRoutes, deps: [RoutesService], multi: true },
];

function configureRoutes(routesService: RoutesService) {
  return () => {
    routesService.add([
      {
        path: '/',
        name: '::Menu:Home',
        iconClass: 'fas fa-home',
        order: 1,
        layout: eLayoutType.application,
      },
      {
        path: '/order',
        name: '::Menu:Order',
        iconClass: 'fas fa-book',
        order: 2,
        layout: eLayoutType.application,
      },
      {
        path: '/customers',
        name: '::Menu:Customers',
        parentName: '::Menu:Order',
        iconClass: 'fas fa-user-alt',
        layout: eLayoutType.application,
        requiredPolicy: 'Order.Customers',
      },
      {
        path: '/products',
        name: '::Menu:Products',
        parentName: '::Menu:Order',
        iconClass: 'fas fa-dice-d6',
        layout: eLayoutType.application,
        requiredPolicy: 'Order.Products',
      },
      {
        path: '/masters',
        name: '::Menu:Masters',
        parentName: '::Menu:Order',
        iconClass: 'fas fa-shipping-fast',
        layout: eLayoutType.application,
        requiredPolicy: 'Order.Masters',
      }

    ]);
  };
}
