import { getModelForClass, index, modelOptions, prop } from '@typegoose/typegoose';

@index({ name: 1 }, { unique: true })
@index({ loc: '2dsphere' })
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Stop {
  @prop({ required: true })
  public name!: string;

  @prop({ type: Number, required: true })
  public loc!: [number];
}

const stopModel = getModelForClass(Stop);

export default stopModel;
