## Route

#### What is route and how to set route config

* It is a core concept which enable Angular to support SPA

  * What is SPA? 
    * A SPA is a web application that loads once and then dynamically updates content without full page reloads.

  * How it works?
    * For Traditional Web App (multi-page), when user clicks link, the browser request new HTML page from server, and server sends entire new page, after receiving the browser reloads and display it. This process repeat for every click.  The initial loading is fast but every time needs reload which will slow it down

    * For SPA, after user clicks link, JavaScript loads new content, currently no page reload, only the needed data updates, then the browser displays updated content.

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

  * Order matters because Router uses a "First Match Wins" strategy

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

  * Multiple outlet: use 'name' to distinguish when there are multiple router-outlet in one page.

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
  
  * ```typescript
    // 1. 定义路由
    const routes: Routes = [
      { path: 'user/:id', component: UserDetailComponent }
    ];
    
    // 2. 导航到路由
    this.router.navigate(['/user', 123]); // URL: /user/123
    
    // 3. 在组件中获取参数
    @Component({
      selector: 'app-user-detail',
      template: `<p>User ID: {{ userId }}</p>`
    })
    export class UserDetailComponent implements OnInit {
      userId: string;
    
      constructor(private route: ActivatedRoute) {}
    
      ngOnInit() {
        this.route.params.subscribe(params => {
          this.userId = params['id']; // 获取 id 参数
        });
      }
    }
    
    // 4. 模板中的链接
    <a [routerLink]="['/user', 123]">Go to User 123</a>
    ```
  
    
  
*  Query Params 
  * url：*/user?page=1&sort=asc*
  
  * config: no need for special config
  
  * acquire: *ActivatedRoute.queryParams* (observable)
  
  * Optional key-value pairs appended to the URL after a question mark
  
  * ```typescript
    // 1. 导航到路由（带查询参数）
    this.router.navigate(['/user'], { queryParams: { page: 1, sort: 'asc' } });
    // URL: /user?page=1&sort=asc
    
    // 2. 在组件中获取查询参数
    @Component({
      selector: 'app-user',
      template: `
        <p>Page: {{ page }}, Sort: {{ sort }}</p>
      `
    })
    export class UserComponent implements OnInit {
      page: number;
      sort: string;
    
      constructor(private route: ActivatedRoute) {}
    
      ngOnInit() {
        this.route.queryParams.subscribe(params => {
          this.page = params['page'];   // 1
          this.sort = params['sort'];   // 'asc'
        });
      }
    }
    
    // 3. 模板中的链接
    <a [routerLink]="['/user']" [queryParams]="{ page: 2, sort: 'desc' }">Next Page</a>
    ```
  
  * Why we need query parameter?
  
    * Bookmarking -- save and return the exact page state;
    * Sharing -- share URL with others, they can see the same thing;
    * Back Button -- back button works correctly without losing filters;
    * Page Refresh -- state is preserved when refreshing the page;
    * SEO -- Search engines can index different filtered version;
  
