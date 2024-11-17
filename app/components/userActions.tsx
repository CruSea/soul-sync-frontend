import { SignInButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";

const UserActions = () => (
  <div className="flex gap-6 items-center">
    {/* Chat Icon */}
    <svg className="cursor-pointer" width="30" height="30" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M7 7.75C6.40326 7.75 5.83097 7.98705 5.40901 8.40901C4.98705 8.83097 4.75 9.40326 4.75 10V21.1893L7.46967 18.4697C7.61032 18.329 7.80109 18.25 8 18.25H17C17.5967 18.25 18.169 18.0129 18.591 17.591C19.0129 17.169 19.25 16.5967 19.25 16V10C19.25 9.40326 19.0129 8.83097 18.591 8.40901C18.169 7.98705 17.5967 7.75 17 7.75H7ZM4.34835 7.34835C5.05161 6.64509 6.00544 6.25 7 6.25H17C17.9946 6.25 18.9484 6.64509 19.6516 7.34835C20.3549 8.05161 20.75 9.00544 20.75 10V16C20.75 16.9946 20.3549 17.9484 19.6516 18.6517C18.9484 19.3549 17.9946 19.75 17 19.75H8.31066L4.53033 23.5303C4.31583 23.7448 3.99324 23.809 3.71299 23.6929C3.43273 23.5768 3.25 23.3033 3.25 23V10C3.25 9.00544 3.64509 8.05161 4.34835 7.34835Z" fill="#111827" />
      <path fill-rule="evenodd" clip-rule="evenodd" d="M7.25 11C7.25 10.5858 7.58579 10.25 8 10.25H16C16.4142 10.25 16.75 10.5858 16.75 11C16.75 11.4142 16.4142 11.75 16 11.75H8C7.58579 11.75 7.25 11.4142 7.25 11Z" fill="#111827" />
      <path fill-rule="evenodd" clip-rule="evenodd" d="M7.25 15C7.25 14.5858 7.58579 14.25 8 14.25H14C14.4142 14.25 14.75 14.5858 14.75 15C14.75 15.4142 14.4142 15.75 14 15.75H8C7.58579 15.75 7.25 15.4142 7.25 15Z" fill="#111827" />
      <rect x="15" y="1" width="10" height="10" rx="5" fill="#E03137" />
      <rect x="15" y="1" width="10" height="10" rx="5" stroke="white" strokeWidth="2" />
    </svg>

    <SignedOut>
      <div className="font-semibold text-lg">
        <SignInButton mode="modal" />
      </div>
    </SignedOut>

    <SignedIn>
      <div className="w-16 h-16 flex items-center justify-center">
        <UserButton
          appearance={{
            elements: {
              userButtonAvatarBox: "w-12 h-12", // Adjust avatar size
              userButtonOuter: "w-14 h-14", // Adjust button container size
            },
          }}
        />
      </div>
    </SignedIn>
  </div>
);

export default UserActions;