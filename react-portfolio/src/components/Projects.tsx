import React from 'react';
import ProjectCard from './ProjectCard';

const projects = [
    {
        id: 1,
        title: 'Project One',
        description: 'This is a brief description of Project One.',
        image: 'path/to/image1.jpg',
        link: 'https://link-to-project-one.com'
    },
    {
        id: 2,
        title: 'Project Two',
        description: 'This is a brief description of Project Two.',
        image: 'path/to/image2.jpg',
        link: 'https://link-to-project-two.com'
    },
    {
        id: 3,
        title: 'Project Three',
        description: 'This is a brief description of Project Three.',
        image: 'path/to/image3.jpg',
        link: 'https://link-to-project-three.com'
    },
];

const Projects: React.FC = () => {
    return (
        <section id="projects" className="py-20">
            <h2 className="text-4xl font-bold text-center mb-10">My Projects</h2>
            <div className="flex flex-wrap justify-center">
                {projects.map(project => (
                    <ProjectCard 
                        key={project.id} 
                        title={project.title} 
                        description={project.description} 
                        image={project.image} 
                        link={project.link} 
                    />
                ))}
            </div>
        </section>
    );
};

export default Projects;