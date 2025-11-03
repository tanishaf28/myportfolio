import React from 'react';
import './About.css'; // Assuming you have a CSS file for styling

const About: React.FC = () => {
    return (
        <section id="about" className="about-section">
            <h2>About Me</h2>
            <p>
                I am a passionate developer with a love for creating dynamic and engaging web applications. 
                My skills include JavaScript, React, TypeScript, and more. 
                I enjoy learning new technologies and applying them to solve real-world problems.
            </p>
            <h3>Skills</h3>
            <ul>
                <li>JavaScript</li>
                <li>React</li>
                <li>TypeScript</li>
                <li>CSS & HTML</li>
                <li>Node.js</li>
            </ul>
            <h3>Interests</h3>
            <p>
                In my free time, I love exploring new frameworks, contributing to open-source projects, 
                and sharing knowledge with the developer community.
            </p>
        </section>
    );
};

export default About;