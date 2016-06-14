/*bubbleHTML({
	element: $element,        -- mandatory, must be one DOM leaf node
	newText: 'new Text',      -- mandatory, must be one string
	speed: 5000,              -- optional, default: 2000
	callback: function(){}    -- optional
});*/

var bubbleHTML = function(o) {
    var $$, __, animate;

    if (!o | typeof o != 'object' | o.map == [].map) {
        throw 'bubbleHTML() expects an object as argument';
        return;
    }

    if (!(__ = ($$ = $(o.element))[0]) || $$.find(':first').length) {
        throw 'bubbleHTML() expects one DOM leaf in the property "element".';
        return;
    }

    if (typeof o.newText != 'string') {
        throw 'bubbleHTML() expects one string in the property "newText".';
        return;
    }

    // height for all spans
    var height = $$.css('height');

    // store properties from each old letter
    var oldTable = [];
    __.innerHTML = __.innerHTML.replace(/./g, function(x, i) {
        oldTable.push({
            char: x,
            index: i
        });
        return '<span data-bubblehtml="old' + i + '" style="min-width:10px">' + x + '</span>';
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

        return '<span data-bubblehtml="new">' + x + '</span>';
    }) + __.innerHTML;

    // mark old spans to be removed
    for (var i = 0, l = oldTable.length; i < l; i++) {
        $$.find('[data-bubblehtml="old' + oldTable[i].index + '"]').attr('data-bubblehtml-action', 'remove');
    }

    // force spans to be aligned as normal text
    var spans = $$.find('span').each(function() {
        $(this).css({ position: 'relative', display: 'inline-block', height: height, overflow: 'hidden' });

        // store new letters width and prepare them to animate
        if ($(this).data('bubblehtml') == 'new') {
            $(this).attr('data-bubblehtml', $(this).width() || 10);
            $(this).css({ width: 0 });
        }
    });

    // speed for each animation's step
    var totalAnimations = spans.length;
    var speed = (o.speed || 2000) / totalAnimations;

    // Rule when it should add (false||0) or remove (true||1) letters
    var turn = 1,
        animationsDone = 0;

    // start animations
    (animate = function(newTableIndex) {
        var element = spans.eq(newTableIndex);

        if (animationsDone == totalAnimations) {
            spans.each(function() {
                $(this).replaceWith(this.innerHTML);
            });
            o.callback instanceof Function && o.callback();
            return;
        }

        // function to trigger next animation
        var nextAnimation = function() {
            animationsDone++;
            animate(newTableIndex + turn);
        };

        // if it is time to remove
        if (turn) {
            turn = 0;
            var span = $$.find('[data-bubblehtml-action="remove"]:last');
            if (span.length) {
                span.animate({ width: 0 }, speed, function() {
                    $(this).remove();
                    nextAnimation();
                });
            } else {
                animationsDone--;
                nextAnimation();
            }
        }

        // if it is time to add letter
        else {
            turn = 1;
            var properties = newTable[newTableIndex];
            var width = +element.attr('data-bubblehtml');

            if (width) {
                element.animate({ width: width }, speed, nextAnimation);

                if (~properties.old) {
                    var span = $$.find('[data-bubblehtml=old' + properties.old + ']');
                    if (span.length) {
                        span.animate({ width: 0 }, speed, function() {
                            span.remove();
                        });
                    }
                }

            } else element.animate({ width: 0 }, speed, function() {
                element.remove();
                nextAnimation();
            });
        }

    })(0);

};

var $titulo = $('.titulo');
bubbleHTML({ element: $titulo, newText: 'Washington Luís Guedes', speed: 5000, callback: function() { console.log('bubbleHTML') } });
