import React from 'react';
import { motion } from 'framer-motion';
import './Hero.css'; // Assuming you have a CSS file for additional styles

const Hero: React.FC = () => {
    return (
        <section className="hero">
            <motion.div
                className="hero-content"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="hero-title">Welcome to My Portfolio</h1>
                <p className="hero-description">
                    I am a passionate developer with a love for creating dynamic and engaging web applications.
                </p>
                <motion.button
                    className="hero-button"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    View My Work
                </motion.button>
            </motion.div>
        </section>
    );
};

export default Hero;