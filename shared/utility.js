//fnComponentToMakeCodeLeant
export const updateObject = (oldObejct, updatedProperties)=>{
    return{
        ...oldObejct,
        ...updatedProperties
    };
};

    //fnCheckIfValidationObserved... tretedAsMethodNotFn
  export const  checkValidity = (value, rules) => {
        let isValid=true; 
    if(!rules){
        return true;
    }
    if (rules.required){
    isValid=value.trim() !=='' && isValid;
    }
    if(rules.minLength){
        isValid=value.length >= rules.minLength && isValid;
    }
    if(rules.maxLenth){
        isValid=value.length <=rules.maxLenth && isValid;
    }
    if(rules.isEmail){
        const pattern= /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid= pattern.test(value) && isValid
    }
    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
    }
    return isValid;
    }