import { useEffect, useState } from "react";
import { SmallContainer } from "src/components/Container";
import { Folder } from "./Folder";
import { fileService } from "src/config/apiClient";
import { ShareIcon } from "src/components/Icons";


export const SharedDir = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true)
      const resultFiles = await fileService.find({
        query: {
          $limit: 50,
          is_trash: false,
          is_shared: true,
          $sort: {
            name: 1
          }
        }
      })
      setItems([...resultFiles.data.map((file) => ({ ...file, isFile: true }))])
    } catch (error) {
      setItems([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <SmallContainer loading={loading} className="my-5">
      <h2>Archivos compartidos <ShareIcon /></h2>
      <Folder items={items} basePath="/folder/shared" loadData={loadData} />
    </SmallContainer>
  )
}
