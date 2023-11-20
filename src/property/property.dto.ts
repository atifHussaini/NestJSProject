import { Type, Static } from '@sinclair/typebox';

const PropertyId = Type.String({ minimum: 1 });
const PropertyAddress = Type.String({ minLength: 1, maxLength: 255 });
const PropertyRegionId = Type.String({ minLength: 1 });
const PropertyData = Type.Any();

const CreatePropertyDTO = Type.Object({
  address: PropertyAddress,
  regionId: PropertyRegionId,
  data: PropertyData,
});

const UpdatePropertyDTO = Type.Object({
  address: PropertyAddress,
  regionId: PropertyRegionId,
  data: PropertyData,
  id: PropertyId,
});

export { CreatePropertyDTO, UpdatePropertyDTO };

export type CreatePropertyDTO = Static<typeof CreatePropertyDTO>;
export type UpdatePropertyDTO = Static<typeof UpdatePropertyDTO>;

// export interface PropertyUpdatePayload {
//   address?: string;
//   data?: Record<any, any>;
//   regionId?: string;
// }

// export interface PropertyCreatePayLoad {
//   address: string;
//   data: Record<any, any>;
//   regionId: string;
// }
