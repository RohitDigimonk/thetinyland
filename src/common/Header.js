import React, {Component} from 'react';
import {Text,View, TouchableOpacity, Image} from 'react-native';

class Header extends Component{
    render(){
        return(
            <View>
                <TouchableOpacity  onPress={() => this.props.navigation.toggleDrawer()}>
                    <Image
                        source={require('../Images/more.png')}
                        style={{height: 23, width: 29, marginLeft: 10, top: 20}}
                    />
                    </TouchableOpacity>
            </View>
        );
    }
}

export default Header;