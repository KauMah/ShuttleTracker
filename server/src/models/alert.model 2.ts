import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Alert {
  @prop({ required: true })
  title!: string;

  @prop({ required: true })
  message!: string;

  @prop({ required: true, type: Date })
  expiresAt!: Date;
}

const alertModel = getModelForClass(Alert);

export default alertModel;
