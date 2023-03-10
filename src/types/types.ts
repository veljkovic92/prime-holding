export type Employee = {
  id: string;
  name: string;
  email: string;
  phoneNumber?: number;
  dateOfBirth?: string;
  monthlySalary?: number;
};

export type UpdateEmployee = Omit<Employee, 'id'>

export type Task = {
  title: string;
  description: string;
  assignee: string;
  date: Date;
}