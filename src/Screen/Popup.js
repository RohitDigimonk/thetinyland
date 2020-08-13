import React, {Component} from 'react';
// import { MenuProvider,MenuOption, Menu, MenuTrigger, MenuOptions } from 'react-native-popup-menu';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import {View,Image,Text} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
class Popup extends Component {
    _menu = null;

    setMenuRef = ref => {
        this._menu = ref;
      };
     
      hideMenu = () => {
        this._menu.hide();
      };
     
      showMenu = () => {
        this._menu.show();
      };

    render () {
        return(
            <Menu
            ref={this.setMenuRef}
            button={<TouchableOpacity style={{marginLeft: 10, marginTop: 24}} onPress={this.showMenu}><Image
                source={require('../Images/filter.png')}
                style={{width: 45, height: 30, }}
               
            /></TouchableOpacity>}
          >
            <MenuItem onPress={this.hideMenu}>Menu item 1</MenuItem>
            <MenuItem onPress={this.hideMenu}>Menu item 2</MenuItem>
            {/* <MenuItem onPress={this.hideMenu} disabled>
              Menu item 3
            </MenuItem> */}
            <MenuDivider />
            <MenuItem onPress={this.hideMenu}>Menu item 4</MenuItem>
          </Menu>


 
        );
    } 
}

{/* <MenuProvider style={{position:"absolute",}} >
 <Menu onSelect={value => alert(`Selected number: ${value}`)} >
 <MenuTrigger>
 <View style={{marginLeft: 10, marginTop: 24}}>
 <Image
     source={require('../Images/filter.png')}
     style={{width: 45, height: 30, }}
 />
 </View>
 </MenuTrigger>
 <MenuOptions optionsContainerStyle={{  position:"absolute", top:50, right:80 }}>
 <MenuOption value={1} text='One' />
 <MenuOption value={2}>
 <Text style={{color: 'red'}}>Two</Text>
 </MenuOption>
 <MenuOption value={3} disabled={true} text='Three' />
 </MenuOptions>
 </Menu>
 </MenuProvider> */}

export default Popup;