import React from 'react';

const BuyPremiumPage = () => {
  const handleCheckout = () => {
    // Redirect the user to the Stripe checkout URL
    window.location.href = 'https://buy.stripe.com/test_eVa294f3bbT25eUaEE';
  };

  return (
    <section className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Upgrade to Premium</h2>
      <p className="text-gray-700 mb-4">
        Unlock premium features and enjoy the most efficient and effective way to manage your todos. By subscribing to our premium plan, you'll get access to exclusive features and enhancements.
      </p>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">Premium Plan</h3>
        <h4 className="text-lg font-semibold text-green-600">₹500 / month</h4>
      </div>
      <p className="text-gray-600 mb-4">
        Subscribe now to experience premium features and enjoy an enhanced todo management experience. Click the button below to proceed with the payment.
      </p>
      <button
        onClick={handleCheckout}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all ease-in-out duration-300"
      >
        Buy Premium
      </button>
    </section>
  );
};

export default BuyPremiumPage;
