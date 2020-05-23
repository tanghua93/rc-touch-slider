import React from 'react';
import { ISliderItemProps } from './propsType';
export interface SliderItemProps extends ISliderItemProps {
    direction?: 'prev' | 'next';
    onAnimateOutEnd?: (index?: number) => void;
    active?: boolean;
    animateIn?: boolean;
    animateOut?: boolean;
    index?: number;
    animation?: boolean;
    className?: string;
    children?: React.ReactNode;
}
declare const SliderItem: React.FC<SliderItemProps>;
export default SliderItem;
