/*bubbleText({
    element: $element,        -- mandatory, must be one DOM leaf node
    newText: 'new Text',      -- mandatory, must be one string
    speed: 5000,              -- optional, default: 2000
    callback: function(){}    -- optional
});*/

var bubbleText = function(o) {
    var $$, __, bubble;

    if (!o | typeof o != 'object' | o.map == [].map) {
        throw 'bubbleText() expects an object as argument';
        return;
    }

    if (!(__ = ($$ = $(o.element))[0]) || $$.find(':first').length) {
        throw 'bubbleText() expects one DOM leaf in the property "element".';
        return;
    }

    if (typeof o.newText != 'string') {
        throw 'bubbleText() expects one string in the property "newText".';
        return;
    }

    // height for all spans
    var height = $$.css('height');

    // space's width
    var span = $('<span data-bubbletext>w w</span>').prependTo($$);
    var spaceWidth = span.width();
    span.html('w');
    spaceWidth -= 2 * span.width();
    span.remove();

    // store properties from each old letter
    var oldTable = [];
    __.innerHTML = __.innerHTML.replace(/./g, function(x, i) {
        oldTable.push({
            char: x,
            index: i
        });
        var style = x == ' ' ? ' style="width:' + spaceWidth + 'px"' : '';
        return '<span data-bubbletext="old' + i + '"' + style + '>' + x + '</span>';
    });

    // store properties from each new letter
    var newTable = [];
    __.innerHTML = o.newText.replace(/./g, function(x, i) {

        // index of this letter in the old text
        var oldIndex = -1;
        for (var i = 0, l = oldTable.length; i < l; i++) {
            if (oldTable[i].char == x) {
                oldIndex = oldTable[i].index;
                oldTable.splice(i, 1);
                break;
            }
        }

        // fill this letter's data
        newTable.push({
            char: x,
            index: i,
            old: oldIndex
        });

        return '<span data-bubbletext="new">' + x + '</span>';
    }) + __.innerHTML;

    // force spans to be aligned as normal text
    var spans = $$.find('span').each(function() {
        $(this).css({ position: 'relative', display: 'inline-block', height: height, overflow: 'hidden' });

        // store new letters width and prepare them to animate
        if ($(this).data('bubbletext') == 'new') {
            $(this).attr('data-bubbletext', $(this).width() || spaceWidth);
            $(this).width(0);
        }
    });

    // mark old spans to be removed
    for (var i = 0, l = oldTable.length; i < l; i++) {
        $$.find('[data-bubbletext=old' + oldTable[i].index + ']:first').attr('data-bubbletext-action', 'remove');
    }

    // speed for each animation's step
    var speed = (o.speed || 2000) / (oldTable.length + newTable.length);

    // Rule when it should add (false||0) or remove (true||1) letters
    var timeToRemove = 1,
        additionsDone = 0,
        remotionsDone = 0;

    var spansToRemove = $$.find('[data-bubbletext-action=remove]'),
        remotionIndex = 0;

    // start animations
    (bubble = function(spanIndex) {
        if (additionsDone && remotionsDone) {
            __.innerHTML = o.newText;
            o.callback instanceof Function && o.callback();
            return;
        }

        // function to trigger next animation
        var nextAnimation = function() {
            add = timeToRemove + remotionsDone;
            if (remotionsDone == 2) {
                remotionsDone = 1;
                add -= 2;
            }
            bubble(spanIndex + add);
        };

        // if it is time to remove
        if (timeToRemove) {
            if (!additionsDone) {
                timeToRemove = 0;
            }

            if (remotionIndex == spansToRemove.length) {
                remotionsDone = 2;
                nextAnimation();
                return;
            }

            var span = $(spansToRemove[remotionIndex++]);
            span.animate({ width: 0 }, speed, nextAnimation);
        }

        // else, time to show letter
        else {
            if (!remotionsDone) {
                timeToRemove = 1;
            }

            var element = spans.eq(spanIndex);
            var width = +element.attr('data-bubbletext');

            if (width) {
                var properties = newTable[spanIndex];

                // if there is one correspondent span from oldText
                if (~properties.old) {
                    var span = $$.find('[data-bubbletext=old' + properties.old + ']:first');
                    span.animate({ width: 0 }, speed);
                }
                element.animate({ width: width }, speed, nextAnimation);

            } else {
                additionsDone = 1;
                nextAnimation();
            }
        }

    })(0);

};
