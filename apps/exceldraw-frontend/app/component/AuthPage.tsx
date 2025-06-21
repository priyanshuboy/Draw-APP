interface AuthPageProps {
  isSignin: boolean;
}

export default function AuthPage({ isSignin }: AuthPageProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        {isSignin ? "Sign In" : "Create an Account"}
      </h2>

      <form className="space-y-4">
        {!isSignin && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              placeholder="john_doe"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition duration-200"
        >
          {isSignin ? "Sign In" : "Sign Up"}
        </button>
      </form>

      <p className="text-sm text-center text-gray-600 mt-6">
        {isSignin ? (
          <>
            Don’t have an account?{" "}
            <a href="/signup" className="text-black font-semibold hover:underline">
              Sign up
            </a>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <a href="/signin" className="text-black font-semibold hover:underline">
              Sign in
            </a>
          </>
        )}
      </p>
    </div>
  );
}
