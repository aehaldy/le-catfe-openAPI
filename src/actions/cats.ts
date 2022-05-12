// Cats API Actions
import { CatApi } from '../sdk';
const menuApi = new CatApi();

// GET all cats
export const getCats = async () => {
    try {
        const { data } = await menuApi.getAllCats();
        return data;
      } catch (e) {
          console.error(e);
      }
}