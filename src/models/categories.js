import db from './db.js';

/**
 * Busca todas as categorias cadastradas no banco de dados.
 * Retorna um Array de Objetos contendo o ID e o Nome de cada categoria.
 */
const getAllCategories = async () => {
    const query = `
        SELECT category_id, name 
        FROM public.category;
    `;
    const result = await db.query(query);
    return result.rows;
};

const getCategoryDetails = async (id) => {
    const query = `
        SELECT category_id, name
        FROM category
        WHERE category_id = $1;
    `;
    const queryParams = [id];
    const result = await db.query(query, queryParams);
    return result.rows.length > 0 ? result.rows[0] : null;
};

const getCategoriesByProjectId = async (projectId) => {
    const query = `
        SELECT c.category_id, c.name
        FROM category c
        INNER JOIN project_category pc ON c.category_id = pc.category_id
        WHERE pc.project_id = $1;
    `;
    const queryParams = [projectId];
    const result = await db.query(query, queryParams);
    return result.rows;
};

export { getAllCategories, getCategoryDetails, getCategoriesByProjectId };