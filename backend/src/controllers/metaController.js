import { categories, allCategoryTree, brands, popularTags, heroSlides } from "../config/staticData.js";

export function getCategories(req, res) {
  res.json({ categories, allCategoryTree, brands, popularTags });
}

export function getHeroSlides(req, res) {
  res.json(heroSlides);
}
