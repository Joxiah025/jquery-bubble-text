# jquery-bubble-text

This plugin introduces one animated way of changing text.

Below you can see use cases:

1. Fading letters. [(Example)](https://jsfiddle.net/5c5bkkgu/1/)
2. Looping phrases. [(Example)](https://jsfiddle.net/amf6ktpy/8/)

<sup>Thanks [_jsfiddle.net_](https://jsfiddle.net/)</sup>

---

### Syntax

    bubbleText({                // mandatory:
        element: $element,      //   must be one DOM leaf node
        newText: 'new Text',    //   must be one string
                                // optional:
        speed: 3000,            //   default: 2000
        letterSpeed: 70,        //   when declared has priority over "speed"
        callback: function(){}, //   an asynchronous task to do on finish
        proportional: true,     //   default: false, when true: additions and remotion will end together (#4)
    });

---

Thanks for visiting,

Guedes, Washington L.
