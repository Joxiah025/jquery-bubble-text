# jquery-bubble-text
This plugin introduces one animated way of changing text.

- [Getting started](#getting-started)
- [Examples](#examples)

# Getting started

### Mandatory properties

There are two properties you must supply, so it can work:

```JavaScript
var properties = {
    element: $element,
    newText: 'new Text',
};
bubbleText(properties);
```

The `element` property is the DOM node in which the animation will occur and must be a leaf one (without children) because the `bubbleText` function will manage spans inside it in the animation phase.

The `newText` property must be a string, any other data type will throw an error in the console.


### Optional properties

The animation has a default speed (from start till end) of 2000 miliseconds, but you can change it:

```JavaScript
properties.speed = 3500;  // 3.5 seconds
```

If you want your animation take a long run for long text and take a short run for short text, you can instead set the speed for each span move with `letterSpeed`. When this property is supplied the previous `speed` property is simply ignored.

```JavaScript
properties.letterSpeed = 70;  // miliseconds
```

You can execute a function after the animation is finished with a `callback` property:

```JavaScript
properties.callback = function() {
    console.log('finished');
};
```

The animation is proportional by default, if the initial text is `"abcd"` and the new text is `"ef"`, the `bubbleText` function will: 

1. remove `"a"`, 
2. remove `"b"`, 
3. add `"e"`, 
4. remove `"c"`, 
5. remove `"d"`, 
6. add `"f"`. 

But some may prefer steps of 1 remotion and 1 addition independent of the total number of additions and remotions, for that purpose you can set the `proportional` property to `false`:

```JavaScript
properties.proportional = false;
```

There is also a `repeat` property which expects a `number`. This property says how many times the animation should restart, by default it is 0. So if you set it to `2` the animation will occur three times.

```JavaScript
properties.repeat = 2;
```

Since `Infinity - 1 == Infinity`, you can do an endless animation with:

```JavaScript
properties.repeat = Infinity;
```

The above `repeat` property has a default delay of 1.5 seconds before restarting, but you can change it:

```JavaScript
properties.timeBetweenRepeat = 3000;  // 3 seconds
```

That's it !! Thanks for your interest :) .. below you can see working snippets.

# Examples

1. Fading letters. [(Example)](https://jsfiddle.net/tkppkaek/)
2. Looping phrases. [(Example)](https://jsfiddle.net/ncs3uagj/)

<sup>Thanks [_jsfiddle.net_](https://jsfiddle.net/)</sup>

