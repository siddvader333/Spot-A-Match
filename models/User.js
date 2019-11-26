const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
	uniqueId: {
		type: String,
		required: true
	},
	authType: {
		type: String,
		default: 'spotify'
	},
	premiumStatus: {
		type: Boolean,
		default: false
	},
	roomsJoined: {
		type: Number,
		default: 0
	},
	roomsHosted: {
		type: Number,
		default: 0
	},
	sessionsJoined: {
		type: Number,
		default: 0
	}
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