* Static data

  * url：*/admin*

  * config: *{ path: 'admin', component: AdminComponent, data: { role: 'admin' } }*

  * acquire: *ActivatedRoute.data*

  * remains constant, commonly used for passing roles or page-specific metadata

  * Commonly used for permission checks, page titles, and metadata.

  * ```typescript
    // 1. 定义路由 - 在 data 中存储静态数据
    const routes: Routes = [
      { 
        path: 'admin', 
        component: AdminComponent,
        data: { role: 'admin', title: 'Admin Panel' }
      },
      { 
        path: 'user', 
        component: UserComponent,
        data: { role: 'user', title: 'User Dashboard' }
      },
      { 
        path: 'guest', 
        component: GuestComponent,
        data: { role: 'guest', title: 'Guest Page' }
      }
    ];
    
    // 2. 在组件中获取 route data
    @Component({
      selector: 'app-admin',
      template: `<h1>{{ pageTitle }}</h1>`
    })
    export class AdminComponent implements OnInit {
      pageTitle: string;
      userRole: string;
    
      constructor(private route: ActivatedRoute) {}
    
      ngOnInit() {
        this.route.data.subscribe(data => {
          this.pageTitle = data['title'];  // 'Admin Panel'
          this.userRole = data['role'];     // 'admin'
          
          // 根据角色显示不同内容
          if (this.userRole === 'admin') {
            this.loadAdminFeatures();
          }
        });
      }
    
      loadAdminFeatures() {
        console.log('Loading admin features...');
      }
    }
    
    // 3. 用 route data 进行权限检查
    @Injectable()
    export class AuthGuard implements CanActivate {
      constructor(
        private route: ActivatedRoute,
        private authService: AuthService
      ) {}
    
      canActivate(route: ActivatedRouteSnapshot): boolean {
        const requiredRole = route.data['role']; // 从路由 data 获取
        const userRole = this.authService.getUserRole();
    
        if (userRole === requiredRole) {
          return true; // ✅ 允许访问
        } else {
          return false; // ❌ 拒绝访问
        }
      }
    }
    ```

    ```html
    // 4. 模板中使用
    <a routerLink="/admin">Admin Panel</a>  
    <!-- data: { role: 'admin' } -->
    
    <a routerLink="/user">User Dashboard</a>  
    <!-- data: { role: 'user' } -->
    
    <a routerLink="/guest">Guest Page</a>    
    <!-- data: { role: 'guest' } -->
    ```



#### Route Events

* Angular broadcasts events at various stages of the routing process; you can listen for these events to perform corresponding actions.

From a navigation, what happen:

1. A navigation start when it is request (via ` [routerLink]` or `router.navigate()`) Then the first event emitted. **[NavigationStart]**
2. The router parses the url string into a *UrlTree*, and then execute the redirect check, create a new *UrlTree*, when the router successfully matches the url to a specific route config, it knows which component should be rendered, then emit event **[RoutesRecongnized]**
3. Before renderring, the routers begin security and logic checks. In this phase, the following event will be emitted: **[GuardsCheckStart], [canDeactive],  [CanActivate],  [CanActivateChild], [GuardsCheckEnd]**
4. After guards pass,  then move to data fetching phase, the router begin to execute any resolver scripts defined in the route **[ResolveStart]** and wait for all async data, and then end this resolve phase **[ResolveEnd]**
5. Now the router has both permission and data, it modifies the UI: destroy the old component and create the new one. Then send end signal, and the browser address bar has also been updated already **[NavigationEnd]**
6. **[NavigationError]**:Optional) If any step above (like lazy loading a module) fails, this event is fired instead of `NavigationEnd`.

#### Guard

* Route guards are **functions** to control wheter a use can navigate to or leave a particular route.

* Angular CLI:  to get a `CUSTOM_NAME-guard.ts`  file 

  ```
  ng generate guard CUSTOM_NAME
  ```

