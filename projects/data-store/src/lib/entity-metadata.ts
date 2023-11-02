import { EntityMetadataMap } from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
  Post: {},
  Comment: {}
};

const pluralNames = {};

export const entityConfig = {
  entityMetadata,
  pluralNames
};
