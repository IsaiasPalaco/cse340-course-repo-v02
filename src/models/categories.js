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

export { getAllCategories };