### Lifecycle Hooks



#### The exact execution order for all the liftcycle order:

1. ngOnChanges
2. ngOnInit
3. ngDoCheck
4. ngAfterContentInit
5. ngAfterContentChecked
6. ngAfterViewInit
7. ngAfterViewChecked
8. ngOnDestroy

#### 

#### Construstor

* Runs before Angular initializes the component
* when the class is intantiated
* In this part, we always:
  * Inject the dependency
  * Initialize simple properties
  * Set default values
* But can not 
  * Access @Input properties(not set yet)
  * Access child child components (not create yet)
  * Access DOM(not rendered yet)
  * Make HTTP calls(component not ready yet)
* Keep it simple



#### ngOnChanges

* Runs before ngOnInit and whenever @Input properties change

* Might runs many times

  ```typescript
  export class ChildComponent implements OnChanges {
    @Input() count = 0;
  
    ngOnChanges(changes: SimpleChanges) {
      if (changes['count']) {
        console.log('count changed:', changes['count'].currentValue);
      }
    }
  }
  ```

  

#### ngOnInit

* Runs after constructor and after first ngOnChanges
* During this phase, we can
  * Access @Input properties(now they have values)
  * Initialize complex logic
  * Make HTTP calls
  * Subscribe to observables
  * Setup event listeners



#### ngDoCheck

* Runs after ngOnInit, then on every change detection run
* will be excuted very frequently
* Purpose is to detect and act on changes that Angular doesn't automatically detect
* Rarely used



#### ngAfterContentInit

* Runs after Angular projects external content into the component 
* Be excuted once
* Mainly usage is to respond to projected content initialization

```typescript
@Component({
  selector: 'app-card',
  template: `
    <div class="card">
      <div class="card-header">
        <ng-content select=".header"></ng-content>
      </div>
      <div class="card-body">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class CardComponent implements AfterContentInit {
  @ContentChild('title') title: ElementRef;

  ngAfterContentInit() {
    // ✅ Now you can access projected content
    console.log(this.title);
  }
}
```

parent usage

```html
<app-card>
  <h2 #title class="header">Card Title</h2>
  <p>Card content goes here</p>
</app-card>
```





#### ngAfterContentChecked

* Runs after ngAfterContentInit, then after every change detection
* Multiple times
* Purpose is to respond to checked projected content
* Rarely used



#### ngAfterViewInit

* Runs After angular initializes the component's views and child views
* once
* during this phase, we can
  * Access child components and DOM elements
  * @ViewChild / @ViewChildren
  * Template variables(#ref)

```typescript
@Component({
  selector: 'app-parent',
  template: `
    <app-child #childRef></app-child>
    <p #paragraph>Hello</p>
  `
})
export class ParentComponent implements AfterViewInit {
  @ViewChild('childRef') child: ChildComponent;
  @ViewChild('paragraph') paragraph: ElementRef;

  ngAfterViewInit() {
    // ✅ Now you can access child and DOM
    console.log(this.child); // ChildComponent instance
    console.log(this.paragraph.nativeElement.textContent); // 'Hello'
    
    // ✅ Call child methods
    this.child.doSomething();
    
    // ✅ Modify DOM
    this.paragraph.nativeElement.textContent = 'Modified';
  }
}
```



#### ngAfterViewChecked

* Runs after ngAfterViewInit, then after every change detection
* multiple times
* Purpose is to repond to checked component views and child views



#### ngOnDestroy

* Runs just before Angular destroys the component
* once
* Used for cleanup before component is destroyed
* During this phase, we always
  * Unsubscribe from observables
  * Detach event listeners
  * Stop timers/intervals
  * Close WebSocket connections

```typescript
export class UserComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  constructor(private userService: UserService) {}

  ngOnInit() {
    // Subscribe to data
    this.subscription = this.userService.getUser().subscribe(data => {
      console.log(data);
    });
  }

  ngOnDestroy() {
    // ✅ Clean up subscriptions
    this.subscription.unsubscribe();
    
    // ✅ Stop timers
    clearInterval(this.timer);
    
    // ✅ Remove event listeners
    document.removeEventListener('click', this.handler);
  }
}
```

about the basic usage of websocket

```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-chat',
  template:`<p>Chat Messages: {{ messages }}</p>`
})

export class ChatComponent implements OnInit, OnDestroy{
  private ws: WebSocket;
  messages: string[] = [];
  
  ngOnInit() {
    this.ws = new WebSocket('ws: //localhost:8080/chat');
    
    this.ws.onopen = () => {
      console.log('WebSocket connected');
    }
    
    this.ws.onmessage = (event) => {
      console.log('Message received: ', event.data);
      this.messages.push(event.data);
    }
    this.ws.onerror = (error) => {
      console.error("WebSocket error: ", error);
    }
    this.ws.onclose = () => {
      console.log('WebSocket disconnected');
    };
  }
  
   ngOnDestroy() {
    // ✅ 关闭 WebSocket
    if (this.ws) {
      this.ws.close();
    }
  }
}



```



#### Change Detection Cycle:

* What triggers change detection?

  * User events: like click, input, submit
  * Timers: setTimeout, setInterval
  * HTTP Request： Service calls， API response
  * Promises: Async/await
  * RxJS Observable

* Angular has two strategies for how aggressive change detection should be:

  * Default strategy: ChangeDetectionStrategy.Default
    - Means  change detection runs on every event throughout the entire component tree.
  * OnPush strategy (Performace optimization):changeDetection: ChangeDetectionStrategy.OnPush;
    - Change detection only runs when @Input changes or events in the component occur

* Manual Change Detection

  ```typescript
  import { Component, ChangeDetectorRef } from '@angular/core';
  
  @Component({
    selector: 'app-manual',
    template: `<p>{{ count }}</p>`
  })
  export class ManualComponent {
    count = 0;
  
    constructor(private cdr: ChangeDetectorRef) {}
  
    increment() {
      this.count++;
      
      // ✅ Manually trigger change detection
      this.cdr.detectChanges();
    }
  
    // ✅ Mark component for check (on next cycle)
    markForCheck() {
      this.cdr.markForCheck();
    }
  
    // ✅ Detach from change detection
    detach() {
      this.cdr.detach();
    }
  
    // ✅ Reattach to change detection
    reattach() {
      this.cdr.reattach();
    }
  }
  ```





#### Related Key notice

* [hidden] = true => not execute any destroy hooks

* When the ngIf turn to truthy, the element will start from the beginnning

  