/// <reference types="react" />
interface ISliderProps {
    controls?: boolean;
    pager?: boolean;
    interval?: number;
    autoPlay?: boolean;
    infinite?: boolean;
    defaultActiveIndex?: number;
    onAction?: (index: number, direction: string | null) => void;
    prevIcon?: React.ReactNode;
    nextIcon?: React.ReactNode;
}
interface ISliderItemProps {
    caption?: React.ReactNode;
    thumbnail?: React.ReactNode;
}
export { ISliderItemProps, ISliderProps };
