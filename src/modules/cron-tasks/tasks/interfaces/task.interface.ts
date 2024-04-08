
interface ITask {
    execute(...args: any): Promise<void>
}

export type { ITask }