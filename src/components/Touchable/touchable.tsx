import React from 'react';
export interface ITouchableProps {
    moveThreshold?: number | any;
    tapDelay?: number | any;
    pressDelay?: number;
    preventDefault?: boolean;
    stopPropagation?: boolean;
    onSwipe?: () => void;
    onSwipeLeft?: () => void;
    onSwipeUp?: () => void;
    onSwipeRight?: () => void;
    onSwipeDown?: () => void;
    onTap?: () => void;
    onSingleTap?: () => void;
    onDoubleTap?: () => void;
    onPress?: () => void;
    component?: any;
    [key: string]: any;
}
type TouchSourceType = {
    [key: string]: number | boolean | any
}
const Touchable: React.FC<ITouchableProps> = (props: ITouchableProps) => {
    const {
        pressDelay,
        tapDelay,
        onPress,
        preventDefault,
        stopPropagation,
        moveThreshold,
        component: Component,
        children
    } = props;
    let touchTimeout: any = null;
    let pressTimeout: any = null;
    let swipeTimeout: any = null;
    let tapTimeout: any = null;
    const [startTouch, setStartTouch] = React.useState(null);
    const [endTouch, setEndTouch] = React.useState<React.Touch | null>(null);
    const [touch, setTouch] = React.useState<TouchSourceType>({ x1: 0, y1: 0, x2: 0, y2: 0, last: 0, isDoubleTap: false });
    const [delta, setDelta] = React.useState({ deltaX: 0, deltaY: 0 });

    const resetTouch = () => {
        setStartTouch(null)
        setEndTouch(null)
        setTouch({ x1: 0, y1: 0, x2: 0, y2: 0, last: 0, isDoubleTap: false })
        setDelta({ deltaX: 0, deltaY: 0 })
    }
    const handlePress = () => {
        pressTimeout = null;
        if (touch.last) {
            onPress && onPress();
            resetTouch();
        }
    };
    const processEvent = (e: React.TouchEvent) => {
        preventDefault && e.preventDefault();
        stopPropagation && e.stopPropagation();
    }
    const handleTouchStart = (e: React.TouchEvent) => {
        // console.log('handle touchstart');
        processEvent(e);
        if (!e.touches) {
            return;
        }
        let startTouch = e.touches[0];
        if (e.touches.length === 1 && touch.x2) {
            // Clear out touch movement data if we have it sticking around
            // This can occur if touchcancel doesn't fire due to preventDefault, etc.
            touch.x2 = undefined;
            touch.y2 = undefined;
        }
        let now = Date.now();
        let delta = now - (touch.last || now);
        touchTimeout && clearTimeout(touchTimeout);
        touch.x1 = startTouch.pageX;
        touch.y1 = startTouch.pageY;
        if (delta > 0 && delta <= tapDelay) {
            touch.isDoubleTap = true;
        }
        touch.last = now;
        pressTimeout = setTimeout(handlePress, pressDelay);
    }
    const handleTouchMove = (e: React.TouchEvent) => {
        processEvent(e);
        const endTouch = e.touches[0];
        let {
            deltaX,
            deltaY,
        } = delta;

        cancelPress();

        touch.x2 = endTouch.pageX;
        touch.y2 = endTouch.pageY;
        deltaX += Math.abs(touch.x1 - touch.x2);
        deltaY += Math.abs(touch.y1 - touch.y2);
        setEndTouch(endTouch)
        setTouch({
            ...touch,
            x2: touch.x2,
            y2: touch.y2
        })
        setDelta({
            deltaY,
            deltaX 
        })
    }

    const handleTouchEnd = (e: React.TouchEvent) => {
        processEvent(e);
        cancelPress();
        let {
            deltaX,
            deltaY,
        } = delta;
        let event:any = {
            touch,
            startTouch,
            endTouch,
            preventDefault: () => {
            },
        };
        if ((touch.x2 && Math.abs(touch.x1 - touch.x2) > moveThreshold) ||
            (touch.y2 && Math.abs(touch.y1 - touch.y2) > moveThreshold)) {

            event.type = 'swipe';

            swipeTimeout = setTimeout(() => {
                handleEvent(event);

                event.type += _getSwipeDirection();
                handleEvent(event);
                resetTouch();
            }, 0);
        }
        else if ('last' in touch) {
            if (deltaX < moveThreshold && deltaY < moveThreshold) {
                tapTimeout = setTimeout(() => {
                    event.type = 'tap';
                    handleEvent(event);
                    if (touch.isDoubleTap) {
                        event.type = 'doubleTap';
                        handleEvent(event);
                        resetTouch();
                    }
                    else {
                        touchTimeout = setTimeout(() => {
                            touchTimeout = null;
                            event.type = 'singleTap';
                            handleEvent(event);
                            resetTouch();
                        }, tapDelay)
                    }
                }, 0)
            } else {
                resetTouch();
            }
        }
    }

    const handleTouchCancel = () => {
        cancelAll();
    }
    const cancelPress = () => {
        if (pressTimeout) {
            clearTimeout(pressTimeout);
        }

        pressTimeout = null;
    }
    const cancelAll = () => {
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
    }

    const _getSwipeDirection = () => {
        let {
            x1,
            x2,
            y1,
            y2,
        } = touch;

        // 水平方向：水平距离大于等于垂直距离
        // 垂直方向：
        return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ?
            (x1 - x2 > 0 ? 'Left' : 'Right') :
            (y1 - y2 > 0 ? 'Up' : 'Down');
    }
    const getEventMethodName = (type: string) => {
        return 'on' + type.charAt(0).toUpperCase() + type.slice(1);
    }

    const handleEvent = (event: React.TouchEvent) => {
        let method = getEventMethodName(event.type);
        props[method] && props[method](event);
    };

    const getTouchHandlers = () => {
        return {
            onTouchStart: handleTouchStart,
            onTouchEnd: handleTouchEnd,
            onTouchCancel: handleTouchCancel,
            onTouchMove: handleTouchMove,
        }
    }
    const commonProps = {
        ...props
    }
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
    ].forEach((item)=>{
        delete commonProps[item]
    })
    return (
        <Component
            {...commonProps}
        >
            {children}
        </Component>
    );
}
Touchable.defaultProps = {
    moveThreshold: 30,
    tapDelay: 250,
    pressDelay: 750,
    preventDefault: true,
    component: 'span'
}

export default Touchable 