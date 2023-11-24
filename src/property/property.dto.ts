import { Type, Static } from '@sinclair/typebox';

const PropertyId = Type.String({ minLength: 1 });
const PropertyAddress = Type.String({ minLength: 1, maxLength: 255 });
const PropertyRegionId = Type.String({ minLength: 1 });
const PropertyData = Type.Any();

export const CreatePropertyDTOSchema = Type.Object({
  address: PropertyAddress,
  regionId: PropertyRegionId,
  data: PropertyData,
});

export const UpdatePropertyDTOSchema = Type.Object({
  address: Type.Optional(PropertyAddress),
  regionId: Type.Optional(PropertyRegionId),
  data: Type.Optional(PropertyData),
  id: PropertyId,
});

export type CreatePropertyDTO = Static<typeof CreatePropertyDTOSchema>;
export type UpdatePropertyDTO = Static<typeof UpdatePropertyDTOSchema>;
