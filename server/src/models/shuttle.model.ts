import { Ref, modelOptions, prop } from '@typegoose/typegoose';

import { GeoJSONPoint } from './stop.model';
import { Route } from './route.model';
import { User } from './user.model';

@modelOptions({
  schemaOptions: {
    timestamps: false,
  },
})
export class Shuttle {
  @prop({ required: true })
  capacity!: number;

  @prop({ ref: () => Route })
  route: Ref<Route>;

  @prop({ required: true })
  active!: boolean;

  @prop({ required: true, ref: () => User })
  driver!: Ref<User>;

  @prop()
  public loc: GeoJSONPoint;
}
