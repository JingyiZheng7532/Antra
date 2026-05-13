## Directives

#### What is Directives?

* Directives are instructions that tell Angular how to manipulate the DOM. It extend HTML with new functionality.
* Think of them as special commands you add to HTML tags to change how they behave or look
* Key point: Directives make your HTML smarter and more dynamic by letting Angular control what appears on screen and how it behaves.



#### The relation between Components and Directives?

* Angular components are a subset of directives
* A component without template is also a directive
* Component = Directive + Template



#### 3 Types of Directives:

##### 1. Component Directives:

​	These create resuable components with their own template and logic

```html
<app-header></app-header>
<app-footer></app-footer>
```

##### 2. Structural Directives:

​	These change the structure of the DOM by adding or removing elements. They start with *****.

* *ngIf -> show or hide elements

  * In JavaScript, empty array/objsect  means truthy because we store its reference

  * Most of time, use it combine with <ng-temlate>, it support [ngIf] property

    ```html
    <div *ngIf="true">
      <h1>NGIF</h1>
    </div>
    
    // same:
    <ng-template [ngIf]="true">
        <h1>NGIF</h1>
    </ng-template>
    
    // similar for ngFor
    <ng-template [ngFor]="true">
      .....
    </ng-template>
    ```

* *ngFor -> loop through a list

  ```html
  <div *ngFor="let item of arr; let i = index; trackBy: item.id">
    <p>the {{ i }}th position</p>
    <p>{{ item.name }}</p>
    <p>{{ item['name'] }}</p>
  </div>
  ```

  * **trackBy**
    * it is an optional attribute that tells Angular how to identify items in a list so it can resue DOM elements efficiently instead of recreating them.
    * Why need it: When use *ngFor to render a list, it normally destroys and recreates DOM elements every time the list changes. This is **slow and wasteful**. Or in same case, we want to keep the input value or form state for example.

* *ngSwitch -> conditional rendering like a switch statement

  ```html
  <div [ngSwitch]="status">
    <p *ngSwitchCase='active'>Active</p>
    <p *ngSwitchCase='inactive'>Inactive</p>
    <p *ngSwitchDefault>Not Matched</p>
  </div>
  ```

  * *ngSwitchDefault -> means the current value doesn't match any of these ngSwitchCase

* We can not apply *ngIf and *ngFor on the same element: because it that case is allowed, it means there are 2 factor to control whether to dispaly the element or not, which might result in conflicts.

##### 3. Attribute Directives

​	These change the appearance or behavior of elements without altering the DOM structure.

* ngClass - Add or remove CSS class dynamically

  * Syntax1: Object Binding:

    ```html
    // single class
    <div [ngClass]="{'active': isActive}">Content</div>
    
    // multiple class
    <div [ngClass]="{'active': isActive, 'error':isError, 'dark-mode': isDarkMode }">
      Content
    </div>
    ```

  * Syntax2: String Binding

    ```html
    <div [ngClass]="'container input'"></div>
    ```

  * Syntax3: Array Binding

    ```html
    <div [ngClass]="['container','input']"></div>
    ```

    

* ngStyle - Apply inline styles dynamically

  * Syntax1: Object Binding

    ```typescript
    export class MyComponent {
      textColor = 'red';
      fontSize = 18;
      isHighLight = true;
    }
    ```

    ```html
    // single style
    <div [ngStyle]="{'color': textColor}">Content</div>
    
    // multiple style
    <div [ngStyle]="{'color': textColor, 'font-size': fontSize + 'px', 'background-color': isHighLight ? 'yellow' : 'white'}">Content</div>
    
    // equal to
    <div [style]="color: red; font-size: 18px: background-color: yellow">Content</div>
    ```

  * **ngStyle > ngClass**

* ngModel - Two-way data binding with form inputs



* How to add/remove class in the typescript

  * Using **Renderer2** - Renderer2 is Angular's sate way to manipulate the DOM.

    ```typescript
    import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
    
    @Component({
      selector: 'app-my-component',
      template: `<div #myDiv>Content</div`
    })
    export class MyComponent {
      @ViewChild myDiv!: ElementRef;
      
      constructor(private renderer: Renderer2){}
      
      addClassHandler() {
        this.renderer.addClass(this.myDiv.nativeElement, 'active');
      }
      
      removeClassHandler() {
        this.renderer.removeClass(this.myDiv.nativeElement, 'active')
      }
    }
    ```

  * Using ElementRef directively

    ```typescript
    this.myDiv.nativeElement.classList.add('active');
    this.myDiv.nativeElement.classList.remove('active');
    ```



#### How to create Custom Directives

* Generate the directive

  ````
  ng generate directive highlight
  ````

​	This will create highlight.directive.ts and highlight.directive.spec.ts two files

* Create a simple attribute directive

  ```typescript
  import { Directive, ElementRef, Renderer2 } from '@angular/core';
  
  @Directive({
    selector: '[appHighLight]'
  })
  export class HighlightDirective {
    constructor(private el: ElementRef, private render: Renderer2) {
      // when the directive is applied, highlight the element
      this.renderer.setStyle(this.el.nativeElement, 'background-color', 'yellow');
      this.renderer.setStyle(this.el.nativeElement, 'padding', '5px');
    }
  }
  ```

  ```html
  <p appHighlight>This text will be highlighted</p>
  ```

* Add input properties for customization

  ```typescript
  import { Directive, ElementRef, Renderer2, Input, OnInit } from '@angular/core';
  
  @Directive({
    selector: '[appHighlight]'
  })
  export class HightlightDirecive implements OnInit {
    @Input() highlightColor = 'yellow'; // Default color
    @Input() highlightBackground = 'yellow';
    
    constructor(private el: ElementRef, private renderer: Renderer2) {}
    // At this point, the @Input still has no input value, only default;
    
    ngOnInit() {
      this.renderer.setStyle(this.el.nativeElement, 'background-color', this.highlightColor);
      this.render.setStyle(this.el.nativeElement, 'color', this.hightlightBackground);
    }
  }
  ```

  ```html
  <p appHighLight>Default yellow highlight</p>
  
  <p appHighLight highlightColor="blue" highlightBackground="lightBlue">Custome colors</p>
  ```

* Add Event Handlers with @HostListener to implement **directive with Event**

  ```typescript
  import { Directive, ElementRef, Renderer2, Input, HostListener, OnInit } from '@angular/core';
  
  @Directive({
    selector: '[appHighlight]'
  })
  
  export class HighlightDirective implements OnInit {
    @Input() appHighlight = 'yellow'; // Default color
    @Input() defaultColor = 'black';
    
    constructor(private el: ElementRef, private renderer:Renderer2) {}
    
    @HostListener('mouseenter')
    onMouseEnter() {
      this.setHightlightColor(this.appHighlight);
    }
    
    @HostListener('mouseout')
    onMouseOut() {
      this.setDefaultColor();
    }
  
    
    ngOnInit() {
    		this.setDefaultColor();
    }
    
    private setHighlightColor(color: string) {
      this.renderer.setStyle(this.el.nativeElement, 'background-color', color);
    }
  
    private setDefaultColor() {
      this.renderer.setStyle(this.el.nativeElement, 'background-color', this.defaultColor);
    }
  }
  ```

  ```html
  <p appHighlight="pink" defaultColor="white">Hover me!</p>
  ```

  