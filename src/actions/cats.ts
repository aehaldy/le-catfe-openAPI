// Cats API Actions
import { CatApi } from '../sdk';
const catApi = new CatApi();

// GET all cats
export const getCats = async () => {
    try {
        const { data } = await catApi.getAllCats();
        return data;
      } catch (e) {
          console.error(e);
      }
}