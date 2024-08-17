import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <h1 className="text-center text-3xl p-4 font-bold" >Sign Up</h1>
        <div className="mb-5 mx-auto">
          <SignUp path="/signup" routing="path" signInUrl="/signin" />
        </div>
      </div>
    </div>
  );
}