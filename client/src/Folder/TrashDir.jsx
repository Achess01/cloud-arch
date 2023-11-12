import { useEffect, useState } from "react";
import { useParams } from "react-router"
import { SmallContainer } from "src/components/Container";
import { Folder } from "./Folder";
import { directoryService, fileService } from "src/config/apiClient";
import { TrashFillIcon } from "src/components/Icons";


export const TrashDir = () => {
  const { id } = useParams();
  const [items, setItems] = useState([]);
  const [dirData, setDirData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true)

        const resultDir = id ? await directoryService.get(id) : {}
        setDirData(resultDir)

        const resultDirectories = await directoryService.find({
          query: {
            $limit: 50,
            is_trash: true,
            parent_id: id ?? { $exists: false },
            $sort: {
              name: 1
            }
          }
        })

        const resultFiles = await fileService.find({
          query: {
            $limit: 50,
            is_trash: true,
            parent_id: id ?? { $exists: false },
            $sort: {
              name: 1
            }
          }
        })
        setItems([...resultDirectories.data, ...resultFiles.data.map((file) => ({ ...file, isFile: true }))])
      } catch (error) {
        setItems([])
      } finally {
        setLoading(false)
      }
    })()
  }, [id])

  return (
    <SmallContainer loading={loading} className="my-5">
      <h2>Papelera <TrashFillIcon /></h2>
      <Folder items={items} basePath="/folder/trash" previous={dirData.parent_id} parentId={id} />
    </SmallContainer>
  )
}
