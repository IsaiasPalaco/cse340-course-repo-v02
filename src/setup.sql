INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');

-- 1. CRIAÇÃO DA TABELA DE PROJETOS
CREATE TABLE project (
    project_id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(150) NOT NULL,
    date DATE NOT NULL,
    -- Relacionamento: Vincula o ID daqui ao ID da tabela organization
    CONSTRAINT fk_organization 
        FOREIGN KEY (organization_id) 
        REFERENCES organization(organization_id)
        ON DELETE CASCADE
);

-- 2. INSERÇÃO DE DADOS DE TESTE (15 Projetos distribuídos por 3 Organizações)
-- Nota: Certifique-se de que os IDs 1, 2 e 3 existem na sua tabela organization.
INSERT INTO project (organization_id, title, description, location, date) VALUES
-- Projetos da Org 1
(1, 'Community Clean Up', 'Cleaning local parks and planting trees.', 'Central Park', '2026-08-15'),
(1, 'Tech Literacy for Elders', 'Teaching basic computer skills to senior citizens.', 'Community Center', '2026-08-22'),
(1, 'Food Drive Sorting', 'Sorting and packing food donations for local shelters.', 'Downtown Warehouse', '2026-09-05'),
(1, 'Youth Mentorship Launch', 'After-school tutoring program kick-off.', 'Public Library', '2026-09-12'),
(1, 'Winter Clothing Drive', 'Collecting and distributing jackets and blankets.', 'City Square', '2026-10-01'),

-- Projetos da Org 2
(2, 'Urban Gardening Workshop', 'Teaching sustainable food growth in tight spaces.', 'Greenhouse Hub', '2026-08-18'),
(2, 'Riverbank Restoration', 'Planting native shrubs to prevent soil erosion.', 'East River Trail', '2026-08-29'),
(2, 'Composting Seminar', 'How to turn food waste into nutrient-rich soil.', 'Eco Park', '2026-09-19'),
(2, 'Seed Distribution Day', 'Handing out free organic seeds to neighbors.', 'Farmer Market', '2026-09-26'),
(2, 'Pollinator Garden Setup', 'Building bee and butterfly friendly spaces.', 'North Suburb', '2026-10-10'),

-- Projetos da Org 3
(3, 'Soup Kitchen Volunteering', 'Preparing and serving hot meals to families.', 'Hope Shelter', '2026-08-20'),
(3, 'Back-to-School Supply Pack', 'Filling backpacks with stationary for kids.', 'Civic Hall', '2026-08-27'),
(3, 'Blood Donation Drive', 'Coordinating mobile blood donation stations.', 'Red Cross Center', '2026-09-15'),
(3, 'Homeless Shelter Painting', 'Refreshing the interior walls of the local shelter.', 'Hope Shelter', '2026-10-05'),
(3, 'Toy Drive Wrapping Event', 'Wrapping gifts for children during the holidays.', 'Civic Hall', '2026-11-20');

-- 3. CRIAÇÃO DA TABELA DE CATEGORIAS
CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- 4. INSERÇÃO DE DADOS DE TESTE PARA CATEGORIAS
INSERT INTO category (name) VALUES
('Environment & Sustainability'),
('Education & Literacy'),
('Human Services & Community'),
('Health & Wellness'),
('Disaster Relief');

-- 5. CRIAÇÃO DA TABELA DE RELACIONAMENTO ENTRE PROJETOS E CATEGORIAS
CREATE TABLE project_category (
    project_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    
    CONSTRAINT fk_project
        FOREIGN KEY (project_id)
        REFERENCES project(project_id)
        ON DELETE CASCADE,
    
    CONSTRAINT fk_category
        FOREIGN KEY (category_id)
        REFERENCES category(category_id)
        ON DELETE CASCADE,
    
    PRIMARY KEY (project_id, category_id)
);

-- 6. INSERÇÃO DE DADOS DE RELACIONAMENTO ENTRE PROJETOS E CATEGORIAS
INSERT INTO project_category (project_id, category_id) VALUES
(1, 1),
(1, 3),
(2, 2),
(2, 3),
(3, 3),
(3, 5),
(4, 2),
(5, 3),
(5, 5),
(6, 1),
(6, 2),
(7, 1),
(8, 1),
(8, 2),
(9, 1),
(10, 1),
(11, 3),
(11, 4),
(12, 2),
(12, 3),
(13, 4),
(13, 5),
(14, 3),
(15, 3);