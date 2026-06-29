import { useState } from 'react'
import type { InertiaProps } from '~/types'
import { Button } from '~/components/ui/button'
import { EmployeeTable, type EmployeeItem } from '~/components/dashboard/employees/employee-table'
import { EmployeeCreateDialog } from '~/components/dashboard/employees/employee-create-dialog'
import { GeneratedPasswordDialog } from '~/components/dashboard/employees/generated-password-dialog'

type IndexProps = InertiaProps<{
  employes: EmployeeItem[]
  generatedPassword?: string
}>

export default function EmployeesIndex({ employes, generatedPassword }: IndexProps) {
  const [createOpen, setCreateOpen] = useState(false)
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(!!generatedPassword)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Employés</h1>
          <p className="text-muted-foreground text-sm mt-1">{employes.length} employé(s)</p>
        </div>
        <Button onClick={() => setCreateOpen(true)}>Créer un employé</Button>
      </div>

      <EmployeeTable employees={employes} />

      <EmployeeCreateDialog open={createOpen} onOpenChange={setCreateOpen} />

      {generatedPassword && (
        <GeneratedPasswordDialog
          password={generatedPassword}
          open={passwordDialogOpen}
          onOpenChange={setPasswordDialogOpen}
        />
      )}
    </div>
  )
}
