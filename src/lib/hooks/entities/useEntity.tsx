import { ENTITIES, Entity } from '@models/entities';

function useEntity() {
  const getColor = (value: Entity['value']) => {
    const entity = ENTITIES.find((entity) => entity.value === value);
    return entity?.color;
  };

  const getIcon = (value: Entity['value']) => {
    const entity = ENTITIES.find((entity) => entity.value === value);
    return entity?.value;
  };

  const getEntity = (value: Entity['value']) => {
    const entity = ENTITIES.find((entity) => entity.value === value);
    return entity;
  };

  return { getColor, getIcon, getEntity };
}
export default useEntity;
