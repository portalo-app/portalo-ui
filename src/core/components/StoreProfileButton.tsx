import { Button } from '@core/ui/Button';
import { motion } from 'framer-motion';
import React, { useState } from 'react';

const StoreProfileButton: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    // Simula una acción de carga con un timeout de 3 segundos
    setTimeout(() => {
      setIsLoading(false);
      // Aquí puedes agregar la lógica para almacenar el perfil
      console.log('Store Profile action completed');
    }, 3000); // Simula una carga de 3 segundos
  };

  return (
    <Button onClick={handleClick} className="flex gap-2 rounded-xl w-full">
      {isLoading ? (
        <motion.div
          className="loader"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <div className="w-6 h-6 border-4 border-dashed border-t-transparent border-blue-500 rounded-full"></div>
        </motion.div>
      ) : (
        'Store Profile'
      )}
    </Button>
  );
};

export default StoreProfileButton;
