import { useForm } from '@inertiajs/react'
import { EmptyState } from '~/components/ui/empty-state'
import { Switch } from '~/components/ui/switch'

export type EmployeeItem = {
  id: string
  firstname: string
  lastname: string
  email: string
  createdAt: string | null
  isActive: boolean
}

type Props = {
  employees: EmployeeItem[]
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function EmployeeActiveToggle({ employee }: { employee: EmployeeItem }) {
  const form = useForm({ isActive: employee.isActive })

  function handleToggle(checked: boolean) {
    form.setData('isActive', checked)
    form.patch(`/dashboard/employees/${employee.id}/active`, { preserveScroll: true })
  }

  return (
    <Switch
      checked={form.data.isActive}
      onCheckedChange={handleToggle}
      disabled={form.processing}
    />
  )
}

export function EmployeeTable({ employees }: Props) {
  if (employees.length === 0) {
    return (
      <EmptyState
        title="Aucun employé"
        description="Créez un premier compte employé pour commencer."
      />
    )
  }

  return (
    <>
      {/* Mobile */}
      <div className="md:hidden space-y-3">
        {employees.map((emp) => (
          <div key={emp.id} className="rounded-lg border bg-card p-4 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="font-medium text-sm">
                  {emp.firstname} {emp.lastname}
                </p>
                <p className="text-xs text-muted-foreground">{emp.email}</p>
                <p className="text-xs text-muted-foreground">Créé le {formatDate(emp.createdAt)}</p>
              </div>
              <EmployeeActiveToggle employee={emp} />
            </div>
          </div>
        ))}
      </div>

      {/* Desktop */}
      <div className="hidden md:block overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left px-4 py-3 font-medium">Nom</th>
              <th className="text-left px-4 py-3 font-medium">Email</th>
              <th className="text-left px-4 py-3 font-medium">Créé le</th>
              <th className="text-left px-4 py-3 font-medium">Actif</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {employees.map((emp) => (
              <tr key={emp.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3 font-medium">
                  {emp.firstname} {emp.lastname}
                </td>
                <td className="px-4 py-3 text-muted-foreground">{emp.email}</td>
                <td className="px-4 py-3 text-muted-foreground">{formatDate(emp.createdAt)}</td>
                <td className="px-4 py-3">
                  <EmployeeActiveToggle employee={emp} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
