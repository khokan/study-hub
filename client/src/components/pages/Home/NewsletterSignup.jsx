const NewsletterSignup = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12  rounded-3xl bg-gradient-to-r from-primary to-blue-700 text-white text-center shadow-lg">
      <h2 className="text-3xl font-bold mb-4">Stay Updated!</h2>
      <p className="mb-6 text-sm md:text-base">
        Subscribe to our newsletter to get the latest courses and study sessions.
      </p>
      <form className="flex flex-col sm:flex-row justify-center gap-3 max-w-md mx-auto">
        <input
          type="email"
          placeholder="Your email"
          className="input input-bordered w-full sm:flex-1 text-black"
        />
        <button type="submit" className="btn btn-primary rounded-full px-6">
          Subscribe
        </button>
      </form>
    </section>
  );
};

export default NewsletterSignup;
