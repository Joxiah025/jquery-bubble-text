# jquery-bubble-text

This plugin introduces one animated way of changing text.

Below you can see use cases:

1. Fading letters. [(Example)](https://jsfiddle.net/5c5bkkgu/1/)
2. Looping phrases. [(Example)](https://jsfiddle.net/amf6ktpy/7/)

<sup>Thanks [_jsfiddle.net_](https://jsfiddle.net/)</sup>

---

### Syntax

    bubbleText({
        element: $element,        // mandatory, must be one DOM leaf node
        newText: 'new Text',      // mandatory, must be one string
        speed: 3000,              // optional, default: 2000
        letterSpeed: 70,          // optional, when declared has priority over "speed"
        callback: function(){},   // optional, an asynchronous task to do on finish
        proportional: true,       // optional, default: false, issue enhancement #4
    });

---

Thanks for visiting,

Guedes, Washington L.
