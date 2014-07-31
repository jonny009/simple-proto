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
<script src="scripts/jquery-1.11.0.min.js"></script>
<script src="scripts/simple-proto.js"></script>
<script>
    var EX = $.createPrototype('example');
        EX.build();
        // Report the details of the prototype
        console.log(EX.report());
</script>
```
