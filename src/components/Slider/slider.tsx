import React from 'react';
import classNames from 'classnames';
import Touchable from '../Touchable/touchable';
import SliderItem from './sliderItem';
import { ISliderProps } from './propsType'
import '../../style/index.scss';
export interface SliderProps extends ISliderProps {
    classPrefix?: string;
    slide?: boolean;
    pauseOnHover?: boolean;
    onSlideEnd?: () => void;
    activeIndex?: number;
    direction?: 'prev' | 'next';
    children: React.ReactNode;
    className?: string;
}
type SliderFC<P> = React.FC<P> & {
    Item: typeof SliderItem
}
const Slider: SliderFC<SliderProps> = (props: SliderProps) => {
    const {
        classPrefix,
        defaultActiveIndex,
        activeIndex,
        onAction,
        infinite,
        prevIcon,
        nextIcon,
        direction,
        children,
        controls,
        pager,
        slide,
        onSlideEnd,
        className,
        interval,
        pauseOnHover,
        autoPlay,
        ...restProps
    } = props;
    const defaultActiveIndexState = defaultActiveIndex == null ?
        0 : defaultActiveIndex;
    const [activeIndexState, setActiveIndexState] = React.useState<number>(defaultActiveIndexState);
    const [previousActiveIndex, setPreviousActiveIndex] = React.useState<number | null>(null);
    const [directionState, setDirectionState] = React.useState<string | null>(null);
    let timer: ReturnType<typeof setTimeout> | any = null;
    const isPaused = React.useRef(false);
    React.useEffect(() => {
        autoPlay && waitForNext()
        return () => {
            clearTimeout(timer);
        }
    })
    const getActiveIndex = () => {
        return activeIndex != null ?
            activeIndex : activeIndexState;
    }
    const getDirection = (prevIndex: number, index: number) => {
        if (prevIndex === index) {
            return null;
        }
        return prevIndex > index ? 'prev' : 'next';
    }

    const prev = (e?: React.TouchEvent<HTMLDivElement>) => {
        e && e.preventDefault();

        let index = getActiveIndex() - 1;

        if (index < 0) {
            if (!infinite) {
                return;
            }
            index = React.Children.count(children) - 1;

        }
        handleSelect(index, 'prev');

    }
    const handleItemAnimateOutEnd = () => {
        setPreviousActiveIndex(null)
        setDirectionState(null)
        waitForNext();
        onSlideEnd && onSlideEnd()
        clearTimeout(timer);

    }
    const pause = () => {
        isPaused.current = true;
        clearTimeout(timer);
    }

    const play = () => {
        isPaused.current= false;
        waitForNext();
    }
    const waitForNext = () => {
        if (!isPaused.current && slide && interval &&
            activeIndex == null) {
            timer = setTimeout(next, interval);
        }
    }
    const handleSelect = (index: number, direction?: string | null) => {
        let previousActive = getActiveIndex();
        direction = direction || getDirection(previousActive, index);
        if (onAction) {
            onAction(index, direction);
        }
        if (activeIndex == null && index !== previousActive) {
            if (previousActiveIndex != null) {
                return;
            }
            setActiveIndexState(index)
            setPreviousActiveIndex(previousActive)
            setDirectionState(direction)
        }
    }
    const next = (e?:React.TouchEvent) => {
        e && e.preventDefault();
        let index = getActiveIndex() + 1;
        const count = React.Children.count(children);
        if (index > count-1) {
            if (!infinite) {
                return;
            }
            index = 0;
        }
        handleSelect(index, 'next');
    }
    const handleMouseOver = () => {
        if (pauseOnHover) {
            pause();
        }
    };
    const handleMouseOut = () => {
        if (isPaused.current) {
            play();
        }
    };
    const handleSwipeLeft = () => {
        next();
    };
    const handleSwipeRight = () => {
        prev();
    };
    const renderControls = () => {
        return controls ? (
            <div className={`${classPrefix}-control`}>
                <Touchable
                    className={`${classPrefix}-control-prev`}
                    onTap={prev}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                    stopPropagation
                >
                    {prevIcon}
                </Touchable>
                <Touchable
                    className={`${classPrefix}-control-next`}
                    onTap={next}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                    stopPropagation
                >
                    {nextIcon}
                </Touchable>
            </div>
        ) : null;
    }

    const renderPager = () => {
        if (pager) {
            let isThumbnailNav = false;

            let childs = React.Children.map(children, (child: any, i) => {
                let className = (i === getActiveIndex()) ?
                    'active' : undefined;
                let thumb = child.props.thumbnail;

                if (!isThumbnailNav) {
                    isThumbnailNav = !!thumb;
                }
                return (
                    <Touchable
                        component="li"
                        className={className}
                        key={i}
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}
                        onTap={() => {
                            handleSelect(i, null)
                        }}
                    >
                        {thumb ? <img src={thumb} alt='图片'/> : null}
                    </Touchable>
                );
            });
            const pagerClassName = isThumbnailNav ? `${classPrefix}-thumbs` :
                `${classPrefix}-indicators`;
            return (
                <ol
                    className={classNames(`${classPrefix}-pager`, pagerClassName)}
                >
                    {childs}
                </ol>
            );
        }
        return null;
    }
    const renderItem = (child: any, index: number) => {
        const activeIndex = getActiveIndex();
        const isActive = (index === activeIndex);
        const isPreviousActive = previousActiveIndex != null &&
            previousActiveIndex === index && slide;
      
        let childProps = {
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

        return React.cloneElement(child, childProps)
    }
    return <Touchable
        {...restProps}
        component="div"
        className={classNames(classPrefix, className)}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onSwipeLeft={handleSwipeLeft}
        onSwipeRight={handleSwipeRight}
        preventDefault={false}
        stopPropagation={true}
    >
        <ul className={`${classPrefix}-slides`}>
            {React.Children.map(children, renderItem)}
        </ul>
        {renderControls()}
        {renderPager()}
    </Touchable>
}
Slider.defaultProps = {
    classPrefix: 'slider',
    controls: true,
    pager: true,
    slide: true,
    interval: 2000,
    autoPlay: true,
    infinite: true,
    pauseOnHover: true,
    prevIcon: <span></span>,
    nextIcon: <span></span>,
}
Slider.Item = SliderItem
export default Slider