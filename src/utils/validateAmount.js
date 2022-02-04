export const isAmountValid = (amountToValidate) => {

  const amount = Number(amountToValidate);
  const errorObject = {
    valid: null,
    msg: ""
  }

  if(amount <= 0) {
    errorObject.valid = false;
    errorObject.msg = 'Amount cannot be lower or equal to zero';
    return errorObject;
  } else if(amount > 0.1) {
    errorObject.valid = false;
    errorObject.msg = 'Maximum investment is 0.1 ETH';
    return errorObject;
  } else {
    errorObject.valid = true;
    errorObject.msg = '';
    return errorObject;
  }
}