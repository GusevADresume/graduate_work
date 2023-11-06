import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";

const useAuth = create(
  devtools(
    persist(
      (set, get) => ({
        auth: { status: false, is_staff: false, id: 0 },
        setAuth: (status, is_staff, id) =>
          set((state) => {
            return { auth: { status: status, is_staff: is_staff, id: id } };
          }),
      }),
      { name: "auth-storage", storage: createJSONStorage(() => sessionStorage) }
    )
  )
);

const useRequestedUserId = create(
  devtools(
    persist(
      (set, get) => ({
        OwnerId: [],
        setId: (id) =>
          set((state) => {
            return { OwnerId: [id] };
          }),
      }),
      { name: "OwnerId", storage: createJSONStorage(() => sessionStorage) }
    )
  )
);

const useFileStore = create(
  devtools(
    persist(
      (set, get) => ({
        fileStore: [],
        setFileStore: (fileString) =>
          set((state) => {
            return { fileStore: [...get().fileStore, fileString] };
          }),
        error: [],
        fetchFiles: async (id) => {
          let myHeaders = new Headers();
          myHeaders.append(
            "X-CSRFToken",
            document.cookie.split("=")[document.cookie.split("=").length - 1]
          );
          const options = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
          };
          try {
            if (id != undefined) {
              const response = await fetch(`/storage/${id}/`, options);
              if (!response.ok) throw new Error("Failed to files fetch");
              const result = await response.json();
              set({ fileStore: await result[0].file });
            } else {
              const response = await fetch("/files/", options);
              if (!response.ok) throw new Error("Failed to files fetch");
              set({ fileStore: await response.json() });
            }
          } catch (error) {
            console.log(error);
          }
        },
      }),
      { name: "file-storage", storage: createJSONStorage(() => sessionStorage) }
    )
  )
);

const useUsersList = create(
  devtools(
    persist(
      (set, get) => ({
        usersStore: [],
        setUsersStore: (userString) =>
          set((state) => {
            return { usersStore: [...get().usersStore, userString] };
          }),
        error: [],
        fetchUsers: async () => {
          let myHeaders = new Headers();
          myHeaders.append(
            "X-CSRFToken",
            document.cookie.split("=")[document.cookie.split("=").length - 1]
          );
          const options = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
          };
          try {
            const response = await fetch("/users-list/", options);
            if (!response.ok) throw new Error("Failed to users fetch");
            set({ usersStore: await response.json() });
          } catch (error) {}
        },
      }),
      {
        name: "users-storage",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);

export { useAuth, useFileStore, useUsersList, useRequestedUserId };
