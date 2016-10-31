(window || this).bubbleText = function(o) {

    // check if is an object
    if (o !== Object(o) || o.map === [].map) {
        throw 'bubbleText: Missing properties';
        return;
    }

    // get element
    var $element = $(o.element);
    var dom = $element[0];

    // check if has element
    if (!dom) {
        throw 'bubbleText: Missing element';
        return;
    }

    // check if is valid element
    var hasChild = $element.find(':first').length;
    if (hasChild) {
        throw 'bubbleText: Element must be one leaf node';
        return;
    }

    // check if has newText
    var newText = o.newText;
    if (typeof newText !== 'string') {
        throw 'bubbleText: Missing newText';
        return;
    }

    // empty $element and calc spaceWidth
    var oldText = dom.innerHTML;
    var spanCSS = {
        position: 'relative',
        float: 'left',
        overflow: 'hidden',
    };
    var spaceWidth = $('<span>. .</span>').appendTo($element).css(spanCSS);
    spaceWidth = spaceWidth.width() - spaceWidth.html('.').width() * 2;
    dom.innerHTML = '';

    // map spans
    function mapString(string) {
        var array = [];
        for (var i = 0, l = string.length; i < l; i++) {
            var char = string.charAt(i);
            array[i] = {
                char: char,
                html: $('<span class="span-bubble-text">' + char + '</span>')
                    .appendTo($element),
            };
            if (char === ' ') {
                array[i].html.width(spaceWidth);
            }
        }
        return array;
    };
    var newSpans = mapString(newText);
    var oldSpans = mapString(oldText);

    // preload the order of all animations
    var animations = [];
    while (newSpans.length) {
        var add = newSpans.shift();
        var step = {
            add: add,
            width: add.html.width() + 'px',
        };
        add.html.width(0);
        var char = add.char;
        for (var i = 0, l = oldSpans.length; i < l; i++) {
            if (char === oldSpans[i].char) {
                step.remove = oldSpans.splice(i, 1)[0];
                break;
            }
        };
        animations.push(step);
    };
    var indexRemotion = 0;
    o.hasOwnProperty('proportional') || (o.proportional = true);
    if (o.proportional) {
        var xRemotions = oldSpans.length;
        var yAdditions = animations.length;
        if (xRemotions > yAdditions) {
            xRemotions = Math.ceil(xRemotions / yAdditions);
            yAdditions = 1;
        } else {
            yAdditions = Math.ceil(yAdditions / xRemotions);
            xRemotions = 1;
        }
        while (oldSpans.length) {
            if (indexRemotion < animations.length) {
                var remotionsStep = oldSpans.splice(0, xRemotions);
                while (remotionsStep.length) {
                    animations.splice(indexRemotion, 0, {
                        remove: remotionsStep.shift(),
                    });
                    indexRemotion++;
                }
                indexRemotion += yAdditions;
            } else {
                animations.push({
                    remove: oldSpans.shift(),
                });
            }
        };
    } else {
        while (oldSpans.length) {
            var step = {
                remove: oldSpans.shift(),
            };
            if (indexRemotion < animations.length) {
                animations.splice(indexRemotion, 0, step);
                indexRemotion += 2;
            } else {
                animations.push(step);
            }
        };
    }

    // force spans to be aligned as normal text
    var spans = $element.find('span');
    var lineHeight = $element.css('line-height');
    spanCSS.height = /\d/.test(lineHeight) ? lineHeight : ($(spans[0]).height() + 'px');
    spans.css(spanCSS);

    // animation global properties
    var letterSpeed = parseInt(o.letterSpeed) || Math.floor((o.speed || 2000) / animations.length);
    var boundaries = [' ', '.', ',', '-'];
    var breakLine = '<br clear="all">';

    // start animations
    (function bubble(position) {
        var step = animations[position];

        // if animations ended
        if (!step) {
            dom.innerHTML = newText;
            if (typeof o.callback === 'function') {
                o.callback();
            }
            if (o.repeat--) {
                setTimeout(function() {
                    dom.innerHTML = oldText;
                    bubbleText(o);
                }, o.timeBetweenRepeat || 1500);
            }
            return;
        }

        // animation properties
        var nextAnimation = function() { bubble(position + 1); };
        var objAnimate = {
            duration: letterSpeed,
            complete: nextAnimation,
            easing: 'linear',
        };

        // animate span letter in
        if (step.add) {
            var $span = step.add.html;
            objAnimate.complete = function() {
                var isSpace = $span.html() === ' ';
                if (!isSpace) {
                    $span.css('width', 'auto');
                }
                var prev = $span.prev('span');
                if (prev.length) {
                    var isNewLine = prev.offset().top !== $span.offset().top;

                    // (TODO: MORE TESTS)
                    if (isNewLine) {
                        if (isSpace) {
                            $span.replaceWith(breakLine);

                        } else {

                            // find the previous boundary
                            while (boundaries.indexOf(prev.html()) === -1) {
                                prev = prev.prev('span');
                                if (prev.length === 0) {
                                    break;
                                }
                            }
                            prev.after(breakLine);
                        }
                    }
                }
                nextAnimation();
            };
            $span.animate({
                width: step.width,
            }, objAnimate);
        }

        // animate span letter out
        if (step.remove) {
            step.remove.html.animate({
                width: 0,
            }, step.add ? {
                duration: letterSpeed,
                easing: 'linear',
            } : objAnimate);
        }
    })(0);

};
