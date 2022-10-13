import LocalizedStrings from 'react-native-localization';

export const localizedStrings = new LocalizedStrings({
  es: {
    appName: 'Morfando Inc',
    login: {
      iAmClient: 'Soy cliente',
      iAmOwner: 'Soy dueño de restaurante',
      ssoLogin: 'Inicia sesion con Google',
      email: 'Email',
      password: 'Contraseña',
      forgotPassword: '¿Olvidaste tu contraseña?',
      login: 'Ingresar',
    },
    profile: {
      myFavRestaurants: 'Mis restaurantes favoritos',
      myLikes: 'Mis favoritos',
      legalInfo: 'Informacion legal',
      tAndCond: 'Terminos y condiciones',
      accountManagement: 'Administracion de cuenta',
      signOut: 'Cerrar sesion',
      deleteAccount: 'Eliminar cuenta',
    },
  },
});
