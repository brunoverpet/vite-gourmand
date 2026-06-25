import { EmptyState } from '~/components/ui/empty-state'

export type EmployeeItem = {
  id: string
  firstname: string
  lastname: string
  email: string
  createdAt: string | null
}

type Props = {
  employees: EmployeeItem[]
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })
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
          <div key={emp.id} className="rounded-lg border bg-card p-4 space-y-1">
            <p className="font-medium text-sm">
              {emp.firstname} {emp.lastname}
            </p>
            <p className="text-xs text-muted-foreground">{emp.email}</p>
            <p className="text-xs text-muted-foreground">Créé le {formatDate(emp.createdAt)}</p>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
