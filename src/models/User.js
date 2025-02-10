const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 40
  },
  name: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// 사용자 찾기 메서드
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email });
};

// 사용자 생성 메서드
userSchema.statics.createUser = function(email, name) {
  return this.create({ email, name });
};

// 사용자 이름 업데이트 메서드
userSchema.statics.updateName = function(email, name) {
  return this.findOneAndUpdate({ email }, { name }, { new: true });
};

const User = mongoose.model('User', userSchema);

module.exports = User;
