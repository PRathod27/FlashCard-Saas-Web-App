import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return(
  <div className="flex justify-center items-center h-screen">
    <div>
      <h1 className="text-center text-3xl p-4 font-bold">Sign In</h1>
      <div className="mb-5 mx-auto">
        <SignIn path="/signin" routing="path" signUpUrl="/signup" />
      </div>
    </div>
  </div>
  )
}
