## Observable

#### What is observable:

* A asynchronous concept in **RxJS library**
  * RxJS is built up with JS (Reactive Extensions Library for JavaScript)
  * can be used in Angular
  * Provide a lot of operators to manage data that changes over time
* A standard JavaScript instance object
  * Its prototype points to *Observable.prototype*

* Like a stream of data arriving over time
* Needed to be subscribed if you want to get the data, and unsubscribed when don't need any more



#### What is the difference between promise and observable

* Single Value & mutiple value
  * Promise emits only one single value and them complete
  * Observable can emit multiple value over a period of time
* Eager & lazy
  * Promise is eager. As soon as we create a promise, the constructor fn will be executed
  * Observable is lazy. It doesn't do anything until you call *.subscribe()*
* Cancelable & non-cancelable
  * Once a promise starts, you can not cancel it,  we have to wait for it to either resolve or reject
  * Observable can be canceled by calling *.unsubscribe()* at any time to stop listen to the data and clean up the resource
* Operators
  *  Observable has more operators from RxJS than promise



#### Ways to create an observable:

* Use observable constructor with **new** key word

  * .next() : emit value manually

  * .complete(): signal to close the data stream

  * .error():  accept an error obj or a string as the error info. 

    ​		also a terminal signal

  * For  complete() and error(), only one will be excuted

```typescript
dataStream = new Observable<number> ((observer) => {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  observer.complete();
  observer.error()
})
```

* User operators: like of(), from(), fromEvent()...

* Framework-provided stream（Angular integration）
  * HttpClient:  http request method (like *http.get()* )returns an Observable that emits response;
  * Reactive Forms: *formControl.valueChanges* and *statusChanges* are long-lived observables that emit every time the input changes;
  * Router: *activatedRoute.params* provide a stream of URL parameters.



#### Use observable

* In order to get the value emitted by observable, we need to use .subscribe() to subscribe the observable

* .subscribe() return a **Subscription** object

  * to declare a subcription variable:

    ```typescript
    private searchSub?: Subscription<string>
    ```

  * call .unsubscribe() to unsubscribe to the observable, always in ngOnDestroy

  * About managing multiple subscription, we can use **Parent Subscription** to group all active streams into a single container, which provides *.add()* method to attach child subscription to this parent container 

    ```typescript
    private subscriptions = new Subscription();
    
    ngOnInit() {
      this.subscriptions.add(
        this.searchControl.valueChanges.subscribe()
      );
      this.subscriptions.add(
        this.http.get(url).subscribe();
      );
    }
    
    ngOnDestroy() {
      // This one call unsubscribes EVERYTHING added to it
      this.subscriptions.unsubscribe()
    }
    ```

  * About processing the emitted data: After RxJS.6, we are recommended to pass in an observer， which is a js object, including next, error and complete attribute, the corresponding value should be a callback fn 

    ```typescript
    myObservable.subscribe({
    	next: (data) => {},
      error: (err: HttpErrorResponse) => {},
      complete: () => {}
    });
    ```



#### Some common RxJS operators;

* Creation operators
  * of: convert value one by one
  * from: convert an array into observable
  * fromEvent: monitor a specific user event
* Join creation operators
  * combineLatest:  take an array of observable or an object of mutiple observable as input, return a new Observable that emits an Array (or Object) of the latest values from every input stream
  * forkjoin: can accept mutiple observable as an array, and wait for all of them complete, and return an observable which emits an array of latest value emitted by passed observable; only emit once;
* Transformation operators
  * map: pass in a project function, which will be applyed to every emitted value from the source observable
  * switchMap: pass in a project fn as map, apply it to every emitted value. The difference is it will unsubscribe from the previous observable as soon as a new emitted value coming.
  * concatMap: pass in a project fn,  different from map( which is used for simple, sync data transformation that return a value), concat can be used to manage async tasks(inner observable), it maps each value to an inner observable and queue them up, we use it always when we care about the order
  * mergeMap: maps each value to an inner Observable and executes them all in parallel, without waiting for the previous one to finish.
  * ==// todo practice==
* Filtering operators
  * filter:  pass in a fn which return true or false, applied to every value from source observable to determine whether this value can be emitted finally
  * debounceTime: pass in a number representing that emitting a value after a specific period of inactivity
  * throttleTime: pass in a number representing during this period there will be at most one value be emitted. <u>Both of debounceTime and throttleTime can be used to limit the frequency of unnecessary movement</u>
  * take: pass in a number n means we only emit the first n value of the source observable
  * takeUntil: pass in an observable, notify the source observable it's time to stop when the notifier observable emit a value
* Error Handing operators
  * ==catchError: // todo==
* Utility operators
  * tap: will not change the emitted value, we always concole.log the value in this operator to check

* pipe(): is not an operator, but a method on the observable prototype, used for  composing multiple operators together in a readable and tree-shakable way.
* Operators are **pure fn**: pure fn means
  * it returns the same output every time the same input is provided
  * produces no side effects，only calculates and returns a value without modifying the state of the outside world."



## Subject



#### What is subject:

* A concept from RxJS

* A special type of observable
* support all the characters same as observable



#### What is the difference between subject and plain observable

* Passive & Active:
  * Observable is passive, which only starts producing data once someone subscribe to it, and we can not make the obvservable send data manually from outside
  * while subject is active, it existed and produce data even nobody is listening, it provides observer interface like *.next() .error() .complete()* to send value outside of its constructor

* Unicast & Multicast
  * For observable, every subscription is independent and will get a version of complete value;
  * For subject, a subject can be subscribed by mutiple subscribers, and they share the same execution



#### Where should we use these subject:

Used for communication between different component expect for parent component and child component, like sharing data between sibling component



#### Other Type of subjects:

* BehaviorSubject: has an input parameter, represent the latest value; BehaviorSubject provide the latest value for its subscriber
* ReplaySubject: has an input pareameter, represent the buffer size, which means how many previous value will be provided for the subscriber
* AsyncSubject: only emits the last value and only when it complete



#### How to display observable in template?

* Use **async pipe**, it subscribes to the observer/subject from template and no need to unsubscribe because it will be automatically unsubscribed when the componen t is destroyed.
* Usually we use this async pipe when there is no need for data transformation, only for display

