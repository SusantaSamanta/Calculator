let string = "", equal = 0, after_equal_action = 0, action = 0, equation = 0, result = 0, equal_button_count = 0, result_len = 0;
let display = document.getElementById('input');
let display2 = document.getElementById('input2');


let buttons = document.querySelectorAll('button');

let buttonsArray = Array.from(buttons);

buttonsArray.forEach((btn) => {
  btn.addEventListener('click', (event) => {

    window.scrollTo({     // If any button click smoothly scroll to end part of the page.
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });

    if(event.target.innerHTML == 'AC'){
      location.reload();    // it can reload the page
    }

    else if (event.target.innerHTML == "DE") {
      string = string.substring(0, string.length - 1);
      input_size_adjust(equal, string);
      display2.value = display.value = symbol_changer(string);
      scrollLeft();
    }
    else if (event.target.innerHTML == "=" && equal_button_count == 0) {  // eq_bu_co == 0 that means that equal button click first time then eq_bu_co++ and not match. if click any other button the eq_bu_co = 0 and condition match.   *** this condition restricted multiple click of equal button.
      equation = string;
      string = eval(string);
      result = display.value = '= ' + string;
      result_len = result.length;
      console.log(result_len);
      equal = 1;
      input_size_adjust(equal, result);
      equal_button_count++;
      after_equal_action = 1;
    }
    
    else if (event.target.innerHTML == "+") {
      string = string + '+'
      string = add_0_before_1st_oper(string);
      string = multiple_oper_checker(string);
      display2.value = display.value = symbol_changer(string);
      equal = 0;
      input_size_adjust(equal, string);
      equal_button_count = 0;
      if (after_equal_action == 1) {
        equation_histry(equation);
        result_histry(result);
        after_equal_action = 0;
      }
      scrollLeft();
    }
    else if (event.target.innerHTML == "-") {
      string = string + '-'
      string = add_0_before_1st_oper(string);
      string = multiple_oper_checker(string);
      display2.value = display.value = symbol_changer(string);
      equal = 0;
      input_size_adjust(equal, string);
      equal_button_count = 0;
      if (after_equal_action == 1) {
        equation_histry(equation);
        result_histry(result);
        after_equal_action = 0;
      }
      scrollLeft();
    }
    else if (event.target.innerHTML == "×") {
      string = string + '*';
      string = add_0_before_1st_oper(string);
      string = multiple_oper_checker(string);
      display2.value = display.value = symbol_changer(string);
      equal = 0;
      input_size_adjust(equal, string);
      equal_button_count = 0;
      if (after_equal_action == 1) {
        equation_histry(equation);
        result_histry(result);
        after_equal_action = 0;
      }
      scrollLeft();
    }
    else if (event.target.innerHTML == "÷") {
      string = string + '/';
      string = add_0_before_1st_oper(string);
      string = multiple_oper_checker(string);
      display2.value = display.value = symbol_changer(string);
      equal = 0;
      input_size_adjust(equal, string);
      equal_button_count = 0;
      if (after_equal_action == 1) {
        equation_histry(equation);
        result_histry(result);
        after_equal_action = 0;
      }
      scrollLeft();
    }
    else if (event.target.innerHTML == "%") {
      string = string + '%';
      string = add_0_before_1st_oper(string);
      string = multiple_oper_checker(string);
      display2.value = display.value = symbol_changer(string);
      equal = 0;
      input_size_adjust(equal, string);
      equal_button_count = 0;
      if (after_equal_action == 1) {
        equation_histry(equation);
        result_histry(result);
        after_equal_action = 0;
      }
      scrollLeft();
    }

    else if (event.target.innerHTML == ".") {
      string = string + '.';
      string = add_0_before_1st_oper(string);
      string = multiple_oper_checker(string);
      display2.value = display.value = symbol_changer(string);
      equal = 0;
      input_size_adjust(equal, string);
      equal_button_count = 0;
      if (after_equal_action == 1) {
        equation_histry(equation);
        result_histry(result);
        after_equal_action = 0;
      }
      scrollLeft();
    }

    else if (num_checker(event.target.innerHTML)) {
      if (equal == 1) {   // after equal button press if num button press then previous string clear 
        string = '';
        equal = 0;
        result_len = 0; // afre equal result set  length 0.
      }
      equal_button_count = 0;
      if (after_equal_action == 1) {
        equation_histry(equation);
        result_histry(result);
        after_equal_action = 0;
      }
      string += event.target.innerHTML;
      string = max_num_input_checker(string);
      input_size_adjust(equal, string);
      display2.value = display.value = symbol_changer(string);
      scrollLeft();
    }



    else {
      // console.log(event.target.innerHTML);
    }
  });
});


