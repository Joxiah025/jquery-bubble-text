$(document).ready(function() {

    var $element = $('#bubble');

    var index = -1;
    var phrases = [
        'This is how bubbleText works.',
        'Animating each letter in a friendly way',
        'Thanks for seeing it :)',
        'It really matters to me ...',
        'Regards,',
        'Guedes, Washington L.',
    ];


    (function loopAnimation() {
        index = (index + 1) % phrases.length;

        bubbleText({
            element: $element,
            newText: phrases[index],
            letterSpeed: 70,
            callback: function() {
                setTimeout(loopAnimation, 1000)
            },
            proportional: true,
        });

    })();


});
