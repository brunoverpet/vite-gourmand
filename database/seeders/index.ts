import AllergenSeeder from '#database/seeders/allergen_seeder'
import DietSeeder from '#database/seeders/diet_seeder'
import DishAllergenSeeder from '#database/seeders/dish_allergen_seeder'
import DishMenuSeeder from '#database/seeders/dish_menu_seeder'
import DishSeeder from '#database/seeders/dish_seeder'
import MenuExtraSeeder from '#database/seeders/menu_extra_seeder'
import RoleSeeder from '#database/seeders/role_seeder'
import ThemeSeeder from '#database/seeders/theme_seeder'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class IndexSeeder extends BaseSeeder {
  static environment = ['development', 'testing']

  async run() {
    await new RoleSeeder(this.client).run()
    await new DietSeeder(this.client).run()
    await new ThemeSeeder(this.client).run()
    await new AllergenSeeder(this.client).run()
    await new DishSeeder(this.client).run()
    await new MenuExtraSeeder(this.client).run()
    await new DishMenuSeeder(this.client).run()
    await new DishAllergenSeeder(this.client).run()
  }
}
