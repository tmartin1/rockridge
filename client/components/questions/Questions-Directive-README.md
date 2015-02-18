### The &lt;questions> Directive

The Questions directive is a way to ensure uniform presentation of questions to the user. It also allows makes it easy to update and change formatting uniformly across the application as well.



### Question Obejects

A question object definition has several properties:

''''
var question = {
  title: required, string, 1-3 words for the link/accordion header title,
  question: required, string, text to display to the user to retreive needed info,
  type: required, string, determine type of input to show: select, checkbox, radio, button, table, multi, prescreen, review, or basic HTML5 input (text, date, month, etc.)
  bind: required, string, defines what variable of the plan object the input should bind to,
  options: required if select, check, radio, buttons, array of strings for option labels (will also be their value),
  fields: required if table, array of objects each with four arguments: { column label (string), input type (string), textAlign (sting) },
  next: not required, function, return index of next question, if undefined, then the next question in the array will be displayed,
  template: required IFF final/review slide, HTML template, to display snapshot of what the user entered in current section
}

''''

Below are a few examples of different implementations of this:




...
