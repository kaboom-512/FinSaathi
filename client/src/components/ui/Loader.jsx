import React from 'react';

const Loader = ({ size = 'md', className = '' }) => {
  const sizeMap = {
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem'
  };

  const style = {
    display: 'inline-block',
    width: sizeMap[size] || sizeMap.md,
    height: sizeMap[size] || sizeMap.md,
    border: '2px solid var(--color-border)',
    borderRightColor: 'var(--color-primary)',
    borderRadius: '50%',
    animation: 'spin 0.75s linear infinite'
  };

  return <span style={style} className={className} role="status" aria-label="Loading..." />;
};

export default Loader;
