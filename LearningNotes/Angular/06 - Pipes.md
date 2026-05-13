

## Pipe

#### What is pipe?

* A pipe is feature in Angular that transforms for display in template.
* Think of it like a function that takes input data and outputs it in a different format.



#### Built-in Pipes

1. Uppercase/lowercase

   ```html
   <p>{{ 'hello world' | uppercase }}</p>
   <!-- Output: HELLO WORLD -->
   
   <p>{{ 'HELLO WORLD' | lowercase }}</p>
   <!-- Output: hello world -->
   ```

2. date

   ```html
   <p>{{ today | date }}</p>
   <!-- Output: May 12, 2026 -->
   
   <p>{{ today | date: 'short' }}</p>
   <!-- Output: 5/12/26 -->
   
   <p>{{ today | date: 'yyyy-MM-dd' }}</p>
   <!-- Output: 2026-05-12 -->
   ```

3. currency

   ```html
   <p>{{ 100.5 | currency }}</p>
   <!-- Output: $100.50 -->
   
   <p>{{ 100.5 | currency: 'EUR' }}</p>
   <!-- Output: €100.50 -->
   ```

4. number

   ```html
   <p>{{ 1234.56 | number: '1.2-2' }}</p>
   <!-- Output: 1,234.56 -->
   <!--Integer Digits. Minimum Decimal Places - Maximum Decial Places -->
   ```

5. percent

   ```html
   <p>{{ 0.85 | percent }}</p>
   <!-- Output: 85% -->
   ```

6. json

   ```html
   <p>{{ user | json }}</p>
   <!-- Output: { "name": "John", "age": 30 } -->
   ```

7. slice

   ```html
   <p>{{ 'Hello' | slice: 0: 3 }}</p>
   <!-- Output: Hel -->
   
   <p>{{ [1, 2, 3, 4, 5] | slice: 1: 4 }}</p>
   <!-- Output: 2, 3, 4 -->
   ```



#### How to create custom Pipe

* Generate pipe

  ```bash
  ng generate pipe myPipe
  # or
  ng g p myPipe
  ```

* create simple pipe --- reverse text pipe

  ```typescript
  import { Pipe, PipeTransform } from '@angular/core';
  
  @Pipe({
    name: 'reverse'
  })
  export class ReversePipe implements PipeTransform {
    transform(value: string): string {
      return value.split('').reverse().join('');
    }
  }
  ```

````html
	<p>{{ 'Hello' | reverse }}</p>
	<!-- Output: olleH -->
````

* Pipe with parameter

  ```typescript
  @Pipe({
    name: 'repeat'
  })
  export class RepeatPipe implements PipeTransform {
    transform(value: string, times: number = 1): string {
      return value.repeat(times);
    }
  }
  ```

  ```html
  <p>{{ 'Hi' | repeat: 3 }}</p>
  <!-- Output: HiHiHi -->
  ```

* Register Pipe in Module

* can Apply mutiple pipe

  ```html
  <p>{{ data | data:'fullDate'| uppercase }}</p>
  ```

  

