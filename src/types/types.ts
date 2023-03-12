export type Employee = {
  id: string;
  name: string;
  email: string;
  phoneNumber?: number;
  dateOfBirth?: string;
  monthlySalary?: number;
  tasks?: Task[];
  
};

export type UpdateEmployee = Omit<Employee, "id">;

export type Task = {
  id: string;
  title: string;
  description: string;
  date: Date;
  completed: boolean;
};

export type LayoutProps = {
  children?: React.ReactNode;
};