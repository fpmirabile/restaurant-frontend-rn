import LocalizedStrings from 'react-native-localization';

export const localizedStrings = new LocalizedStrings({
  es: {
    appName: 'Morfando Inc',
    login: {
      iAmClient: 'Soy cliente',
      iAmOwner: 'Soy dueño de restaurante',
      ssoLogin: 'Inicia sesión con Google',
      email: 'Email',
      password: 'Contraseña',
      forgotPassword: '¿Olvidaste tu contraseña?',
      login: 'Ingresar',
      confirm: 'Confirmar',
      cancel: 'Cancelar',
    },
    home: {
      createNewRestaurant: 'Crear nuevo restaurante',
    },
    profile: {
      myFavRestaurants: 'Mis restaurantes favoritos',
      myLikes: 'Mis favoritos',
      legalInfo: 'Información legal',
      tAndCond: 'Términos y condiciones',
      accountManagement: 'Administración de cuenta',
      signOut: 'Cerrar sesión',
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
        geolocalization: 'Geolocalización',
        localizationSubtitle:
          'Mueva el marcador en caso de que no se encuentre geolocalizado correctamente',
        openHoursTitle: 'Horario de apertura',
        fromHour: 'Desde',
        toHour: 'Hasta',
        openedDaysTitle: 'Días y horarios de apertura',
        kindOfFoodAndRange: 'Tipo de comida y rango de precio',
        kindOfFood: 'Tipo de comida',
        priceRange: 'Rango de precio',
        restaurantPictures: 'Imágenes del restaurante',
        addPictures:
          'Puede seleccionar varias imágenes manteniendo presionada la primera imagen por unos segundos',
        picturesCaption: (addedAmount: number, totalAmount: number) =>
          `Fotos: ${addedAmount}/${totalAmount} - La primera foto en seleccionar será la foto de portada.`,
      },
      created: {
        title: (loading: boolean, error: string) =>
          `${
            !loading && !error
              ? '¡Tu restaurante ya está listo!'
              : !loading && error
              ? 'Opps hubo un error.'
              : 'Cargando'
          }`,
        subtitle:
          'Felicitaciones, tu restaurante ya se encuentra creado y listo para comenzar a añadir los platos.',
        subtitleEdit: 'Ya completaste la edición de tu restaurante 🎉. Podes continuar añadiendo nuevos platos 🍽️.',
        primaryButton: 'Continuar con el menú',
        secondaryButton: 'Continuar luego',
      },
      view: {
        createNewDish: 'Crear nuevo plato/ítem',
        noCategories:
          'Lo sentimos, este restaurante no cuenta con categorías creadas',
        noMenus:
          'Lo sentimos, este restaurante no cuenta con ningún menú para ofrecerte.',
        openLocal: 'Local abierto',
        errorMessage:
          'Lo sentimos no podemos mostrarte la información sobre este restaurante en este momento.',
      },
      bottomBar: {
        cancel: 'Cancelar',
        previous: 'Anterior',
        next: 'Siguiente',
      },
      newDish: {
        title: 'Creación nuevo plato/ítem',
        category: 'Categoría',
        dishInformation: 'Información de plato/ítem',
        categories: 'Categorías',
        dishName: 'Nombre de plato/ítem',
        sellPrice: 'Precio de venta',
        dishImages: 'Imágenes del plato/ítem',
        dishIngredients: 'Ingredientes (opcional)',
        ingredient: 'Indique el ingrediente',
        addIngredient: '+ Agregar ingrediente',
        finish: 'Finalizar',
        cancel: 'Cancelar',
        create: 'Crear',
        modalTitle: 'Crear nueva categoría',
        modalInputPlaceholder: 'Nombre de categoría',
      },
      clientView: {
        location: '¿Como llegar?',
        menu: 'Menú',
        comments: 'Comentarios',
      },
      clientFilters: {
        filter: 'Filtros',
        maxDistance: 'Distancia máxima',
        foodType: 'Tipo de comida',
        priceRange: 'Rango de precio',
        priceRanges: 'Rango de precios',
        calification: 'Calificación',
        starsNumber: 'Cantidad de estrellas',
        applyFilters: 'Aplicar filtros',
        cleanFilters: 'Limpiar filtros',
      },
    },
  },
});
