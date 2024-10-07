import React from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { filters, userFilters } from "@/content/coupon/search-filter";
import SearchUser from "./search-user-list";
import { userListC } from "@/content/coupon/user";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Close } from "@radix-ui/react-dialog";
const UserList = ({ setFormData, formData }: any) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const handleSearch = (values: Record<string, string>) => {
    console.log("Search Values:", values);
  };
  return (
    <div className="border focus:border-gray-600 focus:border  px-2 py-2 flex items-center justify-between rounded-lg">
      <div className="flex justify-between gap-2 items-center">
        <div className="">
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.66"
              d="M28.4 6H19.6C11.3033 6 7.15492 6 4.57746 8.63604C2 11.2721 2 15.5147 2 24C2 32.4852 2 36.728 4.57746 39.364C7.15492 42 11.3033 42 19.6 42H28.4C36.6968 42 40.845 42 43.4226 39.364C46 36.728 46 32.4852 46 24C46 15.5147 46 11.2721 43.4226 8.63604C40.845 6 36.6968 6 28.4 6Z"
              fill="url(#paint0_linear_358_6961)"
            />
            <path
              d="M38.2568 16.066C38.9568 15.4827 39.0514 14.4422 38.468 13.7422C37.8846 13.0421 36.8442 12.9475 36.1442 13.5309L31.3946 17.4889C29.342 19.1993 27.917 20.383 26.714 21.1568C25.5494 21.9058 24.7596 22.1572 24.0004 22.1572C23.2412 22.1572 22.4516 21.9058 21.287 21.1568C20.0838 20.383 18.6588 19.1993 16.6063 17.4889L11.8567 13.5309C11.1567 12.9475 10.1162 13.0421 9.53286 13.7422C8.94948 14.4422 9.04408 15.4827 9.74412 16.066L14.5764 20.093C16.5264 21.718 18.1069 23.0352 19.5018 23.9322C20.955 24.8668 22.37 25.4572 24.0004 25.4572C25.6308 25.4572 27.046 24.8668 28.499 23.9322C29.894 23.0352 31.4744 21.718 33.4244 20.093L38.2568 16.066Z"
              fill="#434CE7"
            />
            <defs>
              <linearGradient
                id="paint0_linear_358_6961"
                x1="24"
                y1="6"
                x2="24"
                y2="42"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#7AD3FF" />
                <stop offset="1" stop-color="#4FBAF0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="flex items-start space-y-1 flex-col">
          <Dialog>
            <DialogTrigger asChild>
              <button>
                <h2 className="text-sm font-semibold underline">Users List</h2>
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[925px]">
              <DialogHeader>
                <DialogTitle>
                  Users whose Birthday falls in the September Month
                </DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <ScrollArea className="h-[60vh]">
                  <SearchUser filters={userFilters} onSearch={handleSearch} />
                  <UserListWithSelect
                    setFormData={setFormData}
                    formData={formData}
                  />
                </ScrollArea>
              </div>
              <DialogFooter>
                <Close
                  type="submit"
                  className="bg-[#316BEB] text-white text-sm px-4 py-2 rounded-lg font-medium"
                >
                  Save changes
                </Close>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <p className="text-xs font-medium">
            List of Users whose Anniversary falls in the month selected below
          </p>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <h1>Mail to Customer</h1>
        <Switch color="blue" id="airplane-mode" />
      </div>
    </div>
  );
};

export default UserList;

export const UserListWithSelect = ({ setFormData, formData }: any) => {
  return (
    <div className="px-4">
      {userListC.map((user: any) => (
        <div className="border mt-3 rounded-xl" key={user._id}>
          <div className="bg-[#F2F2F3] rounded-t-xl justify-between px-4 flex items-center text-[#4A5367] gap-3 py-2">
            <div className="flex items-center gap-2">
              <input
                onChange={(e) => {
                  if (e.target.checked) {
                    // Add user ID to the array
                    setFormData({
                      ...formData,
                      userIds: [...(formData.userIds || []), user._id], // Ensure `userIds` is an array
                    });
                  } else {
                    // Remove user ID from the array
                    setFormData({
                      ...formData,
                      userIds: formData.userIds.filter(
                        (id: string) => id !== user._id
                      ),
                    });
                  }
                }}
                type="checkbox"
                className="border rounded-2xl border-gray-100"
                name={user._id}
                id={user._id}
                checked={formData.userIds?.includes(user._id)} // Keep the checkbox checked if the ID is in the array
              />
              <h2 className="text-sm font-semibold">
                {user.userInfo[0].custName} {user.userInfo[0].custLastName}
              </h2>
            </div>
            <div className="">
              <h1 className="text-sm font-semibold">
                Account Status:{" "}
                <span className="text-sm font-medium">
                  {user?.userInfo[0]?.status}
                </span>
              </h1>
            </div>
          </div>
          <div className="px-4 text-sm text-[#4A5367] font-medium py-4">
            <p className="flex flex-col">
              <span className="font-semibold">Address</span>{" "}
              <span className="pl-4">
                <br />
                {user.shipAddr[0].addr1}, <br /> {user.shipAddr[0].state},{" "}
                <br /> {user.shipAddr[0].city},
                <br /> {user.shipAddr[0].countryName}, <br />{" "}
                {user.shipAddr[0].zip}
              </span>
            </p>
            <br />
            <p className="gap-2 flex">
              <span className="font-semibold">Ph:</span>
              {user.userInfo[0].phone}
            </p>
            <p className="gap-2 flex">
              <span className="font-semibold">Email:</span>
              {user.userId}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