*  4 types of guards

  * **CanActivate**: whether a user can access a route

    ```typescript
    // 1. 创建 Auth Guard
    import { Injectable } from '@angular/core';
    import { CanActivate, Router } from '@angular/router';
    import { AuthService } from './auth.service';
    
    @Injectable()
    export class AuthGuard implements CanActivate {
      constructor(
        private authService: AuthService,
        private router: Router
      ) {}
    
      canActivate(): boolean {
        // 检查用户是否已登录
        if (this.authService.isLoggedIn()) {
          return true; // ✅ 允许进入路由
        } else {
          // ❌ 拒绝进入，重定向到登录页
          this.router.navigate(['/login']);
          return false;
        }
      }
    }
    
    // 2. 在路由中使用 Guard
    const routes: Routes = [
      { path: 'login', component: LoginComponent },
      { 
        path: 'dashboard', 
        component: DashboardComponent,
        canActivate: [AuthGuard]  // ← 使用 Guard
      },
      { 
        path: 'admin', 
        component: AdminComponent,
        canActivate: [AuthGuard]
      }
    ];
    
    // 3. 使用效果
    // 未登录用户访问 /dashboard
    //   → Guard 检查失败
    //   → 重定向到 /login ✅
    
    // 已登录用户访问 /dashboard
    //   → Guard 检查通过
    //   → 进入 /dashboard ✅
    ```
  
  * **CanActivateChild**: whether a user can access child routes of a parent route. It protect all child route, including grandchildren
  
  * **CanDeactivate**: whether a user can leave a route, like preventing navigation away from unsaved forms.
  
    ```typescript
    // 1. 创建 Unsaved Changes Guard
    import { Injectable } from '@angular/core';
    import { CanDeactivate } from '@angular/router';
    import { Observable } from 'rxjs';
    
    @Injectable()
    export class UnsavedChangesGuard implements CanDeactivate<any> {
      canDeactivate(component: any): Observable<boolean> | boolean {
        // 检查组件是否有未保存的修改
        if (component.hasUnsavedChanges()) {
          // 弹出确认对话框
          return confirm('你有未保存的修改，确定要离开吗？');
        }
        return true; // ✅ 可以离开
      }
    }
    
    // 2. 在组件中实现 hasUnsavedChanges 方法
    @Component({
      selector: 'app-edit-product',
      template: `
        <input [(ngModel)]="product.name">
        <button (click)="save()">保存</button>
      `
    })
    export class EditProductComponent {
      product = { name: 'iPhone' };
      originalName = 'iPhone';
    
      hasUnsavedChanges(): boolean {
        return this.product.name !== this.originalName;
      }
    
      save() {
        this.originalName = this.product.name;
      }
    }
    
    // 3. 在路由中使用 Guard
    const routes: Routes = [
      {
        path: 'edit/:id',
        component: EditProductComponent,
        canDeactivate: [UnsavedChangesGuard]  // ← 使用 Guard
      }
    ];
    
    // 4. 使用效果
    // 用户编辑产品名称但未保存
    //   → 点击其他链接
    //   → Guard 弹出确认框
    //   → 用户选择 "取消" → 留在页面
    //   → 用户选择 "确定" → 离开页面 ✅
    ```
  
    
  
  * **CanMatch**: whether a route can be matched during path matching, rejection falls through to try other matching routes instead of blocking navigation entirely;
  
    It can also allow you to use different components for the same path.When the user visits the same url, the first one that matches the correct guard will be used.

#### Resolver

* It is a service implemented through a function(ResolverFn type) to  allow route to fetch needed data before navigating to the next page

  ```
  // 1. 创建 Resolver
  import { Injectable } from '@angular/core';
  import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
  import { UserService } from './user.service';
  
  @Injectable()
  export class UserResolver implements Resolve<any> {
    constructor(private userService: UserService) {}
  
    resolve(route: ActivatedRouteSnapshot) {
      const userId = route.params['id'];
      // 预加载用户数据
      return this.userService.getUserById(userId);
    }
  }
  
  // 2. 在路由中配置 Resolver
  const routes: Routes = [
    {
      path: 'user/:id',
      component: UserDetailComponent,
      resolve: { user: UserResolver }  // ← user 是 key 名
    }
  ];
  
  // 3. 在组件中使用预加载的数据
  @Component({
    selector: 'app-user-detail',
    template: `
      <h1>{{ user.name }}</h1>
      <p>Email: {{ user.email }}</p>
      <p>Phone: {{ user.phone }}</p>
    `
  })
  export class UserDetailComponent implements OnInit {
    user: any;
  
    constructor(private route: ActivatedRoute) {}
  
    ngOnInit() {
      // ← 在这里获取 Resolver 预加载的数据
      this.route.data.subscribe(data => {
        this.user = data['user'];  // ✅ 数据已经加载好了
        console.log('User data:', this.user);
      });
    }
  }
  ```

  

#### Lazy loading

* use loadChildren

  ```typescript
  // app.routes.ts
  import { Routes } from '@angular/router';
  
  export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
      path: 'home',
      loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
    },
    {
      path: 'admin',
      loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
    },
    {
      path: 'user',
      loadChildren: () => import('./user/user.module').then(m => m.UserModule)
    },
    {
      path: 'report',
      loadChildren: () => import('./report/report.module').then(m => m.ReportModule)
    }
  ];
  ```

  
