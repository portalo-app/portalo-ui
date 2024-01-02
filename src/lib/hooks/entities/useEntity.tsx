import { ENTITIES, Entity } from '@models/entities';

/**
 * hook for handling entities.
 * @returns functions to retrieve information about entities.
 */
const useEntity = () => {
  /**
   * Gets the color of an entity based on its value.
   * @param value - The value of the entity.
   * @returns The color of the entity.
   */
  const getColor = (value: Entity['value']) => {
    const entity = ENTITIES.find((entity) => entity.value === value);
    return entity?.color;
  };
  /**
   * Gets the icon of an entity based on its value.
   * @param value - The value of the entity.
   * @returns The icon of the entity.
   */
  const getIcon = (value: Entity['value']) => {
    const entity = ENTITIES.find((entity) => entity.value === value);
    return entity?.value;
  };
  /**
   * Gets the entity based on its value.
   * @param value - The value of the entity.
   * @returns The entity.
   */
  const getEntity = (value: Entity['value']) => {
    const entity = ENTITIES.find((entity) => entity.value === value);
    return entity;
  };

  return { getColor, getIcon, getEntity };
};

export default useEntity;
