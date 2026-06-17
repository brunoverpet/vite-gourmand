import { DishTypes } from '#enums/dish_types'
import Dish from '#models/dish'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Dish.updateOrCreateMany('title', [
      {
        title: 'Velouté de butternut et noisettes',
        type: DishTypes.STARTER,
        description: 'Velouté onctueux de butternut rôti, huile de noisette et croutons maison',
        photoUrl: 'https://placehold.co/600x400',
      },
      {
        title: 'Velouté de butternut et noisettes',
        type: DishTypes.STARTER,
        description:
          'Fines tranches de betterave crue, chèvre frais, graines de courge et vinaigrette balsamique',
        photoUrl: 'https://placehold.co/600x400',
      },
      {
        title: 'Terrine de foie gras',
        type: DishTypes.STARTER,
        description:
          'Terrine de foie gras de canard maison, chutney de figues et pain brioché toasté',
        photoUrl: 'https://placehold.co/600x400',
      },
      {
        title: 'Filet de bœuf bordelais',
        type: DishTypes.MAIN,
        description:
          'Filet de bœuf cuit à basse température, sauce bordelaise au vin rouge et pommes sarladaises',
        photoUrl: 'https://placehold.co/600x400',
      },
      {
        title: 'Risotto truffe noire',
        type: DishTypes.MAIN,
        description:
          'Risotto crémeux aux champignons des bois et copeaux de truffe noire du Périgord',
        photoUrl: 'https://placehold.co/600x400',
      },
      {
        title: 'Suprême de volaille',
        type: DishTypes.MAIN,
        description:
          'Suprême de volaille fermière farci aux herbes fraîches, jus de rôti et légumes de saison',
        photoUrl: 'https://placehold.co/600x400',
      },
      {
        title: 'Bûche chocolat praliné',
        type: DishTypes.DESSERT,
        description:
          'Bûche roulée chocolat noir et praliné noisette, décor meringue et éclats de caramel',
        photoUrl: 'https://placehold.co/600x400',
      },
      {
        title: 'Tarte tatin',
        type: DishTypes.DESSERT,
        description:
          'Tarte tatin aux pommes golden caramélisées, crème fraîche épaisse et fleur de sel',
        photoUrl: 'https://placehold.co/600x400',
      },
      {
        title: 'Panna cotta vanille',
        type: DishTypes.DESSERT,
        description:
          'Panna cotta à la vanille de Madagascar, coulis de fruits rouges et biscuit sablé',
        photoUrl: 'https://placehold.co/600x400',
      },
    ])
  }
}
