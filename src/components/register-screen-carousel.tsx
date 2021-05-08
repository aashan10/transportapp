import React from 'react';
import Carousel from 'react-native-snap-carousel';
import {Dimensions, Image, View} from 'react-native';
import {Card} from '@ui-kitten/components';

interface RegisterScreenCarouselProps {}
interface RegisterScreenCarouselState {
  data: Array<CarouselItem>;
  activeSlide: number;
}

interface CarouselItem {
  image: any;
}

class RegisterScreenCarousel extends React.Component<
  RegisterScreenCarouselProps,
  RegisterScreenCarouselState
> {
  private carousel: Carousel<CarouselItem> | null = null;
  constructor(props: RegisterScreenCarouselProps) {
    super(props);
    this.state = {
      activeSlide: 0,
      data: [
        {
          image: require('../assets/carousel-1.jpg'),
        },
        {
          image: require('../assets/carousel-2.jpg'),
        },
        {
          image: require('../assets/carousel-3.jpg'),
        },
        {
          image: require('../assets/carousel-4.jpg'),
        },
      ],
    };
  }

  render = () => {
    const {width} = Dimensions.get('window');
    return (
      <Carousel
        data={this.state.data}
        renderItem={this.renderItem}
        ref={c => (this.carousel = c)}
        sliderWidth={width}
        itemWidth={width}
        hasParallaxImages={true}
        firstItem={this.state.activeSlide}
        inactiveSlideScale={1}
        inactiveSlideOpacity={0.7}
        loop={true}
        loopClonesPerSide={2}
        autoplay={true}
        autoplayDelay={500}
        autoplayInterval={5000}
        onSnapToItem={index => this.setState({activeSlide: index})}
      />
    );
  };

  renderItem = ({item, index}: {item: CarouselItem; index: number}) => {
    console.log(item);
    return (
      <View
        style={{
          height: '100%',
          width: '100%',
          flex: 1,
          backgroundColor: '#1abc9c',
        }}
        key={index}>
        <Image
          key={index}
          resizeMode={'cover'}
          style={{
            flex: 1,
            height: 100,
            width: '100%',
            backgroundColor: 'gray',
          }}
          source={item.image}
        />
      </View>
    );
  };
}

export default RegisterScreenCarousel;
