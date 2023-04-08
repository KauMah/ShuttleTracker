import { Ref, Severity, getModelForClass, index, modelOptions, prop } from '@typegoose/typegoose';

import { Stop } from './stop.model';

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
    default: [],
    required: true,
  })
  public stops!: Ref<Stop>[];
}

const routeModel = getModelForClass(Route);

export default routeModel;
