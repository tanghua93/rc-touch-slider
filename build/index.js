'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var ReactDOM = _interopDefault(require('react-dom'));

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var classnames = createCommonjsModule(function (module) {
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg) && arg.length) {
				var inner = classNames.apply(null, arg);
				if (inner) {
					classes.push(inner);
				}
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if ( module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else {
		window.classNames = classNames;
	}
}());
});

var Touchable = function (props) {
    var pressDelay = props.pressDelay, tapDelay = props.tapDelay, onPress = props.onPress, preventDefault = props.preventDefault, stopPropagation = props.stopPropagation, moveThreshold = props.moveThreshold, Component = props.component, children = props.children;
    var touchTimeout = null;
    var pressTimeout = null;
    var swipeTimeout = null;
    var tapTimeout = null;
    var _a = React.useState(null), startTouch = _a[0], setStartTouch = _a[1];
    var _b = React.useState(null), endTouch = _b[0], setEndTouch = _b[1];
    var _c = React.useState({ x1: 0, y1: 0, x2: 0, y2: 0, last: 0, isDoubleTap: false }), touch = _c[0], setTouch = _c[1];
    var _d = React.useState({ deltaX: 0, deltaY: 0 }), delta = _d[0], setDelta = _d[1];
    var resetTouch = function () {
        setStartTouch(null);
        setEndTouch(null);
        setTouch({ x1: 0, y1: 0, x2: 0, y2: 0, last: 0, isDoubleTap: false });
        setDelta({ deltaX: 0, deltaY: 0 });
    };
    var handlePress = function () {
        pressTimeout = null;
        if (touch.last) {
            onPress && onPress();
            resetTouch();
        }
    };
    var processEvent = function (e) {
        preventDefault && e.preventDefault();
        stopPropagation && e.stopPropagation();
    };
    var handleTouchStart = function (e) {
        // console.log('handle touchstart');
        processEvent(e);
        if (!e.touches) {
            return;
        }
        var startTouch = e.touches[0];
        if (e.touches.length === 1 && touch.x2) {
            // Clear out touch movement data if we have it sticking around
            // This can occur if touchcancel doesn't fire due to preventDefault, etc.
            touch.x2 = undefined;
            touch.y2 = undefined;
        }
        var now = Date.now();
        var delta = now - (touch.last || now);
        touchTimeout && clearTimeout(touchTimeout);
        touch.x1 = startTouch.pageX;
        touch.y1 = startTouch.pageY;
        if (delta > 0 && delta <= tapDelay) {
            touch.isDoubleTap = true;
        }
        touch.last = now;
        pressTimeout = setTimeout(handlePress, pressDelay);
    };
    var handleTouchMove = function (e) {
        processEvent(e);
        var endTouch = e.touches[0];
        var deltaX = delta.deltaX, deltaY = delta.deltaY;
        cancelPress();
        touch.x2 = endTouch.pageX;
        touch.y2 = endTouch.pageY;
        deltaX += Math.abs(touch.x1 - touch.x2);
        deltaY += Math.abs(touch.y1 - touch.y2);
        setEndTouch(endTouch);
        setTouch(__assign(__assign({}, touch), { x2: touch.x2, y2: touch.y2 }));
        setDelta({
            deltaY: deltaY,
            deltaX: deltaX
        });
    };
    var handleTouchEnd = function (e) {
        processEvent(e);
        cancelPress();
        var deltaX = delta.deltaX, deltaY = delta.deltaY;
        var event = {
            touch: touch,
            startTouch: startTouch,
            endTouch: endTouch,
            preventDefault: function () {
            },
        };
        if ((touch.x2 && Math.abs(touch.x1 - touch.x2) > moveThreshold) ||
            (touch.y2 && Math.abs(touch.y1 - touch.y2) > moveThreshold)) {
            event.type = 'swipe';
            swipeTimeout = setTimeout(function () {
                handleEvent(event);
                event.type += _getSwipeDirection();
                handleEvent(event);
                resetTouch();
            }, 0);
        }
        else if ('last' in touch) {
            if (deltaX < moveThreshold && deltaY < moveThreshold) {
                tapTimeout = setTimeout(function () {
                    event.type = 'tap';
                    handleEvent(event);
                    if (touch.isDoubleTap) {
                        event.type = 'doubleTap';
                        handleEvent(event);
                        resetTouch();
                    }
                    else {
                        touchTimeout = setTimeout(function () {
                            touchTimeout = null;
                            event.type = 'singleTap';
                            handleEvent(event);
                            resetTouch();
                        }, tapDelay);
                    }
                }, 0);
            }
            else {
                resetTouch();
            }
        }
    };
    var handleTouchCancel = function () {
        cancelAll();
    };
    var cancelPress = function () {
        if (pressTimeout) {
            clearTimeout(pressTimeout);
        }
        pressTimeout = null;
    };
    var cancelAll = function () {
        if (touchTimeout) {
            clearTimeout(touchTimeout);
        }
        if (tapTimeout) {
            clearTimeout(tapTimeout);
        }
        if (swipeTimeout) {
            clearTimeout(swipeTimeout);
        }
        if (pressTimeout) {
            clearTimeout(pressTimeout);
        }
        touchTimeout = tapTimeout = swipeTimeout =
            pressTimeout = null;
        resetTouch();
    };
    var _getSwipeDirection = function () {
        var x1 = touch.x1, x2 = touch.x2, y1 = touch.y1, y2 = touch.y2;
        // 水平方向：水平距离大于等于垂直距离
        // 垂直方向：
        return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ?
            (x1 - x2 > 0 ? 'Left' : 'Right') :
            (y1 - y2 > 0 ? 'Up' : 'Down');
    };
    var getEventMethodName = function (type) {
        return 'on' + type.charAt(0).toUpperCase() + type.slice(1);
    };
    var handleEvent = function (event) {
        var method = getEventMethodName(event.type);
        props[method] && props[method](event);
    };
    var getTouchHandlers = function () {
        return {
            onTouchStart: handleTouchStart,
            onTouchEnd: handleTouchEnd,
            onTouchCancel: handleTouchCancel,
            onTouchMove: handleTouchMove,
        };
    };
    var commonProps = __assign({}, props);
    Object.assign(commonProps, getTouchHandlers());
    [
        'moveThreshold',
        'tapDelay',
        'pressDelay',
        'preventDefault',
        'stopPropagation',
        'onSwipe',
        'component',
        'onSwipeLeft',
        'onSwipeUp',
        'onSwipeRight',
        'onSwipeDown',
        'onTap',
        'onSingleTap',
        'onDoubleTap',
        'onPress'
    ].forEach(function (item) {
        delete commonProps[item];
    });
    return (React.createElement(Component, __assign({}, commonProps), children));
};
Touchable.defaultProps = {
    moveThreshold: 30,
    tapDelay: 250,
    pressDelay: 750,
    preventDefault: true,
    component: 'span'
};

