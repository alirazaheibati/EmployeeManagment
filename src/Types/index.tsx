export type Address = {
    id: number
    label: string
    value: string
}

export type Salary = {
    id: number
    base: number
    bonus: number
    penalty: number
}

export type Employee = {
    id: number
    firstName: string
    lastName: string
    phone: string
    addresses: Address[]
    salaries: Salary[]
}