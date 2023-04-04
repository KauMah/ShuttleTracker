import { Ref, Severity, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';

import { GeoJSONPoint } from './stop.model';
import { Route } from './route.model';
import { User } from './user.model';

@modelOptions({
  schemaOptions: {
    timestamps: false,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class Shuttle {
  @prop({ required: true })
  capacity!: number;

  @prop({ default: 0 })
  occupancy: number;

  @prop({ ref: () => Route })
  route: Ref<Route>;

  @prop({ required: true })
  active!: boolean;

  @prop({ ref: () => User })
  driver: Ref<User>;

  @prop()
  public loc: GeoJSONPoint;
}

const shuttleModel = getModelForClass(Shuttle);

export default shuttleModel;
