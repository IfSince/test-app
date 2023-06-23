export interface ButtonProps {
    level?: 'primary' | 'secondary' | 'delete'
    size?: 'small' | 'medium'
    action: (...args: any[]) => unknown | string
}