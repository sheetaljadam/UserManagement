import {Injectable  } from '@angular/core'
import { FormGroup, FormControl } from '@angular/forms';

@Injectable()

export class ValidationService
{
  //Email validation
	validateEmail(c: FormControl){
    let EMAIL_REGEXP = /^([\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+\.)*[\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+@((((([a-z0-9]{1}[a-z0-9\-]{0,62}[a-z0-9]{1})|[a-z])\.)+[a-z]{2,6})|(\d{1,3}\.){3}\d{1,3}(\:\d{1,5})?)$/i;
  return EMAIL_REGEXP.test(c.value) ? null : {
    validateEmail: {
        valid: false
      }
    };
  }
}
	
