import AuthPage from "../component/AuthPage";

export default function SignInPage() {
  const currentYear = new Date().getFullYear();

  return (
    <main className="bg-gradient-to-br from-gray-900 via-black to-gray-800 h-screen text-white px-4 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col items-center justify-center h-full gap-10 text-center px-4">
        <h1 className="text-4xl sm:text-5xl font-bold">
          Welcome Back
        </h1>

        <AuthPage isSignin={true} />
      </div>

      <footer className="text-sm text-gray-400 text-center absolute bottom-4 left-0 right-0">
        © {currentYear} DrawApp. All rights reserved.
      </footer>
    </main>
  );
}
