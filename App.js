import React, {Component} from 'react';
import { createAppContainer, withNavigation} from 'react-navigation';
import { createStackNavigator, HeaderTitle } from 'react-navigation-stack';
import WelcomeScreen from './src/Screen/WelcomeScreen';
import SignIn from './src/Screen/SignIn';
import SignUp from './src/Screen/SignUp';
import ForgotPass from './src/Screen/ForgotPass';
import Home from './src/Screen/Home';
import SchoolDashboard from './src/Screen/SchoolDashboard';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import Subscribepage from './src/Screen/Subscribepage';
import ContactUs from './src/Screen/ContactUs';
import Why from './src/Screen/Why';
import Services from './src/Screen/Services';
import Terms from './src/Screen/Terms';
import UpdateProfile from './src/Screen/UpdateProfile';
import ChangePassword from './src/Screen/ChangePassword';
import Logout from './src/Screen/Logout';
import DrawerContainer from './src/Screen/DrawerContainer'
import OtpRegistration from './src/Screen/OtpRegistration';

// const {height} = Dimensions.get('window')
const AppNavigator = createStackNavigator({

  WelcomeScreen: {
    screen: WelcomeScreen,
    navigationOptions: {
      header: null 
    }
  },
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      header: null
    }
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      header: null
    }
  },
  ForgotPass: {
    screen: ForgotPass,
    navigationOptions: {
      header: null
    }
  },
  Home: {
    screen: Home,
    navigationOptions: {
      header: null
    }
  },
  SchoolDashboard: {
    screen: SchoolDashboard,
    navigationOptions: {
      header: null
    }
    
  },
  Subscribepage: {
    screen: Subscribepage,
    navigationOptions: {
      header: null
    }
  } ,
  ChangePassword: {
    screen: ChangePassword,
    navigationOptions: {
     header:null
    }
  },
  OtpRegistration: {
    screen: OtpRegistration,
    navigationOptions: {
     header:null
    }
  },
  // UpdateProfile: {
  //   screen: UpdateProfile,
  //   navigationOptions: {
  //     header: null
  //   }
  // },
  Terms: {
    screen: Terms,
    navigationOptions: {
      title: 'Terms & Conditions',
      header:null
    }
  },
  Services: {
    screen: Services,
    navigationOptions: {
      title: 'Our services to our partners',
      header:null
    }
  },
  Why: {
    screen: Why,
    navigationOptions: {
      title: 'Why my nursery',
      header:null
    }

  },
  ContactUs: {
    screen: ContactUs,
    navigationOptions: {
      title: 'Contact us',
      header:null
    }
  },

  UpdateProfile: {
    screen: UpdateProfile,
    navigationOptions: {
      title: 'Update Profile',
      header:null
    }
  },

  // ChangePassword: {
  //   screen: ChangePassword,
  //   navigationOptions: {
  //     title: 'Change Password'
  //   }
  // },

},

  
{
  initialRouteName: 'WelcomeScreen'
}
)

// const CustomDrawerComponent = (props) => (
//    
// )

const DrawerStack  = createDrawerNavigator(
  {
    Main: AppNavigator
  },
  {
    drawerPosition: 'left',
    drawerType: "slide",
    initialRouteName: 'Main',
    drawerWidth: 280,
    contentComponent: DrawerContainer
  }
);




export default createAppContainer(DrawerStack);