/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @via https://github.com/facebook/react/blob/master/src/vendor/core/CSSCore.js
 */

let CSSCore = {

  /**
   * Adds the class passed in to the element if it doesn't already have it.
   *
   * @param {DOMElement} element the element to set the class on
   * @param {string} className the CSS className
   * @return {DOMElement} the element passed in
   * @see http://caniuse.com/#feat=classlist
   */
  addClass(element, className) {
    if (className) {
      if (element.classList) {
        element.classList.add(className);
      } else if (!CSSCore.hasClass(element, className)) {
        element.className = element.className + ' ' + className;
      }
    }
    return element;
  },

  /**
   * Removes the class passed in from the element
   *
   * @param {DOMElement} element the element to set the class on
   * @param {string} className the CSS className
   * @return {DOMElement} the element passed in
   */
  removeClass(element, className) {
    if (className) {
      if (element.classList) {
        element.classList.remove(className);
      } else if (CSSCore.hasClass(element, className)) {
        element.className = element.className
          .replace(new RegExp('(^|\\s)' + className + '(?:\\s|$)', 'g'), '$1')
          .replace(/\s+/g, ' ') // multiple spaces to one
          .replace(/^\s*|\s*$/g, ''); // trim the ends
      }
    }
    return element;
  },

  /**
   * Helper to add or remove a class from an element based on a condition.
   *
   * @param {DOMElement} element the element to set the class on
   * @param {string} className the CSS className
   * @param {*} bool condition to whether to add or remove the class
   * @return {DOMElement} the element passed in
   */
  conditionClass(element, className, bool) {
    return (bool ? CSSCore.addClass : CSSCore.removeClass)(element, className);
  },

  /**
   * Tests whether the element has the class specified.
   *
   * @param {DOMNode|DOMWindow} element the element to set the class on
   * @param {string} className the CSS className
   * @return {boolean} true if the element has the class, false if not
   */
  hasClass(element, className) {
    if (element.classList) {
      return !!className && element.classList.contains(className);
    }
    return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
  },

  toggleClass(element, className) {
    return CSSCore.hasClass(element, className) ?
      CSSCore.removeClass(element, className) :
      CSSCore.addClass(element, className);
  }
};

