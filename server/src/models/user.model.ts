import { DocumentType, getModelForClass, index, modelOptions, pre, prop } from '@typegoose/typegoose';

import bcrypt from 'bcryptjs';

export enum Role {
  RIDER = 'rider',
  DRIVER = 'driver',
  ADMIN = 'admin',
}

@index({ email: 1 })
@pre<User>('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
})
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class User {
  @prop({ required: true })
  name!: string;

  @prop({ unique: true, required: true })
  email!: string;

  @prop({ required: true, minlength: 8, maxLength: 32, select: false })
  password!: string;

  @prop({ default: 'rider', enum: Role })
  role!: string;

  async comparePasswords(hashedPassword: string, candidatePassword: string) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }
}

const userModel = getModelForClass(User);
export default userModel;
// const User = mongoose.model(
//   'User',
//   new mongoose.Schema({
//     email: {
//       type: String,
//       unique: true,
//     },
//     password: String,
//     role: {
//       type: String,
//       enum: ['rider', 'driver', 'admin'],
//       default: 'rider',
//     },
//   })
// );
