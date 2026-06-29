import { DishTypes } from '#enums/dish_types'
import Dish from '#models/dish'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Dish.updateOrCreateMany('title', [
      // Entrées
      {
        title: 'Velouté de butternut et noisettes',
        type: DishTypes.STARTER,
        description: 'Velouté onctueux de butternut rôti, huile de noisette et croutons maison',
        photoPath: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80',
      },
      {
        title: 'Terrine de foie gras maison',
        type: DishTypes.STARTER,
        description: 'Terrine de foie gras de canard, chutney de figues et pain brioché toasté',
        photoPath: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80',
      },
      {
        title: 'Carpaccio de betterave au chèvre',
        type: DishTypes.STARTER,
        description:
          'Fines tranches de betterave crue, chèvre frais, graines de courge et vinaigrette balsamique',
        photoPath: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80',
      },
      {
        title: 'Verrines avocat-crevettes',
        type: DishTypes.STARTER,
        description: 'Guacamole maison, crevettes marinées aux agrumes et espuma de citron vert',
        photoPath: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=80',
      },
      {
        title: 'Tartare de saumon',
        type: DishTypes.STARTER,
        description: "Saumon Label Rouge coupé au couteau, câpres, échalotes et crème d'aneth",
        photoPath: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&q=80',
      },
      {
        title: 'Asperges blanches sauce hollandaise',
        type: DishTypes.STARTER,
        description: "Asperges blanches d'Aquitaine, sauce hollandaise maison et œuf mollet",
        photoPath: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80',
      },

      // Plats
      {
        title: 'Filet de bœuf bordelais',
        type: DishTypes.MAIN,
        description:
          'Filet de bœuf cuit à basse température, sauce bordelaise au vin rouge et pommes sarladaises',
        photoPath: 'https://images.unsplash.com/photo-1558030006-450675393462?w=400&q=80',
      },
      {
        title: 'Risotto truffe noire et champignons',
        type: DishTypes.MAIN,
        description:
          'Risotto crémeux aux champignons des bois et copeaux de truffe noire du Périgord',
        photoPath: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=400&q=80',
      },
      {
        title: 'Suprême de volaille fermière',
        type: DishTypes.MAIN,
        description:
          'Suprême de volaille farci aux herbes fraîches, jus de rôti et légumes de saison',
        photoPath: 'https://images.unsplash.com/photo-1432139509613-5c4255815697?w=400&q=80',
      },
      {
        title: "Gigot d'agneau rôti aux herbes",
        type: DishTypes.MAIN,
        description: "Gigot d'agneau de lait confit aux herbes de Provence, gratin dauphinois",
        photoPath: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=400&q=80',
      },
      {
        title: 'Dos de cabillaud et légumes printaniers',
        type: DishTypes.MAIN,
        description:
          'Dos de cabillaud vapeur, petits pois à la française et beurre blanc au citron',
        photoPath: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=400&q=80',
      },
      {
        title: 'Magret de canard aux cerises',
        type: DishTypes.MAIN,
        description:
          'Magret de canard du Sud-Ouest, sauce aux cerises Bigarreau et gratin de polenta',
        photoPath: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80',
      },

      // Desserts
      {
        title: 'Bûche chocolat praliné',
        type: DishTypes.DESSERT,
        description:
          'Bûche roulée chocolat noir et praliné noisette, décor meringue et éclats de caramel',
        photoPath: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80',
      },
      {
        title: 'Tarte tatin aux pommes',
        type: DishTypes.DESSERT,
        description:
          'Tarte tatin aux pommes golden caramélisées, crème fraîche épaisse et fleur de sel',
        photoPath: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80',
      },
      {
        title: 'Panna cotta vanille et fruits rouges',
        type: DishTypes.DESSERT,
        description:
          'Panna cotta à la vanille de Madagascar, coulis de fruits rouges et biscuit sablé',
        photoPath: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&q=80',
      },
      {
        title: 'Fondant au chocolat',
        type: DishTypes.DESSERT,
        description: 'Fondant coulant au chocolat Valrhona, glace vanille et caramel beurre salé',
        photoPath: 'https://images.unsplash.com/photo-1530062845289-9109b2c9c868?w=400&q=80',
      },
      {
        title: 'Millefeuille à la vanille',
        type: DishTypes.DESSERT,
        description: 'Feuilletage caramélisé maison, crème diplomate à la vanille Bourbon',
        photoPath: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=400&q=80',
      },
      {
        title: 'Mousse au citron meringuée',
        type: DishTypes.DESSERT,
        description: 'Mousse légère au citron de Menton, meringue italienne et zestes confits',
        photoPath: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400&q=80',
      },
    ])
  }
}
