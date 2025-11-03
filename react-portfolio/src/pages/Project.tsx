import React from 'react';
import { useParams } from 'react-router-dom';
import DynamicSection from '../components/DynamicSection';
import ProjectCard from '../components/ProjectCard';

const Project = () => {
    const { projectId } = useParams();

    // Sample project data, ideally this would come from an API or a data file
    const projects = [
        {
            id: '1',
            title: 'Project One',
            description: 'Description of Project One',
            technologies: ['React', 'TypeScript', 'CSS'],
            link: 'https://example.com/project-one',
        },
        {
            id: '2',
            title: 'Project Two',
            description: 'Description of Project Two',
            technologies: ['Node.js', 'Express', 'MongoDB'],
            link: 'https://example.com/project-two',
        },
    ];

    const project = projects.find(p => p.id === projectId);

    return (
        <div className="project-page">
            {project ? (
                <>
                    <h1>{project.title}</h1>
                    <p>{project.description}</p>
                    <h2>Technologies Used</h2>
                    <ul>
                        {project.technologies.map(tech => (
                            <li key={tech}>{tech}</li>
                        ))}
                    </ul>
                    <a href={project.link} target="_blank" rel="noopener noreferrer">View Project</a>
                </>
            ) : (
                <p>Project not found.</p>
            )}
            <DynamicSection />
            <ProjectCard project={project} />
        </div>
    );
};

export default Project;