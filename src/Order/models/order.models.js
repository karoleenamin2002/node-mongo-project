import mongoose from"mongoose"
const orderschema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
         required: true,
    },
    items: [
          {
            product: {
              type: mongoose.Types.ObjectId,
              ref: "Product", 
              required: true,
            },
            quantity: {
              type: Number,
              default: 1,
            },
          },
        ],
        status: {
    type: String,
    enum: ["PENDING", "PROCESSING", "DELIVERED"], 
    default: "PENDING", 
  },
   address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },

}, { timestamps: true });

export const orderModel = mongoose.model("Order", orderschema)