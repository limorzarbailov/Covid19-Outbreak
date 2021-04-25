import { ActionType } from 'angular-cesium';
import { IEntity } from './entity';

export interface IMapEntity {
  id: string;
  entity: IEntity;
  actionType: ActionType;
  
}