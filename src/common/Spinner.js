import React from 'react';
import { View, ActivityIndicator} from 'react-native';

const Spinner = ({ size }) => {
    return (
        <View style={styles.spinnerStyle}>
            <ActivityIndicator size={size || 'large'} color="#ffffff" />
        </View>
    );
};

const styles = {
    spinnerStyle: {
         width:160,
         height:50,
         justifyContent:'center',
         alignItems:'center',
         marginLeft: 5,
         marginRight: 5,
         backgroundColor: '#008C99',
         borderRadius: 10,

         
    }
}

export default Spinner;