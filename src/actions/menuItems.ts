// Menu Items API Actions
import { MenuItemApi } from '../sdk';
const menuApi = new MenuItemApi();

// GET all menu items
export const getMenuItems = async () => {
    try {
        const { data } = await menuApi.getAllMenuItems();
        return data;
      } catch (e) {
          console.error(e);
      }
}
 