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
    home: {
      createNewRestaurant: 'Crear nuevo restaurante',
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
    restaurant: {
      title: 'Alta de restaurante',
      subtitle: (step: number, stepTotal: number) =>
        `Paso ${step} de ${stepTotal}`,
      create: {
        direction: 'Dirección',
        restaurantName: 'Nombre del restaurante',
        street: 'Calle',
        streetNumber: 'Número',
        neighborhood: 'Barrio',
        town: 'Localidad',
        state: 'Provincia',
        geolocalization: 'Geolocalizacion',
        localizationSubtitle:
          'Mueva el marcador en caso de que no se encuentre geolocalizado correctamente',
        openHoursTitle: 'Horario de apertura',
        fromHour: 'Desde',
        toHour: 'Hasta',
        openedDaysTitle: 'Días y horarios de apertura',
        kindOfFoodAndRange: 'Tipo de comida y rango de precio',
        kindOfFood: 'Tipo de comida',
        priceRange: 'Rango de precio',
        restaurantPictures: 'Imagenes del restaurante',
        addPictures: 'Agregar fotos',
        picturesCaption: (addedAmount: number, totalAmount: number) =>
          `Fotos: ${addedAmount}/${totalAmount} - Elige primero la foto principal de la publicación.`,
      },
      created: {
        title: '¡Tu restaurante ya está listo!',
        subtitle:
          'Felicitaciones, tu restaurante ya se encuentra creado y listo para comenzar a añadir los platos.',
        primaryButton: 'Continuar con el menu',
        secondaryButton: 'Continuar luego',
      },
      bottomBar: {
        cancel: 'Cancelar',
        previous: 'Anterior',
        next: 'Siguiente',
      },
      newDish: {
        title: 'Creación nuevo plato/item',
        category: 'Categoria',
        dishInformation: 'Información de plato/item',
        categories: 'Categorias',
        dishName: 'Nombre de plato/item',
        sellPrice: 'Precio de venta',
        dishImages: 'Imagenes del plato/item',
        dishIngredients: 'Ingredientes (opcional)',
        ingredient: 'Indique el ingrediente',
        addIngredient: '+ Agregar ingrediente',
        finish: 'Finalizar',
        cancel: 'Cancelar',
      },
    },
  },
});
