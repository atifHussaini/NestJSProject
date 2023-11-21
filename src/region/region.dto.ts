import { Type, Static } from '@sinclair/typebox';

const RegionId = Type.String({ minimum: 1 });
const RegionName = Type.String({ minLength: 1, maxLength: 255 });
const RegionDescription = Type.String({ minLength: 1, maxLength: 255 });

export const CreateRegionDTOSchema = Type.Object({
  name: RegionName,
  description: RegionDescription,
});

export const UpdateRegionDTOSchema = Type.Object({
  name: RegionName,
  description: RegionDescription,
  id: RegionId,
});

export type CreateRegionDTO = Static<typeof CreateRegionDTOSchema>;
export type UpdateRegionDTO = Static<typeof UpdateRegionDTOSchema>;
