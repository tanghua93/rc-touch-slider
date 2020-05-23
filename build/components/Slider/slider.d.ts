import React from 'react';
import SliderItem from './sliderItem';
import { ISliderProps } from './propsType';
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
declare type SliderFC<P> = React.FC<P> & {
    Item: typeof SliderItem;
};
declare const Slider: SliderFC<SliderProps>;
export default Slider;
