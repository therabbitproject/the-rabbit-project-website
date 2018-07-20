// The stack.
var stack = [];

// Initialize the calculator.
function init() {
    var entryText = document.getElementById('entry');
    entryText.value = '';
    stack = [];
    show_stack();
    entryText.focus();
}

// Push entry on to stack.
function pushButton() {
    var entryText = document.getElementById('entry');
    if (entryText.value != '') {
        push(entryText.value);
        entryText.value = '';
        show_stack();
    }
    entryText.focus();
}

// Pop stack.
function popButton() {
    pop();
    show_stack();
    var entryText = document.getElementById('entry');
    entryText.focus();
}

// Do a single calculation.
function calc_one() {
    var reverse_stack = [];
    var did_calc = false;
    var n = pop();
    while (n != undefined) {
      if (!did_calc) {
        if (n == '+' || n == '-' || n == '*' || n == 'x' || n == '/') {
          if (got_two_numbers()) {
            switch(n) {
              case '+':
                   n = pop() + pop();
                   break;
              case '-':
                   n = pop() - pop();
                   break;
              case '*':
              case 'x':
                   n = pop() * pop();
                   break;
              case '/':
                   n = pop() / pop();
                   break;
            }
            did_calc = true;
          }
        }
      }
      reverse_stack.push(n);
      n = pop();
    }
    reverse_stack.reverse();
    stack = reverse_stack;
    show_stack();
    var entryText = document.getElementById('entry');
    entryText.focus();
}

// Push stack.
function push(n) {
  if (n == '+' || n == '-' || n == '*' || n == 'x' || n == '/') {
    stack.push(n);
  } else if (isnumber(n)) {
    stack.push(parseFloat(n));
  } else {
    alert("Can't push " + n + "!");
  }
}

// Pop stack.
function pop() {
   return stack.pop();
}

// Got two numbers on top of stack?
function got_two_numbers() {
  var len = stack.length;
   if (len >= 2 && isnumber(stack[len-1]) && isnumber(stack[len-2])) {
     return true;
   } else {
     return false;
   }
}

// Show stack.
function show_stack() {
    var s = "";
    var len = stack.length;
    for (var i = 0; i < len; i++) {
        s = stack[i] + '\n' + s;
    }
    var stackText = document.getElementById('stack');
    stackText.value = s;
}

// Is a number?
function isnumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

// Start up.
if ('addEventListener' in window) {
    window.addEventListener('load', init);
} else {
    window.attachEvent('onload', init);
}
