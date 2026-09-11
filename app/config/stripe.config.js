module.exports = {
  SECRET_KEY: process.env.STRIPE_SECRET_KEY || "sk_test_dummy_key",
  PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY || "pk_test_dummy_key"
};