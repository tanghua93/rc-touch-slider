import React from 'react'
import classNames from 'classnames';
import TransitionEvents from '../../utils/TransitionEvents';
import ReactDOM from 'react-dom';
import { ISliderItemProps} from './propsType'
export interface SliderItemProps extends ISliderItemProps {
    direction?: 'prev' | 'next';
    onAnimateOutEnd?: (index?: number) => void,
    active?: boolean;
    animateIn?: boolean;
    animateOut?: boolean;
    index?: number;
    animation?: boolean;
    className?: string;
    children?: React.ReactNode;
}
type classSetType = {
    [key: string]: boolean | undefined
}
const SliderItem: React.FC<SliderItemProps> = (props: SliderItemProps) => {
    const {
        active,
        direction,
        onAnimateOutEnd,
        index,
        caption,
        className,
        animateIn,
        animateOut,
        children
    } = props;
    const [directionState, setDirectionState] = React.useState<any>(direction);
    const timer = React.useRef<ReturnType<typeof setTimeout> | any>(null);
    const currentDom = React.useRef<HTMLLIElement | null>(null)
    const handleAnimateOutEnd = () => {
        if (onAnimateOutEnd) {
            onAnimateOutEnd(index);
        }
    }
    const startAnimation = () => {
        if (direction === 'next') {
            setDirectionState('left')
        } else if (direction === 'prev') {
            setDirectionState('right')
        }
    }
    React.useEffect(() => {
        TransitionEvents.on(ReactDOM.findDOMNode(currentDom.current), handleAnimateOutEnd);
        timer.current = setTimeout(startAnimation, 10);
        setDirectionState(null)
        return () => {
            clearTimeout(timer.current)
        }
    }, [direction]);
    const classSet: classSetType = {
        active: (active && !animateIn) || animateOut,
        next: active && animateIn && (direction && direction === 'next'),
        prev: active && animateIn && (direction && direction === 'prev')
    };

    if (directionState && (animateIn || animateOut)) {
        classSet[directionState] = true;
    }
    const sliderItemClass = classNames(className, classSet)
    return (
        <li
            className={sliderItemClass}
            ref={currentDom}
        >
            {children}
            {caption && <div className={`slider-caption`}>
                {caption}
            </div>}
        </li>
    )
}
SliderItem.defaultProps = {
    animation: true
}
export default SliderItem