import React, { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className = '' }) => {
  return (
    <div className={`container ${className}`} style={{ maxWidth: '800px' }}>
      {children}
    </div>
  );
};

export default Container;