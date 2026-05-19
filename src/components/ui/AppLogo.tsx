'use client';

import React, { memo, useMemo } from 'react';
import AppImage from './AppImage';

interface AppLogoProps {
  src?: string;
  size?: number;
  className?: string;
  onClick?: () => void;
}

const AppLogo = memo(function AppLogo({
  src = '/assets/images/image-1779177091981.png',
  size = 64,
  className = '',
  onClick,
}: AppLogoProps) {
  const containerClassName = useMemo(() => {
    const classes = ['flex items-center'];
    if (onClick) classes.push('cursor-pointer hover:opacity-80 transition-opacity');
    if (className) classes.push(className);
    return classes.join(' ');
  }, [onClick, className]);

  return (
    <div className={containerClassName} onClick={onClick}>
      <AppImage
        src={src}
        alt="T5-Services logo — fond noir, T5 blanc esquissé, texte doré TEAM FIVE SERVICES"
        width={size}
        height={size}
        className="flex-shrink-0 rounded-lg object-cover"
        priority={true}
        unoptimized={false}
      />
    </div>
  );
});

export default AppLogo;
