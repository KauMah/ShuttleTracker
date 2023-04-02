import { Ref, Severity, getModelForClass, index, modelOptions, prop } from '@typegoose/typegoose';

import { Stop } from './stop.model';
import { Types } from 'mongoose';

@index({ name: 1 }, { unique: true })
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class Route {
  @prop({ required: true })
  public name!: string;

  // @prop({ ref: () => Stop, type: () => [Stop] })
  // public stops: Ref<Stop>[];
  @prop({
    ref: () => Stop,
    foreignField: '_id',
    localField: 'stops',
    default: [],
    transform: (values: string[]) => {
      return values.map((value) => new Types.ObjectId(value));
    },
  })
  public stops: Ref<Stop>[];
}

const routeModel = getModelForClass(Route);

export default routeModel;
