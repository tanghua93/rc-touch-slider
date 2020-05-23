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
declare const Touchable: React.FC<ITouchableProps>;
export default Touchable;