/**
 * @licence https://github.com/JedWatson/exenv
 */

const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * modified version of:
 * https://github.com/facebook/react/blob/0.13-stable/src/addons/transitions/ReactTransitionEvents.js
 */

/**
 * EVENT_NAME_MAP is used to determine which event fired when a
 * transition/animation ends, based on the style property used to
 * define that event.
 */
const EVENT_NAME_MAP = {
  transitionend: {
    'transition': 'transitionend',
    'WebkitTransition': 'webkitTransitionEnd',
    'MozTransition': 'mozTransitionEnd',
    'OTransition': 'oTransitionEnd',
    'msTransition': 'MSTransitionEnd'
  },

  animationend: {
    'animation': 'animationend',
    'WebkitAnimation': 'webkitAnimationEnd',
    'MozAnimation': 'mozAnimationEnd',
    'OAnimation': 'oAnimationEnd',
    'msAnimation': 'MSAnimationEnd'
  }
};

let endEvents = [];
let support = {};

function detectEvents() {
  var testEl = document.createElement('div');
  var style = testEl.style;

  // On some platforms, in particular some releases of Android 4.x,
  // the un-prefixed "animation" and "transition" properties are defined on the
  // style object but the events that fire will still be prefixed, so we need
  // to check if the un-prefixed events are useable, and if not remove them
  // from the map
  if (!('AnimationEvent' in window)) {
    delete EVENT_NAME_MAP.animationend.animation;
  }

  if (!('TransitionEvent' in window)) {
    delete EVENT_NAME_MAP.transitionend.transition;
  }

  for (var baseEventName in EVENT_NAME_MAP) {
    var baseEvents = EVENT_NAME_MAP[baseEventName];
    support[baseEventName] = false;

    for (var styleName in baseEvents) {
      if (styleName in style) {
        support[baseEventName] = baseEvents[styleName];
        endEvents.push(baseEvents[styleName]);
        break;
      }
    }
  }
}

if (canUseDOM) {
  detectEvents();
}

if (support.animationend) {
  CSSCore.addClass(document.documentElement, 'cssanimations');
}

// We use the raw {add|remove}EventListener() call because EventListener
// does not know how to remove event listeners and we really should
// clean up. Also, these events are not triggered in older browsers
// so we should be A-OK here.

function addEventListener(node, eventName, eventListener) {
  node.addEventListener(eventName, eventListener, false);
}

function removeEventListener(node, eventName, eventListener) {
  node.removeEventListener(eventName, eventListener, false);
}

let TransitionEvents = {
  on(node, eventListener) {
   
    if (endEvents.length === 0) {
      // If CSS transitions are not supported, trigger an "end animation"
      // event immediately.
      window.setTimeout(eventListener, 0);
      return;
    }
    endEvents.forEach(function (endEvent) {
      
      addEventListener(node, endEvent, eventListener);
    });
  },

  off(node, eventListener) {
    if (endEvents.length === 0) {
      return;
    }
    endEvents.forEach(function (endEvent) {
      removeEventListener(node, endEvent, eventListener);
    });
  },

  support: support
};

