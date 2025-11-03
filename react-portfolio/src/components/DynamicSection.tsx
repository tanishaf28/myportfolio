import React, { useEffect, useRef } from 'react';
import { useIntersection } from '../hooks/useIntersection';
import '../styles/animations.css';

interface DynamicSectionProps {
  title: string;
  content: string;
}

const DynamicSection: React.FC<DynamicSectionProps> = ({ title, content }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersection(sectionRef);

  useEffect(() => {
    if (isVisible) {
      sectionRef.current?.classList.add('fade-in');
    }
  }, [isVisible]);

  return (
    <div ref={sectionRef} className="dynamic-section">
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  );
};

export default DynamicSection;