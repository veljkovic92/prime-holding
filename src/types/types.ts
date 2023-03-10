export type Employee = {
  id: string;
  name: string;
  email: string;
  phoneNumber?: number;
  dateOfBirth?: string;
  monthlySalary?: number;
};

export type Task = {
  title: string;
  description: string;
  assignee: string;
  date: Date;
}