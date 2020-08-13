import React, {Component} from 'react';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {View, Text, Dimensions, Image} from 'react-native'


class SchoolSwiper extends Component {

    // componentDidMount() {
    //     this.list.scrollToIndex({ index: this.props.scrollToIndex || 0 });
    //   }

    slider = "https://thetinyland.com/uploads/other_images/"

    data = this.props.data
    other_images = this.data['otherImage']
    render(){
        return(
<View style={Styles.container}>   
            <SwiperFlatList
          autoplay
          autoplayDelay={2}
          autoplayLoop
          index={0}
          showPagination
        >
        
            {
                this.other_images.map(data=>
                 <View style={[Styles.child]}>
                     
                    
                <Image source={{uri:this.slider+data.otherimage}}
                style={{height:"100%", width:"100%", resizeMode:"stretch"}} />
                
                </View>
                )
            }
        
          
        </SwiperFlatList>
        </View>
        );
    }
}

export const { width, height } = Dimensions.get('window');
const Styles = {
    
    container: {
        height: 200,
        backgroundColor: 'white'
      },
    child: {
        height: height * 0.5,
        width,
        justifyContent: 'center',
        alignItems:"center",
        resizeMode:"contain"
      },
}

export default SchoolSwiper;