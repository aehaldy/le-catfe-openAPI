// Cats API Actions
import { CatApi, NewReview } from '../sdk';
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

// POST cat review
export const createCatReview = async (req: NewReview) => {
    try {
        const { status } = await catApi.postCatReview(req);
        if (status === 201) console.log("Thank you for your review!")
      } catch (e) {
          console.error(e);
      }
}