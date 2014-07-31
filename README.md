simple-proto
============

A simple jQuery-based prototyping framework for plug and play templates.

## Example HTML:
```html
<div data-example-app="test">
    <div data-example-template="templates/test.html"></div>
    <div data-example-template="templates/test2.html"></div>
    <div data-example-template="templates/test3.html"></div>
    <div data-example-template="templates/test4.html"></div>
</div>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script src="simple-proto.js"></script>
<script>
    var EX = $.createPrototype('example'),
        EXReport = EX.report(); // Report the details of the prototype
        EX.build(); // Populate the templates and load the controller script
        console.log(EXReport);
</script>
```
