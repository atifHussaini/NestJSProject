import { Type, Static } from '@sinclair/typebox';

const PropertyId = Type.String({ minimum: 1 });
const PropertyAddress = Type.String({ minLength: 1, maxLength: 255 });
const PropertyRegionId = Type.String({ minLength: 1 });
const PropertyData = Type.Any();

export const CreatePropertyDTOSchema = Type.Object({
  address: PropertyAddress,
  regionId: PropertyRegionId,
  data: PropertyData,
});

export const UpdatePropertyDTOSchema = Type.Object({
  address: PropertyAddress,
  regionId: PropertyRegionId,
  data: PropertyData,
  id: PropertyId,
});

export type CreatePropertyDTO = Static<typeof CreatePropertyDTOSchema>;
export type UpdatePropertyDTO = Static<typeof UpdatePropertyDTOSchema>;
