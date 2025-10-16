import React, { useEffect, useState } from 'react';
import './SuccessAnimation.css';

const SuccessAnimation: React.FC = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1800); // Hide after 1.8s
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="success-animation-apple">
      <svg className="circle-svg" viewBox="0 0 120 120">
        <circle className="circle-bg" cx="60" cy="60" r="54" />
        <circle className="circle-fill" cx="60" cy="60" r="54" />
        <path className="checkmark" d="M40 60 L55 75 L80 50" />
      </svg>
    </div>
  );
};

export default SuccessAnimation;