var SliderItem = function (props) {
    var active = props.active, direction = props.direction, onAnimateOutEnd = props.onAnimateOutEnd, index = props.index, caption = props.caption, className = props.className, animateIn = props.animateIn, animateOut = props.animateOut, children = props.children;
    var _a = React.useState(direction), directionState = _a[0], setDirectionState = _a[1];
    var timer = React.useRef(null);
    var currentDom = React.useRef(null);
    var handleAnimateOutEnd = function () {
        if (onAnimateOutEnd) {
            onAnimateOutEnd(index);
        }
    };
    var startAnimation = function () {
        if (direction === 'next') {
            setDirectionState('left');
        }
        else if (direction === 'prev') {
            setDirectionState('right');
        }
    };
    React.useEffect(function () {
        TransitionEvents.on(ReactDOM.findDOMNode(currentDom.current), handleAnimateOutEnd);
        timer.current = setTimeout(startAnimation, 10);
        setDirectionState(null);
        return function () {
            clearTimeout(timer.current);
        };
    }, [direction]);
    var classSet = {
        active: (active && !animateIn) || animateOut,
        next: active && animateIn && (direction && direction === 'next'),
        prev: active && animateIn && (direction && direction === 'prev')
    };
    if (directionState && (animateIn || animateOut)) {
        classSet[directionState] = true;
    }
    var sliderItemClass = classnames(className, classSet);
    return (React.createElement("li", { className: sliderItemClass, ref: currentDom },
        children,
        caption && React.createElement("div", { className: "slider-caption" }, caption)));
};
SliderItem.defaultProps = {
    animation: true
};

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".slider {\n  position: relative; }\n  .slider ul,\n  .slider ol {\n    list-style: none;\n    padding: 0; }\n  .slider img {\n    max-width: 100%;\n    height: auto;\n    -ms-interpolation-mode: bicubic;\n    display: inline-block;\n    vertical-align: middle; }\n\n.slider-slides {\n  position: relative;\n  width: 100%;\n  overflow: hidden;\n  margin: 0; }\n  .slider-slides > li {\n    position: relative;\n    display: none;\n    transition: transform 0.5s ease-in-out;\n    backface-visibility: hidden;\n    perspective: 1000px; }\n    .slider-slides > li > img,\n    .slider-slides > li > a > img {\n      display: block;\n      width: 100%;\n      height: auto;\n      line-height: 1; }\n    .slider-slides > li.next, .slider-slides > li.active.right {\n      left: 0;\n      transform: translate3d(100%, 0, 0); }\n    .slider-slides > li.prev, .slider-slides > li.active.left {\n      left: 0;\n      transform: translate3d(-100%, 0, 0); }\n    .slider-slides > li.next.left, .slider-slides > li.prev.right, .slider-slides > li.active {\n      left: 0;\n      transform: translate3d(0, 0, 0); }\n  .slider-slides > .active,\n  .slider-slides > .next,\n  .slider-slides > .prev {\n    display: block; }\n  .slider-slides > .active {\n    left: 0; }\n  .slider-slides > .next,\n  .slider-slides > .prev {\n    position: absolute;\n    top: 0;\n    width: 100%; }\n\n.slider-control-prev, .slider-control-next {\n  position: absolute;\n  top: 50%;\n  z-index: 5;\n  transform: translate3d(0, -50%, 0);\n  border-radius: 50%;\n  width: 1.25rem;\n  height: 1.25rem;\n  color: rgba(255, 255, 255, 0.7);\n  backdrop-filter: blur(1.25rem);\n  cursor: pointer; }\n\n.slider-control-prev {\n  left: 10px; }\n  .slider-control-prev span {\n    display: inline-block;\n    width: 0.5rem;\n    margin-left: 5px;\n    margin-top: 3px;\n    height: 0.5rem;\n    border-bottom: 2px solid #fff;\n    border-right: 2px solid #fff;\n    transform: rotate(130deg); }\n\n.slider-control-next {\n  right: 10px; }\n  .slider-control-next span {\n    position: absolute;\n    left: 0;\n    top: 0;\n    margin-left: -0.3125rem;\n    margin-top: -0.3125rem;\n    width: 0.5rem;\n    height: 0.5rem;\n    margin-left: 3px;\n    margin-top: 5px;\n    border-bottom: 2px solid #fff;\n    border-right: 2px solid #fff;\n    transform: rotate(-40deg); }\n\n.slider-indicators {\n  position: absolute;\n  bottom: 0.9375rem;\n  left: 50%;\n  z-index: 15;\n  display: flex;\n  justify-content: center;\n  margin: 0;\n  transform: translate3d(-50%, 0, 0); }\n  .slider-indicators li {\n    display: block;\n    width: 8px;\n    height: 8px;\n    overflow: hidden;\n    text-indent: -999px;\n    border: 1px solid #fff;\n    border-radius: 10px;\n    cursor: pointer; }\n    .slider-indicators li + li {\n      margin-left: 8px; }\n  .slider-indicators .active {\n    background: #fff; }\n\n.slider-thumbs {\n  display: flex;\n  margin: 5px 0 0; }\n  .slider-thumbs li {\n    flex: 1;\n    opacity: 0.75;\n    cursor: pointer;\n    transition: opacity 0.5s; }\n    .slider-thumbs li + li {\n      margin-left: 2px; }\n  .slider-thumbs .active {\n    opacity: 1; }\n\n.slider-caption {\n  position: absolute;\n  bottom: 20px;\n  z-index: 10;\n  width: 100%;\n  padding-top: 0.9375rem;\n  padding-bottom: 0.9375rem;\n  color: #fff;\n  text-align: center;\n  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6); }\n";
styleInject(css_248z);

