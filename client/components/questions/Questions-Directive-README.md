### The &lt;questions> Directive

The Questions directive is a way to ensure uniform presentation of questions to the user. It also allows makes it easy to update and change formatting uniformly across the application as well.

From the html template where this directive is needed, it can be implemented as such:

```html
<questions queries="queries" plan="plan"></questions>
```

<code>queries</code> is a collection of question objects, in this case (from plan-builder states) this refers to <code>$scope.queries</code> from the respective states' controller.

<code>queries</code> is what the variables within the directive and sub-directives will be bound to. In this case, <code>questions</code> will have input that is bound to <code>$scope.plan</code>.


### Question Objects

A question object has several properties detailed below:
* <code>title</code> - always required, string, 1-3 words for the link/accordion header title.
<br><br>
* <code>question</code> - always required (unless type is <code>multi</code>), string, text to display to the user to retrieve needed info.
<br><br>
* <code>bind</code> always required (unless type is <code>multi</code>), string, defines what variable of the plan object the input should bind to.
<br><br>
* <code>type</code> - always required, string, determine type of question slide to show. There are several different slide types:
  - <code>"select"</code> - dropdown menu, must provide <code>options</code>
  - <code>"checkbox"</code> - list of checkboxes, must provide <code>options</code>
  - <code>"radio"</code> - list of radio options, must provide <code>options</code>
  - <code>"button"</code> - list of buttons, must provide <code>options</code>
  - <code>"table"</code> - table-stype input, must provide <code>fields</code>
  - <code>"multi"</code> - for slides that contain more than one question, must provide 
  - <code>"prescreen"</code> - for prescreening questions (Ex: "Do you have any debts or liabilities?" If so, display something relevant), must provide <code>subqueries</code>
  - <code>"review"</code> - this is intended to be the final slide in the section. This should display a nice representation of the data the user has entered (eg. their Net Worth Statement, or their Risk Analysis). Must provide an html <code>template</code> for this display.
  - or any basic HTML5 input: <code>"text"</code>, <code>"date"</code>, <code>"month"</code>, <code>"color"</code>, <code>"datetime"</code>, <code>"datetime-local"</code>, <code>"email"</code>, <code>"number"</code>, <code>"range"</code>, <code>"search"</code>, <code>"tel"</code>, <code>"time"</code>, <code>"url"</code>, <code>"week"</code> will all display a simgle input of that type.
<br><br>
* <code>options</code> - required if type is select, checkbox, radio, or button. Must be an array of strings that will be assigned as each input's label and value. For example: <code>['Option 1','Option 2','Option 3']</code>.
<br><br>
* <code>fields</code> - required if type is table. Must be an array of objects, each representing one column of the table with three properties:
  - <code>label</code> - required, string
  - <code>type</code> - required, string
  - <code>textAlign</code> - required, string
  - Example:<br><code>fields: [</code><br><code>  { title: 'Column 1', type: 'string', textAlign:'left' },</code><br><code>  { title: 'Column 2', type: 'number', textAlign: 'right' }</code><br><code>]</code>
<br><br>
* <code>subqueries</code> - required if type is multi or prescreen. Must be an array of question objects
  - If multi, these will be displayed within the question slide.
  - If prescreen, then this/these will be displayed if the user selects the 'true' value in the prescreen slide.
  - Example:<br><code>subqueries: [</code><br><code>  { question:'What is your first name?', type:'text', bind:'firstname' },</code><br><code>  { question:'What is your last name?', type:'text', bind:'lastname' },</code><br><code>  { question:'When were you born?', type:'date', bind:'birthdate' }</code><br><code>]</code>
<br><br>
* <code>template</code> - required if final/review slide, HTML template, to display snapshot of what the user entered in current section. You may use {{plan.[SOME_PROPERTY]}} in this template.
