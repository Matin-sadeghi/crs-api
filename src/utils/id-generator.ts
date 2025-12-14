import moment from 'moment';

export const studentIdGenerator = (
  majorCode: string,
  lastStudentId?: string,
): string => {
  const lastStudentIdNumber = lastStudentId
    ? parseInt(lastStudentId.slice(-4))
    : 0;
  const currentYear: number = moment().year();
  return `${currentYear}${majorCode}${lastStudentIdNumber + 1}`;
};

export const adminIdGenerator = (lastAdminId?: string): string => {
  const lastAdminIdNumber = lastAdminId ? parseInt(lastAdminId.slice(-4)) : 0;
  const currentYear: number = moment().year();
  return `${currentYear}000${lastAdminIdNumber + 1}`;
};

export const professorIdGenerator = (lastProfessorId?: string): string => {
  const lastProfessorIdNumber = lastProfessorId
    ? parseInt(lastProfessorId.slice(-4))
    : 0;
  const currentYear: number = moment().year();
  return `${currentYear}111${lastProfessorIdNumber + 1}`;
};

export const facultyIdGenerator = (
  majorCode: string,
  lastFacultyId?: string,
): string => {
  const lastFacultyIdNumber = lastFacultyId
    ? parseInt(lastFacultyId.slice(-4))
    : 0;
  const currentYear: number = moment().year();
  return `${currentYear}${majorCode}${lastFacultyIdNumber + 1}`;
};

export const randomNumberStringGenerator = (length: number): string => {
  const digits = '0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += digits.charAt(Math.floor(Math.random() * digits.length));
  }
  return result;
};
