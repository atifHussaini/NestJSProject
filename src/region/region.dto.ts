import { Type, Static } from '@sinclair/typebox';

const RegionId = Type.String({ minimum: 1 });
const RegionName = Type.String({ minLength: 1, maxLength: 255 });
const RegionDescription = Type.String({ minLength: 1, maxLength: 255 });

const CreateRegionDTO = Type.Object({
  name: RegionName,
  description: RegionDescription,
});

const UpdateRegionDTO = Type.Object({
  name: RegionName,
  description: RegionDescription,
  id: RegionId,
});

export { CreateRegionDTO, UpdateRegionDTO };

export type CreateRegionDTO = Static<typeof CreateRegionDTO>;
export type UpdateRegionDTO = Static<typeof UpdateRegionDTO>;

// export interface RegionUpdatePayload {
//   name?: string;
//   description?: string;
// }

// export interface RegionCreatePayload {
//   name: string;
//   description: string;
// }
