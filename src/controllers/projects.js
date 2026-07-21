import { getUpcomingProjects, getProjectDetails } from "../models/projects.js";
import { getCategoriesByProjectId } from "../models/categories.js";

const NUMBER_OF_UPCOMING_PROJECTS = 5;

const showProjectsPage = async (req, res, next) => {
    try {
        const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
        const title = "Upcoming Service Projects";
        res.render("projects", { title, projects });
    } catch (error) {
        next(error);
    }
};

const showProjectDetailsPage = async (req, res, next) => {
    try {
        const { id } = req.params;
        const project = await getProjectDetails(id);
        const categories = await getCategoriesByProjectId(id);
        const title = "Project Details";
        res.render("project", { title, project, categories });
    } catch (error) {
        next(error);
    }
};

export { showProjectsPage, showProjectDetailsPage };