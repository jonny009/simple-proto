simple-proto
============

A simple jQuery-based prototyping framework for plug and play templates.

Example HTML:
-------------
<div data-jm-app="test">

    <div class="mainContainer" data-jm-template="templates/test.html"></div>
    
    <div class="mainContainer2" data-jm-template="templates/test2.html"></div>
    
    <div class="mainContainer3" data-jm-template="templates/test3.html"></div>
    
    <div class="mainContainer4" data-jm-template="templates/test4.html"></div>
    
</div>

<script src="scripts/jquery-1.11.0.min.js"></script>

<script src="scripts/jm-proto.js"></script>

<script>

    var JM = $.createPrototype('jm');
    
        JM.build();
        
        console.log(JM.report());
        
</script>
