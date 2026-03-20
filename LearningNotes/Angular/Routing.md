## Route

#### What is route and how to set route config

* It is a core concept which enable Angular to support SPA

* An object representing the mapping between URLs and components.

  Define as follow:

  ```typescript
  const routes: Routes = [
    { path: 'users', component: UserListComponent }, //Static route
    { path: 'user/:id', component: UserDetailComponent }, // Dynamic route
    
      // Default route: Redirects empty paths to '/users'.
    	// 'pathMatch: full' ensures it only triggers on an exact empty URL.
    { path: '', redirectTo: '/users', pathMatch: 'full' }, 
    
  		// Wildcard route: Catches any undefined URLs (404 Not Found).  
      // double asterisk  (**)
    	// This must always be the last entry in the array.
      //  because Angular uses a first-match wins strategy
    { path: '**', component: PageNotFoundComponent } 
  ];
  ```

* In order to set the route config, after define routes, we also need to register it into the module. Determine which initialization method to use based on the module's level.

  * AppModule: *RouterModule.forRoot(routes)*

    ```typescript
    @NgModule({
      imports: [RouterModule.forRoot(routes)], 
      exports: [RouterModule]
    })
    export class AppRoutingModule { }
    ```

  * FeatureModule: *RouterModule.forChild(routes)*

    ```typescript
    @NgModule({
      imports: [RouterModule.forChild(userRoutes)], // subModule
      exports: [RouterModule]
    })
    export class UserRoutingModule { }
    ```

  * Difference: forRoot not only responsible for processing the route but also responsible for inject the *Router Service* into the application, and create singleton service. So we can use only once forRoot in the whole project, but we can use mutiple times forChild for each subModule

  * RouterModule

    * provide directives like *routerLink* and *router-outlet*
    * provide service like *Router* and *ActivatedRoute*
    * provide static method like *forRoot* and *forChild*

* How to display? Use <router-outlet></router-outlet> as the placeholder, which will reander the matched component based on the current navigation state.

* How to trigger navigation？ Expect for type different url mannually, we can also set it both in temaplte and ts class

  * HTML:

    ```HTML
     <a routerLink="/search">Go to Search</a>
    ```

  * TypeScript: 

    ```typescript
    this.router.navigate(['/profile', userId]);
    ```

    

#### Some related concepts

* Guard：A service that decides if a user can enter or leave a route.

* resolver：A service that fetches data before the component is even loaded.

* Lazy loading： A technique that loads a feature's code only when the user clicks on it.

  

#### Parameters

* Required Route Parameters
  * url:  */user/1*
  * config:  *{ path: 'user/**:**id', component: UserDetailComponent }*
  * acquire: *ActivatedRoute.params* (observable)
  * Must be present. Without this ID, the route typically cannot be matched.

*  Query Params 
  * url：*/user?page=1&sort=asc*
  * config: no need for special config
  * acquire: *ActivatedRoute.queryParams* (observable)
  * Optional key-value pairs appended to the URL after a question mark
* Static data
  * url：*/admin*
  * config: *{ path: 'admin', component: AdminComponent, data: { role: 'admin' } }*
  * acquire: *ActivatedRoute.data*
  * remains constant, commonly used for passing roles or page-specific metadata



#### Route Events

From a navigation, what happen:

1. A navigation start when it is request (via ` [routerLink]` or `router.navigate()`) Then the first event emitted. **[NavigationStart]**
2. The router parses the url string into a *UrlTree*, and then execute the redirect check, create a new *UrlTree*, when the router successfully matches the url to a specific route config, it knows which component should be rendered, then emit event **[RoutesRecongnized]**
3. Before renderring, the routers begin security and logic checks. In this phase, the following event will be emitted: **[canDeactive], [GuardsCheckStart], [CanActivatedChild], [CanActivated], [GuardsCheckEnd]**
4. After guards pass,  then move to data fetching phase, the router begin to execute any resolver scripts defined in the route **[ResolveStart]** and wait for all async data, and then end this resolve phase **[ResolveEnd]**
5. Now the router has both permission and data, it modifies the UI: destroy the old component and create the new one. Then send end signal, and the browser address bar has also been updated already **[NavigationEnd]**
6. **[NavigationError]**:Optional) If any step above (like lazy loading a module) fails, this event is fired instead of `NavigationEnd`.

#### Guard

==// todo==

#### Resolver

==// todo==

