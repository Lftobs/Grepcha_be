module.exports = mongoose => {
    var schema = mongoose.Schema({
        username: {
            type: String,
            required: true,
            minLength: [4, 'Username should not be less than 4 '],
        },
        password: {
            type: String,
            required: true,
            minLength: [8, 'Password should not be less than 8 '],
        },
        token: {
            type: String,
        }
        

    }, { timestamps: true }
    )

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
      });

    const User = mongoose.model('users', schema)
    return User

}