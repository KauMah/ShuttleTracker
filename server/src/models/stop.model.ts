import { Severity, getModelForClass, index, modelOptions, prop } from '@typegoose/typegoose';

import { TimeSeriesBucketTimestamp } from 'redis';

interface GeoJSONPoint {
  type: 'Point';
  coordinates: [number, number];
}
@index({ name: 1 }, { unique: true })
@index({ loc: '2dsphere' })
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class Stop {
  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public loc!: GeoJSONPoint;
}

const stopModel = getModelForClass(Stop);

export default stopModel;
