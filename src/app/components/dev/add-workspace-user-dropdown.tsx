import { fetchedUsers } from "@/app/data";
import { Icon } from "@iconify-icon/react";
import { useState } from "react";

export default function Page() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState(fetchedUsers);

  const filteredUsers = users.filter(
    (user) => !user.added && user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addedUsers = users.filter(
    (user) => user.added
  )

  const addUser = (userToAdd: any) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.name === userToAdd.name ? { ...user, added: true } : user
      )
    );
  };

  const deleteUser = (userToDelete: any) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.name === userToDelete.name ? { ...user, added: false } : user
      )
    );
  };

  return (
    <div className="relative">
      {/* User Circle Button */}
      <button type="button" className="appearance-none" onClick={() => setDropdownOpen((prev) => !prev)}>
        <Icon icon="solar:user-circle-linear" height={16} />
      </button>

      {/* Dropdown */}
      {dropdownOpen && (
        <div className="absolute top-[24px] w-[248px] bg-white border border-[#EBEEF2] rounded-[8px] shadow-md z-[100]" onClick={(e) => e.stopPropagation()}>
          {/* Search Input */}
          <div className="flex flex-col">
            <div className="flex p-[14px] items-center gap-[8px] self-stretch rounded-t-[8px] bg-[#F2F4F7]">
              <div>
                <Icon icon="solar:magnifer-linear" height={16} />
              </div>

              <div className="flex flex-1 items-center">
                <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="bg-[#F2F4F7] focus:outline-none" placeholder="Search user..." />
              </div>
            </div>
          </div>

          {/* User List */}
          <ul className="max-h-[160px] gap-[4px] overflow-y-auto">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <li key={index} className="flex items-center px-[14px] py-[8px] gap-[8px] cursor-pointer hover:bg-[#F9E9B8] last:rounded-b-[8px]" onClick={() => addUser(user)}>
                  <div className="flex items-center justify-center w-6 h-6 text-white bg-indigo-500 rounded-full">
                    {user.initial}
                  </div>
                  <span className="text-sm">{user.name}</span>
                </li>
              ))
            ) : (
              <li className="px-2 py-1 text-sm text-gray-500">No users found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
