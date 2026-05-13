## Forms Validators

###### These three concept are the building blocks used to construct the Reactive Froms

* Every reactive form is a tree of objects that all inherit from a base class called **AbstractControl**
* FormControl: smallest unit, it track the value and validation status of an individual input field
* FormGroup: a group of FormControl objects
* FromArray: manages a variable-length list of controls
* Key difference: Use FormGroup when you know the keys(e.g., firstName, lastName). Use FormArray when you don't know how many items there will be or when the order matters



### How to create a formGroup?

* mannully create instance of FormGroup and FormControl

  ```typescript
  import { FormGroup, FormControl, Validators } from '@angular/forms';
  
  this.loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });
  ```

* use FormBuilder - it is a service provided by the ReactiveFormsModule

  ```typescript
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  
  // inject FormBuilder
  constructor(private fb: FormBuilder) {}
  this.loginForm = this.fb.group({
    // [initialValue, validators]
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
  ```

  ```html
  //bind to template using [formGroup] and formControlName directives
  
  <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
    <label>Username:</label>
    <input type="text" formControlName="username">
  
    <label>Password:</label>
    <input type="password" formControlName="password">
  
    <button type="submit" [disabled]="loginForm.invalid">Login</button>
  </form>
  ```

### About FormControl

* Create it: use FormControl constructor 

  * First para => initial value

  * Second para => sync validators, like required, min/max/minLenth, can be done right now

  * Third para => async validators, like needing waiting for response from backend;

    ```typescript
    const tempControl = new FormControl("", [], []);
    const tempGroup = new FormGroup({}, [], []);
    const tempArray = new FormArray([], [], []);
    ```

  * Validator array means you can apply more then one validator. If there is only 1 validators, we can use it directly instead of using array;

* Common properties

  * value
  * valueChanges: an observable that emits every time the value changes
  * status: 'VALID', 'INVALID','PENDING'(for async validators) or 'DISABLED'
  * valid/invalid: boolean
  * errors: returns an object (e.g., { required: true }) if invalid or null if valid
  * pristine/dirty: pristing means the user has not changed the value in UI yet
  * untouched/touched: touched means the user has clicked/focused then blurred the input
    * dirty: the user typed something(even if they deleted it after)
    * Touched: the user visited the filed (clicked in and out)
    * combine invalid && touched: 用户只要离开过这个框切没填对就报错
  * reset(): make the value be empty and reset dirty and touched value



### Validators

* How to display validators errors

  ```html
  <p *ngIf=registerForm.get('email')?.hasError('required') && registerForm.get('email')?.touched
     [ngStyle]="{'color': 'red'}">
    The email is required.
  </p>
  ```

  

* How to write a customized sync validator？(by function)

  * The basic structure of a validator

    ```typescript
    import  { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'
    
    // input can also be group: AbstractControl
    function myCustomValidator(control: AbStractControl): ValidationErrors | null {
      const value = control.value;
      if (value === null || value === undefined || value === '') {
        return null;
      }
      const isValid = value > 0 ? true : false;
      
      return isValid ? null: {'shouldBePositive': true}
    }
    ```

  * Creating a factory function with parameter： passing arguments to validator

    ```typescript
    function forbiddenNameValidator(forbiddenName: string): ValidationFn {
      return (control: AbstractControl): ValidationErrors | null => {
        const forbidden = control.value === forbiddenName;
        return forbidden ? {'forbiddenName': { value:control.value }} : null;
      }
    }
    
    // definition
    type ValidationErrors = {
        [key: string]: any;
    };
    ```

    ```html
    <div *ngIf="name?.errors?.['forbiddenName']">
      Sorry! {{ name?.errors?.['forbiddenName'].value }} is a system reserved word; please choose a different one.
    </div>
    ```

  * how about async validator

    ```typescript
    isEmailExist(): AsyncValidatorFn {
    	return (control: AbscractControl): Promise<ValidationErrors | null> | observable<ValidationErrors | null> => {
        const resultObs = of(true).pipe(delay(1000));
        
        resultObs.pipe(
          map(res => {
            if (res) {
              return {'emailExisted': true};
            } else {
              return null;
            }
          })
        ) 
      }
    }
    ```

    Async errors will be displayed only if there is no sync errors

