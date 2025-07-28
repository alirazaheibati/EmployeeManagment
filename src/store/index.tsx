import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import {Employee, Address, Salary} from "@/Types"

interface EmployeeStore {
    employees: Employee[]
    addEmployee: (employee: Employee) => void
    updateEmployee: (id: number, data: Partial<Employee>) => void
    removeEmployee: (id: number) => void
    getEmployeeById: (id: number) => Employee | undefined
    addAddress: (employeeId: number, address: Address) => void
    removeAddress: (employeeId: number, addressId: number) => true | string;
    addSalary: (employeeId: number, salary: Salary) => void;
}

export const useEmployeeStore = create<EmployeeStore>()(
    persist(
        (set, get) => ({
            employees: [],

            addEmployee: (employee) =>
                set((state) => ({ employees: [...state.employees, employee] })),

            updateEmployee: (id, data) =>
                set((state) => ({
                    employees: state.employees.map((emp) =>
                        emp.id === id ? { ...emp, ...data } : emp
                    ),
                })),

            removeEmployee: (id) =>
                set((state) => ({
                    employees: state.employees.filter((emp) => emp.id !== id),
                })),

            getEmployeeById: (id) => get().employees.find((emp) => emp.id === id),

            addSalary: (employeeId, salary) =>
                set((state) => ({
                    employees: state.employees.map((emp) =>
                        emp.id === employeeId
                            ? { ...emp, salaries: [...(emp.salaries || []), salary] }
                            : emp
                    ),
                })),

            addAddress: (employeeId, address) =>
                set((state) => ({
                    employees: state.employees.map((emp) =>
                        emp.id === employeeId
                            ? { ...emp, addresses: [...(emp.addresses || []), address] }
                            : emp
                    ),
                })),
            removeAddress: (employeeId, addressId) => {
                const { employees } = get()
                const employee = employees.find(emp => emp.id === employeeId)
                if (!employee) return "کارمند پیدا نشد."
                if ((employee.addresses || []).length <= 1) {
                    return "کاربر باید حداقل یک آدرس داشته باشد."
                }
                const updatedEmployees = employees.map((emp) => {
                    if (emp.id !== employeeId) return emp
                    return {
                        ...emp,
                        addresses: emp.addresses.filter(addr => addr.id !== addressId)
                    }
                })
                set({ employees: updatedEmployees })
                return true
            }
        }),
        {
            name: 'employee-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
)

//
// import { create } from 'zustand'
// import { Employee } from "@/Types"
//
// interface EmployeeStore {
//     employees: Employee[]
//     addEmployee: (employee: Employee) => void
//     updateEmployee: (id: string, data: Partial<Employee>) => void
//     removeEmployee: (id: string) => void
// }
//
// const LOCAL_STORAGE_KEY = 'employee-storage'
//
// const getInitialEmployees = (): Employee[] => {
//     if (typeof window !== "undefined") {
//         const data = localStorage.getItem(LOCAL_STORAGE_KEY)
//         if (data) {
//             try {
//                 return JSON.parse(data)
//             } catch {
//                 return []
//             }
//         }
//     }
//     return []
// }
//
// export const useEmployeeStore = create<EmployeeStore>((set, get) => ({
//     employees: getInitialEmployees(),
//
//     addEmployee: (employee) => {
//         const updated = [...get().employees, employee]
//         set({ employees: updated })
//         localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated))
//     },
//
//     updateEmployee: (id, data) => {
//         const updated = get().employees.map((emp) =>
//             emp.id === Number(id) ? { ...emp, ...data } : emp
//         )
//         set({ employees: updated })
//         localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated))
//     },
//
//     removeEmployee: (id) => {
//         const updated = get().employees.filter((emp) => emp.id !== Number(id))
//         set({ employees: updated })
//         localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated))
//     }
// }))