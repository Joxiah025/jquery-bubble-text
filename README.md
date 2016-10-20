# jquery-bubble-text

This plugin introduces one animated way of changing text.

Below you can see use cases:

1. Fading letters. [(Example)](https://jsfiddle.net/tkppkaek/)
2. Looping phrases. [(Example)](https://jsfiddle.net/ncs3uagj/)

<sup>Thanks [_jsfiddle.net_](https://jsfiddle.net/)</sup>

---

### Syntax

```JavaScript
    bubbleText({                   // mandatory:
        element: $element,         //   must be one DOM leaf node
        newText: 'new Text',       //   must be one string
                                   // optional:
        speed: 3000,               //   default: 2000
        letterSpeed: 70,           //   when declared has priority over "speed"
        callback: function(){},    //   an asynchronous task to do on finish
        proportional: false,       //   default: true, when false: turns of 1 addition and 1 remotion
        repeat: Infinity,          //   default: 0, should restart? How many times?
        timeBetweenRepeat: 2000,   //   default: 1500
    });
```

Thanks for visiting,

Guedes, Washington L.