const symbol_changer = (string) => { // Symbols change to : × ÷
  let a = string, b = '';
  for (i = 0; i < a.length; i++) {
    if (a[i] == '*')
      b += '×';
    else if (a[i] == '/')
      b += '÷';
    else
      b += a[i];
  }
  return b;
}

const oper_checker = (oper) => { // check if operator or not
  let i = oper;
  if (i == '+' || i == '-' || i == '%' || i == '*' || i == '/' || i == '.')
    return true;
  else
    return false;
}
const multiple_oper_checker = (string) => { // if side by side multiple operator present : +++ , -+ then remove it
  let a = string, i;
  let b = string;
  for (i = 0; i < a.length; i++) {
    if (oper_checker(a[i]) && oper_checker(a[i + 1])) {  // if operator present in i and i+1 position then remove operator from i+1 position 
      b = b.substring(0, b.length - 1);
      return b;
    }
  }
  return b; // if not present multiple poer return original string 
}

const add_0_before_1st_oper = (string) => { // +98-5 => 0+98-5, ×5 => 0×5
  let a = string, b = '0', i = 0;
  if (oper_checker(a[0])) {  // if operator present in first position then add 0 before the operator 
    for (i; i < a.length; i++) {
      b += a[i]
    }
    return b;
  }
  else
    return a;
}

const num_checker = (num) => {
  let i = num;
  if (i == '00' || i == '0' || i == '1' || i == '2' || i == '3' || i == '4' || i == '5' || i == '6' || i == '7' || i == '8' || i == '9')
    return false;
  else
    return true;
}


// insert content into result container to save history 

const result_container = document.getElementById('result_container');
let container = document.getElementById('container');


let equation_histry_fun_count = 0;

const equation_histry = (equation) => {
  let equation_div = document.createElement('div');
  equation_div.id = 'input_size2';
  equation_div.textContent = symbol_changer(equation);
  result_container.appendChild(equation_div);
  
  equation_div.scrollLeft = equation_div.scrollWidth;       // scroll left side of the equation 
  
  equation_histry_fun_count++;
  if (equation_histry_fun_count == 5) {           // after 4 append of result_div then container move
    result_container.style.top = '2vh';          // after append  result_div move only 2vh from top. then it extend to bottom   
  }


  window.scrollTo({       // scroll to end 
    top: document.body.scrollHeight
  });
}


let top_value_increment = 38;  // intialy container position 36vw fron top 

let result_histry_fun_count = 0;

const result_histry = (result) => {
  let result_div = document.createElement('div');
  result_div.id = 'input_size2';
  result_div.className = 'input_size2';
  result_div.textContent = result;
  result_container.appendChild(result_div); // append result_div height 4vh 

  result_histry_fun_count++;
  if (result_histry_fun_count > 4) {           // after 4 append of result_div then container move
    top_value_increment = top_value_increment + 9;
    let top_value = top_value_increment;
    container.style.top = top_value + 'vh';       // after append  result_div, container move 38+9vh... from top     
  }

  window.scrollTo({       // after result_div append and container move from top page will auto scroll to end
    top: document.body.scrollHeight
  });
}

const max_num_input_checker = (string) =>{
  let b = a = string, i = result_len-1;       // result_len is the length of the result after equal. 
  for(i; i<string.length; i++){
    if( num_checker(a[i]) && 
        num_checker(a[i+1]) && 
        num_checker(a[i+2]) && 
        num_checker(a[i+3]) && 
        num_checker(a[i+4]) && 
        num_checker(a[i+5]) && 
        num_checker(a[i+6]) && 
        num_checker(a[i+7]) && 
        num_checker(a[i+8]) && 
        num_checker(a[i+9]) ){
      a = a.substring(0, a.length-1);
      return a;
    }
  }
  //console.log('hello')
  return b;
}



const input_size_adjust = (equal, string) => {
  if(equal == 0 && string.length > 13){
    input.style.fontSize = '8vw';
  }
  else if(equal == 0 && string.length < 13){
    input.style.fontSize = '12vw';
  }
  else if(equal == 1 && string.length > 13){
    input.style.fontSize = '8vw';
  }
  else if(equal == 1 && string.length < 13){
    input.style.fontSize = '12vw';
  }
}
//console.log()



const scrollLeft = () => {
  display.scrollLeft = display.scrollWidth;
  display2.scrollLeft = display2.scrollWidth;
}


window.onload = function () {
  window.scrollTo(0, document.body.scrollHeight); // Scroll to the bottom when the page loads
};



// window.scrollTo({
//     top: document.body.scrollHeight,
//     behavior: 'smooth'
//   });





//   document.addEventListener('DOMContentLoaded',(event) => {
//   let string = "";
//   let buttons = document.querySelectorAll('.button');
//   Array.from(buttons).forEach((button) => {
//     button.addEventListener('click', (e) => {
//       console.log(e.target)
//     })
//   })
// })
//   console.log("hello")

