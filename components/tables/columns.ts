export type User = {
    id: number
    name: string
    email: string
    role: "admin" | "user" | "manager"
  }
  
  export const columns = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Role",
    },
  ]