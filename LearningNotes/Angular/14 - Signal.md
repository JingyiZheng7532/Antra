### What is signal?

* It is a reactive primitive.
* Introduced in Angular 16.
* A signal is a reactive primitive that wraps a value and automatically notifies all its dependents whenever that value changes, ensuring efficient and granular UI updates.
* For Angular, signals represent a fundamental shift in how the freamework detects changes, moving from a "check everything" approach to a "targeted update" approach.
  * Eliminating the Zone.js overhead and not rely on zone.js anymore
  * By removing Zone.js, the initial bundle size is smaller
  * The browser does less work "listening" to events, resulting in higher frame rates and smoother interactions



### Core Signal APIs

* signal(initialValue): create a writable signal that holds a value 

  ```typescript
  // 1. 自动推断类型
  count = signal(0);
  console.log(count());
  
  // 2. 显示使用泛型(Generics)
  count = singal<number>(0);
  count = signal<string | null>(null);
  interface User {
    name:string;
    age:number;
  }
  user = signal<User>({ name: 'Ashley', age:'25' });
  
  // 3.手动定义声明属性类型
  // typescript如果没有初始化必须先声明类型；函数如惨必须声明类型
  count: WritableSignal<number> = signal(0);
  doubleCount: Signal<number> = computed(() => this.count() * 2);
  //在方法中使用类型
  resetCounter(targetSignal: WritableSignal<number>){
    targetSignal.set(0);
  }
  ```

  

* set(newValue): A method on a writable signal to completely replace the current value with a new one.

  ```typescript
  count.set(10);
  ```

  

* update(fn): A method on a writable signal to update the value based on its previous value

  ```typescript
  count.update(value => value + 1);
  ```

  

* computed(fn): create a read-only signal that derives its value from other signals

  * Key Feature: Lazy - it only calculates the value when you actually read it. And it caches the result. If the dependency(like count) hasn't changed, it won't re-run the calculation.

  * Usage: for data transformation(e.g., filtering a list, calculating a total)

    ```
    isEven = computed(() => count() % 2 === 0);
    ```

    

* effect(fn): An operation that runs whenever the signals it reads change

  * Usage: for side effects that don't return a value(e.g., logging, syncing to local storage, or calling an external library like D3/Echartsj)

  * Usually defined in a constructor or as a class member

  * Effects do not run synchronously at the moment a signal changes; instead, they are scheduled by Angular to run during the microtask phase.

    ```typescript
    constructor() {
    	effect(() => {
      	localStorage.setItem('cart', JSON.stringify(this.cart()));
      });
    
      const saved = localStorage.getItem('cart');
      if (saved) {
        this.cart.set(JSON.parse(saved));
      }
    }
    ```

    