interface ISliderProps {
    /* 是否显示「翻页」按钮，默认为 true。 */
    controls?: boolean;
    /* 是否显示「分页圆点」，默认为 true。*/
    pager?:boolean;
    /* 轮播间隔时间，默认为 3000（ms）。 */
    interval?:number;
    /* 是否自动播放，默认为 true。 */
    autoPlay?:boolean;
    /* 是否循环播放，默认为 true。 */
    infinite?:boolean;
    /* 默认激活的幻灯片编号。 */
    defaultActiveIndex?:number;
    /* 幻灯片切换后的回调函数，接受两个参数 (index, direction)，index 为幻灯片编号，direction 为滚动方向。 */
    onAction?: (index: number, direction:string | null)=>void;
    /* 上一页翻页按钮样式 */
    prevIcon?: React.ReactNode;
    /* 下一页翻页按钮样式 */
    nextIcon?: React.ReactNode;
}

interface ISliderItemProps{
    /* 幻灯片标题。 */
    caption?: React.ReactNode;
    /* 幻灯片缩略图 URL，设置 thumbnail 以后，分页圆点将替换为缩略图。*/
    thumbnail?: React.ReactNode;
}

export {
    ISliderItemProps,
    ISliderProps
}