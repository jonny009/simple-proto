simple-proto
============

A simple jQuery-based prototyping framework for plug and play templates.

## Example HTML:
```html
<div data-example-app="test">
    <div data-example-template="test"></div>
    <div data-example-template="test2"></div>
    <div data-example-template="test3"></div>
    <div data-example-template="test4"></div>
</div>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script src="simple-proto.js"></script>
<script>
    var EX = $.createPrototype({
            prefix:'example',
            templateRoot: 'templates/',
            scriptRoot: 'scripts/'
        }),
        EXReport = EX.report(); // Report the details of the prototype
    EX.build(); // Populate the templates and load the controller script
    console.log(EXReport);
</script>
```
