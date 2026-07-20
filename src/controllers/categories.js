import { getAllCategories } from "../models/categories.js";

const showCategoriesPage = async (req, res, next) => {
        const categories = await getAllCategories();
        const title = "Service Categories";
        res.render("categories", { title, categories });
};

export { showCategoriesPage };