var Slider = function (props) {
    var classPrefix = props.classPrefix, defaultActiveIndex = props.defaultActiveIndex, activeIndex = props.activeIndex, onAction = props.onAction, infinite = props.infinite, prevIcon = props.prevIcon, nextIcon = props.nextIcon, direction = props.direction, children = props.children, controls = props.controls, pager = props.pager, slide = props.slide, onSlideEnd = props.onSlideEnd, className = props.className, interval = props.interval, pauseOnHover = props.pauseOnHover, autoPlay = props.autoPlay, restProps = __rest(props, ["classPrefix", "defaultActiveIndex", "activeIndex", "onAction", "infinite", "prevIcon", "nextIcon", "direction", "children", "controls", "pager", "slide", "onSlideEnd", "className", "interval", "pauseOnHover", "autoPlay"]);
    var defaultActiveIndexState = defaultActiveIndex == null ?
        0 : defaultActiveIndex;
    var _a = React.useState(defaultActiveIndexState), activeIndexState = _a[0], setActiveIndexState = _a[1];
    var _b = React.useState(null), previousActiveIndex = _b[0], setPreviousActiveIndex = _b[1];
    var _c = React.useState(null), directionState = _c[0], setDirectionState = _c[1];
    var timer = null;
    var isPaused = React.useRef(false);
    React.useEffect(function () {
        autoPlay && waitForNext();
        return function () {
            clearTimeout(timer);
        };
    });
    var getActiveIndex = function () {
        return activeIndex != null ?
            activeIndex : activeIndexState;
    };
    var getDirection = function (prevIndex, index) {
        if (prevIndex === index) {
            return null;
        }
        return prevIndex > index ? 'prev' : 'next';
    };
    var prev = function (e) {
        e && e.preventDefault();
        var index = getActiveIndex() - 1;
        if (index < 0) {
            if (!infinite) {
                return;
            }
            index = React.Children.count(children) - 1;
        }
        handleSelect(index, 'prev');
    };
    var handleItemAnimateOutEnd = function () {
        setPreviousActiveIndex(null);
        setDirectionState(null);
        waitForNext();
        onSlideEnd && onSlideEnd();
        clearTimeout(timer);
    };
    var pause = function () {
        isPaused.current = true;
        clearTimeout(timer);
    };
    var play = function () {
        isPaused.current = false;
        waitForNext();
    };
    var waitForNext = function () {
        if (!isPaused.current && slide && interval &&
            activeIndex == null) {
            timer = setTimeout(next, interval);
        }
    };
    var handleSelect = function (index, direction) {
        var previousActive = getActiveIndex();
        direction = direction || getDirection(previousActive, index);
        if (onAction) {
            onAction(index, direction);
        }
        if (activeIndex == null && index !== previousActive) {
            if (previousActiveIndex != null) {
                return;
            }
            setActiveIndexState(index);
            setPreviousActiveIndex(previousActive);
            setDirectionState(direction);
        }
    };
    var next = function (e) {
        e && e.preventDefault();
        var index = getActiveIndex() + 1;
        var count = React.Children.count(children);
        if (index > count - 1) {
            if (!infinite) {
                return;
            }
            index = 0;
        }
        handleSelect(index, 'next');
    };
    var handleMouseOver = function () {
        if (pauseOnHover) {
            pause();
        }
    };
    var handleMouseOut = function () {
        if (isPaused.current) {
            play();
        }
    };
    var handleSwipeLeft = function () {
        next();
    };
    var handleSwipeRight = function () {
        prev();
    };
    var renderControls = function () {
        return controls ? (React.createElement("div", { className: classPrefix + "-control" },
            React.createElement(Touchable, { className: classPrefix + "-control-prev", onTap: prev, onMouseOver: handleMouseOver, onMouseOut: handleMouseOut, stopPropagation: true }, prevIcon),
            React.createElement(Touchable, { className: classPrefix + "-control-next", onTap: next, onMouseOver: handleMouseOver, onMouseOut: handleMouseOut, stopPropagation: true }, nextIcon))) : null;
    };
    var renderPager = function () {
        if (pager) {
            var isThumbnailNav_1 = false;
            var childs = React.Children.map(children, function (child, i) {
                var className = (i === getActiveIndex()) ?
                    'active' : undefined;
                var thumb = child.props.thumbnail;
                if (!isThumbnailNav_1) {
                    isThumbnailNav_1 = !!thumb;
                }
                return (React.createElement(Touchable, { component: "li", className: className, key: i, onMouseOver: handleMouseOver, onMouseOut: handleMouseOut, onTap: function () {
                        handleSelect(i, null);
                    } }, thumb ? React.createElement("img", { src: thumb, alt: '\u56FE\u7247' }) : null));
            });
            var pagerClassName = isThumbnailNav_1 ? classPrefix + "-thumbs" :
                classPrefix + "-indicators";
            return (React.createElement("ol", { className: classnames(classPrefix + "-pager", pagerClassName) }, childs));
        }
        return null;
    };
    var renderItem = function (child, index) {
        var activeIndex = getActiveIndex();
        var isActive = (index === activeIndex);
        var isPreviousActive = previousActiveIndex != null &&
            previousActiveIndex === index && slide;
        var childProps = {
            active: isActive,
            ref: child.ref,
            key: child.key ? child.key : index,
            index: index,
            animateOut: isPreviousActive,
            animateIn: isActive && previousActiveIndex != null &&
                slide,
            direction: directionState,
            onAnimateOutEnd: isPreviousActive ? handleItemAnimateOutEnd : null
        };
        return React.cloneElement(child, childProps);
    };
    return React.createElement(Touchable, __assign({}, restProps, { component: "div", className: classnames(classPrefix, className), onMouseOver: handleMouseOver, onMouseOut: handleMouseOut, onSwipeLeft: handleSwipeLeft, onSwipeRight: handleSwipeRight, preventDefault: false, stopPropagation: true }),
        React.createElement("ul", { className: classPrefix + "-slides" }, React.Children.map(children, renderItem)),
        renderControls(),
        renderPager());
};
Slider.defaultProps = {
    classPrefix: 'slider',
    controls: true,
    pager: true,
    slide: true,
    interval: 2000,
    autoPlay: true,
    infinite: true,
    pauseOnHover: true,
    prevIcon: React.createElement("span", null),
    nextIcon: React.createElement("span", null),
};
Slider.Item = SliderItem;

exports.default = Slider;
//# sourceMappingURL=index.js.map
