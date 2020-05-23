# rc-touch-slider

***rc-touch-slider UI component for React***

## Install
```
npm install --save rc-touch-slider
```

## Usage

> ***There are three styles***

### 1、conventional
```
import Slider from 'rc-touch-slider';
<Slider>
	<Slider.Item><img src={require('./81598333_p0.jpg')} /></Slider.Item>
	<Slider.Item><img src={require('./81598333_p0.jpg')} /></Slider.Item>
	<Slider.Item><img src={require('./81598333_p0.jpg')} /></Slider.Item>
	<Slider.Item><img src={require('./81598333_p0.jpg')} /></Slider.Item>
</Slider>
```
<img src="https://github.com/smilelabi/upload-img-files/raw/master/style1.gif"/>

### 2、Thumbnail
```
import Slider from 'rc-touch-slider';
const data = [
  {
    thumb: require('./81598333_p0.jpg'),
	img: require('./81598333_p0.jpg')
  },
  {
    thumb: require('./81598333_p0.jpg'),
    img: require('./81598333_p0.jpg')
  },
  {
    thumb: require('./81598333_p0.jpg'),
	img: require('./81598333_p0.jpg')
  },
  {
    thumb: require('./81598333_p0.jpg'),
	img: require('./81598333_p0.jpg')
}];
<Slider controls={false}>
	{
		data.map(function (item, i) {
			return (
				<Slider.Item key={i} thumbnail={item.thumb}>
					<img src={item.img} />
				</Slider.Item>
			);
		})
	}
</Slider>
```

<img src="https://github.com/smilelabi/upload-img-files/raw/master/style2.gif" />

### 3、Text

```
import Slider from 'rc-touch-slider';
const data = [
  {
     desc: '这是一张图片标题1',
	img: require('./81598333_p0.jpg')
  },
  {
     desc: '这是一张图片标题1',
    img: require('./81598333_p0.jpg')
  },
  {
     desc: '这是一张图片标题1',
	img: require('./81598333_p0.jpg')
  },
  {
    desc: '这是一张图片标题1',
	img: require('./81598333_p0.jpg')
}];
<Slider controls={false}>
	{
		data.map(function (item, i) {
			return (
				<Slider.Item key={i} caption={item.desc}></Slider.Item>
			);
		})
	}
</Slider>
```
<img src="https://github.com/smilelabi/upload-img-files/raw/master/style3.gif" />

## API

**Slider Props**

| Name | Type | Default | Description |
| ------------ | ------- | ------- | ----------- |
|controls |boolean |true |Whether to display the "Page Turn" button|
|pager |boolean |true |Whether to display "page break"|
|interval |number |2000ms|Carousel interval|
|autoPlay  |boolean |true|Whether to play automatically|
|infinite  |boolean |true|Whether loop |
|defaultActiveIndex  |number |--|Slide number activated by default|
|onAction  |(index: number, direction:string):void|--|Callback function after slide transition, accept two parameters (index, direction), index is the slide number, direction is the scroll direction|
|prevIcon  |React.ReactNode|--|Previous button icon|
|nextIcon  |React.ReactNode|--|Next button icon|

**Slider.Item Props**

|Name|Type|Default|Description|
| ------------ | ------- | ------- | ----------- |
|caption |React.ReactNode |-- |Slide title|
|thumbnail  |React.ReactNode |-- |Slide thumbnail URL, after setting thumbnail, pagination dots will be replaced with thumbnails|

