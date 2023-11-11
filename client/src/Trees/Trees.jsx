import classNames from "classnames"
import { DirectoryTreeView } from "src/components/TreeView"
import { directoryService } from "src/config/apiClient"
import { useUser } from "src/utils/useUser"

export const Trees = () => {
  const formatData = (data = []) => data.map(({ _id: id, name, parent_id: parent }) => ({ id, name, parent: parent ?? -1, isBranch: true, children: [] }))
  const user = useUser()

  const getRootDirectory = async (id) => {
    const result = await directoryService.find({
      query: {
        $limit: 50,
        is_trash: false,
        parent_id: id ?? { $exists: false },
      }
    })

    return formatData(result.data)
  }

  const getSharedDirectory = async (id) => {
    return []
  }

  const getDeletedDirectory = async (id) => {
    const result = await directoryService.find({
      query: {
        $limit: 50,
        is_trash: true,
        parent_id: id ?? { $exists: false },
      }
    })

    return formatData(result.data)
  }

  return (
    <div className="w-100">
      <DirectoryTreeView loadChildren={getRootDirectory} name="Mis archivos" classNameContainer="pb-1" />
      <DirectoryTreeView loadChildren={getSharedDirectory} name="Compartido conmigo" classNameContainer={classNames("pt-1", {
        "py-1": user?.is_admin
      })} />
      {user?.is_admin ?
        <DirectoryTreeView loadChildren={getDeletedDirectory} name="Papelera" classNameContainer="pt-1" />
        : null
      }
    </div>
  )
}
